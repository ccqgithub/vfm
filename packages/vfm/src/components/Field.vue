<script lang="ts" setup>
import { PropType, Ref } from 'vue';
import { FormClass } from '../form';
import { FieldRule } from '../types';
import { useField } from '../uses';
import { AllPropType } from '../untils';

const props = defineProps({
  form: {
    type: Object as PropType<FormClass>,
    required: true
  },
  name: {
    type: [String, Object] as PropType<string | Ref<string>>,
    required: true as const,
    default: ''
  },
  rules: {
    type: Array as PropType<FieldRule[] | Ref<FieldRule[]>>,
    default: () => []
  },
  value: {
    type: AllPropType as PropType<any | Ref<any>>,
    default: undefined
  },
  defaultValue: {
    type: AllPropType as PropType<any | Ref<any>>,
    default: undefined
  },
  transform: {
    type: Function as PropType<(v: any) => any>,
    default: undefined
  },
  touchType: {
    type: String as PropType<'FOCUS' | 'BLUR' | Ref<'FOCUS' | 'BLUR'>>,
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
