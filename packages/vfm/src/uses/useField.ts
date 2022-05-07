import {
  ref,
  Ref,
  unref,
  watch,
  toRaw,
  computed,
  reactive,
  onMounted,
  onUnmounted
} from 'vue';
import {
  FormType,
  FormState,
  FieldRule,
  FieldState,
  InputLikeRef,
  KeyPathValue
} from './../types';
import { FormClass } from '../form';

export type UseFieldProps<
  T extends FormType = FormType,
  N extends string = string
> = {
  form: FormClass<T>;
  name: Ref<N> | N;
  rules?:
    | Ref<FieldRule<KeyPathValue<T, N>, FormState<T>>[]>
    | FieldRule<KeyPathValue<T, N>, FormState<T>>[];
  value?: Ref<KeyPathValue<T, N>> | KeyPathValue<T, N>;
  defaultValue?: Ref<KeyPathValue<T, N>> | KeyPathValue<T, N>;
  touchType?: Ref<'FOCUS' | 'BLUR'> | ('FOCUS' | 'BLUR');
  transform?: (v: KeyPathValue<T, N>) => KeyPathValue<T, N>;
};

export type FieldElementProps<
  T extends FormType = FormType,
  N extends string = string
> = {
  value: KeyPathValue<T, N>;
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
    model: Ref<KeyPathValue<T, N>>;
    state: Ref<FieldState<KeyPathValue<T, N>>>;
    mounted: Ref<Boolean>;
  }
] => {
  const { form, name } = props;
  const touchType = computed(() => {
    if (props.touchType) return unref(props.touchType);
    return form.touchType || 'BLUR';
  });
  const mounted = ref(false);

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
    form.setValue(unref(name), value as KeyPathValue<T, N>);
  };
  const onBlur = () => {
    touchType.value === 'BLUR' && form.setTouched(unref(name), true);
  };
  const onFocus = () => {
    touchType.value === 'FOCUS' && form.setTouched(unref(name), true);
  };

  let { register, field } = form.registerField(unref(name), {
    value: unref(props.value),
    defaultValue: unref(props.defaultValue),
    rules: unref(props.rules),
    transform: props.transform,
    immediate: false,
    onFocus: () => {
      elemRef.value?.focus?.();
    }
  });
  const fieldState = ref(field.state);
  const stopWatch = watch(
    () => {
      return [unref(props.name), unref(props.rules)] as const;
    },
    ([n, rules], [ln]) => {
      form.unregisterField(ln);
      const fs = form.registerField(n, {
        value: unref(props.value),
        defaultValue: unref(props.defaultValue),
        rules,
        transform: props.transform,
        immediate: mounted.value,
        onFocus: () => {
          elemRef.value?.focus?.();
        }
      });
      register = fs.register;
      field = fs.field;
      fieldState.value = fs.field.state;
    }
  );

  // value ref for v-model
  const model = ref(fieldState.value.value) as Ref<KeyPathValue<T, N>>;
  // fieldState.value => model.value
  const stopWatchValue = watch(
    () => fieldState.value.value as KeyPathValue<T, N>,
    (v) => (model.value = v)
  );
  // model.value to fieldState.value
  const stopWatchModel = watch(
    () => model.value,
    (v) => {
      const value = fieldState.value.value;
      if (toRaw(value) !== toRaw(v)) {
        model.value = v;
      }
    }
  );

  onMounted(() => {
    register?.();
    mounted.value = true;
  });

  onUnmounted(() => {
    form.unregisterField(unref(name));
    stopWatch();
    stopWatchValue();
    stopWatchModel();
    elemRef.value = null;
  });

  const res = reactive({
    get value() {
      return model.value;
    },
    onChange,
    onBlur,
    onFocus,
    ref: setRef
  }) as FieldElementProps<T, N>;

  return [
    res,
    {
      model,
      state: fieldState,
      mounted
    }
  ];
};
