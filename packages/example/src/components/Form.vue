<script setup lang="ts">
import { computed, toRaw } from 'vue';
import form from './form';

const formState = computed(() => form.state);
const fieldStates = computed(() => form.fieldStates);
const setFormValue = (key: string, value: any) => {
  form.setValue(key, value);
};
const submit = () => {
  form.submit(
    (d) => {
      console.log('suc', toRaw(d));
    },
    (err) => {
      console.log('err', err);
    }
  );
};
</script>

<template>
  <div class="form">
    <div class="p">
      <div class="pc">
        <div class="label">用户名:</div>
        <div class="input">
          <input
            type="text"
            :value="formState.values.username"
            @input="setFormValue('username', ($event.currentTarget as HTMLInputElement)?.value)"
          />
        </div>
        <div class="loading">
          {{ fieldStates.username?.isValidating ? 'loading...' : '' }}
        </div>
      </div>
      <div class="error">{{ formState.errors?.username?.message }}</div>
    </div>
    <div class="p">
      <div class="pc">
        <div class="label">密码:</div>
        <div class="input">
          <input
            type="text"
            :value="formState.values.password"
            @input="setFormValue('password', ($event.currentTarget as HTMLInputElement)?.value)"
          />
        </div>
        <div class="loading"></div>
      </div>
      <div class="error">{{ formState.errors?.password?.message }}</div>
    </div>
    <div class="p">
      <div class="pc">
        <div class="label">确认密码:</div>
        <div class="input">
          <input
            type="text"
            :value="formState.values.confirmPassword"
            @input="setFormValue('confirmPassword', ($event.currentTarget as HTMLInputElement)?.value)"
          />
        </div>
        <div class="loading"></div>
      </div>
      <div class="error">{{ formState.errors?.confirmPassword?.message }}</div>
    </div>
    <div class="p">
      <div>
        <button class="btn" :disabled="formState.isValidating" @click="submit">
          {{ formState.isSubmitting ? '提交...' : '提交' }}
        </button>
      </div>
      <div class="error">
        {{ formState.error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.form {
  display: block;
  width: 400px;
  margin: 0 auto;
}

.p {
  padding-bottom: 20px;
}

.pc {
  display: flex;
  align-content: center;
}

.error {
  line-height: 20px;
  color: red;
}

.label {
  width: 80px;
  flex: 0 0 auto;
}

.input {
  flex: 1 1 auto;
}

.loading {
  width: 100px;
  flex: 0 0 auto;
  padding-left: 10px;
}

input {
  width: 100%;
}
</style>
