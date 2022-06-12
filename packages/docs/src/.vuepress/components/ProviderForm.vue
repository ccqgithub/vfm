<script setup lang="ts">
import { FormProvider, Field, createForm } from 'vfm';

const form = createForm<{
  username: string,
  password: string
}>({
  initValues: {
    username: '',
    password: ''
  }
});
</script>

<template>
  <FormProvider :form="form">
    <form class="vfm">
      <div class="vfm-p">
        <Field name="username" :rules="[{ required: true }]" #default="{ field }">
          <input type="text" v-bind="field" placeholder="please input username">
        </Field>
      </div>
      <div class="vfm-p">
        <span class="vfm-error">
          {{ form.fieldError('username')?.message }}
        </span>
      </div>
    </form>
  </FormProvider>
</template>