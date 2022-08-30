import { readonly, ComputedRef } from 'vue';
import { FieldClass } from './field';
import { VirtualFieldClass } from './virtualField';
import { AutoPath, FormType, FieldRule, FieldPath, ArrayItem, FormState, FieldError, FieldValues, KeyPathValue, ArrayFieldPath, VirtualFieldRule } from './types';
export declare type GetFormType<T> = T extends Form<infer U> ? U : never;
/**
 * Class to management form state.
 * @template T form structure type
 */
export declare class Form<T extends FormType = FormType, VFK extends string = string> {
    touchType: 'FOCUS' | 'BLUR';
    private _state;
    private _publicState;
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
    runInAction: (fn: (...args: any[]) => void) => void;
    mount(): void;
    unmount(): void;
    registerField<N extends FieldPath<T>, Deps = any, Transform = KeyPathValue<T, N>>(name: N, args?: {
        value?: KeyPathValue<T, N>;
        defaultValue?: KeyPathValue<T, N>;
        rules?: FieldRule<Transform, Deps>[];
        immediate?: boolean;
        transform?: (v: KeyPathValue<T, N>) => Transform;
        isEqual?: (v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean;
        onFocus?: () => void;
        deps?: () => Deps;
        debounce?: number;
    }): {
        field: FieldClass<T, N, Deps, Transform, VFK>;
        register: () => void;
    };
    registerVirtualField<N extends VFK = VFK, V = any>(name: N, args: {
        rules?: VirtualFieldRule<V>[];
        value: () => V;
        immediate?: boolean;
        debounce?: number;
    }): {
        field: VirtualFieldClass<T, V>;
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
    getPathValueRef<N extends AutoPath<T>>(name: N): ComputedRef<KeyPathValue<T, N>>;
    getValueRef<N extends FieldPath<T>>(name: N): ComputedRef<KeyPathValue<T, N>>;
    getPathValue<N extends AutoPath<T>>(name: N): KeyPathValue<T, N>;
    getValue<N extends FieldPath<T>>(name: N): KeyPathValue<T, N>;
    setTouched<N extends FieldPath<T>>(name: N, touched?: boolean): void;
    setFocus<N extends FieldPath<T>>(name: N): void;
    submit(args?: {
        onSuccess?: (data: FieldValues<T>) => void;
        onError?: (error: FieldError) => void;
    }): void;
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
    fieldState<N extends FieldPath<T>>(name: N): import("./types").FieldState | null;
    virtualFieldState<N extends VFK>(name: N): import("./types").VirtualFieldState | null;
    isDirty<N extends FieldPath<T>>(name: N): boolean;
    isTouched<N extends FieldPath<T>>(name: N): boolean;
    isChanged<N extends FieldPath<T>>(name: N): boolean;
    isValidating<N extends FieldPath<T>>(name: N): boolean;
    isVirtualValidating<N extends VFK>(name: N): boolean;
    isError<N extends FieldPath<T>>(name: N): boolean;
    isVirtualError<N extends VFK>(name: N): boolean;
    fieldError<N extends FieldPath<T>>(name: N, reportType?: 'formTouched' | 'fieldTouched' | 'allTouched' | 'anyTouched' | 'all'): FieldError | null;
    virtualFieldError<N extends VFK>(name: N, reportType?: 'formTouched' | 'all'): FieldError | null;
    arrayAppend<N extends ArrayFieldPath<T>>(name: N, v: ArrayItem<KeyPathValue<T, N>>): void;
    arrayPrepend<N extends ArrayFieldPath<T>>(name: N, v: ArrayItem<KeyPathValue<T, N>>): void;
    arrayInsert<N extends ArrayFieldPath<T>>(name: N, index: number, v: ArrayItem<KeyPathValue<T, N>>): void;
    arraySwap<N extends ArrayFieldPath<T>>(name: N, fromIndex: number, toIndex: number): void;
    arrayMove<N extends ArrayFieldPath<T>>(name: N, fromIndex: number, toIndex: number): void;
    arrayUpdate<N extends ArrayFieldPath<T>>(name: N, index: number, v: ArrayItem<KeyPathValue<T, N>>): void;
    arrayRemove<N extends ArrayFieldPath<T>>(name: N, index: number): void;
    arrayReplace<N extends ArrayFieldPath<T>>(name: N, v: KeyPathValue<T, N>): void;
}
export declare const createForm: <T extends FormType = FormType, VFK extends string = string>(args: {
    initValues: import("./types").UnpackNestedValue<T>;
    defaultValues?: import("./types").UnpackNestedValue<import("./types").DeepPartial<T>> | undefined;
    touchType?: "FOCUS" | "BLUR" | undefined;
    readonly?: boolean | undefined;
}) => Form<T, VFK>;
//# sourceMappingURL=form.d.ts.map