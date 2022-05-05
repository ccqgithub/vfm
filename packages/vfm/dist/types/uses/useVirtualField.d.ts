import { Ref } from 'vue';
import { FormClass } from '../form';
import { VirtualFieldRule } from './../types';
import { FormType, VirtualFieldState } from '../types';
export declare type UseVirtualFieldProps<T extends FormType = FormType, N extends string = string> = {
    form?: FormClass<T>;
    name: N;
    rules?: VirtualFieldRule[];
};
export declare const useVirtualField: <T extends FormType, N extends string>(props: UseVirtualFieldProps<T, N>) => [VirtualFieldState<string>, {
    mounted: Ref<Boolean>;
    form: FormClass<T, string>;
}];
//# sourceMappingURL=useVirtualField.d.ts.map