import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{T as o,a as t}from"./toggle-group-C_H0U3Wr.js";import{r as $}from"./iframe-BcYeWgcr.js";import{T as F}from"./theme-provider.component-Bum-YBGl.js";import{c as l}from"./createLucideIcon-D1oFpSf_.js";import"./index-Dxmr7YCn.js";import"./index-CHtcClp9.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";import"./index-BJ893FO-.js";import"./index-DNc3TkLQ.js";import"./index-DBWqXr8V.js";import"./index-B6gecgxP.js";import"./index-B1Guct03.js";import"./index-PhEMGCGr.js";import"./index-BTW_afRk.js";import"./index-BdtTgfff.js";import"./index-DZhSYnG_.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M17 12H7",key:"16if0g"}],["path",{d:"M19 18H5",key:"18s9l3"}],["path",{d:"M21 6H3",key:"1jwq7v"}]],K=l("AlignCenter",W);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M17 18H3",key:"1amg6g"}],["path",{d:"M21 6H3",key:"1jwq7v"}]],Y=l("AlignLeft",P);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M21 18H7",key:"1ygte8"}],["path",{d:"M21 6H3",key:"1jwq7v"}]],Q=l("AlignRight",J);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",key:"mg9rjx"}]],Z=l("Bold",X);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["line",{x1:"19",x2:"10",y1:"4",y2:"4",key:"15jd3p"}],["line",{x1:"14",x2:"5",y1:"20",y2:"20",key:"bu0au3"}],["line",{x1:"15",x2:"9",y1:"4",y2:"20",key:"uljnxc"}]],te=l("Italic",ee);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=[["path",{d:"M6 4v6a6 6 0 0 0 12 0V4",key:"9kb039"}],["line",{x1:"4",x2:"20",y1:"20",y2:"20",key:"nun2al"}]],oe=l("Underline",re),{fn:d}=__STORYBOOK_MODULE_TEST__,fe={title:"Shadcn/ToggleGroup",component:o,tags:["autodocs"],decorators:[r=>e.jsx(F,{children:e.jsx(r,{})})],argTypes:{type:{control:"select",options:["single","multiple"]},variant:{control:"select",options:["default","outline"]},size:{control:"select",options:["default","sm","lg"]},disabled:{control:"boolean"},onValueChange:{action:"value changed"}}},a={args:{type:"single",onValueChange:d()},render:r=>e.jsxs(o,{...r,children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]}),parameters:{docs:{description:{story:"A basic toggle group with single selection."}}}},s={args:{type:"multiple",onValueChange:d()},render:r=>e.jsxs(o,{...r,children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]}),parameters:{docs:{description:{story:"A toggle group that allows multiple selections."}}}},i={args:{variant:"outline",type:"multiple",onValueChange:d()},render:r=>e.jsxs(o,{...r,children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]}),parameters:{docs:{description:{story:"A toggle group with outline variant, similar to the original example."}}}},n={render:()=>{const[r,h]=$.useState([]);return e.jsxs(o,{type:"multiple",value:r,onValueChange:h,children:[e.jsx(t,{value:"bold","aria-label":"Bold",children:e.jsx(Z,{className:"tw-h-4 tw-w-4"})}),e.jsx(t,{value:"italic","aria-label":"Italic",children:e.jsx(te,{className:"tw-h-4 tw-w-4"})}),e.jsx(t,{value:"underline","aria-label":"Underline",children:e.jsx(oe,{className:"tw-h-4 tw-w-4"})})]})},parameters:{docs:{description:{story:"A toggle group with icons for text formatting options."}}}},g={render:()=>{const[r,h]=$.useState("left");return e.jsxs(o,{type:"single",value:r,onValueChange:v=>v&&h(v),children:[e.jsx(t,{value:"left","aria-label":"Align left",children:e.jsx(Y,{className:"tw-h-4 tw-w-4"})}),e.jsx(t,{value:"center","aria-label":"Align center",children:e.jsx(K,{className:"tw-h-4 tw-w-4"})}),e.jsx(t,{value:"right","aria-label":"Align right",children:e.jsx(Q,{className:"tw-h-4 tw-w-4"})})]})},parameters:{docs:{description:{story:"A single-selection toggle group for text alignment."}}}},u={render:()=>e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Small"}),e.jsxs(o,{type:"single",size:"sm",children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Default"}),e.jsxs(o,{type:"single",size:"default",children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Large"}),e.jsxs(o,{type:"single",size:"lg",children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]})]})]}),parameters:{docs:{description:{story:"Toggle groups in different sizes."}}}},c={render:()=>e.jsxs(o,{type:"single",disabled:!0,children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]}),parameters:{docs:{description:{story:"A disabled toggle group that cannot be interacted with."}}}},p={render:()=>e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Default Variant - Multiple"}),e.jsxs(o,{type:"multiple",children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"tw-mb-2 tw-text-sm tw-font-medium",children:"Outline Variant - Single"}),e.jsxs(o,{variant:"outline",type:"single",children:[e.jsx(t,{value:"a",children:"A"}),e.jsx(t,{value:"b",children:"B"}),e.jsx(t,{value:"c",children:"C"})]})]})]}),parameters:{docs:{description:{story:"Different toggle group variants and selection types, matching the original example."}}}},m={render:r=>e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs(o,{...r,children:[e.jsx(t,{value:"option1",children:"Option 1"}),e.jsx(t,{value:"option2",children:"Option 2"}),e.jsx(t,{value:"option3",children:"Option 3"})]}),e.jsx("div",{className:"tw-text-sm tw-text-muted-foreground",children:"Use the controls to experiment with different properties."})]}),args:{type:"single",variant:"default",size:"default",disabled:!1,onValueChange:d()},parameters:{docs:{description:{story:"An interactive toggle group where you can experiment with properties using the controls."}}}};var x,T,G;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(G=(T=a.parameters)==null?void 0:T.docs)==null?void 0:G.source}}};var w,y,I;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(I=(y=s.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var j,f,b;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(b=(f=i.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var A,C,N;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const [formatting, setFormatting] = useState<string[]>([]);
    return <ToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="tw-h-4 tw-w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="tw-h-4 tw-w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="tw-h-4 tw-w-4" />
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
}`,...(N=(C=n.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var B,S,V;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const [alignment, setAlignment] = useState('left');
    return <ToggleGroup type="single" value={alignment} onValueChange={value => value && setAlignment(value)}>
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="tw-h-4 tw-w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="tw-h-4 tw-w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="tw-h-4 tw-w-4" />
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
}`,...(V=(S=g.parameters)==null?void 0:S.docs)==null?void 0:V.source}}};var _,k,M;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="tw-space-y-4">
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Small</h4>
        <ToggleGroup type="single" size="sm">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Default</h4>
        <ToggleGroup type="single" size="default">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Large</h4>
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
}`,...(M=(k=u.parameters)==null?void 0:k.docs)==null?void 0:M.source}}};var O,z,D;c.parameters={...c.parameters,docs:{...(O=c.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(D=(z=c.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var H,U,L;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="tw-space-y-4">
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Default Variant - Multiple</h4>
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
          <ToggleGroupItem value="b">B</ToggleGroupItem>
          <ToggleGroupItem value="c">C</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <h4 className="tw-mb-2 tw-text-sm tw-font-medium">Outline Variant - Single</h4>
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
}`,...(L=(U=p.parameters)==null?void 0:U.docs)==null?void 0:L.source}}};var E,q,R;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <div className="tw-space-y-4">
      <ToggleGroup {...args}>
        <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
      </ToggleGroup>
      <div className="tw-text-sm tw-text-muted-foreground">
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
}`,...(R=(q=m.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};const be=["Default","Multiple","Outline","WithIcons","Alignment","Sizes","Disabled","Variants","Interactive"];export{g as Alignment,a as Default,c as Disabled,m as Interactive,s as Multiple,i as Outline,u as Sizes,p as Variants,n as WithIcons,be as __namedExportsOrder,fe as default};
