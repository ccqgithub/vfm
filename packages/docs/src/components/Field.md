# Field

## Props

| Prop name    | Description                                                                                                                                                                                                                                                                     | Type            | Values                | Default    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------------- | ---------- |
| form         | The form instance that created by [createForm](../apis/#createform)                                                                                                                                                                                                             | Form            | -                     | undefined  |
| name         | Field name                                                                                                                                                                                                                                                                      | string          | -                     |            |
| rules        | [FieldRule](../apis/#fieldrule) list<br/>_Tips:_ Do not visit form's error state in the `validator` function, because the validate will change error state, it will causes an infinite loop of calls.                                                                           | FieldRule[]     | -                     | () => []   |
| deps         | Function to generate dependent value. It run in `watchEffect`, so if the return value change, the field will `revalidate`.<br/>_Tips:_ Do not visit form's error state in the function, because the validate will change error state, it will causes an infinite loop of calls. | () => any       | -                     | undefined  |
| debounce     | Field validate debounce time, millseconds.                                                                                                                                                                                                                                      | number          | -                     | undefined  |
| value        | The initial value of the field, it will override the `initValues` of `createForm`.                                                                                                                                                                                              | any             | -                     | undefined  |
| defaultValue | The default value of the field, used to determine whether field is dirty and reset field. it will override the `initValues` of `createForm`.                                                                                                                                    | any             | -                     | undefined  |
| transform    | Transform value before pass to validate.                                                                                                                                                                                                                                        | (v: any) => any | -                     | undefined  |
| touchType    | When to mark the field is `touched`, default is 'BLUR', means that the field will be `touched` after bulur event.                                                                                                                                                               | string          | `FOCUS`, `BLUR`       | 'BLUR'     |
| changeType   | When to change the field value, default is 'ONCHANGE', means that the field will setValue when input really event.                                                                                                                                                              | string          | `ONINPUT`, `ONCHANGE` | 'ONCHANGE' |
| isEqual      | Compare value and defaultValue, checkout them wether is append.                                                                                                                                                                                                                 | (v: any) => any | -                     | undefined  |

## Slots

| Name    | Description        | Bindings                                                  |
| ------- | ------------------ | --------------------------------------------------------- |
| default | Field default slot | **field** `mixed` - see [FieldScope](../apis/#fieldscope) |

---
