import{r as d,j as a}from"./iframe-3upuMYDe.js";import"./index-D7R6UePp.js";import{S as n}from"./scroll-group-selector.component-ztH7d9bx.js";import{l as r}from"./scripture-util-CIEEBU92-DFh2FVNP.js";import"./preload-helper-CTOgD26E.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./select-BX5Y4CSw.js";import"./utils-BPbySc-g.js";import"./createReactComponent-BwRcSAdc.js";import"./IconCheck-BSZ6BVRU.js";import"./index-BaQP4hhM.js";import"./index-C01WKUY3.js";import"./index-CD8DL8yX.js";import"./index-yMwbae-M.js";import"./index-CbbhdMER.js";import"./index-C87i_6ma.js";import"./index-Dyg-ztyD.js";import"./index-DdLomApK.js";import"./index-B-RabBf6.js";import"./index-CwncnQW-.js";import"./index-y69nKmlt.js";import"./index-DqsBzqmC.js";import"./index-BVJ0OByS.js";import"./index-q7uc3amB.js";import"./index-Dqkddwt_.js";import"./z-index-CoNkaVR8.js";const p=[void 0,0,1,2,3,4],u={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},U={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=d.useState(e.scrollGroupId);return a.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:u}},l={render:e=>{const[o,t]=d.useState(e.scrollGroupId);return a.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"default"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:u}},c={render:e=>{const[o,t]=d.useState(e.scrollGroupId);return a.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw:bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:u}};var i,m,S;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} size="default" />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 2,
    localizedStrings
  }
}`,...(I=(g=l.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var f,h,C;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} className="tw:bg-yellow-100" size="sm" />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 1,
    localizedStrings
  }
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const V=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,V as __namedExportsOrder,U as default};
