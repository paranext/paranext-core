import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{B as t}from"./badge-CK0yIiXb.js";import{T as F}from"./theme-provider.component-DRoiPDtx.js";import{S as M}from"./star-DDemYP74.js";import{C as E,I as R}from"./info-DiiNIvEY.js";import{c as L}from"./createLucideIcon-CVIRtPIF.js";import{X as O}from"./x-DEJKqPBv.js";import"./iframe-ChjBVkNN.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],m=L("CircleCheckBig",P),{fn:s}=__STORYBOOK_MODULE_TEST__,J={title:"Shadcn/Badge",component:t,tags:["autodocs","test"],argTypes:{variant:{options:["default","destructive","outline","secondary","muted"],control:{type:"select"}},className:{control:"text"}},decorators:[a=>e.jsx(F,{children:e.jsx("div",{className:"tw-p-4",children:e.jsx(a,{})})})]},r={render:a=>e.jsx(t,{...a,children:"Default Badge"}),args:{variant:"default"},parameters:{docs:{description:{story:"A basic badge with the default variant."}}}},i={render:()=>e.jsxs("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:[e.jsx(t,{variant:"default",children:"Default"}),e.jsx(t,{variant:"destructive",children:"Destructive"}),e.jsx(t,{variant:"outline",children:"Outline"}),e.jsx(t,{variant:"secondary",children:"Secondary"}),e.jsx(t,{variant:"muted",children:"Muted"})]}),parameters:{docs:{description:{story:"All available badge variants displayed together."}}}},c={render:()=>e.jsxs("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:[e.jsxs(t,{variant:"default",children:[e.jsx(M,{className:"tw-me-1 tw-h-3 tw-w-3"}),"Featured"]}),e.jsxs(t,{variant:"destructive",children:[e.jsx(E,{className:"tw-me-1 tw-h-3 tw-w-3"}),"Error"]}),e.jsxs(t,{variant:"secondary",children:[e.jsx(m,{className:"tw-me-1 tw-h-3 tw-w-3"}),"Completed"]}),e.jsxs(t,{variant:"outline",children:[e.jsx(R,{className:"tw-me-1 tw-h-3 tw-w-3"}),"Info"]})]}),parameters:{docs:{description:{story:"Badges can include icons to provide additional context."}}}},n={render:()=>e.jsxs("div",{className:"tw-flex tw-flex-wrap tw-gap-2",children:[e.jsx(t,{className:"tw-cursor-pointer hover:tw-opacity-80",onClick:s(),variant:"default",children:"Clickable Badge"}),e.jsxs(t,{className:"tw-cursor-pointer hover:tw-opacity-80",onClick:s(),variant:"destructive",children:["Remove ",e.jsx(O,{className:"tw-ms-1 tw-h-3 tw-w-3"})]}),e.jsxs(t,{className:"tw-cursor-pointer hover:tw-opacity-80",onClick:s(),variant:"outline",children:["Select ",e.jsx(m,{className:"tw-ms-1 tw-h-3 tw-w-3"})]})]}),parameters:{docs:{description:{story:"Badges can be made clickable for interactive functionality."}}}},d={render:()=>e.jsxs(t,{className:"tw-cursor-pointer hover:tw-opacity-80",onClick:s(),variant:"destructive",children:["Dismissible ",e.jsx(O,{className:"tw-ms-1 tw-h-3 tw-w-3"})]}),parameters:{docs:{description:{story:"A badge with a close icon that can be dismissed."}}}},o={render:()=>e.jsxs("div",{className:"tw-space-y-2",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("span",{className:"tw-text-sm",children:"Status:"}),e.jsxs(t,{variant:"secondary",children:[e.jsx(m,{className:"tw-me-1 tw-h-3 tw-w-3"}),"Active"]})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("span",{className:"tw-text-sm",children:"Priority:"}),e.jsxs(t,{variant:"destructive",children:[e.jsx(E,{className:"tw-me-1 tw-h-3 tw-w-3"}),"High"]})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("span",{className:"tw-text-sm",children:"Type:"}),e.jsx(t,{variant:"outline",children:"Feature"})]})]}),parameters:{docs:{description:{story:"Badges used to display status information in a structured layout."}}}},l={render:a=>e.jsx(t,{...a,children:"Interactive Badge"}),args:{variant:"default",className:"tw-cursor-pointer hover:tw-opacity-80",onClick:s()},parameters:{docs:{description:{story:"An interactive badge where you can experiment with different properties using the controls."}}}};var w,p,u;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <Badge {...args}>Default Badge</Badge>,
  args: {
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic badge with the default variant.'
      }
    }
  }
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var v,g,h;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <div className="tw-flex tw-flex-wrap tw-gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="muted">Muted</Badge>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants displayed together.'
      }
    }
  }
}`,...(h=(g=i.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var f,x,y;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="tw-flex tw-flex-wrap tw-gap-2">
      <Badge variant="default">
        <Star className="tw-me-1 tw-h-3 tw-w-3" />
        Featured
      </Badge>
      <Badge variant="destructive">
        <AlertCircle className="tw-me-1 tw-h-3 tw-w-3" />
        Error
      </Badge>
      <Badge variant="secondary">
        <CheckCircle className="tw-me-1 tw-h-3 tw-w-3" />
        Completed
      </Badge>
      <Badge variant="outline">
        <Info className="tw-me-1 tw-h-3 tw-w-3" />
        Info
      </Badge>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Badges can include icons to provide additional context.'
      }
    }
  }
}`,...(y=(x=c.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var B,N,j;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="tw-flex tw-flex-wrap tw-gap-2">
      <Badge className="tw-cursor-pointer hover:tw-opacity-80" onClick={fn()} variant="default">
        Clickable Badge
      </Badge>
      <Badge className="tw-cursor-pointer hover:tw-opacity-80" onClick={fn()} variant="destructive">
        Remove <X className="tw-ms-1 tw-h-3 tw-w-3" />
      </Badge>
      <Badge className="tw-cursor-pointer hover:tw-opacity-80" onClick={fn()} variant="outline">
        Select <CheckCircle className="tw-ms-1 tw-h-3 tw-w-3" />
      </Badge>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Badges can be made clickable for interactive functionality.'
      }
    }
  }
}`,...(j=(N=n.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var C,b,S;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <Badge className="tw-cursor-pointer hover:tw-opacity-80" onClick={fn()} variant="destructive">
      Dismissible <X className="tw-ms-1 tw-h-3 tw-w-3" />
    </Badge>,
  parameters: {
    docs: {
      description: {
        story: 'A badge with a close icon that can be dismissed.'
      }
    }
  }
}`,...(S=(b=d.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var k,A,D;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="tw-space-y-2">
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">Status:</span>
        <Badge variant="secondary">
          <CheckCircle className="tw-me-1 tw-h-3 tw-w-3" />
          Active
        </Badge>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">Priority:</span>
        <Badge variant="destructive">
          <AlertCircle className="tw-me-1 tw-h-3 tw-w-3" />
          High
        </Badge>
      </div>
      <div className="tw-flex tw-items-center tw-gap-2">
        <span className="tw-text-sm">Type:</span>
        <Badge variant="outline">Feature</Badge>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Badges used to display status information in a structured layout.'
      }
    }
  }
}`,...(D=(A=o.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var I,_,T;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <Badge {...args}>Interactive Badge</Badge>,
  args: {
    variant: 'default',
    className: 'tw-cursor-pointer hover:tw-opacity-80',
    onClick: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive badge where you can experiment with different properties using the controls.'
      }
    }
  }
}`,...(T=(_=l.parameters)==null?void 0:_.docs)==null?void 0:T.source}}};const Q=["Default","Variants","WithIcons","Clickable","DismissibleBadge","StatusBadges","Interactive"];export{n as Clickable,r as Default,d as DismissibleBadge,l as Interactive,o as StatusBadges,i as Variants,c as WithIcons,Q as __namedExportsOrder,J as default};
