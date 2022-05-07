<script lang="ts" setup>
import { PropType, Ref } from 'vue';
import { FormClass } from '../form';
import { useVirtualField } from '../uses';
import { VirtualFieldRule } from '../types';

const props = defineProps({
  form: {
    type: Object as PropType<FormClass>,
    required: true
  },
  name: {
    type: [String, Object] as PropType<string | Ref<string>>,
    required: true
  },
  rules: {
    type: Array as PropType<VirtualFieldRule[] | Ref<VirtualFieldRule[]>>,
    default: () => []
  }
});
const { state, mounted } = useVirtualField(props);
</script>

<template>
  <template v-if="mounted">
    <slot :state="state"></slot>
  </template>
</template>
