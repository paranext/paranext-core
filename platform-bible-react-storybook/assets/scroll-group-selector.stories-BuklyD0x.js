import{j as d}from"./jsx-runtime-C5pCfQoW.js";import{r as a}from"./iframe-DFkN3pGA.js";import{r}from"./index-Bg061Ox-.js";import{S as n}from"./scroll-group-selector.component-V7lol45q.js";import"./preload-helper-CTOgD26E.js";import"./index-Bl2C2VvJ.js";import"./select-CtrRfP8g.js";import"./index-Y5DszWV6.js";import"./index-3OngyYiK.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-DTeDNITW.js";import"./index-DXEDIebf.js";import"./index-BcnX-CX-.js";import"./index-Dm--HNTC.js";import"./index-CysiHiMY.js";import"./index-C9Kr_VTD.js";import"./index-CplHeaWv.js";import"./index-ByDWx2r7.js";import"./floating-ui.react-dom-Betw7s1o.js";import"./index-BOJFy3we.js";import"./index-C0eH_LN8.js";import"./index-UG4UcYQL.js";import"./index-BCtEKQ2p.js";import"./index-BKBfNPrV.js";import"./index-DoFHBbbt.js";import"./index-CZ5TngE_.js";import"./index-eMKzIFAe.js";import"./index-C9BY6gMi.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-BC7cwYQg.js";import"./createLucideIcon-mubsvCKZ.js";import"./check-BduSXvnx.js";import"./chevron-up-DE4hQqAI.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: undefined,
    localizedStrings
  }
}`,...(S=(m=s.parameters)==null?void 0:m.docs)==null?void 0:S.source}}};var G,g,I;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} size="lg" />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 2,
    localizedStrings
  }
}`,...(I=(g=l.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var f,h,C;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} className="tw-bg-yellow-100" size="sm" />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 1,
    localizedStrings
  }
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const te=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,te as __namedExportsOrder,oe as default};
