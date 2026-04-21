import{j as d}from"./jsx-runtime-7eNCgUAa.js";import{r as a}from"./iframe-CYFq18C6.js";import{i as r}from"./index-CVvpfEUF.js";import{S as n}from"./scroll-group-selector.component-soBMC5Fe.js";import"./preload-helper-CTOgD26E.js";import"./index-D6jRp_YW.js";import"./select-Bxl4iDxI.js";import"./index-CMSUoF7B.js";import"./index-TWCD4B01.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index--0fVmrWw.js";import"./index-Bns5XpWP.js";import"./index-D8ajtxer.js";import"./index-CS4LosYl.js";import"./index-BYkFWaGr.js";import"./index-CgREmPeT.js";import"./index-BWcirV2a.js";import"./index-DwImD94U.js";import"./floating-ui.react-dom-C0bYBFTY.js";import"./index-pHFji2xB.js";import"./index-DvIYHHW7.js";import"./index-Cmf6o8zD.js";import"./index-D8oNfD7n.js";import"./index-BfopVIcW.js";import"./index-BIYzcUAZ.js";import"./index-sAe4w0jJ.js";import"./index-D3K67bMc.js";import"./index-Cg2shgCH.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-Du0-ly2n.js";import"./createLucideIcon-CZyv5WDD.js";import"./check-Cgjr5tXY.js";import"./chevron-up-DDsk0_mz.js";import"./z-index-B4JyHfu5.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const se=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,se as __namedExportsOrder,te as default};
