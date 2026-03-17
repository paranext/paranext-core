import{j as d}from"./jsx-runtime-eJ9g4_c9.js";import{r as a}from"./iframe-ELTlX8xZ.js";import{i as r}from"./index-DgvB8rDJ.js";import{S as n}from"./scroll-group-selector.component-BlWZjbK8.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-NVU1jf-s.js";import"./index-DJyCZuOn.js";import"./index-CRdryiRj.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-mtKA3vHE.js";import"./index-DGhgo2yC.js";import"./index-DMBaDEwl.js";import"./index-DGQ3_JL2.js";import"./index-DnjMiyKL.js";import"./index-Ckh-9gXU.js";import"./index-CgQcP0JA.js";import"./index-ZQvhzOg-.js";import"./floating-ui.react-dom-C0w_jCG_.js";import"./index-ET6Hc9gp.js";import"./index-Cx27vRsz.js";import"./index-C7xQhh14.js";import"./index-BElHIfol.js";import"./index-Lm6jkiS9.js";import"./index-CHyxFGCY.js";import"./index-5WKhlD3H.js";import"./index-BkgLbRy4.js";import"./index-Dkt4U2UJ.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DeemE_zu.js";import"./createLucideIcon-CqsCGDMn.js";import"./check-CnWW0wkc.js";import"./chevron-up-DF4--L2Q.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
