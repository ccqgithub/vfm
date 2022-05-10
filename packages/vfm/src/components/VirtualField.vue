<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
import { FormClass } from '../form';
import { useVirtualField } from '../uses';
import { VirtualFieldRule } from '../types';

const props = defineProps({
  form: {
    type: Object as PropType<FormClass>,
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
  }
});
const { name, form, value, rules } = toRefs(props);
const { mounted } = useVirtualField({
  form: form.value,
  rules: rules.value,
  value: value.value,
  name
});
</script>

<template>
  <template v-if="mounted">
    <slot />
  </template>
</template>
