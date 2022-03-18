import { watchEffect, reactive, WatchStopHandle, readonly } from 'vue';
import { Form } from './form';
import {
  FieldError,
  ValidateFunc,
  VirtualValidateFunc,
  FieldState,
  VirtualFieldState,
  FormType,
  FormState,
  KeyPathValue
} from './types';

export class Field<
  T extends FormType = FormType,
  N extends string = string,
  V extends KeyPathValue<T, N> = KeyPathValue<T, N>
> {
  // key path in form data
  name: N;
  // 所属表单
  private form: Form<T>;
  // 当前状态
  private _data: FieldState<V>;
  private data: FieldState<V> | null = null;
  // 验证函数
  private validate: ValidateFunc<V, FormState<T>> | null = null;
  private validateCount = 0;
  // watcher
  private stopValidateWatcher: WatchStopHandle | null = null;
  private stopDirtyWatcher: WatchStopHandle | null = null;
  // if registered
  isRegistered = false;

  constructor(
    form: Form<T>,
    args: {
      name: N;
      value?: string;
      defaultValue?: string;
      validate?: ValidateFunc<V, FormState<T>> | null;
      immediate?: boolean;
    }
  ) {
    const { immediate = true } = args;
    this.form = form;
    this.name = args.name;
    this._data = reactive({
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
    this.data = readonly(this._data) as FieldState<V>;
    this.validate = args.validate || null;
    if (immediate) {
      this.onRegister();
    }
  }

  get state() {
    if (!this.data) this.data = readonly(this._data) as FieldState<V>;
    return this.data;
  }

  private initWatcher() {
    let canCelLastValidate: (() => void) | null = null;
    // auto validate
    this.stopValidateWatcher = watchEffect(async () => {
      this.validateCount++;
      const value = this.state.value;
      const formState = this.form.state;
      const count = this.validateCount;
      this._data.isValidating = true;
      canCelLastValidate?.();
      canCelLastValidate = null;
      let err: FieldError | null = null;
      if (this.validate) {
        const promise = this.validate(value, formState);
        if (promise instanceof Promise) {
          canCelLastValidate = promise.cancel || null;
        }
        err = (await promise) || null;
      }
      if (count !== this.validateCount) return;
      this._data.isValidating = false;
      const hasError = !!err?.message;
      if (hasError) {
        if (!this._data.error) this._data.error = { message: '' };
        this._data.error.message = err?.message || '';
        this._data.error.type = err?.type;
      } else {
        this._data.error = null;
      }
      this._data.isError = hasError;
    });
    // dirty watch
    this.stopDirtyWatcher = watchEffect(() => {
      this._data.isDirty = this._data.value !== this._data.defaultValue;
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
    this._data.value = value;
    this._data.isChanged = this._data.isChanged || isChanged;
  }

  onTouched(touched = true) {
    this._data.isTouched = touched;
  }

  reset(resetValue?: V) {
    this.validateCount++;
    this.stopValidateWatcher?.();
    this.stopDirtyWatcher?.();
    if (resetValue !== undefined) this._data.defaultValue = resetValue;
    this._data.error = null;
    this._data.isError = false;
    this._data.isValidating = false;
    this._data.isDirty = false;
    this._data.isTouched = false;
    this._data.isChanged = false;
    this._data.value = this._data.defaultValue;
    this.initWatcher();
  }
}

// virtual field
export class VirtualField<T extends FormType = FormType> {
  name = '';
  // 所属表单
  private form: Form<T>;
  // 当前状态
  private _data: VirtualFieldState;
  private data: VirtualFieldState | null = null;
  // 验证函数
  private validate: VirtualValidateFunc<FormState<T>> | null = null;
  private validateCount = 0;
  // watcher
  private stopValidateWatcher: WatchStopHandle | null = null;
  // if registered
  isRegistered = false;

  constructor(
    form: Form<T>,
    args: {
      name: string;
      validate?: VirtualValidateFunc<FormState<T>> | null;
      immediate?: boolean;
    }
  ) {
    const { immediate = true } = args;
    this.form = form;
    this.name = args.name;
    this._data = reactive({
      name: this.name,
      error: null,
      isError: false,
      isValidating: false
    });
    this.data = readonly(this._data);
    this.validate = args.validate || null;
    if (immediate) {
      this.initWatcher();
    }
  }

  get state() {
    if (!this.data) this.data = readonly(this._data);
    return this.data;
  }

  private initWatcher() {
    let canCelLastValidate: (() => void) | null = null;
    // auto validate
    this.stopValidateWatcher = watchEffect(async () => {
      this.validateCount++;
      const formState = this.form.state;
      const count = this.validateCount;
      this._data.isValidating = true;
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
      this._data.isValidating = false;
      const hasError = !!err?.message;
      if (hasError) {
        if (!this._data.error) this._data.error = { message: '' };
        this._data.error.message = err?.message || '';
        this._data.error.type = err?.type;
      } else {
        this._data.error = null;
      }
      this._data.isError = hasError;
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
