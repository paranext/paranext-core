import{j as d}from"./jsx-runtime-nEE8mmL3.js";import{r as a}from"./iframe-ByFkd3FX.js";import{G as r}from"./index-CIWIMa1p.js";import{S as n}from"./scroll-group-selector.component-Cmv2bw_G.js";import"./preload-helper-CTOgD26E.js";import"./index-Bl2C2VvJ.js";import"./select-DH4k91X8.js";import"./index-D82vU8cK.js";import"./index-DAqrOYUA.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-C2EylGE6.js";import"./index-khYfVE4M.js";import"./index-tOs8khJX.js";import"./index-D03MmUXc.js";import"./index-TNuCMHbD.js";import"./index-CCsmCQJX.js";import"./index-DsiCs5XD.js";import"./index-CT9bgN9l.js";import"./floating-ui.react-dom-CiNsoYTX.js";import"./index-BJQ4mCzX.js";import"./index-k2HEk_oy.js";import"./index-DPU2rGXu.js";import"./index-CZJ9YF2Z.js";import"./index-_wxyPPNE.js";import"./index-B1dQl_jJ.js";import"./index-dVIjY_wf.js";import"./index-BOfcE3t_.js";import"./index-jXMKCLpx.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DSWU6_fi.js";import"./createLucideIcon-BPt5Qt8Q.js";import"./check-Bpahp4QL.js";import"./chevron-up-D1hxZtF3.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
