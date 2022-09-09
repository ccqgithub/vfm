import { FormType } from '../types';
import { Form } from '../form';
/**
 * @category Use
 */
export declare const useForm: <F extends FormType = FormType, VFK extends string = string>(formGetter?: (() => Form<F, VFK>) | undefined) => Form<F, VFK>;
//# sourceMappingURL=useForm.d.ts.map