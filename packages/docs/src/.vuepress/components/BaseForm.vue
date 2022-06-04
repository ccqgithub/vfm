<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { Field, VirtualField, FieldArray } from 'vfm';
// vue now not support slot props types, manual set in template
import type { FieldScope, FieldArrayScope } from 'vfm';
import { form } from './form';
import BaseInfo from './partial/BaseInfo.vue';
import AddressList from './partial/AddressList.vue';
import SchoolList from './partial/SchoolList.vue';

const formState = form.state;
const submit = () => {
  form.submit({
    onSuccess: (data) => {
      alert(JSON.stringify(data, null, 2));
    },
    onError: (err) => {
      alert(err.message);
    }
  })
}

// mounted form
onMounted(() => {
  form.mount();
});

// unmount form
onBeforeUnmount(() => {
  form.unmount();
});
</script>

<template>
  <div class="vfm">
    <!-- // base fields -->
    <!-- // 基础字段 -->
    <div class="vfm-p">
      <div class="vfm-label">User Name:</div>
      <div class="vfm-value">
        <Field
          :form="form"
          name="username"
          :rules="[
            {
              required: true
            }
          ]"
          #default="{ field }: FieldScope"
        >
          <input
            class="vfm-input"
            type="text"
            v-bind="field"
          />
          <div class="vfm-error">
            {{ form.fieldError('username')?.message }}
          </div>
        </Field>
      </div>
    </div>
    <div class="vfm-p">
      <div class="vfm-label">Password:</div>
      <div class="vfm-value">
        <Field
          :form="form"
          name="password"
          :rules="[
            {
              required: true,
              pattern: /[a-zA-Z0-9]{8,20}/
            }
          ]"
          #default="{ field }: FieldScope"
        >
          <input
            class="vfm-input"
            type="password"
            v-bind="field"
          />
          <div class="vfm-error">
            {{ form.fieldError('password')?.message }}
          </div>
        </Field>
      </div>
    </div>
    <div class="vfm-p">
      <div class="vfm-label">Password Confirm:</div>
      <div class="vfm-value">
        <Field
          :form="form"
          name="passwordConfirm"
          :deps="() => ({
            password: formState.values.password
          })"
          :rules="[
            {
              required: true,
              pattern: /[a-zA-Z0-9]{8,20}/
            }, {
              validator: (v, { password }) => {
                if (!password) return '';
                if (v !== password) {
                  return 'The passwordConfirm must same as password'
                }
                return ''
              }
            }
          ]"
          #default="{ field }: FieldScope"
        >
          <input
            class="vfm-input"
            type="password"
            v-bind="field"
          />
          <div class="vfm-error">
            {{ form.fieldError('passwordConfirm')?.message }}
          </div>
        </Field>
      </div>
    </div>

    <!-- // nested fields -->
    <!-- // 嵌套字段 -->
    <BaseInfo />

    <!-- array fields -->
    <!-- 数组字段 -->
    <div class="vfm-p">
      <div class="vfm-label">Tags:</div>
      <div class="vfm-value">
        <FieldArray :form="form" name="tags" #default="{ append, remove, fields }: FieldArrayScope<string>">
          <div class="vfm-flex">
            <div class="vfm-flex-item" v-for="(item, index) in fields" :key="item.id">
              <div class="vfm-flex-item-box">
                <div class="vfm-flex-item-ins">
                  <Field
                    :form="form"
                    :name="`tags.${index}`"
                    :rules="[
                      {
                        required: true,
                        message: 'Required'
                      }
                    ]"
                    #default="{ field }: FieldScope"
                  >
                    <input
                      class="vfm-input"
                      type="text"
                      v-bind="field"
                    />
                  </Field>
                </div>
                <div class="vfm-action red" @click="remove(item.id)">-</div>
              </div>
              <div class="vfm-error">
                {{ form.fieldError(`tags.${index}`)?.message }}
              </div>
            </div>
          </div>
          <div class="vfm-action" @click="append('')">+</div>
        </FieldArray>
      </div>
    </div>

    <!-- virtual fields: only validate with form state, no field value -->
    <!-- 虚拟字段: 值根据表单状态进行校验，没有字段值 -->
    <div class="vfm-p">
      <VirtualField
        :form="form"
        name="tags"
        :value="() => {
          // visit length, so tags.length change, revalidate
          form.state.values.tags.length;
          return form.state.values.tags
        }"
        :rules="[
          {
            requiredLength: true,
            message: 'must have one tag'
          }
        ]"
      />
      <div class="vfm-label">Virtual Field (Tags):</div>
      <div class="vfm-error">
        {{ form.virtualFieldError('tags')?.message }}
      </div>
    </div>

    <!-- // nested array fields -->
    <!-- // 嵌套的数组字段 -->
    <AddressList />

    <!-- // object value -->
    <!-- // object类型的值 -->
    <!-- // the NestedValue<xxx> will be treat as the `value` type of field `schools`, not nested fields -->
    <!-- // NestedValue<xxx> 被当做字段`schools`的值，而不是嵌套的字段 -->
    <SchoolList />

    <div class="vfm-p">
      <button class="vfm-button" @click="submit">Submit</button>
    </div>
  </div>
</template>
