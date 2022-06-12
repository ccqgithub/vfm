import { onBeforeUnmount } from 'vue';
import { Form } from '../form';
import { createFieldArray } from '../fieldArray';
import { FormType, ArrayFieldPath } from '../types';
import { useForm } from './useForm';

/**
 * @category Use
 */
export const useFieldArray = <
  T extends FormType,
  N extends ArrayFieldPath<T>
>(args: {
  form?: Form<T>;
  path: N;
}) => {
  const injectForm = useForm() as Form<T> | null;
  const { form = injectForm, path } = args;

  if (!form) {
    throw new Error('No provided form!');
  }

  const { onCleanup, ...rest } = createFieldArray(form, path);
  onBeforeUnmount(() => onCleanup());
  return rest;
};
