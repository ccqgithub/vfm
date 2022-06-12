import { PropType } from 'vue';
import { Form } from '../../form';
import { AllPropType } from '../../untils';
import { FieldRule, FormType, FieldPath, KeyPathValue } from '../../types';

export const getProps = <
  T extends FormType = FormType,
  N extends FieldPath<T> = FieldPath<T>,
  Deps = any,
  Transform = KeyPathValue<T, N>
>() => ({
  /**
   * The form instance that created by [createForm](../apis/#createform)
   */
  form: {
    type: Object as PropType<Form<T>>,
    default: undefined
  },
  /**
   * Field name
   */
  name: {
    type: String as any as PropType<FieldPath<T, N>>,
    required: true
  },
  /**
   * [FieldRule](../apis/#fieldrule) list
   * *Tips:* Do not visit form's error state in the `validator` function, because the validate will change error state, it will causes an infinite loop of calls.
   */
  rules: {
    type: Array as PropType<FieldRule<Transform, Deps>[]>,
    default: () => []
  },
  /**
   * Function to generate dependent value. It run in `watchEffect`, so if the return value change, the field will `revalidate`.
   * *Tips:* Do not visit form's error state in the function, because the validate will change error state, it will causes an infinite loop of calls.
   */
  deps: {
    type: Function as PropType<() => Deps>,
    default: undefined
  },
  /**
   * Field validate debounce time, millseconds.
   */
  debounce: {
    type: Number,
    default: undefined
  },
  /**
   * The initial value of the field, it will override the `initValues` of `createForm`.
   */
  value: {
    type: AllPropType as PropType<KeyPathValue<T, N>>,
    default: undefined
  },
  /**
   * The default value of the field, used to determine whether field is dirty and reset field. it will override the `initValues` of `createForm`.
   */
  defaultValue: {
    type: AllPropType as PropType<KeyPathValue<T, N>>,
    default: undefined
  },
  /**
   * Transform value before pass to validate.
   */
  transform: {
    type: Function as PropType<(v: KeyPathValue<T, N>) => Transform>,
    default: undefined
  },
  /**
   * When to mark the field is `touched`, default is 'BLUR', means that the field will be `touched` after bulur event.
   */
  touchType: {
    type: String as PropType<'FOCUS' | 'BLUR'>,
    default: 'BLUR'
  },
  /**
   * When to change the field value, default is 'ONCHANGE', means that the field will setValue when input really event.
   */
  changeType: {
    type: String as PropType<'ONINPUT' | 'ONCHANGE'>,
    default: 'ONCHANGE'
  },
  /**
   * Compare value and defaultValue, checkout them wether is append.
   */
  isEqual: {
    type: Function as PropType<
      (v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean
    >,
    default: undefined
  }
});
