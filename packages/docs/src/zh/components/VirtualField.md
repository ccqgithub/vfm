# VirtualField

## Props

| Prop name | Description                                                                                                                                                                                                                                                                | Type               | Values | Default   |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------ | --------- |
| form      | The form instance that created by [createForm](../apis/#createform)                                                                                                                                                                                                        | Form               | -      |           |
| name      | The field name                                                                                                                                                                                                                                                             | string             | -      |           |
| value     | Function that generate value to validate, run in `watchEffect`, so if return value change, the field will revalidate.<br/>_Tips:_ Do not visit form's error state in the function, because the validate will change error state, it will causes an infinite loop of calls. | () => any          | -      |           |
| rules     | [VirtualFieldRule](../apis/#virtualfieldrule) list<br/>_Tips:_ Do not visit form's error state in the `validator` function, because the validate will change error state, it will causes an infinite loop of calls.                                                        | VirtualFieldRule[] | -      | () => []  |
| debounce  | Field validate debounce time, millseconds.                                                                                                                                                                                                                                 | number             | -      | undefined |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---
