import { inject } from 'vue';
import { vfmInjectionKey } from '../context';

export const useForm = () => {
  const form = inject(vfmInjectionKey);
  return form;
};
