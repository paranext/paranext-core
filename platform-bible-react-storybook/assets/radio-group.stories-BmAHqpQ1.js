import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{L as t}from"./label-DboBKY13.js";import{R as r,a as o}from"./radio-group-DQUaKhOG.js";import{r as I}from"./iframe-ChjBVkNN.js";import{T as C}from"./theme-provider.component-DRoiPDtx.js";import"./index-DF789n87.js";import"./index-BfzcDxxY.js";import"./index-BWcRxFB8.js";import"./index-B3HFQzOn.js";import"./index-CtW3L1xI.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-ikrtYkS6.js";import"./index-DRtzzKqe.js";import"./index-uX5GIGLq.js";import"./index-BeaXc5ys.js";import"./index-DBlYwqkt.js";import"./index-BjqnVq7v.js";import"./index-Dbj3Uwir.js";import"./index-CKeV44jl.js";import"./index-CJGEWkUs.js";import"./index-DI1pkOJa.js";import"./index-a8-6909D.js";import"./circle-CPJPDZbi.js";import"./createLucideIcon-CVIRtPIF.js";const{fn:T}=__STORYBOOK_MODULE_TEST__,re={title:"Shadcn/RadioGroup",component:r,tags:["autodocs"],decorators:[a=>e.jsx(C,{children:e.jsx(a,{})})],argTypes:{defaultValue:{control:"text"},value:{control:"text"},disabled:{control:"boolean"},onValueChange:{action:"value changed"}}},i={args:{defaultValue:"comfortable",onValueChange:T()},render:a=>e.jsxs(r,{...a,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"default",id:"r1"}),e.jsx(t,{htmlFor:"r1",children:"Default"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"comfortable",id:"r2"}),e.jsx(t,{htmlFor:"r2",children:"Comfortable"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"compact",id:"r3"}),e.jsx(t,{htmlFor:"r3",children:"Compact"})]})]}),parameters:{docs:{description:{story:"A basic radio group with multiple options, matching the original example."}}}},s={render:()=>e.jsxs(r,{defaultValue:"option-one",className:"tw-flex tw-gap-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-one",id:"option-one"}),e.jsx(t,{htmlFor:"option-one",children:"Option One"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-two",id:"option-two"}),e.jsx(t,{htmlFor:"option-two",children:"Option Two"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-three",id:"option-three"}),e.jsx(t,{htmlFor:"option-three",children:"Option Three"})]})]}),parameters:{docs:{description:{story:"A horizontal radio group layout."}}}},l={render:()=>e.jsxs(r,{defaultValue:"option-one",disabled:!0,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-one",id:"disabled-one"}),e.jsx(t,{htmlFor:"disabled-one",children:"Option One"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-two",id:"disabled-two"}),e.jsx(t,{htmlFor:"disabled-two",children:"Option Two"})]})]}),parameters:{docs:{description:{story:"A disabled radio group that cannot be interacted with."}}}},n={render:()=>e.jsxs(r,{children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-one",id:"no-default-one"}),e.jsx(t,{htmlFor:"no-default-one",children:"Option One"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-two",id:"no-default-two"}),e.jsx(t,{htmlFor:"no-default-two",children:"Option Two"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-three",id:"no-default-three"}),e.jsx(t,{htmlFor:"no-default-three",children:"Option Three"})]})]}),parameters:{docs:{description:{story:"A radio group with no default selection."}}}},d={render:()=>{const[a,V]=I.useState("option-two");return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs(r,{value:a,onValueChange:V,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-one",id:"controlled-one"}),e.jsx(t,{htmlFor:"controlled-one",children:"Option One"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-two",id:"controlled-two"}),e.jsx(t,{htmlFor:"controlled-two",children:"Option Two"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-three",id:"controlled-three"}),e.jsx(t,{htmlFor:"controlled-three",children:"Option Three"})]})]}),e.jsxs("div",{className:"tw-text-sm tw-text-muted-foreground",children:["Selected: ",e.jsx("code",{children:a})]})]})},parameters:{docs:{description:{story:"A controlled radio group with state management."}}}},c={render:a=>e.jsxs(r,{...a,children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-1",id:"interactive-1"}),e.jsx(t,{htmlFor:"interactive-1",children:"Option 1"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-2",id:"interactive-2"}),e.jsx(t,{htmlFor:"interactive-2",children:"Option 2"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-x-2",children:[e.jsx(o,{value:"option-3",id:"interactive-3"}),e.jsx(t,{htmlFor:"interactive-3",children:"Option 3"})]})]}),args:{defaultValue:"option-1",disabled:!1,onValueChange:T()},parameters:{docs:{description:{story:"An interactive radio group where you can experiment with properties using the controls."}}}};var p,m,u;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    defaultValue: 'comfortable',
    onValueChange: fn()
  },
  render: args => <RadioGroup {...args}>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>,
  parameters: {
    docs: {
      description: {
        story: 'A basic radio group with multiple options, matching the original example.'
      }
    }
  }
}`,...(u=(m=i.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var w,x,h;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="option-one" className="tw-flex tw-gap-4">
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>,
  parameters: {
    docs: {
      description: {
        story: 'A horizontal radio group layout.'
      }
    }
  }
}`,...(h=(x=s.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var v,f,g;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <RadioGroup defaultValue="option-one" disabled>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-one" id="disabled-one" />
        <Label htmlFor="disabled-one">Option One</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-two" id="disabled-two" />
        <Label htmlFor="disabled-two">Option Two</Label>
      </div>
    </RadioGroup>,
  parameters: {
    docs: {
      description: {
        story: 'A disabled radio group that cannot be interacted with.'
      }
    }
  }
}`,...(g=(f=l.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var j,b,N;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <RadioGroup>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-one" id="no-default-one" />
        <Label htmlFor="no-default-one">Option One</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-two" id="no-default-two" />
        <Label htmlFor="no-default-two">Option Two</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-three" id="no-default-three" />
        <Label htmlFor="no-default-three">Option Three</Label>
      </div>
    </RadioGroup>,
  parameters: {
    docs: {
      description: {
        story: 'A radio group with no default selection.'
      }
    }
  }
}`,...(N=(b=n.parameters)==null?void 0:b.docs)==null?void 0:N.source}}};var O,L,R;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('option-two');
    return <div className="tw-space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="tw-flex tw-items-center tw-gap-x-2">
            <RadioGroupItem value="option-one" id="controlled-one" />
            <Label htmlFor="controlled-one">Option One</Label>
          </div>
          <div className="tw-flex tw-items-center tw-gap-x-2">
            <RadioGroupItem value="option-two" id="controlled-two" />
            <Label htmlFor="controlled-two">Option Two</Label>
          </div>
          <div className="tw-flex tw-items-center tw-gap-x-2">
            <RadioGroupItem value="option-three" id="controlled-three" />
            <Label htmlFor="controlled-three">Option Three</Label>
          </div>
        </RadioGroup>
        <div className="tw-text-sm tw-text-muted-foreground">
          Selected: <code>{value}</code>
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A controlled radio group with state management.'
      }
    }
  }
}`,...(R=(L=d.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};var F,G,y;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: args => <RadioGroup {...args}>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-1" id="interactive-1" />
        <Label htmlFor="interactive-1">Option 1</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-2" id="interactive-2" />
        <Label htmlFor="interactive-2">Option 2</Label>
      </div>
      <div className="tw-flex tw-items-center tw-gap-x-2">
        <RadioGroupItem value="option-3" id="interactive-3" />
        <Label htmlFor="interactive-3">Option 3</Label>
      </div>
    </RadioGroup>,
  args: {
    defaultValue: 'option-1',
    disabled: false,
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive radio group where you can experiment with properties using the controls.'
      }
    }
  }
}`,...(y=(G=c.parameters)==null?void 0:G.docs)==null?void 0:y.source}}};const ie=["Default","Horizontal","Disabled","WithoutDefaultValue","Controlled","Interactive"];export{d as Controlled,i as Default,l as Disabled,s as Horizontal,c as Interactive,n as WithoutDefaultValue,ie as __namedExportsOrder,re as default};
