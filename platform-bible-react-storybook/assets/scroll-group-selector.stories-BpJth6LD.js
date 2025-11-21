import{j as d}from"./jsx-runtime-B57USwOM.js";import{r as a}from"./iframe-BIgrU_gL.js";import{L as r}from"./index-DNL2LXP3.js";import{S as n}from"./scroll-group-selector.component-O7gmTenu.js";import"./select-C44mE1cS.js";import"./index-CwP3KLOH.js";import"./index-BJiVrZLO.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-g45Whb6K.js";import"./index-QE61htb2.js";import"./index-NRjMMBFI.js";import"./index-qxytAG8i.js";import"./index-COxZgPI9.js";import"./index-CT1JCy7J.js";import"./index-Cfepox31.js";import"./index-DPcdlNoP.js";import"./floating-ui.react-dom-QEVz-clS.js";import"./index-DPhNMXhP.js";import"./index-BH-5r4K8.js";import"./index-Cp_DkjYg.js";import"./index-BV0VDXur.js";import"./index-CdHlF7wd.js";import"./index-BfIrR0qS.js";import"./index-CvOKcZNv.js";import"./index-DryNFfgW.js";import"./index-BuMmGbu1.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CCzsZuG8.js";import"./createLucideIcon-zWNoUrH3.js";import"./check-BGA574xZ.js";import"./chevron-up-DAtJUkaP.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},ee={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const re=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,re as __namedExportsOrder,ee as default};
