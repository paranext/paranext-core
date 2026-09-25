import{r as _,j as s}from"./iframe-BuAslHK5.js";import{B as X}from"./button-CkwNhtvy.js";import{L as Z}from"./label-SSs8B6KT.js";import{R as ee,a as te}from"./radio-group-B1_GwlVy.js";import{c as g}from"./utils-BPbySc-g.js";import{C as re}from"./chevron-down-CPZ5btaD.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./index-CSFiBaRo.js";import"./index-Dhw2S8oA.js";import"./index-B4hIMw6l.js";import"./index-DvCyZILw.js";import"./index-Rk8NGxiK.js";import"./index-DxRrSfPy.js";import"./index-aoH12Seb.js";import"./index-SoSK5Jm7.js";import"./index-D1hQSaXA.js";import"./index-B6YZRYAm.js";import"./index-D6kSPupD.js";import"./index-ubIJ78tM.js";import"./createLucideIcon-DhMC1uO-.js";const J=[{value:"Production",labelKey:"%paratextRegistration_label_serverType_option_Production_2%",testId:"server-type-production"},{value:"QualityAssurance",labelKey:"%paratextRegistration_label_serverType_option_QualityAssurance_2%",testId:"server-type-quality-assurance"},{value:"Development",labelKey:"%paratextRegistration_label_serverType_option_Development_2%",testId:"server-type-development"},{value:"Test",labelKey:"%paratextRegistration_label_serverType_option_Test_2%",testId:"server-type-test"}],ae=t=>J.some(r=>r.value===t);function M({localizedStrings:t,selectedServer:r,onServerChange:e,disabled:p}){const[u,U]=_.useState(!1),m=_.useId(),v=`${m}-header`,y=`${m}-content`,h=a=>`${m}-${a}`;return s.jsxs("div",{className:"tw:border-t tw:pt-2",children:[s.jsxs(X,{id:v,variant:"ghost",size:"sm","aria-expanded":u,"aria-controls":y,className:"tw:flex tw:w-full tw:items-center tw:justify-between tw:px-2 tw:font-normal tw:text-muted-foreground",onClick:()=>U(a=>!a),children:[s.jsx("span",{children:t["%paratextRegistration_developer_section_label%"]}),s.jsx(re,{className:g("tw:size-4","tw:transition-transform",u&&"tw:rotate-180")})]}),s.jsx("div",{id:y,className:"tw:mt-2 tw:px-2",hidden:!u,children:s.jsx(ee,{"aria-labelledby":v,value:r,onValueChange:a=>{ae(a)&&e(a)},disabled:p,children:J.map(a=>s.jsxs("div",{className:g("tw:flex tw:w-full tw:items-center tw:gap-2 tw:rounded tw:px-2 tw:py-1.5",!p&&"tw:hover:bg-accent"),children:[s.jsx(te,{value:a.value,id:h(a.value),"data-testid":a.testId,disabled:p}),s.jsx(Z,{htmlFor:h(a.value),className:"tw:flex-1 tw:cursor-pointer",children:t[a.labelKey]})]},a.value))})})]})}M.__docgenInfo={description:"@experimental This export is unstable and may change shape or disappear without notice",methods:[],displayName:"DeveloperSection",props:{localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:"Localized strings; pass strings resolved from `DEVELOPER_SECTION_STRING_KEYS`."},selectedServer:{required:!0,tsType:{name:"union",raw:"'Production' | 'QualityAssurance' | 'Development' | 'Test'",elements:[{name:"literal",value:"'Production'"},{name:"literal",value:"'QualityAssurance'"},{name:"literal",value:"'Development'"},{name:"literal",value:"'Test'"}]},description:"The currently selected server type. Every `ServerType` has its own radio."},onServerChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(server: ServerType) => void",signature:{arguments:[{type:{name:"union",raw:"'Production' | 'QualityAssurance' | 'Development' | 'Test'",elements:[{name:"literal",value:"'Production'"},{name:"literal",value:"'QualityAssurance'"},{name:"literal",value:"'Development'"},{name:"literal",value:"'Test'"}]},name:"server"}],return:{name:"void"}}},description:"Called when the user switches to a different server type."},disabled:{required:!0,tsType:{name:"boolean"},description:"When true, the radio items are non-interactive (loading or saving in progress)."}}};const se={"%paratextRegistration_developer_section_label%":"Developer only","%paratextRegistration_label_serverType_option_Production_2%":"Production server","%paratextRegistration_label_serverType_option_QualityAssurance_2%":"Quality assurance server","%paratextRegistration_label_serverType_option_Development_2%":"Development server","%paratextRegistration_label_serverType_option_Test_2%":"Test server"},De={title:"Advanced/DeveloperSection",component:M,tags:["autodocs"],args:{localizedStrings:se,selectedServer:"Production",onServerChange:()=>{},disabled:!1}},n={},o={play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},i={args:{selectedServer:"Development"},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},c={args:{selectedServer:"Test"},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},l={args:{selectedServer:"QualityAssurance"},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},d={args:{disabled:!0},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}};var S,x,f,b,w;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:"{}",...(f=(x=n.parameters)==null?void 0:x.docs)==null?void 0:f.source},description:{story:"Collapsed by default — the server radio buttons are not visible.",...(w=(b=n.parameters)==null?void 0:b.docs)==null?void 0:w.description}}};var E,T,D,A,R;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  }
}`,...(D=(T=o.parameters)==null?void 0:T.docs)==null?void 0:D.source},description:{story:"Section expanded — Production is the selected server.",...(R=(A=o.parameters)==null?void 0:A.docs)==null?void 0:R.description}}};var q,C,I,P,Q;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    selectedServer: 'Development'
  },
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  }
}`,...(I=(C=i.parameters)==null?void 0:C.docs)==null?void 0:I.source},description:{story:"Section expanded — Development is the selected server.",...(Q=(P=i.parameters)==null?void 0:P.docs)==null?void 0:Q.description}}};var j,k,N,L,K;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    selectedServer: 'Test'
  },
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  }
}`,...(N=(k=c.parameters)==null?void 0:k.docs)==null?void 0:N.source},description:{story:"Section expanded — Test is the selected server.",...(K=(L=c.parameters)==null?void 0:L.docs)==null?void 0:K.description}}};var z,B,O,$,G;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    selectedServer: 'QualityAssurance'
  },
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  }
}`,...(O=(B=l.parameters)==null?void 0:B.docs)==null?void 0:O.source},description:{story:`Section expanded — Quality Assurance is the active server. QA is its own ParatextData
environment: it shares the registry and DBL servers with Development, but has its own
Send/Receive archive and Paratext Live server.`,...(G=($=l.parameters)==null?void 0:$.docs)==null?void 0:G.description}}};var V,W,F,Y,H;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  }
}`,...(F=(W=d.parameters)==null?void 0:W.docs)==null?void 0:F.source},description:{story:"`disabled={true}` — header still clickable, but the server radios are greyed out and\nnon-interactive.",...(H=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:H.description}}};const Ae=["Collapsed","Expanded","DevelopmentActive","TestActive","QualityAssuranceActive","Disabled"];export{n as Collapsed,i as DevelopmentActive,d as Disabled,o as Expanded,l as QualityAssuranceActive,c as TestActive,Ae as __namedExportsOrder,De as default};
