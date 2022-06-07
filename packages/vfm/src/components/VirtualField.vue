<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
import { Form } from '../form';
import { useVirtualField } from '../uses';
import { VirtualFieldRule } from '../types';

const props = defineProps({
  form: {
    type: Object as PropType<Form>,
    required: true
  },
  name: {
    type: String as PropType<string>,
    required: true
  },
  value: {
    type: Function as PropType<() => any>,
    required: true
  },
  rules: {
    type: Array as PropType<VirtualFieldRule[]>,
    default: () => []
  },
  debounce: {
    type: Number,
    default: undefined
  }
});
const { name, form, value, rules, debounce } = toRefs(props);
const { mounted } = useVirtualField({
  form: form.value,
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
