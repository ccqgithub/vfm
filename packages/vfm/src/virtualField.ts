import { reactive, watchEffect, WatchStopHandle } from 'vue';
import { FormClass } from './form';
import {
  FieldError,
  VirtualValidateFunc,
  VirtualFieldState,
  FormType,
  FormState,
  VirtualFieldRule
} from './types';

const validateRule = async (rule: VirtualFieldRule, f: FormState) => {
  // validators
  if (rule.validator) {
    const msg = await rule.validator(f);
    if (msg) return msg;
  }
  // no error
  return '';
};

// virtual field
export class VirtualFieldClass<T extends FormType = FormType> {
  public name = '';
  // 当前状态
  public state: VirtualFieldState;
  // 所属表单
  private form: FormClass<T>;
  // 验证函数
  private validate: VirtualValidateFunc<FormState<T>> | null = null;
  private validateCount = 0;
  // watcher
  private stopValidateWatcher: WatchStopHandle | null = null;
  // if registered
  isRegistered = false;

  constructor(
    form: FormClass<T>,
    args: {
      name: string;
      rules?: VirtualFieldRule<FormState<T>>[];
      immediate?: boolean;
    }
  ) {
    const { immediate = true, rules = [] } = args;
    this.form = form;
    this.name = args.name;
    this.state = reactive({
      name: this.name,
      error: null,
      isError: false,
      isValidating: false
    });
    // validate
    const validate: VirtualValidateFunc<FormState<T>> = async (fs) => {
      let error: FieldError | null = null;
      for (const rule of rules) {
        const errMsg = await validateRule(
          rule as VirtualFieldRule<FormState>,
          fs
        );
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
      this.initWatcher();
    }
  }

  private runInAction = (fn: (...args: any[]) => void) => {
    fn();
  };

  public initWatcher() {
    let canCelLastValidate: (() => void) | null = null;
    // auto validate
    this.stopValidateWatcher = watchEffect(async () => {
      this.validateCount++;
      const formState = this.form.state;
      const count = this.validateCount;
      this.runInAction(() => {
        this.state.isValidating = true;
      });
      canCelLastValidate?.();
      canCelLastValidate = null;
      let err: FieldError | null = null;
      if (this.validate) {
        const promise = this.validate(formState);
        if (promise instanceof Promise) {
          canCelLastValidate = promise.cancel || null;
        }
        err = (await promise) || null;
      }
      if (count !== this.validateCount) return;
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
  }

  onRegister() {
    if (this.isRegistered) return;
    this.initWatcher();
    this.isRegistered = true;
  }

  onUnregister() {
    this.stopValidateWatcher?.();
  }
}
