<script lang="ts" setup>
import { PropType } from 'vue';
import { FormClass } from '../form';
import { FieldRule } from '../types';
import { useField } from '../uses';

const props = defineProps({
  form: {
    type: Object as PropType<FormClass>,
    default: undefined
  },
  name: {
    type: String,
    required: true as const,
    default: ''
  },
  rules: {
    type: Array as PropType<FieldRule[]>,
    default: () => []
  },
  value: {
    type: [String, Number, Boolean, Array, Object, Symbol],
    default: undefined
  },
  defaultValue: {
    type: [String, Number, Boolean, Array, Object, Symbol],
    default: undefined
  },
  transform: {
    type: Function as PropType<(v: any) => any>,
    default: undefined
  },
  touchType: {
    type: String as PropType<'FOCUS' | 'BLUR'>,
    default: 'BLUR'
  }
});
const [slotProps, { mounted, state }] = useField(props);
</script>

<template>
  <template v-if="mounted">
    <slot :field="slotProps" :state="state!"></slot>
  </template>
</template>
