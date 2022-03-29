declare const $NestedValue: unique symbol;
export declare type ObjectType = Record<string, any>;
export declare type NativeObjectType = Date | Blob | File | FileList;
export declare type NestedValue<T extends ObjectType> = {
    [$NestedValue]: never;
} & T;
export declare type NestedValueType = {
    [$NestedValue]: never;
};
export declare type UnpackNestedValue<T> = T extends ObjectType ? T extends NativeObjectType ? T : T extends NestedValue<infer U> ? U : {
    [K in keyof T]: UnpackNestedValue<T[K]>;
} : T;
export declare type UnpackFieldState<T> = T extends ObjectType ? T extends NativeObjectType ? FieldState<T> : T extends NestedValue<infer U> ? FieldState<U> : {
    [K in keyof T]: UnpackFieldState<T[K]>;
} : FieldState<T>;
export declare type UnpackVirtualFieldState<T> = T extends ObjectType ? T extends NativeObjectType | NestedValueType ? VirtualFieldState : {
    [K in keyof T]: UnpackVirtualFieldState<T[K]>;
} : VirtualFieldState;
export declare type KeyPathValue<V extends ObjectType, Path extends string> = Path extends `${infer Key}.${infer Rest}` ? Key extends keyof V ? V[Key] extends NestedValueType | NativeObjectType ? V extends NestedValue<infer U> ? U : V : Rest extends string ? KeyPathValue<V[Key], Rest> : V[Key] : undefined : Path extends keyof V ? V[Path] : undefined;
export declare type DeepPartial<T extends ObjectType> = T extends NativeObjectType | NestedValueType ? T : {
    [K in keyof T]?: DeepPartial<T[K]>;
};
export declare type FormType = Record<string, any>;
export declare type FieldValues<T extends FormType = FormType> = UnpackNestedValue<DeepPartial<T>>;
export declare type FieldStates<T extends FormType = FormType> = UnpackFieldState<DeepPartial<T>>;
export declare type VirtualFieldStates<T extends FormType = FormType> = UnpackVirtualFieldState<DeepPartial<T>>;
export interface CancellablePromise<T> extends Promise<T> {
    cancel?: () => void;
}
export declare type FieldError = {
    type?: string;
    message: string;
};
export declare type FormErrors = Record<string, FieldError | null>;
export declare type FormState<T extends FormType = FormType, VFK extends string = string> = {
    values: FieldValues<T>;
    error: FieldError | null;
    errors: FormErrors;
    virtualErrors: Record<VFK, FieldError | null>;
    isError: boolean;
    isValidating: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isChanged: boolean;
    isSubmitted: boolean;
    isSubmitting: boolean;
    submitCount: number;
};
export declare type FieldState<V> = {
    name: string;
    value?: V;
    defaultValue?: V;
    error: FieldError | null;
    isError: boolean;
    isValidating: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isChanged: boolean;
};
export declare type VirtualFieldState<VFK extends string = string> = {
    name: VFK;
    error: FieldError | null;
    isError: boolean;
    isValidating: boolean;
};
export declare type ValidateFunc<V, F extends FormState> = (value: V | undefined, data: F) => (FieldError | null) | CancellablePromise<FieldError | null>;
export declare type VirtualValidateFunc<F extends FormState> = (data: F) => (FieldError | null) | CancellablePromise<FieldError | null>;
export declare type Validator<V = any, F extends Record<string, any> = Record<string, any>> = (value: V, form: F) => string | CancellablePromise<string>;
export declare type VirtualFieldValidator<F extends Record<string, any> = Record<string, any>> = (form: F) => string | CancellablePromise<string>;
export declare type FieldRule<V = any, F extends FormState = FormState> = {
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
    validator?: Validator<V, F>;
    messate?: string;
};
export declare type VirtualFieldRule<F extends FormState = FormState> = {
    type?: string;
    validator?: VirtualFieldValidator<F>;
};
export declare type InputLikeRef = {
    focus?: () => void;
};
export {};
//# sourceMappingURL=types.d.ts.map