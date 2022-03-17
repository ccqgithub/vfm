import { watchEffect, reactive, WatchStopHandle, readonly } from 'vue';
import { Form } from './form';
import {
  FieldError,
  ValidateFunc,
  VirtualValidateFunc,
  FieldState,
  VirtualFieldState
} from './types';

export class Field<F extends Form = Form, V = any> {
  // key path in form data
  name: string;
  // 所属表单
  private form: F;
  // 当前状态
  private _data: FieldState<V>;
  private data: FieldState<V> | null = null;
  // 验证函数
  private validate: ValidateFunc<V, F['state']> | null = null;
  private validateCount = 0;
  // watcher
  private stopValidateWatcher: WatchStopHandle | null = null;
  private stopDirtyWatcher: WatchStopHandle | null = null;

  constructor(
    form: F,
    args: {
      name: string;
      value?: string;
      defaultValue?: string;
      validate?: ValidateFunc<V, F['state']> | null;
    }
  ) {
    this.form = form;
    this.name = args.name;
    this._data = reactive({
      name: this.name,
      value: args.value === undefined ? args.defaultValue : args.value,
      defaultValue: args.defaultValue,
      error: { message: '' },
      isError: false,
      isValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false
    }) as FieldState<V>;
    this.data = readonly(this._data) as FieldState<V>;
    this.validate = args.validate || null;
    this.initWatcher();
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
        this._data.error.type = err?.type || 'default';
        this._data.error.types = err?.types;
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

  onUnregister() {
    this.stopValidateWatcher?.();
    this.stopDirtyWatcher?.();
  }

  onChange(value: V) {
    if (value === undefined) return;
    const isChanged = this.state.value !== value;
    this._data.value = value;
    this._data.isChanged = this._data.isChanged || isChanged;
  }

  onTouched() {
    this._data.isTouched = true;
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
export class VirtualField<F extends Form = Form> {
  name = '';
  // 所属表单
  private form: F;
  // 当前状态
  private _data: VirtualFieldState;
  private data: VirtualFieldState | null = null;
  // 验证函数
  private validate: VirtualValidateFunc<F['state']> | null = null;
  private validateCount = 0;
  // watcher
  private stopValidateWatcher: WatchStopHandle | null = null;

  constructor(
    form: F,
    args: {
      name: string;
      validate?: VirtualValidateFunc<F['state']> | null;
    }
  ) {
    this.form = form;
    this.name = args.name;
    this._data = reactive({
      name: this.name,
      error: { message: '' },
      isError: false,
      isValidating: false
    });
    this.data = readonly(this._data);
    this.validate = args.validate || null;
    this.initWatcher();
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
        this._data.error.type = err?.type || 'default';
        this._data.error.types = err?.types;
      } else {
        this._data.error = null;
      }
      this._data.isError = hasError;
    });
  }

  onUnregister() {
    this.stopValidateWatcher?.();
  }
}
