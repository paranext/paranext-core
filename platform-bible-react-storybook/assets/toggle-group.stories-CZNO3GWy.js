import{r as R,j as e}from"./iframe-C8C5euZN.js";import{T as r,a as t}from"./toggle-group-MLau8NMh.js";import{c as m}from"./createLucideIcon-DxgUyrtO.js";import{B as $,I as W}from"./italic-DWjraKd0.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./index-BnuTq2W6.js";import"./index-CK1WfXwt.js";import"./index-6CD405rD.js";import"./index-B_rL6yMC.js";import"./index-BZircw_q.js";import"./index-DGyFEErG.js";import"./index-BdwSmz8P.js";import"./index-DkJoHjzT.js";import"./index-B3g6T2Mi.js";import"./index-Cm-brStG.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M21 5H3",key:"1fi0y6"}],["path",{d:"M17 12H7",key:"16if0g"}],["path",{d:"M19 19H5",key:"vjpgq2"}]],Y=m("text-align-center",K);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M21 5H3",key:"1fi0y6"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M21 19H7",key:"4cu937"}]],P=m("text-align-end",J);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M21 5H3",key:"1fi0y6"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M17 19H3",key:"z6ezky"}]],X=m("text-align-start",Q);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=[["path",{d:"M6 4v6a6 6 0 0 0 12 0V4",key:"9kb039"}],["line",{x1:"4",x2:"20",y1:"20",y2:"20",key:"nun2al"}]],ee=m("underline",Z),{fn:d}=__STORYBOOK_MODULE_TEST__,Te={title:"Shadcn/ToggleGroup",component:r,tags:["autodocs"],argTypes:{type:{control:"select",options:["single","multiple"]},variant:{control:"select",options:["default","outline"]},size:{control:"select",options:["default","sm","lg"]},disabled:{control:"boolean"},onValueChange:{action:"value changed"}}},l={args:{type:"single",onValueChange:d()},render:o=>e.jsxs(r,{...o,children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]}),parameters:{docs:{description:{story:"A basic toggle group with single selection."}}}},a={args:{type:"multiple",onValueChange:d()},render:o=>e.jsxs(r,{...o,children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]}),parameters:{docs:{description:{story:"A toggle group that allows multiple selections."}}}},s={args:{variant:"outline",type:"multiple",onValueChange:d()},render:o=>e.jsxs(r,{...o,children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]}),parameters:{docs:{description:{story:"A toggle group with outline variant, similar to the original example."}}}},i={render:()=>{const[o,h]=R.useState([]);return e.jsxs(r,{type:"multiple",value:o,onValueChange:h,children:[e.jsx(t,{value:"bold","aria-label":"Bold",children:e.jsx($,{className:"tw:h-4 tw:w-4"})}),e.jsx(t,{value:"italic","aria-label":"Italic",children:e.jsx(W,{className:"tw:h-4 tw:w-4"})}),e.jsx(t,{value:"underline","aria-label":"Underline",children:e.jsx(ee,{className:"tw:h-4 tw:w-4"})})]})},parameters:{docs:{description:{story:"A toggle group with icons for text formatting options."}}}},n={render:()=>{const[o,h]=R.useState("left");return e.jsxs(r,{type:"single",value:o,onValueChange:v=>v&&h(v),children:[e.jsx(t,{value:"left","aria-label":"Align left",children:e.jsx(X,{className:"tw:h-4 tw:w-4"})}),e.jsx(t,{value:"center","aria-label":"Align center",children:e.jsx(Y,{className:"tw:h-4 tw:w-4"})}),e.jsx(t,{value:"right","aria-label":"Align right",children:e.jsx(P,{className:"tw:h-4 tw:w-4"})})]})},parameters:{docs:{description:{story:"A single-selection toggle group for text alignment."}}}},g={render:()=>e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"tw:mb-2 tw:text-sm tw:font-medium",children:"Small"}),e.jsxs(r,{type:"single",size:"sm",children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"tw:mb-2 tw:text-sm tw:font-medium",children:"Default"}),e.jsxs(r,{type:"single",size:"default",children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"tw:mb-2 tw:text-sm tw:font-medium",children:"Large"}),e.jsxs(r,{type:"single",size:"lg",children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]})]})]}),parameters:{docs:{description:{story:"Toggle groups in different sizes."}}}},u={render:()=>e.jsxs(r,{type:"single",disabled:!0,children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]}),parameters:{docs:{description:{story:"A disabled toggle group that cannot be interacted with."}}}},p={render:()=>e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"tw:mb-2 tw:text-sm tw:font-medium",children:"Default Variant - Multiple"}),e.jsxs(r,{type:"multiple",children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"tw:mb-2 tw:text-sm tw:font-medium",children:"Outline Variant - Single"}),e.jsxs(r,{variant:"outline",type:"single",children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]})]})]}),parameters:{docs:{description:{story:"Different toggle group variants and selection types, matching the original example."}}}},c={render:o=>e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs(r,{...o,children:[e.jsx(t,{value:"option1",children:"Option 1"}),e.jsx(t,{value:"option2",children:"Option 2"}),e.jsx(t,{value:"option3",children:"Option 3"})]}),e.jsx("div",{className:"tw:text-sm tw:text-muted-foreground",children:"Use the controls to experiment with different properties."})]}),args:{type:"single",variant:"default",size:"default",disabled:!1,onValueChange:d()},parameters:{docs:{description:{story:"An interactive toggle group where you can experiment with properties using the controls."}}}};var T,x,G;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    type: 'single',
    onValueChange: fn()
  },
  render: args => <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>,
  parameters: {
    docs: {
      description: {
        story: 'A basic toggle group with single selection.'
      }
    }
  }
}`,...(G=(x=l.parameters)==null?void 0:x.docs)==null?void 0:G.source}}};var w,I,f;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    type: 'multiple',
    onValueChange: fn()
  },
  render: args => <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>,
  parameters: {
    docs: {
      description: {
        story: 'A toggle group that allows multiple selections.'
      }
    }
  }
}`,...(f=(I=a.parameters)==null?void 0:I.docs)==null?void 0:f.source}}};var y,j,b;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    type: 'multiple',
    onValueChange: fn()
  },
  render: args => <ToggleGroup {...args}>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>,
  parameters: {
    docs: {
      description: {
        story: 'A toggle group with outline variant, similar to the original example.'
      }
    }
  }
}`,...(b=(j=s.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var A,C,N;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const [formatting, setFormatting] = useState<string[]>([]);
    return <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="tw:h-4 tw:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="tw:h-4 tw:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="tw:h-4 tw:w-4" />
        </ToggleGroupItem>
      </ToggleGroup>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A toggle group with icons for text formatting options.'
      }
    }
  }
}`,...(N=(C=i.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var S,B,V;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => {
    const [alignment, setAlignment] = useState('left');
    return <ToggleGroup type="single" value={alignment} onValueChange={value => value && setAlignment(value)}>
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="tw:h-4 tw:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="tw:h-4 tw:w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="tw:h-4 tw:w-4" />
        </ToggleGroupItem>
      </ToggleGroup>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A single-selection toggle group for text alignment.'
      }
    }
  }
}`,...(V=(B=n.parameters)==null?void 0:B.docs)==null?void 0:V.source}}};var _,z,M;g.parameters={...g.parameters,docs:{...(_=g.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="tw:space-y-4">
      <div>
        <h4 className="tw:mb-2 tw:text-sm tw:font-medium">Small</h4>
        <ToggleGroup type="single" size="sm">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <h4 className="tw:mb-2 tw:text-sm tw:font-medium">Default</h4>
        <ToggleGroup type="single" size="default">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <h4 className="tw:mb-2 tw:text-sm tw:font-medium">Large</h4>
        <ToggleGroup type="single" size="lg">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Toggle groups in different sizes.'
      }
    }
  }
}`,...(M=(z=g.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};var O,k,D;u.parameters={...u.parameters,docs:{...(O=u.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <ToggleGroup type="single" disabled>
      <ToggleGroupItem value="a">A</ToggleGroupItem>
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="c">C</ToggleGroupItem>
    </ToggleGroup>,
  parameters: {
    docs: {
      description: {
        story: 'A disabled toggle group that cannot be interacted with.'
      }
    }
  }
}`,...(D=(k=u.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var H,E,U;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="tw:space-y-4">
      <div>
        <h4 className="tw:mb-2 tw:text-sm tw:font-medium">Default Variant - Multiple</h4>
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <h4 className="tw:mb-2 tw:text-sm tw:font-medium">Outline Variant - Single</h4>
        <ToggleGroup variant="outline" type="single">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Different toggle group variants and selection types, matching the original example.'
      }
    }
  }
}`,...(U=(E=p.parameters)==null?void 0:E.docs)==null?void 0:U.source}}};var L,q,F;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <div className="tw:space-y-4">
      <ToggleGroup {...args}>
        <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
      </ToggleGroup>
      <div className="tw:text-sm tw:text-muted-foreground">
        Use the controls to experiment with different properties.
      </div>
    </div>,
  args: {
    type: 'single',
    variant: 'default',
    size: 'default',
    disabled: false,
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive toggle group where you can experiment with properties using the controls.'
      }
    }
  }
}`,...(F=(q=c.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};const xe=["Default","Multiple","Outline","WithIcons","Alignment","Sizes","Disabled","Variants","Interactive"];export{n as Alignment,l as Default,u as Disabled,c as Interactive,a as Multiple,s as Outline,g as Sizes,p as Variants,i as WithIcons,xe as __namedExportsOrder,Te as default};
