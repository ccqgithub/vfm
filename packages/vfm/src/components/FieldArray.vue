<script setup lang="ts">
import { PropType } from 'vue';
import { Form } from '../form';
import { useFieldArray } from '../uses';

const props = defineProps({
  /**
   * The form instance that created by [createForm](../apis/#createform)
   */
  form: {
    type: Object as PropType<Form>,
    required: true
  },
  /**
   * The name of the array field.
   */
  name: {
    type: String,
    required: true
  }
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { fieldsValue, fields, ...rest } = useFieldArray(
  props.form,
  props.name as any
);
</script>

<template>
  <!--
    @slot Field default slot
    @binding fields see [FieldArrayScope](apis/#fieldarrayscope)
  -->
  <slot v-bind="rest" :fields="fields" />
</template>
