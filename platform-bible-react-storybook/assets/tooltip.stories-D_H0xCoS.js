import{j as t}from"./jsx-runtime-CoJcBlqr.js";import{B as r}from"./button-BOi5X0CC.js";import{T as o,a as D,b as i,c as s}from"./tooltip-B7Hf0Jt_.js";import{T as k}from"./theme-provider.component-DRoiPDtx.js";import"./iframe-ChjBVkNN.js";import"./index-B3HFQzOn.js";import"./index-CtW3L1xI.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-uX5GIGLq.js";import"./index-VUEIl7Yq.js";import"./index-DF789n87.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-Dbj3Uwir.js";import"./index-CDUyRbSN.js";import"./floating-ui.react-dom-Dob2_vp1.js";import"./index-CJGEWkUs.js";import"./index-BjqnVq7v.js";import"./index-a8-6909D.js";import"./index-CTXI5JpQ.js";const{fn:S}=__STORYBOOK_MODULE_TEST__,Z={title:"Shadcn/Tooltip",component:o,tags:["autodocs","test"],argTypes:{delayDuration:{control:"number"},disableHoverableContent:{control:"boolean"}},decorators:[e=>t.jsx(k,{children:t.jsx(D,{children:t.jsx("div",{className:"tw-flex tw-justify-center tw-p-8",children:t.jsx(e,{})})})})]},n={render:e=>t.jsxs(o,{...e,children:[t.jsx(i,{asChild:!0,children:t.jsx(r,{variant:"outline",children:"Hover me"})}),t.jsx(s,{children:t.jsx("p",{children:"This is a tooltip"})})]}),parameters:{docs:{description:{story:"A basic tooltip that appears when hovering over the trigger element."}}}},a={render:e=>t.jsxs(o,{...e,children:[t.jsx(i,{asChild:!0,children:t.jsx(r,{variant:"default",children:"Rich Content"})}),t.jsx(s,{children:t.jsxs("div",{className:"tw-space-y-1",children:[t.jsx("p",{className:"tw-font-semibold",children:"Custom Tooltip"}),t.jsx("p",{className:"tw-text-sm",children:"You can put any content here"})]})})]}),parameters:{docs:{description:{story:"Tooltips can contain rich content including multiple elements and custom styling."}}}},l={render:e=>t.jsxs("div",{className:"tw-flex tw-gap-4",children:[t.jsxs(o,{...e,children:[t.jsx(i,{asChild:!0,children:t.jsx(r,{variant:"outline",children:"Outline Button"})}),t.jsx(s,{children:t.jsx("p",{children:"Tooltip on outline button"})})]}),t.jsxs(o,{...e,children:[t.jsx(i,{asChild:!0,children:t.jsx(r,{variant:"destructive",children:"Destructive Button"})}),t.jsx(s,{children:t.jsx("p",{children:"Tooltip on destructive button"})})]}),t.jsxs(o,{...e,children:[t.jsx(i,{asChild:!0,children:t.jsx(r,{variant:"ghost",children:"Ghost Button"})}),t.jsx(s,{children:t.jsx("p",{children:"Tooltip on ghost button"})})]})]}),parameters:{docs:{description:{story:"Tooltips can be applied to different button variants and other trigger elements."}}}},p={render:e=>t.jsxs(o,{...e,delayDuration:1e3,children:[t.jsx(i,{asChild:!0,children:t.jsx(r,{variant:"secondary",children:"Delayed Tooltip"})}),t.jsx(s,{children:t.jsx("p",{children:"This tooltip appears after 1 second"})})]}),parameters:{docs:{description:{story:"You can customize the delay before the tooltip appears using the delayDuration prop."}}}},c={render:e=>t.jsxs(o,{...e,children:[t.jsx(i,{asChild:!0,children:t.jsx(r,{variant:"outline",onClick:S(),children:"Click & Hover"})}),t.jsx(s,{children:t.jsx("p",{children:"This button is both clickable and has a tooltip"})})]}),args:{delayDuration:300},parameters:{docs:{description:{story:"Tooltips work seamlessly with interactive elements like clickable buttons."}}}};var d,u,h;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>,
  parameters: {
    docs: {
      description: {
        story: 'A basic tooltip that appears when hovering over the trigger element.'
      }
    }
  }
}`,...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var m,T,g;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: args => <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="default">Rich Content</Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="tw-space-y-1">
          <p className="tw-font-semibold">Custom Tooltip</p>
          <p className="tw-text-sm">You can put any content here</p>
        </div>
      </TooltipContent>
    </Tooltip>,
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can contain rich content including multiple elements and custom styling.'
      }
    }
  }
}`,...(g=(T=a.parameters)==null?void 0:T.docs)==null?void 0:g.source}}};var x,j,C;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-gap-4">
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Outline Button</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip on outline button</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="destructive">Destructive Button</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip on destructive button</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="ghost">Ghost Button</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip on ghost button</p>
        </TooltipContent>
      </Tooltip>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be applied to different button variants and other trigger elements.'
      }
    }
  }
}`,...(C=(j=l.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};var v,y,f;p.parameters={...p.parameters,docs:{...(v=p.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <Tooltip {...args} delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button variant="secondary">Delayed Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip appears after 1 second</p>
      </TooltipContent>
    </Tooltip>,
  parameters: {
    docs: {
      description: {
        story: 'You can customize the delay before the tooltip appears using the delayDuration prop.'
      }
    }
  }
}`,...(f=(y=p.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var b,B,w;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={fn()}>
          Click &amp; Hover
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This button is both clickable and has a tooltip</p>
      </TooltipContent>
    </Tooltip>,
  args: {
    delayDuration: 300
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips work seamlessly with interactive elements like clickable buttons.'
      }
    }
  }
}`,...(w=(B=c.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};const $=["Default","WithCustomContent","WithDifferentTriggers","DelayedTooltip","Interactive"];export{n as Default,p as DelayedTooltip,c as Interactive,a as WithCustomContent,l as WithDifferentTriggers,$ as __namedExportsOrder,Z as default};
