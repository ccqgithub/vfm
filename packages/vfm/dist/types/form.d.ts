import { readonly, ComputedRef } from 'vue';
import { FieldClass } from './field';
import { VirtualFieldClass } from './virtualField';
import { AutoPath, FormType, FieldRule, FieldPath, FormState, FieldError, FieldStates, FieldValues, KeyPathValue, VirtualFieldRule, VirtualFieldStates } from './types';
export declare type GetFormType<T> = T extends FormClass<infer U> ? U : never;
export declare class FormClass<T extends FormType = FormType, VFK extends string = string> {
    touchType: 'FOCUS' | 'BLUR';
    private _state;
    private _publicState;
    private _fieldStates;
    private _publicFieldStates;
    private _virtualFieldStates;
    private _publicVirtualFieldStates;
    private fieldsKeys;
    private fields;
    private virtualFieldsKeys;
    private virtualFields;
    private cacheFields;
    private cacheVirtualFields;
    private stopStateWatcher;
    private stopStatusWatcher;
    private stopValidatingWatcher;
    private waiters;
    private subscribers;
    private isMounted;
    private readonly;
    private submitFlag;
    private initValues;
    private defaultValues?;
    constructor(args: {
        initValues: FieldValues<T>;
        defaultValues?: FieldValues<T, true>;
        touchType?: 'FOCUS' | 'BLUR';
        readonly?: boolean;
    });
    get state(): FormState<T, VFK>;
    get fieldStates(): FieldStates<T>;
    get virtualFieldStates(): VirtualFieldStates<VFK>;
    runInAction: (fn: (...args: any[]) => void) => void;
    mount(): void;
    unmount(): void;
    registerField<N extends FieldPath<T>, V extends KeyPathValue<T, N> = KeyPathValue<T, N>>(name: N, args?: {
        rules?: FieldRule<V, FormState<T>>[];
        immediate?: boolean;
        transform?: (v: V) => V;
        isEqual?: (v: V, d: V) => boolean;
        onFocus?: () => void;
    }): {
        field: FieldClass<T, N, V>;
        register: () => void;
    };
    registerVirtualField<N extends VFK = VFK>(name: N, args?: {
        rules?: VirtualFieldRule<FormState<T, VFK>>[];
        immediate?: boolean;
    }): {
        field: VirtualFieldClass<T>;
        register: () => void;
    };
    unregisterField<N extends FieldPath<T>>(name: N, args?: {
        removeValue?: boolean;
    }): void;
    unregisterVirtualField<N extends VFK>(name: N): void;
    setPathValue<N extends AutoPath<T>>(name: N, value: KeyPathValue<T, N>): void;
    setValue<N extends FieldPath<T>>(name: N, value: KeyPathValue<T, N>): void;
    deletePathValue<N extends AutoPath<T>>(name: N): void;
    deleteValue<N extends FieldPath<T>>(name: N): void;
    getValue<N extends AutoPath<T>>(name: N): ComputedRef<KeyPathValue<T, N>>;
    setTouched<N extends FieldPath<T>>(name: N, touched?: boolean): void;
    setFocus<N extends FieldPath<T>>(name: N): void;
    submit(onSuccess: (data: FieldValues<T>) => void, onError: (error: FieldError | null) => void): void;
    reset(args?: {
        values?: FieldValues<T>;
        defaultValues?: FieldValues<T, true>;
        keepValues?: boolean;
        keepDefaultValues?: boolean;
        keepTouched?: boolean;
        keepChanged?: boolean;
        keepIsSubmitted?: boolean;
        keepSubmitCount?: boolean;
    }): void;
    resetField<N extends FieldPath<T>>(name: N, args?: {
        keepTouched?: boolean;
        keepChanged?: boolean;
        keepValue?: boolean;
        value?: KeyPathValue<T, N>;
        defaultValue?: KeyPathValue<T, N>;
    }): void;
    subscribe(subscriber: (type: 'UPDATE' | 'DELETE' | 'RESET', name?: string) => void): () => void;
    notify(type: 'UPDATE' | 'DELETE' | 'RESET', name?: string): void;
}
export declare const createForm: <T extends FormType = FormType, VFK extends string = string>(args: {
    initValues: import("./types").UnpackNestedValue<T>;
    defaultValues?: import("./types").UnpackNestedValue<import("./types").DeepPartial<T>> | undefined;
    touchType?: "FOCUS" | "BLUR" | undefined;
    readonly?: boolean | undefined;
}) => FormClass<T, VFK>;
//# sourceMappingURL=form.d.ts.map