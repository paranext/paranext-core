import{j as d}from"./jsx-runtime-D3m1i-ms.js";import{r as a}from"./iframe-BQAA9X-A.js";import{J as r}from"./index-DcB2WZF4.js";import{S as n}from"./scroll-group-selector.component-DdMgLsGE.js";import"./index-D2w9gCAG.js";import"./select-4u3oJvvM.js";import"./index-uIrLTCpn.js";import"./index-nrI-NkjI.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-iiEV1ZrG.js";import"./index-CHYYGuvF.js";import"./index-B-z1RlLK.js";import"./index-BwzWb7sF.js";import"./index-Dgmwme7L.js";import"./index-D8CiOn_W.js";import"./index-xoz9iqFx.js";import"./index-Bbz2rHBD.js";import"./floating-ui.react-dom-C4bKR8qN.js";import"./index-BDvmuIBc.js";import"./index-Cue9yTlb.js";import"./index-JFl5_Ku9.js";import"./index-B6CU5OTs.js";import"./index-Cm-3EPay.js";import"./index-B-VotUuG.js";import"./index-B9Z33J2p.js";import"./index-h9yHLNK_.js";import"./index-6ut9nLQ9.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-nLxOvitj.js";import"./createLucideIcon-C0sivvZt.js";import"./check-CTO3jP2y.js";import"./chevron-up-C7Do1WtC.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},re={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
