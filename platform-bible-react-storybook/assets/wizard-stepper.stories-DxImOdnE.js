import{r as h,j as t}from"./iframe-Cr6hqgOO.js";import{a as $}from"./index-aWm5KcgP.js";import{c as ee}from"./utils-BPbySc-g.js";import{C as re}from"./check-CvswnIqW.js";import"./preload-helper-CTOgD26E.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./createLucideIcon-V8nQYxqy.js";function K({currentStep:Q,totalSteps:m,locale:X,completedSteps:l}){const u=X||"en",Y=h.useMemo(()=>{const r=new $(u);return e=>r.format(e)},[u]),f=Math.min(Math.max(Q,1),m),Z=Array.from({length:m},(r,e)=>e+1);return t.jsx("div",{className:"tw:flex tw:items-center","aria-hidden":"true",children:Z.map(r=>{let e="upcoming";return r===f?e="active":(l?l.includes(r):r<f)&&(e="complete"),t.jsxs(h.Fragment,{children:[r>1&&t.jsx("div",{className:"tw:h-px tw:flex-1 tw:bg-border"}),t.jsx("div",{"data-state":e,className:ee("tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",e==="active"&&"tw:bg-primary tw:text-primary-foreground",e==="complete"&&"tw:bg-muted tw:text-muted-foreground",e==="upcoming"&&"tw:border tw:border-input tw:text-muted-foreground"),children:e==="complete"?t.jsx(re,{className:"tw:h-4 tw:w-4"}):Y(r)})]},r)})})}K.__docgenInfo={description:"Displays a row of numbered step circles showing progress through a multi-step wizard. Purely\npresentational — owns no navigation state. All circles are `aria-hidden`; the consuming shell is\nresponsible for a `sr-only` `aria-live` sibling that announces the current step to screen\nreaders. Completion marks are visual only: when `completedSteps` marks steps out of order, a\nconsumer whose users need that state should convey it another way too (e.g. in each step's own\ncontent).",methods:[],displayName:"WizardStepper",props:{currentStep:{required:!0,tsType:{name:"number"},description:"1-based index of the currently active step."},totalSteps:{required:!0,tsType:{name:"number"},description:"Total number of numbered steps."},locale:{required:!1,tsType:{name:"string"},description:"BCP 47 locale tag for numeral formatting in the circle labels. E.g. `'ar'` → ١٢٣٤. Defaults to\n`'en'`; an empty string also falls back to `'en'` (`Intl.NumberFormat('')` throws a\n`RangeError` in V8)."},completedSteps:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:"1-based indices of the steps to show as complete. When omitted, every step before `currentStep`\nis complete. Pass it when completion does not follow position — e.g. a wizard the user can step\nback through, where later steps may already be done. The active step always shows as active."}}};const me={title:"Basics/WizardStepper",component:K,tags:["autodocs","test"],args:{totalSteps:4}},c={args:{currentStep:1}},p={args:{currentStep:2}},i={args:{currentStep:3}},d={args:{currentStep:4}},s={args:{currentStep:1,completedSteps:[2,3]}},a={args:{currentStep:2,locale:"ar"}},o={args:{currentStep:99}},n={args:{currentStep:0}};var S,g,w;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    currentStep: 1
  }
}`,...(w=(g=c.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};var y,b,x;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    currentStep: 2
  }
}`,...(x=(b=p.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var v,C,j;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    currentStep: 3
  }
}`,...(j=(C=i.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var k,E,T;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    currentStep: 4
  }
}`,...(T=(E=d.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var q,z,A,W,B;s.parameters={...s.parameters,docs:{...(q=s.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    currentStep: 1,
    completedSteps: [2, 3]
  }
}`,...(A=(z=s.parameters)==null?void 0:z.docs)==null?void 0:A.source},description:{story:"Stepped back to step 1 of a wizard whose steps 2 and 3 are already done.",...(B=(W=s.parameters)==null?void 0:W.docs)==null?void 0:B.description}}};var N,_,F,I,M;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    currentStep: 2,
    locale: 'ar'
  }
}`,...(F=(_=a.parameters)==null?void 0:_.docs)==null?void 0:F.source},description:{story:"Verify Arabic-Indic numerals: circles should show ١ ٢ ٣ ٤",...(M=(I=a.parameters)==null?void 0:I.docs)==null?void 0:M.description}}};var O,P,D,R,U;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    currentStep: 99
  }
}`,...(D=(P=o.parameters)==null?void 0:P.docs)==null?void 0:D.source},description:{story:"CurrentStep > totalSteps: clamped to last step — step 4 renders as active, steps 1-3 as complete.",...(U=(R=o.parameters)==null?void 0:R.docs)==null?void 0:U.description}}};var V,L,G,H,J;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    currentStep: 0
  }
}`,...(G=(L=n.parameters)==null?void 0:L.docs)==null?void 0:G.source},description:{story:"CurrentStep < 1: clamped to step 1 — step 1 renders as active, no steps shown as complete.",...(J=(H=n.parameters)==null?void 0:H.docs)==null?void 0:J.description}}};const le=["Step1of4","Step2of4","Step3of4","Step4of4","SteppedBackWithCompletedSteps","ArabicNumerals","OverflowClamped","UnderflowClamped"];export{a as ArabicNumerals,o as OverflowClamped,c as Step1of4,p as Step2of4,i as Step3of4,d as Step4of4,s as SteppedBackWithCompletedSteps,n as UnderflowClamped,le as __namedExportsOrder,me as default};
