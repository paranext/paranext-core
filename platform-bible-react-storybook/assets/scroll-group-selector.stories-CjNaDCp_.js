import{j as d}from"./jsx-runtime-NBxPu_RQ.js";import{r as a}from"./iframe-DqyNn6dQ.js";import{G as r}from"./index-CQVHRrhN.js";import{S as n}from"./scroll-group-selector.component-CqKC3sR4.js";import"./index-D2w9gCAG.js";import"./select-BSs2V8XV.js";import"./index-DgIfDI0d.js";import"./index-BsbuKiFW.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-O5rVraJb.js";import"./index-BS7JiZCw.js";import"./index-JmnYvUHf.js";import"./index-WBqoZvtE.js";import"./index-CxRYHHdS.js";import"./index-Dka35I0E.js";import"./index-Fs7xnYF6.js";import"./index-DLwJpgK8.js";import"./floating-ui.react-dom-C8_gdo5n.js";import"./index-p-D2zjEs.js";import"./index-BiRb-m75.js";import"./index-C_hoCkfE.js";import"./index-D6YMO8PQ.js";import"./index-DzOCTLUZ.js";import"./index-CvLmzNXn.js";import"./index-Bn814qtu.js";import"./index-D_yVwBfT.js";import"./index-DztKOWc1.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-BMGNdpFv.js";import"./createLucideIcon-ChClvniI.js";import"./check-DwVcRMnR.js";import"./chevron-up-laxPNbH3.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
