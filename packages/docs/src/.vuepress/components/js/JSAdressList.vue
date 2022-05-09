<script setup lang="ts">
import { useFieldArray } from 'vfm';
import { form } from '../form';
import AddressItem from './JSAdress.vue';

const { fields } = useFieldArray(form, '')

const formState = form.state;
</script>

<template>
  <div class="vfm-block-title">Base Info</div>
  <div>
    <AddressItem v-for="(item, index) in fields" :key="item.id" :index="index">
    </AddressItem>
  </div>
</template>
