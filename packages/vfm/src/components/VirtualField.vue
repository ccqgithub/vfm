<script lang="ts" setup>
import { PropType } from 'vue';
import { FormClass } from '../form';
import { VirtualFieldRule } from '../types';
import { UseVirtualFieldProps, useVirtualField } from '../uses';

const props = defineProps({
  form: {
    type: Object as PropType<FormClass>,
    default: undefined
  },
  name: {
    type: String,
    default: undefined,
    required: true as const
  },
  rules: {
    type: Array as PropType<VirtualFieldRule[]>,
    default: () => []
  }
});
const [state, { mounted }] = useVirtualField(props as UseVirtualFieldProps);
</script>

<template>
  <template v-if="mounted">
    <slot :state="state"></slot>
  </template>
</template>
