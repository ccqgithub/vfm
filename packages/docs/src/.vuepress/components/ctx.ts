import { InjectionKey, Ref } from 'vue';

let index = 0;

export const getKey = () => {
  return `${index++}`;
};

export type BlockItem = {
  key: string;
  title: string;
}

export const BlockKey = Symbol() as InjectionKey<{
  addBlock: (args: { title: string; key: string; active?: boolean }) => void;
  removeBlock: (key: string) => void;
  active: Ref<string>
}>;