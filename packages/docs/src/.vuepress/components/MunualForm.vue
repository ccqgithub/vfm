<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { form } from './form';
import BaseInfo from './js/JSBaseInfo.vue';
import AdressList from './js/JSAdressList.vue'

form.registerField('username', {
  rules: [
    {
      required: true
    }
  ]
});

form.registerField('password', {
  rules: [
    {
      required: true,
      pattern: /[a-zA-Z0-9]{8,20}/
    }
  ]
});

form.registerField('passwordConfirm', {
  rules: [
    {
      required: true,
      pattern: /[a-zA-Z0-9]{8,20}/
    }, {
      validator: (v, _, { values }) => {
        if (!values.password) return '';
        if (v !== values.password) {
          return 'The passwordConfirm must same as password'
        }
        return ''
      }
    }
  ]
});

const formState = form.state;

// mounted or unmounted
onMounted(() => form.mount());
onBeforeUnmount(() => form.unmount());
</script>

<template>
  <div class="vfm">
    <!-- user name and password -->
    <div class="vfm-p">
      <div class="vfm-label">User Name:</div>
      <div class="vfm-value">
        <input
          class="vfm-input"
          type="text"
          :value="formState.values.username"
          @input="(e) => form.setValue('username', (e.target as HTMLInputElement).value)">
          <div class="vfm-error">
            {{ formState.fieldErrors.username?.message }}
          </div>
      </div>
    </div>
    <div class="vfm-block-title">Password</div>
    <div class="vfm-p">
      <div class="vfm-label">Password:</div>
      <div class="vfm-value">
        <input 
          class="vfm-input" 
          type="text" 
          :value="formState.values.password" 
          @input="(e) => form.setValue('password', (e.target as HTMLInputElement).value)">
          <div class="vfm-error">
            {{ formState.fieldErrors.password?.message }}
          </div>
      </div>
    </div>
    <div class="vfm-p">
      <div class="vfm-label">Password Confirm:</div>
      <div class="vfm-value">
        <input 
          class="vfm-input" 
          type="text" 
          :value="formState.values.passwordConfirm" 
          @input="(e) => form.setValue('passwordConfirm', (e.target as HTMLInputElement).value)">
          <div class="vfm-error">
            {{ formState.fieldErrors.passwordConfirm?.message }}
          </div>
      </div>
    </div>

    <!-- base info -->
    <BaseInfo></BaseInfo>

    <AdressList></AdressList>
  </div>
</template>
