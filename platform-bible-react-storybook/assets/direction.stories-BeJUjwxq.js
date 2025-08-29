import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{T as v}from"./theme-provider.component-DRoiPDtx.js";import{r as a}from"./iframe-ChjBVkNN.js";import{B as r}from"./button-BOi5X0CC.js";import{I as d}from"./input-FiVrRUt5.js";import{c as b}from"./createLucideIcon-CVIRtPIF.js";import"./index-B3HFQzOn.js";import"./index-CtW3L1xI.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],l=b("History",N);function y({direction:t,onChangeDirection:i}){const D=()=>{i(t==="ltr"?"rtl":"ltr")};return e.jsxs(r,{variant:"outline",onClick:D,children:[t==="ltr"?"Switch to RTL":"Switch to LTR"," (Current: ",t.toUpperCase(),")"]})}y.__docgenInfo={description:"",methods:[],displayName:"DirToggle",props:{direction:{required:!0,tsType:{name:"union",raw:"'ltr' | 'rtl'",elements:[{name:"literal",value:"'ltr'"},{name:"literal",value:"'rtl'"}]},description:""},onChangeDirection:{required:!0,tsType:{name:"signature",type:"function",raw:"(direction: 'ltr' | 'rtl') => void",signature:{arguments:[{type:{name:"union",raw:"'ltr' | 'rtl'",elements:[{name:"literal",value:"'ltr'"},{name:"literal",value:"'rtl'"}]},name:"direction"}],return:{name:"void"}}},description:""}}};function c({direction:t,onChangeDirection:i}){return e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["Direction is passed to the tabs using ",e.jsx("code",{children:"dir='ltr'"})," or"," ",e.jsx("code",{children:"dir='rtl'"})]}),e.jsx("p",{children:"You can easily try out your component / layout using the direction toggle in the upper right corner."}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:["Try it: change direction",e.jsx(y,{direction:t,onChangeDirection:i})]}),e.jsx("br",{}),e.jsxs("p",{children:["One of the things to keep in mind is to use logical margin/padding definitions instead of 'left' or 'right'. See"," ",e.jsx("a",{href:"https://tailwindcss.com/docs/margin#using-logical-properties",className:"tw-text-blue-600 hover:tw-underline",target:"_blank",rel:"noreferrer",children:"https://tailwindcss.com/docs/margin#using-logical-properties"})]}),e.jsx("table",{children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{className:"tw-text-destructive",children:["Bad example: ",e.jsx("code",{children:"tw-ml-2"}),", ",e.jsx("code",{children:"tw-mr-2"})]}),e.jsx("td",{className:"tw-text-destructive",children:e.jsxs("div",{className:"tw-flex",children:[e.jsx(r,{className:"tw-mr-2",children:"1"}),e.jsx(r,{className:"tw-mr-2",children:"2"}),e.jsx(r,{children:"3"})]})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:["Good example: ",e.jsx("code",{children:"tw-ms-2"}),", ",e.jsx("code",{children:"tw-me-2"})]}),e.jsx("td",{children:e.jsxs("div",{className:"tw-flex",children:[e.jsx(r,{className:"tw-me-2",children:"1"}),e.jsx(r,{className:"tw-me-2",children:"2"}),e.jsx(r,{children:"3"})]})})]}),e.jsxs("tr",{children:[e.jsxs("td",{className:"tw-text-destructive",children:["Bad example: ",e.jsx("code",{children:"tw-space-x-2"})]}),e.jsx("td",{children:e.jsxs("div",{className:"tw-flex tw-space-x-2",children:[e.jsx(r,{children:"1"}),e.jsx(r,{children:"2"}),e.jsx(r,{children:"3"})]})})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:["Good example: ",e.jsx("code",{children:"tw-gap-2"})]}),e.jsx("td",{children:e.jsxs("div",{className:"tw-flex tw-gap-2",children:[e.jsx(r,{children:"1"}),e.jsx(r,{children:"2"}),e.jsx(r,{children:"3"})]})})]})]})}),e.jsx("h2",{className:"tw-py-2 tw-font-bold",children:"Other properties"}),e.jsxs("p",{className:"tw-text-destructive",children:["Bad: ",e.jsx("code",{children:"tw-text-right"})]}),e.jsxs("p",{children:["Good: ",e.jsx("code",{children:"tw-text-end"})]}),e.jsx("h2",{className:"tw-py-2 tw-font-bold",children:"Another bad example"}),e.jsx("p",{children:"In left-to-right the icon should appear at the left"}),e.jsx("div",{className:"tw-flex",children:e.jsxs("div",{className:"tw-relative",children:[e.jsx(d,{value:"",placeholder:"placeholder text should clip before the icon",className:"tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-border-black tw-bg-white tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-text-slate-900 tw-shadow-none tw-outline-none","aria-label":"Bad example input with placeholder clipping"}),e.jsx(l,{className:"tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-gray-500"})]})}),e.jsx("div",{className:"tw-flex",children:e.jsxs("div",{className:"tw-relative",children:[e.jsx(d,{value:"text should clip before the icon",className:"tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-border-black tw-bg-white tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-text-slate-900 tw-shadow-none tw-outline-none","aria-label":"Bad example input with text clipping"}),e.jsx(l,{className:"tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-gray-500"})]})})]})}const I={title:"Guides/Direction",component:c,tags:["autodocs"],decorators:[t=>e.jsx(v,{children:e.jsx("div",{className:"tw-max-w-4xl tw-p-6",children:e.jsx(t,{})})})]},n={render:()=>{const[t,i]=a.useState("ltr");return e.jsx(c,{direction:t,onChangeDirection:i})},parameters:{docs:{description:{story:"A comprehensive guide on handling text direction (LTR/RTL) in components, including best practices for logical properties, spacing, and layout."}}}},s={render:()=>{const[t,i]=a.useState("ltr");return e.jsx(c,{direction:t,onChangeDirection:i})},parameters:{docs:{description:{story:"Direction guide demonstrating left-to-right text direction."}}}},o={render:()=>{const[t,i]=a.useState("rtl");return e.jsx(c,{direction:t,onChangeDirection:i})},parameters:{docs:{description:{story:"Direction guide demonstrating right-to-left text direction."}}}};var h,p,m;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => {
    const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
    return <DirectionGuide direction={direction} onChangeDirection={setDirection} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive guide on handling text direction (LTR/RTL) in components, including best practices for logical properties, spacing, and layout.'
      }
    }
  }
}`,...(m=(p=n.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var x,u,w;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => {
    const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
    return <DirectionGuide direction={direction} onChangeDirection={setDirection} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Direction guide demonstrating left-to-right text direction.'
      }
    }
  }
}`,...(w=(u=s.parameters)==null?void 0:u.docs)==null?void 0:w.source}}};var g,j,f;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl');
    return <DirectionGuide direction={direction} onChangeDirection={setDirection} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Direction guide demonstrating right-to-left text direction.'
      }
    }
  }
}`,...(f=(j=o.parameters)==null?void 0:j.docs)==null?void 0:f.source}}};const E=["Default","LeftToRight","RightToLeft"];export{n as Default,s as LeftToRight,o as RightToLeft,E as __namedExportsOrder,I as default};
