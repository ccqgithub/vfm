<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useFieldArray, Field } from 'vfm';
import { form } from '../form';

type School = {
  name: string;
  address: string;
};

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  value: {
    type: Array as PropType<School[]>,
    default: () => []
  }
});
const emit = defineEmits<{
  (e: 'change', v: School[]): void;
  (e: 'update:visible', v: boolean): void;
}>();

const allSchools: School[] = [
  {
    name: 'School A',
    address: 'School Address A'
  },
  {
    name: 'School B',
    address: 'School Address B'
  },
  {
    name: 'School C',
    address: 'School Address C'
  },
  {
    name: 'School D',
    address: 'School Address D'
  },
  {
    name: 'School E',
    address: 'School Address E'
  }
];
const items = ref(allSchools.map((item) => {
  const find = props.value.find((v) => v.name === item.name);
  return {
    ...item,
    selected: !!find,
  }
}));
const onClose = () => {
  emit('update:visible', false);
}
const onConfirm = () => {
  const values = items.value.filter((v) => v.selected).map((v) => {
    return {
      name: v.name,
      address: v.address
    }
  });
  emit('change', values);
  emit('update:visible', false);
}
</script>

<template>
  <div class="sbox">
    <div class="item" v-for="item in items" :key="item.name">
      <label>
        <input type="checkbox" v-model="item.selected" />
        <span>{{ item.name }} &lt;{{ item.address }}&gt;</span>
      </label>
    </div>
    <div class="btns">
      <button @click="onClose">close</button>
      <button @click="onConfirm">confirm</button>
    </div>
  </div>
</template>

<style scoped>
.sbox {
  position: relative;
  background: #fff;
  padding-bottom: 20px;
}

.btns {
  margin-top: 20px;
  display: flex;
}

.btns button {
  margin-right: 20px;
}
</style>