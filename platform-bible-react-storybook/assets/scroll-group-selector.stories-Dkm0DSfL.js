import{j as d}from"./jsx-runtime-DkQ5yc-w.js";import{r as a}from"./iframe-3yEZ8Llg.js";import{V as r}from"./index-CMbzNxbH.js";import{S as c}from"./scroll-group-selector.component-DiieN4iv.js";import"./select-CGfoS96m.js";import"./index-DfWOAAQE.js";import"./index-DqY4tZYh.js";import"./index-BaQP4hhM.js";import"./index-1h9ywWl9.js";import"./index-CfeOJYUq.js";import"./index-_gqTi_4G.js";import"./index-w7frwJUJ.js";import"./index-WXPXtHLd.js";import"./index-CNWYH702.js";import"./index-D479rUKp.js";import"./index-CrDx6fQo.js";import"./index-Ct53LZ0Y.js";import"./index-TkD5g0Pr.js";import"./index-Cqt_V6N-.js";import"./floating-ui.react-dom-q-C88mrB.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-BvjrbJ3H.js";import"./index-jemQoNBj.js";import"./index-Bf-Vefs7.js";import"./index-CzdZeHmc.js";import"./index-FOVSvPI6.js";import"./index-CIz7o_7Z.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-BziLAJ54.js";import"./createLucideIcon-nW4r7FNu.js";import"./check-RVid7omx.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},$={title:"Advanced/ScrollGroupSelector",component:c,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},n={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
