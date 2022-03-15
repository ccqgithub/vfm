import {
  watchEffect,
  reactive,
  readonly,
  ref,
  WatchStopHandle,
  toRaw
} from 'vue';
import { Field, ValidateFunc, FieldError } from './field';
import { getKeyValue, setKeyValue, delKey, updateObject } from './untils';
import { FieldValuesType, FieldValues, KeyPathValue } from './types';

export type FormErrors = Record<string, FieldError | null>;

export type FormState<T extends FieldValuesType> = {
  // 当前值 { a: { b: { c: 222 }, d: [{ e: 2}] } }
  values: FieldValues<T>;
  // 错误信息
  error: string;
  errors: FormErrors;
  // 是否有错误
  isError: boolean;
  // 正在验证
  isValidating: boolean;
  // 值被更改过, 当前值和默认值不相等
  isDirty: boolean;
  // 字段有过交互，比如 input focus
  isTouched: boolean;
  // 是否改变过
  isChanged: boolean;
  // 是否提交过
  isSubmitted: boolean;
  // 正在提交
  isSubmitting: boolean;
  // 提交次数
  submitCount: number;
};

export class Form<T extends FieldValuesType = {}> {
  private fieldsKeys = ref<string[]>([]);
  private fields: Map<string, Field<T, this>> = new Map();
  // data
  private _data: FormState<T>;
  private data: FormState<T> | null = null;
  private _fieldStates: Record<string, any> = reactive({});
  private _fieldStatesReadonly: Record<string, any> | null = null;
  // watcher
  private stopStateWatcher: WatchStopHandle | null = null;
  private stopStatusWatcher: WatchStopHandle | null = null;
  private stopValidatingWatcher: WatchStopHandle | null = null;
  // waiter
  private waiters: (() => void)[] = [];
  // default values
  defaultValues: FieldValues<T> = {} as FieldValues<T>;

  constructor(args: { defaultValues?: FieldValues<T> }) {
    this.defaultValues = (args.defaultValues || {}) as FieldValues<T>;
    this._data = reactive({
      values: toRaw(this.defaultValues) || {},
      error: '',
      errors: {},
      isError: false,
      isValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false,
      isSubmitted: false,
      isSubmitting: false,
      submitCount: 0
    }) as FormState<T>;
  }

  // form state
  get state() {
    if (!this.data) this.data = readonly(this._data) as FormState<T>;
    return this.data;
  }

  // field states
  get fieldStates() {
    if (!this._fieldStatesReadonly) {
      this._fieldStatesReadonly = readonly(this._fieldStates);
    }
    return this._fieldStatesReadonly;
  }

  mount() {
    this.stopStateWatcher = watchEffect(() => {
      const keys = this.fieldsKeys.value;
      let isError = false;
      let isValidating = false;
      let isDirty = false;
      let isTouched = false;
      let isChanged = false;

      const fieldStates = {};
      const errors = {};
      let error = '';
      keys.forEach((k) => {
        const field = this.fields.get(k);
        if (!field) return;
        setKeyValue(fieldStates, k, field.state);
        setKeyValue(errors, k, field.state.error);
        setKeyValue(this._data.values, k, field.state.value);
        if (field.state.isError) isError = true;
        if (field.state.isValidating) isValidating = true;
        if (field.state.isDirty) isDirty = true;
        if (field.state.isTouched) isTouched = true;
        if (!field.state.isChanged) isChanged = true;
        if (field.state.error.message && !error) {
          error = field.state.error.message;
        }
      });
      updateObject(this._fieldStates, fieldStates);
      updateObject(this._data.errors, errors);
      this._data.isError = isError;
      this._data.error = error;
      this._data.isValidating = isValidating;
      this._data.isDirty = isDirty;
      this._data.isTouched = isTouched;
      this._data.isChanged = isChanged;
    });
    this.stopValidatingWatcher = watchEffect(() => {
      const isValidating = this.state.isValidating;
      if (!isValidating) {
        this.waiters.forEach((fn) => {
          fn();
        });
      }
      this.waiters = [];
    });
  }

  unmount() {
    this.stopStateWatcher?.();
    this.stopStatusWatcher?.();
    this.stopValidatingWatcher?.();
  }

  registerField<N extends string>(
    name: N,
    args: {
      value?: KeyPathValue<T, N>;
      defaultValue?: KeyPathValue<T, N>;
      validateFn?: ValidateFunc<T, N> | null;
    } = {}
  ) {
    const { fieldsKeys, fields } = this;
    if (fieldsKeys.value.includes(name)) {
      throw `字段已存在`;
    }
    for (const k of fieldsKeys.value) {
      if (k.includes(name) || name.includes(k)) {
        throw `一个字段内不能包含另一个字段`;
      }
    }
    // field value
    const formValue = getKeyValue(this.state.values, name);
    let value: any = args.value;
    if (value === undefined) value = formValue;
    if (value === undefined) value = args.defaultValue;
    // field default value
    const defaultValue =
      formValue === undefined ? args.defaultValue : formValue;
    const field = new Field(this, { ...args, name, value, defaultValue });
    fields.set(name, field as any);
    this.fieldsKeys.value.push(name);
  }

  unregisterField(name: string) {
    const { fields } = this;
    const field = fields.get(name);
    if (!field) {
      throw `字段不存在`;
    }
    field.onUnregister();
    const findIndex = this.fieldsKeys.value.indexOf(name);
    findIndex !== -1 && this.fieldsKeys.value.splice(findIndex, 1);
    delKey(this._data.values, name);
    fields.delete(name);
  }

  setValue(name: string, value: any) {
    if (value === undefined) return;
    const field = this.fields.get(name);
    if (!field) {
      throw `字段不存在`;
    }
    field.onChange(value);
  }

  submit(
    onSuccess: (data: FieldValues<T>) => void,
    onError: (errors: FormErrors) => void
  ) {
    const callback = () => {
      if (this.state.isError) {
        onError(toRaw(this.state.errors));
        return;
      }
      this._data.isSubmitting = false;
      this._data.isSubmitted = true;
      onSuccess(toRaw(this.state.values));
    };
    this._data.submitCount++;
    this._data.isSubmitting = true;
    // check validdating status
    if (!this.state.isValidating) {
      this.waiters.push(() => {
        callback();
      });
    } else {
      callback();
    }
  }

  reset(values?: FormData) {
    this.waiters = [];
    this._data.values =
      values === undefined ? this.defaultValues : (values as FieldValues<T>);
    this._data.errors = {};
    this._data.isError = false;
    this._data.isValidating = false;
    this._data.isDirty = false;
    this._data.isTouched = false;
    this._data.isChanged = false;
    this._data.isSubmitted = false;
    this._data.isSubmitting = false;
    this._data.submitCount = 0;
    for (const [name, field] of this.fields) {
      const formValue = getKeyValue(this.state.values, name);
      field.reset(formValue);
    }
  }
}
