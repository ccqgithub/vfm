import { reactive, watchEffect, WatchStopHandle, ref } from 'vue';
import { FormClass } from './form';
import {
  FormType,
  FieldError,
  VirtualFieldRule,
  VirtualFieldState,
  VirtualValidateFunc
} from './types';
import { validators } from './validators';
import { makeCancellablePromise } from './untils';

const validateRule = (rule: VirtualFieldRule, v: any) => {
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
    const validatorKeys = Object.keys(
      validators
    ) as (keyof typeof validators)[];
    for (const str of validatorKeys) {
      if (rule[str] === true) {
        const vld = validators[str];
        const p = vld(v);
        if (typeof p === 'object' && typeof p.cancel === 'function') {
          onCancel(() => p.cancel?.());
        }
        const msg = await p;
        if (msg) return msg;
      }
    }
    // custom validator
    if (rule.validator) {
      const p = rule.validator(v);
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

// virtual field
export class VirtualFieldClass<T extends FormType = FormType, V = any> {
  public name = '';
  // 当前状态
  public state: VirtualFieldState;
  // 所属表单
  private form: FormClass<T>;
  // 验证函数
  private rules = ref<VirtualFieldRule<V>[]>([]);
  private value: () => V;
  private validate: VirtualValidateFunc<V>;
  private validateCount = 0;
  // watcher
  private stopValidateWatcher: WatchStopHandle | null = null;
  // if registered
  private isRegistered = false;
  private isInited = false;

  constructor(
    form: FormClass<T>,
    args: {
      name: string;
      value: () => V;
      rules?: VirtualFieldRule<V>[];
      immediate?: boolean;
    }
  ) {
    const { immediate = true } = args;

    // init
    this.form = form;
    this.name = args.name;
    this.value = args.value;
    this.rules.value = args.rules || [];
    this.state = reactive({
      name: this.name,
      error: null,
      isError: false,
      isValidating: false
    });

    // validate
    const validate: VirtualValidateFunc<V> = (value, rules) => {
      return makeCancellablePromise(async (onCancel) => {
        let error: FieldError | null = null;
        for (const rule of rules) {
          const promise = validateRule(rule as VirtualFieldRule<V>, value);
          onCancel(() => promise.cancel?.());
          const errMsg = await promise;
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
      this.initWatcher();
    }
  }

  private runInAction = (fn: (...args: any[]) => void) => {
    fn();
  };

  update(args: { rules?: VirtualFieldRule<V>[]; value?: () => V }) {
    if (args.rules) {
      this.rules.value = args.rules;
    }
    if (args.value) {
      this.value = args.value;
    }
  }

  public initWatcher() {
    if (this.isInited) return;
    // auto validate
    this.stopValidateWatcher = watchEffect(async (onCleanup) => {
      this.validateCount++;
      const count = this.validateCount;
      this.runInAction(() => {
        this.state.isValidating = true;
      });
      // validate
      const value = this.value();
      const rules = this.rules.value;
      // validate in next micro task, avoid watchEffect to track unnecessary changes
      const err = await Promise.resolve().then(() => {
        const promise = this.validate(value, rules);
        onCleanup(() => promise.cancel?.());
        return promise;
      });
      // has other validate start after this
      if (count !== this.validateCount) return;
      // update state
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
    this.isInited = true;
  }

  onRegister() {
    if (this.isRegistered) return;
    this.initWatcher();
    this.isRegistered = true;
  }

  onUnregister() {
    this.stopValidateWatcher?.();
    this.isRegistered = false;
    this.isInited = false;
  }
}
