import{j as d}from"./jsx-runtime-lfJbY3Ff.js";import{r as a}from"./iframe-BSjDeQvp.js";import{r}from"./index-Dnd4bzmK.js";import{S as n}from"./scroll-group-selector.component-DLwIRV0C.js";import"./preload-helper-CTOgD26E.js";import"./index-Bl2C2VvJ.js";import"./select-Csc8xnWK.js";import"./index-DQ946iyH.js";import"./index-D_yuvfSC.js";import"./index-BaQP4hhM.js";import"./index-DTAXz6r9.js";import"./index-DsfkW_53.js";import"./index-Bvd9v7I2.js";import"./index-DSd-bTyr.js";import"./index-DX_3tcd3.js";import"./index-DuCdzD0A.js";import"./index-C5rNcZR1.js";import"./index-BI0NSC3p.js";import"./index-IKjCPNK3.js";import"./floating-ui.react-dom-DZjtuyqp.js";import"./index-BVjJOdzj.js";import"./index-CHOEKfR9.js";import"./index-hrBTQ129.js";import"./index-BunICisR.js";import"./index-Qb7KlOKX.js";import"./index-CDxK-C-d.js";import"./index-DxX5rHjg.js";import"./index-C1wtv3MW.js";import"./index-VPmFoo9h.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-CKFmw9ue.js";import"./createLucideIcon-BQefE0Bo.js";import"./check-DgXqcl5q.js";import"./chevron-up-BBxt9nvn.js";const p=[void 0,0,1,2,3,4],i={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},oe={title:"Advanced/ScrollGroupSelector",component:n,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:i}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:i}},c={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(n,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:i}};var u,m,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
