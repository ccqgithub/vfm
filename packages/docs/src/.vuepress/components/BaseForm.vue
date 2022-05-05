<script setup lang="ts">
import { onMounted } from 'vue';
import { createForm, NestedValue } from 'vfm';

const form = createForm<{
  username: string;
  password: string;
  passwordConfirm: string;
  father: NestedValue<{
    username: string;
    age: number;
  }>;
  friends: {
    username: string;
    age: number;
  }[]
}>({
  defaultValues: {
    username: '',
    password: '',
    passwordConfirm: ''
  }
});

form.registerField('username', {
  value: '',
  rules: [
    {
      required: true
    }
  ]
});

const formState = form.state;

onMounted(() => form.mount());
</script>

<template>
  <div class="vfm">
    <div class="vfm-p">
      <div class="vfm-label">User Name:</div>
      <div class="vfm-value">
        <input 
          class="vfm-input" 
          type="text" 
          :value="formState.values.username" 
          @input="(e) => form.setValue('username', (e.target as HTMLInputElement).value)">
          <div class="vfm-error">
            {{ formState.errors.username?.message }}
          </div>
      </div>
    </div>
  </div>
</template>
