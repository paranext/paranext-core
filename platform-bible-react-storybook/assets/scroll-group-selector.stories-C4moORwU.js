import{j as d}from"./jsx-runtime-DdMd9hEz.js";import{r as a}from"./iframe-CP9w8tG2.js";import{i as r}from"./index-r3mwEuN3.js";import{S as n}from"./scroll-group-selector.component-D6w-glYs.js";import"./preload-helper-CTOgD26E.js";import"./index-D2t4nnj1.js";import"./select-DP6MWW9c.js";import"./index-tvnb6adJ.js";import"./index-Df0-lD-y.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-C7iw6H11.js";import"./index-BHtFMn9j.js";import"./index-DmWLjvBA.js";import"./index-CI-w-sM5.js";import"./index-wyvJkCZf.js";import"./index-DhFSPgnG.js";import"./index-CPSYZMgP.js";import"./index-dC6bSqj8.js";import"./floating-ui.react-dom-BkKl4Thl.js";import"./index-aksreBNd.js";import"./index-gGKWoAED.js";import"./index-DoNwQboG.js";import"./index-OXvW7xgX.js";import"./index-DVSn98zC.js";import"./index-CAOtyErT.js";import"./index-mKrtSV5f.js";import"./index-Bb27ygNT.js";import"./index-X-ZBUBVA.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-W0mFaCR-.js";import"./createLucideIcon-BIs2lEw6.js";import"./check-D4bL0kiR.js";import"./chevron-up-rVox3HB7.js";import"./z-index-B4JyHfu5.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
