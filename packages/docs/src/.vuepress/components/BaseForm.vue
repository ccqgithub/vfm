<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { Field, VirtualField } from 'vfm';
import type { FieldProps } from 'vfm';
import { form } from './form';
import BaseInfo from './partial/BaseInfo.vue';
import AddressList from './partial/AddressList.vue';

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
        <Field
          :form="form"
          name="username"
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
          #default="{ field }"
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
          #default="{ field }"
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

    <!-- base info -->
    <BaseInfo />

    <!-- address -->
    <AddressList />

    <div class="vfm-p">
      <button class="vfm-button">Submit</button>
    </div>
  </div>
</template>
