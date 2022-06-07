import{_ as o,r as u,o as s,c as i,a as l,b as n,w as d,F as a,d as t}from"./app.9bd053c5.js";const r={},c=l("h1",{id:"field",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#field","aria-hidden":"true"},"#"),t(" Field")],-1),h=l("h2",{id:"props",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#props","aria-hidden":"true"},"#"),t(" Props")],-1),_=l("thead",null,[l("tr",null,[l("th",null,"Prop name"),l("th",null,"Description"),l("th",null,"Type"),l("th",null,"Values"),l("th",null,"Default")])],-1),f=l("td",null,"form",-1),m=t("The form instance that created by "),p=t("createForm"),v=l("td",null,"Form",-1),b=l("td",null,"-",-1),F=l("td",null,null,-1),w=l("tr",null,[l("td",null,"name"),l("td",null,"Field name"),l("td",null,"string"),l("td",null,"-"),l("td")],-1),y=l("td",null,"rules",-1),g=t("FieldRule"),N=t(" list"),T=l("br",null,null,-1),x=l("em",null,"Tips:",-1),V=t(" Do not visit form's error state in the "),B=l("code",null,"validator",-1),C=t(" function, because the validate will change error state, it will causes an infinite loop of calls."),R=l("td",null,"FieldRule[]",-1),k=l("td",null,"-",-1),E=l("td",null,"() => []",-1),D=l("tr",null,[l("td",null,"deps"),l("td",null,[t("Function to generate dependent value. It run in "),l("code",null,"watchEffect"),t(", so if the return value change, the field will "),l("code",null,"revalidate"),t("."),l("br"),l("em",null,"Tips:"),t(" Do not visit form's error state in the function, because the validate will change error state, it will causes an infinite loop of calls.")]),l("td",null,"() => any"),l("td",null,"-"),l("td",null,"undefined")],-1),L=l("tr",null,[l("td",null,"debounce"),l("td",null,"Field validate debounce time, millseconds."),l("td",null,"number"),l("td",null,"-"),l("td",null,"undefined")],-1),O=l("tr",null,[l("td",null,"value"),l("td",null,[t("The initial value of the field, it will override the "),l("code",null,"initValues"),t(" of "),l("code",null,"createForm"),t(".")]),l("td",null,"any"),l("td",null,"-"),l("td",null,"undefined")],-1),U=l("tr",null,[l("td",null,"defaultValue"),l("td",null,[t("The default value of the field, used to determine whether field is dirty and reset field. it will override the "),l("code",null,"initValues"),t(" of "),l("code",null,"createForm"),t(".")]),l("td",null,"any"),l("td",null,"-"),l("td",null,"undefined")],-1),A=l("tr",null,[l("td",null,"transform"),l("td",null,"Transform value before pass to validate."),l("td",null,"(v: any) => any"),l("td",null,"-"),l("td",null,"undefined")],-1),G=l("tr",null,[l("td",null,"touchType"),l("td",null,[t("When to mark the field is "),l("code",null,"touched"),t(", default is 'BLUR', means that the field will be "),l("code",null,"touched"),t(" after bulur event.")]),l("td",null,"string"),l("td",null,[l("code",null,"FOCUS"),t(", "),l("code",null,"BLUR")]),l("td",null,"'BLUR'")],-1),H=l("tr",null,[l("td",null,"changeType"),l("td",null,"When to change the field value, default is 'ONCHANGE', means that the field will setValue when input really event."),l("td",null,"string"),l("td",null,[l("code",null,"ONINPUT"),t(", "),l("code",null,"ONCHANGE")]),l("td",null,"'ONCHANGE'")],-1),P=l("tr",null,[l("td",null,"isEqual"),l("td",null,"Compare value and defaultValue, checkout them wether is append."),l("td",null,"(v: any) => any"),l("td",null,"-"),l("td",null,"undefined")],-1),S=l("h2",{id:"slots",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#slots","aria-hidden":"true"},"#"),t(" Slots")],-1),I=l("thead",null,[l("tr",null,[l("th",null,"Name"),l("th",null,"Description"),l("th",null,"Bindings")])],-1),W=l("td",null,"default",-1),q=l("td",null,"Field default slot",-1),j=l("strong",null,"field",-1),z=t(),J=l("code",null,"mixed",-1),K=t(" - see "),M=t("FieldScope"),Q=l("hr",null,null,-1);function X(Y,Z){const e=u("RouterLink");return s(),i(a,null,[c,h,l("table",null,[_,l("tbody",null,[l("tr",null,[f,l("td",null,[m,n(e,{to:"/apis/#createform"},{default:d(()=>[p]),_:1})]),v,b,F]),w,l("tr",null,[y,l("td",null,[n(e,{to:"/apis/#fieldrule"},{default:d(()=>[g]),_:1}),N,T,x,V,B,C]),R,k,E]),D,L,O,U,A,G,H,P])]),S,l("table",null,[I,l("tbody",null,[l("tr",null,[W,q,l("td",null,[j,z,J,K,n(e,{to:"/apis/#fieldscope"},{default:d(()=>[M]),_:1})])])])]),Q],64)}var ll=o(r,[["render",X],["__file","Field.html.vue"]]);export{ll as default};
