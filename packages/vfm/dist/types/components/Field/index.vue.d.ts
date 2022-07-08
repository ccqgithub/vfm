declare const _default: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            transform: (v: any) => any;
            value: any;
            form: import("../FieldArray.vue.__VLS_script").__VLS_types_Form<import("../..").FormType, string>;
            debounce: number;
            deps: () => any;
            rules: import("../..").FieldRule<any, any>[];
            defaultValue: any;
            isEqual: (v: any, d: any) => boolean;
            touchType: "FOCUS" | "BLUR";
            changeType: "ONINPUT" | "ONCHANGE";
        }> & Omit<Readonly<import("vue").ExtractPropTypes<{
            form: {
                type: import("vue").PropType<import("../FieldArray.vue.__VLS_script").__VLS_types_Form<import("../..").FormType, string>>;
                default: undefined;
            };
            name: {
                type: import("vue").PropType<string>;
                required: boolean;
            };
            rules: {
                type: import("vue").PropType<import("../..").FieldRule<any, any>[]>;
                default: () => never[];
            };
            deps: {
                type: import("vue").PropType<() => any>;
                default: undefined;
            };
            debounce: {
                type: NumberConstructor;
                default: undefined;
            };
            value: {
                type: import("vue").PropType<any>;
                default: undefined;
            };
            defaultValue: {
                type: import("vue").PropType<any>;
                default: undefined;
            };
            transform: {
                type: import("vue").PropType<(v: any) => any>;
                default: undefined;
            };
            touchType: {
                type: import("vue").PropType<"FOCUS" | "BLUR">;
                default: string;
            };
            changeType: {
                type: import("vue").PropType<"ONINPUT" | "ONCHANGE">;
                default: string;
            };
            isEqual: {
                type: import("vue").PropType<(v: any, d: any) => boolean>;
                default: undefined;
            };
        }>> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "transform" | "value" | "form" | "debounce" | "deps" | "rules" | "defaultValue" | "isEqual" | "touchType" | "changeType">;
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
                type: import("vue").PropType<import("../FieldArray.vue.__VLS_script").__VLS_types_Form<import("../..").FormType, string>>;
                default: undefined;
            };
            name: {
                type: import("vue").PropType<string>;
                required: boolean;
            };
            rules: {
                type: import("vue").PropType<import("../..").FieldRule<any, any>[]>;
                default: () => never[];
            };
            deps: {
                type: import("vue").PropType<() => any>;
                default: undefined;
            };
            debounce: {
                type: NumberConstructor;
                default: undefined;
            };
            value: {
                type: import("vue").PropType<any>;
                default: undefined;
            };
            defaultValue: {
                type: import("vue").PropType<any>;
                default: undefined;
            };
            transform: {
                type: import("vue").PropType<(v: any) => any>;
                default: undefined;
            };
            touchType: {
                type: import("vue").PropType<"FOCUS" | "BLUR">;
                default: string;
            };
            changeType: {
                type: import("vue").PropType<"ONINPUT" | "ONCHANGE">;
                default: string;
            };
            isEqual: {
                type: import("vue").PropType<(v: any, d: any) => boolean>;
                default: undefined;
            };
        }>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
            transform: (v: any) => any;
            value: any;
            form: import("../FieldArray.vue.__VLS_script").__VLS_types_Form<import("../..").FormType, string>;
            debounce: number;
            deps: () => any;
            rules: import("../..").FieldRule<any, any>[];
            defaultValue: any;
            isEqual: (v: any, d: any) => boolean;
            touchType: "FOCUS" | "BLUR";
            changeType: "ONINPUT" | "ONCHANGE";
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
            type: import("vue").PropType<import("../FieldArray.vue.__VLS_script").__VLS_types_Form<import("../..").FormType, string>>;
            default: undefined;
        };
        name: {
            type: import("vue").PropType<string>;
            required: boolean;
        };
        rules: {
            type: import("vue").PropType<import("../..").FieldRule<any, any>[]>;
            default: () => never[];
        };
        deps: {
            type: import("vue").PropType<() => any>;
            default: undefined;
        };
        debounce: {
            type: NumberConstructor;
            default: undefined;
        };
        value: {
            type: import("vue").PropType<any>;
            default: undefined;
        };
        defaultValue: {
            type: import("vue").PropType<any>;
            default: undefined;
        };
        transform: {
            type: import("vue").PropType<(v: any) => any>;
            default: undefined;
        };
        touchType: {
            type: import("vue").PropType<"FOCUS" | "BLUR">;
            default: string;
        };
        changeType: {
            type: import("vue").PropType<"ONINPUT" | "ONCHANGE">;
            default: string;
        };
        isEqual: {
            type: import("vue").PropType<(v: any, d: any) => boolean>;
            default: undefined;
        };
    }>> & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    form: {
        type: import("vue").PropType<import("../FieldArray.vue.__VLS_script").__VLS_types_Form<import("../..").FormType, string>>;
        default: undefined;
    };
    name: {
        type: import("vue").PropType<string>;
        required: boolean;
    };
    rules: {
        type: import("vue").PropType<import("../..").FieldRule<any, any>[]>;
        default: () => never[];
    };
    deps: {
        type: import("vue").PropType<() => any>;
        default: undefined;
    };
    debounce: {
        type: NumberConstructor;
        default: undefined;
    };
    value: {
        type: import("vue").PropType<any>;
        default: undefined;
    };
    defaultValue: {
        type: import("vue").PropType<any>;
        default: undefined;
    };
    transform: {
        type: import("vue").PropType<(v: any) => any>;
        default: undefined;
    };
    touchType: {
        type: import("vue").PropType<"FOCUS" | "BLUR">;
        default: string;
    };
    changeType: {
        type: import("vue").PropType<"ONINPUT" | "ONCHANGE">;
        default: string;
    };
    isEqual: {
        type: import("vue").PropType<(v: any, d: any) => boolean>;
        default: undefined;
    };
}>>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
    transform: (v: any) => any;
    value: any;
    form: import("../FieldArray.vue.__VLS_script").__VLS_types_Form<import("../..").FormType, string>;
    debounce: number;
    deps: () => any;
    rules: import("../..").FieldRule<any, any>[];
    defaultValue: any;
    isEqual: (v: any, d: any) => boolean;
    touchType: "FOCUS" | "BLUR";
    changeType: "ONINPUT" | "ONCHANGE";
}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: typeof import('./index.vue.__VLS_template').default;
});
export default _default;
//# sourceMappingURL=index.vue.d.ts.map