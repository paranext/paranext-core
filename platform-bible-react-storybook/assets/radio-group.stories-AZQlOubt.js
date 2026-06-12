import{r as T,j as e}from"./iframe-BHDykt4K.js";import{L as t}from"./label-CZI-64Kj.js";import{R as a,a as o}from"./radio-group-DNRyZepD.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./index-BNM6CXf_.js";import"./index-CnubEOSe.js";import"./index-Bw97KXOm.js";import"./index-Coj_m_-6.js";import"./index-B0BN33ZW.js";import"./index-BTTLdFAK.js";import"./index-CFe4-R8A.js";import"./index-DHV28Huw.js";import"./index-BDelcpdf.js";import"./index-DUcS0uAH.js";import"./index-BIg6tOu9.js";import"./index-Z7KjoINE.js";const{fn:V}=__STORYBOOK_MODULE_TEST__,P={title:"Shadcn/RadioGroup",component:a,tags:["autodocs"],argTypes:{defaultValue:{control:"text"},value:{control:"text"},disabled:{control:"boolean"},onValueChange:{action:"value changed"}}},i={args:{defaultValue:"comfortable",onValueChange:V()},render:r=>e.jsxs(a,{...r,children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"default",id:"r1"}),e.jsx(t,{htmlFor:"r1",children:"Default"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"comfortable",id:"r2"}),e.jsx(t,{htmlFor:"r2",children:"Comfortable"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"compact",id:"r3"}),e.jsx(t,{htmlFor:"r3",children:"Compact"})]})]}),parameters:{docs:{description:{story:"A basic radio group with multiple options, matching the original example."}}}},s={render:()=>e.jsxs(a,{defaultValue:"option-one",className:"tw:flex tw:gap-4",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-one",id:"option-one"}),e.jsx(t,{htmlFor:"option-one",children:"Option One"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-two",id:"option-two"}),e.jsx(t,{htmlFor:"option-two",children:"Option Two"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-three",id:"option-three"}),e.jsx(t,{htmlFor:"option-three",children:"Option Three"})]})]}),parameters:{docs:{description:{story:"A horizontal radio group layout."}}}},l={render:()=>e.jsxs(a,{defaultValue:"option-one",disabled:!0,children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-one",id:"disabled-one"}),e.jsx(t,{htmlFor:"disabled-one",children:"Option One"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-two",id:"disabled-two"}),e.jsx(t,{htmlFor:"disabled-two",children:"Option Two"})]})]}),parameters:{docs:{description:{story:"A disabled radio group that cannot be interacted with."}}}},n={render:()=>e.jsxs(a,{children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-one",id:"no-default-one"}),e.jsx(t,{htmlFor:"no-default-one",children:"Option One"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-two",id:"no-default-two"}),e.jsx(t,{htmlFor:"no-default-two",children:"Option Two"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-three",id:"no-default-three"}),e.jsx(t,{htmlFor:"no-default-three",children:"Option Three"})]})]}),parameters:{docs:{description:{story:"A radio group with no default selection."}}}},d={render:()=>{const[r,I]=T.useState("option-two");return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs(a,{value:r,onValueChange:I,children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-one",id:"controlled-one"}),e.jsx(t,{htmlFor:"controlled-one",children:"Option One"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-two",id:"controlled-two"}),e.jsx(t,{htmlFor:"controlled-two",children:"Option Two"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-three",id:"controlled-three"}),e.jsx(t,{htmlFor:"controlled-three",children:"Option Three"})]})]}),e.jsxs("div",{className:"tw:text-sm tw:text-muted-foreground",children:["Selected: ",e.jsx("code",{children:r})]})]})},parameters:{docs:{description:{story:"A controlled radio group with state management."}}}},c={render:r=>e.jsxs(a,{...r,children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-1",id:"interactive-1"}),e.jsx(t,{htmlFor:"interactive-1",children:"Option 1"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-2",id:"interactive-2"}),e.jsx(t,{htmlFor:"interactive-2",children:"Option 2"})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-x-2",children:[e.jsx(o,{value:"option-3",id:"interactive-3"}),e.jsx(t,{htmlFor:"interactive-3",children:"Option 3"})]})]}),args:{defaultValue:"option-1",disabled:!1,onValueChange:V()},parameters:{docs:{description:{story:"An interactive radio group where you can experiment with properties using the controls."}}}};var p,m,u;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    defaultValue: 'comfortable',
    onValueChange: fn()
  },
  render: args => <RadioGroup {...args}>
      <div className="tw:flex tw:items-center tw:gap-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="tw:flex tw:items-center tw:gap-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="tw:flex tw:items-center tw:gap-x-2">
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
  render: () => <RadioGroup defaultValue="option-one" className="tw:flex tw:gap-4">
      <div className="tw:flex tw:items-center tw:gap-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="tw:flex tw:items-center tw:gap-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="tw:flex tw:items-center tw:gap-x-2">
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
      <div className="tw:flex tw:items-center tw:gap-x-2">
        <RadioGroupItem value="option-one" id="disabled-one" />
        <Label htmlFor="disabled-one">Option One</Label>
      </div>
      <div className="tw:flex tw:items-center tw:gap-x-2">
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
}`,...(g=(f=l.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var b,j,N;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <RadioGroup>
      <div className="tw:flex tw:items-center tw:gap-x-2">
        <RadioGroupItem value="option-one" id="no-default-one" />
        <Label htmlFor="no-default-one">Option One</Label>
      </div>
      <div className="tw:flex tw:items-center tw:gap-x-2">
        <RadioGroupItem value="option-two" id="no-default-two" />
        <Label htmlFor="no-default-two">Option Two</Label>
      </div>
      <div className="tw:flex tw:items-center tw:gap-x-2">
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
}`,...(N=(j=n.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var O,L,R;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('option-two');
    return <div className="tw:space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="tw:flex tw:items-center tw:gap-x-2">
            <RadioGroupItem value="option-one" id="controlled-one" />
            <Label htmlFor="controlled-one">Option One</Label>
          </div>
          <div className="tw:flex tw:items-center tw:gap-x-2">
            <RadioGroupItem value="option-two" id="controlled-two" />
            <Label htmlFor="controlled-two">Option Two</Label>
          </div>
          <div className="tw:flex tw:items-center tw:gap-x-2">
            <RadioGroupItem value="option-three" id="controlled-three" />
            <Label htmlFor="controlled-three">Option Three</Label>
          </div>
        </RadioGroup>
        <div className="tw:text-sm tw:text-muted-foreground">
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
      <div className="tw:flex tw:items-center tw:gap-x-2">
        <RadioGroupItem value="option-1" id="interactive-1" />
        <Label htmlFor="interactive-1">Option 1</Label>
      </div>
      <div className="tw:flex tw:items-center tw:gap-x-2">
        <RadioGroupItem value="option-2" id="interactive-2" />
        <Label htmlFor="interactive-2">Option 2</Label>
      </div>
      <div className="tw:flex tw:items-center tw:gap-x-2">
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
}`,...(y=(G=c.parameters)==null?void 0:G.docs)==null?void 0:y.source}}};const Q=["Default","Horizontal","Disabled","WithoutDefaultValue","Controlled","Interactive"];export{d as Controlled,i as Default,l as Disabled,s as Horizontal,c as Interactive,n as WithoutDefaultValue,Q as __namedExportsOrder,P as default};
