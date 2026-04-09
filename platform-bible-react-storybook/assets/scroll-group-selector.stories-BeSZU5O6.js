import{j as d}from"./jsx-runtime-cYdqiz78.js";import{r as a}from"./iframe-3ZLtkKix.js";import{i as r}from"./index-DdJ9wqfU.js";import{S as n}from"./scroll-group-selector.component-kf5KuEWK.js";import"./preload-helper-CTOgD26E.js";import"./index-D6jRp_YW.js";import"./select-BNulHjMs.js";import"./index-Ce3p8zcC.js";import"./index-Vz_ITLcP.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-B7kB3Ayk.js";import"./index-DFPlS2ak.js";import"./index-B9mJR1sQ.js";import"./index-ppQGzuJo.js";import"./index-B2ezGJqa.js";import"./index-CXNww_3y.js";import"./index-Bq65qWKS.js";import"./index-Br-zyv5a.js";import"./floating-ui.react-dom-D7tHroI7.js";import"./index-D7QpgUsd.js";import"./index-xmdKsPqw.js";import"./index-bUncuxhw.js";import"./index-D4qIfNDX.js";import"./index-CeE4WM4T.js";import"./index-CM1CMUV1.js";import"./index-UO9hII5Q.js";import"./index-DJTHb40N.js";import"./index-BYgN6ILu.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-BAQO001r.js";import"./createLucideIcon-CUARiWRb.js";import"./check-BZwXK0At.js";import"./chevron-up-3NucnCVv.js";import"./z-index-xsNeyxSu.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
