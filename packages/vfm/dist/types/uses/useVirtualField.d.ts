import { Ref } from 'vue';
import { FormClass } from '../form';
import { VirtualFieldRule } from './../types';
import { FormType, VirtualFieldState } from '../types';
export declare type UseVirtualFieldProps<T extends FormType = FormType, VFK extends string = string, N extends VFK = VFK> = {
    form: FormClass<T, VFK>;
    name: Ref<N> | N;
    rules?: Ref<VirtualFieldRule[]> | VirtualFieldRule[];
};
export declare const useVirtualField: <T extends FormType, N extends string>(props: UseVirtualFieldProps<T, N, N>) => {
    state: Ref<VirtualFieldState>;
    mounted: Ref<Boolean>;
};
//# sourceMappingURL=useVirtualField.d.ts.map