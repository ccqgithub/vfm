import { onBeforeUnmount } from 'vue';
import { Form } from '../form';
import { createFieldArray } from '../fieldArray';
import { FormType, ArrayFieldPath } from '../types';

/**
 * @category Use
 */
export const useFieldArray = <T extends FormType, N extends ArrayFieldPath<T>>(
  form: Form<T>,
  path: N
) => {
  const { onCleanup, ...rest } = createFieldArray(form, path);
  onBeforeUnmount(() => onCleanup());
  return rest;
};
