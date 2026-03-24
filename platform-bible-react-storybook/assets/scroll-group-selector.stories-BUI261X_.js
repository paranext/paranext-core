import{j as d}from"./jsx-runtime-mPF61usE.js";import{r as a}from"./iframe-DvTRtTCX.js";import{i as r}from"./index-DgvB8rDJ.js";import{S as n}from"./scroll-group-selector.component-td3mrPdY.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-BFf8HFnu.js";import"./index-BWtNKDDL.js";import"./index-DjKtGtt9.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-CYlsIhXS.js";import"./index-R2v3sr2l.js";import"./index-BrTTmQdy.js";import"./index-KjuC5hMn.js";import"./index-COXYi26A.js";import"./index-BROBm16R.js";import"./index-mDMl-X_K.js";import"./index-bZ9Vrvhd.js";import"./floating-ui.react-dom-VfhEH6Fd.js";import"./index-DXk623fO.js";import"./index-8jVQn2yk.js";import"./index-CbV7y0Ki.js";import"./index-MPYfn9_M.js";import"./index-BcZstXiV.js";import"./index-7SNSzLQQ.js";import"./index-C4hT8Rit.js";import"./index-BntZEjbI.js";import"./index-BCxUUvaO.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CJHLmkr_.js";import"./createLucideIcon-hLG2I161.js";import"./check-F0bdk6zC.js";import"./chevron-up-DSCLBw_j.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
