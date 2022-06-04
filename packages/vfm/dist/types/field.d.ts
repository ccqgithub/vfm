import { FormType, FieldRule, FieldState, KeyPathValue, FieldPath } from './types';
import { FormClass } from './form';
export declare class FieldClass<T extends FormType = FormType, N extends FieldPath<T> = FieldPath<T>, Deps = any, VFK extends string = string> {
    name: N;
    state: FieldState;
    private form;
    private rules;
    private deps;
    private validate;
    private validateCount;
    private transform;
    private isEqual;
    private focusFn;
    private stopValidateWatcher;
    private stopDirtyWatcher;
    private isRegistered;
    private isInited;
    constructor(form: FormClass<T>, args: {
        name: N;
        rules?: FieldRule<KeyPathValue<T, N>, Deps>[];
        deps?: () => Deps;
        immediate?: boolean;
        transform?: (v: KeyPathValue<T, N>) => KeyPathValue<T, N>;
        isEqual?: (v: KeyPathValue<T, N>, d: KeyPathValue<T, N>) => boolean;
        onFocus?: () => void;
    });
    getValue(): any;
    getDefaultValue(): any;
    runInAction: (fn: (...args: any[]) => void) => void;
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