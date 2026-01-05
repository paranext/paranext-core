import{j as d}from"./jsx-runtime-D2yWc6If.js";import{r as a}from"./iframe-D8E0DHM7.js";import{G as r}from"./index-CQVHRrhN.js";import{S as n}from"./scroll-group-selector.component-WbE0bIXq.js";import"./index-D2w9gCAG.js";import"./select-Dm6tvvxJ.js";import"./index-DTwt9jhc.js";import"./index-DZZBo1Qm.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-Jfv1fOY_.js";import"./index-CqQg7oEp.js";import"./index-D5MLWw_D.js";import"./index-DPH1TvvE.js";import"./index-DdqFJ7oY.js";import"./index-DzIh4y66.js";import"./index-DijGIr06.js";import"./index-CO6CksaK.js";import"./floating-ui.react-dom-A2jHDRVp.js";import"./index-DMCsQrjv.js";import"./index-BrvO9ylP.js";import"./index-C6x1QMsZ.js";import"./index-C1qHP2HC.js";import"./index-9iVNp5n9.js";import"./index-DaH1HA5I.js";import"./index-D5OeZ45-.js";import"./index-erk05UJ6.js";import"./index-Wl23anVJ.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-DQgJcAJG.js";import"./createLucideIcon-BD4WqGKu.js";import"./check-CVbQTEq1.js";import"./chevron-up-DgQ0Cozg.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
