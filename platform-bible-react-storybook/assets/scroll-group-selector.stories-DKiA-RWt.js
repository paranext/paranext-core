import{j as d}from"./jsx-runtime-BRFFguMz.js";import{r as a}from"./iframe-0GLUzb77.js";import{J as r}from"./index-CmLeGMp1.js";import{S as n}from"./scroll-group-selector.component-B03f42fK.js";import"./index-D2w9gCAG.js";import"./select-DQCcE7Hk.js";import"./index-sylXaBxi.js";import"./index-BZksZUxR.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-Cc2gl2nO.js";import"./index-BqMQNuCQ.js";import"./index-Dxhdnql3.js";import"./index-vYcAOIBg.js";import"./index-C8Pbk20Y.js";import"./index-8gqIB--w.js";import"./index-3NRR-m4S.js";import"./index-CRLE3nXA.js";import"./floating-ui.react-dom-DzqudKLa.js";import"./index-BewqN4KH.js";import"./index-DDwbzr1K.js";import"./index-x3D1SDES.js";import"./index-Ccx7qNWD.js";import"./index-CyFch6v1.js";import"./index-DFNm7my9.js";import"./index-ZJFdUxev.js";import"./index-DFhOjqgm.js";import"./index-D2vx0g_g.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-HGBiCtWC.js";import"./createLucideIcon-F-tD8aKc.js";import"./check-BuG2SOsR.js";import"./chevron-up-RTQmX2Jg.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
