import{j as o}from"./jsx-runtime-c2I2IkSv.js";import{r as g}from"./iframe-DkDOfCps.js";import{c as k}from"./shadcn-ui.util-DMJ19wEV.js";import{C as $}from"./card-xI8IBnQF.js";import{P as A}from"./index-DnRshUFb.js";import{F as H,u as l}from"./footnotes.usj.data-Cm3KCHnP.js";import{T as Q}from"./theme-provider.component-BtH3K4wm.js";import"./circle-alert-Dhj58_mU.js";import"./createLucideIcon-B02Eqsu7.js";import"./index-ZThHfTg3.js";const Z=(t,r)=>t[r]??r;function F({className:t,footnotes:r,layout:s="horizontal",listId:d,selectedFootnote:c,showMarkers:y=!0,suppressFormatting:B=!1,formatCaller:K,onFootnoteSelected:a,localizedStrings:v}){const U=v?Z(v,"%webView_footnoteList_header%"):"Footnotes",P=K??A(r,void 0),W=(e,n)=>{a==null||a(e,n,d)},G=c?r.findIndex(e=>e===c):0,[i,S]=g.useState(G),J=e=>{if(r.length)switch(e.key){case"ArrowDown":e.preventDefault(),S(n=>Math.min(n+1,r.length-1));break;case"ArrowUp":e.preventDefault(),S(n=>Math.max(n-1,0));break;case"Enter":case" ":e.preventDefault(),a==null||a(r[i],i,d);break}},b=g.useRef([]);return g.useEffect(()=>{var e;i>=0&&i<b.current.length&&((e=b.current[i])==null||e.focus())},[i]),o.jsxs(o.Fragment,{children:[s==="vertical"&&o.jsx("h2",{className:"tw-mb-1 tw-font-semibold",children:U}),o.jsx("div",{role:"listbox","aria-label":"Footnotes",tabIndex:0,className:k("tw-h-full tw-overflow-y-auto",t),onKeyDown:J,children:o.jsx("div",{className:k("tw-p-0.5",s==="horizontal"?"tw-table":"tw-flex tw-flex-col tw-gap-1",!B&&"formatted-font"),children:r.map((e,n)=>{const x=e===c,X=`${d}-${n}`;return o.jsx($,{ref:Y=>{b.current[n]=Y},role:"option","aria-selected":x,"data-marker":e.marker,"data-state":x?"selected":void 0,tabIndex:-1,className:k("data-[state=selected]:tw-bg-muted",a&&"tw-cursor-pointer hover:tw-bg-muted/50","tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-py-0 tw-shadow-none",s==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-text-sm"),onClick:()=>W(e,n),children:o.jsx(H,{footnote:e,layout:s,formatCaller:()=>P(e.caller,n),showMarkers:y})},X)})})})]})}F.__docgenInfo={description:"`FootnoteList` is a component that provides a read-only display of a list of USFM/JSX footnote.",methods:[],displayName:"FootnoteList",props:{className:{required:!1,tsType:{name:"string"},description:"Optional additional class name for styling"},footnotes:{required:!0,tsType:{name:"Array",elements:[{name:"MarkerObject"}],raw:"MarkerObject[]"},description:"The footnotes to display (typically from JSX). See {@link FootnoteItemProps.footnote}"},layout:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:`Determines how footnotes are displayed:

- \`'horizontal'\`: caller and reference appear in a leading-aligned column, with the contents in a
  second column (typically used in a wide pane below the text).
- \`'vertical'\`: caller and reference appear on the first line, with the contents displayed
  beneath (typically used side-by-side with the text).

@default 'horizontal'`,defaultValue:{value:"'horizontal'",computed:!1}},listId:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:`ID provided by the caller that should change whenever the list changes (due to additions,
deletions or — unlikely — reordering) )`},selectedFootnote:{required:!1,tsType:{name:"MarkerObject"},description:"The currently selected footnote (or undefined if none)"},showMarkers:{required:!1,tsType:{name:"boolean"},description:"Flag indicating whether to display USFM-style markers",defaultValue:{value:"true",computed:!1}},suppressFormatting:{required:!1,tsType:{name:"boolean"},description:`Flag indicating whether to suppress USFM-style formatting.

@default false`,defaultValue:{value:"false",computed:!1}},formatCaller:{required:!1,tsType:{name:"signature",type:"function",raw:"(caller: string | undefined, index: number) => string | undefined",signature:{arguments:[{type:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},name:"caller"},{type:{name:"number"},name:"index"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:"A function that can interpret the two special footnote caller codes defined by USFM, `+` and\n`-` in order to display (or suppress display of) a meaningful caller in the context where this\nis being used."},onFootnoteSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(footnote: MarkerObject, index: number, listId: string | number) => void",signature:{arguments:[{type:{name:"MarkerObject"},name:"footnote"},{type:{name:"number"},name:"index"},{type:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},name:"listId"}],return:{name:"void"}}},description:"Callback to handle clicking/selecting a footnote in the list"},localizedStrings:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  [localizedFootnoteListKey in (typeof FOOTNOTE_LIST_STRING_KEYS)[number]]?: LocalizedStringValue;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof FOOTNOTE_LIST_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:""}}};const ce={title:"Advanced/FootnoteList",component:F,tags:["autodocs"],decorators:[t=>o.jsx(Q,{children:o.jsx("div",{className:"tw-h-[300px] tw-overflow-hidden tw-border tw-border-slate-300 tw-p-4",children:o.jsx(t,{})})})],argTypes:{layout:{control:{type:"radio"},options:["horizontal","vertical"]}}};function u({footnotes:t=[],listId:r="default-list-id",...s}={}){const[d,c]=g.useState(void 0);return o.jsx(F,{...s,footnotes:t,listId:r,selectedFootnote:d,onFootnoteSelected:y=>c(y)})}const m={render:u,args:{footnotes:l,listId:"storybook-Basic",showMarkers:!1,layout:"horizontal",localizedStrings:{"%webView_footnoteList_header%":"Footnotes"}}},p={render:u,args:{footnotes:l,listId:"storybook-WithCustomCallerFormatting",showMarkers:!0,layout:"horizontal",formatCaller:A(l,["†","‡","⁂","★","☆"]),localizedStrings:{"%webView_footnoteList_header%":"Footnotes"}}},f={render:u,args:{footnotes:l,listId:"storybook-Raw",showMarkers:!0,layout:"horizontal",formatCaller:t=>t,localizedStrings:{"%webView_footnoteList_header%":"Footnotes"}}},h={render:u,args:{footnotes:l,listId:"storybook-Formatted",showMarkers:!1,layout:"vertical",localizedStrings:{"%webView_footnoteList_header%":"Footnotes"}}},w={render:u,args:{footnotes:l,listId:"storybook-ShowMarkers",showMarkers:!0,layout:"vertical",formatCaller:t=>t,localizedStrings:{"%webView_footnoteList_header%":"Footnotes"}}};var _,T,z;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Basic',
    showMarkers: false,
    layout: 'horizontal',
    localizedStrings: {
      '%webView_footnoteList_header%': 'Footnotes'
    }
  }
}`,...(z=(T=m.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var j,C,M;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-WithCustomCallerFormatting',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: getFormatCallerFunction(usjFootnotes, ['†', '‡', '⁂', '★', '☆']),
    localizedStrings: {
      '%webView_footnoteList_header%': 'Footnotes'
    }
  }
}`,...(M=(C=p.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var I,L,V;f.parameters={...f.parameters,docs:{...(I=f.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Raw',
    showMarkers: true,
    layout: 'horizontal',
    formatCaller: caller => caller,
    localizedStrings: {
      '%webView_footnoteList_header%': 'Footnotes'
    }
  }
}`,...(V=(L=f.parameters)==null?void 0:L.docs)==null?void 0:V.source}}};var q,O,N;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-Formatted',
    showMarkers: false,
    layout: 'vertical',
    localizedStrings: {
      '%webView_footnoteList_header%': 'Footnotes'
    }
  }
}`,...(N=(O=h.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};var E,R,D;w.parameters={...w.parameters,docs:{...(E=w.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: Template,
  args: {
    footnotes: usjFootnotes,
    listId: 'storybook-ShowMarkers',
    showMarkers: true,
    layout: 'vertical',
    formatCaller: caller => caller,
    localizedStrings: {
      '%webView_footnoteList_header%': 'Footnotes'
    }
  }
}`,...(D=(R=w.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};const ue=["Basic","WithCustomCallerFormatting","Raw","Formatted","ShowMarkers"];export{m as Basic,h as Formatted,f as Raw,w as ShowMarkers,p as WithCustomCallerFormatting,ue as __namedExportsOrder,ce as default};
