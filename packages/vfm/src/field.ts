import { reactive, watchEffect, WatchStopHandle, ref, toRaw } from 'vue';
import {
  FormType,
  FormState,
  FieldRule,
  FieldState,
  FieldError,
  KeyPathValue,
  ValidateFunc,
  ValidatorState
} from './types';
import { FormClass } from './form';
import { validators } from './validators';
import { getKeyValue, makeCancellablePromise } from './untils';

const validateRule = (
  rule: FieldRule,
  v: any,
  s: ValidatorState,
  f: FormState
) => {
  return makeCancellablePromise(async (onCancel) => {
    // required
    if (rule.required) {
      if (!v && v !== 0) return '{{name}} is required';
    }
    // requiredLength
    if (rule.requiredLength) {
      if (typeof v?.length !== 'number' || v.length <= 0) {
        return '{{name}} is required';
      }
    }
    // minLength
    if (rule.minLength !== undefined) {
      if (typeof v?.length !== 'number' || v.length < rule.minLength) {
        return `{{name}}'s length cannot be less than ${rule.minLength}`;
      }
    }
    // maxLength
    if (rule.maxLength !== undefined) {
      if (typeof v?.length !== 'number' || v.length > rule.maxLength) {
        return `{{name}}'s length cannot be greater than ${rule.maxLength}`;
      }
    }
    // min
    if (rule.min !== undefined) {
      if (typeof v !== 'number' || v < rule.min) {
        return `{{name}} cannot be less than ${rule.min}`;
      }
    }
    // max
    if (rule.max !== undefined) {
      if (typeof v !== 'number' || v > rule.max) {
        return `{{name}} cannot be greater than ${rule.max}`;
      }
    }
    // pattern
    if (rule.pattern) {
      if (
        (typeof v !== 'string' && typeof v !== 'number') ||
        !rule.pattern.test(`${v}`)
      ) {
        return `{{name}} not match ${rule.pattern.toString()}`;
      }
    }
    // builtin validators
    for (const str of Object.keys(validators) as (keyof typeof validators)[]) {
      if (rule[str] === true) {
        const vld = validators[str];
        const p = vld(v, s, f);
        if (typeof p === 'object' && typeof p.cancel === 'function') {
          onCancel(() => p.cancel?.());
        }
        const msg = await p;
        if (msg) return msg;
      }
    }
    // custom validator
    if (rule.validator) {
      const p = rule.validator(v, s, f);
      if (typeof p === 'object' && typeof p.cancel === 'function') {
        onCancel(() => p.cancel?.());
      }
      const msg = await p;
      if (msg) return msg;
    }
    // no error
    return '';
  });
};

export class FieldClass<
  T extends FormType = FormType,
  N extends string = string,
  V extends KeyPathValue<T, N> = KeyPathValue<T, N>
> {
  // key path in form data
  public name: N;
  // 当前状态
  public state: FieldState;
  // 所属表单
  private form: FormClass<T>;
  // 验证函数
  private rules = ref<FieldRule<V, FormState<T>>[]>([]);
  private validate: ValidateFunc;
  private validateCount = 0;
  // fns
  private transform: ((v: V) => V) | null = null;
  private isEqual: ((value: V, defaultValue: V) => boolean) | null = null;
  private focusFn: (() => void) | null = null;
  // watcher
  private stopValidateWatcher: WatchStopHandle | null = null;
  private stopDirtyWatcher: WatchStopHandle | null = null;
  // if registered
  private isRegistered = false;
  private isInited = false;

  constructor(
    form: FormClass<T>,
    args: {
      name: N;
      rules?: FieldRule<V, FormState<T>>[];
      immediate?: boolean;
      transform?: (v: V) => V;
      isEqual?: (v: V, d: V) => boolean;
      onFocus?: () => void;
    }
  ) {
    const { immediate = true } = args;

    // init state
    this.form = form;
    this.name = args.name;
    this.rules.value = args.rules || [];
    this.transform = args.transform || null;
    this.isEqual = args.isEqual || null;
    this.focusFn = args.onFocus || null;
    // state
    this.state = reactive({
      error: null,
      isError: false,
      isValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false
    }) as FieldState;

    // validate
    const validate: ValidateFunc = () => {
      const s = toRaw(this.state);
      const value = this.value;
      const state = {
        isValidating: s.isValidating,
        isDirty: this.state.isDirty,
        isTouched: this.state.isTouched,
        isChanged: this.state.isChanged
      };
      const formState = this.form.state;
      const transform = this.transform;
      const rules = this.rules.value;
      return makeCancellablePromise(async (onCancel) => {
        for (const rule of rules) {
          const promise = validateRule(
            rule as FieldRule<T>,
            transform && value !== undefined ? transform(value) : value,
            state,
            formState
          );
          onCancel(() => promise.cancel?.());
          const errMsg = await promise;
          let error: FieldError | null = null;
          if (errMsg) {
            error =
              typeof errMsg === 'string'
                ? {
                    type: rule.type,
                    message: errMsg
                  }
                : errMsg;
            error.message = error.message.replace(/\{\{name\}\}/g, this.name);
            if (rule.message !== undefined)
              error.message = rule.message.replace(/\{\{name\}\}/g, this.name);
            return error;
          }
        }
        return null;
      });
    };
    this.validate = validate;

    // if immediate register
    if (immediate) {
      this.onRegister();
    }
  }

  get value() {
    return getKeyValue(this.form.state.values, this.name);
  }

  get defaultValue() {
    return getKeyValue(this.form.state.defaultValues, this.name);
  }

  runInAction = (fn: (...args: any[]) => void) => {
    fn();
  };

  update(
    args: {
      rules?: FieldRule<V, FormState<T>>[];
    } = {}
  ) {
    if (args.rules) {
      this.rules.value = args.rules;
    }
  }

  initWatcher() {
    if (this.isInited) return;
    // auto validate
    this.stopValidateWatcher = watchEffect(async (onCleanup) => {
      this.validateCount++;
      const count = this.validateCount;
      const validate = this.validate;
      // start validate
      this.runInAction(() => {
        this.state.isValidating = true;
      });
      const promise = validate();
      onCleanup(() => promise.cancel?.());
      const err = await promise;
      // has other validate start after this
      if (count !== this.validateCount) return;
      // update validate status
      this.runInAction(() => {
        this.state.isValidating = false;
        const hasError = !!err?.message;
        if (hasError) {
          if (!this.state.error) this.state.error = { message: '' };
          this.state.error.message = err?.message || '';
          this.state.error.type = err?.type;
        } else {
          this.state.error = null;
        }
        this.state.isError = hasError;
      });
    });
    // dirty watch
    // this.stopDirtyWatcher = watchEffect(() => {
    //   const { value, defaultValue } = this;
    //   this.runInAction(() => {
    //     const isEqual = this.isEqual || ((v, d) => v === d);
    //     this.state.isDirty = !isEqual(toRaw(value), toRaw(defaultValue));
    //   });
    // });
    this.isInited = true;
  }

  onRegister() {
    if (this.isRegistered) return;
    this.initWatcher();
    this.isRegistered = true;
  }

  onUnregister() {
    this.stopValidateWatcher?.();
    this.stopDirtyWatcher?.();
    this.isRegistered = false;
    this.isInited = false;
  }

  onTouched(touched = true) {
    this.runInAction(() => {
      this.state.isTouched = touched;
    });
  }

  onChanged(changed = true) {
    this.state.isChanged = changed;
  }

  onFocus() {
    this.focusFn?.();
  }

  reset(
    args: {
      keepTouched?: boolean;
      keepChanged?: boolean;
    } = {}
  ) {
    this.validateCount++;
    this.stopValidateWatcher?.();
    this.stopDirtyWatcher?.();
    this.runInAction(() => {
      const { keepChanged = false, keepTouched = false } = args;
      this.state.error = null;
      this.state.isError = false;
      this.state.isValidating = false;
      this.state.isDirty = false;
      this.state.isTouched = keepTouched ? this.state.isTouched : false;
      this.state.isChanged = keepChanged ? this.state.isChanged : false;
    });
    this.isInited = false;
    this.initWatcher();
  }
}
