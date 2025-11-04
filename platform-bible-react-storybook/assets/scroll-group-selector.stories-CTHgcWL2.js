import{j as d}from"./jsx-runtime-c2I2IkSv.js";import{r as a}from"./iframe-DkDOfCps.js";import{V as r}from"./index-DnRshUFb.js";import{S as c}from"./scroll-group-selector.component-DZmyXHI_.js";import"./select-DK15JFbq.js";import"./index-CPVXkvLf.js";import"./index-D5sjBHTD.js";import"./index-BaQP4hhM.js";import"./index-BSfYp4XF.js";import"./index-hhtH9E1S.js";import"./index-Qp8BYYBk.js";import"./index-BBXd1Q8R.js";import"./index-DNS2qw1R.js";import"./index-ChC8egr2.js";import"./index-DLp0jzGA.js";import"./index-I2FaYkY4.js";import"./index-Dn0U-npv.js";import"./index-DUo_W1Cr.js";import"./index-Bu5Y-f_O.js";import"./floating-ui.react-dom-BCmEO2DB.js";import"./index-ANMwTTqs.js";import"./Combination-Dp60GHt-.js";import"./index-DhxcraqK.js";import"./index-D_PzJGZ5.js";import"./index-CnJ8rVDv.js";import"./index-Yo6J-D9M.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-C8kWrHZz.js";import"./createLucideIcon-B02Eqsu7.js";import"./check-C3ADZMWu.js";const p=[void 0,0,1,2,3,4],u={[r("undefined")]:"None",[r(0)]:"A",[r(1)]:"B",[r(2)]:"C",[r(3)]:"D",[r(4)]:"E"},Z={title:"Advanced/ScrollGroupSelector",component:c,tags:["autodocs"]},s={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t})},args:{availableScrollGroupIds:p,scrollGroupId:void 0,localizedStrings:u}},l={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,size:"lg"})},args:{availableScrollGroupIds:p,scrollGroupId:2,localizedStrings:u}},n={render:e=>{const[o,t]=a.useState(e.scrollGroupId);return d.jsx(c,{...e,scrollGroupId:o,onChangeScrollGroupId:t,className:"tw-bg-yellow-100",size:"sm"})},args:{availableScrollGroupIds:p,scrollGroupId:1,localizedStrings:u}};var i,m,S;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
