<script lang="ts" setup>
import { PropType, toRefs } from 'vue';
import { useField } from '../uses';
import { Form } from '../form';
import { FieldRule } from '../types';
import { AllPropType } from '../untils';

const props = defineProps({
  form: {
    type: Object as PropType<Form>,
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
  deps: {
    type: Function as PropType<() => any>,
    default: undefined
  },
  debounce: {
    type: Number,
    default: undefined
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
  },
  changeType: {
    type: String as PropType<'ONINPUT' | 'ONCHANGE'>,
    default: 'ONCHANGE'
  },
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
    <slot :field="slotProps"></slot>
  </template>
</template>
