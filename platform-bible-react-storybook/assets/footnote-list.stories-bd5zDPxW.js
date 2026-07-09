import{r as T,j as e}from"./iframe-C8C5euZN.js";import{F as R}from"./footnote-list.component-BGUoceYG.js";import{l as P}from"./index-D7R6UePp.js";import"./usj-nodes-l0sNRNKZ.js";import{R as E,a as f,b as W}from"./resizable-Byi2PkN0.js";import{u as o}from"./footnotes.usj.data-CykJO-pk.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./separator-YaBSIyW_.js";import"./index-6CD405rD.js";import"./index-B_rL6yMC.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./circle-alert-C1042QaX.js";import"./createLucideIcon-DxgUyrtO.js";import"./index-DEIPSgGC.js";const $={title:"Advanced/FootnoteList",component:R,tags:["autodocs"],decorators:[t=>e.jsx("div",{className:"tw:h-[300px] tw:overflow-hidden tw:border tw:border-slate-300 tw:p-4",children:e.jsx(t,{})})],argTypes:{layout:{control:{type:"radio"},options:["horizontal","vertical"]}}};function d({footnotes:t=[],listId:m="default-list-id",...r}={}){const[s,u]=T.useState();return e.jsx(R,{...r,footnotes:t,listId:m,selectedFootnote:s,onFootnoteSelected:p=>u(p)})}function N({footnotes:t=[],listId:m="default-list-id",showMarkers:r,...s}={}){const[u,p]=T.useState();return e.jsxs(E,{direction:s.layout==="horizontal"?"vertical":"horizontal",className:"tw:h-full tw:min-h-0 tw:w-full",children:[e.jsx(f,{className:"tw:flex tw:min-h-0 tw:flex-col",children:e.jsx("div",{className:"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col",children:e.jsxs("p",{children:[e.jsx("sup",{children:"11"}),"In the beginning",r?e.jsx("span",{className:"tw:text-blue-400",children:"\\f + \\fr 1.11 \\fr* This is a simple footnote \\f"}):e.jsx("sup",{children:"a"}),"..."]})})}),e.jsxs(e.Fragment,{children:[e.jsx(W,{}),e.jsx(f,{defaultSize:39,className:"tw:flex tw:min-h-0 tw:flex-col tw:bg-sidebar tw:pb-0 tw:pl-2 tw:pr-0 tw:pt-2",minSize:15,maxSize:85,children:e.jsx("div",{className:"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col",children:e.jsx(d,{...s,footnotes:t,listId:m,selectedFootnote:u,showMarkers:r,onFootnoteSelected:B=>p(B)})})})]})]})}const a={render:d,args:{footnotes:o,listId:"storybook-Basic",showMarkers:!1,layout:"horizontal"}},n={render:d,args:{footnotes:o,listId:"storybook-WithCustomCallerFormatting",showMarkers:!0,layout:"horizontal",formatCaller:P(o,["†","‡","⁂","★","☆"])}},l={render:d,args:{footnotes:o,listId:"storybook-Raw",showMarkers:!0,layout:"horizontal",formatCaller:t=>t}},i={render:N,args:{footnotes:o,listId:"storybook-Formatted",showMarkers:!1,layout:"vertical"}},c={render:N,args:{footnotes:o,listId:"storybook-ShowMarkers",showMarkers:!0,layout:"vertical",formatCaller:t=>t}};var h,w,x;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Basic',
    showMarkers: false,
    layout: 'horizontal'
  }
}`,...(x=(w=a.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var y,F,g;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-WithCustomCallerFormatting',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: getFormatCallerFunction(usjFootnotes, ['†', '‡', '⁂', '★', '☆'])
  }
}`,...(g=(F=n.parameters)==null?void 0:F.docs)==null?void 0:g.source}}};var j,S,k;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Raw',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: caller => caller
  }
}`,...(k=(S=l.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var b,C,z;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: ScripturePanelTemplate,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Formatted',
    showMarkers: false,
    layout: 'vertical'
  }
}`,...(z=(C=i.parameters)==null?void 0:C.docs)==null?void 0:z.source}}};var M,v,I;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: ScripturePanelTemplate,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-ShowMarkers',
    showMarkers: true,
    layout: 'vertical',
    formatCaller: caller => caller
  }
}`,...(I=(v=c.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};const ee=["Basic","WithCustomCallerFormatting","Raw","Formatted","ShowMarkers"];export{a as Basic,i as Formatted,l as Raw,c as ShowMarkers,n as WithCustomCallerFormatting,ee as __namedExportsOrder,$ as default};
