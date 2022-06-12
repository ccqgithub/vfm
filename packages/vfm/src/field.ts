import { reactive, watchEffect, WatchStopHandle, ref, toRaw } from 'vue';
import {
  FormType,
  FieldRule,
  FieldState,
  FieldError,
  KeyPathValue,
  ValidateFunc,
  FieldPath
} from './types';
import { Form } from './form';
import { validators } from './validators';
import { getKeyValue, makeDisposablePromise, debouncePromise } from './untils';

// validate rule
const validateRule = (rule: FieldRule, v: any, deps?: any) => {
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
        const p = vld(v, deps);
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
      const p = rule.validator(v, deps);
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
export class FieldClass<
  T extends FormType = FormType,
  N extends FieldPath<T> = FieldPath<T>,
  Deps = any,
  Transform = KeyPathValue<T, N>,
  VFK extends string = string
> {
  // key path in form data
  public name: N;
  public initValue?: KeyPathValue<T, N>;
  public initDefaultValue?: KeyPathValue<T, N>;
  // 当前状态
  public state: FieldState;
  // 所属表单
  private form: Form<T, VFK>;
  // 验证函数
  private rules = ref<FieldRule<KeyPathValue<T, N>, Deps>[]>([]);
  private deps: (() => Deps) | null = null;
  private validate: ValidateFunc<KeyPathValue<T, N>, Deps>;
  private validateDispose: (() => void) | null = null;
  private debounce = 0;
  // fns
  private transform: ((v: KeyPathValue<T, N>) => Transform) | null = null;
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
    form: Form<T>,
    args: {
      name: N;
      rules?: FieldRule<Transform, Deps>[];
      deps?: () => Deps;
      immediate?: boolean;
      transform?: (v: KeyPathValue<T, N>) => Transform;
      isEqual?: (v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean;
      onFocus?: () => void;
      debounce?: number;
      initValue?: KeyPathValue<T, N>;
      initDefaultValue?: KeyPathValue<T, N>;
    }
  ) {
    const { immediate = true } = args;

    // init state
    this.form = form;
    this.name = args.name;
    this.setRules(args.rules || []);
    this.deps = args.deps || null;
    this.transform = args.transform || null;
    this.isEqual = args.isEqual || null;
    this.focusFn = args.onFocus || null;
    this.debounce = args.debounce || 0;
    this.initValue = args.initValue;
    this.initDefaultValue = args.initDefaultValue;
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
    const validate: ValidateFunc<KeyPathValue<T, N>, Deps> = (
      value,
      deps,
      rules
    ) => {
      const transform = this.transform;
      let disposed = false;
      return makeDisposablePromise(async (onDispose) => {
        onDispose(() => {
          disposed = true;
        });
        for (const rule of rules) {
          const validateRuleRes = validateRule(
            rule as FieldRule<KeyPathValue<T, N>, Deps>,
            transform && value !== undefined ? transform(value) : value,
            deps
          );
          onDispose(() => validateRuleRes.dispose?.());
          const errMsg = await validateRuleRes.promise;

          // disposed
          if (disposed) return null;

          let error: FieldError | null = null;
          // has first error
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

  setRules(rules: FieldRule<KeyPathValue<T, N>, Deps>[] = []) {
    this.rules.value = rules.map((v) => {
      if (!v.debounce) return v;
      const rule: FieldRule<KeyPathValue<T, N>, Deps> = {
        validator: debouncePromise((value, deps) => {
          return validateRule(v, value, deps);
        }, v.debounce)
      };
      return rule;
    });
  }

  update(
    args: {
      rules?: FieldRule<KeyPathValue<T, N>, Deps>[];
    } = {}
  ) {
    if (args.rules) {
      this.setRules(args.rules);
    }
  }

  initWatcher() {
    if (this.isInited) return;

    // do validate
    const doValidate = async (args: {
      value: KeyPathValue<T, N>;
      deps?: Deps;
      rules: FieldRule<KeyPathValue<T, N>, Deps>[];
    }) => {
      // dispose last validate
      this.validateDispose?.();
      this.validateDispose = null;

      // validate
      const { value, deps, rules } = args;
      let disposed = false;
      const validateRes = this.validate(value, deps, rules);
      this.validateDispose = () => {
        validateRes.dispose?.();
        disposed = true;
        this.validateDispose = null;
      };
      const err = await validateRes.promise;

      // disposed
      if (disposed) return;

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

      // run end, no need dispose
      this.validateDispose = null;
    };
    const validate = this.debounce
      ? debouncePromise(doValidate, this.debounce)
      : doValidate;
    // auto validate
    this.stopValidateWatcher = watchEffect(() => {
      this.runInAction(() => {
        this.state.isValidating = true;
      });

      const value = this.getValue();
      const deps = this.deps?.();
      const rules = this.rules.value;
      // validate in next micro task, avoid watchEffect to track unnecessary changes
      Promise.resolve().then(() => {
        validate({
          value,
          deps,
          rules
        });
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
    this.validateDispose?.();
    this.validateDispose = null;
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
    this.validateDispose?.();
    this.validateDispose = null;
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
