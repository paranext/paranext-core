import{j as d}from"./jsx-runtime-Bl__hmLx.js";import{r as a}from"./iframe-PQ3SVnim.js";import{$ as r}from"./index-BugJWyBz.js";import{S as c}from"./scroll-group-selector.component-wsOaaTB5.js";import"./index-BvgP4pxm.js";import"./index-DvlJK5g4.js";import"./index-CAMOEQDR.js";import"./index-CvlMNREu.js";import"./index-BiZpxjs7.js";import"./index-c5dChS87.js";import"./index-DrpSl776.js";import"./index-BOY4hWGT.js";import"./index-Cdd-Yk__.js";import"./floating-ui.react-dom-eJrmjUSd.js";import"./index-BQYSBuaU.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./check-BzfFOhxv.js";const u=[void 0,0,1,2,3,4],p={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},T={title:"Advanced/ScrollGroupSelector",component:c,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:u,scrollGroupId:void 0,localizedStrings:p}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:u,scrollGroupId:2,localizedStrings:p}},n={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:u,scrollGroupId:1,localizedStrings:p}};var i,m,S;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(C=(h=n.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const k=["Default","WithCustomSize","WithCustomClass"];export{s as Default,n as WithCustomClass,l as WithCustomSize,k as __namedExportsOrder,T as default};
