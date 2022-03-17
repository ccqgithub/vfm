'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

class Field {
    constructor(form, args) {
        this.data = null;
        // 验证函数
        this.validate = null;
        this.validateCount = 0;
        // watcher
        this.stopValidateWatcher = null;
        this.stopDirtyWatcher = null;
        this.form = form;
        this.name = args.name;
        this._data = vue.reactive({
            name: this.name,
            value: args.value === undefined ? args.defaultValue : args.value,
            defaultValue: args.defaultValue,
            error: { message: '' },
            isError: false,
            isValidating: false,
            isDirty: false,
            isTouched: false,
            isChanged: false
        });
        this.data = vue.readonly(this._data);
        this.validate = args.validate || null;
        this.initWatcher();
    }
    get state() {
        if (!this.data)
            this.data = vue.readonly(this._data);
        return this.data;
    }
    initWatcher() {
        let canCelLastValidate = null;
        // auto validate
        this.stopValidateWatcher = vue.watchEffect(() => __awaiter(this, void 0, void 0, function* () {
            this.validateCount++;
            const value = this.state.value;
            const formState = this.form.state;
            const count = this.validateCount;
            this._data.isValidating = true;
            canCelLastValidate === null || canCelLastValidate === void 0 ? void 0 : canCelLastValidate();
            canCelLastValidate = null;
            let err = null;
            if (this.validate) {
                const promise = this.validate(value, formState);
                if (promise instanceof Promise) {
                    canCelLastValidate = promise.cancel || null;
                }
                err = (yield promise) || null;
            }
            if (count !== this.validateCount)
                return;
            this._data.isValidating = false;
            const hasError = !!(err === null || err === void 0 ? void 0 : err.message);
            if (hasError) {
                if (!this._data.error)
                    this._data.error = { message: '' };
                this._data.error.message = (err === null || err === void 0 ? void 0 : err.message) || '';
                this._data.error.type = (err === null || err === void 0 ? void 0 : err.type) || 'default';
                this._data.error.types = err === null || err === void 0 ? void 0 : err.types;
            }
            else {
                this._data.error = null;
            }
            this._data.isError = hasError;
        }));
        // dirty watch
        this.stopDirtyWatcher = vue.watchEffect(() => {
            this._data.isDirty = this._data.value !== this._data.defaultValue;
        });
    }
    onUnregister() {
        var _a, _b;
        (_a = this.stopValidateWatcher) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.stopDirtyWatcher) === null || _b === void 0 ? void 0 : _b.call(this);
    }
    onChange(value) {
        if (value === undefined)
            return;
        const isChanged = this.state.value !== value;
        this._data.value = value;
        this._data.isChanged = this._data.isChanged || isChanged;
    }
    onTouched() {
        this._data.isTouched = true;
    }
    reset(resetValue) {
        var _a, _b;
        this.validateCount++;
        (_a = this.stopValidateWatcher) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.stopDirtyWatcher) === null || _b === void 0 ? void 0 : _b.call(this);
        if (resetValue !== undefined)
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
// virtual field
class VirtualField {
    constructor(form, args) {
        this.name = '';
        this.data = null;
        // 验证函数
        this.validate = null;
        this.validateCount = 0;
        // watcher
        this.stopValidateWatcher = null;
        this.form = form;
        this.name = args.name;
        this._data = vue.reactive({
            name: this.name,
            error: { message: '' },
            isError: false,
            isValidating: false
        });
        this.data = vue.readonly(this._data);
        this.validate = args.validate || null;
        this.initWatcher();
    }
    get state() {
        if (!this.data)
            this.data = vue.readonly(this._data);
        return this.data;
    }
    initWatcher() {
        let canCelLastValidate = null;
        // auto validate
        this.stopValidateWatcher = vue.watchEffect(() => __awaiter(this, void 0, void 0, function* () {
            this.validateCount++;
            const formState = this.form.state;
            const count = this.validateCount;
            this._data.isValidating = true;
            canCelLastValidate === null || canCelLastValidate === void 0 ? void 0 : canCelLastValidate();
            canCelLastValidate = null;
            let err = null;
            if (this.validate) {
                const promise = this.validate(formState);
                if (promise instanceof Promise) {
                    canCelLastValidate = promise.cancel || null;
                }
                err = (yield promise) || null;
            }
            if (count !== this.validateCount)
                return;
            this._data.isValidating = false;
            const hasError = !!(err === null || err === void 0 ? void 0 : err.message);
            if (hasError) {
                if (!this._data.error)
                    this._data.error = { message: '' };
                this._data.error.message = (err === null || err === void 0 ? void 0 : err.message) || '';
                this._data.error.type = (err === null || err === void 0 ? void 0 : err.type) || 'default';
                this._data.error.types = err === null || err === void 0 ? void 0 : err.types;
            }
            else {
                this._data.error = null;
            }
            this._data.isError = hasError;
        }));
    }
    onUnregister() {
        var _a;
        (_a = this.stopValidateWatcher) === null || _a === void 0 ? void 0 : _a.call(this);
    }
}

const setKeyValue = (data, keyPath, value) => {
    const arr = keyPath.split('.');
    let v = data;
    while (arr.length) {
        const k = arr.shift();
        if (arr.length === 0) {
            v[k] = value;
        }
        else if (typeof v[k] !== 'object' || v[k] === null) {
            v[k] = /^\d+$/.test(k) ? [] : {};
        }
        v = v[k];
    }
};
const getKeyValue = (data, keyPath) => {
    const arr = keyPath.split('.');
    let v = data;
    while (arr.length && v) {
        const k = arr.shift();
        v = typeof v === 'object' && v !== null ? v[k] : undefined;
    }
    return arr.length === 0 ? v : undefined;
};
const delKey = (data, keyPath) => {
    const arr = keyPath.split('.');
    let v = data;
    while (arr.length && typeof v === 'object' && v !== null) {
        const k = arr.shift();
        if (arr.length === 0) {
            delete v[k];
        }
        else {
            v = v[k];
        }
    }
};
const updateObject = (obj, newObj) => {
    const oldKeys = Object.keys(obj);
    const newKeys = Object.keys(newObj);
    const delKeys = oldKeys.filter((k) => !newKeys.includes(k));
    delKeys.forEach((k) => {
        delete obj[k];
    });
    newKeys.forEach((k) => {
        obj[k] = newObj[k];
    });
};

class Form {
    constructor(args) {
        this.fieldsKeys = vue.ref([]);
        this.fields = new Map();
        this.virtualFieldsKeys = vue.ref([]);
        this.virtualFields = new Map();
        this.data = null;
        this._fieldStates = vue.reactive({});
        this._fieldStatesReadonly = null;
        // watcher
        this.stopStateWatcher = null;
        this.stopStatusWatcher = null;
        this.stopValidatingWatcher = null;
        // waiter
        this.waiters = [];
        // default values
        this.defaultValues = {};
        this.defaultValues = (args.defaultValues || {});
        this._data = vue.reactive({
            values: vue.toRaw(this.defaultValues) || {},
            error: null,
            errors: {},
            virtualErrors: {},
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
    // form state
    get state() {
        if (!this.data)
            this.data = vue.readonly(this._data);
        return this.data;
    }
    // field states
    get fieldStates() {
        if (!this._fieldStatesReadonly) {
            this._fieldStatesReadonly = vue.readonly(this._fieldStates);
        }
        return this._fieldStatesReadonly;
    }
    mount() {
        this.stopStateWatcher = vue.watchEffect(() => {
            const keys = this.fieldsKeys.value;
            const virtualKeys = this.virtualFieldsKeys.value;
            let isError = false;
            let isValidating = false;
            let isDirty = false;
            let isTouched = false;
            let isChanged = false;
            // fields
            const fieldStates = {};
            const errors = {};
            let error = null;
            keys.forEach((k) => {
                var _a;
                const field = this.fields.get(k);
                if (!field)
                    return;
                setKeyValue(fieldStates, k, field.state);
                setKeyValue(errors, k, field.state.error);
                setKeyValue(this._data.values, k, field.state.value);
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
                if (((_a = field.state.error) === null || _a === void 0 ? void 0 : _a.message) && !error) {
                    error = field.state.error;
                }
            });
            updateObject(this._fieldStates, fieldStates);
            updateObject(this._data.errors, errors);
            // virtual fields
            const virtualErrors = {};
            virtualKeys.forEach((k) => {
                var _a;
                const field = this.virtualFields.get(k);
                if (!field)
                    return;
                setKeyValue(virtualErrors, k, field.state.error);
                if (field.state.isError)
                    isError = true;
                if (field.state.isValidating)
                    isValidating = true;
                if (((_a = field.state.error) === null || _a === void 0 ? void 0 : _a.message) && !error) {
                    error = field.state.error;
                }
            });
            updateObject(this._data.virtualErrors, virtualErrors);
            this._data.isError = isError;
            this._data.error = error;
            this._data.isValidating = isValidating;
            this._data.isDirty = isDirty;
            this._data.isTouched = isTouched;
            this._data.isChanged = isChanged;
        });
        this.stopValidatingWatcher = vue.watchEffect(() => {
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
        (_a = this.stopStateWatcher) === null || _a === void 0 ? void 0 : _a.call(this);
        (_b = this.stopStatusWatcher) === null || _b === void 0 ? void 0 : _b.call(this);
        (_c = this.stopValidatingWatcher) === null || _c === void 0 ? void 0 : _c.call(this);
    }
    registerField(name, args = {}) {
        const { fieldsKeys, fields } = this;
        if (fieldsKeys.value.includes(name)) {
            throw `Duplicate field <${name}>.`;
        }
        for (const k of fieldsKeys.value) {
            if (k.startsWith(`${name}.`) || name.startsWith(`${k}.`)) {
                throw `Fields can not be nested together: <${name}> <${k}>.`;
            }
        }
        // field value
        const formValue = getKeyValue(this.state.values, name);
        let value = args.value;
        if (value === undefined)
            value = formValue;
        if (value === undefined)
            value = args.defaultValue;
        // field default value
        const defaultValue = formValue === undefined ? args.defaultValue : formValue;
        const field = new Field(this, Object.assign(Object.assign({}, args), { name, value, defaultValue }));
        fields.set(name, field);
        this.fieldsKeys.value.push(name);
    }
    registerVirtualField(name, args = {}) {
        const { virtualFieldsKeys, virtualFields } = this;
        if (virtualFieldsKeys.value.includes(name)) {
            throw `Duplicate virtual field <${name}>.`;
        }
        const field = new VirtualField(this, Object.assign(Object.assign({}, args), { name }));
        virtualFields.set(name, field);
        this.virtualFieldsKeys.value.push(name);
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
        virtualFields.delete(name);
    }
    setValue(name, value) {
        if (value === undefined)
            return;
        const field = this.fields.get(name);
        if (!field) {
            throw `Field not exists <${name}>.`;
        }
        field.onChange(value);
    }
    submit(onSuccess, onError) {
        const callback = () => {
            this._data.isSubmitting = false;
            if (this.state.isError) {
                onError(vue.toRaw(this.state.errors));
                return;
            }
            this._data.isSubmitted = true;
            onSuccess(vue.toRaw(this.state.values));
        };
        this._data.submitCount++;
        this._data.isSubmitting = true;
        // check validdating status
        if (this.state.isValidating) {
            this.waiters.push(() => {
                callback();
            });
        }
        else {
            callback();
        }
    }
    reset(values) {
        this.waiters = [];
        this._data.values =
            values === undefined ? this.defaultValues : values;
        this._data.errors = {};
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

const alpha = ({ name, value }) => {
    const msg = `${name} is not alphabetical`;
    if (typeof value !== 'string')
        return msg;
    return /^[a-zA-Z]*$/.test(value) ? '' : msg;
};

const alphaNum = ({ name, value }) => {
    const msg = `${name} must be alpha-numeric`;
    if (typeof value !== 'string' && typeof value !== 'number')
        return msg;
    return /^[a-zA-Z0-9]*$/.test(`${value}`) ? '' : msg;
};

const decimal = ({ name, value }) => {
    const msg = `${name} must be decimal`;
    if (typeof value !== 'string' && typeof value !== 'number')
        return msg;
    return /^[-]?\d*(\.\d+)?$/.test(`${value}`) ? '' : msg;
};

const emailRegex = 
// eslint-disable-next-line no-control-regex
/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const email = ({ name, value }) => {
    const msg = `${name} is not a valid email address`;
    if (typeof value !== 'string')
        return msg;
    return emailRegex.test(value) ? '' : msg;
};

const integer = ({ name, value }) => {
    const msg = `${name} is not an integer`;
    if (typeof value !== 'string' && typeof value !== 'number')
        return msg;
    return /(^[0-9]*$)|(^-[0-9]+$)/.test(`${value}`) ? '' : msg;
};

const ipAddress = ({ name, value }) => {
    const msg = `${name} is not a valid IP address`;
    if (typeof value !== 'string')
        return msg;
    const nibbles = value.split('.');
    return nibbles.length === 4 && nibbles.every(nibbleValid) ? '' : msg;
};
const nibbleValid = (nibble) => {
    if (nibble.length > 3 || nibble.length === 0) {
        return false;
    }
    if (nibble[0] === '0' && nibble !== '0') {
        return false;
    }
    if (!nibble.match(/^\d+$/)) {
        return false;
    }
    const numeric = +nibble;
    return numeric >= 0 && numeric <= 255;
};

const macAddress = ({ name, value }) => {
    const msg = `${name} is not a valid MAC Address`;
    if (typeof value !== 'string')
        return msg;
    const separator = ':';
    const parts = value.split(separator);
    return (parts.length === 6 || parts.length === 8) && parts.every(hexValid)
        ? ''
        : msg;
};
const hexValid = (hex) => hex.toLowerCase().match(/^[0-9a-f]{2}$/);

const numeric = ({ name, value }) => {
    const msg = `${name} must be numeric`;
    if (typeof value !== 'string' && typeof value !== 'number')
        return msg;
    return /^\d*(\.\d+)?$/.test(`${value}`) ? '' : msg;
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

exports.Field = Field;
exports.Form = Form;
exports.VirtualField = VirtualField;
exports.validators = validators;
