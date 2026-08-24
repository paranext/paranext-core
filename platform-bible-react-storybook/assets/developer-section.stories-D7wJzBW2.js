import{r as O,j as a}from"./iframe-B3AxZEPB.js";import{B as V}from"./button-COJfTYRH.js";import{T as K,a as p}from"./toggle-group-DCo9VxM_.js";import{c as U}from"./utils-BPbySc-g.js";import{C as W}from"./chevron-down-CxJ7lzo5.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./index-CCDuEtP-.js";import"./index-C3Ys4B3o.js";import"./index-Vtp5bRrj.js";import"./index-CCIoUoVp.js";import"./index-B4tn7cfh.js";import"./index-DThjWhch.js";import"./index-DxSIaTIl.js";import"./index-BXQ91F3b.js";import"./index-UGV436bZ.js";import"./createLucideIcon-CzNzaRJ9.js";function z({localizedStrings:t,selectedServer:r,onServerChange:e,disabled:B}){const[d,G]=O.useState(!1),L=r==="Development"?"Development":"Production";return a.jsxs("div",{className:"tw:border-t tw:pt-2",children:[a.jsxs(V,{variant:"ghost",size:"sm","aria-expanded":d,"aria-controls":"developer-section-content",className:"tw:flex tw:w-full tw:items-center tw:justify-between tw:px-2 tw:font-normal tw:text-muted-foreground",onClick:()=>G(n=>!n),children:[a.jsx("span",{children:t["%paratextRegistration_developer_section_label%"]}),a.jsx(W,{className:U("tw:size-4","tw:transition-transform",d&&"tw:rotate-180")})]}),a.jsx("div",{id:"developer-section-content",className:"tw:mt-2 tw:px-2",hidden:!d,children:a.jsxs(K,{type:"single",value:L,onValueChange:n=>{n==="Production"||n==="Development"?e(n):n===""&&r!=="Production"&&r!=="Development"&&e("Production")},disabled:B,children:[a.jsx(p,{value:"Production",variant:"outline","data-testid":"server-type-production",children:t["%paratextRegistration_label_serverType_option_Production%"]}),a.jsx(p,{value:"Development",variant:"outline","data-testid":"server-type-development",children:t["%paratextRegistration_label_serverType_option_Development%"]})]})})]})}z.__docgenInfo={description:"@experimental This export is unstable and may change shape or disappear without notice",methods:[],displayName:"DeveloperSection",props:{localizedStrings:{required:!0,tsType:{name:"LanguageStrings"},description:"Localized strings; pass strings resolved from `DEVELOPER_SECTION_STRING_KEYS`."},selectedServer:{required:!0,tsType:{name:"union",raw:"'Production' | 'QualityAssurance' | 'Development' | 'Test'",elements:[{name:"literal",value:"'Production'"},{name:"literal",value:"'QualityAssurance'"},{name:"literal",value:"'Development'"},{name:"literal",value:"'Test'"}]},description:"The currently selected server type. QA and Test values display as Production."},onServerChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(server: ServerType) => void",signature:{arguments:[{type:{name:"union",raw:"'Production' | 'QualityAssurance' | 'Development' | 'Test'",elements:[{name:"literal",value:"'Production'"},{name:"literal",value:"'QualityAssurance'"},{name:"literal",value:"'Development'"},{name:"literal",value:"'Test'"}]},name:"server"}],return:{name:"void"}}},description:"Called when the user switches to Production or Development."},disabled:{required:!0,tsType:{name:"boolean"},description:"When true, the toggle items are non-interactive (loading or saving in progress)."}}};const Y={"%paratextRegistration_developer_section_label%":"Developer only","%paratextRegistration_label_serverType_option_Production%":"Production","%paratextRegistration_label_serverType_option_Development%":"Development"},de={title:"Advanced/DeveloperSection",component:z,tags:["autodocs"],args:{localizedStrings:Y,selectedServer:"Production",onServerChange:()=>{},disabled:!1}},s={},o={play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},i={args:{selectedServer:"Development"},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},c={args:{selectedServer:"QualityAssurance"},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}},l={args:{disabled:!0},play:async({canvasElement:t,userEvent:r})=>{const e=t.querySelector("button");e&&await r.click(e)}};var u,m,v,y,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(v=(m=s.parameters)==null?void 0:m.docs)==null?void 0:v.source},description:{story:"Collapsed by default — the server toggle is not visible.",...(h=(y=s.parameters)==null?void 0:y.docs)==null?void 0:h.description}}};var g,f,x,w,S;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    userEvent
  }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  }
}`,...(x=(f=o.parameters)==null?void 0:f.docs)==null?void 0:x.source},description:{story:"Section expanded — Production is the active server.",...(S=(w=o.parameters)==null?void 0:w.docs)==null?void 0:S.description}}};var b,E,_,D,T;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(_=(E=i.parameters)==null?void 0:E.docs)==null?void 0:_.source},description:{story:"Section expanded — Development is the active server.",...(T=(D=i.parameters)==null?void 0:D.docs)==null?void 0:T.description}}};var P,A,q,C,j;c.parameters={...c.parameters,docs:{...(P=c.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(q=(A=c.parameters)==null?void 0:A.docs)==null?void 0:q.source},description:{story:`A QualityAssurance or Test server is persisted (e.g., from a prior session). The UI collapses
these to the Production display; clicking Production switches the user to actual Production.`,...(j=(C=c.parameters)==null?void 0:C.docs)==null?void 0:j.description}}};var k,Q,R,N,I;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(R=(Q=l.parameters)==null?void 0:Q.docs)==null?void 0:R.source},description:{story:"`disabled={true}` — header still clickable, but the Production/Development toggle is greyed out\nand non-interactive.",...(I=(N=l.parameters)==null?void 0:N.docs)==null?void 0:I.description}}};const pe=["Collapsed","Expanded","DevelopmentActive","QualityAssuranceActive","Disabled"];export{s as Collapsed,i as DevelopmentActive,l as Disabled,o as Expanded,c as QualityAssuranceActive,pe as __namedExportsOrder,de as default};
