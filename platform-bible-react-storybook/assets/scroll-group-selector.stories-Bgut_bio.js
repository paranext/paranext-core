import{j as d}from"./jsx-runtime-OC_yph0f.js";import{r as a}from"./iframe-Dn3862X1.js";import{G as r}from"./index-Br2VQ3-M.js";import{S as n}from"./scroll-group-selector.component-BE6ak8v-.js";import"./preload-helper-CTOgD26E.js";import"./index-Bl2C2VvJ.js";import"./select-BK4DCTHF.js";import"./index-D5O37xxx.js";import"./index-CuccKubN.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-6uKBdhrz.js";import"./index-D7x_8tUn.js";import"./index-lrwRjhGk.js";import"./index-BogT6mma.js";import"./index-C8bfH76m.js";import"./index-XtPmYU_4.js";import"./index-CdJf_JjT.js";import"./index-BnwTJjkD.js";import"./floating-ui.react-dom-BijFbX0N.js";import"./index-B97dyP38.js";import"./index-BDRRccMN.js";import"./index-CgIT46Lx.js";import"./index-DLhIgdNs.js";import"./index-1otjnLda.js";import"./index-Ds8hqRul.js";import"./index-DTHv53IU.js";import"./index-BAabsZi0.js";import"./index-Dr1TR8Sj.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DHiYH2GW.js";import"./createLucideIcon-B5zlVdyv.js";import"./check-mwtt6bMQ.js";import"./chevron-up-n7zmGNm8.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
