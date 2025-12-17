import{j as d}from"./jsx-runtime-Ds5GTx-c.js";import{r as a}from"./iframe-BePp2J9U.js";import{J as r}from"./index-CmLeGMp1.js";import{S as n}from"./scroll-group-selector.component-DBFiVAXV.js";import"./index-D2w9gCAG.js";import"./select-Pp0p1h2_.js";import"./index-CDQzm9DZ.js";import"./index-DLevVUDW.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-CKrfNoYB.js";import"./index-CC1_IxO9.js";import"./index-PyFDZUMK.js";import"./index-C2RasLQq.js";import"./index-Dz_srluQ.js";import"./index-CWUhwm6V.js";import"./index-B40WeYfQ.js";import"./index-C5cs8eWL.js";import"./floating-ui.react-dom-Dx3AMtpA.js";import"./index-BsC90UDf.js";import"./index-_ps9BNaM.js";import"./index-fWu1p80Q.js";import"./index-CaKktcxZ.js";import"./index-Cj4GfHZ0.js";import"./index-BvNmbDZQ.js";import"./index-pGnpnj5D.js";import"./index-BEHF3TR0.js";import"./index-BAla9Jnr.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CjC1qwtz.js";import"./createLucideIcon-BfiO64GR.js";import"./check-DoM5V3N5.js";import"./chevron-up-CkHS5Ne3.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const oe=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,oe as __namedExportsOrder,re as default};
