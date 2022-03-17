import { Form } from './form';
import { ValidateFunc, VirtualValidateFunc, FieldState, VirtualFieldState } from './types';
export declare class Field<F extends Form = Form, V = any> {
    name: string;
    private form;
    private _data;
    private data;
    private validate;
    private validateCount;
    private stopValidateWatcher;
    private stopDirtyWatcher;
    constructor(form: F, args: {
        name: string;
        value?: string;
        defaultValue?: string;
        validate?: ValidateFunc<V, F['state']> | null;
    });
    get state(): FieldState<V>;
    private initWatcher;
    onUnregister(): void;
    onChange(value: V): void;
    onTouched(): void;
    reset(resetValue?: V): void;
}
export declare class VirtualField<F extends Form = Form> {
    name: string;
    private form;
    private _data;
    private data;
    private validate;
    private validateCount;
    private stopValidateWatcher;
    constructor(form: F, args: {
        name: string;
        validate?: VirtualValidateFunc<F['state']> | null;
    });
    get state(): VirtualFieldState;
    private initWatcher;
    onUnregister(): void;
}
//# sourceMappingURL=field.d.ts.map