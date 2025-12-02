import{j as d}from"./jsx-runtime-BCWqFc22.js";import{r as a}from"./iframe-D4H6vy13.js";import{J as r}from"./index-DcB2WZF4.js";import{S as n}from"./scroll-group-selector.component-DYKOJb2G.js";import"./index-D2w9gCAG.js";import"./select-C8V1VmMY.js";import"./index-C1pSkSrw.js";import"./index-RwtEhj9E.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-zeqOlb0X.js";import"./index-Cy-SgJtU.js";import"./index-C0_6PNM5.js";import"./index-DNXzknkU.js";import"./index-DTC_Qw5R.js";import"./index-Fw-K9XR6.js";import"./index-9SZFGiTQ.js";import"./index-Bmyp0LJh.js";import"./floating-ui.react-dom-CgSKXkjV.js";import"./index-6ngsv_ay.js";import"./index-Csx9tKk_.js";import"./index-BpZnfpQS.js";import"./index-BaC-R38R.js";import"./index-CmZYTQ7U.js";import"./index-BkQq8srz.js";import"./index-BtKK4L4G.js";import"./index-Cu_Z6Nu8.js";import"./index-kj7PR5f2.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-Le6JIpCy.js";import"./createLucideIcon-Sjh79QfM.js";import"./check-CIi-_P5b.js";import"./chevron-up-CmV3cHC9.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
