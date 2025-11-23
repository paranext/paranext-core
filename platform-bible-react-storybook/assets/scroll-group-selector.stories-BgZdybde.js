import{j as d}from"./jsx-runtime-DYdH0Bpv.js";import{r as a}from"./iframe-GRO_q3r5.js";import{L as r}from"./index-DNL2LXP3.js";import{S as n}from"./scroll-group-selector.component-B8Z38KI-.js";import"./select-2mtCvEqu.js";import"./index-RCKYsxPh.js";import"./index-CwaHUmDz.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-B9BJJrka.js";import"./index-C8ptiv9h.js";import"./index-CdBbWID_.js";import"./index-vP08ADpb.js";import"./index-VndLGJ-I.js";import"./index-BlJ4Yg6k.js";import"./index-B3uZ0Ztc.js";import"./index-D04FOCGj.js";import"./floating-ui.react-dom-DHpdw1JM.js";import"./index-CoTjvdMv.js";import"./index-aV8Q-Doo.js";import"./index-C2SPF2zY.js";import"./index-75am10L8.js";import"./index-C52JeAEo.js";import"./index-B-A_1dao.js";import"./index-CBVV6AY6.js";import"./index-CRE3FOco.js";import"./index-B8b-c3oM.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CighenK6.js";import"./createLucideIcon-CCJkxewo.js";import"./check-BVRgXKgy.js";import"./chevron-up-BBMUO3fC.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},ee={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const re=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,re as __namedExportsOrder,ee as default};
