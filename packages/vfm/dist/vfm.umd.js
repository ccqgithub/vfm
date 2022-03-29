var tt=Object.defineProperty,et=Object.defineProperties;var st=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var it=Object.prototype.hasOwnProperty,nt=Object.prototype.propertyIsEnumerable;var T=(o,r,g)=>r in o?tt(o,r,{enumerable:!0,configurable:!0,writable:!0,value:g}):o[r]=g,C=(o,r)=>{for(var g in r||(r={}))it.call(r,g)&&T(o,g,r[g]);if(R)for(var g of R(r))nt.call(r,g)&&T(o,g,r[g]);return o},I=(o,r)=>et(o,st(r));(function(o,r){typeof exports=="object"&&typeof module!="undefined"?r(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],r):(o=typeof globalThis!="undefined"?globalThis:o||self,r(o.VFM={},o.Vue))})(this,function(o,r){"use strict";const g=s=>{const t="{{name}} is not alphabetical";return typeof s!="string"?t:/^[a-zA-Z]*$/.test(s)?"":t},j=s=>{const t="{{name}} must be alpha-numeric";return typeof s!="string"&&typeof s!="number"?t:/^[a-zA-Z0-9]*$/.test(`${s}`)?"":t},M=s=>{const t="{{name}} must be decimal";return typeof s!="string"&&typeof s!="number"?t:/^[-]?\d*(\.\d+)?$/.test(`${s}`)?"":t},D=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,_=s=>{const t="{{name}} is not a valid email address";return typeof s!="string"?t:D.test(s)?"":t},z=s=>{const t="{{name}} is not an integer";return typeof s!="string"&&typeof s!="number"?t:/(^[0-9]*$)|(^-[0-9]+$)/.test(`${s}`)?"":t},L=s=>{const t="{{name}} is not a valid IP address";if(typeof s!="string")return t;const e=s.split(".");return e.length===4&&e.every(N)?"":t},N=s=>{if(s.length>3||s.length===0||s[0]==="0"&&s!=="0"||!s.match(/^\d+$/))return!1;const t=+s;return t>=0&&t<=255},O=s=>{const t="{{name}} is not a valid MAC Address";if(typeof s!="string")return t;const e=":",i=s.split(e);return(i.length===6||i.length===8)&&i.every(U)?"":t},U=s=>s.toLowerCase().match(/^[0-9a-f]{2}$/),$={alpha:g,alphaNum:j,decimal:M,email:_,integer:z,ipAddress:L,macAddress:O,numeric:s=>{const t="{{name}} must be numeric";return typeof s!="string"&&typeof s!="number"?t:/^\d*(\.\d+)?$/.test(`${s}`)?"":t}},q=async(s,t,e)=>{if(s.required&&!t||s.requiredLength&&(typeof(t==null?void 0:t.length)!="number"||t.length<=0))return"{{name}} is required";if(s.minLength!==void 0&&(typeof(t==null?void 0:t.length)!="number"||t.length<s.minLength))return`{{name}}'s length cannot be less than ${s.minLength}`;if(s.maxLength!==void 0&&(typeof(t==null?void 0:t.length)!="number"||t.length>s.maxLength))return`{{name}}'s length cannot be greater than ${s.maxLength}`;if(s.min!==void 0&&(typeof t!="number"||t<s.min))return`{{name}} cannot be less than ${s.min}`;if(s.max!==void 0&&(typeof t!="number"||t>s.max))return`{{name}} cannot be greater than ${s.max}`;if(s.pattern&&(typeof t!="string"||!s.pattern.test(t)))return`{{name}} not match ${s.pattern.toString()}`;for(const i of Object.keys($))if(s[i]===!0){const a=await $[i](t,e);if(a)return a}if(s.validator){const i=await s.validator(t,e);if(i)return i}return""};class A{constructor(t,e){this.validate=null,this.validateCount=0,this.stopValidateWatcher=null,this.stopDirtyWatcher=null,this.isRegistered=!1,this.runInAction=l=>{l()};const{immediate:i=!0,rules:n=[]}=e;this.form=t,this.name=e.name,this.state=r.reactive({name:this.name,value:e.value===void 0?e.defaultValue:e.value,defaultValue:e.defaultValue,error:null,isError:!1,isValidating:!1,isDirty:!1,isTouched:!1,isChanged:!1});const a=async(l,u)=>{let m=null;for(const h of n){const d=await q(h,l,u);if(d)return m=typeof d=="string"?{type:h.type,message:d}:d,m}return null};this.validate=a,i&&this.onRegister()}initWatcher(){let t=null;this.stopValidateWatcher=r.watchEffect(async()=>{this.validateCount++;const e=this.state.value,i=this.form.state,n=this.validateCount,a=this.validate;t==null||t(),t=null,this.runInAction(()=>{this.state.isValidating=!0});let l=null;if(a){const u=a(e,i);t=(u==null?void 0:u.cancel)||null,l=await u||null}n===this.validateCount&&this.runInAction(()=>{this.state.isValidating=!1;const u=!!(l!=null&&l.message);u?(this.state.error||(this.state.error={message:""}),this.state.error.message=(l==null?void 0:l.message)||"",this.state.error.type=l==null?void 0:l.type):this.state.error=null,this.state.isError=u})}),this.stopDirtyWatcher=r.watchEffect(()=>{const{value:e,defaultValue:i}=this.state;this.runInAction(()=>{this.state.isDirty=e!==i})})}onRegister(){this.isRegistered||(this.initWatcher(),this.isRegistered=!0)}onUnregister(){var t,e;(t=this.stopValidateWatcher)==null||t.call(this),(e=this.stopDirtyWatcher)==null||e.call(this),this.isRegistered=!1}onChange(t){if(t===void 0)return;const e=this.state.value!==t;this.runInAction(()=>{this.state.value=t,this.state.isChanged=this.state.isChanged||e})}onTouched(t=!0){this.runInAction(()=>{this.state.isTouched=t})}reset(t){var e,i;this.validateCount++,(e=this.stopValidateWatcher)==null||e.call(this),(i=this.stopDirtyWatcher)==null||i.call(this),this.runInAction(()=>{t!==void 0&&(this.state.defaultValue=t),this.state.error=null,this.state.isError=!1,this.state.isValidating=!1,this.state.isDirty=!1,this.state.isTouched=!1,this.state.isChanged=!1,this.state.value=this.state.defaultValue}),this.initWatcher()}}const P=async(s,t)=>{if(s.validator){const e=await s.validator(t);if(e)return e}return""};class E{constructor(t,e){this.name="",this.validate=null,this.validateCount=0,this.stopValidateWatcher=null,this.isRegistered=!1,this.runInAction=l=>{l()};const{immediate:i=!0,rules:n=[]}=e;this.form=t,this.name=e.name,this.state=r.reactive({name:this.name,error:null,isError:!1,isValidating:!1});const a=async l=>{let u=null;for(const m of n){const h=await P(m,l);if(h)return u=typeof h=="string"?{type:m.type,message:h}:h,u}return null};this.validate=a,i&&this.initWatcher()}initWatcher(){let t=null;this.stopValidateWatcher=r.watchEffect(async()=>{this.validateCount++;const e=this.form.state,i=this.validateCount;this.runInAction(()=>{this.state.isValidating=!0}),t==null||t(),t=null;let n=null;if(this.validate){const a=this.validate(e);a instanceof Promise&&(t=a.cancel||null),n=await a||null}i===this.validateCount&&this.runInAction(()=>{this.state.isValidating=!1;const a=!!(n!=null&&n.message);a?(this.state.error||(this.state.error={message:""}),this.state.error.message=(n==null?void 0:n.message)||"",this.state.error.type=n==null?void 0:n.type):this.state.error=null,this.state.isError=a})})}onRegister(){this.isRegistered||(this.initWatcher(),this.isRegistered=!0)}onUnregister(){var t;(t=this.stopValidateWatcher)==null||t.call(this)}}const v=(s,t,e)=>{const i=t.split(".");let n=s;for(;i.length&&typeof n=="object"&&n!==null;){const a=i.shift();i.length===0?n[a]=e:(typeof n[a]!="object"||n[a]===null)&&(n[a]=/^\d+$/.test(a)?[]:{}),n=n[a]}},b=(s,t)=>{const e=t.split(".");let i=s;for(;e.length&&i;){const n=e.shift();i=typeof i=="object"&&i!==null?i[n]:void 0}return i},x=(s,t)=>{const e=t.split(".");let i=s;for(;e.length&&typeof i=="object"&&i!==null;){const n=e.shift();e.length===0?Array.isArray(i)?/^\d+$/.test(n)&&i.splice(Number(n),1):delete i[n]:i=i[n]}};class S{constructor(t){this.fieldStates=r.reactive({}),this.virtualFieldStates=r.reactive({}),this.cacheFields=[],this.cacheVirtualFields=[],this.isMounted=!1,this.fieldsKeys=r.ref([]),this.fields=new Map,this.virtualFieldsKeys=r.ref([]),this.virtualFields=new Map,this.stopStateWatcher=null,this.stopStatusWatcher=null,this.stopValidatingWatcher=null,this.waiters=[],this.defaultValues={},this.runInAction=e=>{e()},this.defaultValues=r.toRaw(t.defaultValues||{}),this.state=r.reactive({values:r.toRaw(this.defaultValues)||{},errors:{},virtualErrors:{},error:null,isError:!1,isValidating:!1,isDirty:!1,isTouched:!1,isChanged:!1,isSubmitted:!1,isSubmitting:!1,submitCount:0})}mount(){if(this.isMounted)return;const{cacheFields:t,cacheVirtualFields:e}=this;this.fieldsKeys.value.push(...t),this.virtualFieldsKeys.value.push(...e),this.cacheFields=[],this.cacheVirtualFields=[],this.stopStateWatcher=r.watchEffect(()=>{const i=this.fieldsKeys.value,n=this.virtualFieldsKeys.value;let a=!1,l=!1,u=!1,m=!1,h=!1,d=null;i.forEach(f=>{const c=this.fields.get(f);if(!c)return;const p=c.state,V=c.state.value,y=c.state.error,F=c.state.isError,J=c.state.isValidating,Q=c.state.isDirty,X=c.state.isTouched,Y=c.state.isChanged;this.runInAction(()=>{v(this.state.values,f,V),v(this.state.errors,f,y),v(this.fieldStates,f,p),F&&(a=!0),J&&(l=!0),Q&&(u=!0),X&&(m=!0),Y||(h=!0),y&&!d&&(d=y)})}),n.forEach(f=>{const c=this.virtualFields.get(f);if(!c)return;const p=c.state,V=c.state.error,y=c.state.isError,F=c.state.isValidating;this.runInAction(()=>{v(this.state.virtualErrors,f,V),v(this.virtualFieldStates,f,p),y&&(a=!0),F&&(l=!0),V&&!d&&(d=V)})}),this.runInAction(()=>{this.state.isError=a,this.state.error=d,this.state.isValidating=l,this.state.isDirty=u,this.state.isTouched=m,this.state.isChanged=h})}),this.stopValidatingWatcher=r.watchEffect(()=>{this.state.isValidating||this.waiters.forEach(n=>{n()}),this.waiters=[]}),this.isMounted=!0}unmount(){var t,e,i;(t=this.stopStateWatcher)==null||t.call(this),(e=this.stopStatusWatcher)==null||e.call(this),(i=this.stopValidatingWatcher)==null||i.call(this);for(const n of this.fieldsKeys.value)this.unregisterField(n);for(const n of this.virtualFieldsKeys.value)this.unregisterVirtualField(n);for(const n of this.cacheFields)this.unregisterField(n);for(const n of this.cacheVirtualFields)this.unregisterVirtualField(n);this.isMounted=!1}registerField(t,e={}){const{immediate:i=!0}=e,{fieldsKeys:n,fields:a}=this;if(n.value.includes(t))return console.warn(`Duplicate field <${t}>.`),{field:this.fields.get(t),register:()=>{}};for(const f of n.value)if(f.startsWith(`${t}.`)||t.startsWith(`${f}.`))return console.warn(`Fields can not be nested together: <${t}> <${f}>.`),{field:this.fields.get(t),register:()=>{}};const l=b(this.state.values,t);let u=e.value;u===void 0&&(u=l),u===void 0&&(u=e.defaultValue);const m=l===void 0?e.defaultValue:l,h=new A(this,I(C({},e),{name:t,value:u,defaultValue:m})),d=()=>{a.set(t,h),this.runInAction(()=>{this.isMounted?this.fieldsKeys.value.push(t):this.cacheFields.push(t)}),h.initWatcher()};return i?(d(),{field:h,register:()=>{}}):{register:d,field:h}}registerVirtualField(t,e={}){const{immediate:i=!0}=e,{virtualFieldsKeys:n,virtualFields:a}=this;if(n.value.includes(t))return console.warn(`Duplicate virtual field <${t}>.`),{field:this.virtualFields.get(t),register:()=>{}};const l=new E(this,I(C({},e),{name:t})),u=()=>{a.set(t,l),this.runInAction(()=>{this.isMounted?this.virtualFieldsKeys.value.push(t):this.cacheVirtualFields.push(t)}),l.initWatcher()};return i?(u(),{field:l,register:()=>{}}):{register:u,field:l}}unregisterField(t){const{fields:e}=this,i=e.get(t);if(!i){console.warn(`Field not exists <${t}>.`);return}if(i.onUnregister(),this.isMounted){const n=this.fieldsKeys.value.indexOf(t);n!==-1&&this.fieldsKeys.value.splice(n,1)}else{const n=this.cacheFields.indexOf(t);n!==-1&&this.cacheFields.splice(n,1)}this.runInAction(()=>{x(this.state.values,t),x(this.state.errors,t),x(this.fieldStates,t)}),e.delete(t)}unregisterVirtualField(t){const{virtualFields:e}=this,i=e.get(t);if(!i){console.warn(`Virtual field not exists <${t}>.`);return}if(i.onUnregister(),this.isMounted){const n=this.virtualFieldsKeys.value.indexOf(t);n!==-1&&this.virtualFieldsKeys.value.splice(n,1)}else{const n=this.cacheVirtualFields.indexOf(t);n!==-1&&this.cacheVirtualFields.splice(n,1)}this.runInAction(()=>{x(this.state.virtualErrors,t),x(this.virtualFieldStates,t)}),e.delete(t)}setValue(t,e){if(e===void 0)return;const i=this.fields.get(t);if(!i){console.warn(`Field not exists <${t}>.`);return}i.onChange(e)}setTouched(t,e=!0){const i=this.fields.get(t);if(!i){console.warn(`Field not exists <${t}>.`);return}i.onTouched(e)}submit(t,e){const i=()=>{if(this.runInAction(()=>{this.state.isSubmitting=!1}),this.state.isError){e(r.toRaw(this.state.errors));return}this.runInAction(()=>{this.state.isSubmitted=!0}),t(r.toRaw(this.state.values))};this.runInAction(()=>{this.state.submitCount++,this.state.isSubmitting=!0}),this.state.isValidating?this.waiters.push(()=>{i()}):i()}reset(t){this.waiters=[],this.runInAction(()=>{this.state.values=t===void 0?this.defaultValues:t,this.state.errors={},this.state.virtualErrors={},this.state.error=null,this.state.isError=!1,this.state.isValidating=!1,this.state.isDirty=!1,this.state.isTouched=!1,this.state.isChanged=!1,this.state.isSubmitted=!1,this.state.isSubmitting=!1,this.state.submitCount=0});for(const[e,i]of this.fields){const n=b(this.state.values,e);i.reset(n)}}}const k=s=>new S(s),w=Symbol(),W=s=>{const t=r.inject(w,null),{form:e=t,name:i}=s;if(!e)throw new Error(`No form in the injected context or props, can not use Field <${s.name}>`);const{register:n,field:a}=e.registerField(i,{value:s.value,defaultValue:s.defaultValue,rules:s.rules,immediate:!1}),l=r.computed(()=>b(e.fieldStates,i)),u=r.computed(()=>l.value?l.value.value:a.state.value),m=p=>{var y,F;const V=typeof p=="object"&&typeof p.currentTarget=="object"&&typeof p.preventDefault=="function"&&((y=p.currentTarget)==null?void 0:y.value)!==void 0?(F=p.currentTarget)==null?void 0:F.value:p;e.setValue(i,V)},h=()=>{e.setTouched(i,!0)},d=r.ref(null),f=p=>d.value=p;return r.onMounted(()=>{n()}),r.onUnmounted(()=>{e.unregisterField(i)}),[r.reactive({value:u,onChange:m,onBlur:h,setRef:f}),l.value]},K=s=>{const t=r.inject(w,null),{form:e=t,name:i}=s;if(!e)throw new Error(`No form in the injected context or props, can not use Field <${s.name}>`);const{register:n}=e.registerVirtualField(i,{rules:s.rules,immediate:!1}),a=r.computed(()=>b(e.fieldStates,i));return r.onMounted(()=>{n()}),r.onUnmounted(()=>{e.unregisterField(i)}),[a.value]},Z=()=>r.inject(w),B=r.defineComponent({props:{form:null,name:null,rules:null,value:null,defaultValue:null},setup(s){const t=s,[e,i]=W(t);return(n,a)=>r.unref(i)?r.renderSlot(n.$slots,"default",{key:0,field:r.unref(e),state:r.unref(i)}):r.createCommentVNode("",!0)}}),G=r.defineComponent({props:{form:null,name:null,rules:null},setup(s){const t=s,[e]=K(t);return(i,n)=>r.unref(e)?r.renderSlot(i.$slots,"default",{key:0,state:r.unref(e)}):r.createCommentVNode("",!0)}}),H=r.defineComponent({props:{form:null},setup(s){const t=s;return r.provide(w,t.form),(e,i)=>r.renderSlot(e.$slots,"default")}});o.Field=B,o.FieldClass=A,o.FormClass=S,o.FormProvider=H,o.VirtualField=G,o.VirtualFieldClass=E,o.createForm=k,o.useField=W,o.useForm=Z,o.useVirtualField=K,o.validators=$,o.vfmInjectionKey=w,Object.defineProperties(o,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
