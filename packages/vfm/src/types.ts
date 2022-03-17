declare const $NestedValue: unique symbol;

export type ObjectType = Record<string, any>;

export type NativeObjectType = Date | Blob | File | FileList;

export type NestedValue<T = any> = {
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
export type KeyPathValue<
  V extends FieldValuesType,
  Path extends string
> = ArrayPathValue<V, SplitPath<Path>>;

export interface CancellablePromise<T> extends Promise<T> {
  cancel?: () => void;
}

export type FieldError = {
  // default: 'default'
  type?: string;
  message: string;
  types?: Record<string, string>;
};

export type FormErrors = Record<string, FieldError | null>;

export type FormState<
  T extends FieldValuesType = FieldValuesType,
  VFK extends string = string
> = {
  // 当前值 { a: { b: { c: 222 }, d: [{ e: 2}] } }
  values: FieldValues<T>;
  // 错误信息
  error: FieldError | null;
  errors: FormErrors;
  virtualErrors: Record<VFK, FieldError | null>;
  // 是否有错误
  isError: boolean;
  // 正在验证
  isValidating: boolean;
  // 值被更改过, 当前值和默认值不相等
  isDirty: boolean;
  // 字段有过交互，比如 input focus
  isTouched: boolean;
  // 是否改变过
  isChanged: boolean;
  // 是否提交过
  isSubmitted: boolean;
  // 正在提交
  isSubmitting: boolean;
  // 提交次数
  submitCount: number;
};

export type FieldState<V> = {
  name: string;
  // 当前值
  value?: V;
  // 默认值
  defaultValue?: V;
  // 错误信息
  error: FieldError | null;
  // 是否有错误
  isError: boolean;
  // 正在验证
  isValidating: boolean;
  // 当前值和默认值不相等
  isDirty: boolean;
  // 字段有过交互，比如 input focus
  isTouched: boolean;
  // 是否更改过
  isChanged: boolean;
};

export type VirtualFieldState = {
  name: string;
  // 错误信息
  error: FieldError | null;
  // 是否有错误
  isError: boolean;
  // 正在验证
  isValidating: boolean;
};

export type ValidateFunc<V, F extends FormState> = (
  value: V | undefined,
  data: F
) => (FieldError | null) | CancellablePromise<FieldError | null>;

export type VirtualValidateFunc<F extends FormState> = (
  data: F
) => (FieldError | null) | CancellablePromise<FieldError | null>;

export type Validator<
  V = any,
  F extends Record<string, any> = Record<string, any>
> = (
  field: { value: V; name: string },
  form: F
) => string | CancellablePromise<string>;
