import{j as o}from"./jsx-runtime-nEE8mmL3.js";import{F as T,u as t}from"./footnotes.usj.data-CP4bFbZH.js";import{T as W}from"./theme-provider.component-QvsO7xLU.js";import{c as P}from"./shadcn-ui.util-DMJ19wEV.js";import"./iframe-ByFkd3FX.js";import"./preload-helper-CTOgD26E.js";import"./circle-alert-CnDN30x5.js";import"./createLucideIcon-BPt5Qt8Q.js";import"./index-DHHh0bqX.js";import"./index-Bl2C2VvJ.js";const M={title:"Advanced/FootnoteItem",component:T,tags:["autodocs"],decorators:[e=>o.jsx(W,{children:o.jsx("div",{className:P("formatted-font","tw-p-4"),children:o.jsx(e,{})})})],args:{formatCaller:void 0,showMarkers:!0}},r={args:{footnote:t[0]}},s={args:{footnote:t[2]}};function b({callerSymbol:e,...v}){return o.jsx(T,{...v,formatCaller:m=>{if(m==="+")return e;if(m!=="-")return m}})}const n={args:{callerSymbol:"†",footnote:t[1]},argTypes:{callerSymbol:{control:"text"}},render:e=>o.jsx(b,{...e})},a={args:{footnote:t[5]}},c={args:{formatCaller:e=>{if(e==="+")return"a";if(e!=="-")return e},footnote:t[4]}};var i,l,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    footnote: usjFootnotes[0]
  } satisfies FootnoteItemProps
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var p,u,f;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    footnote: usjFootnotes[2]
  } satisfies FootnoteItemProps
}`,...(f=(u=s.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var g,F,h;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(h=(F=n.parameters)==null?void 0:F.docs)==null?void 0:h.source}}};var C,x,j;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    footnote: usjFootnotes[5]
  } satisfies FootnoteItemProps
}`,...(j=(x=a.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var y,S,I;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    formatCaller: c => {
      if (c === '+') return 'a';
      if (c === '-') return undefined;
      return c;
    },
    footnote: usjFootnotes[4]
  } satisfies FootnoteItemProps
}`,...(I=(S=c.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};const O=["Basic","CrossReferenceWithoutCaller","WithCallerFormatting","UnmarkedFootnoteText","Complex"];export{r as Basic,c as Complex,s as CrossReferenceWithoutCaller,a as UnmarkedFootnoteText,n as WithCallerFormatting,O as __namedExportsOrder,M as default};
