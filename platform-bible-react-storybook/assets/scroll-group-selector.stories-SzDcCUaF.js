import{r as a,j as u}from"./iframe-BJj4vYM5.js";import"./index-COLMZfVs.js";import{S as s}from"./scroll-group-selector.component-Bx-d6hIm.js";import{u as t}from"./scripture-util-BiADhCws-RVM_j59p.js";import"./preload-helper-CTOgD26E.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./index-wk9rVj3k.js";import"./select-CtDF5QME.js";import"./utils-BPbySc-g.js";import"./z-index-CoNkaVR8.js";import"./createReactComponent-Bkst7n0U.js";import"./IconCheck-CyfufCaz.js";import"./index-BaQP4hhM.js";import"./index-DSp77eLg.js";import"./index-Z11XxB5M.js";import"./index-DLC_Fmp-.js";import"./index-BwWy7MfK.js";import"./index-Bca0-zEs.js";import"./index-CwIx_sgb.js";import"./index-Pw_SZSjy.js";import"./index-BN9t2jrJ.js";import"./index-0imI2SLe.js";import"./index-DEhuzrH9.js";import"./index-BrNZgJul.js";import"./index-DjtYsKke.js";import"./index-C8FuPrBZ.js";import"./index-CYYM-ygH.js";const p=[void 0,0,1,2,3,4],i={[t("undefined")]:"None",[t(0)]:"A",[t(1)]:"B",[t(2)]:"C",[t(3)]:"D",[t(4)]:"E"},$={title:"Advanced/ScrollGroupSelector",component:s,tags:["autodocs"]},l={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},c={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,disabled:!0})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}},n={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,size:"default"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},d={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,className:"tw:bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var m,S,G;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: undefined,
    localizedStrings
  }
}`,...(G=(S=l.parameters)==null?void 0:S.docs)==null?void 0:G.source}}};var I,g,f;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} disabled />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 1,
    localizedStrings
  }
}`,...(f=(g=c.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,C,b;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} size="default" />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 2,
    localizedStrings
  }
}`,...(b=(C=n.parameters)==null?void 0:C.docs)==null?void 0:b.source}}};var z,x,v;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} className="tw:bg-yellow-100" size="sm" />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 1,
    localizedStrings
  }
}`,...(v=(x=d.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const ee=["Default","Disabled","WithCustomSize","WithCustomClass"];export{l as Default,c as Disabled,d as WithCustomClass,n as WithCustomSize,ee as __namedExportsOrder,$ as default};
