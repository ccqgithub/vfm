import { Ref } from 'vue';
import { FormClass } from '../form';
import { FieldState, FormState } from './../types';
import { FieldRule, KeyPathValue, FormType, InputLikeRef } from '../types';
export declare type UseFieldProps<T extends FormType = FormType, N extends string = string> = {
    form?: FormClass<T>;
    name: N;
    rules?: FieldRule<KeyPathValue<T, N>, FormState<T>>[];
    value?: KeyPathValue<T, N>;
    defaultValue?: KeyPathValue<T, N>;
    transform?: (v: KeyPathValue<T, N>) => KeyPathValue<T, N>;
    touchType?: 'FOCUS' | 'BLUR';
};
export declare type FieldElementProps<T extends FormType = FormType, N extends string = string> = {
    value?: Ref<KeyPathValue<T, N>>;
    onChange: (v: KeyPathValue<T, N>) => void;
    onBlur: () => void;
    onFocus: () => void;
    ref: (el: InputLikeRef | null) => void;
};
export declare const useField: <T extends FormType, N extends string>(props: UseFieldProps<T, N>) => [FieldElementProps<T, N>, {
    state: FieldState<KeyPathValue<T, N>>;
    form: FormClass<T, string>;
    mounted: Ref<Boolean>;
}];
//# sourceMappingURL=useField.d.ts.map