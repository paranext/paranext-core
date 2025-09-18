import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{C as s}from"./checkbox-Cz82JFhx.js";import{L as r}from"./label-dXSGOCoI.js";import{T as q}from"./theme-provider.component-Bum-YBGl.js";import{r as O}from"./iframe-BcYeWgcr.js";import"./index-DNc3TkLQ.js";import"./index-Dxmr7YCn.js";import"./index-B6gecgxP.js";import"./index-B1Guct03.js";import"./index-DuMdAayX.js";import"./index-b4TQRt8l.js";import"./index-D2kttkiv.js";import"./index-CHtcClp9.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";import"./index-BJ893FO-.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./check-nBAr59iS.js";import"./createLucideIcon-D1oFpSf_.js";import"./index-BPbCuWFR.js";const{fn:B}=__STORYBOOK_MODULE_TEST__,oe={title:"Shadcn/Checkbox",component:s,tags:["autodocs","test"],argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},className:{control:"text"},onCheckedChange:{action:"checked changed"}},decorators:[t=>e.jsx(q,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(t,{})})})]},d={render:t=>e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx(s,{...t,id:"default"}),e.jsx(r,{htmlFor:"default",children:"Default checkbox"})]}),parameters:{docs:{description:{story:"A basic checkbox with label."}}}},o={render:t=>e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx(s,{...t,id:"checked",checked:!0}),e.jsx(r,{htmlFor:"checked",children:"Checked checkbox"})]}),parameters:{docs:{description:{story:"A checkbox in the checked state."}}}},i={render:t=>e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx(s,{...t,id:"unchecked",checked:!1}),e.jsx(r,{htmlFor:"unchecked",children:"Unchecked checkbox"})]}),parameters:{docs:{description:{story:"A checkbox explicitly set to unchecked state."}}}},n={render:t=>e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx(s,{...t,id:"disabled",disabled:!0}),e.jsx(r,{htmlFor:"disabled",children:"Disabled checkbox"})]}),parameters:{docs:{description:{story:"A disabled checkbox that cannot be interacted with."}}}},l={render:t=>e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx(s,{...t,id:"disabled-checked",disabled:!0,checked:!0}),e.jsx(r,{htmlFor:"disabled-checked",children:"Disabled and checked"})]}),parameters:{docs:{description:{story:"A checkbox that is both disabled and checked."}}}},h={render:()=>{const[t,a]=O.useState([]),p=(c,x)=>{a(x?k=>[...k,c]:k=>k.filter(P=>P!==c))};return e.jsxs("div",{className:"tw-space-y-3",children:[e.jsx("p",{className:"tw-text-sm tw-font-medium",children:"Select your preferences:"}),e.jsx("div",{className:"tw-space-y-2",children:["Email notifications","SMS notifications","Push notifications","Marketing emails"].map(c=>e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx(s,{id:c,checked:t.includes(c),onCheckedChange:x=>p(c,!!x)}),e.jsx(r,{htmlFor:c,children:c})]},c))}),e.jsxs("p",{className:"tw-text-xs tw-text-muted-foreground",children:["Selected: ",t.join(", ")||"None"]})]})},parameters:{docs:{description:{story:"A group of related checkboxes with state management."}}}},m={render:t=>{const[a,p]=O.useState(!1);return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-space-x-2",children:[e.jsx(s,{...t,id:"interactive",checked:a,onCheckedChange:c=>{p(!!c),B()(c)}}),e.jsx(r,{htmlFor:"interactive",children:"Interactive checkbox"})]}),e.jsxs("p",{className:"tw-text-sm tw-text-muted-foreground",children:["Current state: ",a?"Checked":"Unchecked"]})]})},parameters:{docs:{description:{story:"An interactive checkbox where you can experiment with properties using the controls."}}}};var u,b,w;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-items-center tw-space-x-2">
      <Checkbox {...args} id="default" />
      <Label htmlFor="default">Default checkbox</Label>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'A basic checkbox with label.'
      }
    }
  }
}`,...(w=(b=d.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var f,C,v;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-items-center tw-space-x-2">
      <Checkbox {...args} id="checked" checked />
      <Label htmlFor="checked">Checked checkbox</Label>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'A checkbox in the checked state.'
      }
    }
  }
}`,...(v=(C=o.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var g,j,y;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-items-center tw-space-x-2">
      <Checkbox {...args} id="unchecked" checked={false} />
      <Label htmlFor="unchecked">Unchecked checkbox</Label>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'A checkbox explicitly set to unchecked state.'
      }
    }
  }
}`,...(y=(j=i.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var N,S,L;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-items-center tw-space-x-2">
      <Checkbox {...args} id="disabled" disabled />
      <Label htmlFor="disabled">Disabled checkbox</Label>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'A disabled checkbox that cannot be interacted with.'
      }
    }
  }
}`,...(L=(S=n.parameters)==null?void 0:S.docs)==null?void 0:L.source}}};var I,A,F;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <div className="tw-flex tw-items-center tw-space-x-2">
      <Checkbox {...args} id="disabled-checked" disabled checked />
      <Label htmlFor="disabled-checked">Disabled and checked</Label>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'A checkbox that is both disabled and checked.'
      }
    }
  }
}`,...(F=(A=l.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var D,E,_;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const handleCheck = (value: string, checked: boolean) => {
      if (checked) {
        setCheckedItems(prev => [...prev, value]);
      } else {
        setCheckedItems(prev => prev.filter(item => item !== value));
      }
    };
    return <div className="tw-space-y-3">
        <p className="tw-text-sm tw-font-medium">Select your preferences:</p>
        <div className="tw-space-y-2">
          {['Email notifications', 'SMS notifications', 'Push notifications', 'Marketing emails'].map(option => <div key={option} className="tw-flex tw-items-center tw-space-x-2">
              <Checkbox id={option} checked={checkedItems.includes(option)} onCheckedChange={checked => handleCheck(option, !!checked)} />
              <Label htmlFor={option}>{option}</Label>
            </div>)}
        </div>
        <p className="tw-text-xs tw-text-muted-foreground">
          Selected: {checkedItems.join(', ') || 'None'}
        </p>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A group of related checkboxes with state management.'
      }
    }
  }
}`,...(_=(E=h.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var T,U,M;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => {
    const [isChecked, setIsChecked] = useState(false);
    return <div className="tw-space-y-4">
        <div className="tw-flex tw-items-center tw-space-x-2">
          <Checkbox {...args} id="interactive" checked={isChecked} onCheckedChange={checked => {
          setIsChecked(!!checked);
          fn()(checked);
        }} />
          <Label htmlFor="interactive">Interactive checkbox</Label>
        </div>
        <p className="tw-text-sm tw-text-muted-foreground">
          Current state: {isChecked ? 'Checked' : 'Unchecked'}
        </p>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive checkbox where you can experiment with properties using the controls.'
      }
    }
  }
}`,...(M=(U=m.parameters)==null?void 0:U.docs)==null?void 0:M.source}}};const ie=["Default","Checked","Unchecked","Disabled","DisabledChecked","CheckboxGroup","Interactive"];export{h as CheckboxGroup,o as Checked,d as Default,n as Disabled,l as DisabledChecked,m as Interactive,i as Unchecked,ie as __namedExportsOrder,oe as default};
