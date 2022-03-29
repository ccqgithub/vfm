# API: vfm

## createForm

- `createForm<FormType, VirtualFields>({ defaultValues })` => `form`

Create a form instance.

```ts
import { createForm } from 'vfm';

type FormType = {
  username: string;
  test: number;
  password: string;
  confirmPassword: string;
};

type VirtualFields = 'hasNameOrPassword' | 'other';

const form = createForm<FormType, VirtualFields>({
  defaultValues: {
    username: 'season',
    test: 1,
    password: '',
    confirmPassword: ''
  }
});

export default form;
```

## form.mount

Mount form, init form validation and state wachers.

## form.unmount

Unmount form, remove form wachers, and unregister all fields.

## form.registerField

```ts
registerField<N extends string>(
  name: N,
  args: {
    value?: KeyPathValue<T, N>;
    defaultValue?: KeyPathValue<T, N>;
    validate?: ValidateFunc<KeyPathValue<T, N>, FormState<T, VFK>> | null;
    immediate?: boolean;
  } = {}
): { field: FieldClass<T, N>; register: () => void }
```

Options.

- `name`: Field name.
- `args`
  - `args.value`: The current value of the field.
  - `args.defaultValue`: The defaultValue of the field.
  - `args.validate`: The validte function when value change, if has error, return the error message string (or promise of message), otherwise return `''`.
  - `args.immediate`: Whether register to form immediate, if `false`, just create field instance, then manual call the `register()` to register to form.

```ts
form.registerField('username', {
  validate: (v) => {
    if (!v || !v.trim()) return { message: 'username required.' };
    return new Promise((resolve) => {
      setTimeout(() => {
        if (v !== 'test')
          return resolve({ message: 'username is not correct.' });
        return resolve(null);
      }, 2000);
    });
  }
});
```

## form.unregisterField

Unregister the field form the form

- form.unregisterField(name)

## form.registerVirtualField

```ts
registerVirtualField(
  name: string,
  args: {
    validate?: VirtualValidateFunc<FormState<T, VFK>> | null;
    immediate?: boolean;
  } = {}
): { field: VirtualFieldClass<T>; register: () => void }
```

- `name`: Virtual field name.
- `args`
  - `args.validate`: The validte function when value change, if has error, return the error message string (or promise of message), otherwise return `''`.
  - `args.immediate`: Whether register to form immediate, if `false`, just create field instance, then manual call the `register()` to register to form.

## form.unregisterVirtualField

Unregister the virtual field form the form.

## form.setValue

- `form.setValue(name, value)`

## form.reset

## form.submit

```ts
submit(
  onSuccess: (data: FieldValues<T>) => void,
  onError: (errors: FormErrors) => void
)
```

## form.state

```ts
type FormState = {
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
}
```

## form.fieldStates

```
type FieldStates = Record<string, FeldState>
```

## fieldState

```ts
type FieldState = {
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
}
```