import {
  watchEffect,
  reactive,
  readonly,
  ref,
  WatchStopHandle,
  toRaw
} from 'vue';
import { Field, VirtualField } from './field';
import { getKeyValue, setKeyValue, delKey, updateObject } from './untils';
import {
  FieldValuesType,
  FieldValues,
  KeyPathValue,
  ValidateFunc,
  FieldError,
  FormState,
  FormErrors,
  VirtualValidateFunc
} from './types';

export class Form<
  T extends FieldValuesType = FieldValuesType,
  VFK extends string = string
> {
  private fieldsKeys = ref<string[]>([]);
  private fields: Map<string, Field> = new Map();
  private virtualFieldsKeys = ref<string[]>([]);
  private virtualFields: Map<string, VirtualField> = new Map();
  // data
  private _data: FormState<T, VFK>;
  private data: FormState<T, VFK> | null = null;
  private _fieldStates: Record<string, any> = reactive({});
  private _fieldStatesReadonly: Record<string, any> | null = null;
  // watcher
  private stopStateWatcher: WatchStopHandle | null = null;
  private stopStatusWatcher: WatchStopHandle | null = null;
  private stopValidatingWatcher: WatchStopHandle | null = null;
  // waiter
  private waiters: (() => void)[] = [];
  // default values
  private defaultValues: FieldValues<T> = {} as FieldValues<T>;

  constructor(args: {
    defaultValues?: FieldValues<T>;
    virtualFields?: Record<string, VirtualField<Form<T, VFK>>>;
  }) {
    this.defaultValues = (args.defaultValues || {}) as FieldValues<T>;
    this._data = reactive({
      values: toRaw(this.defaultValues) || {},
      error: null,
      errors: {},
      virtualErrors: {},
      isError: false,
      isValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false,
      isSubmitted: false,
      isSubmitting: false,
      submitCount: 0
    }) as FormState<T, VFK>;
  }

  // form state
  get state() {
    if (!this.data) this.data = readonly(this._data) as FormState<T, VFK>;
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
      const virtualKeys = this.virtualFieldsKeys.value;

      let isError = false;
      let isValidating = false;
      let isDirty = false;
      let isTouched = false;
      let isChanged = false;

      // fields
      const fieldStates = {};
      const errors = {};
      let error: FieldError | null = null;
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
        if (field.state.error?.message && !error) {
          error = field.state.error;
        }
      });
      updateObject(this._fieldStates, fieldStates);
      updateObject(this._data.errors, errors);

      // virtual fields
      const virtualErrors = {};
      virtualKeys.forEach((k) => {
        const field = this.virtualFields.get(k);
        if (!field) return;

        setKeyValue(virtualErrors, k, field.state.error);
        if (field.state.isError) isError = true;
        if (field.state.isValidating) isValidating = true;
        if (field.state.error?.message && !error) {
          error = field.state.error;
        }
      });
      updateObject(this._data.virtualErrors, virtualErrors);

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
      validate?: ValidateFunc<KeyPathValue<T, N>, FormState<T, VFK>> | null;
    } = {}
  ) {
    const { fieldsKeys, fields } = this;
    if (fieldsKeys.value.includes(name)) {
      throw `Duplicate field <${name}>.`;
    }
    for (const k of fieldsKeys.value) {
      if (k.startsWith(`${name}.`) || name.startsWith(`${k}.`)) {
        throw `Fields can not be nested together: <${name}> <${k}>.`;
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

  registerVirtualField(
    name: string,
    args: {
      validate?: VirtualValidateFunc<FormState<T, VFK>> | null;
    } = {}
  ) {
    const { virtualFieldsKeys, virtualFields } = this;
    if (virtualFieldsKeys.value.includes(name)) {
      throw `Duplicate virtual field <${name}>.`;
    }
    const field = new VirtualField(this, { ...args, name });
    virtualFields.set(name, field as any);
    this.virtualFieldsKeys.value.push(name);
  }

  unregisterField(name: string) {
    const { fields } = this;
    const field = fields.get(name);
    if (!field) {
      throw `Field not exists <${name}>.`;
    }
    field.onUnregister();
    const findIndex = this.fieldsKeys.value.indexOf(name);
    findIndex !== -1 && this.fieldsKeys.value.splice(findIndex, 1);
    delKey(this._data.values, name);
    fields.delete(name);
  }

  unregisterVirtualField(name: string) {
    const { virtualFields } = this;
    const field = virtualFields.get(name);
    if (!field) {
      throw `Virtual field not exists <${name}>.`;
    }
    field.onUnregister();
    const findIndex = this.virtualFieldsKeys.value.indexOf(name);
    findIndex !== -1 && this.virtualFieldsKeys.value.splice(findIndex, 1);
    virtualFields.delete(name);
  }

  setValue(name: string, value: any) {
    if (value === undefined) return;
    const field = this.fields.get(name);
    if (!field) {
      throw `Field not exists <${name}>.`;
    }
    field.onChange(value);
  }

  submit(
    onSuccess: (data: FieldValues<T>) => void,
    onError: (errors: FormErrors) => void
  ) {
    const callback = () => {
      this._data.isSubmitting = false;
      if (this.state.isError) {
        onError(toRaw(this.state.errors));
        return;
      }
      this._data.isSubmitted = true;
      onSuccess(toRaw(this.state.values));
    };
    this._data.submitCount++;
    this._data.isSubmitting = true;
    // check validdating status
    if (this.state.isValidating) {
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
