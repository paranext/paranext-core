import{j as d}from"./jsx-runtime-BbhWLeVR.js";import{r as a}from"./iframe-D_JBJic_.js";import{G as r}from"./index-CIWIMa1p.js";import{S as n}from"./scroll-group-selector.component-BrezXyv4.js";import"./preload-helper-CTOgD26E.js";import"./index-Bl2C2VvJ.js";import"./select-c2K3ik1w.js";import"./index-DdeQNFJj.js";import"./index-THkI1Xak.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-DGC14937.js";import"./index-DeHIpm32.js";import"./index-BP-NRo6C.js";import"./index-PY8xlKtK.js";import"./index-CLkZULqR.js";import"./index-B1doWiy2.js";import"./index-Die9_as2.js";import"./index-CuG26f7s.js";import"./floating-ui.react-dom-Be4IA9jE.js";import"./index-Bhi7g6Lx.js";import"./index-D2MVgeg5.js";import"./index-B6aLbnfL.js";import"./index-DRyOH_rP.js";import"./index-DmBx9BVY.js";import"./index-CT2INi8G.js";import"./index-CMXaLfXo.js";import"./index-DT2kR5d1.js";import"./index-CJBuoi87.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DU6YIV6Y.js";import"./createLucideIcon-CjJu5wqM.js";import"./check-CAcIUGVq.js";import"./chevron-up-CvgCa80f.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
