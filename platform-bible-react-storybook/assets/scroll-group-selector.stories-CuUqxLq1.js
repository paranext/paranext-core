import{j as d}from"./jsx-runtime-COkDGzaA.js";import{r as a}from"./index-D0Vjon0S.js";import{S as c,$ as r}from"./scroll-group-selector.component-Bh26DRkj.js";import"./_commonjsHelpers-COjnNjrF.js";import"./index-D7mW_kaG.js";import"./index-D5BB0-mC.js";import"./check-mDtIrACv.js";import"./index-CxW8mOvc.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";const u=[void 0,0,1,2,3,4],p={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},D={title:"Advanced/ScrollGroupSelector",component:c,tags:["autodocs"]},t={render:e=>{const[o,s]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:s})},args:{availableScrollGroupIds:u,scrollGroupId:void 0,localizedStrings:p}},l={render:e=>{const[o,s]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:s,size:"lg"})},args:{availableScrollGroupIds:u,scrollGroupId:2,localizedStrings:p}},n={render:e=>{const[o,s]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:s,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:u,scrollGroupId:1,localizedStrings:p}};var i,S,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: undefined,
    localizedStrings
  }
}`,...(m=(S=t.parameters)==null?void 0:S.docs)==null?void 0:m.source}}};var G,g,I;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(C=(h=n.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const q=["Default","WithCustomSize","WithCustomClass"];export{t as Default,n as WithCustomClass,l as WithCustomSize,q as __namedExportsOrder,D as default};
