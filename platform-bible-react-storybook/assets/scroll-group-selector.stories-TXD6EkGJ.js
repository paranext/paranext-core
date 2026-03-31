import{j as d}from"./jsx-runtime-BmxVfNc0.js";import{r as a}from"./iframe-jgBMr6l2.js";import{i as r}from"./index-B0bz_uy0.js";import{S as n}from"./scroll-group-selector.component-enUVgfyi.js";import"./preload-helper-CTOgD26E.js";import"./index-D6jRp_YW.js";import"./select-CqV1vt0l.js";import"./index-4HaUbDWq.js";import"./index-Crm5nLUf.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-D_zsuTIu.js";import"./index-Bc3ab3vK.js";import"./index-CYIC_hWy.js";import"./index-DDOismQq.js";import"./index-DPjwFVRA.js";import"./index-XBrxKOEy.js";import"./index-B04-bDIa.js";import"./index-CKD4lmQW.js";import"./floating-ui.react-dom-CJm0V0xr.js";import"./index-DwecRZa1.js";import"./index-B16SL3Dj.js";import"./index-DUcxOZku.js";import"./index-TtY4Rlap.js";import"./index-C9d972de.js";import"./index-B_M6TI_0.js";import"./index-CbuywH6y.js";import"./index-BnTTLciP.js";import"./index-D8MX3MOy.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-fgtDAQGA.js";import"./createLucideIcon-CaYe-r0L.js";import"./check-Clhu6Tuf.js";import"./chevron-up-BPD2GR4b.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
