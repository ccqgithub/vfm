# APIs

## createForm

```ts
const form: FormInstance = createForm<FormType, VirtualFieldKeys>(args: CreageFormArgs);
```

- `FormType` extends `Record<string, any>`: The form structure type definition.
- `FormType` extends `string`: The virtual field keys type(e.g. `'virtualFieldA' | 'virtualFieldB'`).
- CreageFormArgs:
  - `initValues`: The initial form values, required.
  - `defaultValues`: Form default values, used for reset fields, and determine whether fields are dirty. If not pass, same with `initValues`.
  - `touchType`: When to set touched status, 'BLUR' or 'FOCUS', default is 'BLUR'.
  - `readonly`: if true, the form.state is readonly, avoid to manual edit it.

## `form.mount`

`form.mount()`

Set form is mounted, this will start watchers for form state changes and start validates.

## `form.unmount`

`form.unmount()`

Set form is unmounted, this will ummounte watchers and stop validates.

## `form.registerField`

`form.registerField<Name, Deps>(name, args: RegisterFieldArgs)`

- `name`: Field name(e.g, `a`, `a.b`, `a.0.b`).
- `RegisterFieldArgs`
  - `rules`: [FieldRule](#fieldrule)[]. The validate rules.
  - `immediate`: `boolean`. If false, validates and watchers not start immediate, need manual start(`registerFieldReturn.register()`).
  - `transform`: `(value) => validateValue`. Transform value before validate.
  - `isEqual`: `(value, defaultValue) => boolean`. Determine whether the field is dirty, default use `===`.
  - `onFocus`: `() => void`. Invoke when field focus, use this to custom focus logic.
  - `deps`: `() => any`, If the return value of `deps` change, the field will revalidate.

Returns: `{ register, field }`

  - `register: () => void`: Start watchers and validates.
  - `field`: The field instance.

## `form.registerVirtualField`

```ts
registerVirtualField<N extends VFK = VFK, V = any>(
  name: N,
  args: RegisterVirtualFieldArgs
)
```

- `name`: Field name(e.g, `a`, `b`)
- `RegisterVirtualFieldArgs`
  - `rules`: [VirtualFieldRule](#virtualfieldrule)[]. The validate rules.
  - `value: () => any`. The value use to validate, if the return value change, revalidate.
  - `immediate`: `boolean`. If false, validates and watchers not start immediate, need manual start(`registerVirtualFieldReturn.register()`).

## `form.unregisterField`

`form.unregisterField(name)`

Unregister a field.

## `form.unregisterVirtualField`

`form.unregisterVirtualField(name)`

Unregister a virtual field.

## `form.setValue`

```
form.setValie(name, value)
```

Set a field's value.

## `form.getValue`

`form.getValue(name)`

Get a field's value.

## `form.setTouched`

`form.setTouched(name, touched = true)`

Mark a field is touched

## `form.setFocus`

`form.setFocus(name)`

Focus a field.

## `form.fieldError`

`form.fieldError(name) => FieldError | null`

Get the field's error

- [FieldError](#fieldError)

## `form.virtualFieldError`

`form.virtualFieldError(name) => FieldError | null`

Get the virtual field's error

- [FieldError](#fieldError)

## `form.isError`

`form.isError(name) => boolean`

## `form.isVirtualError`

`form.isVirtualError(name) => boolean`

## `form.isChanged`

`form.isChanged(name) => boolean`

## `form.isTouched`

`form.isTouched(name) => boolean`

## `form.isDirty`

`form.isDirty(name) => boolean`

## `form.resetField`

```ts
resetField<N extends FieldPath<T>>(
  name: N,
  args: {
    keepTouched?: boolean;
    keepChanged?: boolean;
    keepValue?: boolean;
    value?: KeyPathValue<T, N>;
    defaultValue?: KeyPathValue<T, N>;
  } = {}
)
```

## `form.reset`

```ts
reset(
  args: {
    values?: FieldValues<T>;
    defaultValues?: FieldValues<T, true>;
    keepValues?: boolean;
    keepDefaultValues?: boolean;
    keepTouched?: boolean;
    keepChanged?: boolean;
    keepIsSubmitted?: boolean;
    keepSubmitCount?: boolean;
  } = {}
)
```

## `form.submit`

```ts
submit(
  args: {
    onSuccess?: (data: FieldValues<T>) => void;
    onError?: (error: FieldError) => void;
  } = {}
)
```

## FieldRule

```ts
type FieldRule = {
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
  // custom validator
  validator?: Validator<V, Deps>;
  // message
  message?: string;
}
```

## VirtualFieldRule

```ts
type VirtualFieldRule = {
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
  // custom validator
  validator?: VirtualFieldValidator<V>;
  // message
  message?: string;
}
```

## FieldError

```ts
type FieldError = {
  type?: string;
  message: string;
};
```