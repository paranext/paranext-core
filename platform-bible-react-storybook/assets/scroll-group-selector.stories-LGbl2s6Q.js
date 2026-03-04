import{j as d}from"./jsx-runtime-DLdhahB2.js";import{r as a}from"./iframe-C9y73PCp.js";import{r}from"./index-Dxtv2RbE.js";import{S as n}from"./scroll-group-selector.component-tyv2kMGy.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-BeCW029m.js";import"./index-Dj7_czyT.js";import"./index-Dmuyk5xF.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-o_wTfs6L.js";import"./index-CfSqEPJm.js";import"./index-BXTN3B6-.js";import"./index-BRha8eCv.js";import"./index-CSfL3wQ_.js";import"./index-BqYAAWWW.js";import"./index-BPqy1PsP.js";import"./index-DKne6uW6.js";import"./floating-ui.react-dom-C4vvHSSs.js";import"./index-CGN0PLCM.js";import"./index-l3esjeDd.js";import"./index-NC-Y8dra.js";import"./index-CaDNNPp2.js";import"./index-4NARVGh1.js";import"./index-D9FpChUX.js";import"./index-DerULGKw.js";import"./index-D4qnFvJc.js";import"./index-5P7thbeK.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CFcJEWl7.js";import"./createLucideIcon-D8jd7nXc.js";import"./check-C4MDAvht.js";import"./chevron-up-D2QohE5q.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
