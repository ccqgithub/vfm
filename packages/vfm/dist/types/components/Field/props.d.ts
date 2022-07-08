import { PropType } from 'vue';
import { Form } from '../../form';
import { FieldRule, FormType, FieldPath, KeyPathValue } from '../../types';
export declare const getProps: <T extends FormType = FormType, N extends FieldPath<T, ""> = FieldPath<T, "">, Deps = any, Transform = KeyPathValue<T, N>>() => {
    /**
     * The form instance that created by [createForm](../apis/#createform)
     */
    form: {
        type: PropType<Form<T, string>>;
        default: undefined;
    };
    /**
     * Field name
     */
    name: {
        type: PropType<FieldPath<T, N>>;
        required: boolean;
    };
    /**
     * [FieldRule](../apis/#fieldrule) list
     * *Tips:* Do not visit form's error state in the `validator` function, because the validate will change error state, it will causes an infinite loop of calls.
     */
    rules: {
        type: PropType<FieldRule<Transform, Deps>[]>;
        default: () => never[];
    };
    /**
     * Function to generate dependent value. It run in `watchEffect`, so if the return value change, the field will `revalidate`.
     * *Tips:* Do not visit form's error state in the function, because the validate will change error state, it will causes an infinite loop of calls.
     */
    deps: {
        type: PropType<() => Deps>;
        default: undefined;
    };
    /**
     * Field validate debounce time, millseconds.
     */
    debounce: {
        type: NumberConstructor;
        default: undefined;
    };
    /**
     * The initial value of the field, it will override the `initValues` of `createForm`.
     */
    value: {
        type: PropType<KeyPathValue<T, N>>;
        default: undefined;
    };
    /**
     * The default value of the field, used to determine whether field is dirty and reset field. it will override the `initValues` of `createForm`.
     */
    defaultValue: {
        type: PropType<KeyPathValue<T, N>>;
        default: undefined;
    };
    /**
     * Transform value before pass to validate.
     */
    transform: {
        type: PropType<(v: KeyPathValue<T, N>) => Transform>;
        default: undefined;
    };
    /**
     * When to mark the field is `touched`, default is 'BLUR', means that the field will be `touched` after bulur event.
     */
    touchType: {
        type: PropType<"FOCUS" | "BLUR">;
        default: string;
    };
    /**
     * When to change the field value, default is 'ONCHANGE', means that the field will setValue when input really event.
     */
    changeType: {
        type: PropType<"ONINPUT" | "ONCHANGE">;
        default: string;
    };
    /**
     * Compare value and defaultValue, checkout them wether is append.
     */
    isEqual: {
        type: PropType<(v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean>;
        default: undefined;
    };
};
//# sourceMappingURL=props.d.ts.map