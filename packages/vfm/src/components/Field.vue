<script lang="ts" setup>
import { FormClass } from '../form';
import { FieldRule } from '../types';
import { UseFieldProps, useField } from '../uses';

interface UseFieldPropsDefine {
  form?: FormClass;
  name: string;
  rules?: FieldRule[];
  value?: any;
  defaultValue?: any;
}

const props = defineProps<UseFieldPropsDefine>();
const [slotProps, state] = useField(props as UseFieldProps);
</script>

<template>
  <template v-if="state">
    <slot :field="slotProps" :state="state"></slot>
  </template>
</template>
