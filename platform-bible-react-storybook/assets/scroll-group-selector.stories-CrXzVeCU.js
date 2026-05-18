import{j as d}from"./jsx-runtime-BqcUmbcY.js";import{r as a}from"./iframe-CTFeqsaU.js";import{i as r}from"./index-YcHQf9ns.js";import{S as n}from"./scroll-group-selector.component-C1g82riY.js";import"./preload-helper-CTOgD26E.js";import"./index.es-LuWhpyxP.js";import"./index-D2t4nnj1.js";import"./select-CfVNyKQ6.js";import"./utils-BPbySc-g.js";import"./createReactComponent-CR06EuV8.js";import"./IconCheck-D0oGOz8f.js";import"./index-DyG1FY6L.js";import"./index-DasKyulm.js";import"./index-BaQP4hhM.js";import"./index-CrprARdV.js";import"./index-h6nU96Nj.js";import"./index-CZ7swpmc.js";import"./index-BIiwzcA3.js";import"./index-Bz_elcL5.js";import"./index-B_gWPIE3.js";import"./index-NDEKFPcd.js";import"./index-DEEuL5ue.js";import"./index-C5GGbPN7.js";import"./index-DxJHqNyO.js";import"./index-Bz1D5jMs.js";import"./index-Dp4Xx3Xx.js";import"./index-CmRhPbSC.js";import"./index-X2wtV6fy.js";import"./z-index-BATlIu8s.js";const p=[void 0,0,1,2,3,4],u={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},X={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:u}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"default"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:u}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw:bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:u}};var i,m,S;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const Y=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,Y as __namedExportsOrder,X as default};
