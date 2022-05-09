import { FormClass } from './form';
import { FormType, FormState, VirtualFieldRule, VirtualFieldState } from './types';
export declare class VirtualFieldClass<T extends FormType = FormType> {
    name: string;
    state: VirtualFieldState;
    private form;
    private rules;
    private validate;
    private validateCount;
    private stopValidateWatcher;
    private isRegistered;
    private isInited;
    constructor(form: FormClass<T>, args: {
        name: string;
        rules?: VirtualFieldRule<FormState<T>>[];
        immediate?: boolean;
    });
    private runInAction;
    update(args: {
        rules?: VirtualFieldRule<FormState<T>>[];
    }): void;
    initWatcher(): void;
    onRegister(): void;
    onUnregister(): void;
}
//# sourceMappingURL=virtualField.d.ts.map