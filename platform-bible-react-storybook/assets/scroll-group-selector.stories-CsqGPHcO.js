import{r as a,j as u}from"./iframe-BiQ-8ZUv.js";import{l as t}from"./index-w_rW2Gsf.js";import{S as s}from"./scroll-group-selector.component-Dl4vnkHe.js";import"./preload-helper-CTOgD26E.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./select-BDGA6D5p.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./IconSelector-6XyoYY26.js";import"./createReactComponent-DXEn8V9j.js";import"./IconCheck-DCfnd2Qk.js";import"./index-BaQP4hhM.js";import"./index-ClIRQ_UN.js";import"./index-D9xvYgjc.js";import"./index-DTsexlOC.js";import"./index-0O3i7-KU.js";import"./index-DvMb-Qrc.js";import"./index-USR-tug5.js";import"./index-BKOECZNa.js";import"./index-Az1ZV0Bf.js";import"./index-BIUeshty.js";import"./index-Jqmk2zv4.js";import"./index-BF6qL_5y.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Dho0DaxD.js";import"./index-DiGnyKGp.js";import"./index-BY--gffo.js";const p=[void 0,0,1,2,3,4],i={[t("undefined")]:"None",[t(0)]:"A",[t(1)]:"B",[t(2)]:"C",[t(3)]:"D",[t(4)]:"E"},ee={title:"Advanced/ScrollGroupSelector",component:s,tags:["autodocs"]},l={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},c={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,disabled:!0})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}},n={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,size:"default"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},d={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return u.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,className:"tw:bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var m,S,G;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(v=(x=d.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const re=["Default","Disabled","WithCustomSize","WithCustomClass"];export{l as Default,c as Disabled,d as WithCustomClass,n as WithCustomSize,re as __namedExportsOrder,ee as default};
