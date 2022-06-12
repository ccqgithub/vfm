<script lang="ts" setup>
import { toRefs } from 'vue';
import { useField } from '../../uses';
import { getProps } from './props';

const props = defineProps(getProps());
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
  form: form?.value,
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
