import{j as d}from"./jsx-runtime-BeMi7Lg0.js";import{r as a}from"./iframe-PA7T8TtG.js";import{r}from"./index-DRKOdupj.js";import{S as n}from"./scroll-group-selector.component-CoIAx2cz.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-C80vjibM.js";import"./index-4AHsKuRH.js";import"./index-CjLDnunV.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-Et5QqrSs.js";import"./index-CU9jgvI0.js";import"./index-CVKqOQTL.js";import"./index-Cjl6j0Zz.js";import"./index-B2KOjZqJ.js";import"./index-DLMDU-Fg.js";import"./index-CODi-Aue.js";import"./index-DViwRINs.js";import"./floating-ui.react-dom-DV03KEYj.js";import"./index-scFKCX4u.js";import"./index-BEdYfG1Y.js";import"./index-BwiqSGNG.js";import"./index-D3EdApLZ.js";import"./index-BXNyprtO.js";import"./index-Bpnzv7MQ.js";import"./index-B9zPbPt2.js";import"./index-DcD_nBal.js";import"./index-DVaOh4js.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CBL_Q5v2.js";import"./createLucideIcon-DPQdJq8E.js";import"./check-CswiIeWc.js";import"./chevron-up-D94Cke9r.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
