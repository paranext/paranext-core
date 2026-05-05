import{j as d}from"./jsx-runtime-CtRznUc5.js";import{r as a}from"./iframe-ZfbSA27f.js";import{i as r}from"./index-r3mwEuN3.js";import{S as n}from"./scroll-group-selector.component-oJD8EtA5.js";import"./preload-helper-CTOgD26E.js";import"./index-D2t4nnj1.js";import"./select-BNdwPUja.js";import"./index-D9weCxKb.js";import"./index-B1GQQmOo.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-DC3YzRyt.js";import"./index-LJN2XMdg.js";import"./index-DpScPnQ2.js";import"./index-CNSVagS9.js";import"./index-iT2vb5IE.js";import"./index-18Le_uxd.js";import"./index-BD3jJJkH.js";import"./index-B-CGHdzs.js";import"./floating-ui.react-dom-BQD13Ak4.js";import"./index-IBhE-6UT.js";import"./index-B0iiEfUl.js";import"./index-Bwf92inS.js";import"./index-BFIZi6t7.js";import"./index-B5Ri28LQ.js";import"./index-DElCqG-A.js";import"./index-CBlCZPoL.js";import"./index-BlkkFQ4A.js";import"./index-MJ_dK2AY.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CbXYroOP.js";import"./createLucideIcon-CANPMIIT.js";import"./check-x9pfip--.js";import"./chevron-up-687eOez9.js";import"./z-index-B4JyHfu5.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
