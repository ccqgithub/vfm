import { Form } from '../form';
import { FormType, ArrayFieldPath } from '../types';
/**
 * @category Use
 */
export declare const useFieldArray: <T extends FormType, N extends ArrayFieldPath<T, "">>(args: {
    form?: Form<T, string> | undefined;
    path: N;
}) => {
    fieldsValue: {
        id: string;
        name: string;
    }[];
    fields: import("vue").Ref<{
        id: string;
        name: string;
    }[]>;
    prepend: (v: import("../types").ArrayItem<import("../types").KeyPathValue<T, N>>) => void;
    append: (v: import("../types").ArrayItem<import("../types").KeyPathValue<T, N>>) => void;
    insert: (id: string, v: import("../types").ArrayItem<import("../types").KeyPathValue<T, N>>) => void;
    swap: (from: string, to: string) => void;
    move: (from: string, to: string) => void;
    replace: (values: import("../types").KeyPathValue<T, N>) => void;
    remove: (id: string) => void;
    update: (id: string, v: import("../types").ArrayItem<import("../types").KeyPathValue<T, N>>) => void;
};
//# sourceMappingURL=useFieldArray.d.ts.map