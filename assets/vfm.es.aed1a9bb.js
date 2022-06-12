import{I as A,a3 as V,a4 as T,a5 as le,a6 as P,j as k,a7 as ne,a2 as z,f as O,p as ee,h as y,v as q,m as te,s as ue,a8 as oe,R as B,Y as de,J as S}from"./app.d66d045f.js";var ce=Object.defineProperty,he=Object.defineProperties,fe=Object.getOwnPropertyDescriptors,C=Object.getOwnPropertySymbols,se=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable,Z=(s,e,t)=>e in s?ce(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,M=(s,e)=>{for(var t in e||(e={}))se.call(e,t)&&Z(s,t,e[t]);if(C)for(var t of C(e))ie.call(e,t)&&Z(s,t,e[t]);return s},J=(s,e)=>he(s,fe(e)),G=(s,e)=>{var t={};for(var i in s)se.call(s,i)&&e.indexOf(i)<0&&(t[i]=s[i]);if(s!=null&&C)for(var i of C(s))e.indexOf(i)<0&&ie.call(s,i)&&(t[i]=s[i]);return t};const ve=s=>{const e="{{name}} is not alphabetical";return typeof s!="string"?e:/^[a-zA-Z]*$/.test(s)?"":e},pe=s=>{const e="{{name}} must be alpha-numeric";return typeof s!="string"&&typeof s!="number"?e:/^[a-zA-Z0-9]*$/.test(`${s}`)?"":e},me=s=>{const e="{{name}} must be decimal";return typeof s!="string"&&typeof s!="number"?e:/^[-]?\d*(\.\d+)?$/.test(`${s}`)?"":e},ye=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,ge=s=>{const e="{{name}} is not a valid email address";return typeof s!="string"?e:ye.test(s)?"":e},Ve=s=>{const e="{{name}} is not an integer";return typeof s!="string"&&typeof s!="number"?e:/(^[0-9]*$)|(^-[0-9]+$)/.test(`${s}`)?"":e},_e=s=>{const e="{{name}} is not a valid IP address";if(typeof s!="string")return e;const t=s.split(".");return t.length===4&&t.every(be)?"":e},be=s=>{if(s.length>3||s.length===0||s[0]==="0"&&s!=="0"||!s.match(/^\d+$/))return!1;const e=+s;return e>=0&&e<=255},Fe=s=>{const e="{{name}} is not a valid MAC Address";if(typeof s!="string")return e;const t=":",i=s.split(t);return(i.length===6||i.length===8)&&i.every(Ee)?"":e},Ee=s=>s.toLowerCase().match(/^[0-9a-f]{2}$/),xe=s=>{const e="{{name}} must be numeric";return typeof s!="string"&&typeof s!="number"?e:/^-?\d*(\.\d+)?$/.test(`${s}`)?"":e},W={alpha:ve,alphaNum:pe,decimal:me,email:ge,integer:Ve,ipAddress:_e,macAddress:Fe,numeric:xe},x=(s,e,t)=>{const i=e.split(".");let a=s;for(;i.length&&typeof a=="object"&&a!==null;){const r=i.shift();i.length===0?a[r]=t:(typeof a[r]!="object"||a[r]===null)&&(a[r]=/^\d+$/.test(r)?[]:{}),a=a[r]}},g=(s,e)=>{const t=e.split(".");let i=s;for(;t.length&&i;){const a=t.shift();i=typeof i=="object"&&i!==null?i[a]:void 0}return i},D=(s,e)=>{const t=e.split(".");let i=s;for(;t.length&&typeof i=="object"&&i!==null;){const a=t.shift();t.length===0?Array.isArray(i)?/^\d+$/.test(a)&&i.splice(Number(a),1):delete i[a]:i=i[a]}},N=(s,e,t=!0)=>{const i=Object.keys(s),a=Object.keys(e),r=i.filter(l=>!a.includes(l));t&&r.forEach(l=>{delete s[l]}),a.forEach(l=>{typeof s[l]=="object"&&!Array.isArray(s[l])&&s[l]!==null&&typeof e[l]=="object"&&!Array.isArray(e[l])&&e[l]!==null?N(s[l],e[l],t):s[l]=e[l]})},Y=[String,Number,Boolean,Symbol,Array,Object],U=s=>{let e=[];const i=s(r=>{e.push(r)});return{promise:new Promise((r,l)=>{i.then(n=>{e=[],r(n)},n=>{e=[],l(n)})}),dispose:()=>{e.forEach(r=>r()),e=[]}}},K=(s,e)=>{let t=null,i=null,a=[];return async(...l)=>(t==null||t(),a.push(new Promise((n,u)=>{let o=null;const h=setTimeout(()=>{const d=s(...l);"promise"in d?(d.promise.then(n,u),o=()=>{var p;(p=d.dispose)==null||p.call(d)}):d.then(n,u)},e);t=()=>{o==null||o(),o=null,clearTimeout(h),u()}})),i||(i=(async()=>{for(;a.length;){const n=a.shift();try{const u=await n;if(!a.length)return u}catch(u){if(!a.length)throw u}}})(),i.finally(()=>{t=null,i=null,a=[]})))},Q=(s,e,t)=>U(async i=>{if(s.required&&!e&&e!==0||s.requiredLength&&(typeof(e==null?void 0:e.length)!="number"||e.length<=0))return"{{name}} is required";if(s.minLength!==void 0&&(typeof(e==null?void 0:e.length)!="number"||e.length<s.minLength))return`{{name}}'s length cannot be less than ${s.minLength}`;if(s.maxLength!==void 0&&(typeof(e==null?void 0:e.length)!="number"||e.length>s.maxLength))return`{{name}}'s length cannot be greater than ${s.maxLength}`;if(s.min!==void 0&&(typeof e!="number"||e<s.min))return`{{name}} cannot be less than ${s.min}`;if(s.max!==void 0&&(typeof e!="number"||e>s.max))return`{{name}} cannot be greater than ${s.max}`;if(s.pattern&&(typeof e!="string"&&typeof e!="number"||!s.pattern.test(`${e}`)))return`{{name}} not match ${s.pattern.toString()}`;const a=Object.keys(W);for(const r of a)if(s[r]===!0){const n=W[r](e,t);typeof n=="object"&&"dispose"in n&&typeof n.dispose=="function"&&i(()=>{var o;return(o=n.dispose)==null?void 0:o.call(n)});const u=typeof n=="object"&&"promise"in n?await n.promise:await n;if(u)return u}if(s.validator){const r=s.validator(e,t);typeof r=="object"&&"dispose"in r&&typeof r.dispose=="function"&&i(()=>{var n;return(n=r.dispose)==null?void 0:n.call(r)});const l=typeof r=="object"&&"promise"in r?await r.promise:await r;if(l)return l}return""});class Ae{constructor(e,t){this.rules=A([]),this.deps=null,this.validateDispose=null,this.debounce=0,this.transform=null,this.isEqual=null,this.focusFn=null,this.stopValidateWatcher=null,this.stopDirtyWatcher=null,this.isRegistered=!1,this.isInited=!1,this.runInAction=r=>{r()};const{immediate:i=!0}=t;this.form=e,this.name=t.name,this.setRules(t.rules||[]),this.deps=t.deps||null,this.transform=t.transform||null,this.isEqual=t.isEqual||null,this.focusFn=t.onFocus||null,this.debounce=t.debounce||0,this.initValue=t.initValue,this.initDefaultValue=t.initDefaultValue,this.state=T({error:null,isError:!1,isValidating:!1,isDirty:!1,isTouched:!1,isChanged:!1});const a=(r,l,n)=>{const u=this.transform;let o=!1;return U(async h=>{h(()=>{o=!0});for(const d of n){const p=Q(d,u&&r!==void 0?u(r):r,l);h(()=>{var w;return(w=p.dispose)==null?void 0:w.call(p)});const m=await p.promise;if(o)return null;let E=null;if(m)return E=typeof m=="string"?{type:d.type,message:m}:m,E.message=E.message.replace(/\{\{name\}\}/g,this.name),d.message!==void 0&&(E.message=d.message.replace(/\{\{name\}\}/g,this.name)),E}return null})};this.validate=a,i&&this.onRegister()}getValue(){return g(this.form.state.values,this.name)}getDefaultValue(){return g(this.form.state.defaultValues,this.name)}setRules(e=[]){this.rules.value=e.map(t=>t.debounce?{validator:K((a,r)=>Q(t,a,r),t.debounce)}:t)}update(e={}){e.rules&&this.setRules(e.rules)}initWatcher(){if(this.isInited)return;const e=async i=>{var a;(a=this.validateDispose)==null||a.call(this),this.validateDispose=null;const{value:r,deps:l,rules:n}=i;let u=!1;const o=this.validate(r,l,n);this.validateDispose=()=>{var d;(d=o.dispose)==null||d.call(o),u=!0,this.validateDispose=null};const h=await o.promise;u||(this.runInAction(()=>{this.state.isValidating=!1;const d=!!(h!=null&&h.message);d?(this.state.error||(this.state.error={message:""}),this.state.error.message=(h==null?void 0:h.message)||"",this.state.error.type=h==null?void 0:h.type):this.state.error=null,this.state.isError=d}),this.validateDispose=null)},t=this.debounce?K(e,this.debounce):e;this.stopValidateWatcher=P(()=>{var i;this.runInAction(()=>{this.state.isValidating=!0});const a=this.getValue(),r=(i=this.deps)==null?void 0:i.call(this),l=this.rules.value;Promise.resolve().then(()=>{t({value:a,deps:r,rules:l})})}),this.stopDirtyWatcher=P(()=>{const i=this.getValue(),a=this.getDefaultValue();this.runInAction(()=>{const r=this.isEqual||((l,n)=>l===n);this.state.isDirty=!r(V(i),V(a))})}),this.isInited=!0}onRegister(){this.isRegistered||(this.initWatcher(),this.isRegistered=!0)}onUnregister(){var e,t,i;(e=this.validateDispose)==null||e.call(this),this.validateDispose=null,(t=this.stopValidateWatcher)==null||t.call(this),(i=this.stopDirtyWatcher)==null||i.call(this),this.isRegistered=!1,this.isInited=!1}onTouched(e=!0){this.runInAction(()=>{this.state.isTouched=e})}onChanged(e=!0){this.state.isChanged=e}onFocus(){var e;(e=this.focusFn)==null||e.call(this)}reset(e={}){var t,i,a;(t=this.validateDispose)==null||t.call(this),this.validateDispose=null,(i=this.stopValidateWatcher)==null||i.call(this),(a=this.stopDirtyWatcher)==null||a.call(this),this.runInAction(()=>{const{keepChanged:r=!1,keepTouched:l=!1}=e;this.state.error=null,this.state.isError=!1,this.state.isValidating=!1,this.state.isDirty=!1,this.state.isTouched=l?this.state.isTouched:!1,this.state.isChanged=r?this.state.isChanged:!1}),this.isInited=!1,this.initWatcher()}}const X=(s,e)=>U(async t=>{if(s.required&&!e&&e!==0||s.requiredLength&&(typeof(e==null?void 0:e.length)!="number"||e.length<=0))return"{{name}} is required";if(s.minLength!==void 0&&(typeof(e==null?void 0:e.length)!="number"||e.length<s.minLength))return`{{name}}'s length cannot be less than ${s.minLength}`;if(s.maxLength!==void 0&&(typeof(e==null?void 0:e.length)!="number"||e.length>s.maxLength))return`{{name}}'s length cannot be greater than ${s.maxLength}`;if(s.min!==void 0&&(typeof e!="number"||e<s.min))return`{{name}} cannot be less than ${s.min}`;if(s.max!==void 0&&(typeof e!="number"||e>s.max))return`{{name}} cannot be greater than ${s.max}`;if(s.pattern&&(typeof e!="string"&&typeof e!="number"||!s.pattern.test(`${e}`)))return`{{name}} not match ${s.pattern.toString()}`;const i=Object.keys(W);for(const a of i)if(s[a]===!0){const l=W[a](e);typeof l=="object"&&"dispose"in l&&typeof l.dispose=="function"&&t(()=>{var u;return(u=l.dispose)==null?void 0:u.call(l)});const n=typeof l=="object"&&"promise"in l?await l.promise:await l;if(n)return n}if(s.validator){const a=s.validator(e);typeof a=="object"&&"dispose"in a&&typeof a.dispose=="function"&&t(()=>{var l;return(l=a.dispose)==null?void 0:l.call(a)});const r=typeof a=="object"&&"promise"in a?await a.promise:await a;if(r)return r}return""});class we{constructor(e,t){this.name="",this.rules=A([]),this.validateDispose=null,this.debounce=0,this.stopValidateWatcher=null,this.isRegistered=!1,this.isInited=!1,this.runInAction=r=>{r()};const{immediate:i=!0}=t;this.form=e,this.name=t.name,this.value=t.value,this.setRules(t.rules||[]),this.debounce=t.debounce||0,this.state=T({name:this.name,error:null,isError:!1,isValidating:!1});const a=(r,l)=>{let n=!1;return U(async u=>{u(()=>{n=!0});for(const o of l){const h=X(o,r);u(()=>{var m;return(m=h.dispose)==null?void 0:m.call(h)});const d=await h.promise;if(n)return null;let p=null;if(d)return p=typeof d=="string"?{type:o.type,message:d}:d,p.message=p.message.replace(/\{\{name\}\}/g,this.name),o.message!==void 0&&(p.message=o.message.replace(/\{\{name\}\}/g,this.name)),p}return null})};this.validate=a,i&&this.initWatcher()}setRules(e=[]){this.rules.value=e.map(t=>t.debounce?{validator:K(a=>X(t,a),t.debounce)}:t)}update(e){e.rules&&this.setRules(e.rules),e.value&&(this.value=e.value)}initWatcher(){var e;if(this.isInited)return;(e=this.validateDispose)==null||e.call(this),this.validateDispose=null;const t=async a=>{this.runInAction(()=>{this.state.isValidating=!0});const{value:r,rules:l}=a;let n=!1;const u=this.validate(r,l);this.validateDispose=()=>{var h;(h=u.dispose)==null||h.call(u),n=!0,this.validateDispose=null};const o=await u.promise;n||(this.runInAction(()=>{this.state.isValidating=!1;const h=!!(o!=null&&o.message);h?(this.state.error||(this.state.error={message:""}),this.state.error.message=(o==null?void 0:o.message)||"",this.state.error.type=o==null?void 0:o.type):this.state.error=null,this.state.isError=h}),this.validateDispose=null)},i=this.debounce?K(t,this.debounce):t;this.stopValidateWatcher=P(()=>{const a=this.value(),r=this.rules.value;Promise.resolve().then(()=>{i({value:a,rules:r})})}),this.isInited=!0}onRegister(){this.isRegistered||(this.initWatcher(),this.isRegistered=!0)}onUnregister(){var e,t;(e=this.validateDispose)==null||e.call(this),this.validateDispose=null,(t=this.stopValidateWatcher)==null||t.call(this),this.isRegistered=!1,this.isInited=!1}}class Ie{constructor(e){this.touchType="BLUR",this._publicState=null,this.fieldsKeys=A([]),this.fields=new Map,this.virtualFieldsKeys=A([]),this.virtualFields=new Map,this.cacheFields=[],this.cacheVirtualFields=[],this.stopStateWatcher=null,this.stopStatusWatcher=null,this.stopValidatingWatcher=null,this.waiters=[],this.subscribers=[],this.isMounted=!1,this.readonly=!1,this.submitFlag=0,this.runInAction=i=>{i()};const{initValues:t={}}=e;this.initValues=V(t),this.defaultValues=V(e.defaultValues||e.initValues),this._state=T({values:t,defaultValues:e.defaultValues||t,fieldErrors:{},virtualErrors:{},error:null,fieldError:null,virtualError:null,isError:!1,isFieldError:!1,isVirtualError:!1,isValidating:!1,isFieldValidating:!1,isVirtualValidating:!1,isDirty:!1,isTouched:!1,isChanged:!1,isSubmitted:!1,isSubmitting:!1,submitCount:0}),this.touchType=e.touchType||"BLUR",this.readonly=e.readonly||!1}get state(){return this.readonly?(this._publicState||(this._publicState=le(this._state)),this._publicState):this._state}mount(){if(this.isMounted)return;const{cacheFields:e,cacheVirtualFields:t}=this;for(const i of e){const a=this.fields.get(i);a.initWatcher(),a.initDefaultValue!==void 0&&x(this._state.defaultValues,i,a.initDefaultValue),a.initValue!==void 0&&x(this._state.values,i,a.initValue)}for(const i of t){const a=this.virtualFields.get(i);a==null||a.initWatcher()}this.cacheFields=[],this.cacheVirtualFields=[],this.fieldsKeys.value.push(...e),this.virtualFieldsKeys.value.push(...t),this.stopStateWatcher=P(()=>{const i=this.fieldsKeys.value,a=this.virtualFieldsKeys.value;let r=!1,l=!1,n=!1,u=!1,o=!1,h=!1,d=!1,p=null,m=null;const E={},w={};i.forEach(I=>{const F=this.fields.get(I);if(!F)return;const f=F.state.error,c=F.state.isError,v=F.state.isValidating,_=F.state.isDirty,b=F.state.isTouched,$=F.state.isChanged;x(E,I,f),c&&(r=!0),v&&(n=!0),_&&(o=!0),b&&(h=!0),$&&(d=!0),f&&!p&&(p=f)}),a.forEach(I=>{const F=this.virtualFields.get(I);if(!F)return;const f=F.state.error,c=F.state.isError,v=F.state.isValidating;x(w,I,f),c&&(l=!0),v&&(u=!0),f&&!m&&(m=f)}),this.runInAction(()=>{N(this._state.fieldErrors,E),N(this._state.virtualErrors,w),this._state.isFieldError=r,this._state.isVirtualError=l,this._state.isError=r||l,this._state.fieldError=p,this._state.virtualError=m,this._state.error=p||m,this._state.isFieldValidating=n,this._state.isVirtualValidating=u,this._state.isValidating=n||u,this._state.isDirty=o,this._state.isTouched=h,this._state.isChanged=d})}),this.stopValidatingWatcher=P(()=>{this._state.isValidating||this.waiters.forEach(a=>{a()}),this.waiters=[]}),this.isMounted=!0}unmount(){var e,t,i;(e=this.stopStateWatcher)==null||e.call(this),(t=this.stopStatusWatcher)==null||t.call(this),(i=this.stopValidatingWatcher)==null||i.call(this);const a=[...this.fieldsKeys.value];for(const l of a)this.unregisterField(l);const r=[...this.virtualFieldsKeys.value];for(const l of r)this.unregisterVirtualField(l);for(const l of this.cacheFields)this.unregisterField(l);for(const l of this.cacheVirtualFields)this.unregisterVirtualField(l);this.subscribers=[],this.reset({values:V(this.initValues),defaultValues:V(this.defaultValues)}),this.isMounted=!1}registerField(e,t={}){const{immediate:i=!0,value:a=g(this.initValues,e),defaultValue:r=g(this.defaultValues||{},e)}=t,{fieldsKeys:l,fields:n,cacheFields:u}=this;if(l.value.includes(e)||u.includes(e))return console.warn(`Duplicate field <${e}>.`),{field:this.fields.get(e),register:()=>{}};for(const d of[...l.value,...u])if(d.startsWith(`${e}.`)||e.startsWith(`${d}.`))return console.warn(`Fields can not be nested together: <${e}> <${d}>. If you want do this, please use [registerVirtualField]`),{field:this.fields.get(e),register:()=>{}};const o=new Ae(this,J(M({},t),{name:e,initValue:a,initDefaultValue:r}));n.set(e,o);const h=()=>{this.runInAction(()=>{this.isMounted?(r!==void 0&&x(this._state.defaultValues,e,r),a!==void 0&&x(this._state.values,e,r),this.fieldsKeys.value.push(e),o.initWatcher()):this.cacheFields.push(e)})};return i?(h(),{field:o,register:()=>{}}):{register:h,field:o}}registerVirtualField(e,t){const{immediate:i=!0}=t,{virtualFieldsKeys:a,virtualFields:r,cacheVirtualFields:l}=this;if(a.value.includes(e)||l.includes(e))return console.warn(`Duplicate virtual field <${e}>.`),{field:this.virtualFields.get(e),register:()=>{}};const n=new we(this,J(M({},t),{name:e}));r.set(e,n);const u=()=>{this.runInAction(()=>{this.isMounted?(this.virtualFieldsKeys.value.push(e),n.initWatcher()):this.cacheVirtualFields.push(e)})};return i?(u(),{field:n,register:()=>{}}):{register:u,field:n}}unregisterField(e,t={}){const{removeValue:i=!1}=t,{fields:a}=this,r=a.get(e);if(!!r){if(r.onUnregister(),this.isMounted){const l=this.fieldsKeys.value.indexOf(e);l!==-1&&this.fieldsKeys.value.splice(l,1)}else{const l=this.cacheFields.indexOf(e);l!==-1&&this.cacheFields.splice(l,1)}this.runInAction(()=>{i&&D(this._state.values,e),i&&D(this._state.defaultValues,e),D(this._state.fieldErrors,e)}),a.delete(e)}}unregisterVirtualField(e){const{virtualFields:t}=this,i=t.get(e);if(!!i){if(i.onUnregister(),this.isMounted){const a=this.virtualFieldsKeys.value.indexOf(e);a!==-1&&this.virtualFieldsKeys.value.splice(a,1)}else{const a=this.cacheVirtualFields.indexOf(e);a!==-1&&this.cacheVirtualFields.splice(a,1)}this.runInAction(()=>{D(this._state.virtualErrors,e)}),t.delete(e)}}setPathValue(e,t){x(this._state.values,e,t),this.notify("UPDATE",e)}setValue(e,t){const i=this.fields.get(e);if(!i){console.warn(`Field not exists <${e}>.`);return}const r=V(g(this._state.values,e))!==V(t);this.setPathValue(e,t),i.onChanged(i.state.isChanged||r)}deletePathValue(e){D(this._state.values,e),this.notify("DELETE",e)}deleteValue(e){if(!this.fields.get(e)){console.warn(`Field not exists <${e}>.`);return}this.deletePathValue(e)}getPathValueRef(e){return k(()=>g(this.state.values,e))}getValueRef(e){return k(()=>{if(!this.fieldsKeys.value.includes(e)){console.warn(`Field not exists <${e}>.`);return}return g(this.state.values,e)})}getPathValue(e){return g(this.state.values,e)}getValue(e){if(!this.fieldsKeys.value.includes(e)){console.warn(`Field not exists <${e}>.`);return}return g(this.state.values,e)}setTouched(e,t=!0){const i=this.fields.get(e);if(!i){console.warn(`Field not exists <${e}>.`);return}i.onTouched(t)}setFocus(e){const t=this.fields.get(e);if(!t){console.warn(`Field not exists <${e}>.`);return}t.onFocus()}submit(e={}){const t=this.submitFlag,i=()=>{var a,r;if(t===this.submitFlag){if(this.runInAction(()=>{this._state.isSubmitting=!1}),this._state.isError){(a=e.onError)==null||a.call(e,V(this._state.error));return}this.runInAction(()=>{this._state.isSubmitted=!0}),(r=e.onSuccess)==null||r.call(e,V(this._state.values))}};this.runInAction(()=>{this._state.submitCount++,this._state.isSubmitting=!0}),this._state.isValidating?this.waiters.push(()=>{i()}):i()}reset(e={}){this.waiters=[],this.runInAction(()=>{e.values?(this._state.values=V(e.values),this.initValues=V(e.values)):e.keepValues||(this._state.values=this.initValues),e.defaultValues?(this._state.defaultValues=V(e.defaultValues),this.defaultValues=e.defaultValues):e.keepDefaultValues||(this._state.defaultValues=this.initValues||this.defaultValues),this.submitFlag++,this._state.isSubmitting=!1,this._state.submitCount=e.keepSubmitCount?this._state.submitCount:0,this._state.isSubmitted=e.keepIsSubmitted?this._state.isSubmitted:!1});for(const[,t]of this.fields)t.reset({keepTouched:e.keepTouched,keepChanged:e.keepChanged});this.notify("RESET")}resetField(e,t={}){const i=this.fields.get(e);if(!i){console.warn(`Field not exists <${e}>.`);return}if("defaultValue"in t&&x(this._state.defaultValues,e,V(t.defaultValue)),"value"in t)x(this._state.values,e,V(t.value));else if(!t.keepValue){const a=g(this._state.defaultValues,e);x(this._state.values,e,V(a))}i.reset({keepTouched:t.keepTouched,keepChanged:t.keepChanged})}subscribe(e){return this.subscribers.push(e),()=>{const i=this.subscribers.indexOf(e);i!==-1&&this.subscribers.splice(i,1)}}notify(e,t){this.subscribers.forEach(i=>{i(e,t)})}fieldState(e){if(!this.fieldsKeys.value.includes(e))return null;const t=this.fields.get(e);return t?t.state:null}virtualFieldState(e){if(!this.virtualFieldsKeys.value.includes(e))return null;const t=this.virtualFields.get(e);return t?t.state:null}isDirty(e){var t;return((t=this.fieldState(e))==null?void 0:t.isDirty)||!1}isTouched(e){var t;return((t=this.fieldState(e))==null?void 0:t.isTouched)||!1}isChanged(e){var t;return((t=this.fieldState(e))==null?void 0:t.isChanged)||!1}isValidating(e){var t;return((t=this.fieldState(e))==null?void 0:t.isValidating)||!1}isVirtualValidating(e){var t;return((t=this.virtualFieldState(e))==null?void 0:t.isValidating)||!1}isError(e){var t;return((t=this.fieldState(e))==null?void 0:t.isError)||!1}isVirtualError(e){var t;return((t=this.virtualFieldState(e))==null?void 0:t.isError)||!1}fieldError(e){var t;return((t=this.fieldState(e))==null?void 0:t.error)||null}virtualFieldError(e){var t;return((t=this.virtualFieldState(e))==null?void 0:t.error)||null}arrayAppend(e,t){const i=g(this._state.values,e);!Array.isArray(i)||(i.push(t),this.notify("UPDATE",e))}arrayPrepend(e,t){const i=g(this._state.values,e);!Array.isArray(i)||(i.unshift(t),this.notify("UPDATE",e))}arrayInsert(e,t,i){const a=g(this._state.values,e);!Array.isArray(a)||(a.splice(t,0,i),this.notify("UPDATE",e))}arraySwap(e,t,i){const a=g(this._state.values,e);if(!Array.isArray(a))return;const r=a[i];a[i]=a[t],a[t]=r,this.notify("UPDATE",e)}arrayMove(e,t,i){const a=g(this._state.values,e);!Array.isArray(a)||(a.splice(i,0,a[t]),a.splice(i>t?t:t+1),this.notify("UPDATE",e))}arrayUpdate(e,t,i){const a=g(this._state.values,e);!Array.isArray(a)||(a.splice(t,1,i),this.notify("UPDATE",e))}arrayRemove(e,t){const i=g(this._state.values,e);!Array.isArray(i)||(i.splice(t,1),this.notify("UPDATE",e))}arrayReplace(e,t){const i=g(this._state.values,e);!Array.isArray(i)||(x(this._state.values,e,t),this.notify("UPDATE",e))}}const qe=s=>new Ie(s),ae=Symbol(),H=()=>ne(ae,null),$e=s=>{const e=H(),{form:t=e,name:i}=s;if(!t)throw new Error("No provided form!");const a=k(()=>s.touchType?y(s.touchType):t.touchType||"BLUR"),r=A(!1),l=A(null),n=c=>l.value=c,u=c=>{var v,_;const b=typeof c=="object"&&typeof c.currentTarget=="object"&&((v=c.currentTarget)==null?void 0:v.value)!==void 0?(_=c.currentTarget)==null?void 0:_.value:c;t.setValue(y(i),b)},o=()=>{a.value==="BLUR"&&t.setTouched(y(i),!0)},h=()=>{a.value==="FOCUS"&&t.setTouched(y(i),!0)};let{register:d,field:p}=t.registerField(y(i),{rules:y(s.rules),transform:s.transform,deps:s.deps,immediate:!1,onFocus:()=>{var c,v;(v=(c=l.value)==null?void 0:c.focus)==null||v.call(c)},debounce:s.debounce,value:s.value,defaultValue:s.defaultValue});const m=A(g(t.state.values,y(s.name))),E=A(p.state),w=S(()=>[y(s.name),y(s.rules)],([c,v],[_])=>{t.unregisterField(_);const b=t.registerField(c,{rules:v,transform:s.transform,deps:s.deps,isEqual:s.isEqual,immediate:r.value,onFocus:()=>{var $,R;(R=($=l.value)==null?void 0:$.focus)==null||R.call($)},debounce:s.debounce,value:s.value,defaultValue:s.defaultValue});d=b.register,p=b.field,E.value=b.field.state,m.value=g(t.state.values,y(s.name))}),I=S(()=>g(t.state.values,y(s.name)),c=>{m.value=c}),F=S(()=>m.value,c=>{const v=g(t.state.values,y(s.name));V(v)!==V(c)&&(m.value=c)});return B(()=>{d==null||d(),r.value=!0}),z(()=>{t.unregisterField(y(i)),w(),I(),F(),l.value=null}),[s.changeType==="ONCHANGE"?T({get value(){return m.value},onChange:u,onBlur:o,onFocus:h,ref:n}):T({get value(){return m.value},onInput:u,onBlur:o,onFocus:h,ref:n}),m,{mounted:r}]},De=s=>{const e=H(),{form:t=e,name:i}=s;if(!t)throw new Error("No provided form!");const a=A(!1);let{register:r,field:l}=t.registerVirtualField(y(i),{value:s.value,rules:y(s.rules),immediate:!1,debounce:s.debounce});const n=A(l.state),u=S(()=>y(s.name),(o,h)=>{t.unregisterVirtualField(h);const d=t.registerVirtualField(y(i),{value:s.value,rules:y(s.rules),immediate:a.value,debounce:s.debounce});r=d.register,l=d.field,n.value=d.field.state});return B(()=>{r(),a.value=!0}),z(()=>{t.unregisterVirtualField(y(i)),u()}),{mounted:a}},Se=(s,e)=>{let t=0,i=s.getPathValue(e);Array.isArray(i)||(s.setPathValue(e,[]),i=s.getPathValue(e));const r=i.map(f=>({id:`${t++}`,name:`${e}.${f}`}));let l=r.map(f=>f.id);const n=A(r),u={},o=S(()=>s.getPathValue(e).map(c=>V(c)),(f,c)=>{const v=[...c],_=f.map((b,$)=>{const R=V(b),j=v.findIndex(re=>V(re)===R);let L="";return j===-1?L=`${t++}`:(L=l[j],v[j]=u),{id:`${L}`,name:`${e}.${$}`}});n.value=_,l=_.map(b=>b.id)});return{onCleanup:()=>{o()},get fieldsValue(){return n.value},fields:n,prepend:f=>{s.arrayPrepend(e,f)},append:f=>{s.arrayAppend(e,f)},insert:(f,c)=>{const v=n.value.findIndex(_=>_.id===f);v!==-1&&s.arrayInsert(e,v,c)},swap:(f,c)=>{const v=n.value.findIndex(b=>b.id===f),_=n.value.findIndex(b=>b.id===c);v===-1||_===-1||s.arraySwap(e,v,_)},move:(f,c)=>{const v=n.value.findIndex(b=>b.id===f),_=n.value.findIndex(b=>b.id===c);v===-1||_===-1||v===_||s.arrayMove(e,v,_)},replace:f=>{l=[],s.arrayReplace(e,f)},remove:f=>{const c=n.value.findIndex(v=>v.id===f);c!==-1&&s.arrayRemove(e,c)},update:(f,c)=>{const v=n.value.findIndex(_=>_.id===f);v!==-1&&s.arrayUpdate(e,v,c)}}},Te=s=>{const e=H(),{form:t=e,path:i}=s;if(!t)throw new Error("No provided form!");const a=Se(t,i),{onCleanup:r}=a,l=G(a,["onCleanup"]);return z(()=>r()),l},Pe=O({__name:"VirtualField",props:{form:{type:Object,default:void 0},name:{type:String,required:!0},value:{type:Function,required:!0},rules:{type:Array,default:()=>[]},debounce:{type:Number,default:void 0}},setup(s){const e=s,{name:t,form:i,value:a,rules:r,debounce:l}=ee(e),{mounted:n}=De({form:i==null?void 0:i.value,rules:r.value,value:a.value,debounce:l==null?void 0:l.value,name:t});return(u,o)=>y(n)?q(u.$slots,"default",{key:0}):te("",!0)}}),Re=O({__name:"FieldArray",props:{form:{type:Object,default:void 0},name:{type:String,required:!0}},setup(s){const e=s,t=Te({form:e.form,path:e.name}),{fieldsValue:i,fields:a}=t,r=G(t,["fieldsValue","fields"]);return(l,n)=>q(l.$slots,"default",ue(r,{fields:y(a)}))}}),Ce=O({__name:"FormProvider",props:{form:{type:Object,required:!0}},setup(s){const e=s;return oe(ae,e.form),B(()=>e.form.mount()),de(()=>e.form.unmount()),(t,i)=>q(t.$slots,"default")}}),We=()=>({form:{type:Object,default:void 0},name:{type:String,required:!0},rules:{type:Array,default:()=>[]},deps:{type:Function,default:void 0},debounce:{type:Number,default:void 0},value:{type:Y,default:void 0},defaultValue:{type:Y,default:void 0},transform:{type:Function,default:void 0},touchType:{type:String,default:"BLUR"},changeType:{type:String,default:"ONCHANGE"},isEqual:{type:Function,default:void 0}}),Ke=O({__name:"index",props:We(),setup(s){const t=ee(s),{form:i,rules:a,transform:r,name:l,deps:n,debounce:u,changeType:o,value:h,defaultValue:d,isEqual:p}=t,m=G(t,["form","rules","transform","name","deps","debounce","changeType","value","defaultValue","isEqual"]),[E,,{mounted:w}]=$e(M({form:i==null?void 0:i.value,rules:a.value,transform:r==null?void 0:r.value,deps:n==null?void 0:n.value,debounce:u==null?void 0:u.value,name:l,changeType:o.value,value:h==null?void 0:h.value,defaultValue:d==null?void 0:d.value,isEqual:p==null?void 0:p.value},m));return(I,F)=>y(w)?q(I.$slots,"default",{key:0,field:y(E)}):te("",!0)}}),Ue=Ke,je=Pe,Le=Re,ke=Ce;export{Ue as F,je as V,Le as a,ke as b,qe as c,Te as u};
