import{j as d}from"./jsx-runtime-CdgamqrQ.js";import{r as a}from"./iframe-DZzzdSLV.js";import{i as r}from"./index-B0bz_uy0.js";import{S as n}from"./scroll-group-selector.component-BULs10Ay.js";import"./preload-helper-CTOgD26E.js";import"./index-D6jRp_YW.js";import"./select-BxUf0j-1.js";import"./index-DkweBWM9.js";import"./index-LHG3DlE0.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-DlKklsFI.js";import"./index-Dvk8n2eF.js";import"./index-DcTmawE4.js";import"./index-Cx6Jhy6o.js";import"./index-BLH55s_Z.js";import"./index-4a0U8dwf.js";import"./index-CwcOs5Ds.js";import"./index-w4CJimnY.js";import"./floating-ui.react-dom-DDHkAII1.js";import"./index-DZU7mOkh.js";import"./index-JezeZNoF.js";import"./index-yS0_uDMC.js";import"./index-BMtjyf2x.js";import"./index-Cld14CqY.js";import"./index-D5r6OQda.js";import"./index-CLADjwnm.js";import"./index-DcA6cmjZ.js";import"./index-O4ntgsGZ.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-PWz8JZRT.js";import"./createLucideIcon-BdVc_3sQ.js";import"./check-DS-92x3O.js";import"./chevron-up-CvFNJq_q.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
