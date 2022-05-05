<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ExampleItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
})
</script>

<template>
  <div
    class="example-item"
    :class="{ 'example-item__active': active }"
    :aria-selected="active"
  >
    <slot />
  </div>
</template>