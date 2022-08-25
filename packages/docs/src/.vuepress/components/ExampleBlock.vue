<script lang="ts">
export default {
  name: 'ExampleBlock'
}
</script>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { BlockItem, BlockKey } from './ctx';

const active = ref('');
const blocks = ref<BlockItem[]>([]);
const addBlock = (args: { title: string; key: string; active?: boolean }) => {
  blocks.value.push({
    key: args.key,
    title: args.title
  })
  if (args.active) {
    active.value = args.key;
  }
};
const removeBlock = (key: string) => {
  const index = blocks.value.findIndex((v) => v.key === key);
  if (index !== -1) {
    blocks.value.splice(index, 1)
  }
}

provide(BlockKey, {
  addBlock,
  removeBlock,
  active
})
</script>

<template>
<div class="example-block">
  <div class="example-block__nav">
    <ul class="example-block__ul">
      <li class="example-block__li" v-for="item in blocks" :key="item.key">
        <button
          :class="{
            ['example-block__nav-tab']: true,
            ['example-block__nav-tab-active']: active === item.key
          }"
          @click="() => active = item.key"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
  </div>
  <slot />
</div>
</template>