<script setup lang="ts">
import { form } from '../form';
import AddressItem from './JSAdress.vue';

const add = () => {
  const length = (form.state.values.address || []).length;
  form.setValue(`address.${length}`, {
    phone: '',
    detail: ''
  })
}
const remove = (index: number) => {
  form.deleteValue(`address.${length}`);
}

const formState = form.state;
</script>

<template>

</template>
