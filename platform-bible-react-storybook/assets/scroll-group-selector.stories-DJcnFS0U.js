import{j as d}from"./jsx-runtime-DRKHlJ6V.js";import{r as a}from"./iframe-DxdH4jIZ.js";import{V as r}from"./index-B_P4TyHR.js";import{S as c}from"./scroll-group-selector.component-YYsbcJnx.js";import"./select-CUi_TAME.js";import"./index-BIdLixut.js";import"./index-DdP5udy6.js";import"./index-BaQP4hhM.js";import"./index-DCAzu6Ww.js";import"./index-DO5YC37J.js";import"./index-B11MxgCh.js";import"./index-zvl_yK8a.js";import"./index-Droeof3M.js";import"./index-PICE0ECy.js";import"./index-fkR7GPkk.js";import"./index-DJA-wVP_.js";import"./index-C-tFZVVL.js";import"./index-COh3iSK0.js";import"./index-CfXjEDRv.js";import"./floating-ui.react-dom-W6GQVKDK.js";import"./index-B1DmAY9T.js";import"./Combination-BuVkyAor.js";import"./index-eRoA6GmP.js";import"./index-DOarxP9y.js";import"./index-BxUYv1Uz.js";import"./index-CSjIP0SF.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-B3lbl7x4.js";import"./createLucideIcon-B4Ux1r0D.js";import"./check-3cqyI6Op.js";const p=[void 0,0,1,2,3,4],u={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},Z={title:"Advanced/ScrollGroupSelector",component:c,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:u}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:u}},n={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:u}};var i,m,S;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(I=(g=l.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var f,h,C;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} className="tw-bg-yellow-100" size="sm" />;
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 1,
    localizedStrings
  }
}`,...(C=(h=n.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const $=["Default","WithCustomSize","WithCustomClass"];export{s as Default,n as WithCustomClass,l as WithCustomSize,$ as __namedExportsOrder,Z as default};
