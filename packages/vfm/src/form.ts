import {
  toRaw,
  reactive,
  ref,
  watchEffect,
  WatchStopHandle,
  computed,
  ComputedRef
} from 'vue';
import { FieldClass } from './field';
import { VirtualFieldClass } from './virtualField';
import {
  getKeyValue,
  setKeyValue,
  delKey,
  recursiveUpdateObject
} from './untils';
import {
  FormType,
  FieldValues,
  KeyPathValue,
  FieldError,
  FormState,
  FormErrors,
  FieldStates,
  VirtualFieldStates,
  FieldRule,
  VirtualFieldRule
} from './types';

export type GetFormType<T> = T extends FormClass<infer U> ? U : never;

export class FormClass<
  T extends FormType = FormType,
  VFK extends string = string
> {
  // data
  public state: FormState<T, VFK>;
  public fieldStates = reactive<FieldStates<T>>({} as FieldStates<T>);
  public virtualFieldStates = reactive<VirtualFieldStates<T>>(
    {} as VirtualFieldStates<T>
  );
  public touchType: 'FOCUS' | 'BLUR' = 'BLUR';
  private cacheFields: string[] = [];
  private cacheVirtualFields: string[] = [];
  private isMounted = false;
  // fields
  private fieldsKeys = ref<string[]>([]);
  private fields: Map<string, FieldClass> = new Map();
  private virtualFieldsKeys = ref<string[]>([]);
  private virtualFields: Map<string, VirtualFieldClass> = new Map();
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
    virtualFields?: Record<string, VirtualFieldClass<FormClass<T, VFK>>>;
    touchType?: 'FOCUS' | 'BLUR';
  }) {
    this.defaultValues = toRaw(args.defaultValues || {}) as FieldValues<T>;
    this.state = reactive({
      values: toRaw(this.defaultValues) || {},
      errors: {} as FormErrors<T>,
      virtualErrors: {} as Record<VFK, FieldError | null>,
      error: null,
      isError: false,
      isValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false,
      isSubmitted: false,
      isSubmitting: false,
      submitCount: 0
    }) as FormState<T, VFK>;
    this.touchType = args.touchType || 'BLUR';
  }

  private runInAction = (fn: (...args: any[]) => void) => {
    fn();
  };

  mount() {
    if (this.isMounted) return;

    // register cache fields
    const { cacheFields, cacheVirtualFields } = this;
    this.fieldsKeys.value.push(...cacheFields);
    this.virtualFieldsKeys.value.push(...cacheVirtualFields);
    this.cacheFields = [];
    this.cacheVirtualFields = [];

    // init watchers
    this.stopStateWatcher = watchEffect(() => {
      const keys = this.fieldsKeys.value;
      const virtualKeys = this.virtualFieldsKeys.value;

      let isError = false;
      let isValidating = false;
      let isDirty = false;
      let isTouched = false;
      let isChanged = false;
      let error: FieldError | null = null;
      const updateValues: Record<string, any> = {};
      const updateErrors: Record<string, any> = {};
      const updateFieldStates: Record<string, any> = {};
      const updateVirtualErrors: Record<string, any> = {};
      const updateVirtualFieldStates: Record<string, any> = {};

      // fields
      keys.forEach((k) => {
        const field = this.fields.get(k);
        if (!field) return;
        // get propeties here sync, so vue can track
        const fieldState = field.state;
        const fieldValue = field.state.value;
        const fieldError = field.state.error;
        const fieldStateIsError = field.state.isError;
        const fieldIsValidating = field.state.isValidating;
        const fieldIsDirty = field.state.isDirty;
        const fieldIsTouched = field.state.isTouched;
        const fieldIsChanged = field.state.isChanged;
        setKeyValue(updateValues, k, fieldValue);
        setKeyValue(updateErrors, k, fieldError);
        setKeyValue(updateFieldStates, k, fieldState);
        if (fieldStateIsError) isError = true;
        if (fieldIsValidating) isValidating = true;
        if (fieldIsDirty) isDirty = true;
        if (fieldIsTouched) isTouched = true;
        if (!fieldIsChanged) isChanged = true;
        if (fieldError && !error) {
          error = fieldError;
        }
      });

      // virtual fields
      virtualKeys.forEach((k) => {
        const field = this.virtualFields.get(k);
        if (!field) return;
        const fieldState = field.state;
        const fieldError = field.state.error;
        const fieldIsError = field.state.isError;
        const fieldIsValidating = field.state.isValidating;
        setKeyValue(updateVirtualErrors, k, fieldError);
        setKeyValue(updateVirtualFieldStates, k, fieldState);
        if (fieldIsError) isError = true;
        if (fieldIsValidating) isValidating = true;
        if (fieldError && !error) {
          error = fieldError;
        }
      });

      this.runInAction(() => {
        recursiveUpdateObject(this.state.values, updateValues);
        recursiveUpdateObject(this.state.errors, updateErrors);
        recursiveUpdateObject(this.state.virtualErrors, updateVirtualErrors);
        recursiveUpdateObject(this.fieldStates, updateFieldStates);
        recursiveUpdateObject(
          this.virtualFieldStates,
          updateVirtualFieldStates
        );
        this.state.isError = isError;
        this.state.error = error;
        this.state.isValidating = isValidating;
        this.state.isDirty = isDirty;
        this.state.isTouched = isTouched;
        this.state.isChanged = isChanged;
      });
    });
    this.stopValidatingWatcher = watchEffect(() => {
      const isValidating = this.state.isValidating;
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
      this.unregisterField(name);
    }
    for (const name of this.virtualFieldsKeys.value) {
      this.unregisterVirtualField(name);
    }
    for (const name of this.cacheFields) {
      this.unregisterField(name);
    }
    for (const name of this.cacheVirtualFields) {
      this.unregisterVirtualField(name);
    }
    this.isMounted = false;
  }

  registerField<N extends string>(
    name: N,
    args: {
      value?: KeyPathValue<T, N>;
      defaultValue?: KeyPathValue<T, N>;
      rules?: FieldRule<KeyPathValue<T, N>, FormState<T>>[];
      immediate?: boolean;
      transform?: (v: KeyPathValue<T, N>) => KeyPathValue<T, N>;
      onFocus?: () => void;
    } = {}
  ): { field: FieldClass<T, N>; register: () => void } {
    const { immediate = true } = args;
    const { fieldsKeys, fields } = this;
    if (fieldsKeys.value.includes(name)) {
      console.warn(`Duplicate field <${name}>.`);
      return {
        field: this.fields.get(name)! as unknown as FieldClass<T, N>,
        register: () => {}
      };
    }
    for (const k of fieldsKeys.value) {
      if (k.startsWith(`${name}.`) || name.startsWith(`${k}.`)) {
        console.warn(`Fields can not be nested together: <${name}> <${k}>.`);
        return {
          field: this.fields.get(name)! as unknown as FieldClass<T, N>,
          register: () => {}
        };
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
    const field: FieldClass<T, N> = new FieldClass(this, {
      ...args,
      name,
      value,
      defaultValue
    });
    const register = () => {
      fields.set(name, field as any);
      this.runInAction(() => {
        if (this.isMounted) {
          this.fieldsKeys.value.push(name);
        } else {
          this.cacheFields.push(name);
        }
      });
      field.initWatcher();
    };
    if (immediate) {
      register();
      return { field, register: () => {} };
    }
    return { register, field };
  }

  registerVirtualField(
    name: string,
    args: {
      rules?: VirtualFieldRule<FormState<T>>[];
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
    const field = new VirtualFieldClass(this, { ...args, name });
    const register = () => {
      virtualFields.set(name, field as any);
      this.runInAction(() => {
        if (this.isMounted) {
          this.virtualFieldsKeys.value.push(name);
        } else {
          this.cacheVirtualFields.push(name);
        }
      });
      field.initWatcher();
    };
    if (immediate) {
      register();
      return { field, register: () => {} };
    }
    return { register, field };
  }

  unregisterField(name: string) {
    const { fields } = this;
    const field = fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    field.onUnregister();
    if (this.isMounted) {
      const findIndex = this.fieldsKeys.value.indexOf(name);
      findIndex !== -1 && this.fieldsKeys.value.splice(findIndex, 1);
    } else {
      const findIndex = this.cacheFields.indexOf(name);
      findIndex !== -1 && this.cacheFields.splice(findIndex, 1);
    }
    this.runInAction(() => {
      delKey(this.state.values, name);
      delKey(this.state.errors, name);
      delKey(this.fieldStates, name);
    });
    fields.delete(name);
  }

  unregisterVirtualField(name: string) {
    const { virtualFields } = this;
    const field = virtualFields.get(name);
    if (!field) {
      console.warn(`Virtual field not exists <${name}>.`);
      return;
    }
    field.onUnregister();
    if (this.isMounted) {
      const findIndex = this.virtualFieldsKeys.value.indexOf(name);
      findIndex !== -1 && this.virtualFieldsKeys.value.splice(findIndex, 1);
    } else {
      const findIndex = this.cacheVirtualFields.indexOf(name);
      findIndex !== -1 && this.cacheVirtualFields.splice(findIndex, 1);
    }
    this.runInAction(() => {
      delKey(this.state.virtualErrors, name);
      delKey(this.virtualFieldStates, name);
    });
    virtualFields.delete(name);
  }

  setValue(name: string, value: any) {
    if (value === undefined) return;
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    field.onChange(value);
  }

  getValue<N extends string>(name: N): ComputedRef<KeyPathValue<T, N>> {
    return computed(() => {
      return getKeyValue(this.state.values, name);
    });
  }

  setTouched(name: string, touched = true) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    field.onTouched(touched);
  }

  setFocus(name: string) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    field.onFocus();
  }

  submit(
    onSuccess: (data: FieldValues<T>) => void,
    onError: (errors: FormErrors<T>) => void
  ) {
    const callback = () => {
      this.runInAction(() => {
        this.state.isSubmitting = false;
      });
      if (this.state.isError) {
        onError(toRaw(this.state.errors));
        return;
      }
      this.runInAction(() => {
        this.state.isSubmitted = true;
      });
      onSuccess(toRaw(this.state.values));
    };
    this.runInAction(() => {
      this.state.submitCount++;
      this.state.isSubmitting = true;
    });
    // check validdating status
    if (this.state.isValidating) {
      this.waiters.push(() => {
        callback();
      });
    } else {
      callback();
    }
  }

  reset(values?: FieldValues<T>) {
    this.waiters = [];
    this.runInAction(() => {
      this.state.values = values === undefined ? this.defaultValues : values;
      this.state.errors = {} as FormErrors<T>;
      this.state.virtualErrors = {} as Record<VFK, FieldError | null>;
      this.state.error = null;
      this.state.isError = false;
      this.state.isValidating = false;
      this.state.isDirty = false;
      this.state.isTouched = false;
      this.state.isChanged = false;
      this.state.isSubmitted = false;
      this.state.isSubmitting = false;
      this.state.submitCount = 0;
    });
    for (const [name, field] of this.fields) {
      const formValue = getKeyValue(this.state.values, name);
      field.reset(formValue);
    }
  }
}

export const createForm = <
  T extends FormType = FormType,
  VFK extends string = string
>(args: {
  defaultValues?: FieldValues<T>;
  virtualFields?: Record<string, VirtualFieldClass<FormClass<T, VFK>>>;
  touchType?: 'FOCUS' | 'BLUR';
}) => {
  return new FormClass<T, VFK>(args);
};
