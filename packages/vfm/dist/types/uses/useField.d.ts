import { Ref } from 'vue';
import { FormType, FormState, FieldRule, KeyPathValue, FieldPath, FieldProps } from './../types';
import { FormClass } from '../form';
export declare type UseFieldProps<T extends FormType = FormType, N extends FieldPath<T> = FieldPath<T>, Deps = any> = {
    form: FormClass<T>;
    name: Ref<N> | N;
    rules?: Ref<FieldRule<KeyPathValue<T, N>, FormState<T>>[]> | FieldRule<KeyPathValue<T, N>, FormState<T>>[];
    touchType?: Ref<'FOCUS' | 'BLUR'> | ('FOCUS' | 'BLUR');
    transform?: (v: KeyPathValue<T, N>) => KeyPathValue<T, N>;
    isEqual?: (v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean;
    deps?: () => Deps;
};
export declare const useField: <T extends FormType, N extends FieldPath<T, "">>(props: UseFieldProps<T, N, any>) => [FieldProps<T, N>, Ref<KeyPathValue<T, N>>, {
    mounted: Ref<Boolean>;
}];
//# sourceMappingURL=useField.d.ts.map