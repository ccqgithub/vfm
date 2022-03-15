import { ValidateFunc, FieldError } from './field';
import { FieldValuesType, FieldValues, KeyPathValue } from './types';
export declare type FormErrors = Record<string, FieldError | null>;
export declare type FormState<T extends FieldValuesType> = {
    values: FieldValues<T>;
    error: string;
    errors: FormErrors;
    isError: boolean;
    isValidating: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isChanged: boolean;
    isSubmitted: boolean;
    isSubmitting: boolean;
    submitCount: number;
};
export declare class Form<T extends FieldValuesType = {}> {
    private fieldsKeys;
    private fields;
    private _data;
    private data;
    private _fieldStates;
    private _fieldStatesReadonly;
    private stopStateWatcher;
    private stopStatusWatcher;
    private stopValidatingWatcher;
    private waiters;
    defaultValues: FieldValues<T>;
    constructor(args: {
        defaultValues?: FieldValues<T>;
    });
    get state(): FormState<T>;
    get fieldStates(): Record<string, any>;
    mount(): void;
    unmount(): void;
    registerField<N extends string>(name: N, args?: {
        value?: KeyPathValue<T, N>;
        defaultValue?: KeyPathValue<T, N>;
        validateFn?: ValidateFunc<T, N> | null;
    }): void;
    unregisterField(name: string): void;
    setValue(name: string, value: any): void;
    submit(onSuccess: (data: FieldValues<T>) => void, onError: (errors: FormErrors) => void): void;
    reset(values?: FormData): void;
}
//# sourceMappingURL=form.d.ts.map