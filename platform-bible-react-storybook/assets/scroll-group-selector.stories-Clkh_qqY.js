import{j as d}from"./jsx-runtime-Dh5-W1u5.js";import{r as a}from"./iframe-djGCT5cb.js";import{i as r}from"./index-CVvpfEUF.js";import{S as n}from"./scroll-group-selector.component-DeF3WrKU.js";import"./preload-helper-CTOgD26E.js";import"./index-D6jRp_YW.js";import"./select-BL6Fd7q2.js";import"./index-CK5Rc5hv.js";import"./index-DZqbfIAv.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-DDDamGFs.js";import"./index-oSCfe8u5.js";import"./index-BCfTqW4f.js";import"./index-CRh60EhJ.js";import"./index-CnqiRnW6.js";import"./index-FtzLejpH.js";import"./index-BWVTlZ07.js";import"./index-CHLBiURO.js";import"./floating-ui.react-dom-DspJq7Hk.js";import"./index-B8GggJE5.js";import"./index-DJo_iyRf.js";import"./index-8wwLNvEv.js";import"./index-k04ZTr3_.js";import"./index-BvNg_5Mh.js";import"./index-Bi_rNfCZ.js";import"./index-1_q7phwM.js";import"./index-BmCy8j2e.js";import"./index-CaUze2_4.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DpqbpcLo.js";import"./createLucideIcon-vp2osuRH.js";import"./check-DS919hPx.js";import"./chevron-up-Gezv_8xg.js";import"./z-index-B4JyHfu5.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
