import{j as d}from"./jsx-runtime-Bcv5qG8q.js";import{r as a}from"./iframe-B1JTTRWo.js";import{U as r}from"./index-BYC3xje7.js";import{S as c}from"./scroll-group-selector.component-DJHuXfrK.js";import"./select-BqUV7Gyb.js";import"./index-C1q67m9i.js";import"./index-DTO8bnlh.js";import"./index-BaQP4hhM.js";import"./index-XotOfbKj.js";import"./index-D_1KZAH0.js";import"./index-CW5Uy6nx.js";import"./index-CTM9cwMY.js";import"./index-Do0jtVL9.js";import"./index-COW61aIP.js";import"./index-BAJ2K8La.js";import"./index-SR4aJxrH.js";import"./index-KUyDGunJ.js";import"./index-eZ3yBUPT.js";import"./index-D6BjlBM-.js";import"./floating-ui.react-dom-MXs8wDJ-.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-nGoFfWgl.js";import"./index-D7GLu0tr.js";import"./index-BwCWUYfy.js";import"./index-DMp7ZY4R.js";import"./index-Cel2m5vc.js";import"./index-Cc4Vve9q.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DVP9bTQs.js";import"./createLucideIcon-C3oRQsbk.js";import"./check-Bt4cFXTp.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},$={title:"Advanced/ScrollGroupSelector",component:c,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},n={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(I=(g=l.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var f,h,C;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} className="tw-bg-yellow-100" size="sm" />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 1,
    localizedStrings
  }
}`,...(C=(h=n.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const ee=["Default","WithCustomSize","WithCustomClass"];export{s as Default,n as WithCustomClass,l as WithCustomSize,ee as __namedExportsOrder,$ as default};
