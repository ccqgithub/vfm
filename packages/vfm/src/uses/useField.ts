import {
  onUnmounted,
  onMounted,
  inject,
  Ref,
  computed,
  reactive,
  ref
} from 'vue';
import { FormClass } from '../form';
import { vfmInjectionKey } from '../context';
import { FieldState, FormState } from './../types';
import { FieldRule, KeyPathValue, FormType, InputLikeRef } from '../types';

export type UseFieldProps<
  T extends FormType = FormType,
  N extends string = string
> = {
  form?: FormClass<T>;
  name: N;
  rules?: FieldRule<KeyPathValue<T, N>, FormState<T>>[];
  value?: KeyPathValue<T, N>;
  defaultValue?: KeyPathValue<T, N>;
  transform?: (v: KeyPathValue<T, N>) => KeyPathValue<T, N>;
  touchType?: 'FOCUS' | 'BLUR';
};

export type FieldElementProps<
  T extends FormType = FormType,
  N extends string = string
> = {
  value?: Ref<KeyPathValue<T, N>>;
  onChange: (v: KeyPathValue<T, N>) => void;
  onBlur: () => void;
  onFocus: () => void;
  ref: (el: InputLikeRef | null) => void;
};

export const useField = <T extends FormType, N extends string>(
  props: UseFieldProps<T, N>
): [
  FieldElementProps<T, N>,
  {
    state: FieldState<KeyPathValue<T, N>>;
    form: FormClass<T>;
    mounted: Ref<Boolean>;
  }
] => {
  const injectedForm = inject(vfmInjectionKey, null) as FormClass<T> | null;
  const { form = injectedForm, name } = props;
  const { touchType = form?.touchType } = props;
  const mounted = ref(false);

  if (!form) {
    throw new Error(
      `No form in the injected context or props, can not use Field <${props.name}>`
    );
  }

  const elemRef = ref<InputLikeRef | null>(null);
  const setRef = (el: InputLikeRef | null) => (elemRef.value = el);
  const onChange = (v: KeyPathValue<T, N> | Event) => {
    const value =
      typeof v === 'object' &&
      typeof (v as any).currentTarget === 'object' &&
      ((v as any).currentTarget as HTMLInputElement)?.value !== undefined
        ? // element event
          ((v as any).currentTarget as HTMLInputElement)?.value
        : // component event
          v;
    form.setValue(name, value);
  };
  const onBlur = () => {
    touchType === 'BLUR' && form.setTouched(name, true);
  };
  const onFocus = () => {
    touchType === 'FOCUS' && form.setTouched(name, true);
  };

  const { register, field } = form.registerField(name, {
    value: props.value,
    defaultValue: props.defaultValue,
    rules: props.rules,
    transform: props.transform,
    immediate: false,
    onFocus: () => {
      elemRef.value?.focus?.();
    }
  });
  const value = computed(() => {
    return field.state.value;
  });

  onMounted(() => {
    register();
    mounted.value = true;
  });

  onUnmounted(() => {
    form.unregisterField(name);
    elemRef.value = null;
  });

  const res = reactive({
    value,
    onChange,
    onBlur,
    onFocus,
    ref: setRef
  });

  return [
    res,
    {
      state: field.state,
      form,
      mounted
    }
  ];
};
