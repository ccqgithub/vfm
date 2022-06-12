import { inject } from 'vue';
import { FormContextKey } from '../context';

/**
 * @category Use
 */
export const useForm = () => {
  return inject(FormContextKey, null);
};
