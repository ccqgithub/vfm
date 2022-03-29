import { onUnmounted, onMounted, inject } from 'vue';
import { vfmInjectionKey } from '../context';
import { FieldState, VirtualFieldRule } from './../types';
import { computed } from 'vue';
import { getKeyValue } from '../untils';
import { FormClass } from '../form';
import { KeyPathValue, FormType, VirtualFieldState } from '../types';

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
): [VirtualFieldState | undefined] => {
  const injectedForm = inject(vfmInjectionKey, null) as FormClass<T, N> | null;
  const { form = injectedForm, name } = props;

  if (!form) {
    throw new Error(
      `No form in the injected context or props, can not use Field <${props.name}>`
    );
  }

  const { register } = form.registerVirtualField(name, {
    rules: props.rules,
    immediate: false
  });
  const state = computed(() => {
    return getKeyValue(form.fieldStates, name) as
      | FieldState<KeyPathValue<T, N>>
      | undefined;
  });

  onMounted(() => {
    register();
  });

  onUnmounted(() => {
    form.unregisterField(name);
  });

  return [state.value];
};
