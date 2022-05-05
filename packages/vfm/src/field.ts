import { reactive, watchEffect, WatchStopHandle } from 'vue';
import {
  FieldError,
  ValidateFunc,
  FieldState,
  FormType,
  FormState,
  KeyPathValue,
  FieldRule
} from './types';
import { FormClass } from './form';
import { validators } from './validators';
import { makeCancellablePromise } from './untils';

const validateRule = (rule: FieldRule, v: any, f: FormState) => {
  return makeCancellablePromise(async (onCancel) => {
    // required
    if (rule.required) {
      if (!v) return '{{name}} is required';
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
        const p = vld(v, f);
        if (typeof p === 'object' && typeof p.cancel === 'function') {
          onCancel(() => p.cancel?.());
        }
        const msg = await p;
        if (msg) return msg;
      }
    }
    // validators
    if (rule.validator) {
      const p = rule.validator(v, f);
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
  public state: FieldState<V>;
  // 所属表单
  private form: FormClass<T>;
  // 验证函数
  private validate: ValidateFunc<V, FormState<T>>;
  private validateCount = 0;
  private transform: ((v: KeyPathValue<T, N>) => KeyPathValue<T, N>) | null =
    null;
  private focusFn: (() => void) | null = null;
  // watcher
  private stopValidateWatcher: WatchStopHandle | null = null;
  private stopDirtyWatcher: WatchStopHandle | null = null;
  // if registered
  private isRegistered = false;

  constructor(
    form: FormClass<T>,
    args: {
      name: N;
      value?: string;
      defaultValue?: string;
      rules?: FieldRule<KeyPathValue<T, N>, FormState<T>>[];
      immediate?: boolean;
      transform?: (v: KeyPathValue<T, N>) => KeyPathValue<T, N>;
      onFocus?: () => void;
    }
  ) {
    const { immediate = true, rules = [], transform = null } = args;
    this.form = form;
    this.name = args.name;
    this.state = reactive({
      name: this.name,
      value: args.value === undefined ? args.defaultValue : args.value,
      defaultValue: args.defaultValue,
      error: null,
      isError: false,
      isValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false
    }) as FieldState<V>;
    // validate
    this.transform = transform;
    this.focusFn = args.onFocus || null;
    const validate: ValidateFunc<KeyPathValue<T, N>, FormState<T>> = (
      v,
      fs
    ) => {
      return makeCancellablePromise(async (onCancel) => {
        const _transform = this.transform;
        for (const rule of rules) {
          const promise = validateRule(
            rule as FieldRule<T>,
            _transform && v !== undefined ? _transform(v) : v,
            fs
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

  private runInAction = (fn: (...args: any[]) => void) => {
    fn();
  };

  initWatcher() {
    // auto validate
    this.stopValidateWatcher = watchEffect(async (onCleanup) => {
      this.validateCount++;
      const value = this.state.value;
      const formState = this.form.state;
      const count = this.validateCount;
      const validate = this.validate;
      // start validate
      this.runInAction(() => {
        this.state.isValidating = true;
      });
      const promise = validate(value, formState);
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
    this.stopDirtyWatcher = watchEffect(() => {
      const { value, defaultValue } = this.state;
      this.runInAction(() => {
        this.state.isDirty = value !== defaultValue;
      });
    });
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
  }

  onChange(value: V) {
    if (value === undefined) return;
    const isChanged = this.state.value !== value;
    this.runInAction(() => {
      this.state.value = value;
      this.state.isChanged = this.state.isChanged || isChanged;
    });
  }

  onTouched(touched = true) {
    this.runInAction(() => {
      this.state.isTouched = touched;
    });
  }

  onFocus() {
    this.focusFn?.();
  }

  reset(resetValue?: V) {
    this.validateCount++;
    this.stopValidateWatcher?.();
    this.stopDirtyWatcher?.();
    this.runInAction(() => {
      if (resetValue !== undefined) this.state.defaultValue = resetValue;
      this.state.error = null;
      this.state.isError = false;
      this.state.isValidating = false;
      this.state.isDirty = false;
      this.state.isTouched = false;
      this.state.isChanged = false;
      this.state.value = this.state.defaultValue;
    });
    this.initWatcher();
  }
}
