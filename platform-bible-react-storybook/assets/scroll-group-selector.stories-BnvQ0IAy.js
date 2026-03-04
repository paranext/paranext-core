import{j as d}from"./jsx-runtime-DAWC4C43.js";import{r as a}from"./iframe-BvEgnsjT.js";import{r}from"./index-DPh-3zwF.js";import{S as n}from"./scroll-group-selector.component-DWX0q1aB.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-D03YyHnG.js";import"./index-DKNAdNei.js";import"./index-C8WvocRY.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-DdFl4fOl.js";import"./index-Dg0a4AE0.js";import"./index-CvdK_JZm.js";import"./index-CUkLKcAj.js";import"./index-YxzwN37P.js";import"./index-BJULxEkN.js";import"./index-DhNn4SuT.js";import"./index-D3fQ7_zI.js";import"./floating-ui.react-dom-F-egfkXR.js";import"./index-DBPtG53t.js";import"./index-DJTBMJNs.js";import"./index-DoKJlvx6.js";import"./index-Ok1lHFY4.js";import"./index-wizu-fWu.js";import"./index-BVO4RQgb.js";import"./index-Cl7wpIjR.js";import"./index-CfDYVrNL.js";import"./index-D-G43rju.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-BTn64Z4k.js";import"./createLucideIcon-tUdPpmeI.js";import"./check-D7e3tzwe.js";import"./chevron-up-hqiNOCXb.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
