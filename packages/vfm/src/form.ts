import {
  ref,
  toRaw,
  reactive,
  readonly,
  computed,
  ComputedRef,
  watchEffect,
  WatchStopHandle
} from 'vue';
import { FieldClass } from './field';
import { VirtualFieldClass } from './virtualField';
import {
  delKey,
  getKeyValue,
  setKeyValue,
  recursiveUpdateObject
} from './untils';
import {
  AutoPath,
  FormType,
  FieldRule,
  FieldPath,
  FormState,
  FieldError,
  FormErrors,
  FieldStates,
  FieldValues,
  KeyPathValue,
  VirtualFieldRule,
  VirtualFieldStates
} from './types';

export type GetFormType<T> = T extends FormClass<infer U> ? U : never;

export class FormClass<
  T extends FormType = FormType,
  VFK extends string = string
> {
  public touchType: 'FOCUS' | 'BLUR' = 'BLUR';
  // states
  private _state: FormState<T, VFK>;
  private _publicState: FormState<T, VFK> | null = null;
  private _fieldStates = reactive({}) as FieldStates<T>;
  private _publicFieldStates: FieldStates<T> | null = null;
  private _virtualFieldStates = reactive({}) as VirtualFieldStates<VFK>;
  private _publicVirtualFieldStates: VirtualFieldStates<VFK> | null = null;
  // fields
  private fieldsKeys = ref<string[]>([]);
  private fields: Map<string, FieldClass> = new Map();
  private virtualFieldsKeys = ref<string[]>([]);
  private virtualFields: Map<string, VirtualFieldClass> = new Map();
  private cacheFields: string[] = [];
  private cacheVirtualFields: string[] = [];
  // watcher
  private stopStateWatcher: WatchStopHandle | null = null;
  private stopStatusWatcher: WatchStopHandle | null = null;
  private stopValidatingWatcher: WatchStopHandle | null = null;
  // waiter
  private waiters: (() => void)[] = [];
  // subscribers
  private subscribers: ((
    type: 'UPDATE' | 'DELETE' | 'RESET',
    name?: string
  ) => void)[] = [];
  // mounted
  private isMounted = false;
  private readonly = false;
  private submitFlag = 0;
  private initValues: FieldValues<T>;
  private defaultValues?: FieldValues<T, true>;

  constructor(args: {
    initValues: FieldValues<T>;
    defaultValues?: FieldValues<T, true>;
    // when to setTouched
    touchType?: 'FOCUS' | 'BLUR';
    // state readonly
    readonly?: boolean;
  }) {
    const { initValues = {} as FieldValues<T> } = args;
    this.initValues = toRaw(initValues);
    this.defaultValues = toRaw(args.defaultValues);
    this._state = reactive({
      values: initValues,
      defaultValues: args.defaultValues || initValues,
      fieldErrors: {} as FormErrors<T>,
      virtualErrors: {} as Record<VFK, FieldError | null>,
      error: null,
      fieldError: null,
      virtualError: null,
      isError: false,
      isFieldError: false,
      isVirtualError: false,
      isValidating: false,
      isFieldValidating: false,
      isVirtualValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false,
      isSubmitted: false,
      isSubmitting: false,
      submitCount: 0
    }) as FormState<T, VFK>;
    this.touchType = args.touchType || 'BLUR';
    this.readonly = args.readonly || false;
  }

  get state(): FormState<T, VFK> {
    if (!this.readonly) return this._state;
    if (!this._publicState) {
      this._publicState = readonly(this._state) as FormState<T, VFK>;
    }
    return this._publicState;
  }

  get fieldStates(): FieldStates<T> {
    if (!this.readonly) return this._fieldStates;
    if (!this._publicFieldStates) {
      this._publicFieldStates = readonly(this._fieldStates) as FieldStates<T>;
    }
    return this._publicFieldStates;
  }

  get virtualFieldStates(): VirtualFieldStates<VFK> {
    if (!this.readonly) return this._virtualFieldStates;
    if (!this._publicVirtualFieldStates) {
      this._publicVirtualFieldStates = readonly(
        this._virtualFieldStates as any
      ) as VirtualFieldStates<VFK>;
    }
    return this._publicVirtualFieldStates;
  }

  runInAction = (fn: (...args: any[]) => void) => {
    fn();
  };

  mount() {
    if (this.isMounted) return;

    // register cache fields
    const { cacheFields, cacheVirtualFields } = this;
    this.fieldsKeys.value.push(...cacheFields);
    this.virtualFieldsKeys.value.push(...cacheVirtualFields);
    for (const k of cacheFields) {
      const filed = this.fields.get(k);
      filed?.initWatcher();
    }
    for (const k of cacheVirtualFields) {
      const filed = this.virtualFields.get(k);
      filed?.initWatcher();
    }
    this.cacheFields = [];
    this.cacheVirtualFields = [];

    // init watchers
    // keys change, or fields state change
    this.stopStateWatcher = watchEffect(() => {
      const keys = this.fieldsKeys.value;
      const virtualKeys = this.virtualFieldsKeys.value;

      let isFieldError = false;
      let isVirtualError = false;
      let isFieldValidating = false;
      let isVirtualValidating = false;
      let isDirty = false;
      let isTouched = false;
      let isChanged = false;
      let fieldError: FieldError | null = null;
      let virtualError: FieldError | null = null;
      const updateFieldErrors: Record<string, any> = {};
      const updateFieldStates: Record<string, any> = {};
      const updateVirtualErrors: Record<string, any> = {};
      const updateVirtualFieldStates: Record<string, any> = {};

      // fields
      keys.forEach((k) => {
        const field = this.fields.get(k);
        if (!field) return;
        // get propeties here sync, so vue can track
        const fdState = field.state;
        const fdError = field.state.error;
        const fdStateIsError = field.state.isError;
        const fdIsValidating = field.state.isValidating;
        const fdIsDirty = field.state.isDirty;
        const fdIsTouched = field.state.isTouched;
        const fdIsChanged = field.state.isChanged;
        setKeyValue(updateFieldErrors, k, fdError);
        setKeyValue(updateFieldStates, k, fdState);
        if (fdStateIsError) isFieldError = true;
        if (fdIsValidating) isFieldValidating = true;
        if (fdIsDirty) isDirty = true;
        if (fdIsTouched) isTouched = true;
        if (fdIsChanged) isChanged = true;
        if (fdError && !fieldError) {
          fieldError = fdError;
        }
      });

      // virtual fields
      virtualKeys.forEach((k) => {
        const field = this.virtualFields.get(k);
        if (!field) return;
        const fdState = field.state;
        const fdError = field.state.error;
        const fdIsError = field.state.isError;
        const fdIsValidating = field.state.isValidating;
        setKeyValue(updateVirtualErrors, k, fdError);
        setKeyValue(updateVirtualFieldStates, k, fdState);
        if (fdIsError) isVirtualError = true;
        if (fdIsValidating) isVirtualValidating = true;
        if (fdError && !virtualError) {
          virtualError = fdError;
        }
      });

      this.runInAction(() => {
        recursiveUpdateObject(this._state.fieldErrors, updateFieldErrors);
        recursiveUpdateObject(this._state.virtualErrors, updateVirtualErrors);
        recursiveUpdateObject(this._fieldStates, updateFieldStates);
        recursiveUpdateObject(
          this._virtualFieldStates,
          updateVirtualFieldStates
        );
        this._state.isFieldError = isFieldError;
        this._state.isVirtualError = isVirtualError;
        this._state.isError = isFieldError || isVirtualError;
        this._state.fieldError = fieldError;
        this._state.virtualError = virtualError;
        this._state.error = fieldError || virtualError;
        this._state.isFieldValidating = isFieldValidating;
        this._state.isVirtualValidating = isVirtualValidating;
        this._state.isValidating = isFieldValidating || isVirtualValidating;
        this._state.isDirty = isDirty;
        this._state.isTouched = isTouched;
        this._state.isChanged = isChanged;
      });
    });
    this.stopValidatingWatcher = watchEffect(() => {
      const isValidating = this._state.isValidating;
      // validate end
      if (!isValidating) {
        this.waiters.forEach((fn) => {
          fn();
        });
      }
      this.waiters = [];
    });
    this.isMounted = true;
  }

  unmount() {
    this.stopStateWatcher?.();
    this.stopStatusWatcher?.();
    this.stopValidatingWatcher?.();
    for (const name of this.fieldsKeys.value) {
      this.unregisterField(name as any);
    }
    for (const name of this.virtualFieldsKeys.value) {
      this.unregisterVirtualField(name as any);
    }
    for (const name of this.cacheFields) {
      this.unregisterField(name as any);
    }
    for (const name of this.cacheVirtualFields) {
      this.unregisterVirtualField(name as any);
    }
    this.isMounted = false;
  }

  registerField<
    N extends FieldPath<T>,
    V extends KeyPathValue<T, N> = KeyPathValue<T, N>
  >(
    name: N,
    args: {
      rules?: FieldRule<V, FormState<T>>[];
      immediate?: boolean;
      transform?: (v: V) => V;
      isEqual?: (v: V, d: V) => boolean;
      onFocus?: () => void;
    } = {}
  ): { field: FieldClass<T, N, V>; register: () => void } {
    const { immediate = true } = args;
    const { fieldsKeys, fields } = this;
    if (fieldsKeys.value.includes(name)) {
      console.warn(`Duplicate field <${name}>.`);
      return {
        field: this.fields.get(name)! as unknown as FieldClass<T, N, V>,
        register: () => {}
      };
    }
    for (const k of fieldsKeys.value) {
      if (k.startsWith(`${name}.`) || name.startsWith(`${k}.`)) {
        console.warn(
          `Fields can not be nested together: <${name}> <${k}>. If you want do this, please use [registerVirtualField]`
        );
        return {
          field: this.fields.get(name)! as unknown as FieldClass<T, N, V>,
          register: () => {}
        };
      }
    }
    // field value
    const field: FieldClass<T, N, V> = new FieldClass(this as FormClass<T>, {
      ...args,
      name
    });
    const register = () => {
      fields.set(name, field as any);
      this.runInAction(() => {
        if (this.isMounted) {
          this.fieldsKeys.value.push(name);
          field.initWatcher();
        } else {
          this.cacheFields.push(name);
        }
      });
    };
    if (immediate) {
      register();
      return { field, register: () => {} };
    }
    return { register, field };
  }

  registerVirtualField<N extends VFK = VFK>(
    name: N,
    args: {
      rules?: VirtualFieldRule<FormState<T, VFK>>[];
      immediate?: boolean;
    } = {}
  ): { field: VirtualFieldClass<T>; register: () => void } {
    const { immediate = true } = args;
    const { virtualFieldsKeys, virtualFields } = this;
    if (virtualFieldsKeys.value.includes(name)) {
      console.warn(`Duplicate virtual field <${name}>.`);
      return {
        field: this.virtualFields.get(name) as VirtualFieldClass<T>,
        register: () => {}
      };
    }
    const field = new VirtualFieldClass(this as FormClass<T>, {
      ...args,
      name
    });
    const register = () => {
      virtualFields.set(name, field as any);
      this.runInAction(() => {
        if (this.isMounted) {
          this.virtualFieldsKeys.value.push(name);
          field.initWatcher();
        } else {
          this.cacheVirtualFields.push(name);
        }
      });
    };
    if (immediate) {
      register();
      return { field, register: () => {} };
    }
    return { register, field };
  }

  unregisterField<N extends FieldPath<T>>(
    name: N,
    args: {
      removeValue?: boolean;
    } = {}
  ) {
    const { removeValue = false } = args;
    const { fields } = this;
    const field = fields.get(name);
    if (!field) return;
    field.onUnregister();
    if (this.isMounted) {
      const findIndex = this.fieldsKeys.value.indexOf(name);
      findIndex !== -1 && this.fieldsKeys.value.splice(findIndex, 1);
    } else {
      const findIndex = this.cacheFields.indexOf(name);
      findIndex !== -1 && this.cacheFields.splice(findIndex, 1);
    }
    this.runInAction(() => {
      removeValue && delKey(this._state.values, name);
      removeValue && delKey(this._state.defaultValues, name);
      delKey(this._state.fieldErrors, name);
      delKey(this._fieldStates, name);
    });
    fields.delete(name);
  }

  unregisterVirtualField<N extends VFK>(name: N) {
    const { virtualFields } = this;
    const field = virtualFields.get(name);
    if (!field) return;
    field.onUnregister();
    if (this.isMounted) {
      const findIndex = this.virtualFieldsKeys.value.indexOf(name);
      findIndex !== -1 && this.virtualFieldsKeys.value.splice(findIndex, 1);
    } else {
      const findIndex = this.cacheVirtualFields.indexOf(name);
      findIndex !== -1 && this.cacheVirtualFields.splice(findIndex, 1);
    }
    this.runInAction(() => {
      delKey(this._state.virtualErrors, name);
      delKey(this._virtualFieldStates, name);
    });
    virtualFields.delete(name);
  }

  setPathValue<N extends AutoPath<T>>(name: N, value: KeyPathValue<T, N>) {
    if (value === undefined) return;
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    this.notify('UPDATE', name);
  }

  setValue<N extends FieldPath<T>>(name: N, value: KeyPathValue<T, N>) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    const lastValue = toRaw(getKeyValue(this._state.values, name));
    const changed = lastValue !== toRaw(value);
    this.setPathValue(name as any, value);
    field.onChanged(field.state.isChanged || changed);
  }

  deletePathValue<N extends AutoPath<T>>(name: N) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    delKey(this._state.values, name);
    this.notify('DELETE', name);
  }

  deleteValue<N extends FieldPath<T>>(name: N) {
    this.deletePathValue(name as any);
  }

  getValue<N extends AutoPath<T>>(name: N): ComputedRef<KeyPathValue<T, N>> {
    return computed(() => {
      return getKeyValue(this._state.values, name);
    });
  }

  setTouched<N extends FieldPath<T>>(name: N, touched = true) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    field.onTouched(touched);
  }

  setFocus<N extends FieldPath<T>>(name: N) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    field.onFocus();
  }

  submit(
    onSuccess: (data: FieldValues<T>) => void,
    onError: (error: FieldError | null) => void
  ) {
    const flag = this.submitFlag;
    const callback = () => {
      if (flag !== this.submitFlag) return;
      this.runInAction(() => {
        this._state.isSubmitting = false;
      });
      if (this._state.isError) {
        onError(toRaw(this._state.error));
        return;
      }
      this.runInAction(() => {
        this._state.isSubmitted = true;
      });
      onSuccess(toRaw(this._state.values));
    };
    this.runInAction(() => {
      this._state.submitCount++;
      this._state.isSubmitting = true;
    });
    // check validdating status
    if (this._state.isValidating) {
      this.waiters.push(() => {
        callback();
      });
    } else {
      callback();
    }
  }

  reset(
    args: {
      values?: FieldValues<T>;
      defaultValues?: FieldValues<T, true>;
      keepValues?: boolean;
      keepDefaultValues?: boolean;
      keepTouched?: boolean;
      keepChanged?: boolean;
      keepIsSubmitted?: boolean;
      keepSubmitCount?: boolean;
    } = {}
  ) {
    this.waiters = [];
    this.runInAction(() => {
      // values
      if (args.values) {
        this._state.values = toRaw(args.values);
        this.initValues = toRaw(args.values);
      } else if (!args.keepValues) {
        this._state.values = this.initValues;
      }
      // default values
      if (args.defaultValues) {
        this._state.defaultValues = toRaw(args.defaultValues);
        this.defaultValues = args.defaultValues;
      } else if (!args.keepDefaultValues) {
        this._state.defaultValues =
          (this.initValues as any) || this.defaultValues;
      }
      // other
      this.submitFlag++;
      this._state.isSubmitting = false;
      this._state.submitCount = args.keepSubmitCount
        ? this._state.submitCount
        : 0;
      this._state.isSubmitted = args.keepIsSubmitted
        ? this._state.isSubmitted
        : false;
    });
    for (const [, field] of this.fields) {
      field.reset({
        keepTouched: args.keepTouched,
        keepChanged: args.keepChanged
      });
    }
    this.notify('RESET');
  }

  resetField<N extends FieldPath<T>>(
    name: N,
    args: {
      keepTouched?: boolean;
      keepChanged?: boolean;
      keepValue?: boolean;
      value?: KeyPathValue<T, N>;
      defaultValue?: KeyPathValue<T, N>;
    } = {}
  ) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    if ('defaultValue' in args) {
      setKeyValue(this._state.defaultValues, name, toRaw(args.defaultValue));
    }
    if ('value' in args) {
      setKeyValue(this._state.values, name, toRaw(args.value));
    } else if (!args.keepValue) {
      const v = getKeyValue(this._state.defaultValues, name);
      setKeyValue(this._state.values, name, toRaw(v));
    }
    field.reset({
      keepTouched: args.keepTouched,
      keepChanged: args.keepChanged
    });
  }

  subscribe(
    subscriber: (type: 'UPDATE' | 'DELETE' | 'RESET', name?: string) => void
  ) {
    this.subscribers.push(subscriber);
    const unsubscribe = () => {
      const index = this.subscribers.indexOf(subscriber);
      if (index !== -1) this.subscribers.splice(index, 1);
    };
    return unsubscribe;
  }

  notify(type: 'UPDATE' | 'DELETE' | 'RESET', name?: string) {
    this.subscribers.forEach((subscriber) => {
      subscriber(type, name);
    });
  }
}

export const createForm = <
  T extends FormType = FormType,
  VFK extends string = string
>(args: {
  initValues: FieldValues<T>;
  defaultValues?: FieldValues<T, true>;
  touchType?: 'FOCUS' | 'BLUR';
  readonly?: boolean;
}) => {
  return new FormClass<T, VFK>(args);
};
