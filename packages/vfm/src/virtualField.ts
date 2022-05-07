import { reactive, watchEffect, WatchStopHandle, ref } from 'vue';
import { FormClass } from './form';
import {
  FieldError,
  VirtualValidateFunc,
  VirtualFieldState,
  FormType,
  FormState,
  VirtualFieldRule
} from './types';
import { makeCancellablePromise } from './untils';

const validateRule = (rule: VirtualFieldRule, f: FormState) => {
  return makeCancellablePromise(async (onCancel) => {
    // validators
    if (rule.validator) {
      const p = rule.validator(f);
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
export class VirtualFieldClass<T extends FormType = FormType> {
  public name = '';
  // 当前状态
  public state: VirtualFieldState;
  // 所属表单
  private form: FormClass<T>;
  // 验证函数
  private rules = ref<VirtualFieldRule<FormState<T>>[]>([]);
  private validate: VirtualValidateFunc<FormState<T>>;
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
    const { immediate = true } = args;

    // init
    this.form = form;
    this.name = args.name;
    this.rules.value = args.rules || [];
    this.state = reactive({
      name: this.name,
      error: null,
      isError: false,
      isValidating: false
    });

    // validate
    const validate: VirtualValidateFunc<FormState<T>> = (fs) => {
      const rules = this.rules.value;
      return makeCancellablePromise(async (onCancel) => {
        let error: FieldError | null = null;
        for (const rule of rules) {
          const promise = validateRule(rule as VirtualFieldRule<FormState>, fs);
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

  update(args: { rules?: VirtualFieldRule<FormState<T>>[] }) {
    if (args.rules) {
      this.rules.value = args.rules;
    }
  }

  public initWatcher() {
    // auto validate
    this.stopValidateWatcher = watchEffect(async (onCleanup) => {
      this.validateCount++;
      const formState = this.form.state;
      const count = this.validateCount;
      this.runInAction(() => {
        this.state.isValidating = true;
      });
      // validate
      const promise = this.validate(formState);
      onCleanup(() => promise.cancel?.());
      const err = await promise;
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
