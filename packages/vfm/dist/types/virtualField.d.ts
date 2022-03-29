import { FormClass } from './form';
import { VirtualFieldState, FormType, FormState, VirtualFieldRule } from './types';
export declare class VirtualFieldClass<T extends FormType = FormType> {
    name: string;
    state: VirtualFieldState;
    private form;
    private validate;
    private validateCount;
    private stopValidateWatcher;
    isRegistered: boolean;
    constructor(form: FormClass<T>, args: {
        name: string;
        rules?: VirtualFieldRule<FormState<T>>[];
        immediate?: boolean;
    });
    private runInAction;
    initWatcher(): void;
    onRegister(): void;
    onUnregister(): void;
}
//# sourceMappingURL=virtualField.d.ts.map