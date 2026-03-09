import{j as d}from"./jsx-runtime-BRef6aae.js";import{r as a}from"./iframe-DI0EToka.js";import{r}from"./index-DRKOdupj.js";import{S as n}from"./scroll-group-selector.component-ClGUZ5QT.js";import"./preload-helper-CTOgD26E.js";import"./index-RSIxtB2F.js";import"./select-BEv6mdv8.js";import"./index-9MXL6ce4.js";import"./index-aFckgS32.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-CKH8Xq9O.js";import"./index-fXR6UVik.js";import"./index-CTvleGPC.js";import"./index-Bo6zZ-Rd.js";import"./index-BAwL9F_G.js";import"./index-CpxzdFd7.js";import"./index-C2-uGJuD.js";import"./index-Bsmdr1uQ.js";import"./floating-ui.react-dom-BZO4jIo8.js";import"./index-B_OAwotI.js";import"./index-B8QsxOeG.js";import"./index-CMo4blfa.js";import"./index-Cu-_t0tS.js";import"./index-J2GweO4K.js";import"./index-BmNriXZT.js";import"./index-CaroXQs_.js";import"./index-Bvd5OoZG.js";import"./index-Bqdg3FlO.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-Dd50h1FR.js";import"./createLucideIcon-Bougl-EM.js";import"./check-FhKF6p-x.js";import"./chevron-up-BjztktMF.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(C=(h=c.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const te=["Default","WithCustomSize","WithCustomClass"];export{s as Default,c as WithCustomClass,l as WithCustomSize,te as __namedExportsOrder,oe as default};
