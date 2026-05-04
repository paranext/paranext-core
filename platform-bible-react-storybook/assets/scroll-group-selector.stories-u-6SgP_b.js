import{j as d}from"./jsx-runtime-CdkZDUHG.js";import{r as a}from"./iframe-svHtGuYt.js";import{i as r}from"./index-r3mwEuN3.js";import{S as n}from"./scroll-group-selector.component-Dd0FHGR9.js";import"./preload-helper-CTOgD26E.js";import"./index-D2t4nnj1.js";import"./select-B4lRe68B.js";import"./index-BnYHvwEG.js";import"./index-yfrzbLaA.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-B4xOxgXv.js";import"./index-m78LoXNF.js";import"./index-C0-y2Q1E.js";import"./index-D2rQ4Awq.js";import"./index-TgSr4lMj.js";import"./index-DbgmGBwm.js";import"./index-DklqRH_h.js";import"./index-CbUHjnrD.js";import"./floating-ui.react-dom-BF_3gfAb.js";import"./index-BYlV1tG8.js";import"./index-UhLa0AQW.js";import"./index-9aGTAqX0.js";import"./index-B04NqyE4.js";import"./index-lpxTiszQ.js";import"./index-DAx-l82w.js";import"./index-Cf6NGHWO.js";import"./index-DsU4C3II.js";import"./index-DW4SykZr.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DCAZKuNH.js";import"./createLucideIcon-BltMDm3e.js";import"./check-B4abHnbq.js";import"./chevron-up-h_LLJNUT.js";import"./z-index-B4JyHfu5.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
