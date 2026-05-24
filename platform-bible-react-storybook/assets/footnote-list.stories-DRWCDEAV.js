import{j as e}from"./jsx-runtime-BqcUmbcY.js";import{r as u}from"./iframe-D92W13E2.js";import{c as F}from"./utils-BPbySc-g.js";import{S as Y}from"./separator-S6418e9g.js";import{z as A}from"./index-CnlRi_gH.js";import{F as Z,u as c}from"./footnotes.usj.data-DXwVpPUa.js";import{R as ee,a as S,b as te}from"./resizable-q5Ujutff.js";import"./preload-helper-CTOgD26E.js";import"./index-ZNdOMKb0.js";import"./index-Bwktk0_R.js";import"./index-mw8YGy7E.js";import"./index-B97NQHu7.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./circle-alert-Cv2-9gOc.js";import"./createLucideIcon-BRR2qaA4.js";import"./index-DEIPSgGC.js";function j({className:n,classNameForItems:m,footnotes:a,layout:o="horizontal",listId:s,selectedFootnote:i,showMarkers:x=!0,suppressFormatting:W=!1,formatCaller:V,onFootnoteSelected:l}){const J=V??A(a,void 0),X=(t,r)=>{l==null||l(t,r,s)},$=i?a.findIndex(t=>t===i):-1,[d,z]=u.useState($),G=(t,r,p)=>{if(a.length)switch(t.key){case"Enter":case" ":t.preventDefault(),l==null||l(r,p,s);break}},H=t=>{if(a.length)switch(t.key){case"ArrowDown":t.preventDefault(),z(r=>Math.min(r+1,a.length-1));break;case"ArrowUp":t.preventDefault(),z(r=>Math.max(r-1,0));break}},k=u.useRef([]);return u.useEffect(()=>{var t;d>=0&&d<k.current.length&&((t=k.current[d])==null||t.focus())},[d]),e.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:d<0?0:-1,className:F("tw:h-full tw:overflow-y-auto",n),onKeyDown:H,children:e.jsx("ul",{className:F("tw:p-0.5 tw:pt-1","tw:grid",o==="horizontal"?"tw:grid-cols-[min-content_min-content_1fr]":"tw:grid-cols-[min-content_1fr]",!W&&"formatted-font"),children:a.map((t,r)=>{const p=t===i,Q=`${s}-${r}`;return e.jsxs(e.Fragment,{children:[e.jsx("li",{ref:v=>{k.current[r]=v},role:"option","aria-selected":p,"data-marker":t.marker,"data-state":p?"selected":void 0,tabIndex:r===d?0:-1,className:F("tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",l&&"tw:hover:bg-muted/50","tw:w-full tw:rounded-sm tw:border-0 tw:bg-transparent tw:shadow-none","tw:focus:outline-hidden tw:focus-visible:outline-hidden","tw:focus-visible:ring-offset-0.5 tw:focus-visible:relative tw:focus-visible:z-10 tw:focus-visible:ring-2 tw:focus-visible:ring-ring","tw:grid tw:grid-flow-col tw:grid-cols-subgrid",o==="horizontal"?"tw:col-span-3":"tw:col-span-2 tw:row-span-2",m),onClick:()=>X(t,r),onKeyDown:v=>G(v,t,r),children:e.jsx(Z,{footnote:t,layout:o,formatCaller:()=>J(t.caller,r),showMarkers:x})},Q),r<a.length-1&&o==="vertical"&&e.jsx(Y,{tabIndex:-1,className:"tw:col-span-2"})]})})})})}j.__docgenInfo={description:"`FootnoteList` is a component that provides a read-only display of a list of USFM/JSX footnote.",methods:[],displayName:"FootnoteList",props:{className:{required:!1,tsType:{name:"string"},description:"Optional additional class name for styling"},classNameForItems:{required:!1,tsType:{name:"string"},description:"Optional additional class name for styling the `Card` for each `FootnoteItem` in the list"},footnotes:{required:!0,tsType:{name:"Array",elements:[{name:"MarkerObject"}],raw:"MarkerObject[]"},description:"The footnotes to display (typically from JSX). See {@link FootnoteItemProps.footnote}"},layout:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:`Determines how footnotes are displayed:

- \`'horizontal'\`: caller and reference appear in a leading-aligned column, with the contents in a
  second column (typically used in a wide pane below the text).
- \`'vertical'\`: caller and reference appear on the first line, with the contents displayed
  beneath (typically used side-by-side with the text).

@default 'horizontal'`,defaultValue:{value:"'horizontal'",computed:!1}},listId:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:`ID provided by the caller that should change whenever the list changes (due to additions,
deletions or — unlikely — reordering) )`},selectedFootnote:{required:!1,tsType:{name:"MarkerObject"},description:"The currently selected footnote (or undefined if none)"},showMarkers:{required:!1,tsType:{name:"boolean"},description:"Flag indicating whether to display USFM-style markers",defaultValue:{value:"true",computed:!1}},suppressFormatting:{required:!1,tsType:{name:"boolean"},description:`Flag indicating whether to suppress USFM-style formatting.

@default false`,defaultValue:{value:"false",computed:!1}},formatCaller:{required:!1,tsType:{name:"signature",type:"function",raw:"(caller: string | undefined, index: number) => string | undefined",signature:{arguments:[{type:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},name:"caller"},{type:{name:"number"},name:"index"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:"A function that can interpret the two special footnote caller codes defined by USFM, `+` and\n`-` in order to display (or suppress display of) a meaningful caller in the context where this\nis being used."},onFootnoteSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(footnote: MarkerObject, index: number, listId: string | number) => void",signature:{arguments:[{type:{name:"MarkerObject"},name:"footnote"},{type:{name:"number"},name:"index"},{type:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},name:"listId"}],return:{name:"void"}}},description:"Callback to handle clicking/selecting a footnote in the list"}}};const be={title:"Advanced/FootnoteList",component:j,tags:["autodocs"],decorators:[n=>e.jsx("div",{className:"tw:h-[300px] tw:overflow-hidden tw:border tw:border-slate-300 tw:p-4",children:e.jsx(n,{})})],argTypes:{layout:{control:{type:"radio"},options:["horizontal","vertical"]}}};function b({footnotes:n=[],listId:m="default-list-id",...a}={}){const[o,s]=u.useState();return e.jsx(j,{...a,footnotes:n,listId:m,selectedFootnote:o,onFootnoteSelected:i=>s(i)})}function K({footnotes:n=[],listId:m="default-list-id",showMarkers:a,...o}={}){const[s,i]=u.useState();return e.jsxs(ee,{direction:o.layout==="horizontal"?"vertical":"horizontal",className:"tw:h-full tw:min-h-0 tw:w-full",children:[e.jsx(S,{className:"tw:flex tw:min-h-0 tw:flex-col",children:e.jsx("div",{className:"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col",children:e.jsxs("p",{children:[e.jsx("sup",{children:"11"}),"In the beginning",a?e.jsx("span",{className:"tw:text-blue-400",children:"\\f + \\fr 1.11 \\fr* This is a simple footnote \\f"}):e.jsx("sup",{children:"a"}),"..."]})})}),e.jsxs(e.Fragment,{children:[e.jsx(te,{}),e.jsx(S,{defaultSize:39,className:"tw:flex tw:min-h-0 tw:flex-col tw:bg-sidebar tw:pb-0 tw:pl-2 tw:pr-0 tw:pt-2",minSize:15,maxSize:85,children:e.jsx("div",{className:"tw:flex tw:min-h-0 tw:flex-1 tw:flex-col",children:e.jsx(b,{...o,footnotes:n,listId:m,selectedFootnote:s,showMarkers:a,onFootnoteSelected:x=>i(x)})})})]})]})}const f={render:b,args:{footnotes:c,listId:"storybook-Basic",showMarkers:!1,layout:"horizontal"}},h={render:b,args:{footnotes:c,listId:"storybook-WithCustomCallerFormatting",showMarkers:!0,layout:"horizontal",formatCaller:A(c,["†","‡","⁂","★","☆"])}},w={render:b,args:{footnotes:c,listId:"storybook-Raw",showMarkers:!0,layout:"horizontal",formatCaller:n=>n}},g={render:K,args:{footnotes:c,listId:"storybook-Formatted",showMarkers:!1,layout:"vertical"}},y={render:K,args:{footnotes:c,listId:"storybook-ShowMarkers",showMarkers:!0,layout:"vertical",formatCaller:n=>n}};var C,I,M;f.parameters={...f.parameters,docs:{...(C=f.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Basic',
    showMarkers: false,
    layout: 'horizontal'
  }
}`,...(M=(I=f.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var T,N,q;h.parameters={...h.parameters,docs:{...(T=h.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-WithCustomCallerFormatting',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: getFormatCallerFunction(usjFootnotes, ['†', '‡', '⁂', '★', '☆'])
  }
}`,...(q=(N=h.parameters)==null?void 0:N.docs)==null?void 0:q.source}}};var R,D,O;w.parameters={...w.parameters,docs:{...(R=w.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Raw',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: caller => caller
  }
}`,...(O=(D=w.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var _,E,P;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: ScripturePanelTemplate,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Formatted',
    showMarkers: false,
    layout: 'vertical'
  }
}`,...(P=(E=g.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};var B,L,U;y.parameters={...y.parameters,docs:{...(B=y.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: ScripturePanelTemplate,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-ShowMarkers',
    showMarkers: true,
    layout: 'vertical',
    formatCaller: caller => caller
  }
}`,...(U=(L=y.parameters)==null?void 0:L.docs)==null?void 0:U.source}}};const xe=["Basic","WithCustomCallerFormatting","Raw","Formatted","ShowMarkers"];export{f as Basic,g as Formatted,w as Raw,y as ShowMarkers,h as WithCustomCallerFormatting,xe as __namedExportsOrder,be as default};
