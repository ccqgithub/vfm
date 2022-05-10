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
  InputLikeRef,
  KeyPathValue,
  FieldPath,
  FieldProps
} from './../types';
import { FormClass } from '../form';
import { getKeyValue } from './../untils';

export type UseFieldProps<
  T extends FormType = FormType,
  N extends FieldPath<T> = FieldPath<T>,
  Deps = any
> = {
  form: FormClass<T>;
  name: Ref<N> | N;
  rules?:
    | Ref<FieldRule<KeyPathValue<T, N>, FormState<T>>[]>
    | FieldRule<KeyPathValue<T, N>, FormState<T>>[];
  touchType?: Ref<'FOCUS' | 'BLUR'> | ('FOCUS' | 'BLUR');
  transform?: (v: KeyPathValue<T, N>) => KeyPathValue<T, N>;
  isEqual?: (v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean;
  deps?: () => Deps;
};

export const useField = <T extends FormType, N extends FieldPath<T>>(
  props: UseFieldProps<T, N>
): [
  FieldProps<T, N>,
  Ref<KeyPathValue<T, N>>,
  {
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
    form.setValue(unref(name) as any, value as KeyPathValue<T, N>);
  };
  const onBlur = () => {
    touchType.value === 'BLUR' && form.setTouched(unref(name) as any, true);
  };
  const onFocus = () => {
    touchType.value === 'FOCUS' && form.setTouched(unref(name) as any, true);
  };

  let { register, field } = form.registerField(unref(name) as any, {
    rules: unref(props.rules),
    transform: props.transform,
    deps: props.deps,
    immediate: false,
    onFocus: () => {
      (elemRef.value as any)?.focus?.();
    }
  });
  // value ref for v-model
  const model = ref(getKeyValue(form.state.values, unref(props.name))) as Ref<
    KeyPathValue<T, N>
  >;
  const fieldState = ref(field.state);
  const stopWatch = watch(
    () => {
      return [unref(props.name), unref(props.rules)] as const;
    },
    ([n, rules], [ln]) => {
      form.unregisterField(ln);
      const fs = form.registerField(n, {
        rules,
        transform: props.transform,
        deps: props.deps,
        isEqual: props.isEqual,
        immediate: mounted.value,
        onFocus: () => {
          (elemRef.value as any)?.focus?.();
        }
      });
      register = fs.register;
      field = fs.field;
      fieldState.value = fs.field.state as any;
      model.value = getKeyValue(form.state.values, unref(props.name));
    }
  );

  // fieldState.value => model.value
  const stopWatchValue = watch(
    () => getKeyValue(form.state.values, unref(props.name)),
    (v) => {
      model.value = v;
    }
  );
  // model.value to fieldState.value
  const stopWatchModel = watch(
    () => model.value,
    (v) => {
      const value = getKeyValue(form.state.values, unref(props.name));
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
  }) as FieldProps<T, N>;

  return [
    res,
    model,
    {
      mounted
    }
  ];
};
