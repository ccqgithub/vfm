import { FieldClass, VirtualFieldClass } from './field';
import { FormType, FieldValues, KeyPathValue, ValidateFunc, FormState, FormErrors, VirtualValidateFunc } from './types';
export declare type GetFormType<T> = T extends FormClass<infer U> ? U : never;
export declare class FormClass<T extends FormType = FormType, VFK extends string = string> {
    private fieldsKeys;
    private fields;
    private virtualFieldsKeys;
    private virtualFields;
    private _data;
    private data;
    private _fieldStates;
    private _fieldStatesReadonly;
    private stopStateWatcher;
    private stopStatusWatcher;
    private stopValidatingWatcher;
    private waiters;
    private defaultValues;
    constructor(args: {
        defaultValues?: FieldValues<T>;
        virtualFields?: Record<string, VirtualFieldClass<FormClass<T, VFK>>>;
    });
    get state(): FormState<T, VFK>;
    get fieldStates(): Record<string, any>;
    mount(): void;
    unmount(): void;
    registerField<N extends string>(name: N, args?: {
        value?: KeyPathValue<T, N>;
        defaultValue?: KeyPathValue<T, N>;
        validate?: ValidateFunc<KeyPathValue<T, N>, FormState<T, VFK>> | null;
        immediate?: boolean;
    }): {
        field: FieldClass<T, N, (N extends "" ? [] : N extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...B extends "" ? [] : B extends `${infer A}.${infer B}` ? [A, ...any] : [B]] : [B]] : [B]] : [B]] : [B]] : [B]] : [B]] : [B]] : [B]] : [B]] : [N]) extends [infer Key, ...infer Rest] ? Key extends keyof T ? T[Key] extends any ? T[Key] extends import("./types").NestedValue<infer U> ? U : T[Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key] ? T[Key][Key] extends any ? T[Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key] ? T[Key][Key][Key] extends any ? T[Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key] ? T[Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] : Rest extends [infer Key, ...infer Rest] ? Key extends keyof T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] extends any ? T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] extends import("./types").NestedValue<infer U> ? U : T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] : any : undefined : T[Key][Key][Key][Key][Key][Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key][Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key][Key] : undefined : T[Key][Key][Key][Key] : undefined : T[Key][Key][Key] : undefined : T[Key][Key] : undefined : T[Key] : undefined : T>;
        register: () => void;
    };
    registerVirtualField(name: string, args?: {
        validate?: VirtualValidateFunc<FormState<T, VFK>> | null;
        immediate?: boolean;
    }): {
        field: VirtualFieldClass<T>;
        register: () => void;
    };
    unregisterField(name: string): void;
    unregisterVirtualField(name: string): void;
    setValue(name: string, value: any): void;
    setTouched(name: string, touched?: boolean): void;
    submit(onSuccess: (data: FieldValues<T>) => void, onError: (errors: FormErrors) => void): void;
    reset(values?: FormData): void;
}
export declare const createForm: <T extends FormType = FormType, VFK extends string = string>(args: {
    defaultValues?: import("./types").UnpackNestedValue<import("./types").DeepPartial<T>> | undefined;
    virtualFields?: Record<string, VirtualFieldClass<FormClass<T, VFK>>> | undefined;
}) => FormClass<T, VFK>;
//# sourceMappingURL=form.d.ts.map