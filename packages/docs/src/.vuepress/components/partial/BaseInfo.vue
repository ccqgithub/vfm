<!-- // nested fields -->
<!-- // 嵌套字段 -->

<script setup lang="ts">
import { Field, useForm } from 'vfm';
import { getForm } from '../form';

const form = useForm(getForm);
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
        value="1988"
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