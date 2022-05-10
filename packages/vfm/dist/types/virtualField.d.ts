import { FormClass } from './form';
import { FormType, VirtualFieldRule, VirtualFieldState } from './types';
export declare class VirtualFieldClass<T extends FormType = FormType, V = any> {
    name: string;
    state: VirtualFieldState;
    private form;
    private rules;
    private value;
    private validate;
    private validateCount;
    private stopValidateWatcher;
    private isRegistered;
    private isInited;
    constructor(form: FormClass<T>, args: {
        name: string;
        value: () => V;
        rules?: VirtualFieldRule<V>[];
        immediate?: boolean;
    });
    private runInAction;
    update(args: {
        rules?: VirtualFieldRule<V>[];
        value?: () => V;
    }): void;
    initWatcher(): void;
    onRegister(): void;
    onUnregister(): void;
}
//# sourceMappingURL=virtualField.d.ts.map