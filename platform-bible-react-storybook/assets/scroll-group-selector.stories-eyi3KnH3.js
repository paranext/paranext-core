import{j as d}from"./jsx-runtime-DjwPZ1qe.js";import{r as a}from"./iframe-mszaHKTI.js";import{L as r}from"./index-Cv_SG682.js";import{S as n}from"./scroll-group-selector.component-Djk2SPZS.js";import"./select-CkCgJkc9.js";import"./index-Djvce50F.js";import"./index-BuRlEbzG.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-Dc40g3aH.js";import"./index-C4jFLmSR.js";import"./index-DP-x0oVj.js";import"./index-CQ6xKPGp.js";import"./index-C-zhRbhI.js";import"./index-CIe-IBRk.js";import"./index-BHVI_MEy.js";import"./index-BrGRNFQO.js";import"./floating-ui.react-dom-DGiL-_s8.js";import"./index-BpQE19-o.js";import"./index-XrIWveux.js";import"./index-DnppBRsl.js";import"./index-ChXZoXma.js";import"./index-BIgf1sv7.js";import"./index-Ba8dNyeu.js";import"./index-DPq9ctz0.js";import"./index-w9hfOvCh.js";import"./index-TBEhrRPo.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DTCHLuHz.js";import"./createLucideIcon-B1igjBw4.js";import"./check-Dzv0_x3j.js";import"./chevron-up-B0BbF_1t.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},ee={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const re=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,re as __namedExportsOrder,ee as default};
