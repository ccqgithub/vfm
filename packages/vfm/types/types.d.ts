declare const $NestedValue: unique symbol;
export declare type ObjectType = Record<string, any>;
export declare type NativeObjectType = Date | Blob | File | FileList;
export declare type NestedValue<T = any> = {
    [$NestedValue]: never;
} & T;
export declare type UnpackNestedValue<T> = T extends NestedValue<infer U> ? U : T extends NativeObjectType ? T : T extends ObjectType ? {
    [K in keyof T]: UnpackNestedValue<T[K]>;
} : T;
declare type SplitPath<T extends string> = T extends '' ? [] : T extends `${infer A}.${infer B}` ? [A, ...SplitPath<B>] : [T];
declare type ArrayPathValue<Values, Path> = Path extends [infer Key, ...infer Rest] ? Key extends keyof Values ? Values[Key] extends NestedValue | NativeObjectType ? Values[Key] extends NestedValue<infer U> ? U : Values[Key] : ArrayPathValue<Values[Key], Rest> : undefined : Values;
export declare type DeepPartial<T extends ObjectType> = T extends NativeObjectType | NestedValue ? T : {
    [K in keyof T]?: DeepPartial<T[K]>;
};
export declare type FieldValuesType = Record<string, any>;
export declare type FieldValues<T extends FieldValuesType = FieldValuesType> = UnpackNestedValue<DeepPartial<T>>;
export declare type KeyPathValue<V extends FieldValuesType, Path extends string> = ArrayPathValue<V, SplitPath<Path>>;
export interface CancellablePromise<T> extends Promise<T> {
    cancel?: () => void;
}
export declare type FieldError = {
    type?: string;
    message: string;
    types?: Record<string, string>;
};
export declare type FormErrors = Record<string, FieldError | null>;
export declare type FormState<T extends FieldValuesType = FieldValuesType, VFK extends string = string> = {
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
export declare type VirtualFieldState = {
    name: string;
    error: FieldError | null;
    isError: boolean;
    isValidating: boolean;
};
export declare type ValidateFunc<V, F extends FormState> = (value: V | undefined, data: F) => (FieldError | null) | CancellablePromise<FieldError | null>;
export declare type VirtualValidateFunc<F extends FormState> = (data: F) => (FieldError | null) | CancellablePromise<FieldError | null>;
export declare type Validator<V = any, F extends Record<string, any> = Record<string, any>> = (field: {
    value: V;
    name: string;
}, form: F) => string | CancellablePromise<string>;
export {};
//# sourceMappingURL=types.d.ts.map