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
const slotProps = useField(props as UseFieldProps);
</script>

<template>
  <slot v-bind="slotProps"></slot>
</template>
