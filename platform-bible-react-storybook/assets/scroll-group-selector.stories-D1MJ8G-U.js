import{j as d}from"./jsx-runtime-CGftLhFb.js";import{r as a}from"./iframe-tnoyQyNI.js";import{i as r}from"./index-DgvB8rDJ.js";import{S as n}from"./scroll-group-selector.component-CRnEQ7hf.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-9p8r8tjd.js";import"./index-D0oDqtkd.js";import"./index-BeVvfGpP.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-BH2zftXV.js";import"./index-DXdmrJrB.js";import"./index-C60-aM9K.js";import"./index-BYEvN33h.js";import"./index-DGeLkDLm.js";import"./index-BFhUbCvW.js";import"./index-Dhu2g8mK.js";import"./index-ClQI1lAF.js";import"./floating-ui.react-dom-BcuQX0Cl.js";import"./index-Dhn68bu5.js";import"./index-E9mjhkmz.js";import"./index-C3063JA_.js";import"./index-DdBlYUOC.js";import"./index-ChKQO77u.js";import"./index-CTfSdzUs.js";import"./index-CAxyn1-c.js";import"./index-kRFhxQK_.js";import"./index-D9Vf4GEX.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-D78nTW5P.js";import"./createLucideIcon-DSSpoETD.js";import"./check-CXra-HFX.js";import"./chevron-up-AwZUmfRE.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
