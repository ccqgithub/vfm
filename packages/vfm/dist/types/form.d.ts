import { ComputedRef } from 'vue';
import { FieldClass } from './field';
import { VirtualFieldClass } from './virtualField';
import { FormType, FieldValues, KeyPathValue, FormState, FormErrors, FieldRule, VirtualFieldRule } from './types';
export declare type GetFormType<T> = T extends FormClass<infer U> ? U : never;
export declare class FormClass<T extends FormType = FormType, VFK extends string = string> {
    state: FormState<T, VFK>;
    fieldStates: import("vue").UnwrapNestedRefs<import("./types").UnpackFieldState<import("./types").DeepPartial<T>>>;
    virtualFieldStates: import("vue").UnwrapNestedRefs<import("./types").UnpackVirtualFieldState<import("./types").DeepPartial<T>>>;
    touchType: 'FOCUS' | 'BLUR';
    private cacheFields;
    private cacheVirtualFields;
    private isMounted;
    private fieldsKeys;
    private fields;
    private virtualFieldsKeys;
    private virtualFields;
    private stopStateWatcher;
    private stopStatusWatcher;
    private stopValidatingWatcher;
    private waiters;
    private defaultValues;
    constructor(args: {
        defaultValues?: FieldValues<T>;
        virtualFields?: Record<string, VirtualFieldClass<FormClass<T, VFK>>>;
        touchType?: 'FOCUS' | 'BLUR';
    });
    private runInAction;
    mount(): void;
    unmount(): void;
    registerField<N extends string>(name: N, args?: {
        value?: KeyPathValue<T, N>;
        defaultValue?: KeyPathValue<T, N>;
        rules?: FieldRule<KeyPathValue<T, N>, FormState<T>>[];
        immediate?: boolean;
        transform?: (v: KeyPathValue<T, N>) => KeyPathValue<T, N>;
        onFocus?: () => void;
    }): {
        field: FieldClass<T, N>;
        register: () => void;
    };
    registerVirtualField(name: string, args?: {
        rules?: VirtualFieldRule<FormState<T>>[];
        immediate?: boolean;
    }): {
        field: VirtualFieldClass<T>;
        register: () => void;
    };
    unregisterField(name: string): void;
    unregisterVirtualField(name: string): void;
    setValue<N extends string>(name: N, value: KeyPathValue<T, N>): void;
    deleteValue<N extends string>(name: N): void;
    getValue<N extends string>(name: N): ComputedRef<KeyPathValue<T, N>>;
    setTouched(name: string, touched?: boolean): void;
    setFocus(name: string): void;
    submit(onSuccess: (data: FieldValues<T>) => void, onError: (errors: FormErrors<T>) => void): void;
    reset(values?: FieldValues<T>): void;
}
export declare const createForm: <T extends FormType = FormType, VFK extends string = string>(args: {
    defaultValues?: import("./types").UnpackNestedValue<import("./types").DeepPartial<T>> | undefined;
    virtualFields?: Record<string, VirtualFieldClass<FormClass<T, VFK>>> | undefined;
    touchType?: "FOCUS" | "BLUR" | undefined;
}) => FormClass<T, VFK>;
//# sourceMappingURL=form.d.ts.map