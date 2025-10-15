import{j as t}from"./jsx-runtime-HloGGvtK.js";import{r as K}from"./iframe-CmDA2Gj3.js";import{c as b}from"./shadcn-ui.util-DMJ19wEV.js";import{C as D}from"./card-TgZohS1J.js";import{L as O}from"./index-B_P4TyHR.js";import{F as G,u as a}from"./footnotes.usj.data-TB8IWvTB.js";import{T as J}from"./theme-provider.component-C-CgG54T.js";import"./circle-alert-GPu1W3Mp.js";import"./createLucideIcon-CKWdzV9H.js";import"./index-C3mJiya3.js";const P=(e,o)=>e[o]??o;function h({className:e,footnotes:o,layout:n="horizontal",listId:u,selectedFootnote:p,showMarkers:N=!0,suppressFormatting:E=!1,formatCaller:R,onFootnoteSelected:f,localizedStrings:w}){const B=w?P(w,"%webView_footnoteList_header%"):"Footnotes",U=R??O(o,void 0),W=r=>{f&&f(r)};return t.jsxs(t.Fragment,{children:[n==="vertical"&&t.jsx("div",{className:"tw-mb-2 tw-font-semibold",children:B}),t.jsx("div",{role:"listbox","aria-label":"Footnotes",className:b(n==="horizontal"?"tw-table tw-border-collapse":"tw-flex tw-flex-col tw-gap-1",!E&&"formatted-font",e),children:o.map((r,g)=>{const y=r===p,A=`${u}-${g}`;return t.jsx(D,{role:"option","aria-selected":y,"data-marker":r.marker,className:b(f&&"tw-cursor-pointer","tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none",y&&"tw-bg-muted/70",n==="horizontal"?"horizontal tw-table-row":"vertical tw-block tw-px-1 tw-py-0 tw-text-sm"),onClick:()=>W(r),children:t.jsx(G,{footnote:r,layout:n,formatCaller:()=>U(r.caller,g),showMarkers:N})},A)})})]})}h.__docgenInfo={description:"`FootnoteList` is a component that provides a read-only display of a list of USFM/JSX footnote.",methods:[],displayName:"FootnoteList",props:{className:{required:!1,tsType:{name:"string"},description:"Optional additional class name for styling"},footnotes:{required:!0,tsType:{name:"Array",elements:[{name:"MarkerObject"}],raw:"MarkerObject[]"},description:"The footnotes to display (typically from JSX). See {@link FootnoteItemProps.footnote}"},layout:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:`Determines how footnotes are displayed:

- \`'horizontal'\`: caller and reference appear in a leading-aligned column, with the contents in a
  second column (typically used in a wide pane below the text).
- \`'vertical'\`: caller and reference appear on the first line, with the contents displayed
  beneath (typically used side-by-side with the text).

@default 'horizontal'`,defaultValue:{value:"'horizontal'",computed:!1}},listId:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:`ID provided by the caller that should change whenever the list changes (due to additions,
deletions or — unlikely — reordering) )`},selectedFootnote:{required:!1,tsType:{name:"MarkerObject"},description:"The currently selected footnote (or undefined if none)"},showMarkers:{required:!1,tsType:{name:"boolean"},description:"Flag indicating whether to display USFM-style markers",defaultValue:{value:"true",computed:!1}},suppressFormatting:{required:!1,tsType:{name:"boolean"},description:`Flag indicating whether to suppress USFM-style formatting.

@default false`,defaultValue:{value:"false",computed:!1}},formatCaller:{required:!1,tsType:{name:"signature",type:"function",raw:"(caller: string | undefined, index: number) => string | undefined",signature:{arguments:[{type:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},name:"caller"},{type:{name:"number"},name:"index"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:"A function that can interpret the two special footnote caller codes defined by USFM, `+` and\n`-` in order to display (or suppress display of) a meaningful caller in the context where this\nis being used."},onFootnoteSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(footnote: MarkerObject) => void",signature:{arguments:[{type:{name:"MarkerObject"},name:"footnote"}],return:{name:"void"}}},description:"Callback to handle clicking/selecting a footnote in the list"},localizedStrings:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  [localizedFootnoteListKey in (typeof FOOTNOTE_LIST_STRING_KEYS)[number]]?: LocalizedStringValue;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof FOOTNOTE_LIST_STRING_KEYS)[number]",required:!1},value:{name:"LocalizedStringValue"}}]}},description:""}}};const ne={title:"Advanced/FootnoteList",component:h,tags:["autodocs"],decorators:[e=>t.jsx(J,{children:t.jsx("div",{className:"tw-p-4",children:t.jsx(e,{})})})],argTypes:{layout:{control:{type:"radio"},options:["horizontal","vertical"]}}};function s({footnotes:e=[],listId:o="default-list-id",...n}={}){const[u,p]=K.useState(void 0);return t.jsx(h,{...n,footnotes:e,listId:o,selectedFootnote:u,onFootnoteSelected:p})}const i={render:s,args:{footnotes:a,listId:"storybook-Basic",showMarkers:!1,layout:"horizontal",localizedStrings:{"%webView_footnoteList_header%":"Footnotes"}}},l={render:s,args:{footnotes:a,listId:"storybook-WithCustomCallerFormatting",showMarkers:!0,layout:"horizontal",formatCaller:O(a,["†","‡","⁂","★","☆"]),localizedStrings:{"%webView_footnoteList_header%":"Footnotes"}}},d={render:s,args:{footnotes:a,listId:"storybook-Raw",showMarkers:!0,layout:"horizontal",formatCaller:e=>e,localizedStrings:{"%webView_footnoteList_header%":"Footnotes"}}},c={render:s,args:{footnotes:a,listId:"storybook-Formatted",showMarkers:!1,layout:"vertical",localizedStrings:{"%webView_footnoteList_header%":"Footnotes"}}},m={render:s,args:{footnotes:a,listId:"storybook-ShowMarkers",showMarkers:!0,layout:"vertical",formatCaller:e=>e,localizedStrings:{"%webView_footnoteList_header%":"Footnotes"}}};var F,k,S;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(S=(k=i.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var _,T,z;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(z=(T=l.parameters)==null?void 0:T.docs)==null?void 0:z.source}}};var v,C,j;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(j=(C=d.parameters)==null?void 0:C.docs)==null?void 0:j.source}}};var x,M,L;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(L=(M=c.parameters)==null?void 0:M.docs)==null?void 0:L.source}}};var I,V,q;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(q=(V=m.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};const ae=["Basic","WithCustomCallerFormatting","Raw","Formatted","ShowMarkers"];export{i as Basic,c as Formatted,d as Raw,m as ShowMarkers,l as WithCustomCallerFormatting,ae as __namedExportsOrder,ne as default};
