import{j as a}from"./jsx-runtime-4wK_0ZO4.js";import{F as k}from"./footnote-item.component-BiMPY_Hi.js";import{T as g}from"./theme-provider.component-Bum-YBGl.js";import"./iframe-BcYeWgcr.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./circle-alert-ZIS4O6V_.js";import"./createLucideIcon-D1oFpSf_.js";const W={title:"Advanced/FootnoteItem",component:k,tags:["autodocs"],decorators:[t=>a.jsx(g,{children:a.jsx("div",{className:"tw-p-4",children:a.jsx(t,{})})})],args:{className:"",formatCaller:void 0,showMarkers:!0}},e={args:{footnote:{type:"note",marker:"f",caller:"a",content:[{marker:"ft",type:"text",content:["This is a basic footnote."]}]}}},o={args:{footnote:{type:"note",marker:"x",caller:void 0,content:[{marker:"xo",type:"text",content:["1:2"]},{marker:"xt",type:"text",content:["Malachi 3:1"]}]}}},r={args:{formatCaller:t=>{if(t==="+")return"a";if(t!=="-")return t},footnote:{type:"note",marker:"f",caller:"+",content:[{marker:"fr",type:"text",content:["1:8"]},{marker:"ft",type:"text",content:["Footnote with a custom caller formatter."]}]}}},n={args:{footnote:{type:"note",marker:"f",caller:"a",content:["This text is not marked using a valid footnote character style."]}}};var s,c,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    footnote: {
      type: 'note',
      marker: 'f',
      caller: 'a',
      content: [{
        marker: 'ft',
        type: 'text',
        content: ['This is a basic footnote.']
      }]
    }
  } satisfies FootnoteItemProps
}`,...(i=(c=e.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var m,l,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    footnote: {
      type: 'note',
      marker: 'x',
      caller: undefined,
      content: [{
        marker: 'xo',
        type: 'text',
        content: ['1:2']
      }, {
        marker: 'xt',
        type: 'text',
        content: ['Malachi 3:1']
      }]
    }
  } satisfies FootnoteItemProps
}`,...(p=(l=o.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var f,d,u;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    formatCaller: c => {
      if (c === '+') return 'a';
      if (c === '-') return undefined;
      return c;
    },
    footnote: {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [{
        marker: 'fr',
        type: 'text',
        content: ['1:8']
      }, {
        marker: 'ft',
        type: 'text',
        content: ['Footnote with a custom caller formatter.']
      }]
    }
  } satisfies FootnoteItemProps
}`,...(u=(d=r.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var x,h,y;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    footnote: {
      type: 'note',
      marker: 'f',
      caller: 'a',
      content: ['This text is not marked using a valid footnote character style.']
    }
  } satisfies FootnoteItemProps
}`,...(y=(h=n.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const M=["Basic","CrossReferenceWithoutCaller","WithCallerFormatting","FootnoteTextWithoutMarker"];export{e as Basic,o as CrossReferenceWithoutCaller,n as FootnoteTextWithoutMarker,r as WithCallerFormatting,M as __namedExportsOrder,W as default};
