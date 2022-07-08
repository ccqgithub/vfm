import { Form } from './form';
import { FormType, KeyPathValue, ArrayFieldPath, ArrayItem } from './types';
export declare const createFieldArray: <T extends FormType, N extends ArrayFieldPath<T, "">>(form: Form<T, string>, path: N) => {
    onCleanup: () => void;
    readonly fieldsValue: {
        id: string;
        name: string;
    }[];
    fields: import("vue").Ref<{
        id: string;
        name: string;
    }[]>;
    prepend: (v: ArrayItem<KeyPathValue<T, N>>) => void;
    append: (v: ArrayItem<KeyPathValue<T, N>>) => void;
    insert: (id: string, v: ArrayItem<KeyPathValue<T, N>>) => void;
    swap: (from: string, to: string) => void;
    move: (from: string, to: string) => void;
    replace: (values: KeyPathValue<T, N>) => void;
    remove: (id: string) => void;
    update: (id: string, v: ArrayItem<KeyPathValue<T, N>>) => void;
};
export declare type FieldArrayScope<V = any> = {
    fields: {
        id: string;
        name: string;
    }[];
    prepend: (v: V) => void;
    append: (v: V) => void;
    insert: (id: string, v: V) => void;
    swap: (from: string, to: string) => void;
    move: (from: string, to: string) => void;
    replace: (values: V[]) => void;
    remove: (id: string) => void;
    update: (id: string, v: V) => void;
};
//# sourceMappingURL=fieldArray.d.ts.map