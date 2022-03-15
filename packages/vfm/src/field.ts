import { watchEffect, reactive, WatchStopHandle, readonly } from 'vue';
import { Form, FormState } from './form';
import { FieldValuesType, KeyPathValue } from './types';

export type ValidateFunc<T extends FieldValuesType, N extends string> = (
  value: KeyPathValue<T, N> | undefined,
  data: FormState<T>
) => (FieldError | null) | Promise<FieldError | null>;

export type FieldError = {
  message?: string;
  types?: Record<string, string>;
};

export type FieldState<V extends any> = {
  // 当前值
  value?: V;
  // 默认值
  defaultValue?: V;
  // 错误信息
  error: FieldError;
  // 是否有错误
  isError: boolean;
  // 正在验证
  isValidating: boolean;
  // 当前值和默认值不相等
  isDirty: boolean;
  // 字段有过交互，比如 input focus
  isTouched: boolean;
  // 是否更改过
  isChanged: boolean;
};

export class Field<
  T extends FieldValuesType,
  F extends Form<T>,
  N extends string = string
> {
  // key path in form data
  name: N = '' as N;
  // 所属表单
  private form: F;
  // 当前状态
  private _data: FieldState<KeyPathValue<T, N>>;
  private data: FieldState<KeyPathValue<T, N>> | null = null;
  // 验证函数
  private validateFn: ValidateFunc<T, N> | null = null;
  private validateCount = 0;
  // watcher
  private stopValidateWatcher: WatchStopHandle | null = null;
  private stopDirtyWatcher: WatchStopHandle | null = null;

  constructor(
    form: F,
    args: {
      name: N;
      value?: string;
      defaultValue?: string;
      validateFn?: ValidateFunc<T, N> | null;
    }
  ) {
    this.form = form;
    this.name = args.name;
    this._data = reactive({
      value: args.value === undefined ? args.defaultValue : args.value,
      defaultValue: args.defaultValue,
      error: { message: '' },
      isError: false,
      isValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false
    }) as FieldState<KeyPathValue<T, N>>;
    this.data = readonly(this._data) as FieldState<KeyPathValue<T, N>>;
    this.validateFn = args.validateFn || null;
    this.initWatcher();
  }

  get state() {
    if (!this.data)
      this.data = readonly(this._data) as FieldState<KeyPathValue<T, N>>;
    return this.data;
  }

  private initWatcher() {
    // auto validate
    this.stopValidateWatcher = watchEffect(async () => {
      this.validateCount++;
      const value = this.state.value;
      const formState = this.form.state;
      const count = this.validateCount;
      this._data.isValidating = true;
      const err: FieldError = this.validateFn
        ? (await this.validateFn(value, formState)) || {}
        : {};
      if (count !== this.validateCount) return;
      this._data.isValidating = false;
      const hasError = !!err.message;
      this._data.error.message = err.message || '';
      this._data.error.types = err.types;
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

  onChange(value: KeyPathValue<T, N>) {
    if (value === undefined) return;
    const isChanged = this.state.value !== value;
    this._data.value = value;
    this._data.isChanged = this._data.isChanged || isChanged;
  }

  onTouched() {
    this._data.isTouched = true;
  }

  reset(resetValue?: KeyPathValue<T, N>) {
    this.validateCount++;
    this.stopValidateWatcher?.();
    this.stopDirtyWatcher?.();
    if (resetValue !== undefined) this._data.defaultValue = resetValue;
    this._data.error = {};
    this._data.isError = false;
    this._data.isValidating = false;
    this._data.isDirty = false;
    this._data.isTouched = false;
    this._data.isChanged = false;
    this._data.value = this._data.defaultValue;
    this.initWatcher();
  }
}
