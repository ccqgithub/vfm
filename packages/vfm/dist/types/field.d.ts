import { FormType, FieldRule, FieldState, KeyPathValue, FieldPath } from './types';
import { Form } from './form';
/**
 * @internal
 */
export declare class FieldClass<T extends FormType = FormType, N extends FieldPath<T> = FieldPath<T>, Deps = any, Transform = KeyPathValue<T, N>, VFK extends string = string> {
    name: N;
    initValue?: KeyPathValue<T, N>;
    initDefaultValue?: KeyPathValue<T, N>;
    state: FieldState;
    private form;
    private rules;
    private deps;
    private validate;
    private validateDispose;
    private debounce;
    private transform;
    private isEqual;
    private focusFn;
    private stopValidateWatcher;
    private stopDirtyWatcher;
    private isRegistered;
    private isInited;
    constructor(form: Form<T>, args: {
        name: N;
        rules?: FieldRule<Transform, Deps>[];
        deps?: () => Deps;
        immediate?: boolean;
        transform?: (v: KeyPathValue<T, N>) => Transform;
        isEqual?: (v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean;
        onFocus?: () => void;
        debounce?: number;
        initValue?: KeyPathValue<T, N>;
        initDefaultValue?: KeyPathValue<T, N>;
    });
    getValue(): any;
    getDefaultValue(): any;
    runInAction: (fn: (...args: any[]) => void) => void;
    setRules(rules?: FieldRule<KeyPathValue<T, N>, Deps>[]): void;
    update(args?: {
        rules?: FieldRule<KeyPathValue<T, N>, Deps>[];
    }): void;
    initWatcher(): void;
    onRegister(): void;
    onUnregister(): void;
    onTouched(touched?: boolean): void;
    onChanged(changed?: boolean): void;
    onFocus(): void;
    reset(args?: {
        keepTouched?: boolean;
        keepChanged?: boolean;
    }): void;
}
//# sourceMappingURL=field.d.ts.map