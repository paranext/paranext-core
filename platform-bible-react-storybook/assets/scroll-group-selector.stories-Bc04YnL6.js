import{j as d}from"./jsx-runtime-C4L0gC51.js";import{r as a}from"./iframe-BfGc0rZY.js";import{i as r}from"./index-CVvpfEUF.js";import{S as n}from"./scroll-group-selector.component-DusqiVDS.js";import"./preload-helper-CTOgD26E.js";import"./index-D6jRp_YW.js";import"./select-C8P-DjMy.js";import"./index-Dz4qXa4f.js";import"./index-B-Pki7tL.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-ysRtpM9W.js";import"./index-BYcygvrR.js";import"./index-2fSvaUXR.js";import"./index-9eHbiXEU.js";import"./index-IZ65ZQXE.js";import"./index-aWW6hR9r.js";import"./index-DbdiB_gp.js";import"./index-B7w8uq1w.js";import"./floating-ui.react-dom-dIGO78mm.js";import"./index-Cn-sOoyv.js";import"./index-0cVf4S5n.js";import"./index-DqL-5hvU.js";import"./index-D9kCaIEd.js";import"./index-BJ00tbHk.js";import"./index-BEwxQ2W5.js";import"./index-DvUYSxei.js";import"./index-DglZjdAO.js";import"./index-BVmhJQqq.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CaIxKKR6.js";import"./createLucideIcon-CkIC5Fk_.js";import"./check-D_asMY2M.js";import"./chevron-up-CXyuFisK.js";import"./z-index-B4JyHfu5.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
