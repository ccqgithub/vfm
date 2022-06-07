<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
import { useField } from '../uses';
import { Form } from '../form';
import { FieldRule } from '../types';
import { AllPropType } from '../untils';

const props = defineProps({
  /**
   * The form instance that created by [createForm](../apis/#createform)
   */
  form: {
    type: Object as PropType<Form>,
    required: true
  },
  /**
   * Field name
   */
  name: {
    type: String as PropType<string>,
    required: true
  },
  /**
   * [FieldRule](../apis/#fieldrule) list
   * *Tips:* Do not visit form's error state in the `validator` function, because the validate will change error state, it will causes an infinite loop of calls.
   */
  rules: {
    type: Array as PropType<FieldRule[]>,
    default: () => []
  },
  /**
   * Function to generate dependent value. It run in `watchEffect`, so if the return value change, the field will `revalidate`.
   * *Tips:* Do not visit form's error state in the function, because the validate will change error state, it will causes an infinite loop of calls.
   */
  deps: {
    type: Function as PropType<() => any>,
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
    type: AllPropType as PropType<any>,
    default: undefined
  },
  /**
   * The default value of the field, used to determine whether field is dirty and reset field. it will override the `initValues` of `createForm`.
   */
  defaultValue: {
    type: AllPropType as PropType<any>,
    default: undefined
  },
  /**
   * Transform value before pass to validate.
   */
  transform: {
    type: Function as PropType<(v: any) => any>,
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
    type: Function as PropType<(v: any) => any>,
    default: undefined
  }
});

const {
  form,
  rules,
  transform,
  name,
  deps,
  debounce,
  changeType,
  value,
  defaultValue,
  isEqual,
  ...rest
} = toRefs(props);
const [slotProps, , { mounted }] = useField({
  form: form.value,
  rules: rules.value,
  transform: transform?.value,
  deps: deps?.value,
  debounce: debounce?.value,
  name: name as any,
  changeType: changeType.value,
  value: value?.value,
  defaultValue: defaultValue?.value,
  isEqual: isEqual?.value,
  ...rest
});
</script>

<template>
  <template v-if="mounted">
    <!--
      @slot Field default slot
      @binding field see [FieldScope](../apis/#fieldscope)
    -->
    <slot :field="slotProps"></slot>
  </template>
</template>
