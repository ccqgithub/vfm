declare const $NestedValue: unique symbol;
export declare type ObjectType = Record<string, any>;
export declare type NativeObjectType = Date | Blob | File | FileList;
export declare type NestedValue<T extends any = any> = {
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
export {};
//# sourceMappingURL=types.d.ts.map