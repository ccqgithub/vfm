import{c as N,F as b,u as U,a as P,V as T}from"./vfm.es.89ffcb4d.js";import{f as x,o as r,c,a as s,b as i,w as f,h as e,t as v,F as k,s as g,_ as C,k as A,a4 as F,a5 as L,I as q,K as w,a6 as R,L as E,q as M,l as V,R as Z,Z as z}from"../app.8e6abf94.mjs";const t=N({initValues:{username:"",password:"",passwordConfirm:"",baseInfo:{birthDay:"",age:""},tags:[],address:[],schools:[]},touchType:"BLUR",readonly:!1}),O=s("div",{class:"vfm-block-title"},"Base Info",-1),j={class:"vfm-p"},H=s("div",{class:"vfm-label"}," Birth Day: ",-1),J={class:"vfm-value"},K={class:"vfm-error"},G={class:"vfm-p"},Q=s("div",{class:"vfm-label"}," Age: ",-1),W={class:"vfm-value"},X={class:"vfm-error"},Y=x({__name:"BaseInfo",setup(_){return t.state,(m,u)=>{var p,l;return r(),c(k,null,[O,s("div",j,[H,s("div",J,[i(e(b),{form:e(t),name:"baseInfo.birthDay",rules:[{required:!0}],value:"1988"},{default:f(({field:d})=>[s("input",g({class:"vfm-input",type:"text"},d),null,16)]),_:1},8,["form"]),s("div",K,v((p=e(t).fieldError("baseInfo.birthDay"))==null?void 0:p.message),1)])]),s("div",G,[Q,s("div",W,[i(e(b),{form:e(t),name:"baseInfo.age",rules:[{required:!0}]},{default:f(({field:d})=>[s("input",g({class:"vfm-input",type:"text"},d),null,16)]),_:1},8,["form"]),s("div",X,v((l=e(t).fieldError("baseInfo.age"))==null?void 0:l.message),1)])])],64)}}}),ss=C(Y,[["__file","BaseInfo.vue"]]),I=_=>(F("data-v-57570915"),_=_(),L(),_),es=I(()=>s("div",{class:"vfm-block-title"},"Address",-1)),ts={class:"vfm-p"},os=I(()=>s("div",{class:"vfm-label"}," Phone: ",-1)),as={class:"vfm-value"},ls={class:"vfm-error"},rs={class:"vfm-p"},ds=I(()=>s("div",{class:"vfm-label"}," Detail: ",-1)),ns={class:"vfm-value"},is={class:"vfm-error"},cs={class:"vfm-p"},_s=["onClick"],us={class:"vfm-p"},vs=x({__name:"AddressList",setup(_){const{fields:m,append:u,remove:p}=U({form:t,path:"address"}),l=()=>{u({phone:"",detail:""})},d=h=>{p(h)};return(h,a)=>(r(),c(k,null,[es,(r(!0),c(k,null,A(e(m),(o,n)=>{var $,y;return r(),c("div",{class:"block",key:o.id},[s("div",ts,[os,s("div",as,[i(e(b),{form:e(t),name:`address.${n}.phone`,rules:[{required:!0}]},{default:f(({field:S})=>[s("input",g({class:"vfm-input",type:"text"},S),null,16)]),_:2},1032,["form","name"]),s("div",ls,v(($=e(t).fieldError(`address.${n}.phone`))==null?void 0:$.message),1)])]),s("div",rs,[ds,s("div",ns,[i(e(b),{form:e(t),name:`address.${n}.detail`,rules:[{required:!0}]},{default:f(({field:S})=>[s("input",g({class:"vfm-input",type:"text"},S),null,16)]),_:2},1032,["form","name"]),s("div",is,v((y=e(t).fieldError(`address.${n}.detail`))==null?void 0:y.message),1)])]),s("div",cs,[s("div",{class:"vfm-action red",onClick:()=>d(o.id)},"- delete",8,_s)])])}),128)),s("div",us,[s("div",{class:"vfm-action",onClick:a[0]||(a[0]=()=>l())},"+ Add Address")])],64))}});const ms=C(vs,[["__scopeId","data-v-57570915"],["__file","AddressList.vue"]]),fs={class:"sbox"},ps=["onUpdate:modelValue"],hs=x({__name:"SelectSchool",props:{visible:{type:Boolean,default:!1},value:{type:Array,default:()=>[]}},emits:["change","update:visible"],setup(_,{emit:m}){const u=_,l=q([{name:"School A",address:"School Address A"},{name:"School B",address:"School Address B"},{name:"School C",address:"School Address C"},{name:"School D",address:"School Address D"},{name:"School E",address:"School Address E"}].map(a=>{const o=u.value.find(n=>n.name===a.name);return{...a,selected:!!o}})),d=()=>{m("update:visible",!1)},h=()=>{const a=l.value.filter(o=>o.selected).map(o=>({name:o.name,address:o.address}));m("change",a),m("update:visible",!1)};return(a,o)=>(r(),c("div",fs,[(r(!0),c(k,null,A(l.value,n=>(r(),c("div",{class:"item",key:n.name},[s("label",null,[w(s("input",{type:"checkbox","onUpdate:modelValue":$=>n.selected=$},null,8,ps),[[R,n.selected]]),s("span",null,v(n.name)+" <"+v(n.address)+">",1)])]))),128)),s("div",{class:"btns"},[s("button",{onClick:d},"close"),s("button",{onClick:h},"confirm")])]))}});const bs=C(hs,[["__scopeId","data-v-904e1e4f"],["__file","SelectSchool.vue"]]),D=_=>(F("data-v-bb9b72b0"),_=_(),L(),_),gs={class:"box"},$s=D(()=>s("div",{class:"vfm-block-title"},"Schools",-1)),Ss={class:"vfm-p"},ys=D(()=>s("div",{class:"vfm-label"}," Selected Schools: ",-1)),ks={class:"vfm-value"},xs=x({__name:"SchoolList",setup(_){const m=t.getPathValueRef("schools"),u=q(!1),p=()=>{u.value=!0};return(l,d)=>(r(),c("div",gs,[i(e(b),{form:e(t),name:"schools",rules:[{requiredLength:!0,message:"Must select one school"}]},{default:f(({field:h})=>{var a;return[$s,s("div",Ss,[ys,s("div",ks,[w(s("div",{class:"vfm-input",onClick:p},v(e(m).map(o=>o.name).join(",")),513),[[E,!u.value]]),w(s("div",{class:"vfm-error"},v((a=e(t).fieldError("schools"))==null?void 0:a.message),513),[[E,!u.value]]),u.value?(r(),M(bs,g({key:0},h,{visible:u.value,"onUpdate:visible":d[0]||(d[0]=o=>u.value=o)}),null,16,["visible"])):V("",!0)])])]}),_:1},8,["form"])]))}});const Cs=C(xs,[["__scopeId","data-v-bb9b72b0"],["__file","SchoolList.vue"]]),ws={class:"vfm"},As={class:"vfm-p"},Is=s("div",{class:"vfm-label"},"User Name:",-1),Bs={class:"vfm-value"},Es={key:0,class:"vfm-error"},Fs={key:1,class:"vfm-error"},Ls={class:"vfm-p"},qs=s("div",{class:"vfm-label"},"Password:",-1),Vs={class:"vfm-value"},Ds={class:"vfm-error"},Ns={class:"vfm-p"},Us=s("div",{class:"vfm-label"},"Password Confirm:",-1),Ps={class:"vfm-value"},Ts={class:"vfm-error"},Rs={class:"vfm-p"},Ms=s("div",{class:"vfm-label"},"Tags:",-1),Zs={class:"vfm-value"},zs={class:"vfm-flex"},Os={class:"vfm-flex-item-box"},js={class:"vfm-flex-item-ins"},Hs=["onClick"],Js={class:"vfm-error"},Ks=["onClick"],Gs={class:"vfm-p"},Qs=s("div",{class:"vfm-label"},"Virtual Field (Tags):",-1),Ws={class:"vfm-error"},Xs={class:"vfm-p"},Ys={key:0,class:"vfm-error",style:{width:"100%",textAlign:"center"}},se=x({__name:"BaseForm",setup(_){const m=t.state,u=()=>{t.submit({onSuccess:l=>{alert(JSON.stringify(l,null,2))},onError:l=>{alert(l.message)}})};Z(()=>{t.mount()}),z(()=>{t.unmount()});const p=l=>(console.log("checkName"),new Promise(d=>{setTimeout(()=>{if(l==="test"){d("Username already exists");return}d("")},1e3)}));return(l,d)=>{var h;return r(),c("div",ws,[s("div",As,[Is,s("div",Bs,[i(e(b),{form:e(t),name:"username",rules:[{required:!0},{validator:a=>p(a),debounce:300}],"change-type":"ONINPUT"},{default:f(({field:a})=>{var o;return[s("input",g({class:"vfm-input",type:"text"},a),null,16),e(t).isValidating("username")?(r(),c("div",Es," loading... ")):(r(),c("div",Fs,v((o=e(t).fieldError("username"))==null?void 0:o.message),1))]}),_:1},8,["form","rules"])])]),s("div",Ls,[qs,s("div",Vs,[i(e(b),{form:e(t),name:"password",rules:[{required:!0,pattern:/[a-zA-Z0-9]{8,20}/}]},{default:f(({field:a})=>{var o;return[s("input",g({class:"vfm-input",type:"password"},a),null,16),s("div",Ds,v((o=e(t).fieldError("password"))==null?void 0:o.message),1)]}),_:1},8,["form"])])]),s("div",Ns,[Us,s("div",Ps,[i(e(b),{form:e(t),name:"passwordConfirm",deps:()=>({password:e(m).values.password}),rules:[{required:!0,pattern:/[a-zA-Z0-9]{8,20}/},{validator:(a,{password:o})=>o&&a!==o?"The passwordConfirm must same as password":""}]},{default:f(({field:a})=>{var o;return[s("input",g({class:"vfm-input",type:"password"},a),null,16),s("div",Ts,v((o=e(t).fieldError("passwordConfirm"))==null?void 0:o.message),1)]}),_:1},8,["form","deps","rules"])])]),i(ss),s("div",Rs,[Ms,s("div",Zs,[i(e(P),{form:e(t),name:"tags"},{default:f(({append:a,remove:o,fields:n})=>[s("div",zs,[(r(!0),c(k,null,A(n,($,y)=>{var S;return r(),c("div",{class:"vfm-flex-item",key:$.id},[s("div",Os,[s("div",js,[i(e(b),{form:e(t),name:`tags.${y}`,rules:[{required:!0,message:"Required"}]},{default:f(({field:B})=>[s("input",g({class:"vfm-input",type:"text"},B),null,16)]),_:2},1032,["form","name"])]),s("div",{class:"vfm-action red",onClick:B=>o($.id)},"-",8,Hs)]),s("div",Js,v((S=e(t).fieldError(`tags.${y}`))==null?void 0:S.message),1)])}),128))]),s("div",{class:"vfm-action",onClick:$=>a("")},"+",8,Ks)]),_:1},8,["form"])])]),s("div",Gs,[i(e(T),{form:e(t),name:"tags",value:()=>(e(t).state.values.tags.length,e(t).state.values.tags),rules:[{requiredLength:!0,message:"must have one tag"}]},null,8,["form","value"]),Qs,s("div",Ws,v((h=e(t).virtualFieldError("tags"))==null?void 0:h.message),1)]),i(ms),i(Cs),s("div",Xs,[s("button",{class:"vfm-button",onClick:u},"Submit"),e(t).state.isError?(r(),c("div",Ys," Have error, cannot submit ")):V("",!0)])])}}}),oe=C(se,[["__file","BaseForm.vue"]]);export{oe as default};