import { onUnmounted } from 'vue';
import { FormClass } from '../form';
import { createFieldArray } from '../fieldArray';
import { FormType, ArrayFieldPath } from '../types';

export const useFieldArray = <T extends FormType, N extends ArrayFieldPath<T>>(
  form: FormClass<T>,
  path: N
) => {
  const { onCleanup, ...rest } = createFieldArray(form, path);
  onUnmounted(() => onCleanup());
  return rest;
};
