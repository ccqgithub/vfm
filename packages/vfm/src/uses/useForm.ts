import { inject } from 'vue';
import { FormType } from '../types';
import { FormContextKey } from '../context';
import { Form } from '../form';

/**
 * @category Use
 */
export const useForm = <
  F extends FormType = FormType,
  VFK extends string = string
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formGetter?: () => Form<F, VFK>
) => {
  return inject(FormContextKey, null) as Form<F, VFK>;
};
