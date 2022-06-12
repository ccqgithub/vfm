API Documentation

# API Documentation

## Classes

- [Form](classes/Form.md)

## Component Variables

- [Field](index.md#field)
- [FieldArray](index.md#fieldarray)
- [FormProvider](index.md#formprovider)
- [VirtualField](index.md#virtualfield)

## Other Variables

- [FormContextKey](index.md#formcontextkey)
- [validators](index.md#validators)

## Other Functions

- [createFieldArray](index.md#createfieldarray)
- [createForm](index.md#createform)

## Use Functions

- [useField](index.md#usefield)
- [useFieldArray](index.md#usefieldarray)
- [useForm](index.md#useform)
- [useVirtualField](index.md#usevirtualfield)

## Type Aliases

### ArrayFieldPath

Ƭ **ArrayFieldPath**<`T`, `L`\>: `T` extends [`NestedValueType`](index.md#nestedvaluetype) \| [`NativeObjectType`](index.md#nativeobjecttype) ? `never` : `T` extends infer U[] ? `L` \| [`Join`](index.md#join)<[`Join`](index.md#join)<`L`, \`${number}\`\>, [`ArrayFieldPath`](index.md#arrayfieldpath)<`U`\>\> : `T` extends [`ObjectType`](index.md#objecttype) ? { `[key: string]`: `any`;  } extends `T` ? `string` : { [K in keyof T]: Join<Join<L, K\>, ArrayFieldPath<T[K]\>\> }[keyof `T`] : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](index.md#objecttype) |
| `L` | extends `string` = ``""`` |

#### Defined in

[types.ts:300](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L300)

___

### ArrayItem

Ƭ **ArrayItem**<`T`\>: `T` extends infer U[] ? `U` : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:315](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L315)

___

### ArrayPathToString

Ƭ **ArrayPathToString**<`T`\>: `T` extends \`${number}\` ? ``0`` : `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:44](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L44)

___

### AutoPath

Ƭ **AutoPath**<`T`, `L`\>: `T` extends [`NestedValueType`](index.md#nestedvaluetype) \| [`NativeObjectType`](index.md#nativeobjecttype) ? `L` : `T` extends infer U[] ? [`Join`](index.md#join)<`L`, \`${number}\`\> \| [`Join`](index.md#join)<[`Join`](index.md#join)<`L`, \`${number}\`\>, [`AutoPath`](index.md#autopath)<`U`\>\> : `T` extends [`ObjectType`](index.md#objecttype) ? { `[key: string]`: `any`;  } extends `T` ? `string` : { [K in keyof T]: Join<L, K\> \| Join<Join<L, K\>, AutoPath<T[K]\>\> }[keyof `T`] : `L`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](index.md#objecttype) |
| `L` | extends `string` = ``""`` |

#### Defined in

[types.ts:272](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L272)

___

### DeepPartial

Ƭ **DeepPartial**<`T`\>: `T` extends [`NativeObjectType`](index.md#nativeobjecttype) \| [`NestedValueType`](index.md#nestedvaluetype) ? `T` : `T` extends infer U[] ? `U` extends [`ObjectType`](index.md#objecttype) ? [`DeepPartial`](index.md#deeppartial)<`U`\>[] : `U`[] : { [K in keyof T]?: DeepPartial<T[K]\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](index.md#objecttype) |

#### Defined in

[types.ts:74](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L74)

___

### DisposablePromise

Ƭ **DisposablePromise**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `promise` | `Promise`<`T`\> |
| `dispose?` | () => `void` |

#### Defined in

[types.ts:91](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L91)

___

### FieldArrayScope

Ƭ **FieldArrayScope**<`V`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `any` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fields` | { `id`: `string` ; `name`: `string`  }[] |
| `append` | (`v`: `V`) => `void` |
| `insert` | (`id`: `string`, `v`: `V`) => `void` |
| `move` | (`from`: `string`, `to`: `string`) => `void` |
| `prepend` | (`v`: `V`) => `void` |
| `remove` | (`id`: `string`) => `void` |
| `replace` | (`values`: `V`[]) => `void` |
| `swap` | (`from`: `string`, `to`: `string`) => `void` |
| `update` | (`id`: `string`, `v`: `V`) => `void` |

#### Defined in

[fieldArray.ts:118](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/fieldArray.ts#L118)

___

### FieldError

Ƭ **FieldError**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `type?` | `string` |

#### Defined in

[types.ts:96](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L96)

___

### FieldPath

Ƭ **FieldPath**<`T`, `L`\>: `T` extends [`NestedValueType`](index.md#nestedvaluetype) \| [`NativeObjectType`](index.md#nativeobjecttype) ? `L` : `T` extends infer U[] ? [`Join`](index.md#join)<[`Join`](index.md#join)<`L`, \`${number}\`\>, [`FieldPath`](index.md#fieldpath)<`U`\>\> : `T` extends [`ObjectType`](index.md#objecttype) ? { `[key: string]`: `any`;  } extends `T` ? `string` : { [K in keyof T]: Join<Join<L, K\>, FieldPath<T[K]\>\> }[keyof `T`] : `L`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](index.md#objecttype) |
| `L` | extends `string` = ``""`` |

#### Defined in

[types.ts:286](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L286)

___

### FieldProps

Ƭ **FieldProps**<`T`, `N`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) = [`FormType`](index.md#formtype) |
| `N` | extends `string` = `string` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `value` | [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\> |
| `onBlur` | () => `void` |
| `onChange?` | (`v`: [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\> \| `Event`) => `void` |
| `onFocus` | () => `void` |
| `onInput?` | (`v`: [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\> \| `Event`) => `void` |
| `ref` | (`el`: ``null`` \| [`InputLikeRef`](index.md#inputlikeref)) => `void` |

#### Defined in

[types.ts:317](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L317)

___

### FieldRule

Ƭ **FieldRule**<`V`, `Deps`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `any` |
| `Deps` | `any` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alpha?` | `boolean` |
| `alphaNum?` | `boolean` |
| `debounce?` | `number` |
| `decimal?` | `boolean` |
| `email?` | `boolean` |
| `integer?` | `boolean` |
| `ipAddress?` | `boolean` |
| `macAddress?` | `boolean` |
| `max?` | `number` |
| `maxLength?` | `number` |
| `message?` | `string` |
| `min?` | `number` |
| `minLength?` | `number` |
| `numeric?` | `boolean` |
| `pattern?` | `RegExp` |
| `required?` | `boolean` |
| `requiredLength?` | `boolean` |
| `type?` | `string` |
| `validator?` | [`Validator`](index.md#validator)<`V`, `Deps`\> |

#### Defined in

[types.ts:201](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L201)

___

### FieldScope

Ƭ **FieldScope**<`T`, `N`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) = [`FormType`](index.md#formtype) |
| `N` | extends `string` = `string` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `field` | [`FieldProps`](index.md#fieldprops)<`T`, `N`\> |

#### Defined in

[types.ts:329](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L329)

___

### FieldState

Ƭ **FieldState**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error` | [`FieldError`](index.md#fielderror) \| ``null`` |
| `isChanged` | `boolean` |
| `isDirty` | `boolean` |
| `isError` | `boolean` |
| `isTouched` | `boolean` |
| `isValidating` | `boolean` |

#### Defined in

[types.ts:157](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L157)

___

### FieldValues

Ƭ **FieldValues**<`T`, `P`\>: `P` extends ``true`` ? [`UnpackNestedValue`](index.md#unpacknestedvalue)<[`DeepPartial`](index.md#deeppartial)<`T`\>\> : [`UnpackNestedValue`](index.md#unpacknestedvalue)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) = [`FormType`](index.md#formtype) |
| `P` | extends `boolean` = ``false`` |

#### Defined in

[types.ts:86](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L86)

___

### FormErrors

Ƭ **FormErrors**<`T`\>: `T` extends [`NestedValueType`](index.md#nestedvaluetype) \| [`NativeObjectType`](index.md#nativeobjecttype) ? [`FieldError`](index.md#fielderror) \| ``null`` \| `undefined` : `T` extends infer U[] ? { `[key: number]`: [`FormErrors`](index.md#formerrors)<`U`\>;  } : `T` extends [`ObjectType`](index.md#objecttype) ? { [K in keyof T]?: FormErrors<T[K]\> } : [`FieldError`](index.md#fielderror) \| ``null`` \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:101](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L101)

___

### FormState

Ƭ **FormState**<`T`, `VFK`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) = [`FormType`](index.md#formtype) |
| `VFK` | extends `string` = `string` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultValues` | [`FieldValues`](index.md#fieldvalues)<`T`, ``true``\> |
| `error` | [`FieldError`](index.md#fielderror) \| ``null`` |
| `fieldError` | [`FieldError`](index.md#fielderror) \| ``null`` |
| `fieldErrors` | [`FormErrors`](index.md#formerrors)<`T`\> |
| `isChanged` | `boolean` |
| `isDirty` | `boolean` |
| `isError` | `boolean` |
| `isFieldError` | `boolean` |
| `isFieldValidating` | `boolean` |
| `isSubmitted` | `boolean` |
| `isSubmitting` | `boolean` |
| `isTouched` | `boolean` |
| `isValidating` | `boolean` |
| `isVirtualError` | `boolean` |
| `isVirtualValidating` | `boolean` |
| `submitCount` | `number` |
| `values` | [`FieldValues`](index.md#fieldvalues)<`T`\> |
| `virtualError` | [`FieldError`](index.md#fielderror) \| ``null`` |
| `virtualErrors` | `Partial`<`Record`<`VFK`, [`FieldError`](index.md#fielderror) \| ``null``\>\> |

#### Defined in

[types.ts:113](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L113)

___

### FormType

Ƭ **FormType**: `Record`<`string`, `any`\>

#### Defined in

[types.ts:72](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L72)

___

### GetFormType

Ƭ **GetFormType**<`T`\>: `T` extends [`Form`](classes/Form.md)<infer U\> ? `U` : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[form.ts:34](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L34)

___

### InputLikeRef

Ƭ **InputLikeRef**: `Element` \| `Component` \| { `focus?`: () => `void`  }

#### Defined in

[types.ts:255](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L255)

___

### InternalKeyPathValue

Ƭ **InternalKeyPathValue**<`V`, `Path`\>: `Path` extends ``""`` ? `V` : `V` extends [`ObjectType`](index.md#objecttype) ? `V` extends [`NestedValueType`](index.md#nestedvaluetype) \| [`NativeObjectType`](index.md#nativeobjecttype) ? `never` : `Path` extends \`${infer Key}.${infer Rest}\` ? [`KeyPathValue`](index.md#keypathvalue)<`V`[`Key`], `Rest`\> : `V`[`Path`] extends [`NestedValue`](index.md#nestedvalue)<infer U\> ? `U` : `V` extends infer U[] ? `U` \| `undefined` : `V`[`Path`] : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `V` |
| `Path` | extends `string` |

#### Defined in

[types.ts:53](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L53)

___

### Join

Ƭ **Join**<`K`, `P`\>: `K` extends `string` \| `number` ? `P` extends `string` \| `number` ? ``""`` extends `K` ? `P` : \`${K}${"" extends P ? "" : "."}${P}\` : ``""`` : ``""``

#### Type parameters

| Name |
| :------ |
| `K` |
| `P` |

#### Defined in

[types.ts:263](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L263)

___

### KeyPathValue

Ƭ **KeyPathValue**<`V`, `Path`\>: `string` extends `Path` ? `any` : [`InternalKeyPathValue`](index.md#internalkeypathvalue)<`V`, [`NormalizePath`](index.md#normalizepath)<`Path`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends [`ObjectType`](index.md#objecttype) |
| `Path` | extends `string` |

#### Defined in

[types.ts:67](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L67)

___

### NativeObjectType

Ƭ **NativeObjectType**: `Date` \| `Blob` \| `File` \| `FileList` \| `Function` \| `RegExp`

#### Defined in

[types.ts:7](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L7)

___

### NestedValue

Ƭ **NestedValue**<`T`\>: { `[$NestedValue]`: `never`  } & `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ObjectType`](index.md#objecttype) |

#### Defined in

[types.ts:15](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L15)

___

### NestedValueType

Ƭ **NestedValueType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `[$NestedValue]` | `never` |

#### Defined in

[types.ts:19](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L19)

___

### NormalizePath

Ƭ **NormalizePath**<`T`\>: `T` extends \`${infer A}.${infer B}\` ? \`${ArrayPathToString<A\>}.${NormalizePath<B\>}\` : [`ArrayPathToString`](index.md#arraypathtostring)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Defined in

[types.ts:47](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L47)

___

### ObjectType

Ƭ **ObjectType**: `Record`<`string`, `any`\>

#### Defined in

[types.ts:5](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L5)

___

### UnpackFieldState

Ƭ **UnpackFieldState**<`T`\>: `T` extends [`NestedValueType`](index.md#nestedvaluetype) ? [`FieldState`](index.md#fieldstate) : `T` extends [`NativeObjectType`](index.md#nativeobjecttype) ? [`FieldState`](index.md#fieldstate) : `T` extends infer A[] ? [`UnpackFieldState`](index.md#unpackfieldstate)<`A`\>[] : `T` extends [`ObjectType`](index.md#objecttype) ? { [K in keyof T]: UnpackFieldState<T[K]\> } : [`FieldState`](index.md#fieldstate)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:33](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L33)

___

### UnpackNestedValue

Ƭ **UnpackNestedValue**<`T`\>: `T` extends [`NestedValue`](index.md#nestedvalue)<infer U\> ? `U` : `T` extends [`NativeObjectType`](index.md#nativeobjecttype) ? `T` : `T` extends infer A[] ? [`UnpackNestedValue`](index.md#unpacknestedvalue)<`A`\>[] : `T` extends [`ObjectType`](index.md#objecttype) ? { [K in keyof T]: UnpackNestedValue<T[K]\> } : `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:23](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L23)

___

### UseFieldProps

Ƭ **UseFieldProps**<`T`, `N`, `Deps`, `Transform`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) = [`FormType`](index.md#formtype) |
| `N` | extends [`FieldPath`](index.md#fieldpath)<`T`\> = [`FieldPath`](index.md#fieldpath)<`T`\> |
| `Deps` | `any` |
| `Transform` | [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `changeType?` | ``"ONINPUT"`` \| ``"ONCHANGE"`` |
| `debounce?` | `number` |
| `defaultValue?` | [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\> |
| `form?` | [`Form`](classes/Form.md)<`T`\> |
| `name` | `Ref`<`N`\> \| `N` |
| `rules?` | `Ref`<[`FieldRule`](index.md#fieldrule)<`Transform`, `Deps`\>[]\> \| [`FieldRule`](index.md#fieldrule)<`Transform`, `Deps`\>[] |
| `touchType?` | `Ref`<``"FOCUS"`` \| ``"BLUR"``\> \| ``"FOCUS"`` \| ``"BLUR"`` |
| `value?` | [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\> |
| `deps?` | () => `Deps` |
| `isEqual?` | (`v`: [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>, `d`: [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>) => `boolean` |
| `transform?` | (`v`: [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>) => `Transform` |

#### Defined in

[uses/useField.ts:24](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/uses/useField.ts#L24)

___

### UseVirtualFieldProps

Ƭ **UseVirtualFieldProps**<`T`, `VFK`, `N`, `V`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) = [`FormType`](index.md#formtype) |
| `VFK` | extends `string` = `string` |
| `N` | extends `VFK` = `VFK` |
| `V` | `any` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debounce?` | `number` |
| `form?` | [`Form`](classes/Form.md)<`T`, `VFK`\> |
| `name` | `Ref`<`N`\> \| `N` |
| `rules?` | `Ref`<[`VirtualFieldRule`](index.md#virtualfieldrule)[]\> \| [`VirtualFieldRule`](index.md#virtualfieldrule)[] |
| `value` | () => `V` |

#### Defined in

[uses/useVirtualField.ts:7](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/uses/useVirtualField.ts#L7)

___

### ValidateFunc

Ƭ **ValidateFunc**<`V`, `Deps`, `Rules`\>: (`v`: `V`, `deps`: `Deps` \| `undefined`, `rules`: `Rules`) => [`DisposablePromise`](index.md#disposablepromise)<[`FieldError`](index.md#fielderror) \| ``null``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `V` |
| `Deps` | `Deps` |
| `Rules` | [`FieldRule`](index.md#fieldrule)<`V`, `Deps`\>[] |

#### Type declaration

▸ (`v`, `deps`, `rules`): [`DisposablePromise`](index.md#disposablepromise)<[`FieldError`](index.md#fielderror) \| ``null``\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |
| `deps` | `Deps` \| `undefined` |
| `rules` | `Rules` |

##### Returns

[`DisposablePromise`](index.md#disposablepromise)<[`FieldError`](index.md#fielderror) \| ``null``\>

#### Defined in

[types.ts:181](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L181)

___

### Validator

Ƭ **Validator**<`V`, `Deps`\>: (`value`: `V` \| `undefined`, `deps?`: `Deps`) => `string` \| `Promise`<`string`\> \| [`DisposablePromise`](index.md#disposablepromise)<`string`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `any` |
| `Deps` | `any` |

#### Type declaration

▸ (`value`, `deps?`): `string` \| `Promise`<`string`\> \| [`DisposablePromise`](index.md#disposablepromise)<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` \| `undefined` |
| `deps?` | `Deps` |

##### Returns

`string` \| `Promise`<`string`\> \| [`DisposablePromise`](index.md#disposablepromise)<`string`\>

#### Defined in

[types.ts:192](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L192)

___

### VirtualFieldRule

Ƭ **VirtualFieldRule**<`V`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `any` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alpha?` | `boolean` |
| `alphaNum?` | `boolean` |
| `debounce?` | `number` |
| `decimal?` | `boolean` |
| `email?` | `boolean` |
| `integer?` | `boolean` |
| `ipAddress?` | `boolean` |
| `macAddress?` | `boolean` |
| `max?` | `number` |
| `maxLength?` | `number` |
| `message?` | `string` |
| `min?` | `number` |
| `minLength?` | `number` |
| `numeric?` | `boolean` |
| `pattern?` | `RegExp` |
| `required?` | `boolean` |
| `requiredLength?` | `boolean` |
| `type?` | `string` |
| `validator?` | [`VirtualFieldValidator`](index.md#virtualfieldvalidator)<`V`\> |

#### Defined in

[types.ts:228](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L228)

___

### VirtualFieldState

Ƭ **VirtualFieldState**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error` | [`FieldError`](index.md#fielderror) \| ``null`` |
| `isError` | `boolean` |
| `isValidating` | `boolean` |

#### Defined in

[types.ts:172](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L172)

___

### VirtualFieldValidator

Ƭ **VirtualFieldValidator**<`V`\>: (`value`: `V`) => `string` \| `Promise`<`string`\> \| [`DisposablePromise`](index.md#disposablepromise)<`string`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `any` |

#### Type declaration

▸ (`value`): `string` \| `Promise`<`string`\> \| [`DisposablePromise`](index.md#disposablepromise)<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |

##### Returns

`string` \| `Promise`<`string`\> \| [`DisposablePromise`](index.md#disposablepromise)<`string`\>

#### Defined in

[types.ts:197](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L197)

___

### VirtualValidateFunc

Ƭ **VirtualValidateFunc**<`V`, `Rules`\>: (`v`: `V`, `rules`: `Rules`) => [`DisposablePromise`](index.md#disposablepromise)<[`FieldError`](index.md#fielderror) \| ``null``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `V` |
| `Rules` | [`VirtualFieldRule`](index.md#virtualfieldrule)<`V`\>[] |

#### Type declaration

▸ (`v`, `rules`): [`DisposablePromise`](index.md#disposablepromise)<[`FieldError`](index.md#fielderror) \| ``null``\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |
| `rules` | `Rules` |

##### Returns

[`DisposablePromise`](index.md#disposablepromise)<[`FieldError`](index.md#fielderror) \| ``null``\>

#### Defined in

[types.ts:187](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/types.ts#L187)

## Component Variables

### Field

• `Const` **Field**: `DefineComponent`<{}, {}, `any`, `ComputedOptions`, `MethodOptions`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`<`ExtractPropTypes`<{}\>\>, {}\> = `FieldComponent`

[Field](../components/)

#### Defined in

components/Field/index.ts:7

___

### FieldArray

• `Const` **FieldArray**: `DefineComponent`<{}, {}, `any`, `ComputedOptions`, `MethodOptions`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`<`ExtractPropTypes`<{}\>\>, {}\> = `FieldArrayComponent`

[FieldArray](../components/)

#### Defined in

[components/index.ts:22](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/components/index.ts#L22)

___

### FormProvider

• `Const` **FormProvider**: `DefineComponent`<{}, {}, `any`, `ComputedOptions`, `MethodOptions`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`<`ExtractPropTypes`<{}\>\>, {}\> = `FormProviderComponent`

[FormProvider](../components/)

#### Defined in

[components/index.ts:27](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/components/index.ts#L27)

___

### VirtualField

• `Const` **VirtualField**: `DefineComponent`<{}, {}, `any`, `ComputedOptions`, `MethodOptions`, `ComponentOptionsMixin`, `ComponentOptionsMixin`, {}, `string`, `PublicProps`, `Readonly`<`ExtractPropTypes`<{}\>\>, {}\> = `VirtualFieldComponent`

[VirtualField](../components/)

#### Defined in

[components/index.ts:17](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/components/index.ts#L17)

___

## Other Variables

### FormContextKey

• `Const` **FormContextKey**: `InjectionKey`<[`Form`](classes/Form.md)<[`FormType`](index.md#formtype), `string`\>\>

#### Defined in

context.ts:4

___

### validators

• `Const` **validators**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `alpha` | [`Validator`](index.md#validator)<`any`, `any`\> |
| `alphaNum` | [`Validator`](index.md#validator)<`any`, `any`\> |
| `decimal` | [`Validator`](index.md#validator)<`any`, `any`\> |
| `email` | [`Validator`](index.md#validator)<`any`, `any`\> |
| `integer` | [`Validator`](index.md#validator)<`any`, `any`\> |
| `ipAddress` | [`Validator`](index.md#validator)<`any`, `any`\> |
| `macAddress` | [`Validator`](index.md#validator)<`any`, `any`\> |
| `numeric` | [`Validator`](index.md#validator)<`any`, `any`\> |

#### Defined in

[validators/index.ts:10](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/validators/index.ts#L10)

## Other Functions

### createFieldArray

▸ **createFieldArray**<`T`, `N`\>(`form`, `path`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `form` | [`Form`](classes/Form.md)<`T`, `string`\> |
| `path` | `N` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `append` | (`v`: [`ArrayItem`](index.md#arrayitem)<[`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>\>) => `void` |
| `fields` | `Ref`<{ `id`: `string` ; `name`: `string`  }[]\> |
| `insert` | (`id`: `string`, `v`: [`ArrayItem`](index.md#arrayitem)<[`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>\>) => `void` |
| `move` | (`from`: `string`, `to`: `string`) => `void` |
| `onCleanup` | () => `void` |
| `prepend` | (`v`: [`ArrayItem`](index.md#arrayitem)<[`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>\>) => `void` |
| `remove` | (`id`: `string`) => `void` |
| `replace` | (`values`: [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>) => `void` |
| `swap` | (`from`: `string`, `to`: `string`) => `void` |
| `update` | (`id`: `string`, `v`: [`ArrayItem`](index.md#arrayitem)<[`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>\>) => `void` |
| ``get` **fieldsValue**(): { `id`: `string` ; `name`: `string`  }[]` | {} |

#### Defined in

[fieldArray.ts:5](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/fieldArray.ts#L5)

___

### createForm

▸ **createForm**<`T`, `VFK`\>(`args`): [`Form`](classes/Form.md)<`T`, `VFK`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) = [`FormType`](index.md#formtype) |
| `VFK` | extends `string` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.defaultValues?` | [`UnpackNestedValue`](index.md#unpacknestedvalue)<[`DeepPartial`](index.md#deeppartial)<`T`\>\> |
| `args.initValues` | [`UnpackNestedValue`](index.md#unpacknestedvalue)<`T`\> |
| `args.readonly?` | `boolean` |
| `args.touchType?` | ``"FOCUS"`` \| ``"BLUR"`` |

#### Returns

[`Form`](classes/Form.md)<`T`, `VFK`\>

#### Defined in

[form.ts:777](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L777)

___

## Use Functions

### useField

▸ **useField**<`T`, `N`, `Deps`, `Transform`\>(`props`): [[`FieldProps`](index.md#fieldprops)<`T`, `N`\>, `Ref`<[`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>\>, { `mounted`: `Ref`<`Boolean`\>  }]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) |
| `N` | extends `string` |
| `Deps` | `any` |
| `Transform` | [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseFieldProps`](index.md#usefieldprops)<`T`, `N`, `Deps`, `Transform`\> |

#### Returns

[[`FieldProps`](index.md#fieldprops)<`T`, `N`\>, `Ref`<[`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>\>, { `mounted`: `Ref`<`Boolean`\>  }]

#### Defined in

[uses/useField.ts:46](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/uses/useField.ts#L46)

___

### useFieldArray

▸ **useFieldArray**<`T`, `N`\>(`args`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.form?` | [`Form`](classes/Form.md)<`T`, `string`\> |
| `args.path` | `N` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `append` | (`v`: [`ArrayItem`](index.md#arrayitem)<[`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>\>) => `void` |
| `fields` | `Ref`<{ `id`: `string` ; `name`: `string`  }[]\> |
| `fieldsValue` | { `id`: `string` ; `name`: `string`  }[] |
| `insert` | (`id`: `string`, `v`: [`ArrayItem`](index.md#arrayitem)<[`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>\>) => `void` |
| `move` | (`from`: `string`, `to`: `string`) => `void` |
| `prepend` | (`v`: [`ArrayItem`](index.md#arrayitem)<[`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>\>) => `void` |
| `remove` | (`id`: `string`) => `void` |
| `replace` | (`values`: [`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>) => `void` |
| `swap` | (`from`: `string`, `to`: `string`) => `void` |
| `update` | (`id`: `string`, `v`: [`ArrayItem`](index.md#arrayitem)<[`KeyPathValue`](index.md#keypathvalue)<`T`, `N`\>\>) => `void` |

#### Defined in

[uses/useFieldArray.ts:10](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/uses/useFieldArray.ts#L10)

___

### useForm

▸ **useForm**(): ``null`` \| [`Form`](classes/Form.md)<[`FormType`](index.md#formtype), `string`\>

#### Returns

``null`` \| [`Form`](classes/Form.md)<[`FormType`](index.md#formtype), `string`\>

#### Defined in

uses/useForm.ts:7

___

### useVirtualField

▸ **useVirtualField**<`T`, `N`\>(`props`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](index.md#formtype) |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`UseVirtualFieldProps`](index.md#usevirtualfieldprops)<`T`, `N`, `N`, `any`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `mounted` | `Ref`<`Boolean`\> |

#### Defined in

[uses/useVirtualField.ts:23](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/uses/useVirtualField.ts#L23)
