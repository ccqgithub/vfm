import { onUnmounted, onMounted } from 'vue';
import { FieldState } from './../types';
import { computed, reactive, ref } from 'vue';
import { getKeyValue } from '../untils';
import { Form } from '../form';
import {
  FieldRule,
  KeyPathValue,
  FieldError,
  FormState,
  ValidateFunc,
  FormType,
  InputLikeRef
} from '../types';
import { validators } from '../validators';

const validateRule = async (rule: FieldRule, v: any, f: FormState) => {
  // required
  if (rule.required) {
    if (!v) '{{name}} is required';
  }
  // requiredLength
  if (rule.requiredLength) {
    if (typeof v?.length !== 'number' || v.length <= 0) {
      return '{{name}} is required';
    }
  }
  // minLength
  if (rule.minLength !== undefined) {
    if (typeof v?.length !== 'number' || v.length < rule.minLength) {
      return `{{name}}'s length cannot be less than ${rule.minLength}`;
    }
  }
  // maxLength
  if (rule.maxLength !== undefined) {
    if (typeof v?.length !== 'number' || v.length > rule.maxLength) {
      return `{{name}}'s length cannot be greater than ${rule.maxLength}`;
    }
  }
  // min
  if (rule.min !== undefined) {
    if (typeof v !== 'number' || v < rule.min) {
      return `{{name}} cannot be less than ${rule.min}`;
    }
  }
  // max
  if (rule.max !== undefined) {
    if (typeof v !== 'number' || v > rule.max) {
      return `{{name}} cannot be greater than ${rule.max}`;
    }
  }
  // pattern
  if (rule.pattern) {
    if (typeof v !== 'string' || !rule.pattern.test(v)) {
      return `{{name}} not match ${rule.pattern.toString()}`;
    }
  }
  // validators
  for (let vld of rule.validators || []) {
    if (typeof vld === 'string') {
      vld = validators[vld as keyof typeof validators];
    }
    if (!vld) {
      console.warn(`validator ${vld} is not registered`);
    } else {
      const msg = await vld(v, f);
      if (msg) return msg;
    }
  }
  // no error
  return '';
};

export const useField = <T extends FormType, N extends string>(props: {
  form: Form<T>;
  name: N;
  rules?: FieldRule[];
  value?: KeyPathValue<T, N>;
  defaultValue?: KeyPathValue<T, N>;
}) => {
  const { form, name, rules = [] } = props;
  const validate: ValidateFunc<KeyPathValue<T, N>, FormState<T>> = async (
    v,
    fs
  ) => {
    let error: FieldError | null = null;
    for (const rule of rules) {
      const errMsg = await validateRule(rule, v, fs);
      if (errMsg) {
        error = {
          type: rule.type,
          message: errMsg
        };
        return error;
      }
    }
    return null;
  };
  const { register } = form.registerField(name, {
    value: props.value,
    defaultValue: props.defaultValue,
    validate,
    immediate: false
  });
  const state = computed(() => {
    return getKeyValue(form.fieldStates, name) as FieldState<
      KeyPathValue<T, N>
    >;
  });
  const value = computed(() => state.value);
  const onChange = (v: KeyPathValue<T, N>) => {
    form.setValue(name, v);
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
    state,
    value,
    onChange,
    onBlur,
    setRef
  });
  return res;
};
