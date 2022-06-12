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
| `T` | extends [`FormType`](../index.md#formtype) = [`FormType`](../index.md#formtype) | form structure type |
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

#### Defined in

[form.ts:70](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L70)

## Properties

### touchType

• **touchType**: ``"FOCUS"`` \| ``"BLUR"`` = `'BLUR'`

#### Defined in

[form.ts:41](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L41)

## Accessors

### state

• `get` **state**(): [`FormState`](../index.md#formstate)<`T`, `VFK`\>

#### Returns

[`FormState`](../index.md#formstate)<`T`, `VFK`\>

#### Defined in

[form.ts:108](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L108)

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

#### Defined in

[form.ts:695](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L695)

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

#### Defined in

[form.ts:715](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L715)

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

#### Defined in

[form.ts:739](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L739)

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

#### Defined in

[form.ts:705](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L705)

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

#### Defined in

[form.ts:762](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L762)

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

#### Defined in

[form.ts:769](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L769)

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

#### Defined in

[form.ts:726](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L726)

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

#### Defined in

[form.ts:751](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L751)

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

#### Defined in

[form.ts:451](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L451)

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

#### Defined in

[form.ts:456](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L456)

___

### fieldError

▸ **fieldError**<`N`\>(`name`): ``null`` \| [`FieldError`](../index.md#fielderror)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

``null`` \| [`FieldError`](../index.md#fielderror)

#### Defined in

[form.ts:687](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L687)

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

#### Defined in

[form.ts:645](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L645)

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

#### Defined in

[form.ts:485](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L485)

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

#### Defined in

[form.ts:465](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L465)

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

#### Defined in

[form.ts:489](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L489)

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

#### Defined in

[form.ts:473](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L473)

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

#### Defined in

[form.ts:667](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L667)

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

#### Defined in

[form.ts:659](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L659)

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

#### Defined in

[form.ts:679](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L679)

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

#### Defined in

[form.ts:663](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L663)

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

#### Defined in

[form.ts:671](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L671)

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

#### Defined in

[form.ts:683](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L683)

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

#### Defined in

[form.ts:675](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L675)

___

### mount

▸ **mount**(): `void`

#### Returns

`void`

#### Defined in

[form.ts:120](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L120)

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

#### Defined in

[form.ts:639](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L639)

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
| `args.immediate?` | `boolean` |
| `args.rules?` | [`FieldRule`](../index.md#fieldrule)<`Transform`, `Deps`\>[] |
| `args.value?` | [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\> |
| `args.deps?` | () => `Deps` |
| `args.isEqual?` | (`v`: [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>, `d`: [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>) => `boolean` |
| `args.onFocus?` | () => `void` |
| `args.transform?` | (`v`: [`KeyPathValue`](../index.md#keypathvalue)<`T`, `N`\>) => `Transform` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `field` | `FieldClass`<`T`, `N`, `Deps`, `Transform`, `VFK`\> |
| `register` | () => `void` |

#### Defined in

[form.ts:260](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L260)

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

#### Defined in

[form.ts:346](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L346)

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

#### Defined in

[form.ts:550](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L550)

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

#### Defined in

[form.ts:598](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L598)

___

### runInAction

▸ **runInAction**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (...`args`: `any`[]) => `void` |

#### Returns

`void`

#### Defined in

[form.ts:116](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L116)

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

#### Defined in

[form.ts:506](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L506)

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

#### Defined in

[form.ts:434](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L434)

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

#### Defined in

[form.ts:497](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L497)

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

#### Defined in

[form.ts:439](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L439)

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

#### Defined in

[form.ts:515](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L515)

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

#### Defined in

[form.ts:628](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L628)

___

### unmount

▸ **unmount**(): `void`

#### Returns

`void`

#### Defined in

[form.ts:229](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L229)

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

#### Defined in

[form.ts:389](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L389)

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

#### Defined in

[form.ts:415](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L415)

___

### virtualFieldError

▸ **virtualFieldError**<`N`\>(`name`): ``null`` \| [`FieldError`](../index.md#fielderror)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `N` |

#### Returns

``null`` \| [`FieldError`](../index.md#fielderror)

#### Defined in

[form.ts:691](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L691)

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

#### Defined in

[form.ts:652](https://github.com/ccqgithub/vfm/blob/d83ba3d/packages/vfm/src/form.ts#L652)
