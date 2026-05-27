import{j as c}from"./jsx-runtime-BqcUmbcY.js";import{u as o,F as W}from"./footnotes.usj.data-COTBmgmF.js";import{c as T}from"./utils-BPbySc-g.js";import"./circle-alert-B7tC58O3.js";import"./createLucideIcon-CDQuxaC1.js";import"./iframe-JTaHGDwD.js";import"./preload-helper-CTOgD26E.js";import"./index-DEIPSgGC.js";import"./index-D2t4nnj1.js";const _={title:"Advanced/FootnoteItem",component:W,tags:["autodocs"],decorators:[e=>c.jsx("div",{className:T("formatted-font","tw:p-4"),children:c.jsx(e,{})})],args:{formatCaller:void 0,showMarkers:!0}},t={args:{footnote:o[0]}},r={args:{footnote:o[2]}};function b({callerSymbol:e,...v}){return c.jsx(W,{...v,formatCaller:m=>{if(m==="+")return e;if(m!=="-")return m}})}const s={args:{callerSymbol:"†",footnote:o[1]},argTypes:{callerSymbol:{control:"text"}},render:e=>c.jsx(b,{...e})},n={args:{footnote:o[5]}},a={args:{formatCaller:e=>{if(e==="+")return"a";if(e!=="-")return e},footnote:o[4]}};var i,l,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    footnote: usjFootnotes[0]
  } satisfies FootnoteItemProps
}`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,p,f;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    footnote: usjFootnotes[2]
  } satisfies FootnoteItemProps
}`,...(f=(p=r.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};var g,F,C;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    callerSymbol: '†',
    footnote: usjFootnotes[1]
  },
  argTypes: {
    callerSymbol: {
      control: 'text'
    }
  },
  render: args => <FootnoteItemWithFormatCallerStory {...args} />
}`,...(C=(F=s.parameters)==null?void 0:F.docs)==null?void 0:C.source}}};var h,x,y;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    footnote: usjFootnotes[5]
  } satisfies FootnoteItemProps
}`,...(y=(x=n.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var S,j,I;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    formatCaller: c => {
      if (c === '+') return 'a';
      if (c === '-') return undefined;
      return c;
    },
    footnote: usjFootnotes[4]
  } satisfies FootnoteItemProps
}`,...(I=(j=a.parameters)==null?void 0:j.docs)==null?void 0:I.source}}};const A=["Basic","CrossReferenceWithoutCaller","WithCallerFormatting","UnmarkedFootnoteText","Complex"];export{t as Basic,a as Complex,r as CrossReferenceWithoutCaller,n as UnmarkedFootnoteText,s as WithCallerFormatting,A as __namedExportsOrder,_ as default};
