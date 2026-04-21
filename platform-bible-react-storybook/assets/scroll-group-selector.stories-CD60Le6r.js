import{j as d}from"./jsx-runtime-DOv2cnc8.js";import{r as a}from"./iframe-B7zksOO8.js";import{i as r}from"./index-DoXJpTCu.js";import{S as n}from"./scroll-group-selector.component-BYnENl-u.js";import"./preload-helper-CTOgD26E.js";import"./index-D6jRp_YW.js";import"./select-DdcvKCcm.js";import"./index-Dv6zODVY.js";import"./index-217eysKU.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-C_TBHnum.js";import"./index-QdGm4pYt.js";import"./index-qUY4KwgG.js";import"./index-9qZklGn1.js";import"./index-D_BA2dFX.js";import"./index-CWRgOoZF.js";import"./index-CdawBu4j.js";import"./index--nyEvhzC.js";import"./floating-ui.react-dom-Cp8h8Rip.js";import"./index-BXPonULB.js";import"./index-DyeSrnea.js";import"./index-CuoFt_id.js";import"./index-BxNTR0iK.js";import"./index-fZMXln3r.js";import"./index-w8Nj8JDl.js";import"./index-DRlYjnK5.js";import"./index-B3ajGGm9.js";import"./index-CYX3JBBx.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-BpzfxeG6.js";import"./createLucideIcon-CTf2JmOb.js";import"./check-a3f8PZp3.js";import"./chevron-up-CjD-fF7w.js";import"./z-index-B4JyHfu5.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
