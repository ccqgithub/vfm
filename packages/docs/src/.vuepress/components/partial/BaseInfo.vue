<script setup lang="ts">
import { Field } from 'vfm';
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
      <Field
        :form="form"
        name="baseInfo.birthDay"
        :rules="[
          {
            required: true
          }
        ]"
        #default="{ field }"
      >
        <input
          class="vfm-input"
          type="text"
          v-bind="field"
        />
      </Field>
      <div class="vfm-error">
        {{ form.fieldError('baseInfo.birthDay')?.message }}
      </div>
    </div>
  </div>
  <div class="vfm-p">
    <div class="vfm-label">
      Age:
    </div>
    <div class="vfm-value">
      <Field
        :form="form"
        name="baseInfo.age"
        :rules="[
          {
            required: true
          }
        ]"
        #default="{ field }"
      >
        <input
          class="vfm-input"
          type="text"
          v-bind="field"
        />
      </Field>
      <div class="vfm-error">
        {{ form.fieldError('baseInfo.age')?.message }}
      </div>
    </div>
  </div>
</template>