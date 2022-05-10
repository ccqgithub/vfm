import { reactive, watchEffect, WatchStopHandle, ref, toRaw } from 'vue';
import {
  FormType,
  FieldRule,
  FieldState,
  FieldError,
  KeyPathValue,
  ValidateFunc
} from './types';
import { FormClass } from './form';
import { validators } from './validators';
import { getKeyValue, makeCancellablePromise } from './untils';

const validateRule = (rule: FieldRule, v: any, deps?: any) => {
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
        const p = vld(v, deps);
        if (typeof p === 'object' && typeof p.cancel === 'function') {
          onCancel(() => p.cancel?.());
        }
        const msg = await p;
        if (msg) return msg;
      }
    }
    // custom validator
    if (rule.validator) {
      const p = rule.validator(v, deps);
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
  Deps = any
> {
  // key path in form data
  public name: N;
  // 当前状态
  public state: FieldState;
  // 所属表单
  private form: FormClass<T>;
  // 验证函数
  private rules = ref<FieldRule<KeyPathValue<T, N>, Deps>[]>([]);
  private deps: (() => Deps) | null = null;
  private validate: ValidateFunc<KeyPathValue<T, N>, Deps>;
  private validateCount = 0;
  // fns
  private transform: ((v: KeyPathValue<T, N>) => KeyPathValue<T, N>) | null =
    null;
  private isEqual:
    | ((value: KeyPathValue<T, N>, defaultValue: KeyPathValue<T, N>) => boolean)
    | null = null;
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
      rules?: FieldRule<KeyPathValue<T, N>, Deps>[];
      deps?: () => Deps;
      immediate?: boolean;
      transform?: (v: KeyPathValue<T, N>) => KeyPathValue<T, N>;
      isEqual?: (v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean;
      onFocus?: () => void;
    }
  ) {
    const { immediate = true } = args;

    // init state
    this.form = form;
    this.name = args.name;
    this.rules.value = args.rules || [];
    this.deps = args.deps || null;
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
    const validate: ValidateFunc<KeyPathValue<T, N>, Deps> = async (
      value,
      deps,
      rules
    ) => {
      const transform = this.transform;

      return await makeCancellablePromise(async (onCancel) => {
        for (const rule of rules) {
          const promise = validateRule(
            rule as FieldRule<KeyPathValue<T, N>, Deps>,
            transform && value !== undefined ? transform(value) : value,
            deps
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

  getValue() {
    return getKeyValue(this.form.state.values, this.name);
  }

  getDefaultValue() {
    return getKeyValue(this.form.state.defaultValues, this.name);
  }

  runInAction = (fn: (...args: any[]) => void) => {
    fn();
  };

  update(
    args: {
      rules?: FieldRule<KeyPathValue<T, N>, Deps>[];
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
      // validate
      const value = this.getValue();
      const deps = this.deps?.();
      const rules = this.rules.value;
      // validate in next micro task, avoid watchEffect to track unnecessary changes
      const err = await Promise.resolve().then(() => {
        const promise = this.validate(value, deps, rules);
        onCleanup(() => promise.cancel?.());
        return promise;
      });
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
    this.stopDirtyWatcher = watchEffect(() => {
      const value = this.getValue();
      const defaultValue = this.getDefaultValue();
      this.runInAction(() => {
        const isEqual = this.isEqual || ((v, d) => v === d);
        this.state.isDirty = !isEqual(toRaw(value), toRaw(defaultValue));
      });
    });
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
