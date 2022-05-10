import { toRaw, ref, watch } from 'vue';
import { FormClass } from './form';
import { FormType, KeyPathValue, ArrayFieldPath, ArrayItem } from './types';

export const createFieldArray = <
  T extends FormType,
  N extends ArrayFieldPath<T>
>(
  form: FormClass<T>,
  path: N
) => {
  let fieldId = 0;
  let p = form.getPathValue(path as any);
  if (!Array.isArray(p)) {
    form.setPathValue(path as any, []);
    p = form.getPathValue(path as any);
  }
  const initArr = p as any[];
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
      const newArr = form.getPathValue(path as any);
      return newArr.map((item: any) => toRaw(item)) as any[];
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
    form.arrayAppend(path, v);
  };

  const prepend = (v: ArrayItem<KeyPathValue<T, N>>) => {
    form.arrayPrepend(path, v);
  };

  const insert = (id: string, v: ArrayItem<KeyPathValue<T, N>>) => {
    const index = fields.value.findIndex((item) => item.id === id);
    if (index === -1) return;
    form.arrayInsert(path, index, v);
  };

  const swap = (from: string, to: string) => {
    const fromIndex = fields.value.findIndex((item) => item.id === from);
    const toIndex = fields.value.findIndex((item) => item.id === to);
    if (fromIndex === -1 || toIndex === -1) return;
    form.arraySwap(path, fromIndex, toIndex);
  };

  const move = (from: string, to: string) => {
    const fromIndex = fields.value.findIndex((item) => item.id === from);
    const toIndex = fields.value.findIndex((item) => item.id === to);
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;
    form.arrayMove(path, fromIndex, toIndex);
  };

  const update = (id: string, v: ArrayItem<KeyPathValue<T, N>>) => {
    const index = fields.value.findIndex((item) => item.id === id);
    if (index === -1) return;
    form.arrayUpdate(path, index, v);
  };

  const replace = (values: KeyPathValue<T, N>) => {
    lastIds = [];
    form.arrayReplace(path, values);
  };

  const remove = (id: string) => {
    const index = fields.value.findIndex((item) => item.id === id);
    if (index === -1) return;
    form.arrayRemove(path, index);
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
