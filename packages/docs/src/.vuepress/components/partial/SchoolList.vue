<!-- // object value -->
<!-- // object类型的值 -->
<!-- // the NestedValue<xxx> will be treat as the `value` type of field `schools`, not nested fields -->
<!-- // NestedValue<xxx> 被当做字段`schools`的值，而不是嵌套的字段 -->

<script setup lang="ts">
import { ref } from 'vue';
import { Field, useForm } from 'vfm';
import { getForm } from '../form';
import SelectSchool from './SelectSchool.vue';

const form = useForm(getForm);
const values = form.getPathValueRef('schools');

const visible = ref(false);
const showSelectSchool = () => {
  visible.value = true;
};
</script>

<template>
  <div class="box">
    <Field
      :form="form"
      name="schools"
      :rules="[
        {
          requiredLength: true,
          message: 'Must select one school'
        }
      ]"
      #default="{ field }"
    >
      <div class="vfm-block-title">Schools</div>
      <div class="vfm-p">
        <div class="vfm-label">
          Selected Schools:
        </div>
        <div class="vfm-value">
          <div  v-show="!visible" class="vfm-input" @click="showSelectSchool">
            {{ values.map((v) => v.name).join(',') }}
          </div>
          <div  v-show="!visible" class="vfm-error">
            {{ form.fieldError('schools')?.message }}
          </div>
          <!-- select schools -->
          <SelectSchool v-bind="field" v-model:visible="visible" v-if="visible" />
        </div>
      </div>
    </Field>
  </div>
</template>

<style scoped>
.box {
  position: relative;
}

.sel {
  height: 180px;
}

.sel option {
  line-height: 30px;
  height: 30px;
}
</style>