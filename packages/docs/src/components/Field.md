# Field

## Props

| Prop name    | Description | Type            | Values                | Default    |
| ------------ | ----------- | --------------- | --------------------- | ---------- |
| form         |             | Form            | -                     |            |
| name         |             | string          | -                     |            |
| rules        |             | FieldRule[]     | -                     | () => []   |
| deps         |             | () => any       | -                     | undefined  |
| debounce     |             | number          | -                     | undefined  |
| value        |             | any             | -                     | undefined  |
| defaultValue |             | any             | -                     | undefined  |
| transform    |             | (v: any) => any | -                     | undefined  |
| touchType    |             | string          | `FOCUS`, `BLUR`       | 'BLUR'     |
| changeType   |             | string          | `ONINPUT`, `ONCHANGE` | 'ONCHANGE' |
| isEqual      |             | (v: any) => any | -                     | undefined  |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |

---
