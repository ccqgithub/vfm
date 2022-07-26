import {
  ref,
  Ref,
  unref,
  watch,
  toRaw,
  computed,
  reactive,
  onMounted,
  onBeforeUnmount
} from 'vue';
import {
  FormType,
  FieldRule,
  InputLikeRef,
  KeyPathValue,
  FieldPath,
  FieldProps
} from './../types';
import { Form } from '../form';
import { getKeyValue } from './../untils';
import { useForm } from './useForm';

export type UseFieldProps<
  T extends FormType = FormType,
  N extends FieldPath<T> = FieldPath<T>,
  Deps = any,
  Transform = KeyPathValue<T, N>
> = {
  form?: Form<T>;
  name: Ref<N> | N;
  rules?: Ref<FieldRule<Transform, Deps>[]> | FieldRule<Transform, Deps>[];
  touchType?: Ref<'FOCUS' | 'BLUR'> | ('FOCUS' | 'BLUR');
  transform?: (v: KeyPathValue<T, N>) => Transform;
  isEqual?: (v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean;
  deps?: () => Deps;
  debounce?: number;
  changeType?: 'ONINPUT' | 'ONCHANGE';
  value?: KeyPathValue<T, N>;
  defaultValue?: KeyPathValue<T, N>;
};

/**
 * @category Use
 */
export const useField = <
  T extends FormType,
  N extends FieldPath<T>,
  Deps = any,
  Transform = KeyPathValue<T, N>
>(
  props: UseFieldProps<T, N, Deps, Transform>
): [
  FieldProps<T, N>,
  Ref<KeyPathValue<T, N>>,
  {
    mounted: Ref<Boolean>;
  }
] => {
  const injectForm = useForm() as Form<T> | null;
  const { form = injectForm, name } = props;

  if (!form) {
    throw new Error('No provided form!');
  }

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
    if (!mounted.value) return;
    touchType.value === 'BLUR' && form.setTouched(unref(name) as any, true);
  };
  const onFocus = () => {
    if (!mounted.value) return;
    touchType.value === 'FOCUS' && form.setTouched(unref(name) as any, true);
  };

  let { register, field } = form.registerField(unref(name) as any, {
    rules: unref(props.rules),
    transform: props.transform,
    deps: props.deps,
    immediate: false,
    onFocus: () => {
      (elemRef.value as any)?.focus?.();
    },
    debounce: props.debounce,
    value: props.value,
    defaultValue: props.defaultValue
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
        },
        debounce: props.debounce,
        value: props.value,
        defaultValue: props.defaultValue
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

  onBeforeUnmount(() => {
    mounted.value = false;
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
    onInput: onChange,
    onChange: onChange,
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
