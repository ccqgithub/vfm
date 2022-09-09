<script setup lang="ts">
import { PropType } from 'vue';
import { useProvideForm } from '../uses';
import { Form } from '../form';

const props = defineProps({
  /**
   * The form instance that created by [createForm](../apis/#createform)
   */
  form: {
    type: Object as PropType<Form>,
    required: true
  }
});

useProvideForm(props.form);
</script>

<template>
  <slot></slot>
</template>
