# APIs

## createForm

```ts
const form: FormInstance = createForm<FormType, VirtualFieldKeys>(args: CreageFormArgs);
```

- `FormType` extends `Record<string, any>`: 表单结构定义。
- `FormType` extends `string`: 虚拟字段定义(例如 `'virtualFieldA' | 'virtualFieldB'`)。
- CreageFormArgs:
  - `initValues`: 表单初始值, 必须。
  - `defaultValues`: 表单默认值，用来重置字段或者检查字段是否`dirty`。 如果不设置，默认和`initValues`相同。
  - `touchType`: 什么时候设置`touched`，可选'BLUR' 和 'FOCUS'， 默认 'BLUR'。
  - `readonly`: 如果设置 true，表单状态是只读的，避免意外操作。

## `form.mount`

`form.mount()`

设置表单为安装的，这将初始化监听器以及开始校验字段。

## `form.unmount`

`form.unmount()`

设置表单为卸载的，这将停止监听器以及停止校验字段。

## `form.registerField`

`form.registerField<Name, Deps>(name, args: RegisterFieldArgs)`

- `name`: 字段名(例如 `a`, `a.b`, `a.0.b`).
- `RegisterFieldArgs`
  - `rules`: [FieldRule](#fieldrule)[]。校验规则。
  - `immediate`: `boolean`. 如果 false，监听器和校验不会开始，需要手动调用(`registerFieldReturn.register()`)才开始。
  - `transform`: `(value) => validateValue`。校验前变换值。
  - `isEqual`: `(value, defaultValue) => boolean`. 确定字段是否dirty，默认使用`===`判断。
  - `onFocus`: `() => void`。 用来自定义focus逻辑。
  - `deps`: `() => any`, 如果`deps` 返回的值改变，字段将重新校验。

返回: `{ register, field }`

  - `register: () => void`: 开始监听器和开始校验。
  - `field`: 字段实例。

## `form.registerVirtualField`

```ts
registerVirtualField<N extends VFK = VFK, V = any>(
  name: N,
  args: RegisterVirtualFieldArgs
)
```

- `name`: 字段名(例如 `a`, `b`)
- `RegisterVirtualFieldArgs`
  - `rules`: [VirtualFieldRule](#virtualfieldrule)[]。 校验规则。
  - `value: () => any`。用来校验的值，如果改变，重新检验。
  - `immediate`: `boolean`. 如果 false，监听器和校验不会开始，需要手动调用(`registerVirtualFieldReturn.register()`)才开始.

## `form.unregisterField`

`form.unregisterField(name)`

卸载字段。

## `form.unregisterVirtualField`

`form.unregisterVirtualField(name)`

卸载虚拟字段。

## `form.setValue`

```
form.setValie(name, value)
```

设置字段值。

## `form.getValue`

`form.getValue(name)`

获取字段值。

## `form.setTouched`

`form.setTouched(name, touched = true)`

设置字段为 touched。

## `form.setFocus`

`form.setFocus(name)`

聚焦一个字段。

## `form.fieldError`

`form.fieldError(name) => FieldError | null`

获取字段的错误信息。

- [FieldError](#fieldError)

## `form.virtualFieldError`

`form.virtualFieldError(name) => FieldError | null`

获取虚拟字段的错误信息。

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