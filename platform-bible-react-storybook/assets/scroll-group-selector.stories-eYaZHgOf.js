import{j as d}from"./jsx-runtime-Bmftk0NB.js";import{r as a}from"./iframe-BuUDuXfn.js";import{J as r}from"./index-CmLeGMp1.js";import{S as n}from"./scroll-group-selector.component-ENjzOEc6.js";import"./index-D2w9gCAG.js";import"./select-CfsPEhPM.js";import"./index-CgrUr-57.js";import"./index-Dyd94XPJ.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-CGuGF115.js";import"./index-BuyEwqS5.js";import"./index-BLPefrM_.js";import"./index-j9wX81Pn.js";import"./index-DMJnMw9W.js";import"./index-8MNAx6kK.js";import"./index-DAZmN-GG.js";import"./index-CC51jdQZ.js";import"./floating-ui.react-dom-BreTu53R.js";import"./index-bX6zNKvB.js";import"./index-BKi9bA8M.js";import"./index-DW2g2tF7.js";import"./index-CK_o6D1F.js";import"./index-DnJuynJw.js";import"./index-NLeOIuAn.js";import"./index-BqlaBCI2.js";import"./index-DGuh3BjX.js";import"./index-CD8k2Smx.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-Cw8q0Fjz.js";import"./createLucideIcon-BoLz2Esh.js";import"./check-CzXoS_eM.js";import"./chevron-up-qcK5y5-7.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const oe=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,oe as __namedExportsOrder,re as default};
