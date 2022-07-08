import { Ref } from 'vue';
import { FormType, FieldRule, KeyPathValue, FieldPath, FieldProps } from './../types';
import { Form } from '../form';
export declare type UseFieldProps<T extends FormType = FormType, N extends FieldPath<T> = FieldPath<T>, Deps = any, Transform = KeyPathValue<T, N>> = {
    form?: Form<T>;
    name: Ref<N> | N;
    rules?: Ref<FieldRule<Transform, Deps>[]> | FieldRule<Transform, Deps>[];
    touchType?: Ref<'FOCUS' | 'BLUR'> | ('FOCUS' | 'BLUR');
    transform?: (v: KeyPathValue<T, N>) => Transform;
    isEqual?: (v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean;
    deps?: () => Deps;
    debounce?: number;
    changeType?: 'ONINPUT' | 'ONCHANGE';
    value?: KeyPathValue<T, N>;
    defaultValue?: KeyPathValue<T, N>;
};
/**
 * @category Use
 */
export declare const useField: <T extends FormType, N extends FieldPath<T, "">, Deps = any, Transform = KeyPathValue<T, N>>(props: UseFieldProps<T, N, Deps, Transform>) => [FieldProps<T, N>, Ref<KeyPathValue<T, N>>, {
    mounted: Ref<Boolean>;
}];
//# sourceMappingURL=useField.d.ts.map