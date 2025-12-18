import{j as d}from"./jsx-runtime-CUJ_rQeC.js";import{r as a}from"./iframe-DPJsQfKY.js";import{J as r}from"./index-CmLeGMp1.js";import{S as n}from"./scroll-group-selector.component-CDPlRZBW.js";import"./index-D2w9gCAG.js";import"./select-Bc3vdQYN.js";import"./index-CIG2twzk.js";import"./index-BNaa3HNL.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-BzKBjjSj.js";import"./index-MJPeNUNy.js";import"./index-BJUHFugS.js";import"./index-CnHGOAz0.js";import"./index-C-OU0ZDl.js";import"./index-BAHwUFgZ.js";import"./index-DKGUmmeh.js";import"./index-DL6eIH-u.js";import"./floating-ui.react-dom-C7CqkCuO.js";import"./index-DZ01GqMM.js";import"./index-DI4xE9PQ.js";import"./index-Sy5ZJy-B.js";import"./index-1tsE3_kd.js";import"./index-CInelhk1.js";import"./index-CQ6x72Nw.js";import"./index-LS5Lsfre.js";import"./index-B0S4m58u.js";import"./index-Cn-wNSD6.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-C85hM_cq.js";import"./createLucideIcon-DWABfnX_.js";import"./check-DTEk4_AB.js";import"./chevron-up-Cg5DBFBr.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
