import { provide, onMounted, onUnmounted } from 'vue';
import { FormContextKey } from '../context';
import { Form } from '../form';

/**
 * @category Use
 */
export const useProvideForm = (form: Form) => {
  provide(FormContextKey, form);

  onMounted(() => form.mount());
  onUnmounted(() => form.unmount());
};
