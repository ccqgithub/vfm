import { FieldState } from './../types';
import { FormClass } from '../form';
import { FieldRule, KeyPathValue, FormType, InputLikeRef } from '../types';
export declare type UseFieldProps<T extends FormType = FormType, N extends string = string> = {
    form?: FormClass<T>;
    name: N;
    rules?: FieldRule[];
    value?: KeyPathValue<T, N>;
    defaultValue?: KeyPathValue<T, N>;
};
export declare type UseFieldReturn<T extends FormType = FormType, N extends string = string> = {
    state: FieldState<KeyPathValue<T, N>>;
    value?: KeyPathValue<T, N>;
    onChange: (v: KeyPathValue<T, N>) => void;
    onBlur: () => void;
    setRef: (el: InputLikeRef | null) => void;
};
export declare const useField: <T extends FormType, N extends string>(props: UseFieldProps<T, N>) => UseFieldReturn<T, N>;
//# sourceMappingURL=useField.d.ts.map