var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { reactive, readonly, watchEffect, ref, toRaw, inject, computed, onMounted, onUnmounted, defineComponent, renderSlot, normalizeProps, guardReactiveProps, unref, provide } from "vue";
class FieldClass {
  constructor(form, args) {
    this.data = null;
    this.validate = null;
    this.validateCount = 0;
    this.stopValidateWatcher = null;
    this.stopDirtyWatcher = null;
    this.isRegistered = false;
    const { immediate = true } = args;
    this.form = form;
    this.name = args.name;
    this._data = reactive({
      name: this.name,
      value: args.value === void 0 ? args.defaultValue : args.value,
      defaultValue: args.defaultValue,
      error: null,
      isError: false,
      isValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false
    });
    this.data = readonly(this._data);
    this.validate = args.validate || null;
    if (immediate) {
      this.onRegister();
    }
  }
  get state() {
    if (!this.data)
      this.data = readonly(this._data);
    return this.data;
  }
  initWatcher() {
    let canCelLastValidate = null;
    this.stopValidateWatcher = watchEffect(async () => {
      this.validateCount++;
      const value = this.state.value;
      const formState = this.form.state;
      const count = this.validateCount;
      this._data.isValidating = true;
      canCelLastValidate == null ? void 0 : canCelLastValidate();
      canCelLastValidate = null;
      let err = null;
      if (this.validate) {
        const promise = this.validate(value, formState);
        if (promise instanceof Promise) {
          canCelLastValidate = promise.cancel || null;
        }
        err = await promise || null;
      }
      if (count !== this.validateCount)
        return;
      this._data.isValidating = false;
      const hasError = !!(err == null ? void 0 : err.message);
      if (hasError) {
        if (!this._data.error)
          this._data.error = { message: "" };
        this._data.error.message = (err == null ? void 0 : err.message) || "";
        this._data.error.type = err == null ? void 0 : err.type;
      } else {
        this._data.error = null;
      }
      this._data.isError = hasError;
    });
    this.stopDirtyWatcher = watchEffect(() => {
      this._data.isDirty = this._data.value !== this._data.defaultValue;
    });
  }
  onRegister() {
    if (this.isRegistered)
      return;
    this.initWatcher();
    this.isRegistered = true;
  }
  onUnregister() {
    var _a, _b;
    (_a = this.stopValidateWatcher) == null ? void 0 : _a.call(this);
    (_b = this.stopDirtyWatcher) == null ? void 0 : _b.call(this);
    this.isRegistered = false;
  }
  onChange(value) {
    if (value === void 0)
      return;
    const isChanged = this.state.value !== value;
    this._data.value = value;
    this._data.isChanged = this._data.isChanged || isChanged;
  }
  onTouched(touched = true) {
    this._data.isTouched = touched;
  }
  reset(resetValue) {
    var _a, _b;
    this.validateCount++;
    (_a = this.stopValidateWatcher) == null ? void 0 : _a.call(this);
    (_b = this.stopDirtyWatcher) == null ? void 0 : _b.call(this);
    if (resetValue !== void 0)
      this._data.defaultValue = resetValue;
    this._data.error = null;
    this._data.isError = false;
    this._data.isValidating = false;
    this._data.isDirty = false;
    this._data.isTouched = false;
    this._data.isChanged = false;
    this._data.value = this._data.defaultValue;
    this.initWatcher();
  }
}
class VirtualFieldClass {
  constructor(form, args) {
    this.name = "";
    this.data = null;
    this.validate = null;
    this.validateCount = 0;
    this.stopValidateWatcher = null;
    this.isRegistered = false;
    const { immediate = true } = args;
    this.form = form;
    this.name = args.name;
    this._data = reactive({
      name: this.name,
      error: null,
      isError: false,
      isValidating: false
    });
    this.data = readonly(this._data);
    this.validate = args.validate || null;
    if (immediate) {
      this.initWatcher();
    }
  }
  get state() {
    if (!this.data)
      this.data = readonly(this._data);
    return this.data;
  }
  initWatcher() {
    let canCelLastValidate = null;
    this.stopValidateWatcher = watchEffect(async () => {
      this.validateCount++;
      const formState = this.form.state;
      const count = this.validateCount;
      this._data.isValidating = true;
      canCelLastValidate == null ? void 0 : canCelLastValidate();
      canCelLastValidate = null;
      let err = null;
      if (this.validate) {
        const promise = this.validate(formState);
        if (promise instanceof Promise) {
          canCelLastValidate = promise.cancel || null;
        }
        err = await promise || null;
      }
      if (count !== this.validateCount)
        return;
      this._data.isValidating = false;
      const hasError = !!(err == null ? void 0 : err.message);
      if (hasError) {
        if (!this._data.error)
          this._data.error = { message: "" };
        this._data.error.message = (err == null ? void 0 : err.message) || "";
        this._data.error.type = err == null ? void 0 : err.type;
      } else {
        this._data.error = null;
      }
      this._data.isError = hasError;
    });
  }
  onRegister() {
    if (this.isRegistered)
      return;
    this.initWatcher();
    this.isRegistered = true;
  }
  onUnregister() {
    var _a;
    (_a = this.stopValidateWatcher) == null ? void 0 : _a.call(this);
  }
}
const setKeyValue = (data, keyPath, value) => {
  const arr = keyPath.split(".");
  let v = data;
  while (arr.length && typeof v === "object" && v !== null) {
    const k = arr.shift();
    if (arr.length === 0) {
      v[k] = value;
    } else if (typeof v[k] !== "object" || v[k] === null) {
      v[k] = /^\d+$/.test(k) ? [] : {};
    }
    v = v[k];
  }
};
const getKeyValue = (data, keyPath) => {
  const arr = keyPath.split(".");
  let v = data;
  while (arr.length && v) {
    const k = arr.shift();
    v = typeof v === "object" && v !== null ? v[k] : void 0;
  }
  return v;
};
const delKey = (data, keyPath) => {
  const arr = keyPath.split(".");
  let v = data;
  while (arr.length && typeof v === "object" && v !== null) {
    const k = arr.shift();
    if (arr.length === 0) {
      if (!Array.isArray(v)) {
        delete v[k];
      } else if (/^\d+$/.test(k)) {
        v.splice(Number(k), 1);
      }
    } else {
      v = v[k];
    }
  }
};
class FormClass {
  constructor(args) {
    this.fieldsKeys = ref([]);
    this.fields = /* @__PURE__ */ new Map();
    this.virtualFieldsKeys = ref([]);
    this.virtualFields = /* @__PURE__ */ new Map();
    this.data = null;
    this._fieldStates = reactive({});
    this._fieldStatesReadonly = null;
    this.stopStateWatcher = null;
    this.stopStatusWatcher = null;
    this.stopValidatingWatcher = null;
    this.waiters = [];
    this.defaultValues = {};
    this.defaultValues = args.defaultValues || {};
    this._data = reactive({
      values: toRaw(this.defaultValues) || {},
      errors: {},
      virtualErrors: {},
      error: null,
      isError: false,
      isValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false,
      isSubmitted: false,
      isSubmitting: false,
      submitCount: 0
    });
  }
  get state() {
    if (!this.data)
      this.data = readonly(this._data);
    return this.data;
  }
  get fieldStates() {
    if (!this._fieldStatesReadonly) {
      this._fieldStatesReadonly = readonly(this._fieldStates);
    }
    return this._fieldStatesReadonly;
  }
  mount() {
    this.stopStateWatcher = watchEffect(() => {
      const keys = this.fieldsKeys.value;
      const virtualKeys = this.virtualFieldsKeys.value;
      let isError = false;
      let isValidating = false;
      let isDirty = false;
      let isTouched = false;
      let isChanged = false;
      let error = null;
      keys.forEach((k) => {
        const field = this.fields.get(k);
        if (!field)
          return;
        setKeyValue(this._data.values, k, field.state.value);
        setKeyValue(this._data.errors, k, field.state.error);
        setKeyValue(this._fieldStates, k, field.state);
        if (field.state.isError)
          isError = true;
        if (field.state.isValidating)
          isValidating = true;
        if (field.state.isDirty)
          isDirty = true;
        if (field.state.isTouched)
          isTouched = true;
        if (!field.state.isChanged)
          isChanged = true;
        if (field.state.error && !error) {
          error = field.state.error;
        }
      });
      virtualKeys.forEach((k) => {
        const field = this.virtualFields.get(k);
        if (!field)
          return;
        setKeyValue(this._data.virtualErrors, k, field.state.error);
        if (field.state.isError)
          isError = true;
        if (field.state.isValidating)
          isValidating = true;
        if (field.state.error && !error) {
          error = field.state.error;
        }
      });
      this._data.isError = isError;
      this._data.error = error;
      this._data.isValidating = isValidating;
      this._data.isDirty = isDirty;
      this._data.isTouched = isTouched;
      this._data.isChanged = isChanged;
    });
    this.stopValidatingWatcher = watchEffect(() => {
      const isValidating = this.state.isValidating;
      if (!isValidating) {
        this.waiters.forEach((fn) => {
          fn();
        });
      }
      this.waiters = [];
    });
  }
  unmount() {
    var _a, _b, _c;
    (_a = this.stopStateWatcher) == null ? void 0 : _a.call(this);
    (_b = this.stopStatusWatcher) == null ? void 0 : _b.call(this);
    (_c = this.stopValidatingWatcher) == null ? void 0 : _c.call(this);
    for (const name of this.fieldsKeys.value) {
      this.unregisterField(name);
    }
    for (const name of this.virtualFieldsKeys.value) {
      this.unregisterVirtualField(name);
    }
  }
  registerField(name, args = {}) {
    const { immediate = true } = args;
    const { fieldsKeys, fields } = this;
    if (fieldsKeys.value.includes(name)) {
      throw `Duplicate field <${name}>.`;
    }
    for (const k of fieldsKeys.value) {
      if (k.startsWith(`${name}.`) || name.startsWith(`${k}.`)) {
        throw `Fields can not be nested together: <${name}> <${k}>.`;
      }
    }
    const formValue = getKeyValue(this.state.values, name);
    let value = args.value;
    if (value === void 0)
      value = formValue;
    if (value === void 0)
      value = args.defaultValue;
    const defaultValue = formValue === void 0 ? args.defaultValue : formValue;
    const field = new FieldClass(this, __spreadProps(__spreadValues({}, args), {
      name,
      value,
      defaultValue
    }));
    const register = () => {
      fields.set(name, field);
      this.fieldsKeys.value.push(name);
      field.initWatcher();
    };
    if (immediate) {
      register();
      return { field, register: () => {
      } };
    }
    return { register, field };
  }
  registerVirtualField(name, args = {}) {
    const { immediate = true } = args;
    const { virtualFieldsKeys, virtualFields } = this;
    if (virtualFieldsKeys.value.includes(name)) {
      throw `Duplicate virtual field <${name}>.`;
    }
    const field = new VirtualFieldClass(this, __spreadProps(__spreadValues({}, args), { name }));
    const register = () => {
      virtualFields.set(name, field);
      this.virtualFieldsKeys.value.push(name);
    };
    if (immediate) {
      register();
      return { field, register: () => {
      } };
    }
    return { register, field };
  }
  unregisterField(name) {
    const { fields } = this;
    const field = fields.get(name);
    if (!field) {
      throw `Field not exists <${name}>.`;
    }
    field.onUnregister();
    const findIndex = this.fieldsKeys.value.indexOf(name);
    findIndex !== -1 && this.fieldsKeys.value.splice(findIndex, 1);
    delKey(this._data.values, name);
    delKey(this._data.errors, name);
    delKey(this._fieldStates, name);
    fields.delete(name);
  }
  unregisterVirtualField(name) {
    const { virtualFields } = this;
    const field = virtualFields.get(name);
    if (!field) {
      throw `Virtual field not exists <${name}>.`;
    }
    field.onUnregister();
    const findIndex = this.virtualFieldsKeys.value.indexOf(name);
    findIndex !== -1 && this.virtualFieldsKeys.value.splice(findIndex, 1);
    delKey(this._data.virtualErrors, name);
    virtualFields.delete(name);
  }
  setValue(name, value) {
    if (value === void 0)
      return;
    const field = this.fields.get(name);
    if (!field) {
      throw `Field not exists <${name}>.`;
    }
    field.onChange(value);
  }
  setTouched(name, touched = true) {
    const field = this.fields.get(name);
    if (!field) {
      throw `Field not exists <${name}>.`;
    }
    field.onTouched(touched);
  }
  submit(onSuccess, onError) {
    const callback = () => {
      this._data.isSubmitting = false;
      if (this.state.isError) {
        onError(toRaw(this.state.errors));
        return;
      }
      this._data.isSubmitted = true;
      onSuccess(toRaw(this.state.values));
    };
    this._data.submitCount++;
    this._data.isSubmitting = true;
    if (this.state.isValidating) {
      this.waiters.push(() => {
        callback();
      });
    } else {
      callback();
    }
  }
  reset(values) {
    this.waiters = [];
    this._data.values = values === void 0 ? this.defaultValues : values;
    this._data.errors = {};
    this._data.virtualErrors = {};
    this._data.error = null;
    this._data.isError = false;
    this._data.isValidating = false;
    this._data.isDirty = false;
    this._data.isTouched = false;
    this._data.isChanged = false;
    this._data.isSubmitted = false;
    this._data.isSubmitting = false;
    this._data.submitCount = 0;
    for (const [name, field] of this.fields) {
      const formValue = getKeyValue(this.state.values, name);
      field.reset(formValue);
    }
  }
}
const createForm = (args) => {
  return new FormClass(args);
};
const alpha = (value) => {
  const msg = "{{name}} is not alphabetical";
  if (typeof value !== "string")
    return msg;
  return /^[a-zA-Z]*$/.test(value) ? "" : msg;
};
const alphaNum = (value) => {
  const msg = "{{name}} must be alpha-numeric";
  if (typeof value !== "string" && typeof value !== "number")
    return msg;
  return /^[a-zA-Z0-9]*$/.test(`${value}`) ? "" : msg;
};
const decimal = (value) => {
  const msg = "{{name}} must be decimal";
  if (typeof value !== "string" && typeof value !== "number")
    return msg;
  return /^[-]?\d*(\.\d+)?$/.test(`${value}`) ? "" : msg;
};
const emailRegex = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const email = (value) => {
  const msg = "{{name}} is not a valid email address";
  if (typeof value !== "string")
    return msg;
  return emailRegex.test(value) ? "" : msg;
};
const integer = (value) => {
  const msg = "{{name}} is not an integer";
  if (typeof value !== "string" && typeof value !== "number")
    return msg;
  return /(^[0-9]*$)|(^-[0-9]+$)/.test(`${value}`) ? "" : msg;
};
const ipAddress = (value) => {
  const msg = "{{name}} is not a valid IP address";
  if (typeof value !== "string")
    return msg;
  const nibbles = value.split(".");
  return nibbles.length === 4 && nibbles.every(nibbleValid) ? "" : msg;
};
const nibbleValid = (nibble) => {
  if (nibble.length > 3 || nibble.length === 0) {
    return false;
  }
  if (nibble[0] === "0" && nibble !== "0") {
    return false;
  }
  if (!nibble.match(/^\d+$/)) {
    return false;
  }
  const numeric2 = +nibble;
  return numeric2 >= 0 && numeric2 <= 255;
};
const macAddress = (value) => {
  const msg = "{{name}} is not a valid MAC Address";
  if (typeof value !== "string")
    return msg;
  const separator = ":";
  const parts = value.split(separator);
  return (parts.length === 6 || parts.length === 8) && parts.every(hexValid) ? "" : msg;
};
const hexValid = (hex) => hex.toLowerCase().match(/^[0-9a-f]{2}$/);
const numeric = (value) => {
  const msg = "{{name}} must be numeric";
  if (typeof value !== "string" && typeof value !== "number")
    return msg;
  return /^\d*(\.\d+)?$/.test(`${value}`) ? "" : msg;
};
const validators = {
  alpha,
  alphaNum,
  decimal,
  email,
  integer,
  ipAddress,
  macAddress,
  numeric
};
const vfmInjectionKey = Symbol();
const validateRule = async (rule, v, f) => {
  if (rule.required) {
    if (!v)
      return "{{name}} is required";
  }
  if (rule.requiredLength) {
    if (typeof (v == null ? void 0 : v.length) !== "number" || v.length <= 0) {
      return "{{name}} is required";
    }
  }
  if (rule.minLength !== void 0) {
    if (typeof (v == null ? void 0 : v.length) !== "number" || v.length < rule.minLength) {
      return `{{name}}'s length cannot be less than ${rule.minLength}`;
    }
  }
  if (rule.maxLength !== void 0) {
    if (typeof (v == null ? void 0 : v.length) !== "number" || v.length > rule.maxLength) {
      return `{{name}}'s length cannot be greater than ${rule.maxLength}`;
    }
  }
  if (rule.min !== void 0) {
    if (typeof v !== "number" || v < rule.min) {
      return `{{name}} cannot be less than ${rule.min}`;
    }
  }
  if (rule.max !== void 0) {
    if (typeof v !== "number" || v > rule.max) {
      return `{{name}} cannot be greater than ${rule.max}`;
    }
  }
  if (rule.pattern) {
    if (typeof v !== "string" || !rule.pattern.test(v)) {
      return `{{name}} not match ${rule.pattern.toString()}`;
    }
  }
  for (let vld of rule.validators || []) {
    if (typeof vld === "string") {
      vld = validators[vld];
    }
    if (!vld) {
      console.warn(`validator ${vld} is not registered`);
    } else {
      const msg = await vld(v, f);
      if (msg)
        return msg;
    }
  }
  return "";
};
const useField = (props) => {
  const injectedForm = inject(vfmInjectionKey, null);
  const { form = injectedForm, name, rules = [] } = props;
  if (!form) {
    throw new Error(`No form in the injected context or props, can not use Field <${props.name}>`);
  }
  const validate = async (v, fs) => {
    let error = null;
    for (const rule of rules) {
      const errMsg = await validateRule(rule, v, fs);
      if (errMsg) {
        error = typeof errMsg === "string" ? {
          type: rule.type,
          message: errMsg
        } : errMsg;
        return error;
      }
    }
    return null;
  };
  const { register, field } = form.registerField(name, {
    value: props.value,
    defaultValue: props.defaultValue,
    validate,
    immediate: false
  });
  const state = computed(() => {
    return getKeyValue(form.fieldStates, name);
  });
  const value = computed(() => state.value ? state.value.value : field.state.value);
  const onChange = (v) => {
    var _a, _b;
    const value2 = typeof v === "object" && typeof v.currentTarget === "object" && typeof v.preventDefault === "function" && ((_a = v.currentTarget) == null ? void 0 : _a.value) !== void 0 ? (_b = v.currentTarget) == null ? void 0 : _b.value : v;
    form.setValue(name, value2);
  };
  const onBlur = () => {
    form.setTouched(name, true);
  };
  const elemRef = ref(null);
  const setRef = (el) => elemRef.value = el;
  onMounted(() => {
    register();
  });
  onUnmounted(() => {
    form.unregisterField(name);
  });
  const res = reactive({
    state,
    value,
    onChange,
    onBlur,
    setRef
  });
  return res;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    form: null,
    name: null,
    rules: null,
    value: null,
    defaultValue: null
  },
  setup(__props) {
    const props = __props;
    const slotProps = useField(props);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(unref(slotProps))));
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    form: null
  },
  setup(__props) {
    const props = __props;
    provide(vfmInjectionKey, props.form);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
export { _sfc_main$1 as Field, FieldClass, FormClass, _sfc_main as FormProvider, VirtualFieldClass, createForm, useField, validators, vfmInjectionKey };
