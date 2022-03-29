<script lang="ts" setup>
import { FormClass } from '../form';
import { VirtualFieldRule } from '../types';
import { UseVirtualFieldProps, useVirtualField } from '../uses';

interface UseVirtualFieldPropsDefine {
  form?: FormClass;
  name: string;
  rules?: VirtualFieldRule[];
}

const props = defineProps<UseVirtualFieldPropsDefine>();
const [state] = useVirtualField(props as UseVirtualFieldProps);
</script>

<template>
  <template v-if="state">
    <slot :state="state"></slot>
  </template>
</template>
