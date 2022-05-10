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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import { ref, reactive, watchEffect, toRaw, readonly, computed, unref, watch, onMounted, onUnmounted, defineComponent, toRefs, renderSlot, createCommentVNode, normalizeProps, guardReactiveProps } from "vue";
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
  return /^-?\d*(\.\d+)?$/.test(`${value}`) ? "" : msg;
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
const recursiveUpdateObject = (obj, newObj, deleteOldKeys = true) => {
  const oldKeys = Object.keys(obj);
  const newKeys = Object.keys(newObj);
  const delKeys = oldKeys.filter((k) => !newKeys.includes(k));
  if (deleteOldKeys) {
    delKeys.forEach((k) => {
      delete obj[k];
    });
  }
  newKeys.forEach((k) => {
    if (typeof obj[k] === "object" && !Array.isArray(obj[k]) && obj[k] !== null && typeof newObj[k] === "object" && !Array.isArray(newObj[k]) && newObj[k] !== null) {
      recursiveUpdateObject(obj[k], newObj[k], deleteOldKeys);
    } else {
      obj[k] = newObj[k];
    }
  });
};
const makeCancellablePromise = (fn) => {
  const cancelList = [];
  let resolve = null;
  const promise = fn((cancel) => {
    cancelList.push(cancel);
  });
  const resPromise = new Promise((r, j) => {
    resolve = r;
    promise.then(r, j);
  });
  resPromise.cancel = () => {
    resolve == null ? void 0 : resolve("");
    cancelList.forEach((cancel) => cancel());
  };
  return resPromise;
};
const AllPropType = [String, Number, Boolean, Symbol, Array, Object];
const validateRule$1 = (rule, v, deps) => {
  return makeCancellablePromise(async (onCancel) => {
    if (rule.required) {
      if (!v && v !== 0)
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
      if (typeof v !== "string" && typeof v !== "number" || !rule.pattern.test(`${v}`)) {
        return `{{name}} not match ${rule.pattern.toString()}`;
      }
    }
    for (const str of Object.keys(validators)) {
      if (rule[str] === true) {
        const vld = validators[str];
        const p = vld(v, deps);
        if (typeof p === "object" && typeof p.cancel === "function") {
          onCancel(() => {
            var _a;
            return (_a = p.cancel) == null ? void 0 : _a.call(p);
          });
        }
        const msg = await p;
        if (msg)
          return msg;
      }
    }
    if (rule.validator) {
      const p = rule.validator(v, deps);
      if (typeof p === "object" && typeof p.cancel === "function") {
        onCancel(() => {
          var _a;
          return (_a = p.cancel) == null ? void 0 : _a.call(p);
        });
      }
      const msg = await p;
      if (msg)
        return msg;
    }
    return "";
  });
};
class FieldClass {
  constructor(form, args) {
    this.rules = ref([]);
    this.deps = null;
    this.validateCount = 0;
    this.transform = null;
    this.isEqual = null;
    this.focusFn = null;
    this.stopValidateWatcher = null;
    this.stopDirtyWatcher = null;
    this.isRegistered = false;
    this.isInited = false;
    this.runInAction = (fn) => {
      fn();
    };
    const { immediate = true } = args;
    this.form = form;
    this.name = args.name;
    this.rules.value = args.rules || [];
    this.deps = args.deps || null;
    this.transform = args.transform || null;
    this.isEqual = args.isEqual || null;
    this.focusFn = args.onFocus || null;
    this.state = reactive({
      error: null,
      isError: false,
      isValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false
    });
    const validate = async (value, deps, rules) => {
      const transform = this.transform;
      return await makeCancellablePromise(async (onCancel) => {
        for (const rule of rules) {
          const promise = validateRule$1(rule, transform && value !== void 0 ? transform(value) : value, deps);
          onCancel(() => {
            var _a;
            return (_a = promise.cancel) == null ? void 0 : _a.call(promise);
          });
          const errMsg = await promise;
          let error = null;
          if (errMsg) {
            error = typeof errMsg === "string" ? {
              type: rule.type,
              message: errMsg
            } : errMsg;
            error.message = error.message.replace(/\{\{name\}\}/g, this.name);
            if (rule.message !== void 0)
              error.message = rule.message.replace(/\{\{name\}\}/g, this.name);
            return error;
          }
        }
        return null;
      });
    };
    this.validate = validate;
    if (immediate) {
      this.onRegister();
    }
  }
  getValue() {
    return getKeyValue(this.form.state.values, this.name);
  }
  getDefaultValue() {
    return getKeyValue(this.form.state.defaultValues, this.name);
  }
  update(args = {}) {
    if (args.rules) {
      this.rules.value = args.rules;
    }
  }
  initWatcher() {
    if (this.isInited)
      return;
    this.stopValidateWatcher = watchEffect(async (onCleanup) => {
      var _a;
      this.validateCount++;
      const count = this.validateCount;
      const value = this.getValue();
      const deps = (_a = this.deps) == null ? void 0 : _a.call(this);
      const rules = this.rules.value;
      const err = await Promise.resolve().then(() => {
        const promise = this.validate(value, deps, rules);
        onCleanup(() => {
          var _a2;
          return (_a2 = promise.cancel) == null ? void 0 : _a2.call(promise);
        });
        return promise;
      });
      if (count !== this.validateCount)
        return;
      this.runInAction(() => {
        this.state.isValidating = false;
        const hasError = !!(err == null ? void 0 : err.message);
        if (hasError) {
          if (!this.state.error)
            this.state.error = { message: "" };
          this.state.error.message = (err == null ? void 0 : err.message) || "";
          this.state.error.type = err == null ? void 0 : err.type;
        } else {
          this.state.error = null;
        }
        this.state.isError = hasError;
      });
    });
    this.stopDirtyWatcher = watchEffect(() => {
      const value = this.getValue();
      const defaultValue = this.getDefaultValue();
      this.runInAction(() => {
        const isEqual = this.isEqual || ((v, d) => v === d);
        this.state.isDirty = !isEqual(toRaw(value), toRaw(defaultValue));
      });
    });
    this.isInited = true;
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
    this.isInited = false;
  }
  onTouched(touched = true) {
    this.runInAction(() => {
      this.state.isTouched = touched;
    });
  }
  onChanged(changed = true) {
    this.state.isChanged = changed;
  }
  onFocus() {
    var _a;
    (_a = this.focusFn) == null ? void 0 : _a.call(this);
  }
  reset(args = {}) {
    var _a, _b;
    this.validateCount++;
    (_a = this.stopValidateWatcher) == null ? void 0 : _a.call(this);
    (_b = this.stopDirtyWatcher) == null ? void 0 : _b.call(this);
    this.runInAction(() => {
      const { keepChanged = false, keepTouched = false } = args;
      this.state.error = null;
      this.state.isError = false;
      this.state.isValidating = false;
      this.state.isDirty = false;
      this.state.isTouched = keepTouched ? this.state.isTouched : false;
      this.state.isChanged = keepChanged ? this.state.isChanged : false;
    });
    this.isInited = false;
    this.initWatcher();
  }
}
const validateRule = (rule, v) => {
  return makeCancellablePromise(async (onCancel) => {
    if (rule.required) {
      if (!v && v !== 0)
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
      if (typeof v !== "string" && typeof v !== "number" || !rule.pattern.test(`${v}`)) {
        return `{{name}} not match ${rule.pattern.toString()}`;
      }
    }
    for (const str of Object.keys(validators)) {
      if (rule[str] === true) {
        const vld = validators[str];
        const p = vld(v);
        if (typeof p === "object" && typeof p.cancel === "function") {
          onCancel(() => {
            var _a;
            return (_a = p.cancel) == null ? void 0 : _a.call(p);
          });
        }
        const msg = await p;
        if (msg)
          return msg;
      }
    }
    if (rule.validator) {
      const p = rule.validator(v);
      if (typeof p === "object" && typeof p.cancel === "function") {
        onCancel(() => {
          var _a;
          return (_a = p.cancel) == null ? void 0 : _a.call(p);
        });
      }
      const msg = await p;
      if (msg)
        return msg;
    }
    return "";
  });
};
class VirtualFieldClass {
  constructor(form, args) {
    this.name = "";
    this.rules = ref([]);
    this.validateCount = 0;
    this.stopValidateWatcher = null;
    this.isRegistered = false;
    this.isInited = false;
    this.runInAction = (fn) => {
      fn();
    };
    const { immediate = true } = args;
    this.form = form;
    this.name = args.name;
    this.value = args.value;
    this.rules.value = args.rules || [];
    this.state = reactive({
      name: this.name,
      error: null,
      isError: false,
      isValidating: false
    });
    const validate = (value, rules) => {
      return makeCancellablePromise(async (onCancel) => {
        let error = null;
        for (const rule of rules) {
          const promise = validateRule(rule, value);
          onCancel(() => {
            var _a;
            return (_a = promise.cancel) == null ? void 0 : _a.call(promise);
          });
          const errMsg = await promise;
          if (errMsg) {
            error = typeof errMsg === "string" ? {
              type: rule.type,
              message: errMsg
            } : errMsg;
            error.message = error.message.replace(/\{\{name\}\}/g, this.name);
            if (rule.message !== void 0)
              error.message = rule.message.replace(/\{\{name\}\}/g, this.name);
            return error;
          }
        }
        return null;
      });
    };
    this.validate = validate;
    if (immediate) {
      this.initWatcher();
    }
  }
  update(args) {
    if (args.rules) {
      this.rules.value = args.rules;
    }
    if (args.value) {
      this.value = args.value;
    }
  }
  initWatcher() {
    if (this.isInited)
      return;
    this.stopValidateWatcher = watchEffect(async (onCleanup) => {
      this.validateCount++;
      const count = this.validateCount;
      this.runInAction(() => {
        this.state.isValidating = true;
      });
      const value = this.value();
      const rules = this.rules.value;
      const err = await Promise.resolve().then(() => {
        const promise = this.validate(value, rules);
        onCleanup(() => {
          var _a;
          return (_a = promise.cancel) == null ? void 0 : _a.call(promise);
        });
        return promise;
      });
      if (count !== this.validateCount)
        return;
      this.runInAction(() => {
        this.state.isValidating = false;
        const hasError = !!(err == null ? void 0 : err.message);
        if (hasError) {
          if (!this.state.error)
            this.state.error = { message: "" };
          this.state.error.message = (err == null ? void 0 : err.message) || "";
          this.state.error.type = err == null ? void 0 : err.type;
        } else {
          this.state.error = null;
        }
        this.state.isError = hasError;
      });
    });
    this.isInited = true;
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
    this.isRegistered = false;
    this.isInited = false;
  }
}
class FormClass {
  constructor(args) {
    this.touchType = "BLUR";
    this._publicState = null;
    this.fieldsKeys = ref([]);
    this.fields = /* @__PURE__ */ new Map();
    this.virtualFieldsKeys = ref([]);
    this.virtualFields = /* @__PURE__ */ new Map();
    this.cacheFields = [];
    this.cacheVirtualFields = [];
    this.stopStateWatcher = null;
    this.stopStatusWatcher = null;
    this.stopValidatingWatcher = null;
    this.waiters = [];
    this.subscribers = [];
    this.isMounted = false;
    this.readonly = false;
    this.submitFlag = 0;
    this.runInAction = (fn) => {
      fn();
    };
    const { initValues = {} } = args;
    this.initValues = toRaw(initValues);
    this.defaultValues = toRaw(args.defaultValues);
    this._state = reactive({
      values: initValues,
      defaultValues: args.defaultValues || initValues,
      fieldErrors: {},
      virtualErrors: {},
      error: null,
      fieldError: null,
      virtualError: null,
      isError: false,
      isFieldError: false,
      isVirtualError: false,
      isValidating: false,
      isFieldValidating: false,
      isVirtualValidating: false,
      isDirty: false,
      isTouched: false,
      isChanged: false,
      isSubmitted: false,
      isSubmitting: false,
      submitCount: 0
    });
    this.touchType = args.touchType || "BLUR";
    this.readonly = args.readonly || false;
  }
  get state() {
    if (!this.readonly)
      return this._state;
    if (!this._publicState) {
      this._publicState = readonly(this._state);
    }
    return this._publicState;
  }
  mount() {
    if (this.isMounted)
      return;
    const { cacheFields, cacheVirtualFields } = this;
    this.fieldsKeys.value.push(...cacheFields);
    this.virtualFieldsKeys.value.push(...cacheVirtualFields);
    for (const k of cacheFields) {
      const filed = this.fields.get(k);
      filed == null ? void 0 : filed.initWatcher();
    }
    for (const k of cacheVirtualFields) {
      const filed = this.virtualFields.get(k);
      filed == null ? void 0 : filed.initWatcher();
    }
    this.cacheFields = [];
    this.cacheVirtualFields = [];
    this.stopStateWatcher = watchEffect(() => {
      const keys = this.fieldsKeys.value;
      const virtualKeys = this.virtualFieldsKeys.value;
      let isFieldError = false;
      let isVirtualError = false;
      let isFieldValidating = false;
      let isVirtualValidating = false;
      let isDirty = false;
      let isTouched = false;
      let isChanged = false;
      let fieldError = null;
      let virtualError = null;
      const updateFieldErrors = {};
      const updateVirtualErrors = {};
      keys.forEach((k) => {
        const field = this.fields.get(k);
        if (!field)
          return;
        const fdError = field.state.error;
        const fdStateIsError = field.state.isError;
        const fdIsValidating = field.state.isValidating;
        const fdIsDirty = field.state.isDirty;
        const fdIsTouched = field.state.isTouched;
        const fdIsChanged = field.state.isChanged;
        setKeyValue(updateFieldErrors, k, fdError);
        if (fdStateIsError)
          isFieldError = true;
        if (fdIsValidating)
          isFieldValidating = true;
        if (fdIsDirty)
          isDirty = true;
        if (fdIsTouched)
          isTouched = true;
        if (fdIsChanged)
          isChanged = true;
        if (fdError && !fieldError) {
          fieldError = fdError;
        }
      });
      virtualKeys.forEach((k) => {
        const field = this.virtualFields.get(k);
        if (!field)
          return;
        const fdError = field.state.error;
        const fdIsError = field.state.isError;
        const fdIsValidating = field.state.isValidating;
        setKeyValue(updateVirtualErrors, k, fdError);
        if (fdIsError)
          isVirtualError = true;
        if (fdIsValidating)
          isVirtualValidating = true;
        if (fdError && !virtualError) {
          virtualError = fdError;
        }
      });
      this.runInAction(() => {
        recursiveUpdateObject(this._state.fieldErrors, updateFieldErrors);
        recursiveUpdateObject(this._state.virtualErrors, updateVirtualErrors);
        this._state.isFieldError = isFieldError;
        this._state.isVirtualError = isVirtualError;
        this._state.isError = isFieldError || isVirtualError;
        this._state.fieldError = fieldError;
        this._state.virtualError = virtualError;
        this._state.error = fieldError || virtualError;
        this._state.isFieldValidating = isFieldValidating;
        this._state.isVirtualValidating = isVirtualValidating;
        this._state.isValidating = isFieldValidating || isVirtualValidating;
        this._state.isDirty = isDirty;
        this._state.isTouched = isTouched;
        this._state.isChanged = isChanged;
      });
    });
    this.stopValidatingWatcher = watchEffect(() => {
      const isValidating = this._state.isValidating;
      if (!isValidating) {
        this.waiters.forEach((fn) => {
          fn();
        });
      }
      this.waiters = [];
    });
    this.isMounted = true;
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
    for (const name of this.cacheFields) {
      this.unregisterField(name);
    }
    for (const name of this.cacheVirtualFields) {
      this.unregisterVirtualField(name);
    }
    this.isMounted = false;
  }
  registerField(name, args = {}) {
    const { immediate = true } = args;
    const { fieldsKeys, fields } = this;
    if (fieldsKeys.value.includes(name)) {
      console.warn(`Duplicate field <${name}>.`);
      return {
        field: this.fields.get(name),
        register: () => {
        }
      };
    }
    for (const k of fieldsKeys.value) {
      if (k.startsWith(`${name}.`) || name.startsWith(`${k}.`)) {
        console.warn(`Fields can not be nested together: <${name}> <${k}>. If you want do this, please use [registerVirtualField]`);
        return {
          field: this.fields.get(name),
          register: () => {
          }
        };
      }
    }
    const field = new FieldClass(this, __spreadProps(__spreadValues({}, args), {
      name
    }));
    const register = () => {
      fields.set(name, field);
      this.runInAction(() => {
        if (this.isMounted) {
          this.fieldsKeys.value.push(name);
          field.initWatcher();
        } else {
          this.cacheFields.push(name);
        }
      });
    };
    if (immediate) {
      register();
      return { field, register: () => {
      } };
    }
    return { register, field };
  }
  registerVirtualField(name, args) {
    const { immediate = true } = args;
    const { virtualFieldsKeys, virtualFields } = this;
    if (virtualFieldsKeys.value.includes(name)) {
      console.warn(`Duplicate virtual field <${name}>.`);
      return {
        field: this.virtualFields.get(name),
        register: () => {
        }
      };
    }
    const field = new VirtualFieldClass(this, __spreadProps(__spreadValues({}, args), {
      name
    }));
    const register = () => {
      virtualFields.set(name, field);
      this.runInAction(() => {
        if (this.isMounted) {
          this.virtualFieldsKeys.value.push(name);
          field.initWatcher();
        } else {
          this.cacheVirtualFields.push(name);
        }
      });
    };
    if (immediate) {
      register();
      return { field, register: () => {
      } };
    }
    return { register, field };
  }
  unregisterField(name, args = {}) {
    const { removeValue = false } = args;
    const { fields } = this;
    const field = fields.get(name);
    if (!field)
      return;
    field.onUnregister();
    if (this.isMounted) {
      const findIndex = this.fieldsKeys.value.indexOf(name);
      findIndex !== -1 && this.fieldsKeys.value.splice(findIndex, 1);
    } else {
      const findIndex = this.cacheFields.indexOf(name);
      findIndex !== -1 && this.cacheFields.splice(findIndex, 1);
    }
    this.runInAction(() => {
      removeValue && delKey(this._state.values, name);
      removeValue && delKey(this._state.defaultValues, name);
      delKey(this._state.fieldErrors, name);
    });
    fields.delete(name);
  }
  unregisterVirtualField(name) {
    const { virtualFields } = this;
    const field = virtualFields.get(name);
    if (!field)
      return;
    field.onUnregister();
    if (this.isMounted) {
      const findIndex = this.virtualFieldsKeys.value.indexOf(name);
      findIndex !== -1 && this.virtualFieldsKeys.value.splice(findIndex, 1);
    } else {
      const findIndex = this.cacheVirtualFields.indexOf(name);
      findIndex !== -1 && this.cacheVirtualFields.splice(findIndex, 1);
    }
    this.runInAction(() => {
      delKey(this._state.virtualErrors, name);
    });
    virtualFields.delete(name);
  }
  setPathValue(name, value) {
    setKeyValue(this._state.values, name, value);
    this.notify("UPDATE", name);
  }
  setValue(name, value) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    const lastValue = toRaw(getKeyValue(this._state.values, name));
    const changed = lastValue !== toRaw(value);
    this.setPathValue(name, value);
    field.onChanged(field.state.isChanged || changed);
  }
  deletePathValue(name) {
    delKey(this._state.values, name);
    this.notify("DELETE", name);
  }
  deleteValue(name) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    this.deletePathValue(name);
  }
  getPathValueRef(name) {
    return computed(() => {
      return getKeyValue(this.state.values, name);
    });
  }
  getValueRef(name) {
    return computed(() => {
      if (!this.fieldsKeys.value.includes(name)) {
        console.warn(`Field not exists <${name}>.`);
        return void 0;
      }
      return getKeyValue(this.state.values, name);
    });
  }
  getPathValue(name) {
    return getKeyValue(this.state.values, name);
  }
  getValue(name) {
    if (!this.fieldsKeys.value.includes(name)) {
      console.warn(`Field not exists <${name}>.`);
      return void 0;
    }
    return getKeyValue(this.state.values, name);
  }
  setTouched(name, touched = true) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    field.onTouched(touched);
  }
  setFocus(name) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    field.onFocus();
  }
  submit(onSuccess, onError) {
    const flag = this.submitFlag;
    const callback = () => {
      if (flag !== this.submitFlag)
        return;
      this.runInAction(() => {
        this._state.isSubmitting = false;
      });
      if (this._state.isError) {
        onError(toRaw(this._state.error));
        return;
      }
      this.runInAction(() => {
        this._state.isSubmitted = true;
      });
      onSuccess(toRaw(this._state.values));
    };
    this.runInAction(() => {
      this._state.submitCount++;
      this._state.isSubmitting = true;
    });
    if (this._state.isValidating) {
      this.waiters.push(() => {
        callback();
      });
    } else {
      callback();
    }
  }
  reset(args = {}) {
    this.waiters = [];
    this.runInAction(() => {
      if (args.values) {
        this._state.values = toRaw(args.values);
        this.initValues = toRaw(args.values);
      } else if (!args.keepValues) {
        this._state.values = this.initValues;
      }
      if (args.defaultValues) {
        this._state.defaultValues = toRaw(args.defaultValues);
        this.defaultValues = args.defaultValues;
      } else if (!args.keepDefaultValues) {
        this._state.defaultValues = this.initValues || this.defaultValues;
      }
      this.submitFlag++;
      this._state.isSubmitting = false;
      this._state.submitCount = args.keepSubmitCount ? this._state.submitCount : 0;
      this._state.isSubmitted = args.keepIsSubmitted ? this._state.isSubmitted : false;
    });
    for (const [, field] of this.fields) {
      field.reset({
        keepTouched: args.keepTouched,
        keepChanged: args.keepChanged
      });
    }
    this.notify("RESET");
  }
  resetField(name, args = {}) {
    const field = this.fields.get(name);
    if (!field) {
      console.warn(`Field not exists <${name}>.`);
      return;
    }
    if ("defaultValue" in args) {
      setKeyValue(this._state.defaultValues, name, toRaw(args.defaultValue));
    }
    if ("value" in args) {
      setKeyValue(this._state.values, name, toRaw(args.value));
    } else if (!args.keepValue) {
      const v = getKeyValue(this._state.defaultValues, name);
      setKeyValue(this._state.values, name, toRaw(v));
    }
    field.reset({
      keepTouched: args.keepTouched,
      keepChanged: args.keepChanged
    });
  }
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
    const unsubscribe = () => {
      const index = this.subscribers.indexOf(subscriber);
      if (index !== -1)
        this.subscribers.splice(index, 1);
    };
    return unsubscribe;
  }
  notify(type, name) {
    this.subscribers.forEach((subscriber) => {
      subscriber(type, name);
    });
  }
  fieldState(name) {
    if (!this.fieldsKeys.value.includes(name))
      return null;
    const field = this.fields.get(name);
    if (!field)
      return null;
    return field.state;
  }
  virtualFieldState(name) {
    if (!this.virtualFieldsKeys.value.includes(name))
      return null;
    const field = this.virtualFields.get(name);
    if (!field)
      return null;
    return field.state;
  }
  isDirty(name) {
    var _a;
    return ((_a = this.fieldState(name)) == null ? void 0 : _a.isDirty) || false;
  }
  isTouched(name) {
    var _a;
    return ((_a = this.fieldState(name)) == null ? void 0 : _a.isTouched) || false;
  }
  isChanged(name) {
    var _a;
    return ((_a = this.fieldState(name)) == null ? void 0 : _a.isChanged) || false;
  }
  isError(name) {
    var _a;
    return ((_a = this.fieldState(name)) == null ? void 0 : _a.isError) || false;
  }
  fieldError(name) {
    var _a;
    return ((_a = this.fieldState(name)) == null ? void 0 : _a.error) || null;
  }
  isVirtualError(name) {
    var _a;
    return ((_a = this.virtualFieldState(name)) == null ? void 0 : _a.isError) || false;
  }
  virtualFieldError(name) {
    var _a;
    return ((_a = this.virtualFieldState(name)) == null ? void 0 : _a.error) || null;
  }
  arrayAppend(name, v) {
    const arr = getKeyValue(this._state.values, name);
    if (!Array.isArray(arr))
      return;
    arr.push(v);
    this.notify("UPDATE", name);
  }
  arrayPrepend(name, v) {
    const arr = getKeyValue(this._state.values, name);
    if (!Array.isArray(arr))
      return;
    arr.unshift(v);
    this.notify("UPDATE", name);
  }
  arrayInsert(name, index, v) {
    const arr = getKeyValue(this._state.values, name);
    if (!Array.isArray(arr))
      return;
    arr.splice(index, 0, v);
    this.notify("UPDATE", name);
  }
  arraySwap(name, fromIndex, toIndex) {
    const arr = getKeyValue(this._state.values, name);
    if (!Array.isArray(arr))
      return;
    const tmp = arr[toIndex];
    arr[toIndex] = arr[fromIndex];
    arr[fromIndex] = tmp;
    this.notify("UPDATE", name);
  }
  arrayMove(name, fromIndex, toIndex) {
    const arr = getKeyValue(this._state.values, name);
    if (!Array.isArray(arr))
      return;
    arr.splice(toIndex, 0, arr[fromIndex]);
    arr.splice(toIndex > fromIndex ? fromIndex : fromIndex + 1);
    this.notify("UPDATE", name);
  }
  arrayUpdate(name, index, v) {
    const arr = getKeyValue(this._state.values, name);
    if (!Array.isArray(arr))
      return;
    arr.splice(index, 1, v);
    this.notify("UPDATE", name);
  }
  arrayRemove(name, index) {
    const arr = getKeyValue(this._state.values, name);
    if (!Array.isArray(arr))
      return;
    arr.splice(index, 1);
    this.notify("UPDATE", name);
  }
  arrayReplace(name, v) {
    const arr = getKeyValue(this._state.values, name);
    if (!Array.isArray(arr))
      return;
    setKeyValue(this._state.values, name, v);
    this.notify("UPDATE", name);
  }
}
const createForm = (args) => {
  return new FormClass(args);
};
const useField = (props) => {
  const { form, name } = props;
  const touchType = computed(() => {
    if (props.touchType)
      return unref(props.touchType);
    return form.touchType || "BLUR";
  });
  const mounted = ref(false);
  const elemRef = ref(null);
  const setRef = (el) => elemRef.value = el;
  const onChange = (v) => {
    var _a, _b;
    const value = typeof v === "object" && typeof v.currentTarget === "object" && ((_a = v.currentTarget) == null ? void 0 : _a.value) !== void 0 ? (_b = v.currentTarget) == null ? void 0 : _b.value : v;
    form.setValue(unref(name), value);
  };
  const onBlur = () => {
    touchType.value === "BLUR" && form.setTouched(unref(name), true);
  };
  const onFocus = () => {
    touchType.value === "FOCUS" && form.setTouched(unref(name), true);
  };
  let { register, field } = form.registerField(unref(name), {
    rules: unref(props.rules),
    transform: props.transform,
    deps: props.deps,
    immediate: false,
    onFocus: () => {
      var _a, _b;
      (_b = (_a = elemRef.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
    }
  });
  const model = ref(getKeyValue(form.state.values, unref(props.name)));
  const fieldState = ref(field.state);
  const stopWatch = watch(() => {
    return [unref(props.name), unref(props.rules)];
  }, ([n, rules], [ln]) => {
    form.unregisterField(ln);
    const fs = form.registerField(n, {
      rules,
      transform: props.transform,
      deps: props.deps,
      isEqual: props.isEqual,
      immediate: mounted.value,
      onFocus: () => {
        var _a, _b;
        (_b = (_a = elemRef.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
      }
    });
    register = fs.register;
    field = fs.field;
    fieldState.value = fs.field.state;
    model.value = getKeyValue(form.state.values, unref(props.name));
  });
  const stopWatchValue = watch(() => getKeyValue(form.state.values, unref(props.name)), (v) => {
    model.value = v;
  });
  const stopWatchModel = watch(() => model.value, (v) => {
    const value = getKeyValue(form.state.values, unref(props.name));
    if (toRaw(value) !== toRaw(v)) {
      model.value = v;
    }
  });
  onMounted(() => {
    register == null ? void 0 : register();
    mounted.value = true;
  });
  onUnmounted(() => {
    form.unregisterField(unref(name));
    stopWatch();
    stopWatchValue();
    stopWatchModel();
    elemRef.value = null;
  });
  const res = reactive({
    get value() {
      return model.value;
    },
    onChange,
    onBlur,
    onFocus,
    ref: setRef
  });
  return [
    res,
    model,
    {
      mounted
    }
  ];
};
const useVirtualField = (props) => {
  const { form, name } = props;
  const mounted = ref(false);
  let { register, field } = form.registerVirtualField(unref(name), {
    value: props.value,
    rules: unref(props.rules),
    immediate: false
  });
  const fieldState = ref(field.state);
  const stopWatch = watch(() => unref(props.name), (n, ln) => {
    form.unregisterVirtualField(ln);
    const fs = form.registerVirtualField(unref(name), {
      value: props.value,
      rules: unref(props.rules),
      immediate: mounted.value
    });
    register = fs.register;
    field = fs.field;
    fieldState.value = fs.field.state;
  });
  onMounted(() => {
    register();
    mounted.value = true;
  });
  onUnmounted(() => {
    form.unregisterVirtualField(unref(name));
    stopWatch();
  });
  return {
    mounted
  };
};
const createFieldArray = (form, path) => {
  let fieldId = 0;
  let p = form.getPathValue(path);
  if (!Array.isArray(p)) {
    form.setPathValue(path, []);
    p = form.getPathValue(path);
  }
  const initArr = p;
  const initFields = initArr.map(() => {
    const id = `${fieldId++}`;
    return {
      id
    };
  });
  let lastIds = initFields.map((v) => v.id);
  const fields = ref(initFields);
  const usedFlag = {};
  const stopWatch = watch(() => {
    const newArr = form.getPathValue(path);
    return newArr.map((item) => toRaw(item));
  }, (newArr, oldArr) => {
    const arr = [...oldArr];
    const newFields = newArr.map((item) => {
      const v = toRaw(item);
      const oIndex = arr.findIndex((o) => toRaw(o) === v);
      let id = "";
      if (oIndex === -1) {
        id = `${fieldId++}`;
      } else {
        id = lastIds[oIndex];
        arr[oIndex] = usedFlag;
      }
      return { id: `${id}` };
    });
    fields.value = newFields;
    lastIds = newFields.map((v) => v.id);
  });
  const append = (v) => {
    form.arrayAppend(path, v);
  };
  const prepend = (v) => {
    form.arrayPrepend(path, v);
  };
  const insert = (id, v) => {
    const index = fields.value.findIndex((item) => item.id === id);
    if (index === -1)
      return;
    form.arrayInsert(path, index, v);
  };
  const swap = (from, to) => {
    const fromIndex = fields.value.findIndex((item) => item.id === from);
    const toIndex = fields.value.findIndex((item) => item.id === to);
    if (fromIndex === -1 || toIndex === -1)
      return;
    form.arraySwap(path, fromIndex, toIndex);
  };
  const move = (from, to) => {
    const fromIndex = fields.value.findIndex((item) => item.id === from);
    const toIndex = fields.value.findIndex((item) => item.id === to);
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex)
      return;
    form.arrayMove(path, fromIndex, toIndex);
  };
  const update = (id, v) => {
    const index = fields.value.findIndex((item) => item.id === id);
    if (index === -1)
      return;
    form.arrayUpdate(path, index, v);
  };
  const replace = (values) => {
    lastIds = [];
    form.arrayReplace(path, values);
  };
  const remove = (id) => {
    const index = fields.value.findIndex((item) => item.id === id);
    if (index === -1)
      return;
    form.arrayRemove(path, index);
  };
  return {
    onCleanup: () => {
      stopWatch();
    },
    get fieldsValue() {
      return fields.value;
    },
    fields,
    prepend,
    append,
    insert,
    swap,
    move,
    replace,
    remove,
    update
  };
};
const useFieldArray = (form, path) => {
  const _a = createFieldArray(form, path), { onCleanup } = _a, rest = __objRest(_a, ["onCleanup"]);
  onUnmounted(() => onCleanup());
  return rest;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  props: {
    form: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rules: {
      type: Array,
      default: () => []
    },
    deps: {
      type: Function,
      default: void 0
    },
    value: {
      type: AllPropType,
      default: void 0
    },
    defaultValue: {
      type: AllPropType,
      default: void 0
    },
    transform: {
      type: Function,
      default: void 0
    },
    touchType: {
      type: String,
      default: "BLUR"
    }
  },
  setup(__props) {
    const props = __props;
    const _a = toRefs(props), { form, rules, transform, name, deps } = _a, rest = __objRest(_a, ["form", "rules", "transform", "name", "deps"]);
    const [slotProps, , { mounted }] = useField(__spreadValues({
      form: form.value,
      rules: rules.value,
      transform: transform == null ? void 0 : transform.value,
      deps: deps == null ? void 0 : deps.value,
      name
    }, rest));
    return (_ctx, _cache) => {
      return unref(mounted) ? renderSlot(_ctx.$slots, "default", {
        key: 0,
        field: unref(slotProps)
      }) : createCommentVNode("", true);
    };
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    form: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const _a = useFieldArray(props.form, props.name), { fieldsValue } = _a, rest = __objRest(_a, ["fieldsValue"]);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(rest)));
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    form: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: Function,
      required: true
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const { name, form, value, rules } = toRefs(props);
    const { mounted } = useVirtualField({
      form: form.value,
      rules: rules.value,
      value: value.value,
      name
    });
    return (_ctx, _cache) => {
      return unref(mounted) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("", true);
    };
  }
});
export { _sfc_main$2 as Field, _sfc_main$1 as FieldArray, FieldClass, FormClass, _sfc_main as VirtualField, VirtualFieldClass, createFieldArray, createForm, useField, useFieldArray, useVirtualField, validators };
