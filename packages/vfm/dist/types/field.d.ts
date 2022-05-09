import { FormType, FormState, FieldRule, FieldState, KeyPathValue } from './types';
import { FormClass } from './form';
export declare class FieldClass<T extends FormType = FormType, N extends string = string, V extends KeyPathValue<T, N> = KeyPathValue<T, N>> {
    name: N;
    state: FieldState;
    private form;
    private rules;
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
        rules?: FieldRule<V, FormState<T>>[];
        immediate?: boolean;
        transform?: (v: V) => V;
        isEqual?: (v: V, d: V) => boolean;
        onFocus?: () => void;
    });
    get value(): any;
    get defaultValue(): any;
    runInAction: (fn: (...args: any[]) => void) => void;
    update(args?: {
        rules?: FieldRule<V, FormState<T>>[];
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