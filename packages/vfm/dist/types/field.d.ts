import { FormClass } from './form';
import { ValidateFunc, VirtualValidateFunc, FieldState, VirtualFieldState, FormType, FormState, KeyPathValue } from './types';
export declare class FieldClass<T extends FormType = FormType, N extends string = string, V extends KeyPathValue<T, N> = KeyPathValue<T, N>> {
    name: N;
    private form;
    private _data;
    private data;
    private validate;
    private validateCount;
    private stopValidateWatcher;
    private stopDirtyWatcher;
    isRegistered: boolean;
    constructor(form: FormClass<T>, args: {
        name: N;
        value?: string;
        defaultValue?: string;
        validate?: ValidateFunc<V, FormState<T>> | null;
        immediate?: boolean;
    });
    get state(): FieldState<V>;
    initWatcher(): void;
    onRegister(): void;
    onUnregister(): void;
    onChange(value: V): void;
    onTouched(touched?: boolean): void;
    reset(resetValue?: V): void;
}
export declare class VirtualFieldClass<T extends FormType = FormType> {
    name: string;
    private form;
    private _data;
    private data;
    private validate;
    private validateCount;
    private stopValidateWatcher;
    isRegistered: boolean;
    constructor(form: FormClass<T>, args: {
        name: string;
        validate?: VirtualValidateFunc<FormState<T>> | null;
        immediate?: boolean;
    });
    get state(): VirtualFieldState;
    private initWatcher;
    onRegister(): void;
    onUnregister(): void;
}
//# sourceMappingURL=field.d.ts.map