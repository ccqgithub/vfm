import { onUnmounted, onMounted, inject, Ref, ref } from 'vue';
import { FormClass } from '../form';
import { vfmInjectionKey } from '../context';
import { VirtualFieldRule } from './../types';
import { FormType, VirtualFieldState } from '../types';

export type UseVirtualFieldProps<
  T extends FormType = FormType,
  N extends string = string
> = {
  form?: FormClass<T>;
  name: N;
  rules?: VirtualFieldRule[];
};

export const useVirtualField = <T extends FormType, N extends string>(
  props: UseVirtualFieldProps<T, N>
): [
  VirtualFieldState,
  {
    mounted: Ref<Boolean>;
    form: FormClass<T>;
  }
] => {
  const injectedForm = inject(vfmInjectionKey, null) as FormClass<T> | null;
  const { form = injectedForm, name } = props;
  const mounted = ref(false);

  if (!form) {
    throw new Error(
      `No form in the injected context or props, can not use Field <${props.name}>`
    );
  }

  const { register, field } = form.registerVirtualField(name, {
    rules: props.rules,
    immediate: false
  });

  onMounted(() => {
    register();
    mounted.value = true;
  });

  onUnmounted(() => {
    form.unregisterField(name);
  });

  return [
    field.state,
    {
      mounted,
      form
    }
  ];
};
