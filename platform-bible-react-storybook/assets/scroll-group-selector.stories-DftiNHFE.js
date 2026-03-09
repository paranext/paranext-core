import{j as d}from"./jsx-runtime-DtbIjmdr.js";import{r as a}from"./iframe-DKR-7p3e.js";import{r}from"./index-aiMNovq6.js";import{S as n}from"./scroll-group-selector.component-yPqd2NwC.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-f1xz00ih.js";import"./index-Bg2Ua9Lu.js";import"./index-BAoME0uI.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-CWaXHv7a.js";import"./index-7stDH5Z5.js";import"./index-BtyUu3hP.js";import"./index-icVuyFWi.js";import"./index-BP-im9VQ.js";import"./index-BPXtQL4b.js";import"./index-CBIBFEvn.js";import"./index-D4tkDTJe.js";import"./floating-ui.react-dom-Cvkk-4Ae.js";import"./index-Bsi_6moH.js";import"./index-D4ZYXa0f.js";import"./index-CDtF7AVh.js";import"./index-D_rGnXkH.js";import"./index-q5on046b.js";import"./index-BGrYUbjC.js";import"./index-BmiGB6ae.js";import"./index-BNnX6Nsc.js";import"./index-C7297-9h.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-LD9wA8Kg.js";import"./createLucideIcon-Ur3TMd64.js";import"./check-S7Dj6c9_.js";import"./chevron-up-Cacqq2Az.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
