import { VirtualFieldRule } from './../types';
import { FormClass } from '../form';
import { FormType, VirtualFieldState } from '../types';
export declare type UseVirtualFieldProps<T extends FormType = FormType, N extends string = string> = {
    form?: FormClass<T>;
    name: N;
    rules?: VirtualFieldRule[];
};
export declare const useVirtualField: <T extends FormType, N extends string>(props: UseVirtualFieldProps<T, N>) => [VirtualFieldState | undefined];
//# sourceMappingURL=useVirtualField.d.ts.map