<script setup lang="ts">
import { PropType, provide, onMounted, onUnmounted } from 'vue';
import { Form } from '../form';
import { FormContextKey } from '../context';

const props = defineProps({
  /**
   * The form instance that created by [createForm](../apis/#createform)
   */
  form: {
    type: Object as PropType<Form>,
    required: true
  }
});

provide(FormContextKey, props.form);

onMounted(() => props.form.mount());
onUnmounted(() => props.form.unmount());
</script>

<template>
  <slot></slot>
</template>
