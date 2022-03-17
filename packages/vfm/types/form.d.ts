import { VirtualField } from './field';
import { FieldValuesType, FieldValues, KeyPathValue, ValidateFunc, FormState, FormErrors, VirtualValidateFunc } from './types';
export declare class Form<T extends FieldValuesType = FieldValuesType, VFK extends string = string> {
    private fieldsKeys;
    private fields;
    private virtualFieldsKeys;
    private virtualFields;
    private _data;
    private data;
    private _fieldStates;
    private _fieldStatesReadonly;
    private stopStateWatcher;
    private stopStatusWatcher;
    private stopValidatingWatcher;
    private waiters;
    private defaultValues;
    constructor(args: {
        defaultValues?: FieldValues<T>;
        virtualFields?: Record<string, VirtualField<Form<T, VFK>>>;
    });
    get state(): FormState<T, VFK>;
    get fieldStates(): Record<string, any>;
    mount(): void;
    unmount(): void;
    registerField<N extends string>(name: N, args?: {
        value?: KeyPathValue<T, N>;
        defaultValue?: KeyPathValue<T, N>;
        validate?: ValidateFunc<KeyPathValue<T, N>, FormState<T, VFK>> | null;
    }): void;
    registerVirtualField(name: string, args?: {
        validate?: VirtualValidateFunc<FormState<T, VFK>> | null;
    }): void;
    unregisterField(name: string): void;
    unregisterVirtualField(name: string): void;
    setValue(name: string, value: any): void;
    submit(onSuccess: (data: FieldValues<T>) => void, onError: (errors: FormErrors) => void): void;
    reset(values?: FormData): void;
}
//# sourceMappingURL=form.d.ts.map