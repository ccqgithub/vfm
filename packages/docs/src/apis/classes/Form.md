---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / Form

# Class: Form<T, VFK\>

Class to management form state.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`FormType`](../index.md#formtype) = [`FormType`](../index.md#formtype) |  |
| `VFK` | extends `string` = `string` | - |

## Constructors

### constructor

• **new Form**<`T`, `VFK`\>(`args`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FormType`](../index.md#formtype) = [`FormType`](../index.md#formtype) |
| `VFK` | extends `string` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.defaultValues?` | [`UnpackNestedValue`](../index.md#unpacknestedvalue)<[`DeepPartial`](../index.md#deeppartial)<`T`\>\> |
| `args.initValues` | [`UnpackNestedValue`](../index.md#unpacknestedvalue)<`T`\> |
| `args.readonly?` | `boolean` |
| `args.touchType?` | ``"FOCUS"`` \| ``"BLUR"`` |

## Properties

### touchType

• **touchType**: ``"FOCUS"`` \| ``"BLUR"`` = `'BLUR'`

#### Defined in

[packages/vfm/src/form.ts:41](https://github.com/ccqgithub/vfm/blob/bbf78b1/packages/vfm/src/form.ts#L41)

## Accessors

### state

• `get` **state**(): [`FormState`](../index.md#formstate)<`T`, `VFK`\>

#### Returns

[`FormState`](../index.md#formstate)<`T`, `VFK`\>

## Methods

### arrayAppend

▸ **arrayAppend**<`N`\>(`name`, `v`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `v` | [`ArrayItem`](../index.md#arrayitem)<[`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>\> |

#### Returns

`void`

___

### arrayInsert

▸ **arrayInsert**<`N`\>(`name`, `index`, `v`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `index` | `number` |
| `v` | [`ArrayItem`](../index.md#arrayitem)<[`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>\> |

#### Returns

`void`

___

### arrayMove

▸ **arrayMove**<`N`\>(`name`, `fromIndex`, `toIndex`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `fromIndex` | `number` |
| `toIndex` | `number` |

#### Returns

`void`

___

### arrayPrepend

▸ **arrayPrepend**<`N`\>(`name`, `v`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `v` | [`ArrayItem`](../index.md#arrayitem)<[`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>\> |

#### Returns

`void`

___

### arrayRemove

▸ **arrayRemove**<`N`\>(`name`, `index`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `index` | `number` |

#### Returns

`void`

___

### arrayReplace

▸ **arrayReplace**<`N`\>(`name`, `v`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `v` | [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\> |

#### Returns

`void`

___

### arraySwap

▸ **arraySwap**<`N`\>(`name`, `fromIndex`, `toIndex`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `fromIndex` | `number` |
| `toIndex` | `number` |

#### Returns

`void`

___

### arrayUpdate

▸ **arrayUpdate**<`N`\>(`name`, `index`, `v`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `index` | `number` |
| `v` | [`ArrayItem`](../index.md#arrayitem)<[`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>\> |

#### Returns

`void`

___

### deletePathValue

▸ **deletePathValue**<`N`\>(`name`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`void`

___

### deleteValue

▸ **deleteValue**<`N`\>(`name`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`void`

___

### fieldError

▸ **fieldError**<`N`\>(`name`, `reportType?`): ``null`` \| [`FieldError`](../index.md#fielderror)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `N` | `undefined` |
| `reportType` | ``"all"`` \| ``"formTouched"`` \| ``"fieldTouched"`` \| ``"allTouched"`` \| ``"anyTouched"`` | `'anyTouched'` |

#### Returns

``null`` \| [`FieldError`](../index.md#fielderror)

___

### fieldState

▸ **fieldState**<`N`\>(`name`): ``null`` \| [`FieldState`](../index.md#fieldstate)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

``null`` \| [`FieldState`](../index.md#fieldstate)

___

### getPathValue

▸ **getPathValue**<`N`\>(`name`): [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

[`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>

___

### getPathValueRef

▸ **getPathValueRef**<`N`\>(`name`): `ComputedRef`<[`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`ComputedRef`<[`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>\>

___

### getValue

▸ **getValue**<`N`\>(`name`): [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

[`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>

___

### getValueRef

▸ **getValueRef**<`N`\>(`name`): `ComputedRef`<[`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`ComputedRef`<[`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>\>

___

### isChanged

▸ **isChanged**<`N`\>(`name`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`boolean`

___

### isDirty

▸ **isDirty**<`N`\>(`name`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`boolean`

___

### isError

▸ **isError**<`N`\>(`name`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`boolean`

___

### isTouched

▸ **isTouched**<`N`\>(`name`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`boolean`

___

### isValidating

▸ **isValidating**<`N`\>(`name`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`boolean`

___

### isVirtualError

▸ **isVirtualError**<`N`\>(`name`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`boolean`

___

### isVirtualValidating

▸ **isVirtualValidating**<`N`\>(`name`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`boolean`

___

### mount

▸ **mount**(): `void`

#### Returns

`void`

___

### notify

▸ **notify**(`type`, `name?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"UPDATE"`` \| ``"DELETE"`` \| ``"RESET"`` |
| `name?` | `string` |

#### Returns

`void`

___

### registerField

▸ **registerField**<`N`, `Deps`, `Transform`\>(`name`, `args?`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |
| `Deps` | `any` |
| `Transform` | [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `args` | `Object` |
| `args.debounce?` | `number` |
| `args.defaultValue?` | [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\> |
| `args.deps?` | () => `Deps` |
| `args.immediate?` | `boolean` |
| `args.isEqual?` | (`v`: [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>, `d`: [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>) => `boolean` |
| `args.onFocus?` | () => `void` |
| `args.rules?` | [`FieldRule`](../index.md#fieldrule)<`Transform`, `Deps`\>[] |
| `args.transform?` | (`v`: [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>) => `Transform` |
| `args.value?` | [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `field` | `FieldClass`<`T`, `N`, `Deps`, `Transform`, `VFK`\> |
| `register` | () => `void` |

___

### registerVirtualField

▸ **registerVirtualField**<`N`, `V`\>(`name`, `args`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` = `VFK` |
| `V` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `args` | `Object` |
| `args.debounce?` | `number` |
| `args.immediate?` | `boolean` |
| `args.rules?` | [`VirtualFieldRule`](../index.md#virtualfieldrule)<`V`\>[] |
| `args.value` | () => `V` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `field` | `VirtualFieldClass`<`T`, `V`\> |
| `register` | () => `void` |

___

### reset

▸ **reset**(`args?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.defaultValues?` | [`UnpackNestedValue`](../index.md#unpacknestedvalue)<[`DeepPartial`](../index.md#deeppartial)<`T`\>\> |
| `args.keepChanged?` | `boolean` |
| `args.keepDefaultValues?` | `boolean` |
| `args.keepIsSubmitted?` | `boolean` |
| `args.keepSubmitCount?` | `boolean` |
| `args.keepTouched?` | `boolean` |
| `args.keepValues?` | `boolean` |
| `args.values?` | [`UnpackNestedValue`](../index.md#unpacknestedvalue)<`T`\> |

#### Returns

`void`

___

### resetField

▸ **resetField**<`N`\>(`name`, `args?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `args` | `Object` |
| `args.defaultValue?` | [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\> |
| `args.keepChanged?` | `boolean` |
| `args.keepTouched?` | `boolean` |
| `args.keepValue?` | `boolean` |
| `args.value?` | [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\> |

#### Returns

`void`

___

### runInAction

▸ **runInAction**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (...`args`: `any`[]) => `void` |

#### Returns

`void`

___

### setFocus

▸ **setFocus**<`N`\>(`name`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`void`

___

### setPathValue

▸ **setPathValue**<`N`\>(`name`, `value`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `value` | [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\> |

#### Returns

`void`

___

### setTouched

▸ **setTouched**<`N`\>(`name`, `touched?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `N` | `undefined` |
| `touched` | `boolean` | `true` |

#### Returns

`void`

___

### setValue

▸ **setValue**<`N`\>(`name`, `value`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `value` | [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\> |

#### Returns

`void`

___

### submit

▸ **submit**(`args?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.onError?` | (`error`: [`FieldError`](../index.md#fielderror)) => `void` |
| `args.onSuccess?` | (`data`: [`UnpackNestedValue`](../index.md#unpacknestedvalue)<`T`\>) => `void` |

#### Returns

`void`

___

### subscribe

▸ **subscribe**(`subscriber`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriber` | (`type`: ``"UPDATE"`` \| ``"DELETE"`` \| ``"RESET"``, `name?`: `string`) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

___

### unmount

▸ **unmount**(): `void`

#### Returns

`void`

___

### unregisterField

▸ **unregisterField**<`N`\>(`name`, `args?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |
| `args` | `Object` |
| `args.removeValue?` | `boolean` |

#### Returns

`void`

___

### unregisterVirtualField

▸ **unregisterVirtualField**<`N`\>(`name`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

`void`

___

### virtualFieldError

▸ **virtualFieldError**<`N`\>(`name`, `reportType?`): ``null`` \| [`FieldError`](../index.md#fielderror)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `N` | `undefined` |
| `reportType` | ``"all"`` \| ``"formTouched"`` | `'formTouched'` |

#### Returns

``null`` \| [`FieldError`](../index.md#fielderror)

___

### virtualFieldState

▸ **virtualFieldState**<`N`\>(`name`): ``null`` \| [`VirtualFieldState`](../index.md#virtualfieldstate)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

``null`` \| [`VirtualFieldState`](../index.md#virtualfieldstate)
