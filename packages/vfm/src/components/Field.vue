<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
import { useField } from '../uses';
import { FormClass } from '../form';
import { FieldRule } from '../types';
import { AllPropType } from '../untils';

const props = defineProps({
  form: {
    type: Object as PropType<FormClass>,
    required: true
  },
  name: {
    type: String as PropType<string>,
    required: true
  },
  rules: {
    type: Array as PropType<FieldRule[]>,
    default: () => []
  },
  value: {
    type: AllPropType as PropType<any>,
    default: undefined
  },
  defaultValue: {
    type: AllPropType as PropType<any>,
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

const { form, rules, transform, name, ...rest } = toRefs(props);
const [slotProps, , { mounted }] = useField({
  form: form.value,
  rules: rules.value,
  transform: transform?.value,
  name: name as any,
  ...rest
});
</script>

<template>
  <template v-if="mounted">
    <slot :field="slotProps"></slot>
  </template>
</template>
