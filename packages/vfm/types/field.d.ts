import { Form, FormState } from './form';
import { FieldValuesType, KeyPathValue } from './types';
export declare type ValidateFunc<T extends FieldValuesType, N extends string> = (value: KeyPathValue<T, N> | undefined, data: FormState<T>) => (FieldError | null) | Promise<FieldError | null>;
export declare type FieldError = {
    message?: string;
    types?: Record<string, string>;
};
export declare type FieldState<V extends any> = {
    value?: V;
    defaultValue?: V;
    error: FieldError;
    isError: boolean;
    isValidating: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isChanged: boolean;
};
export declare class Field<T extends FieldValuesType, F extends Form<T>, N extends string = string> {
    name: N;
    private form;
    private _data;
    private data;
    private validateFn;
    private validateCount;
    private stopValidateWatcher;
    private stopDirtyWatcher;
    constructor(form: F, args: {
        name: N;
        value?: string;
        defaultValue?: string;
        validateFn?: ValidateFunc<T, N> | null;
    });
    get state(): FieldState<(N extends "" ? [] : N extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...any] : [B]] : [B]] : [B]] : [B]] : [B]] : [B]] : [B]] : [B]] : [B]] : [B]] : [N]) extends [infer Key, ...infer Rest] ? Key extends keyof T ? T[Key] extends any ? T[Key] extends import("./types").NestedValue<infer U> ? U : T[Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key] ? T[Key][Key] extends any ? T[Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key] ? T[Key][Key][Key] extends any ? T[Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key] ? T[Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] : any : undefined : T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key][Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key] : undefined : T[Key][Key][Key] : undefined : T[Key][Key] : undefined : T[Key] : undefined : T>;
    private initWatcher;
    onUnregister(): void;
    onChange(value: KeyPathValue<T, N>): void;
    onTouched(): void;
    reset(resetValue?: KeyPathValue<T, N>): void;
}
//# sourceMappingURL=field.d.ts.map