(function(p,a){typeof exports=="object"&&typeof module!="undefined"?a(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],a):(p=typeof globalThis!="undefined"?globalThis:p||self,a(p.VFM={},p.Vue))})(this,function(p,a){"use strict";var pt=Object.defineProperty,yt=Object.defineProperties;var mt=Object.getOwnPropertyDescriptors;var W=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var Q=(p,a,E)=>a in p?pt(p,a,{enumerable:!0,configurable:!0,writable:!0,value:E}):p[a]=E,P=(p,a)=>{for(var E in a||(a={}))X.call(a,E)&&Q(p,E,a[E]);if(W)for(var E of W(a))Y.call(a,E)&&Q(p,E,a[E]);return p},M=(p,a)=>yt(p,mt(a));var K=(p,a)=>{var E={};for(var _ in p)X.call(p,_)&&a.indexOf(_)<0&&(E[_]=p[_]);if(p!=null&&W)for(var _ of W(p))a.indexOf(_)<0&&Y.call(p,_)&&(E[_]=p[_]);return E};const E=s=>{const t="{{name}} is not alphabetical";return typeof s!="string"?t:/^[a-zA-Z]*$/.test(s)?"":t},_=s=>{const t="{{name}} must be alpha-numeric";return typeof s!="string"&&typeof s!="number"?t:/^[a-zA-Z0-9]*$/.test(`${s}`)?"":t},tt=s=>{const t="{{name}} must be decimal";return typeof s!="string"&&typeof s!="number"?t:/^[-]?\d*(\.\d+)?$/.test(`${s}`)?"":t},et=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,st=s=>{const t="{{name}} is not a valid email address";return typeof s!="string"?t:et.test(s)?"":t},it=s=>{const t="{{name}} is not an integer";return typeof s!="string"&&typeof s!="number"?t:/(^[0-9]*$)|(^-[0-9]+$)/.test(`${s}`)?"":t},rt=s=>{const t="{{name}} is not a valid IP address";if(typeof s!="string")return t;const e=s.split(".");return e.length===4&&e.every(at)?"":t},at=s=>{if(s.length>3||s.length===0||s[0]==="0"&&s!=="0"||!s.match(/^\d+$/))return!1;const t=+s;return t>=0&&t<=255},nt=s=>{const t="{{name}} is not a valid MAC Address";if(typeof s!="string")return t;const e=":",i=s.split(e);return(i.length===6||i.length===8)&&i.every(lt)?"":t},lt=s=>s.toLowerCase().match(/^[0-9a-f]{2}$/),S={alpha:E,alphaNum:_,decimal:tt,email:st,integer:it,ipAddress:rt,macAddress:nt,numeric:s=>{const t="{{name}} must be numeric";return typeof s!="string"&&typeof s!="number"?t:/^-?\d*(\.\d+)?$/.test(`${s}`)?"":t}},x=(s,t,e)=>{const i=t.split(".");let r=s;for(;i.length&&typeof r=="object"&&r!==null;){const n=i.shift();i.length===0?r[n]=e:(typeof r[n]!="object"||r[n]===null)&&(r[n]=/^\d+$/.test(n)?[]:{}),r=r[n]}},V=(s,t)=>{const e=t.split(".");let i=s;for(;e.length&&i;){const r=e.shift();i=typeof i=="object"&&i!==null?i[r]:void 0}return i},D=(s,t)=>{const e=t.split(".");let i=s;for(;e.length&&typeof i=="object"&&i!==null;){const r=e.shift();e.length===0?Array.isArray(i)?/^\d+$/.test(r)&&i.splice(Number(r),1):delete i[r]:i=i[r]}},U=(s,t,e=!0)=>{const i=Object.keys(s),r=Object.keys(t),n=i.filter(l=>!r.includes(l));e&&n.forEach(l=>{delete s[l]}),r.forEach(l=>{typeof s[l]=="object"&&!Array.isArray(s[l])&&s[l]!==null&&typeof t[l]=="object"&&!Array.isArray(t[l])&&t[l]!==null?U(s[l],t[l],e):s[l]=t[l]})},k=[String,Number,Boolean,Symbol,Array,Object],R=s=>{let t=[];const i=s(n=>{t.push(n)});return{promise:new Promise((n,l)=>{i.then(o=>{t=[],n(o)},o=>{t=[],l(o)})}),dispose:()=>{t.forEach(n=>n()),t=[]}}},C=(s,t)=>{let e=null,i=null,r=[];return async(...l)=>(e==null||e(),r.push(new Promise((o,f)=>{let u=null;const c=setTimeout(()=>{const h=s(...l);"promise"in h?(h.promise.then(o,f),u=()=>{var y;(y=h.dispose)==null||y.call(h)}):h.then(o,f)},t);e=()=>{u==null||u(),u=null,clearTimeout(c),f()}})),i||(i=(async()=>{for(;r.length;){const o=r.shift();try{const f=await o;if(!r.length)return f}catch(f){if(!r.length)throw f}}})(),i.finally(()=>{e=null,i=null,r=[]})))},j=(s,t,e)=>R(async i=>{if(s.required&&!t&&t!==0||s.requiredLength&&(typeof(t==null?void 0:t.length)!="number"||t.length<=0))return"{{name}} is required";if(s.minLength!==void 0&&(typeof(t==null?void 0:t.length)!="number"||t.length<s.minLength))return`{{name}}'s length cannot be less than ${s.minLength}`;if(s.maxLength!==void 0&&(typeof(t==null?void 0:t.length)!="number"||t.length>s.maxLength))return`{{name}}'s length cannot be greater than ${s.maxLength}`;if(s.min!==void 0&&(typeof t!="number"||t<s.min))return`{{name}} cannot be less than ${s.min}`;if(s.max!==void 0&&(typeof t!="number"||t>s.max))return`{{name}} cannot be greater than ${s.max}`;if(s.pattern&&(typeof t!="string"&&typeof t!="number"||!s.pattern.test(`${t}`)))return`{{name}} not match ${s.pattern.toString()}`;const r=Object.keys(S);for(const n of r)if(s[n]===!0){const o=S[n](t,e);typeof o=="object"&&"dispose"in o&&typeof o.dispose=="function"&&i(()=>{var u;return(u=o.dispose)==null?void 0:u.call(o)});const f=typeof o=="object"&&"promise"in o?await o.promise:await o;if(f)return f}if(s.validator){const n=s.validator(t,e);typeof n=="object"&&"dispose"in n&&typeof n.dispose=="function"&&i(()=>{var o;return(o=n.dispose)==null?void 0:o.call(n)});const l=typeof n=="object"&&"promise"in n?await n.promise:await n;if(l)return l}return""});class z{constructor(t,e){this.rules=a.ref([]),this.deps=null,this.validateDispose=null,this.debounce=0,this.transform=null,this.isEqual=null,this.focusFn=null,this.stopValidateWatcher=null,this.stopDirtyWatcher=null,this.isRegistered=!1,this.isInited=!1,this.runInAction=n=>{n()};const{immediate:i=!0}=e;this.form=t,this.name=e.name,this.setRules(e.rules||[]),this.deps=e.deps||null,this.transform=e.transform||null,this.isEqual=e.isEqual||null,this.focusFn=e.onFocus||null,this.debounce=e.debounce||0,this.initValue=e.initValue,this.initDefaultValue=e.initDefaultValue,this.state=a.reactive({error:null,isError:!1,isValidating:!1,isDirty:!1,isTouched:!1,isChanged:!1});const r=(n,l,o)=>{const f=this.transform;let u=!1;return R(async c=>{c(()=>{u=!0});for(const h of o){const y=j(h,f&&n!==void 0?f(n):n,l);c(()=>{var $;return($=y.dispose)==null?void 0:$.call(y)});const v=await y.promise;if(u)return null;let A=null;if(v)return A=typeof v=="string"?{type:h.type,message:v}:v,A.message=A.message.replace(/\{\{name\}\}/g,this.name),h.message!==void 0&&(A.message=h.message.replace(/\{\{name\}\}/g,this.name)),A}return null})};this.validate=r,i&&this.onRegister()}getValue(){return V(this.form.state.values,this.name)}getDefaultValue(){return V(this.form.state.defaultValues,this.name)}setRules(t=[]){this.rules.value=t.map(e=>e.debounce?{validator:C((r,n)=>j(e,r,n),e.debounce)}:e)}update(t={}){t.rules&&this.setRules(t.rules)}initWatcher(){if(this.isInited)return;const t=async i=>{var c;(c=this.validateDispose)==null||c.call(this),this.validateDispose=null;const{value:r,deps:n,rules:l}=i;let o=!1;const f=this.validate(r,n,l);this.validateDispose=()=>{var h;(h=f.dispose)==null||h.call(f),o=!0,this.validateDispose=null};const u=await f.promise;o||(this.runInAction(()=>{this.state.isValidating=!1;const h=!!(u!=null&&u.message);h?(this.state.error||(this.state.error={message:""}),this.state.error.message=(u==null?void 0:u.message)||"",this.state.error.type=u==null?void 0:u.type):this.state.error=null,this.state.isError=h}),this.validateDispose=null)},e=this.debounce?C(t,this.debounce):t;this.stopValidateWatcher=a.watchEffect(()=>{var l;this.runInAction(()=>{this.state.isValidating=!0});const i=this.getValue(),r=(l=this.deps)==null?void 0:l.call(this),n=this.rules.value;Promise.resolve().then(()=>{e({value:i,deps:r,rules:n})})}),this.stopDirtyWatcher=a.watchEffect(()=>{const i=this.getValue(),r=this.getDefaultValue();this.runInAction(()=>{const n=this.isEqual||((l,o)=>l===o);this.state.isDirty=!n(a.toRaw(i),a.toRaw(r))})}),this.isInited=!0}onRegister(){this.isRegistered||(this.initWatcher(),this.isRegistered=!0)}onUnregister(){var t,e,i;(t=this.validateDispose)==null||t.call(this),this.validateDispose=null,(e=this.stopValidateWatcher)==null||e.call(this),(i=this.stopDirtyWatcher)==null||i.call(this),this.isRegistered=!1,this.isInited=!1}onTouched(t=!0){this.runInAction(()=>{this.state.isTouched=t})}onChanged(t=!0){this.state.isChanged=t}onFocus(){var t;(t=this.focusFn)==null||t.call(this)}reset(t={}){var e,i,r;(e=this.validateDispose)==null||e.call(this),this.validateDispose=null,(i=this.stopValidateWatcher)==null||i.call(this),(r=this.stopDirtyWatcher)==null||r.call(this),this.runInAction(()=>{const{keepChanged:n=!1,keepTouched:l=!1}=t;this.state.error=null,this.state.isError=!1,this.state.isValidating=!1,this.state.isDirty=!1,this.state.isTouched=l?this.state.isTouched:!1,this.state.isChanged=n?this.state.isChanged:!1}),this.isInited=!1,this.initWatcher()}}const N=(s,t)=>R(async e=>{if(s.required&&!t&&t!==0||s.requiredLength&&(typeof(t==null?void 0:t.length)!="number"||t.length<=0))return"{{name}} is required";if(s.minLength!==void 0&&(typeof(t==null?void 0:t.length)!="number"||t.length<s.minLength))return`{{name}}'s length cannot be less than ${s.minLength}`;if(s.maxLength!==void 0&&(typeof(t==null?void 0:t.length)!="number"||t.length>s.maxLength))return`{{name}}'s length cannot be greater than ${s.maxLength}`;if(s.min!==void 0&&(typeof t!="number"||t<s.min))return`{{name}} cannot be less than ${s.min}`;if(s.max!==void 0&&(typeof t!="number"||t>s.max))return`{{name}} cannot be greater than ${s.max}`;if(s.pattern&&(typeof t!="string"&&typeof t!="number"||!s.pattern.test(`${t}`)))return`{{name}} not match ${s.pattern.toString()}`;const i=Object.keys(S);for(const r of i)if(s[r]===!0){const l=S[r](t);typeof l=="object"&&"dispose"in l&&typeof l.dispose=="function"&&e(()=>{var f;return(f=l.dispose)==null?void 0:f.call(l)});const o=typeof l=="object"&&"promise"in l?await l.promise:await l;if(o)return o}if(s.validator){const r=s.validator(t);typeof r=="object"&&"dispose"in r&&typeof r.dispose=="function"&&e(()=>{var l;return(l=r.dispose)==null?void 0:l.call(r)});const n=typeof r=="object"&&"promise"in r?await r.promise:await r;if(n)return n}return""});class O{constructor(t,e){this.name="",this.rules=a.ref([]),this.validateDispose=null,this.debounce=0,this.stopValidateWatcher=null,this.isRegistered=!1,this.isInited=!1,this.runInAction=n=>{n()};const{immediate:i=!0}=e;this.form=t,this.name=e.name,this.value=e.value,this.setRules(e.rules||[]),this.debounce=e.debounce||0,this.state=a.reactive({name:this.name,error:null,isError:!1,isValidating:!1});const r=(n,l)=>{let o=!1;return R(async f=>{f(()=>{o=!0});for(const u of l){const c=N(u,n);f(()=>{var v;return(v=c.dispose)==null?void 0:v.call(c)});const h=await c.promise;if(o)return null;let y=null;if(h)return y=typeof h=="string"?{type:u.type,message:h}:h,y.message=y.message.replace(/\{\{name\}\}/g,this.name),u.message!==void 0&&(y.message=u.message.replace(/\{\{name\}\}/g,this.name)),y}return null})};this.validate=r,i&&this.initWatcher()}setRules(t=[]){this.rules.value=t.map(e=>e.debounce?{validator:C(r=>N(e,r),e.debounce)}:e)}update(t){t.rules&&this.setRules(t.rules),t.value&&(this.value=t.value)}initWatcher(){var i;if(this.isInited)return;(i=this.validateDispose)==null||i.call(this),this.validateDispose=null;const t=async r=>{this.runInAction(()=>{this.state.isValidating=!0});const{value:n,rules:l}=r;let o=!1;const f=this.validate(n,l);this.validateDispose=()=>{var c;(c=f.dispose)==null||c.call(f),o=!0,this.validateDispose=null};const u=await f.promise;o||(this.runInAction(()=>{this.state.isValidating=!1;const c=!!(u!=null&&u.message);c?(this.state.error||(this.state.error={message:""}),this.state.error.message=(u==null?void 0:u.message)||"",this.state.error.type=u==null?void 0:u.type):this.state.error=null,this.state.isError=c}),this.validateDispose=null)},e=this.debounce?C(t,this.debounce):t;this.stopValidateWatcher=a.watchEffect(()=>{const r=this.value(),n=this.rules.value;Promise.resolve().then(()=>{e({value:r,rules:n})})}),this.isInited=!0}onRegister(){this.isRegistered||(this.initWatcher(),this.isRegistered=!0)}onUnregister(){var t,e;(t=this.validateDispose)==null||t.call(this),this.validateDispose=null,(e=this.stopValidateWatcher)==null||e.call(this),this.isRegistered=!1,this.isInited=!1}}class B{constructor(t){this.touchType="BLUR",this._publicState=null,this.fieldsKeys=a.ref([]),this.fields=new Map,this.virtualFieldsKeys=a.ref([]),this.virtualFields=new Map,this.cacheFields=[],this.cacheVirtualFields=[],this.stopStateWatcher=null,this.stopStatusWatcher=null,this.stopValidatingWatcher=null,this.waiters=[],this.subscribers=[],this.isMounted=!1,this.readonly=!1,this.submitFlag=0,this.runInAction=i=>{i()};const{initValues:e={}}=t;this.initValues=a.toRaw(e),this.defaultValues=a.toRaw(t.defaultValues||t.initValues),this._state=a.reactive({values:e,defaultValues:t.defaultValues||e,fieldErrors:{},virtualErrors:{},error:null,fieldError:null,virtualError:null,isError:!1,isFieldError:!1,isVirtualError:!1,isValidating:!1,isFieldValidating:!1,isVirtualValidating:!1,isDirty:!1,isTouched:!1,isChanged:!1,isSubmitted:!1,isSubmitting:!1,submitCount:0}),this.touchType=t.touchType||"BLUR",this.readonly=t.readonly||!1}get state(){return this.readonly?(this._publicState||(this._publicState=a.readonly(this._state)),this._publicState):this._state}mount(){if(this.isMounted)return;const{cacheFields:t,cacheVirtualFields:e}=this;for(const i of t){const r=this.fields.get(i);r.initWatcher(),r.initDefaultValue!==void 0&&x(this._state.defaultValues,i,r.initDefaultValue),r.initValue!==void 0&&x(this._state.values,i,r.initValue)}for(const i of e){const r=this.virtualFields.get(i);r==null||r.initWatcher()}this.cacheFields=[],this.cacheVirtualFields=[],this.fieldsKeys.value.push(...t),this.virtualFieldsKeys.value.push(...e),this.stopStateWatcher=a.watchEffect(()=>{const i=this.fieldsKeys.value,r=this.virtualFieldsKeys.value;let n=!1,l=!1,o=!1,f=!1,u=!1,c=!1,h=!1,y=null,v=null;const A={},$={};i.forEach(I=>{const w=this.fields.get(I);if(!w)return;const d=w.state.error,m=w.state.isError,g=w.state.isValidating,b=w.state.isDirty,F=w.state.isTouched,T=w.state.isChanged;x(A,I,d),m&&(n=!0),g&&(o=!0),b&&(u=!0),F&&(c=!0),T&&(h=!0),d&&!y&&(y=d)}),r.forEach(I=>{const w=this.virtualFields.get(I);if(!w)return;const d=w.state.error,m=w.state.isError,g=w.state.isValidating;x($,I,d),m&&(l=!0),g&&(f=!0),d&&!v&&(v=d)}),this.runInAction(()=>{U(this._state.fieldErrors,A),U(this._state.virtualErrors,$),this._state.isFieldError=n,this._state.isVirtualError=l,this._state.isError=n||l,this._state.fieldError=y,this._state.virtualError=v,this._state.error=y||v,this._state.isFieldValidating=o,this._state.isVirtualValidating=f,this._state.isValidating=o||f,this._state.isDirty=u,this._state.isTouched=c,this._state.isChanged=h})}),this.stopValidatingWatcher=a.watchEffect(()=>{this._state.isValidating||this.waiters.forEach(r=>{r()}),this.waiters=[]}),this.isMounted=!0}unmount(){var i,r,n;(i=this.stopStateWatcher)==null||i.call(this),(r=this.stopStatusWatcher)==null||r.call(this),(n=this.stopValidatingWatcher)==null||n.call(this);const t=[...this.fieldsKeys.value];for(const l of t)this.unregisterField(l);const e=[...this.virtualFieldsKeys.value];for(const l of e)this.unregisterVirtualField(l);for(const l of this.cacheFields)this.unregisterField(l);for(const l of this.cacheVirtualFields)this.unregisterVirtualField(l);this.subscribers=[],this.reset({values:a.toRaw(this.initValues),defaultValues:a.toRaw(this.defaultValues)}),this.isMounted=!1}registerField(t,e={}){const{immediate:i=!0,value:r=V(this.initValues,t),defaultValue:n=V(this.defaultValues||{},t)}=e,{fieldsKeys:l,fields:o,cacheFields:f}=this;if(l.value.includes(t)||f.includes(t))return console.warn(`Duplicate field <${t}>.`),{field:this.fields.get(t),register:()=>{}};for(const h of[...l.value,...f])if(h.startsWith(`${t}.`)||t.startsWith(`${h}.`))return console.warn(`Fields can not be nested together: <${t}> <${h}>. If you want do this, please use [registerVirtualField]`),{field:this.fields.get(t),register:()=>{}};const u=new z(this,M(P({},e),{name:t,initValue:r,initDefaultValue:n}));o.set(t,u);const c=()=>{this.runInAction(()=>{this.isMounted?(n!==void 0&&x(this._state.defaultValues,t,n),r!==void 0&&x(this._state.values,t,n),this.fieldsKeys.value.push(t),u.initWatcher()):this.cacheFields.push(t)})};return i?(c(),{field:u,register:()=>{}}):{register:c,field:u}}registerVirtualField(t,e){const{immediate:i=!0}=e,{virtualFieldsKeys:r,virtualFields:n,cacheVirtualFields:l}=this;if(r.value.includes(t)||l.includes(t))return console.warn(`Duplicate virtual field <${t}>.`),{field:this.virtualFields.get(t),register:()=>{}};const o=new O(this,M(P({},e),{name:t}));n.set(t,o);const f=()=>{this.runInAction(()=>{this.isMounted?(this.virtualFieldsKeys.value.push(t),o.initWatcher()):this.cacheVirtualFields.push(t)})};return i?(f(),{field:o,register:()=>{}}):{register:f,field:o}}unregisterField(t,e={}){const{removeValue:i=!1}=e,{fields:r}=this,n=r.get(t);if(!!n){if(n.onUnregister(),this.isMounted){const l=this.fieldsKeys.value.indexOf(t);l!==-1&&this.fieldsKeys.value.splice(l,1)}else{const l=this.cacheFields.indexOf(t);l!==-1&&this.cacheFields.splice(l,1)}this.runInAction(()=>{i&&D(this._state.values,t),i&&D(this._state.defaultValues,t),D(this._state.fieldErrors,t)}),r.delete(t)}}unregisterVirtualField(t){const{virtualFields:e}=this,i=e.get(t);if(!!i){if(i.onUnregister(),this.isMounted){const r=this.virtualFieldsKeys.value.indexOf(t);r!==-1&&this.virtualFieldsKeys.value.splice(r,1)}else{const r=this.cacheVirtualFields.indexOf(t);r!==-1&&this.cacheVirtualFields.splice(r,1)}this.runInAction(()=>{D(this._state.virtualErrors,t)}),e.delete(t)}}setPathValue(t,e){x(this._state.values,t,e),this.notify("UPDATE",t)}setValue(t,e){const i=this.fields.get(t);if(!i){console.warn(`Field not exists <${t}>.`);return}const n=a.toRaw(V(this._state.values,t))!==a.toRaw(e);this.setPathValue(t,e),i.onChanged(i.state.isChanged||n)}deletePathValue(t){D(this._state.values,t),this.notify("DELETE",t)}deleteValue(t){if(!this.fields.get(t)){console.warn(`Field not exists <${t}>.`);return}this.deletePathValue(t)}getPathValueRef(t){return a.computed(()=>V(this.state.values,t))}getValueRef(t){return a.computed(()=>{if(!this.fieldsKeys.value.includes(t)){console.warn(`Field not exists <${t}>.`);return}return V(this.state.values,t)})}getPathValue(t){return V(this.state.values,t)}getValue(t){if(!this.fieldsKeys.value.includes(t)){console.warn(`Field not exists <${t}>.`);return}return V(this.state.values,t)}setTouched(t,e=!0){const i=this.fields.get(t);if(!i){console.warn(`Field not exists <${t}>.`);return}i.onTouched(e)}setFocus(t){const e=this.fields.get(t);if(!e){console.warn(`Field not exists <${t}>.`);return}e.onFocus()}submit(t={}){const e=this.submitFlag,i=()=>{var r,n;if(e===this.submitFlag){if(this.runInAction(()=>{this._state.isSubmitting=!1}),this._state.isError){(r=t.onError)==null||r.call(t,a.toRaw(this._state.error));return}this.runInAction(()=>{this._state.isSubmitted=!0}),(n=t.onSuccess)==null||n.call(t,a.toRaw(this._state.values))}};this.runInAction(()=>{this._state.submitCount++,this._state.isSubmitting=!0}),this._state.isValidating?this.waiters.push(()=>{i()}):i()}reset(t={}){this.waiters=[],this.runInAction(()=>{t.values?(this._state.values=a.toRaw(t.values),this.initValues=a.toRaw(t.values)):t.keepValues||(this._state.values=this.initValues),t.defaultValues?(this._state.defaultValues=a.toRaw(t.defaultValues),this.defaultValues=t.defaultValues):t.keepDefaultValues||(this._state.defaultValues=this.initValues||this.defaultValues),this.submitFlag++,this._state.isSubmitting=!1,this._state.submitCount=t.keepSubmitCount?this._state.submitCount:0,this._state.isSubmitted=t.keepIsSubmitted?this._state.isSubmitted:!1});for(const[,e]of this.fields)e.reset({keepTouched:t.keepTouched,keepChanged:t.keepChanged});this.notify("RESET")}resetField(t,e={}){const i=this.fields.get(t);if(!i){console.warn(`Field not exists <${t}>.`);return}if("defaultValue"in e&&x(this._state.defaultValues,t,a.toRaw(e.defaultValue)),"value"in e)x(this._state.values,t,a.toRaw(e.value));else if(!e.keepValue){const r=V(this._state.defaultValues,t);x(this._state.values,t,a.toRaw(r))}i.reset({keepTouched:e.keepTouched,keepChanged:e.keepChanged})}subscribe(t){return this.subscribers.push(t),()=>{const i=this.subscribers.indexOf(t);i!==-1&&this.subscribers.splice(i,1)}}notify(t,e){this.subscribers.forEach(i=>{i(t,e)})}fieldState(t){if(!this.fieldsKeys.value.includes(t))return null;const e=this.fields.get(t);return e?e.state:null}virtualFieldState(t){if(!this.virtualFieldsKeys.value.includes(t))return null;const e=this.virtualFields.get(t);return e?e.state:null}isDirty(t){var e;return((e=this.fieldState(t))==null?void 0:e.isDirty)||!1}isTouched(t){var e;return((e=this.fieldState(t))==null?void 0:e.isTouched)||!1}isChanged(t){var e;return((e=this.fieldState(t))==null?void 0:e.isChanged)||!1}isValidating(t){var e;return((e=this.fieldState(t))==null?void 0:e.isValidating)||!1}isVirtualValidating(t){var e;return((e=this.virtualFieldState(t))==null?void 0:e.isValidating)||!1}isError(t){var e;return((e=this.fieldState(t))==null?void 0:e.isError)||!1}isVirtualError(t){var e;return((e=this.virtualFieldState(t))==null?void 0:e.isError)||!1}fieldError(t){var e;return((e=this.fieldState(t))==null?void 0:e.error)||null}virtualFieldError(t){var e;return((e=this.virtualFieldState(t))==null?void 0:e.error)||null}arrayAppend(t,e){const i=V(this._state.values,t);!Array.isArray(i)||(i.push(e),this.notify("UPDATE",t))}arrayPrepend(t,e){const i=V(this._state.values,t);!Array.isArray(i)||(i.unshift(e),this.notify("UPDATE",t))}arrayInsert(t,e,i){const r=V(this._state.values,t);!Array.isArray(r)||(r.splice(e,0,i),this.notify("UPDATE",t))}arraySwap(t,e,i){const r=V(this._state.values,t);if(!Array.isArray(r))return;const n=r[i];r[i]=r[e],r[e]=n,this.notify("UPDATE",t)}arrayMove(t,e,i){const r=V(this._state.values,t);!Array.isArray(r)||(r.splice(i,0,r[e]),r.splice(i>e?e:e+1),this.notify("UPDATE",t))}arrayUpdate(t,e,i){const r=V(this._state.values,t);!Array.isArray(r)||(r.splice(e,1,i),this.notify("UPDATE",t))}arrayRemove(t,e){const i=V(this._state.values,t);!Array.isArray(i)||(i.splice(e,1),this.notify("UPDATE",t))}arrayReplace(t,e){const i=V(this._state.values,t);!Array.isArray(i)||(x(this._state.values,t,e),this.notify("UPDATE",t))}}const ot=s=>new B(s),G=s=>{const{form:t,name:e}=s,i=a.computed(()=>s.touchType?a.unref(s.touchType):t.touchType||"BLUR"),r=a.ref(!1),n=a.ref(null),l=d=>n.value=d,o=d=>{var g,b;const m=typeof d=="object"&&typeof d.currentTarget=="object"&&((g=d.currentTarget)==null?void 0:g.value)!==void 0?(b=d.currentTarget)==null?void 0:b.value:d;t.setValue(a.unref(e),m)},f=()=>{i.value==="BLUR"&&t.setTouched(a.unref(e),!0)},u=()=>{i.value==="FOCUS"&&t.setTouched(a.unref(e),!0)};let{register:c,field:h}=t.registerField(a.unref(e),{rules:a.unref(s.rules),transform:s.transform,deps:s.deps,immediate:!1,onFocus:()=>{var d,m;(m=(d=n.value)==null?void 0:d.focus)==null||m.call(d)},debounce:s.debounce,value:s.value,defaultValue:s.defaultValue});const y=a.ref(V(t.state.values,a.unref(s.name))),v=a.ref(h.state),A=a.watch(()=>[a.unref(s.name),a.unref(s.rules)],([d,m],[g])=>{t.unregisterField(g);const b=t.registerField(d,{rules:m,transform:s.transform,deps:s.deps,isEqual:s.isEqual,immediate:r.value,onFocus:()=>{var F,T;(T=(F=n.value)==null?void 0:F.focus)==null||T.call(F)},debounce:s.debounce,value:s.value,defaultValue:s.defaultValue});c=b.register,h=b.field,v.value=b.field.state,y.value=V(t.state.values,a.unref(s.name))}),$=a.watch(()=>V(t.state.values,a.unref(s.name)),d=>{y.value=d}),I=a.watch(()=>y.value,d=>{const m=V(t.state.values,a.unref(s.name));a.toRaw(m)!==a.toRaw(d)&&(y.value=d)});return a.onMounted(()=>{c==null||c(),r.value=!0}),a.onBeforeUnmount(()=>{t.unregisterField(a.unref(e)),A(),$(),I(),n.value=null}),[s.changeType==="ONCHANGE"?a.reactive({get value(){return y.value},onChange:o,onBlur:f,onFocus:u,ref:l}):a.reactive({get value(){return y.value},onInput:o,onBlur:f,onFocus:u,ref:l}),y,{mounted:r}]},H=s=>{const{form:t,name:e}=s,i=a.ref(!1);let{register:r,field:n}=t.registerVirtualField(a.unref(e),{value:s.value,rules:a.unref(s.rules),immediate:!1,debounce:s.debounce});const l=a.ref(n.state),o=a.watch(()=>a.unref(s.name),(f,u)=>{t.unregisterVirtualField(u);const c=t.registerVirtualField(a.unref(e),{value:s.value,rules:a.unref(s.rules),immediate:i.value,debounce:s.debounce});r=c.register,n=c.field,l.value=c.field.state});return a.onMounted(()=>{r(),i.value=!0}),a.onBeforeUnmount(()=>{t.unregisterVirtualField(a.unref(e)),o()}),{mounted:i}},Z=(s,t)=>{let e=0,i=s.getPathValue(t);Array.isArray(i)||(s.setPathValue(t,[]),i=s.getPathValue(t));const n=i.map(d=>({id:`${e++}`,name:`${t}.${d}`}));let l=n.map(d=>d.id);const o=a.ref(n),f={},u=a.watch(()=>s.getPathValue(t).map(m=>a.toRaw(m)),(d,m)=>{const g=[...m],b=d.map((F,T)=>{const ct=a.toRaw(F),q=g.findIndex(ht=>a.toRaw(ht)===ct);let L="";return q===-1?L=`${e++}`:(L=l[q],g[q]=f),{id:`${L}`,name:`${t}.${T}`}});o.value=b,l=b.map(F=>F.id)});return{onCleanup:()=>{u()},get fieldsValue(){return o.value},fields:o,prepend:d=>{s.arrayPrepend(t,d)},append:d=>{s.arrayAppend(t,d)},insert:(d,m)=>{const g=o.value.findIndex(b=>b.id===d);g!==-1&&s.arrayInsert(t,g,m)},swap:(d,m)=>{const g=o.value.findIndex(F=>F.id===d),b=o.value.findIndex(F=>F.id===m);g===-1||b===-1||s.arraySwap(t,g,b)},move:(d,m)=>{const g=o.value.findIndex(F=>F.id===d),b=o.value.findIndex(F=>F.id===m);g===-1||b===-1||g===b||s.arrayMove(t,g,b)},replace:d=>{l=[],s.arrayReplace(t,d)},remove:d=>{const m=o.value.findIndex(g=>g.id===d);m!==-1&&s.arrayRemove(t,m)},update:(d,m)=>{const g=o.value.findIndex(b=>b.id===d);g!==-1&&s.arrayUpdate(t,g,m)}}},J=(s,t)=>{const r=Z(s,t),{onCleanup:e}=r,i=K(r,["onCleanup"]);return a.onBeforeUnmount(()=>e()),i},ut=a.defineComponent({props:{form:{type:Object,required:!0},name:{type:String,required:!0},rules:{type:Array,default:()=>[]},deps:{type:Function,default:void 0},debounce:{type:Number,default:void 0},value:{type:k,default:void 0},defaultValue:{type:k,default:void 0},transform:{type:Function,default:void 0},touchType:{type:String,default:"BLUR"},changeType:{type:String,default:"ONCHANGE"},isEqual:{type:Function,default:void 0}},setup(s){const t=s,$=a.toRefs(t),{form:e,rules:i,transform:r,name:n,deps:l,debounce:o,changeType:f,value:u,defaultValue:c,isEqual:h}=$,y=K($,["form","rules","transform","name","deps","debounce","changeType","value","defaultValue","isEqual"]),[v,,{mounted:A}]=G(P({form:e.value,rules:i.value,transform:r==null?void 0:r.value,deps:l==null?void 0:l.value,debounce:o==null?void 0:o.value,name:n,changeType:f.value,value:u==null?void 0:u.value,defaultValue:c==null?void 0:c.value,isEqual:h==null?void 0:h.value},y));return(I,w)=>a.unref(A)?a.renderSlot(I.$slots,"default",{key:0,field:a.unref(v)}):a.createCommentVNode("",!0)}}),dt=a.defineComponent({props:{form:{type:Object,required:!0},name:{type:String,required:!0},value:{type:Function,required:!0},rules:{type:Array,default:()=>[]},debounce:{type:Number,default:void 0}},setup(s){const t=s,{name:e,form:i,value:r,rules:n,debounce:l}=a.toRefs(t),{mounted:o}=H({form:i.value,rules:n.value,value:r.value,debounce:l==null?void 0:l.value,name:e});return(f,u)=>a.unref(o)?a.renderSlot(f.$slots,"default",{key:0}):a.createCommentVNode("",!0)}}),ft=a.defineComponent({props:{form:{type:Object,required:!0},name:{type:String,required:!0}},setup(s){const t=s,n=J(t.form,t.name),{fieldsValue:e,fields:i}=n,r=K(n,["fieldsValue","fields"]);return(l,o)=>a.renderSlot(l.$slots,"default",a.mergeProps(r,{fields:a.unref(i)}))}});p.Field=ut,p.FieldArray=ft,p.FieldClass=z,p.Form=B,p.VirtualField=dt,p.VirtualFieldClass=O,p.createFieldArray=Z,p.createForm=ot,p.useField=G,p.useFieldArray=J,p.useVirtualField=H,p.validators=S,Object.defineProperties(p,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
