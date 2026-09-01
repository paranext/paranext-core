import{r as F,j as a}from"./iframe-Bl__27RN.js";import{B as H}from"./button-B5k3FGyj.js";import{T as J,a as p}from"./toggle-group-DJi_21cg.js";import{c as M}from"./utils-BPbySc-g.js";import{C as U}from"./chevron-down-CdLRwBBe.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./index-Cqx6fE_L.js";import"./index-Bj1l-Dyy.js";import"./index-Z5izMdEr.js";import"./index-Dkb4DXGI.js";import"./index-DVtVR7uE.js";import"./index-CFQvMToA.js";import"./index-DV29KLj2.js";import"./index-B1pVzxvi.js";import"./index-q2VzFHPS.js";import"./createLucideIcon-D-AB5elM.js";function K({localizedStrings:t,selectedServer:r,onServerChange:e,disabled:W}){const[u,Y]=F.useState(!1);return a.jsxs("div",{className:"tw:border-t tw:pt-2",children:[a.jsxs(H,{variant:"ghost",size:"sm","aria-expanded":u,"aria-controls":"developer-section-content",className:"tw:flex tw:w-full tw:items-center tw:justify-between tw:px-2 tw:font-normal tw:text-muted-foreground",onClick:()=>Y(n=>!n),children:[a.jsx("span",{children:t["%paratextRegistration_developer_section_label%"]}),a.jsx(U,{className:M("tw:size-4","tw:transition-transform",u&&"tw:rotate-180")})]}),a.jsx("div",{id:"developer-section-content",className:"tw:mt-2 tw:px-2",hidden:!u,children:a.jsxs(J,{type:"single",value:r,onValueChange:n=>{(n==="Production"||n==="QualityAssurance"||n==="Development"||n==="Test")&&e(n)},disabled:W,children:[a.jsx(p,{value:"Production",variant:"outline","data-testid":"server-type-production",children:t["%paratextRegistration_label_serverType_option_Production%"]}),a.jsx(p,{value:"QualityAssurance",variant:"outline","data-testid":"server-type-quality-assurance",children:t["%paratextRegistration_label_serverType_option_QualityAssurance%"]}),a.jsx(p,{value:"Development",variant:"outline","data-testid":"server-type-development",children:t["%paratextRegistration_label_serverType_option_Development%"]}),a.jsx(p,{value:"Test",variant:"outline","data-testid":"server-type-test",children:t["%paratextRegistration_label_serverType_option_Test%"]})]})})]})}K.__docgenInfo={description:"@experimental This export is unstable and may change shape or disappear without notice",methods:[],displayName:"DeveloperSection",props:{localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:"Localized strings; pass strings resolved from `DEVELOPER_SECTION_STRING_KEYS`."},selectedServer:{required:!0,tsType:{name:"union",raw:"'Production' | 'QualityAssurance' | 'Development' | 'Test'",elements:[{name:"literal",value:"'Production'"},{name:"literal",value:"'QualityAssurance'"},{name:"literal",value:"'Development'"},{name:"literal",value:"'Test'"}]},description:"The currently selected server type. Every `ServerType` has its own item in the toggle."},onServerChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(server: ServerType) => void",signature:{arguments:[{type:{name:"union",raw:"'Production' | 'QualityAssurance' | 'Development' | 'Test'",elements:[{name:"literal",value:"'Production'"},{name:"literal",value:"'QualityAssurance'"},{name:"literal",value:"'Development'"},{name:"literal",value:"'Test'"}]},name:"server"}],return:{name:"void"}}},description:"Called when the user switches to a different server type."},disabled:{required:!0,tsType:{name:"boolean"},description:"When true, the toggle items are non-interactive (loading or saving in progress)."}}};const X={"%paratextRegistration_developer_section_label%":"Developer only","%paratextRegistration_label_serverType_option_Production%":"Production","%paratextRegistration_label_serverType_option_QualityAssurance%":"Quality Assurance","%paratextRegistration_label_serverType_option_Development%":"Development","%paratextRegistration_label_serverType_option_Test%":"Test"},ye={title:"Advanced/DeveloperSection",component:K,tags:["autodocs"],args:{localizedStrings:X,selectedServer:"Production",onServerChange:()=>{},disabled:!1}},s={},o={play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},i={args:{selectedServer:"Development"},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},c={args:{selectedServer:"Test"},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},l={args:{selectedServer:"QualityAssurance"},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},d={args:{disabled:!0},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}};var m,v,y,h,g;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(y=(v=s.parameters)==null?void 0:v.docs)==null?void 0:y.source},description:{story:"Collapsed by default — the server toggle is not visible.",...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.description}}};var _,x,S,f,w;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  }
}`,...(S=(x=o.parameters)==null?void 0:x.docs)==null?void 0:S.source},description:{story:"Section expanded — Production is the active server.",...(w=(f=o.parameters)==null?void 0:f.docs)==null?void 0:w.description}}};var b,T,E,D,A;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(E=(T=i.parameters)==null?void 0:T.docs)==null?void 0:E.source},description:{story:"Section expanded — Development is the active server.",...(A=(D=i.parameters)==null?void 0:D.docs)==null?void 0:A.description}}};var q,Q,j,C,P;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(j=(Q=c.parameters)==null?void 0:Q.docs)==null?void 0:j.source},description:{story:"Section expanded — Test is the active server.",...(P=(C=c.parameters)==null?void 0:C.docs)==null?void 0:P.description}}};var R,k,N,I,L;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(N=(k=l.parameters)==null?void 0:k.docs)==null?void 0:N.source},description:{story:`Section expanded — Quality Assurance is the active server. QA is its own ParatextData
environment: it shares the registry and DBL servers with Development, but has its own
Send/Receive archive and Paratext Live server.`,...(L=(I=l.parameters)==null?void 0:I.docs)==null?void 0:L.description}}};var B,G,O,V,z;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(O=(G=d.parameters)==null?void 0:G.docs)==null?void 0:O.source},description:{story:"`disabled={true}` — header still clickable, but the server toggle is greyed out and\nnon-interactive.",...(z=(V=d.parameters)==null?void 0:V.docs)==null?void 0:z.description}}};const he=["Collapsed","Expanded","DevelopmentActive","TestActive","QualityAssuranceActive","Disabled"];export{s as Collapsed,i as DevelopmentActive,d as Disabled,o as Expanded,l as QualityAssuranceActive,c as TestActive,he as __namedExportsOrder,ye as default};
