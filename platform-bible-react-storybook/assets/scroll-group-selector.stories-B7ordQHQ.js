import{j as d}from"./jsx-runtime-Dur9nZnO.js";import{r as a}from"./iframe-Cf9uK6iK.js";import{G as r}from"./index-CQVHRrhN.js";import{S as n}from"./scroll-group-selector.component-BXMdrkSv.js";import"./index-D2w9gCAG.js";import"./select-2ZRxknb3.js";import"./index-DaPKptgz.js";import"./index-DnHeayX1.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-Dz3Z2GLV.js";import"./index-CM7UxxmK.js";import"./index-DB7DrBdY.js";import"./index-DW7Mxc3s.js";import"./index-2NOTX78Y.js";import"./index-DTUMkjSf.js";import"./index-DV1dlYb8.js";import"./index-BcLMZcXG.js";import"./floating-ui.react-dom-C6CmnGj4.js";import"./index-Bd6paf8h.js";import"./index-B47TFEg_.js";import"./index-uYfBzDbD.js";import"./index-DYTLdMhV.js";import"./index-kNi0aLG0.js";import"./index-DJg7T5Cp.js";import"./index-CaBcMeGL.js";import"./index-DwLqtGah.js";import"./index-aiwZToO1.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CtOGMwBO.js";import"./createLucideIcon-C9tAUAPe.js";import"./check-DTRWQNzs.js";import"./chevron-up-DtTZfMX8.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
