declare const $NestedValue: unique symbol;

export type ObjectType = Record<string, any>;

export type NativeObjectType = Date | Blob | File | FileList;

export type NestedValue<T extends ObjectType> = {
  [$NestedValue]: never;
} & T;

export type NestedValueType = {
  [$NestedValue]: never;
};

export type UnpackNestedValue<T> = T extends ObjectType
  ? T extends NativeObjectType
    ? T
    : T extends NestedValue<infer U>
    ? U
    : { [K in keyof T]: UnpackNestedValue<T[K]> }
  : T;

export type UnpackFieldState<T> = T extends ObjectType
  ? T extends NativeObjectType
    ? FieldState<T>
    : T extends NestedValue<infer U>
    ? FieldState<U>
    : { [K in keyof T]: UnpackFieldState<T[K]> }
  : FieldState<T>;

export type UnpackVirtualFieldState<T> = T extends ObjectType
  ? T extends NativeObjectType | NestedValueType
    ? VirtualFieldState
    : { [K in keyof T]: UnpackVirtualFieldState<T[K]> }
  : VirtualFieldState;

// get value of object by key path
// key path: a.b.0.c
export type KeyPathValue<
  V extends ObjectType,
  Path extends string
> = Path extends `${infer Key}.${infer Rest}`
  ? // path: 'x.y'
    Key extends keyof V
    ? // Key in v
      V[Key] extends NestedValueType | NativeObjectType
      ? // Nested value or Native object
        V extends NestedValue<infer U>
        ? U
        : V
      : // Other object
      Rest extends string
      ? KeyPathValue<V[Key], Rest>
      : V[Key]
    : // Key not in v
      undefined
  : // path: 'x'
  Path extends keyof V
  ? V[Path]
  : undefined;

export type DeepPartial<T extends ObjectType> = T extends
  | NativeObjectType
  | NestedValueType
  ? T
  : { [K in keyof T]?: DeepPartial<T[K]> };

export type FormType = Record<string, any>;

export type FieldValues<T extends FormType = FormType> = UnpackNestedValue<
  DeepPartial<T>
>;

export type FieldStates<T extends FormType = FormType> = UnpackFieldState<
  DeepPartial<T>
>;

export type VirtualFieldStates<T extends FormType = FormType> =
  UnpackVirtualFieldState<DeepPartial<T>>;

export interface CancellablePromise<T> extends Promise<T> {
  cancel?: () => void;
}

export type FieldError = {
  // default: 'default'
  type?: string;
  message: string;
};

export type FormErrors = Record<string, FieldError | null>;

export type FormState<
  T extends FormType = FormType,
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

export type VirtualFieldState<VFK extends string = string> = {
  name: VFK;
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
> = (value: V, form: F) => string | CancellablePromise<string>;

export type VirtualFieldValidator<
  F extends Record<string, any> = Record<string, any>
> = (form: F) => string | CancellablePromise<string>;

export type FieldRule<V = any, F extends FormState = FormState> = {
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

export type VirtualFieldRule<F extends FormState = FormState> = {
  type?: string;
  validator?: VirtualFieldValidator<F>;
};

export type InputLikeRef = {
  focus?: () => void;
};
