<script setup lang="ts">
import { onUnmounted, computed, watchEffect } from 'vue';
import { form } from '../form';

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
});
const emit = defineEmits<{
  (e: 'delete', v: number): void;
}>();
const index = computed(() => props.index);

// if index change, register again
watchEffect(() => {
  form.registerField(`address.${index.value}.phone`, {
    rules: [
      {
        required: true,
        minLength: 4,
        maxLength: 20
      }
    ]
  });

  form.registerField(`address.${index.value}.detail`, {
    rules: [
      {
        required: true,
        integer: true,
        min: 1,
        max: 100
      }
    ]
  })

  return () => {
    form.unregisterField(`address.${index.value}.phone`);
    form.unregisterField(`address.${index.value}.detail`);
  }
});

// unregister when onMounted
onUnmounted(() => {
  form.unregisterField(`address.${index.value}.phone`);
  form.unregisterField(`address.${index.value}.detail`);
});

const formState = form.state;
const isMounted = computed(() => {
  return formState.values.address?.[index.value] !== undefined;
});
</script>

<template>
  <div class="block" v-if="isMounted">
    <div class="vfm-p">
      <div class="vfm-label">
        Phone:
      </div>
      <div class="vfm-value">
        <input 
          class="vfm-input" 
          type="text" 
          :value="formState.values.address?.[index]?.phone" 
          @input="(e) => form.setValue(`address.${index}.phone`, (e.target as HTMLInputElement).value)">
          <div class="vfm-error">
            {{ formState.fieldErrors.address?.[index].phone?.message }}
          </div>
      </div>
    </div>
    <div class="vfm-p">
      <div class="vfm-label">
        Detail:
      </div>
      <div class="vfm-value">
        <input 
          class="vfm-input" 
          type="text" 
          :value="formState.values.address?.[index]?.detail"
          @input="(e) => form.setValue(`address.${index}.detail`, (e.target as HTMLInputElement).value)">
          <div class="vfm-error">
            {{ formState.fieldErrors.address?.[index].detail?.message }}
          </div>
      </div>
    </div>
    <div class="vfm-p">
      <div class="vfm-action" @click="() => emit('delete', index)">delete</div>
    </div>
  </div>
</template>

<style scoped>
.block {
  border: 1px dashed #ddd;
  padding: 20px;
  margin-bottom: 20px;
}
</style>