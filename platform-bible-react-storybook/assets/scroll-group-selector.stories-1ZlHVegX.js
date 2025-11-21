import{j as d}from"./jsx-runtime-DI3ok604.js";import{r as a}from"./iframe-BOl--a1J.js";import{L as r}from"./index-DNL2LXP3.js";import{S as n}from"./scroll-group-selector.component-Dn-0c5Fz.js";import"./select-BBLF-Ozh.js";import"./index-T7uAoe4P.js";import"./index-BIDuZxbD.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-BSW8CihT.js";import"./index-ixZaLuBR.js";import"./index-Byksp-18.js";import"./index-BlKou4H0.js";import"./index-DDZ4ePWe.js";import"./index-CLF0jr_O.js";import"./index-BJV4N3IU.js";import"./index-kJKGxZuw.js";import"./floating-ui.react-dom-CeQIcolO.js";import"./index-DgmXzi2a.js";import"./index-B8vHxrJV.js";import"./index-sO4huELX.js";import"./index-Bf6kNpAy.js";import"./index-B0gZjwkm.js";import"./index-ezSiTyZh.js";import"./index-w7b-Bbnk.js";import"./index-DE0XZ1CZ.js";import"./index-5r3RwK9q.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-D-gFg3y9.js";import"./createLucideIcon-Bz86JCjo.js";import"./check-B-3Rx7hx.js";import"./chevron-up-2pxVAdeg.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},ee={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const re=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,re as __namedExportsOrder,ee as default};
