<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
import { Form } from '../form';
import { useVirtualField } from '../uses';
import { VirtualFieldRule } from '../types';

const props = defineProps({
  /**
   * The form instance that created by [createForm](../apis/#createform)
   */
  form: {
    type: Object as PropType<Form>,
    default: undefined
  },
  /**
   * The field name
   */
  name: {
    type: String as PropType<string>,
    required: true
  },
  /**
   * Function that generate value to validate, run in `watchEffect`, so if return value change, the field will revalidate.
   * *Tips:* Do not visit form's error state in the function, because the validate will change error state, it will causes an infinite loop of calls.
   */
  value: {
    type: Function as PropType<() => any>,
    required: true
  },
  /**
   * [VirtualFieldRule](../apis/#virtualfieldrule) list
   * *Tips:* Do not visit form's error state in the `validator` function, because the validate will change error state, it will causes an infinite loop of calls.
   */
  rules: {
    type: Array as PropType<VirtualFieldRule[]>,
    default: () => []
  },
  /**
   * Field validate debounce time, millseconds.
   */
  debounce: {
    type: Number,
    default: undefined
  }
});
const { name, form, value, rules, debounce } = toRefs(props);
const { mounted } = useVirtualField({
  form: form?.value,
  rules: rules.value,
  value: value.value,
  debounce: debounce?.value,
  name
});
</script>

<template>
  <template v-if="mounted">
    <slot />
  </template>
</template>
