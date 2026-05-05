import{j as d}from"./jsx-runtime-Cw5fpYte.js";import{r as a}from"./iframe-DBkfHAdD.js";import{i as r}from"./index-r3mwEuN3.js";import{S as n}from"./scroll-group-selector.component-WpnXRby9.js";import"./preload-helper-CTOgD26E.js";import"./index-D2t4nnj1.js";import"./select-D_NXeFxN.js";import"./index-COLFKIXJ.js";import"./index-BR8Xv95S.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-DW6uh7Ff.js";import"./index-B0JkTEVi.js";import"./index-C17qbB4-.js";import"./index-B5xOVECA.js";import"./index-BxXXNC14.js";import"./index-C9TmIPH8.js";import"./index-DiMTyRnO.js";import"./index-CsEJdSX8.js";import"./floating-ui.react-dom-BctUU6RO.js";import"./index-CRh2TreR.js";import"./index-G1c-VQ3D.js";import"./index-DK5uRrzt.js";import"./index-tJXP5ZLn.js";import"./index-DZ7POt3m.js";import"./index-CbO_EUv6.js";import"./index-CRMJKlGd.js";import"./index-DU1Hp7lS.js";import"./index-MiPqODwW.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DPLAZQL9.js";import"./createLucideIcon-KB_WppAk.js";import"./check-BBmJqUZv.js";import"./chevron-up-DPJkHyZq.js";import"./z-index-B4JyHfu5.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
