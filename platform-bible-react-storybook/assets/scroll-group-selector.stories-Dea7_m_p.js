import{j as d}from"./jsx-runtime-B8v8HYgF.js";import{r as a}from"./iframe-wA5_ufbN.js";import{J as r}from"./index-DcB2WZF4.js";import{S as n}from"./scroll-group-selector.component-Bl03eK8x.js";import"./index-D2w9gCAG.js";import"./select-BKArcijd.js";import"./index-DxDRW8WT.js";import"./index--ZI0cJ_5.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-BPP4jAAK.js";import"./index-CYSVQpyQ.js";import"./index-kl1T-muK.js";import"./index-Dgn3iPdc.js";import"./index-CCLd4j4h.js";import"./index-CyQ4BrOj.js";import"./index-BXIWRdYH.js";import"./index-Ds97O1eS.js";import"./floating-ui.react-dom-F1oUyk9O.js";import"./index-RTB3joAI.js";import"./index-Cj671iFp.js";import"./index-CtiJYQhQ.js";import"./index-4X_rwmeG.js";import"./index-CuUu24xS.js";import"./index-p83Qy7Y0.js";import"./index-BMHr6DJY.js";import"./index-DJqQ0VSy.js";import"./index-CHQRIj27.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DP4DOjaO.js";import"./createLucideIcon-nJrjCKYQ.js";import"./check-B8b8tw64.js";import"./chevron-up-DVRUtzBO.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
