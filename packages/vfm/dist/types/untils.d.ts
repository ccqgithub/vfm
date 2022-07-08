import { DisposablePromise } from './types';
/**
 * @internal
 */
export declare const setKeyValue: (data: Record<string, any>, keyPath: string, value: any) => void;
/**
 * @internal
 */
export declare const getKeyValue: (data: Record<string, any>, keyPath: string) => any;
/**
 * @internal
 */
export declare const delKey: (data: Record<string, any>, keyPath: string) => void;
/**
 * @internal
 */
export declare const updateObject: (obj: Record<string, any>, newObj: Record<string, any>) => void;
export declare const recursiveUpdateObject: (obj: Record<string, any>, newObj: Record<string, any>, deleteOldKeys?: boolean) => void;
/**
 * 函数调用间隔控制
 * fn: 执行的函数
 * delay: 函数执行的最小间隔，单位毫秒
 * leading
 */
export declare const debounce: <FN extends (...args: any[]) => any>(fn: FN, delay: number, leading?: boolean) => (...args: Parameters<FN>) => void;
export declare const AllPropType: (SymbolConstructor | ObjectConstructor | StringConstructor | BooleanConstructor | NumberConstructor | ArrayConstructor)[];
export declare const noop: (...args: any[]) => void;
declare type OnDispose = (dispose: () => void) => void;
export declare const makeDisposablePromise: <T = any>(fn: (onDispose: OnDispose) => Promise<T>) => DisposablePromise<T>;
export declare const debouncePromise: <FN extends (...args: any[]) => Promise<T> | DisposablePromise<T>, T>(fn: FN, delay: number) => (...args: Parameters<FN>) => Promise<T>;
export {};
//# sourceMappingURL=untils.d.ts.map