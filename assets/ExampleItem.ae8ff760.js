import{g as c,B as n}from"./ctx.fa6c3319.js";import{f as i,a3 as m,R as r,a0 as p,o as d,c as f,v as u,H as _,h as s,_ as v}from"../app.da64a280.mjs";const x=["aria-selected"],B=i({__name:"ExampleItem",props:{title:{type:String,default:""},active:{type:Boolean,default:!1}},setup(a){const o=a,e=c(),t=m(n);return r(()=>{t.addBlock({title:o.title,active:o.active,key:e})}),p(()=>{t.removeBlock(e)}),(l,k)=>(d(),f("div",{class:_(["example-item",{"example-item__active":s(t).active.value===s(e)}]),"aria-selected":a.active},[u(l.$slots,"default")],10,x))}}),g=v(B,[["__file","ExampleItem.vue"]]);export{g as default};