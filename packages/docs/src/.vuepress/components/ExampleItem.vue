<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue'
import { BlockKey, getKey } from './ctx';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  }
});

const key = getKey();
const ctx = inject(BlockKey)!;

onMounted(() => {
  ctx.addBlock({ title: props.title, active: props.active, key });
});

onUnmounted(() => {
  ctx.removeBlock(key);
});
</script>

<template>
  <div
    class="example-item"
    :class="{ 'example-item__active': ctx.active.value === key}"
    :aria-selected="active"
  >
    <slot />
  </div>
</template>