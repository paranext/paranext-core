import{r as a,j as p}from"./iframe-DuxKbckC.js";import"./index-LecOm0xh.js";import{S as s}from"./scroll-group-selector.component-D9P0TK-M.js";import{l as t}from"./scripture-util-DArajUVn-ikfTG6PH.js";import"./preload-helper-CTOgD26E.js";import"./index-C77E7Q-s.js";import"./index-D8rZSbDD.js";import"./index-DCo3rgjq.js";import"./index.es-CXoS8DB2.js";import"./select-VAwr5pac.js";import"./utils-BPbySc-g.js";import"./z-index-DiGYIwoM.js";import"./IconSelector-DOf6mFjG.js";import"./createReactComponent-BAl-V4_h.js";import"./IconCheck-C-86OG8C.js";import"./index-BaQP4hhM.js";import"./index-c47v3fds.js";import"./index-iEAUuBPm.js";import"./index-DwkdXeo3.js";import"./index-BPD3UMDg.js";import"./index-CSzOknmz.js";import"./index-D5AZUgsQ.js";import"./index-FRCpHUh9.js";import"./index-Df4N0asc.js";import"./index-DWAxH3-j.js";import"./index-CGs8umbt.js";import"./index-DWDhRWqe.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-DE5Ay83P.js";import"./index-BawMC8Ms.js";import"./index-Das8-by3.js";import"./grapheme-CMWZWa5_.js";const u=[void 0,0,1,2,3,4],i={[t("undefined")]:"None",[t(0)]:"A",[t(1)]:"B",[t(2)]:"C",[t(3)]:"D",[t(4)]:"E"},te={title:"Advanced/ScrollGroupSelector",component:s,tags:["autodocs"]},l={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return p.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o})},args:{availableScrollGroupIds:u,scrollGroupId:void 0,localizedStrings:i}},c={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return p.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,disabled:!0})},args:{availableScrollGroupIds:u,scrollGroupId:1,localizedStrings:i}},n={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return p.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,size:"default"})},args:{availableScrollGroupIds:u,scrollGroupId:2,localizedStrings:i}},d={render:e=>{const[r,o]=a.useState(e.scrollGroupId);return p.jsx(s,{...e,scrollGroupId:r,onChangeScrollGroupId:o,className:"tw:bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:u,scrollGroupId:1,localizedStrings:i}};var m,S,G;l.parameters={...l.parameters,docs:{...(m=l.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(v=(x=d.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const se=["Default","Disabled","WithCustomSize","WithCustomClass"];export{l as Default,c as Disabled,d as WithCustomClass,n as WithCustomSize,se as __namedExportsOrder,te as default};
