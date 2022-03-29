import { onUnmounted, onMounted, inject } from 'vue';
import { vfmInjectionKey } from '../context';
import { FieldState } from './../types';
import { computed, reactive, ref } from 'vue';
import { getKeyValue } from '../untils';
import { FormClass } from '../form';
import { FieldRule, KeyPathValue, FormType, InputLikeRef } from '../types';

export type UseFieldProps<
  T extends FormType = FormType,
  N extends string = string
> = {
  form?: FormClass<T>;
  name: N;
  rules?: FieldRule[];
  value?: KeyPathValue<T, N>;
  defaultValue?: KeyPathValue<T, N>;
};

export type UseFieldReturn<
  T extends FormType = FormType,
  N extends string = string
> = {
  value?: KeyPathValue<T, N>;
  onChange: (v: KeyPathValue<T, N>) => void;
  onBlur: () => void;
  setRef: (el: InputLikeRef | null) => void;
};

export const useField = <T extends FormType, N extends string>(
  props: UseFieldProps<T, N>
): [UseFieldReturn<T, N>, FieldState<KeyPathValue<T, N>> | undefined] => {
  const injectedForm = inject(vfmInjectionKey, null) as FormClass<T, N> | null;
  const { form = injectedForm, name } = props;

  if (!form) {
    throw new Error(
      `No form in the injected context or props, can not use Field <${props.name}>`
    );
  }

  const { register, field } = form.registerField(name, {
    value: props.value,
    defaultValue: props.defaultValue,
    rules: props.rules,
    immediate: false
  });
  const state = computed(() => {
    return getKeyValue(form.fieldStates, name) as
      | FieldState<KeyPathValue<T, N>>
      | undefined;
  });
  const value = computed(() =>
    state.value ? state.value.value : field.state.value
  );
  const onChange = (v: KeyPathValue<T, N> | Event) => {
    const value =
      typeof v === 'object' &&
      typeof (v as InputEvent).currentTarget === 'object' &&
      typeof (v as InputEvent).preventDefault === 'function' &&
      ((v as InputEvent).currentTarget as HTMLInputElement)?.value !== undefined
        ? ((v as InputEvent).currentTarget as HTMLInputElement)?.value
        : v;
    form.setValue(name, value);
  };
  const onBlur = () => {
    form.setTouched(name, true);
  };
  const elemRef = ref<InputLikeRef | null>(null);
  const setRef = (el: InputLikeRef | null) => (elemRef.value = el);

  onMounted(() => {
    register();
  });

  onUnmounted(() => {
    form.unregisterField(name);
  });

  const res = reactive({
    value,
    onChange,
    onBlur,
    setRef
  });

  return [res, state.value];
};
