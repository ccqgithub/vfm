declare const $NestedValue: unique symbol;

export type ObjectType = Record<string, any>;

export type NativeObjectType =
  | Date
  | Blob
  | File
  | FileList
  | Function
  | RegExp;

export type NestedValue<T extends ObjectType> = {
  [$NestedValue]: never;
} & T;

export type NestedValueType = {
  [$NestedValue]: never;
};

export type UnpackNestedValue<T> = T extends NestedValue<infer U>
  ? U
  : T extends NativeObjectType
  ? T
  : T extends Array<infer A>
  ? UnpackNestedValue<A>[]
  : T extends ObjectType
  ? { [K in keyof T]: UnpackNestedValue<T[K]> }
  : T;

export type UnpackFieldState<T> = T extends NestedValue<infer U>
  ? FieldState<U>
  : T extends NativeObjectType
  ? FieldState<T>
  : T extends Array<infer A>
  ? UnpackFieldState<A>[]
  : T extends ObjectType
  ? { [K in keyof T]: UnpackFieldState<T[K]> }
  : FieldState<T>;

// `${number}` => 0
export type ArrayPathToString<T> = T extends `${number}` ? 0 : T;

// all ${number}` => 0
export type NormalizePath<T extends string> = T extends `${infer A}.${infer B}`
  ? `${ArrayPathToString<A>}.${NormalizePath<B>}`
  : ArrayPathToString<T>;

// get value of object by key path
// key path: a.b.0.c
export type InternalKeyPathValue<V, Path extends string> = Path extends ''
  ? V
  : V extends ObjectType
  ? V extends NestedValueType | NativeObjectType
    ? never
    : Path extends `${infer Key}.${infer Rest}`
    ? KeyPathValue<V[Key], Rest>
    : V[Path] extends NestedValue<infer U>
    ? U
    : V[Path]
  : never;

export type KeyPathValue<
  V extends ObjectType,
  Path extends string
> = InternalKeyPathValue<V, NormalizePath<Path>>;

export type FormType = Record<string, any>;

export type FieldValues<T extends FormType = FormType> = UnpackNestedValue<T>;

export type FieldStates<T extends FormType = FormType> = UnpackFieldState<T>;

export type VirtualFieldStates<VFK extends string = string> = {
  [K in VFK]: VirtualFieldState<K>;
};

export interface CancellablePromise<T = any> extends Promise<T> {
  cancel?: () => void;
}

export type FieldError = {
  type?: string;
  message: string;
};

export type FormErrors<T> = T extends NestedValueType | NativeObjectType
  ? FieldError | null | undefined
  : T extends Array<infer U>
  ? FormErrors<U>[]
  : T extends ObjectType
  ? {
      [K in keyof T]?: FormErrors<T[K]>;
    }
  : FieldError | null | undefined;

export type FormState<
  T extends FormType = FormType,
  VFK extends string = string
> = {
  // 当前值 { a: { b: { c: 222 }, d: [{ e: 2}] } }
  values: FieldValues<T>;
  // 错误信息
  error: FieldError | null;
  errors: FormErrors<T>;
  virtualErrors: Partial<Record<VFK, FieldError | null>>;
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
) => CancellablePromise<FieldError | null>;

export type VirtualValidateFunc<F extends FormState> = (
  data: F
) => CancellablePromise<FieldError | null>;

export type Validator<
  V = any,
  F extends Record<string, any> = Record<string, any>
> = (value: V | undefined, form: F) => string | CancellablePromise<string>;

export type VirtualFieldValidator<
  F extends Record<string, any> = Record<string, any>
> = (form: F) => string | CancellablePromise<string>;

export type FieldRule<V = any, F extends FormState = FormState> = {
  type?: string;
  // short flags
  required?: boolean;
  requiredLength?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  // builtin validators
  alpha?: boolean;
  alphaNum?: boolean;
  decimal?: boolean;
  numeric?: boolean;
  email?: boolean;
  integer?: boolean;
  ipAddress?: boolean;
  macAddress?: boolean;
  // custon validator
  validator?: Validator<V, F>;
  // message
  message?: string;
};

export type VirtualFieldRule<F extends FormState = FormState> = {
  type?: string;
  validator?: VirtualFieldValidator<F>;
  message?: string;
};

export type InputLikeRef = {
  focus?: () => void;
};

// Join<'a.b', 'c.d'> => 'a.b.c.d'
export type Join<K, P> = K extends string | number
  ? P extends string | number
    ? '' extends K
      ? P
      : `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : K extends never
  ? P
  : never;

// list all paths
export type AutoPath<T extends ObjectType, L = ''> = T extends
  | NestedValueType
  | NativeObjectType
  ? L
  : T extends Array<infer U>
  ? Join<L, `${number}`> | Join<Join<L, `${number}`>, AutoPath<U>>
  : T extends ObjectType
  ? {
      [K in keyof T]: Join<L, K> | Join<Join<L, K>, AutoPath<T[K]>>;
    }[keyof T]
  : L;

export type FieldPath<T extends ObjectType, L = ''> = T extends
  | NestedValueType
  | NativeObjectType
  ? L
  : T extends Array<infer U>
  ? Join<Join<L, `${number}`>, AutoPath<U>>
  : T extends ObjectType
  ? {
      [K in keyof T]: Join<Join<L, K>, AutoPath<T[K]>>;
    }[keyof T]
  : L;
