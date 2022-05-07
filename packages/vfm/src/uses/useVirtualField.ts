import { onUnmounted, onMounted, Ref, ref, unref, watch } from 'vue';
import { FormClass } from '../form';
import { VirtualFieldRule } from './../types';
import { FormType, VirtualFieldState } from '../types';

export type UseVirtualFieldProps<
  T extends FormType = FormType,
  N extends string = string
> = {
  form: FormClass<T>;
  name: Ref<N> | N;
  rules?: Ref<VirtualFieldRule[]> | VirtualFieldRule[];
};

export const useVirtualField = <T extends FormType, N extends string>(
  props: UseVirtualFieldProps<T, N>
): {
  state: Ref<VirtualFieldState>;
  mounted: Ref<Boolean>;
} => {
  const { form, name } = props;
  const mounted = ref(false);

  let { register, field } = form.registerVirtualField(unref(name), {
    rules: unref(props.rules),
    immediate: false
  });
  const fieldState = ref(field.state);
  const stopWatch = watch(
    () => unref(props.name),
    (n, ln) => {
      form.unregisterVirtualField(ln);
      const fs = form.registerVirtualField(unref(name), {
        rules: unref(props.rules),
        immediate: mounted.value
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

  onUnmounted(() => {
    form.unregisterField(unref(name));
    stopWatch();
  });

  return {
    state: fieldState,
    mounted
  };
};
