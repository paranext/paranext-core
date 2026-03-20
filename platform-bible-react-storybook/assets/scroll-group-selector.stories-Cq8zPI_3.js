import{j as d}from"./jsx-runtime-D0VKM5yV.js";import{r as a}from"./iframe-Bm0BX3s5.js";import{i as r}from"./index-DgvB8rDJ.js";import{S as n}from"./scroll-group-selector.component-30n96Spe.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-DpOn7MJm.js";import"./index-xPAyo_23.js";import"./index-BX2T732n.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-Bx0a5Sbb.js";import"./index-B19C0tZ8.js";import"./index-CuHPss1U.js";import"./index-DeZ_Lf5K.js";import"./index-D0y7yLbU.js";import"./index-CwpSiNi8.js";import"./index-E6Z62EY2.js";import"./index-BCgwilB0.js";import"./floating-ui.react-dom-BGVu_6SK.js";import"./index-BNFq2Gyo.js";import"./index-DfbdAJ2G.js";import"./index-YnnjrejN.js";import"./index-DqINoDpj.js";import"./index-CSMSo2cI.js";import"./index-DDT8EWpH.js";import"./index-Ca9758xj.js";import"./index-CP-g6OK2.js";import"./index-CiikEcQd.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-BmgWKhBy.js";import"./createLucideIcon-BibS-qOZ.js";import"./check-DfLPsCpo.js";import"./chevron-up-ByHg2wSS.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
