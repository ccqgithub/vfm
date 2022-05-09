import { toRaw, ref, watch } from 'vue';
import { FormClass } from './form';
import { getKeyValue } from './untils';
import { FormType, KeyPathValue, ArrayFieldPath, ArrayItem } from './types';

export const createFieldArray = <
  T extends FormType,
  N extends ArrayFieldPath<T>
>(
  form: FormClass<T>,
  path: N
) => {
  let fieldId = 0;
  const p = form.getValue(path as any);
  if (!Array.isArray(p.value)) {
    form.setPathValue(path as any, [] as any);
  }
  const initArr = p.value as any[];
  const initFields = initArr.map(() => {
    const id = `${fieldId++}`;
    return {
      id
    };
  });
  let lastIds = initFields.map((v) => v.id);
  const fields = ref<{ id: string }[]>(initFields);
  const usedFlag = {};
  const stopWatch = watch(
    () => {
      const newArr = getKeyValue(form.state.values, path);
      return [...newArr] as const;
    },
    (newArr, oldArr) => {
      const arr = [...oldArr];
      const newFields = newArr.map((item) => {
        const v = toRaw(item);
        const oIndex = arr.findIndex((o) => toRaw(o) === v);
        let id = '';
        if (oIndex === -1) {
          id = `${fieldId++}`;
        } else {
          id = lastIds[oIndex];
          // set this item is used
          arr[oIndex] = usedFlag;
        }
        return { id: `${id}` };
      });
      fields.value = newFields;
      lastIds = newFields.map((v) => v.id);
    }
  );

  const append = (v: ArrayItem<KeyPathValue<T, N>>) => {
    const arr = getKeyValue(form.state.values, path);
    if (!Array.isArray(arr)) return;
    arr.push(v);
  };
  const prepend = (v: ArrayItem<KeyPathValue<T, N>>) => {
    const arr = getKeyValue(form.state.values, path);
    if (!Array.isArray(arr)) return;
    arr.unshift(v);
  };
  const insert = (id: string, v: ArrayItem<KeyPathValue<T, N>>) => {
    const index = fields.value.findIndex((item) => item.id === id);
    if (index === -1) return;
    const arr = getKeyValue(form.state.values, path);
    if (!Array.isArray(arr)) return;
    arr.splice(index, 0, v);
  };
  const swap = (from: string, to: string) => {
    const fromIndex = fields.value.findIndex((item) => item.id === from);
    const toIndex = fields.value.findIndex((item) => item.id === to);
    if (fromIndex === -1 || toIndex === -1) return;
    const arr = getKeyValue(form.state.values, path);
    if (!Array.isArray(arr)) return;
    const tmp = arr[toIndex];
    arr[toIndex] = arr[fromIndex];
    arr[fromIndex] = tmp;
  };
  const move = (from: string, to: string) => {
    const fromIndex = fields.value.findIndex((item) => item.id === from);
    const toIndex = fields.value.findIndex((item) => item.id === to);
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;
    const arr = getKeyValue(form.state.values, path);
    if (!Array.isArray(arr)) return;
    arr.splice(toIndex, 0, arr[fromIndex]);
    arr.splice(toIndex > fromIndex ? fromIndex : fromIndex + 1);
  };
  const update = (id: string, v: ArrayItem<KeyPathValue<T, N>>) => {
    const index = fields.value.findIndex((item) => item.id === id);
    if (index === -1) return;
    const arr = getKeyValue(form.state.values, path);
    if (!Array.isArray(arr)) return;
    arr.splice(index, 0, v);
  };
  const replace = (values: KeyPathValue<T, N>) => {
    lastIds = [];
    form.setPathValue(path as any, values);
  };
  const remove = (id: string) => {
    const index = fields.value.findIndex((item) => item.id === id);
    if (index === -1) return;
    const arr = getKeyValue(form.state.values, path);
    if (!Array.isArray(arr)) return;
    arr.splice(index, 0);
  };

  return {
    onCleanup: () => {
      stopWatch();
    },
    get fieldsValue() {
      return fields.value;
    },
    fields,
    prepend,
    append,
    insert,
    swap,
    move,
    replace,
    remove,
    update
  };
};
