import { reactive, watchEffect, WatchStopHandle, ref } from 'vue';
import { Form } from './form';
import {
  FormType,
  FieldError,
  VirtualFieldRule,
  VirtualFieldState,
  VirtualValidateFunc
} from './types';
import { validators } from './validators';
import { makeDisposablePromise, debouncePromise } from './untils';

const validateRule = (rule: VirtualFieldRule, v: any) => {
  return makeDisposablePromise(async (onDispose) => {
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
        if (
          typeof p === 'object' &&
          'dispose' in p &&
          typeof p.dispose === 'function'
        ) {
          onDispose(() => p.dispose?.());
        }
        const msg =
          typeof p === 'object' && 'promise' in p ? await p.promise : await p;
        if (msg) return msg;
      }
    }
    // custom validator
    if (rule.validator) {
      const p = rule.validator(v);
      if (
        typeof p === 'object' &&
        'dispose' in p &&
        typeof p.dispose === 'function'
      ) {
        onDispose(() => p.dispose?.());
      }
      const msg =
        typeof p === 'object' && 'promise' in p ? await p.promise : await p;
      if (msg) return msg;
    }
    // no error
    return '';
  });
};

/**
 * @internal
 */
export class VirtualFieldClass<T extends FormType = FormType, V = any> {
  public name = '';
  // 当前状态
  public state: VirtualFieldState;
  // 所属表单
  private form: Form<T>;
  // 验证函数
  private rules = ref<VirtualFieldRule<V>[]>([]);
  private value: () => V;
  private validate: VirtualValidateFunc<V>;
  private validateDispose: (() => void) | null = null;
  private debounce = 0;
  // watcher
  private stopValidateWatcher: WatchStopHandle | null = null;
  // if registered
  private isRegistered = false;
  private isInited = false;

  constructor(
    form: Form<T>,
    args: {
      name: string;
      value: () => V;
      rules?: VirtualFieldRule<V>[];
      immediate?: boolean;
      debounce?: number;
    }
  ) {
    const { immediate = true } = args;

    // init
    this.form = form;
    this.name = args.name;
    this.value = args.value;
    this.setRules(args.rules || []);
    this.debounce = args.debounce || 0;
    this.state = reactive({
      name: this.name,
      error: null,
      isError: false,
      isValidating: false
    });

    // validate
    const validate: VirtualValidateFunc<V> = (value, rules) => {
      let disposed = false;
      return makeDisposablePromise(async (onDispose) => {
        onDispose(() => {
          disposed = true;
        });

        for (const rule of rules) {
          const validateRuleRes = validateRule(
            rule as VirtualFieldRule<V>,
            value
          );
          onDispose(() => validateRuleRes.dispose?.());
          const errMsg = await validateRuleRes.promise;

          // disposed
          if (disposed) return null;

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
      this.initWatcher();
    }
  }

  private runInAction = (fn: (...args: any[]) => void) => {
    fn();
  };

  setRules(rules: VirtualFieldRule<V>[] = []) {
    this.rules.value = rules.map((v) => {
      if (!v.debounce) return v;
      const rule: VirtualFieldRule<V> = {
        validator: debouncePromise((value) => {
          return validateRule(v, value);
        }, v.debounce)
      };
      return rule;
    });
  }

  update(args: { rules?: VirtualFieldRule<V>[]; value?: () => V }) {
    if (args.rules) {
      this.setRules(args.rules);
    }
    if (args.value) {
      this.value = args.value;
    }
  }

  public initWatcher() {
    if (this.isInited) return;

    // dispose last validate
    this.validateDispose?.();
    this.validateDispose = null;

    // do validate
    const doValidate = async (args: {
      value: V;
      rules: VirtualFieldRule<V>[];
    }) => {
      this.runInAction(() => {
        this.state.isValidating = true;
      });
      // validate
      const { value, rules } = args;
      let disposed = false;
      const validateRes = this.validate(value, rules);
      this.validateDispose = () => {
        validateRes.dispose?.();
        disposed = true;
        this.validateDispose = null;
      };
      const err = await validateRes.promise;

      // disposed
      if (disposed) return;

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

      // run end, no need dispose
      this.validateDispose = null;
    };
    const validate = this.debounce
      ? debouncePromise(doValidate, this.debounce)
      : doValidate;
    // auto validate
    this.stopValidateWatcher = watchEffect(() => {
      const value = this.value();
      const rules = this.rules.value;
      // validate in next micro task, avoid watchEffect to track unnecessary changes
      Promise.resolve().then(() => {
        validate({ value, rules });
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
    this.validateDispose?.();
    this.validateDispose = null;
    this.stopValidateWatcher?.();
    this.isRegistered = false;
    this.isInited = false;
  }
}
