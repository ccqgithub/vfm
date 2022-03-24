<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { provide } from 'vue';
import { FormClass } from '../form';
import { vfmInjectionKey } from '../context';

const props = defineProps<{ form: FormClass }>();
provide(vfmInjectionKey, props.form);
</script>
