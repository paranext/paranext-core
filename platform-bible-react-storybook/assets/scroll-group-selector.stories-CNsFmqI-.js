import{j as d}from"./jsx-runtime-BelrNLDo.js";import{r as a}from"./iframe-XOq-X8br.js";import{i as r}from"./index-DgvB8rDJ.js";import{S as n}from"./scroll-group-selector.component-B1gDe_xN.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-CtwWjDsH.js";import"./index-DFb4jW9E.js";import"./index-DjheCAfW.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-DktCCZOW.js";import"./index-Dxl-kzSR.js";import"./index-Cti4y58R.js";import"./index-Bk1Ub-hc.js";import"./index-BOdBxdMZ.js";import"./index-BUCyRYrE.js";import"./index-DF_BH7F0.js";import"./index-DFzokcrz.js";import"./floating-ui.react-dom-B5F3a5dr.js";import"./index-Cd_qV2F_.js";import"./index-B-mz1KXb.js";import"./index-DUgUUavw.js";import"./index-Bka7GGP6.js";import"./index-DSBhVSC2.js";import"./index-D2Olec91.js";import"./index-BThPQfF5.js";import"./index-L8ZG6MbN.js";import"./index-WhjUWVRp.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-BZl9HnsX.js";import"./createLucideIcon-DHwVzOOP.js";import"./check-BhORUtF8.js";import"./chevron-up-BmbhkVMZ.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
