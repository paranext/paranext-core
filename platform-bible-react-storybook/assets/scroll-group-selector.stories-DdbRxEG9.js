import{j as d}from"./jsx-runtime-DQENgDIO.js";import{r as a}from"./iframe-DFc6vHIg.js";import{r}from"./index-DPh-3zwF.js";import{S as n}from"./scroll-group-selector.component-CqePOz81.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-CdZlQoa9.js";import"./index-Bp7Li-wt.js";import"./index-CRxCUaKB.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-DOKl9Efr.js";import"./index-AbgQcpJC.js";import"./index-gJZ8GGUL.js";import"./index-CMwd9sXx.js";import"./index-kgWTkfgb.js";import"./index-BsGk5tlK.js";import"./index-C2ifgHEu.js";import"./index-Dd6BBOJG.js";import"./floating-ui.react-dom-IOxpvfXL.js";import"./index-DlnZPKNd.js";import"./index-BS0tt9PA.js";import"./index-D-hR4E58.js";import"./index-B1eTwYNS.js";import"./index-BUfPUw2W.js";import"./index-C1CIvkuD.js";import"./index-CmzmZuf5.js";import"./index-D0kvFOil.js";import"./index-v2Leg7ms.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-Dj_uKuhB.js";import"./createLucideIcon-C7agq0Ik.js";import"./check-BS31Tbpr.js";import"./chevron-up-DLqEFJ2K.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
