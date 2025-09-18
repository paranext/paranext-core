import{j as t}from"./jsx-runtime-4wK_0ZO4.js";import{r as O}from"./iframe-BcYeWgcr.js";import{c as h}from"./shadcn-ui.util-DMJ19wEV.js";import{C as _}from"./card-BSWwl2Bs.js";import{P as B}from"./index-DOKkQ3oI.js";import{F as U}from"./footnote-item.component-BiMPY_Hi.js";import{T as J}from"./theme-provider.component-Bum-YBGl.js";import"./circle-alert-ZIS4O6V_.js";import"./createLucideIcon-D1oFpSf_.js";function m({footnotes:e,showMarkers:s=!0,formatCaller:o,listId:N,selectedFootnote:L,onFootnoteSelected:p,className:R}){const A=o??B(e,void 0),E=r=>{p&&p(r)};return t.jsx("div",{role:"listbox","aria-label":"Footnotes",className:h("tw-flex tw-flex-col tw-gap-1",R),children:e.map((r,u)=>{const f=r===L,P=`${N}-${u}`;return t.jsx(_,{role:"option","aria-selected":f,className:h(p&&"tw-cursor-pointer","tw-rounded-sm tw-border-0 tw-bg-transparent tw-px-1 tw-py-0 tw-shadow-none",f&&"tw-bg-muted/70"),onClick:()=>E(r),children:t.jsx(U,{footnote:r,formatCaller:()=>A(r.caller,u),showMarkers:s,className:"tw-m-0"})},P)})})}m.__docgenInfo={description:"`FootnoteList` is a component that provides a read-only display of a list of USFM/JSX footnote.",methods:[],displayName:"FootnoteList",props:{className:{required:!1,tsType:{name:"string"},description:"Optional additional class name for styling"},footnotes:{required:!0,tsType:{name:"Array",elements:[{name:"MarkerObject"}],raw:"MarkerObject[]"},description:"The footnotes to display (typically from JSX). See {@link FootnoteItemProps.footnote}"},listId:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:`ID provided by the caller that should change whenever the list changes (due to additions,
deletions or — unlikely — reordering) )`},showMarkers:{required:!1,tsType:{name:"boolean"},description:"Flag indicating whether to display USFM-style markers",defaultValue:{value:"true",computed:!1}},formatCaller:{required:!1,tsType:{name:"signature",type:"function",raw:"(caller: string | undefined, index: number) => string | undefined",signature:{arguments:[{type:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},name:"caller"},{type:{name:"number"},name:"index"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:"A function that can interpret the two special footnote caller codes defined by USFM, `+` and\n`-` in order to display (or suppress display of) a meaningful caller in the context where this\nis being used."},selectedFootnote:{required:!1,tsType:{name:"MarkerObject"},description:"The currently selected footnote (or undefined if none)"},onFootnoteSelected:{required:!1,tsType:{name:"signature",type:"function",raw:"(footnote: MarkerObject) => void",signature:{arguments:[{type:{name:"MarkerObject"},name:"footnote"}],return:{name:"void"}}},description:"Callback to handle clicking/selecting a footnote in the list"}}};const n=[{marker:"f",type:"note",caller:"+",content:[{marker:"ft",type:"text",content:["This is a simple footnote."]}],sid:"f1"},{marker:"f",type:"note",caller:"+",content:[{marker:"ft",type:"text",content:["Another footnote with ",{marker:"it",type:"italic",content:["italic"]}," text."]}],sid:"f2"},{marker:"x",type:"note",caller:"-",content:[{marker:"xo",type:"text",content:["1:2"]},{marker:"xt",type:"text",content:["Malachi 3:1"]}],sid:"x1"},{marker:"f",type:"note",caller:"+",content:[{marker:"fr",type:"text",content:["6:7"]},{marker:"ft",type:"text",content:["The caller for this one should be 'c'"]}],sid:"f2"}],Q={title:"Advanced/FootnoteList",component:m,tags:["autodocs"],decorators:[e=>t.jsx(J,{children:t.jsx("div",{className:"tw-p-4",children:t.jsx(e,{})})})]},a={args:{footnotes:n,listId:"storybook-Basic",showMarkers:!1}},i={args:{footnotes:n,listId:"storybook-Basic",showMarkers:!0,formatCaller:B(n,["c","d","e","f","g"])}},l={args:{footnotes:n,listId:"storybook-Raw",showMarkers:!0,onFootnoteSelected:void 0,formatCaller:e=>e}},d={render:()=>{const[e,s]=O.useState(void 0);return t.jsx("div",{children:t.jsx(m,{footnotes:n,listId:"storybook-Formatted",showMarkers:!1,selectedFootnote:e,onFootnoteSelected:o=>s(o)})})}},c={render:()=>{const[e,s]=O.useState(void 0);return t.jsx("div",{children:t.jsx(m,{footnotes:n,listId:"storybook-ShowMarkers",showMarkers:!0,selectedFootnote:e,onFootnoteSelected:o=>s(o),formatCaller:o=>o})})}};var y,k,F;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    footnotes: sampleFootnotes,
    listId: 'storybook-Basic',
    showMarkers: false
  }
}`,...(F=(k=a.parameters)==null?void 0:k.docs)==null?void 0:F.source}}};var g,w,S;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    footnotes: sampleFootnotes,
    listId: 'storybook-Basic',
    showMarkers: true,
    formatCaller: getFormatCallerFunction(sampleFootnotes, ['c', 'd', 'e', 'f', 'g'])
  }
}`,...(S=(w=i.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var x,b,M;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    footnotes: sampleFootnotes,
    listId: 'storybook-Raw',
    showMarkers: true,
    onFootnoteSelected: undefined,
    formatCaller: (caller: string | undefined) => caller
  }
}`,...(M=(b=l.parameters)==null?void 0:b.docs)==null?void 0:M.source}}};var C,j,v;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>(undefined);
    return <div>
        <FootnoteList footnotes={sampleFootnotes} listId="storybook-Formatted" showMarkers={false} selectedFootnote={selectedFootnote} onFootnoteSelected={footnote => setSelectedFootnote(footnote)} />
      </div>;
  }
}`,...(v=(j=d.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var I,T,q;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const [selectedFootnote, setSelectedFootnote] = useState<MarkerObject | undefined>(undefined);
    return <div>
        <FootnoteList footnotes={sampleFootnotes} listId="storybook-ShowMarkers" showMarkers selectedFootnote={selectedFootnote} onFootnoteSelected={footnote => setSelectedFootnote(footnote)} formatCaller={caller => caller} />
      </div>;
  }
}`,...(q=(T=c.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};const Y=["Basic","WithCustomCallerFormatting","Raw","Formatted","ShowMarkers"];export{a as Basic,d as Formatted,l as Raw,c as ShowMarkers,i as WithCustomCallerFormatting,Y as __namedExportsOrder,Q as default};
