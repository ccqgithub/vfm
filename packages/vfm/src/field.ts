import { reactive, watchEffect, WatchStopHandle } from 'vue';
import { FormClass } from './form';
import {
  FieldError,
  ValidateFunc,
  FieldState,
  FormType,
  FormState,
  KeyPathValue,
  FieldRule
} from './types';
import { validators } from './validators';

const validateRule = async (rule: FieldRule, v: any, f: FormState) => {
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
    if (typeof v !== 'string' || !rule.pattern.test(v)) {
      return `{{name}} not match ${rule.pattern.toString()}`;
    }
  }
  // builtin validators
  for (const str of Object.keys(validators) as (keyof typeof validators)[]) {
    if (rule[str] === true) {
      const vld = validators[str];
      const msg = await vld(v, f);
      if (msg) return msg;
    }
  }
  // validators
  if (rule.validator) {
    const msg = await rule.validator(v, f);
    if (msg) return msg;
  }
  // no error
  return '';
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
  private validate: ValidateFunc<V, FormState<T>> | null = null;
  private validateCount = 0;
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
    }
  ) {
    const { immediate = true, rules = [] } = args;
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
    const validate: ValidateFunc<KeyPathValue<T, N>, FormState<T>> = async (
      v,
      fs
    ) => {
      let error: FieldError | null = null;
      for (const rule of rules) {
        const errMsg = await validateRule(rule as FieldRule<T>, v, fs);
        if (errMsg) {
          error =
            typeof errMsg === 'string'
              ? {
                  type: rule.type,
                  message: errMsg
                }
              : errMsg;
          return error;
        }
      }
      return null;
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
    let canCelLastValidate: (() => void) | null = null;
    // auto validate
    this.stopValidateWatcher = watchEffect(async () => {
      this.validateCount++;
      const value = this.state.value;
      const formState = this.form.state;
      const count = this.validateCount;
      const validate = this.validate;
      // cancel last validate
      canCelLastValidate?.();
      canCelLastValidate = null;
      // start validate
      this.runInAction(() => {
        this.state.isValidating = true;
      });
      let err: FieldError | null = null;
      if (validate) {
        const promise = validate(value, formState);
        canCelLastValidate = (promise as any)?.cancel || null;
        err = (await promise) || null;
      }
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
