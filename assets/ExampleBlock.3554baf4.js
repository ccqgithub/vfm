import{_ as m,f as _,I as o,E as c}from"./app.4967367c.js";const x=_({name:"ExampleBlock",setup(k,{slots:n}){const a=o(-1),u=o([]),v=(e=a.value)=>{e<u.value.length-1?a.value=e+1:a.value=0,u.value[a.value].focus()},f=(e=a.value)=>{e>0?a.value=e-1:a.value=u.value.length-1,u.value[a.value].focus()},i=(e,r)=>{e.key===" "||e.key==="Enter"?(e.preventDefault(),a.value=r):e.key==="ArrowRight"?(e.preventDefault(),v(r)):e.key==="ArrowLeft"&&(e.preventDefault(),f(r))};return()=>{var r;const e=(((r=n.default)==null?void 0:r.call(n))||[]).filter(l=>{const t=l.type.name;return t==="ExampleItem"||t==="AsyncComponentWrapper"}).map(l=>(l.props===null&&(l.props={}),l));return e.length===0?null:(a.value<0||a.value>e.length-1?(a.value=e.findIndex(l=>l.props.active===""||l.props.active===!0),a.value===-1&&(a.value=0)):e.forEach((l,t)=>{l.props.active=t===a.value}),c("div",{class:"example-block"},[c("div",{class:"example-block__nav"},c("ul",{class:"example-block__ul"},e.map((l,t)=>{const p=t===a.value;return c("li",{class:"example-block__li"},c("button",{ref:s=>{s&&(u.value[t]=s)},class:{"example-block__nav-tab":!0,"example-block__nav-tab-active":p},ariaPressed:p,ariaExpanded:p,onClick:()=>a.value=t,onKeydown:s=>i(s,t)},l.props.title))}))),e]))}}});var d=m(x,[["__file","ExampleBlock.vue"]]);export{d as default};