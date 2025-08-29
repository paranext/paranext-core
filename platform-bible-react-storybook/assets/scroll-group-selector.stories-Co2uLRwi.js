import{j as d}from"./jsx-runtime-BeudytaJ.js";import{r as a}from"./iframe-Bh-UVLQ1.js";import{U as r}from"./index-BYC3xje7.js";import{S as c}from"./scroll-group-selector.component-BIs68scy.js";import"./select-B5STtTL2.js";import"./index-Dmu37ZaT.js";import"./index-qcNN8ToE.js";import"./index-BaQP4hhM.js";import"./index-C4xi1nxg.js";import"./index-Bczu6PfH.js";import"./index-xoYMO5Fv.js";import"./index-Cknf1CWD.js";import"./index-OKYpWvY3.js";import"./index-DzLAgRgn.js";import"./index-4GjaQBnO.js";import"./index-C1dm1miQ.js";import"./index-DbkXsGQQ.js";import"./index-CdNQegAS.js";import"./index-BiFp2t0M.js";import"./floating-ui.react-dom-CympVei8.js";import"./index-DEwK2nPV.js";import"./index-C0aPA0iu.js";import"./index-BdkO5MHs.js";import"./index-B2YbZ1yp.js";import"./index-BX7R-5WD.js";import"./index--pXAt694.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-2kngZ13G.js";import"./createLucideIcon-WkfhWSED.js";import"./check-dKNi6MrJ.js";const p=[void 0,0,1,2,3,4],u={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},Z={title:"Advanced/ScrollGroupSelector",component:c,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:u}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:u}},n={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:u}};var i,m,S;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(C=(h=n.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const $=["Default","WithCustomSize","WithCustomClass"];export{s as Default,n as WithCustomClass,l as WithCustomSize,$ as __namedExportsOrder,Z as default};
