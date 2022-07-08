export { Field } from './Field';
/**
 * [Field](../components/)
 * @category Component
 */
/**
 * [VirtualField](../components/)
 * @category Component
 */
declare const VirtualField: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            form: import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>;
            debounce: number;
            rules: import("./VirtualField.vue.__VLS_script").__VLS_types_VirtualFieldRule<any>[];
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
            form: {
                type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
                default: undefined;
            };
            name: {
                type: import("vue").PropType<string>;
                required: true;
            };
            value: {
                type: import("vue").PropType<() => any>;
                required: true;
            };
            rules: {
                type: import("vue").PropType<import("./VirtualField.vue.__VLS_script").__VLS_types_VirtualFieldRule<any>[]>;
                default: () => never[];
            };
            debounce: {
                type: NumberConstructor;
                default: undefined;
            };
        }>> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "form" | "debounce" | "rules">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            form: {
                type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
                default: undefined;
            };
            name: {
                type: import("vue").PropType<string>;
                required: true;
            };
            value: {
                type: import("vue").PropType<() => any>;
                required: true;
            };
            rules: {
                type: import("vue").PropType<import("./VirtualField.vue.__VLS_script").__VLS_types_VirtualFieldRule<any>[]>;
                default: () => never[];
            };
            debounce: {
                type: NumberConstructor;
                default: undefined;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
            form: import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>;
            debounce: number;
            rules: import("./VirtualField.vue.__VLS_script").__VLS_types_VirtualFieldRule<any>[];
        }> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
        form: {
            type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
            default: undefined;
        };
        name: {
            type: import("vue").PropType<string>;
            required: true;
        };
        value: {
            type: import("vue").PropType<() => any>;
            required: true;
        };
        rules: {
            type: import("vue").PropType<import("./VirtualField.vue.__VLS_script").__VLS_types_VirtualFieldRule<any>[]>;
            default: () => never[];
        };
        debounce: {
            type: NumberConstructor;
            default: undefined;
        };
    }>> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    form: {
        type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
        default: undefined;
    };
    name: {
        type: import("vue").PropType<string>;
        required: true;
    };
    value: {
        type: import("vue").PropType<() => any>;
        required: true;
    };
    rules: {
        type: import("vue").PropType<import("./VirtualField.vue.__VLS_script").__VLS_types_VirtualFieldRule<any>[]>;
        default: () => never[];
    };
    debounce: {
        type: NumberConstructor;
        default: undefined;
    };
}>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
    form: import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>;
    debounce: number;
    rules: import("./VirtualField.vue.__VLS_script").__VLS_types_VirtualFieldRule<any>[];
}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default: {};
    };
});
/**
 * [FieldArray](../components/)
 * @category Component
 */
declare const FieldArray: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            form: import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>;
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
            form: {
                type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
                default: undefined;
            };
            name: {
                type: StringConstructor;
                required: true;
            };
        }>> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "form">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            form: {
                type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
                default: undefined;
            };
            name: {
                type: StringConstructor;
                required: true;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
            form: import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>;
        }> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
        form: {
            type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
            default: undefined;
        };
        name: {
            type: StringConstructor;
            required: true;
        };
    }>> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    form: {
        type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
        default: undefined;
    };
    name: {
        type: StringConstructor;
        required: true;
    };
}>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
    form: import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>;
}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default: {
            prepend: (v: unknown) => void;
            append: (v: unknown) => void;
            insert: (id: string, v: unknown) => void;
            swap: (from: string, to: string) => void;
            move: (from: string, to: string) => void;
            replace: (values: any) => void;
            remove: (id: string) => void;
            update: (id: string, v: unknown) => void;
        } & {
            fields: {
                id: string;
                name: string;
            }[];
        };
    };
});
/**
 * [FormProvider](../components/)
 * @category Component
 */
declare const FormProvider: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{}> & Omit<Readonly<import("vue").ExtractPropTypes<{
            form: {
                type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
                required: true;
            };
        }>> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            form: {
                type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
                required: true;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {}> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
        form: {
            type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
            required: true;
        };
    }>> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    form: {
        type: import("vue").PropType<import("./FieldArray.vue.__VLS_script").__VLS_types_Form<import("..").FormType, string>>;
        required: true;
    };
}>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default: {};
    };
});
export { VirtualField, FieldArray, FormProvider };
//# sourceMappingURL=index.d.ts.map