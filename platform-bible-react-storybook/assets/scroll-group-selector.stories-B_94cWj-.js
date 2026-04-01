import{j as d}from"./jsx-runtime-N-GGHWgw.js";import{r as a}from"./iframe-CM3xSs60.js";import{i as r}from"./index-B0bz_uy0.js";import{S as n}from"./scroll-group-selector.component-Bbh9ilcj.js";import"./preload-helper-CTOgD26E.js";import"./index-D6jRp_YW.js";import"./select-KGumFFXU.js";import"./index-sAyt2t5G.js";import"./index-WUAMDAmt.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-D30rAf5r.js";import"./index-BO0MIM0k.js";import"./index-C6GfStmd.js";import"./index-LRfYkuef.js";import"./index-CTKtRFiF.js";import"./index-DZz8a_Nm.js";import"./index-DduFN10V.js";import"./index-oBd4asvj.js";import"./floating-ui.react-dom-B42UJQTc.js";import"./index-RjOhuvmD.js";import"./index-Du7wKuqH.js";import"./index-DqaDrQIB.js";import"./index-Dp2WEbHw.js";import"./index-DDWh44_p.js";import"./index-PuvSF7B8.js";import"./index-BfUmvPxv.js";import"./index-CtVLOff4.js";import"./index-D_TmPiwW.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CXKR8diu.js";import"./createLucideIcon-D7vBl0eU.js";import"./check-BXTJDfo9.js";import"./chevron-up-CksgCOEE.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
