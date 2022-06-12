import { onBeforeUnmount, onMounted, Ref, ref, unref, watch } from 'vue';
import { Form } from '../form';
import { VirtualFieldRule } from './../types';
import { FormType } from '../types';
import { useForm } from './useForm';

export type UseVirtualFieldProps<
  T extends FormType = FormType,
  VFK extends string = string,
  N extends VFK = VFK,
  V = any
> = {
  form?: Form<T, VFK>;
  name: Ref<N> | N;
  value: () => V;
  rules?: Ref<VirtualFieldRule[]> | VirtualFieldRule[];
  debounce?: number;
};

/**
 * @category Use
 */
export const useVirtualField = <T extends FormType, N extends string>(
  props: UseVirtualFieldProps<T, N>
): {
  mounted: Ref<Boolean>;
} => {
  const injectForm = useForm() as Form<T> | null;
  const { form = injectForm, name } = props;

  if (!form) {
    throw new Error('No provided form!');
  }

  const mounted = ref(false);

  let { register, field } = form.registerVirtualField(unref(name), {
    value: props.value,
    rules: unref(props.rules),
    immediate: false,
    debounce: props.debounce
  });
  const fieldState = ref(field.state);
  const stopWatch = watch(
    () => unref(props.name),
    (n, ln) => {
      form.unregisterVirtualField(ln);
      const fs = form.registerVirtualField(unref(name), {
        value: props.value,
        rules: unref(props.rules),
        immediate: mounted.value,
        debounce: props.debounce
      });
      register = fs.register;
      field = fs.field;
      fieldState.value = fs.field.state;
    }
  );

  onMounted(() => {
    register();
    mounted.value = true;
  });

  onBeforeUnmount(() => {
    form.unregisterVirtualField(unref(name));
    stopWatch();
  });

  return {
    mounted
  };
};
