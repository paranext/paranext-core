import{r as a,j as u}from"./iframe-Bqm5z7L0.js";import"./index-nJDboCOi.js";import{S as s}from"./scroll-group-selector.component-PxHkMDDC.js";import{l as t}from"./scripture-util-DArajUVn-CPHPTCtZ.js";import"./preload-helper-CTOgD26E.js";import"./index-C77E7Q-s.js";import"./index-DCo3rgjq.js";import"./index.es-CXoS8DB2.js";import"./select-BBeOmKky.js";import"./utils-BPbySc-g.js";import"./z-index-bJLdNcga.js";import"./IconSelector-DI2auJTl.js";import"./createReactComponent-DTEnSFK8.js";import"./IconCheck-B5ItRCNX.js";import"./index-BaQP4hhM.js";import"./index-DjaLRnmL.js";import"./index-CX45vPLn.js";import"./index-DCKkMXgA.js";import"./index-D7oUSAYQ.js";import"./index-B3H9itNg.js";import"./index-BP9mnoAk.js";import"./index-WTkdg-qM.js";import"./index-CoozVKvl.js";import"./index-_VT5pEqm.js";import"./index-C0JqmoLu.js";import"./index-loFK_xX_.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-BmEa6Gvb.js";import"./index-DcB15Bud.js";import"./index-BED7_968.js";const p=[void 0,0,1,2,3,4],i={[t("undefined")]:"None",[t(0)]:"A",[t(1)]:"B",[t(2)]:"C",[t(3)]:"D",[t(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:s,tags:["autodocs"]},l={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},c={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,disabled:!0})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}},n={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,size:"default"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},d={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,className:"tw:bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var m,S,G;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(v=(x=d.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const oe=["Default","Disabled","WithCustomSize","WithCustomClass"];export{l as Default,c as Disabled,d as WithCustomClass,n as WithCustomSize,oe as __namedExportsOrder,re as default};
