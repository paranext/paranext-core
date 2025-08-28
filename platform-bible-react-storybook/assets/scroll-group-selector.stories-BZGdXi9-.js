import{j as d}from"./jsx-runtime-41bNZknh.js";import{r as a}from"./iframe-DezKLm1V.js";import{U as r}from"./index-D2SfiHnw.js";import{S as c}from"./scroll-group-selector.component-C5oqVGV0.js";import"./select-Dr6ovA2M.js";import"./index-Cm_lBpWX.js";import"./index-bmjVsPBM.js";import"./index-BaQP4hhM.js";import"./index-DCZ4hzzP.js";import"./index-Ds3a2SEj.js";import"./index-yLsKtSDm.js";import"./index-DnT6kkIn.js";import"./index-CUlupESh.js";import"./index-D0KJGRUa.js";import"./index-DRzs5cDs.js";import"./index-C_lQNFk6.js";import"./index-GymTf0II.js";import"./index-CGW-eGMe.js";import"./index-5i6OQTW1.js";import"./floating-ui.react-dom-DRRlu4dy.js";import"./index-Cl2ghorV.js";import"./index-C4F-WIu_.js";import"./index-bv5lnDsn.js";import"./index--VrIerAB.js";import"./index-SLflGqxF.js";import"./index-CQaoPSAz.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DiYI-0EF.js";import"./createLucideIcon-DTaFhFy2.js";import"./check-sRo6ZDjs.js";const p=[void 0,0,1,2,3,4],u={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},Z={title:"Advanced/ScrollGroupSelector",component:c,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:u}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:u}},n={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:u}};var i,m,S;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(C=(h=n.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const $=["Default","WithCustomSize","WithCustomClass"];export{s as Default,n as WithCustomClass,l as WithCustomSize,$ as __namedExportsOrder,Z as default};
