import { CancellablePromise } from './types';
export declare const setKeyValue: (data: Record<string, any>, keyPath: string, value: any) => void;
export declare const getKeyValue: (data: Record<string, any>, keyPath: string) => any;
export declare const delKey: (data: Record<string, any>, keyPath: string) => void;
export declare const updateObject: (obj: Record<string, any>, newObj: Record<string, any>) => void;
export declare const recursiveUpdateObject: (obj: Record<string, any>, newObj: Record<string, any>, deleteOldKeys?: boolean) => void;
declare type OnCancel = (cancel: () => void) => void;
export declare const makeCancellablePromise: <T = any>(fn: (onCancel: OnCancel) => Promise<T>) => CancellablePromise<T>;
export declare const AllPropType: (SymbolConstructor | ObjectConstructor | StringConstructor | BooleanConstructor | NumberConstructor | ArrayConstructor)[];
export declare const noop: (...args: any[]) => void;
export {};
//# sourceMappingURL=untils.d.ts.map