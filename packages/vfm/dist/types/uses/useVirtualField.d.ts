import { Ref } from 'vue';
import { FormClass } from '../form';
import { VirtualFieldRule } from './../types';
import { FormType } from '../types';
export declare type UseVirtualFieldProps<T extends FormType = FormType, VFK extends string = string, N extends VFK = VFK, V = any> = {
    form: FormClass<T, VFK>;
    name: Ref<N> | N;
    value: () => V;
    rules?: Ref<VirtualFieldRule[]> | VirtualFieldRule[];
};
export declare const useVirtualField: <T extends FormType, N extends string>(props: UseVirtualFieldProps<T, N, N, any>) => {
    mounted: Ref<Boolean>;
};
//# sourceMappingURL=useVirtualField.d.ts.map