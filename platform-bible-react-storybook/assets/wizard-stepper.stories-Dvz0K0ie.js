import{r as u,j as t}from"./iframe-DnqjC7XE.js";import{d as H}from"./index-BKT-qVtu.js";import{c as J}from"./utils-BPbySc-g.js";import{C as K}from"./check-Chn8897p.js";import"./preload-helper-CTOgD26E.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./index-wk9rVj3k.js";import"./createLucideIcon-CHvp8Xv_.js";function R({currentStep:U,totalSteps:m,locale:V}){const d=V||"en",L=u.useMemo(()=>{const r=new H(d);return e=>r.format(e)},[d]),l=Math.min(Math.max(U,1),m),G=Array.from({length:m},(r,e)=>e+1);return t.jsx("div",{className:"tw:flex tw:items-center","aria-hidden":"true",children:G.map(r=>{let e="upcoming";return r===l?e="active":r<l&&(e="complete"),t.jsxs(u.Fragment,{children:[r>1&&t.jsx("div",{className:"tw:h-px tw:flex-1 tw:bg-border"}),t.jsx("div",{"data-state":e,className:J("tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",e==="active"&&"tw:bg-primary tw:text-primary-foreground",e==="complete"&&"tw:bg-muted tw:text-muted-foreground",e==="upcoming"&&"tw:border tw:border-input tw:text-muted-foreground"),children:e==="complete"?t.jsx(K,{className:"tw:h-4 tw:w-4"}):L(r)})]},r)})})}R.__docgenInfo={description:"Displays a row of numbered step circles showing progress through a multi-step wizard. Purely\npresentational — owns no navigation state. All circles are `aria-hidden`; the consuming shell is\nresponsible for a `sr-only` `aria-live` sibling that announces the current step to screen\nreaders.",methods:[],displayName:"WizardStepper",props:{currentStep:{required:!0,tsType:{name:"number"},description:"1-based index of the currently active step."},totalSteps:{required:!0,tsType:{name:"number"},description:"Total number of numbered steps."},locale:{required:!1,tsType:{name:"string"},description:"BCP 47 locale tag for numeral formatting in the circle labels. E.g. `'ar'` → ١٢٣٤. Defaults to\n`'en'`; an empty string also falls back to `'en'` (`Intl.NumberFormat('')` throws a\n`RangeError` in V8)."}}};const ae={title:"Basics/WizardStepper",component:R,tags:["autodocs","test"],args:{totalSteps:4}},n={args:{currentStep:1}},c={args:{currentStep:2}},p={args:{currentStep:3}},i={args:{currentStep:4}},s={args:{currentStep:2,locale:"ar"}},a={args:{currentStep:99}},o={args:{currentStep:0}};var f,g,S;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    currentStep: 1
  }
}`,...(S=(g=n.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var w,h,y;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    currentStep: 2
  }
}`,...(y=(h=c.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var b,x,v;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    currentStep: 3
  }
}`,...(v=(x=p.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var C,j,E;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    currentStep: 4
  }
}`,...(E=(j=i.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};var N,q,A,T,_;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    currentStep: 2,
    locale: 'ar'
  }
}`,...(A=(q=s.parameters)==null?void 0:q.docs)==null?void 0:A.source},description:{story:"Verify Arabic-Indic numerals: circles should show ١ ٢ ٣ ٤",...(_=(T=s.parameters)==null?void 0:T.docs)==null?void 0:_.description}}};var z,k,B,F,I;a.parameters={...a.parameters,docs:{...(z=a.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    currentStep: 99
  }
}`,...(B=(k=a.parameters)==null?void 0:k.docs)==null?void 0:B.source},description:{story:"CurrentStep > totalSteps: clamped to last step — step 4 renders as active, steps 1-3 as complete.",...(I=(F=a.parameters)==null?void 0:F.docs)==null?void 0:I.description}}};var M,O,W,D,P;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    currentStep: 0
  }
}`,...(W=(O=o.parameters)==null?void 0:O.docs)==null?void 0:W.source},description:{story:"CurrentStep < 1: clamped to step 1 — step 1 renders as active, no steps shown as complete.",...(P=(D=o.parameters)==null?void 0:D.docs)==null?void 0:P.description}}};const oe=["Step1of4","Step2of4","Step3of4","Step4of4","ArabicNumerals","OverflowClamped","UnderflowClamped"];export{s as ArabicNumerals,a as OverflowClamped,n as Step1of4,c as Step2of4,p as Step3of4,i as Step4of4,o as UnderflowClamped,oe as __namedExportsOrder,ae as default};
