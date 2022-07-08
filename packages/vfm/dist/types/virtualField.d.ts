import { Form } from './form';
import { FormType, VirtualFieldRule, VirtualFieldState } from './types';
/**
 * @internal
 */
export declare class VirtualFieldClass<T extends FormType = FormType, V = any> {
    name: string;
    state: VirtualFieldState;
    private form;
    private rules;
    private value;
    private validate;
    private validateDispose;
    private debounce;
    private stopValidateWatcher;
    private isRegistered;
    private isInited;
    constructor(form: Form<T>, args: {
        name: string;
        value: () => V;
        rules?: VirtualFieldRule<V>[];
        immediate?: boolean;
        debounce?: number;
    });
    private runInAction;
    setRules(rules?: VirtualFieldRule<V>[]): void;
    update(args: {
        rules?: VirtualFieldRule<V>[];
        value?: () => V;
    }): void;
    initWatcher(): void;
    onRegister(): void;
    onUnregister(): void;
}
//# sourceMappingURL=virtualField.d.ts.map