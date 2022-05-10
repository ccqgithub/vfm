<script setup lang="ts">
import { PropType } from 'vue';
import { FormClass } from '../form';
import { useFieldArray } from '../uses';

const props = defineProps({
  form: {
    type: Object as PropType<FormClass>,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { fieldsValue, ...rest } = useFieldArray(props.form, props.name as any);
</script>

<template>
  <slot v-bind="rest" />
</template>
