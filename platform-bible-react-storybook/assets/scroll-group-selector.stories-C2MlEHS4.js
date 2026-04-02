import{j as d}from"./jsx-runtime-D1KYjvfx.js";import{r as a}from"./iframe-SuzMrerO.js";import{i as r}from"./index-DdJ9wqfU.js";import{S as n}from"./scroll-group-selector.component-DRHyBRhG.js";import"./preload-helper-CTOgD26E.js";import"./index-D6jRp_YW.js";import"./select-CPzxw6mL.js";import"./index-B4CQ-VEi.js";import"./index-kNYglEaB.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-B1vlpeSG.js";import"./index-SY7gL4zl.js";import"./index-DKd4-iuC.js";import"./index-BU9Vb_ld.js";import"./index-DlSlT9S-.js";import"./index-Cy2bQdRi.js";import"./index-C_0N2vIw.js";import"./index-BsEgTP0P.js";import"./floating-ui.react-dom-BqMeCzqL.js";import"./index-Ci65HzV4.js";import"./index-bAPpPAmF.js";import"./index-1Z3S0CKB.js";import"./index-Ci3Y2RCh.js";import"./index-DALnKmSr.js";import"./index-C8G1eSpT.js";import"./index-DEc8E3cd.js";import"./index-CwYQhpI-.js";import"./index-D2TKKPdk.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DvW-w2fY.js";import"./createLucideIcon-BFzQEULl.js";import"./check-BGMoKSli.js";import"./chevron-up-OlZM2W2U.js";import"./z-index-xsNeyxSu.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
