import { FormClass } from './form';
import { FieldState, FormType, FormState, KeyPathValue, FieldRule } from './types';
export declare class FieldClass<T extends FormType = FormType, N extends string = string, V extends KeyPathValue<T, N> = KeyPathValue<T, N>> {
    name: N;
    state: FieldState<V>;
    private form;
    private validate;
    private validateCount;
    private stopValidateWatcher;
    private stopDirtyWatcher;
    private isRegistered;
    constructor(form: FormClass<T>, args: {
        name: N;
        value?: string;
        defaultValue?: string;
        rules?: FieldRule<KeyPathValue<T, N>, FormState<T>>[];
        immediate?: boolean;
    });
    private runInAction;
    initWatcher(): void;
    onRegister(): void;
    onUnregister(): void;
    onChange(value: V): void;
    onTouched(touched?: boolean): void;
    reset(resetValue?: V): void;
}
//# sourceMappingURL=field.d.ts.map