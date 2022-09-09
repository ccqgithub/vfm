import { Component } from 'vue';
declare const $NestedValue: unique symbol;
export declare type ObjectType = Record<string, any>;
export declare type NativeObjectType = Date | Blob | File | FileList | Function | RegExp;
export declare type NestedValue<T extends ObjectType> = {
    [$NestedValue]: never;
} & T;
export declare type NestedValueType = {
    [$NestedValue]: never;
};
export declare type UnpackNestedValue<T> = T extends NestedValue<infer U> ? U : T extends NativeObjectType ? T : T extends Array<infer A> ? UnpackNestedValue<A>[] : T extends ObjectType ? {
    [K in keyof T]: UnpackNestedValue<T[K]>;
} : T;
export declare type UnpackFieldState<T> = T extends NestedValueType ? FieldState : T extends NativeObjectType ? FieldState : T extends Array<infer A> ? UnpackFieldState<A>[] : T extends ObjectType ? {
    [K in keyof T]: UnpackFieldState<T[K]>;
} : FieldState;
export declare type ArrayPathToString<T> = T extends `${number}` ? 0 : T;
export declare type NormalizePath<T extends string> = T extends `${infer A}.${infer B}` ? `${ArrayPathToString<A>}.${NormalizePath<B>}` : ArrayPathToString<T>;
export declare type InternalKeyPathValue<V, Path extends string> = Path extends '' ? V : V extends ObjectType ? V extends NestedValueType | NativeObjectType ? never : Path extends `${infer Key}.${infer Rest}` ? KeyPathValue<V[Key], Rest> : V[Path] extends NestedValue<infer U> ? U : V extends Array<infer U> ? U | undefined : V[Path] : never;
export declare type KeyPathValue<V extends ObjectType, Path extends string> = string extends Path ? any : InternalKeyPathValue<V, NormalizePath<Path>>;
export declare type FormType = Record<string, any>;
export declare type DeepPartial<T extends ObjectType> = T extends NativeObjectType | NestedValueType ? T : T extends Array<infer U> ? U extends ObjectType ? DeepPartial<U>[] : U[] : {
    [K in keyof T]?: DeepPartial<T[K]>;
};
export declare type FieldValues<T extends FormType = FormType, P extends boolean = false> = P extends true ? UnpackNestedValue<DeepPartial<T>> : UnpackNestedValue<T>;
export declare type DisposablePromise<T = any> = {
    promise: Promise<T>;
    dispose?: () => void;
};
export declare type FieldError = {
    type?: string;
    message: string;
};
export declare type FormErrors<T> = T extends NestedValueType | NativeObjectType ? FieldError | null | undefined : T extends Array<infer U> ? {
    [key: number]: FormErrors<U>;
} : T extends ObjectType ? {
    [K in keyof T]?: FormErrors<T[K]>;
} : FieldError | null | undefined;
export declare type FormState<T extends FormType = FormType, VFK extends string = string> = {
    values: FieldValues<T>;
    defaultValues: FieldValues<T, true>;
    error: FieldError | null;
    fieldError: FieldError | null;
    virtualError: FieldError | null;
    fieldErrors: FormErrors<T>;
    virtualErrors: Partial<Record<VFK, FieldError | null>>;
    isError: boolean;
    isFieldError: boolean;
    isVirtualError: boolean;
    isValidating: boolean;
    isFieldValidating: boolean;
    isVirtualValidating: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isChanged: boolean;
    isSubmitted: boolean;
    isSubmitting: boolean;
    submitCount: number;
};
export declare type FieldState = {
    error: FieldError | null;
    isError: boolean;
    isValidating: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isChanged: boolean;
};
export declare type VirtualFieldState = {
    error: FieldError | null;
    isError: boolean;
    isValidating: boolean;
};
export declare type ValidateFunc<V, Deps, Rules = FieldRule<V, Deps>[]> = (v: V, deps: Deps | undefined, rules: Rules) => DisposablePromise<FieldError | null>;
export declare type VirtualValidateFunc<V, Rules = VirtualFieldRule<V>[]> = (v: V, rules: Rules) => DisposablePromise<FieldError | null>;
export declare type Validator<V = any, Deps = any> = (value: V | undefined, deps?: Deps) => string | Promise<string> | DisposablePromise<string>;
export declare type VirtualFieldValidator<V = any> = (value: V) => string | Promise<string> | DisposablePromise<string>;
export declare type FieldRule<V = any, Deps = any> = {
    type?: string;
    required?: boolean;
    requiredLength?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    alpha?: boolean;
    alphaNum?: boolean;
    decimal?: boolean;
    numeric?: boolean;
    email?: boolean;
    integer?: boolean;
    ipAddress?: boolean;
    macAddress?: boolean;
    validator?: Validator<V, Deps>;
    message?: string;
    debounce?: number;
};
export declare type VirtualFieldRule<V = any> = {
    type?: string;
    required?: boolean;
    requiredLength?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    alpha?: boolean;
    alphaNum?: boolean;
    decimal?: boolean;
    numeric?: boolean;
    email?: boolean;
    integer?: boolean;
    ipAddress?: boolean;
    macAddress?: boolean;
    validator?: VirtualFieldValidator<V>;
    message?: string;
    debounce?: number;
};
export declare type InputLikeRef = Element | Component | {
    focus?: () => void;
};
export declare type Join<K, P> = K extends string | number ? P extends string | number ? '' extends K ? P : `${K}${'' extends P ? '' : '.'}${P}` : '' : '';
export declare type AutoPath<T extends ObjectType, L extends string = ''> = T extends NestedValueType | NativeObjectType ? L : T extends Array<infer U> ? U extends ObjectType ? Join<L, `${number}`> | Join<Join<L, `${number}`>, AutoPath<U>> : Join<L, `${number}`> : T extends ObjectType ? {
    [key: string]: any;
} extends T ? string : {
    [K in keyof T]: Join<L, K> | Join<Join<L, K>, AutoPath<T[K]>>;
}[keyof T] : L;
export declare type FieldPath<T extends ObjectType, L extends string = ''> = T extends NestedValueType | NativeObjectType ? L : T extends Array<infer U> ? U extends ObjectType ? Join<Join<L, `${number}`>, FieldPath<U>> : Join<L, `${number}`> : T extends ObjectType ? {
    [key: string]: any;
} extends T ? string : {
    [K in keyof T]: Join<Join<L, K>, FieldPath<T[K]>>;
}[keyof T] : L;
export declare type ArrayFieldPath<T extends ObjectType, L extends string = ''> = T extends NestedValueType | NativeObjectType ? never : T extends Array<infer U> ? U extends ObjectType ? L | Join<Join<L, `${number}`>, ArrayFieldPath<U>> : L : T extends ObjectType ? {
    [key: string]: any;
} extends T ? string : {
    [K in keyof T]: Join<Join<L, K>, ArrayFieldPath<T[K]>>;
}[keyof T] : never;
export declare type ArrayItem<T> = T extends Array<infer U> ? U : never;
export declare type FieldProps<T extends FormType = FormType, N extends string = string> = {
    value: KeyPathValue<T, N>;
    onChange?: (v: KeyPathValue<T, N> | Event) => void;
    onInput?: (v: KeyPathValue<T, N> | Event) => void;
    onBlur: () => void;
    onFocus: () => void;
    ref: (el: InputLikeRef | null) => void;
};
export declare type FieldScope<T extends FormType = FormType, N extends string = string> = {
    field: FieldProps<T, N>;
};
export {};
//# sourceMappingURL=types.d.ts.map