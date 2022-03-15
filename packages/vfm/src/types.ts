declare const $NestedValue: unique symbol;

export type ObjectType = Record<string, any>;

export type NativeObjectType = Date | Blob | File | FileList;

export type NestedValue<T extends any = any> = {
  [$NestedValue]: never;
} & T;

export type UnpackNestedValue<T> = T extends NestedValue<infer U>
  ? U
  : T extends NativeObjectType
  ? T
  : T extends ObjectType
  ? { [K in keyof T]: UnpackNestedValue<T[K]> }
  : T;

// 'a.b.c' => ['a', 'b', 'c']
type SplitPath<T extends string> = T extends ''
  ? []
  : T extends `${infer A}.${infer B}`
  ? [A, ...SplitPath<B>]
  : [T];

// get value of object by key path
// key path: '[a', 'b', '1', 'c']
type ArrayPathValue<Values, Path> = Path extends [infer Key, ...infer Rest]
  ? Key extends keyof Values
    ? Values[Key] extends NestedValue | NativeObjectType
      ? Values[Key] extends NestedValue<infer U>
        ? U
        : Values[Key]
      : ArrayPathValue<Values[Key], Rest>
    : undefined
  : Values;

export type DeepPartial<T extends ObjectType> = T extends
  | NativeObjectType
  | NestedValue
  ? T
  : { [K in keyof T]?: DeepPartial<T[K]> };

export type FieldValuesType = Record<string, any>;

export type FieldValues<T extends FieldValuesType = FieldValuesType> =
  UnpackNestedValue<DeepPartial<T>>;

// get value of object by key path
// key path: a.b.0.c
export type KeyPathValue<V extends FieldValuesType, Path extends string> =
  ArrayPathValue<V, SplitPath<Path>>;
