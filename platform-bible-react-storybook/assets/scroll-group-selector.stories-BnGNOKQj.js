import{j as d}from"./jsx-runtime-Dr4sgJAZ.js";import{r as a}from"./iframe-DvY_I9Yw.js";import{V as r}from"./index-DOKkQ3oI.js";import{S as c}from"./scroll-group-selector.component-DYl6qYEy.js";import"./select-rsc0Vw0O.js";import"./index-nMIfa7K4.js";import"./index-BBSgYciu.js";import"./index-BaQP4hhM.js";import"./index-C8EUOcJ-.js";import"./index-BNVt_Rkr.js";import"./index-D6-knaIs.js";import"./index-D1z8bsm4.js";import"./index-Ch7FnV-A.js";import"./index-CYNsKgrN.js";import"./index-DTJIDiOW.js";import"./index-4w1_IK8g.js";import"./index-CCt0sewE.js";import"./index-fgn3QEVw.js";import"./index-PQJoZi9K.js";import"./floating-ui.react-dom-DFy_Dqjo.js";import"./floating-ui.dom-DCpBEVSC.js";import"./index-DY25LD20.js";import"./index-BA_IqcJO.js";import"./index-MTks7173.js";import"./index-DGe3op3Q.js";import"./index-CAjbFLUC.js";import"./index-CAo-z_RG.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-qauWIDtV.js";import"./createLucideIcon-CMaxIgo_.js";import"./check-DsRMrnpj.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},$={title:"Advanced/ScrollGroupSelector",component:c,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},n={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
