<!-- // nested array fields -->
<!-- // 嵌套的数组字段 -->

<script setup lang="ts">
import { useFieldArray, Field } from 'vfm';
import { form } from '../form';

const { fields, append, remove } = useFieldArray({
  form, path: 'address'
});
const add = () => {
  append({
    phone: '',
    detail: ''
  });
};
const del = (id: string) => {
  remove(id);
};
</script>

<template>
  <div class="vfm-block-title">Address</div>
  <div class="block" v-for="(item, index) in fields" :key="item.id">
    <div class="vfm-p">
      <div class="vfm-label">
        Phone:
      </div>
      <div class="vfm-value">
        <Field
          :form="form"
          :name="`address.${index}.phone`"
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
          {{ form.fieldError(`address.${index}.phone`)?.message }}
        </div>
      </div>
    </div>
    <div class="vfm-p">
      <div class="vfm-label">
        Detail:
      </div>
      <div class="vfm-value">
        <Field
          :form="form"
          :name="`address.${index}.detail`"
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
          {{ form.fieldError(`address.${index}.detail`)?.message }}
        </div>
      </div>
    </div>
    <div class="vfm-p">
      <div class="vfm-action red" @click="() => del(item.id)">- delete</div>
    </div>
  </div>
  <div class="vfm-p">
    <div class="vfm-action" @click="() => add()">+ Add Address</div>
  </div>
</template>

<style scoped>
.block {
  border: 1px dashed #ddd;
  padding: 20px;
  margin-bottom: 20px;
}
</style>