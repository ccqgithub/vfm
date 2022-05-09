<script setup lang="ts">
import { form } from '../form';

form.registerField('baseInfo.birthDay', {
  rules: [
    {
      required: true
    }
  ]
});

form.registerField('baseInfo.age', {
  rules: [
    {
      required: true,
      integer: true
    }
  ]
})

const formState = form.state;
</script>

<template>
  <div class="vfm-block-title">Base Info</div>
  <div class="vfm-p">
    <div class="vfm-label">
      Birth Day:
    </div>
    <div class="vfm-value">
      <input 
        class="vfm-input" 
        type="text" 
        :value="formState.values.baseInfo?.birthDay" 
        @input="(e) => form.setValue('baseInfo.birthDay', (e.target as HTMLInputElement).value)">
        <div class="vfm-error">
          {{ formState.fieldErrors.baseInfo?.birthDay?.message }}
        </div>
    </div>
  </div>
  <div class="vfm-p">
    <div class="vfm-label">
      Age:
    </div>
    <div class="vfm-value">
      <input 
        class="vfm-input" 
        type="text" 
        :value="formState.values.baseInfo?.age" 
        @input="(e) => form.setValue('baseInfo.age', (e.target as HTMLInputElement).value as any)">
        <div class="vfm-error">
          {{ formState.fieldErrors.baseInfo?.age?.message }}
        </div>
    </div>
  </div>
</template>