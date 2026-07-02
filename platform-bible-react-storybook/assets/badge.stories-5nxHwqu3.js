import{j as e}from"./iframe-Dw0rVdo7.js";import{B as a}from"./badge-CRNfBaMu.js";import{X as m}from"./x-4Z3fWTxZ.js";import{c as F}from"./createLucideIcon-CuO2Cm-m.js";import{C as T}from"./circle-alert-i6Iw-48i.js";import{S as p}from"./star-BSt6v_vY.js";import{I as u}from"./info-W0omS7C4.js";import{L as G}from"./link-BVO5VjEh.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-BYchALu_.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],w=F("circle-check-big",R),{fn:s}=__STORYBOOK_MODULE_TEST__,Z={title:"Shadcn/Badge",component:a,tags:["autodocs","test"],argTypes:{variant:{options:["default","destructive","outline","secondary","muted","ghost","link","blueIndicator","mutedIndicator"],control:{type:"select"}},className:{control:"text"}},decorators:[t=>e.jsx("div",{className:"tw:p-4",children:e.jsx(t,{})})]},r={render:t=>e.jsx(a,{...t,children:"Default Badge"}),args:{variant:"default"},parameters:{docs:{description:{story:"A basic badge with the default variant."}}}},i={render:()=>e.jsxs("div",{className:"tw:flex tw:flex-wrap tw:gap-2",children:[e.jsx(a,{variant:"default",children:"Default"}),e.jsx(a,{variant:"destructive",children:"Destructive"}),e.jsx(a,{variant:"outline",children:"Outline"}),e.jsx(a,{variant:"secondary",children:"Secondary"}),e.jsx(a,{variant:"muted",children:"Muted"}),e.jsx(a,{variant:"ghost",children:"Ghost"}),e.jsx(a,{variant:"link",children:"Link"}),e.jsx(a,{variant:"blueIndicator",children:"Blue Indicator"}),e.jsx(a,{variant:"mutedIndicator",children:"Muted Indicator"})]}),parameters:{docs:{description:{story:"All available badge variants displayed together."}}}},c={render:()=>e.jsxs("div",{className:"tw:flex tw:flex-wrap tw:gap-2",children:[e.jsxs(a,{variant:"default",children:[e.jsx(p,{className:"tw:me-1 tw:h-3 tw:w-3"}),"Featured"]}),e.jsxs(a,{variant:"destructive",children:[e.jsx(T,{className:"tw:me-1 tw:h-3 tw:w-3"}),"Error"]}),e.jsxs(a,{variant:"secondary",children:[e.jsx(w,{className:"tw:me-1 tw:h-3 tw:w-3"}),"Completed"]}),e.jsxs(a,{variant:"outline",children:[e.jsx(u,{className:"tw:me-1 tw:h-3 tw:w-3"}),"Info"]}),e.jsxs(a,{variant:"ghost",children:[e.jsx(m,{className:"tw:me-1 tw:h-3 tw:w-3"}),"Ghost"]}),e.jsxs(a,{variant:"link",children:[e.jsx(G,{className:"tw:me-1 tw:h-3 tw:w-3"}),"Link"]}),e.jsxs(a,{variant:"blueIndicator",children:[e.jsx(p,{className:"tw:me-1 tw:h-3 tw:w-3"}),"Blue Indicator"]}),e.jsxs(a,{variant:"mutedIndicator",children:[e.jsx(u,{className:"tw:me-1 tw:h-3 tw:w-3"}),"Muted Indicator"]})]}),parameters:{docs:{description:{story:"Badges can include icons to provide additional context."}}}},n={render:()=>e.jsxs("div",{className:"tw:flex tw:flex-wrap tw:gap-2",children:[e.jsx(a,{className:"tw:cursor-pointer tw:hover:opacity-80",onClick:s(),variant:"default",children:"Clickable Badge"}),e.jsxs(a,{className:"tw:cursor-pointer tw:hover:opacity-80",onClick:s(),variant:"destructive",children:["Remove ",e.jsx(m,{className:"tw:ms-1 tw:h-3 tw:w-3"})]}),e.jsxs(a,{className:"tw:cursor-pointer tw:hover:opacity-80",onClick:s(),variant:"outline",children:["Select ",e.jsx(w,{className:"tw:ms-1 tw:h-3 tw:w-3"})]})]}),parameters:{docs:{description:{story:"Badges can be made clickable for interactive functionality."}}}},d={render:()=>e.jsxs(a,{className:"tw:cursor-pointer tw:hover:opacity-80",onClick:s(),variant:"destructive",children:["Dismissible ",e.jsx(m,{className:"tw:ms-1 tw:h-3 tw:w-3"})]}),parameters:{docs:{description:{story:"A badge with a close icon that can be dismissed."}}}},o={render:()=>e.jsxs("div",{className:"tw:space-y-2",children:[e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx("span",{className:"tw:text-sm",children:"Status:"}),e.jsxs(a,{variant:"secondary",children:[e.jsx(w,{className:"tw:me-1 tw:h-3 tw:w-3"}),"Active"]})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx("span",{className:"tw:text-sm",children:"Priority:"}),e.jsxs(a,{variant:"destructive",children:[e.jsx(T,{className:"tw:me-1 tw:h-3 tw:w-3"}),"High"]})]}),e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx("span",{className:"tw:text-sm",children:"Type:"}),e.jsx(a,{variant:"outline",children:"Feature"})]})]}),parameters:{docs:{description:{story:"Badges used to display status information in a structured layout."}}}},l={render:t=>e.jsx(a,{...t,children:"Interactive Badge"}),args:{variant:"default",className:"tw:cursor-pointer tw:hover:opacity-80",onClick:s()},parameters:{docs:{description:{story:"An interactive badge where you can experiment with different properties using the controls."}}}};var g,h,v;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(v=(h=r.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var x,B,f;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="tw:flex tw:flex-wrap tw:gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="muted">Muted</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="link">Link</Badge>
      <Badge variant="blueIndicator">Blue Indicator</Badge>
      <Badge variant="mutedIndicator">Muted Indicator</Badge>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants displayed together.'
      }
    }
  }
}`,...(f=(B=i.parameters)==null?void 0:B.docs)==null?void 0:f.source}}};var y,N,j;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="tw:flex tw:flex-wrap tw:gap-2">
      <Badge variant="default">
        <Star className="tw:me-1 tw:h-3 tw:w-3" />
        Featured
      </Badge>
      <Badge variant="destructive">
        <AlertCircle className="tw:me-1 tw:h-3 tw:w-3" />
        Error
      </Badge>
      <Badge variant="secondary">
        <CheckCircle className="tw:me-1 tw:h-3 tw:w-3" />
        Completed
      </Badge>
      <Badge variant="outline">
        <Info className="tw:me-1 tw:h-3 tw:w-3" />
        Info
      </Badge>
      <Badge variant="ghost">
        <X className="tw:me-1 tw:h-3 tw:w-3" />
        Ghost
      </Badge>
      <Badge variant="link">
        {/* False positive - this isn't actually an anchor but is just a link icon */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link className="tw:me-1 tw:h-3 tw:w-3" />
        Link
      </Badge>
      <Badge variant="blueIndicator">
        <Star className="tw:me-1 tw:h-3 tw:w-3" />
        Blue Indicator
      </Badge>
      <Badge variant="mutedIndicator">
        <Info className="tw:me-1 tw:h-3 tw:w-3" />
        Muted Indicator
      </Badge>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Badges can include icons to provide additional context.'
      }
    }
  }
}`,...(j=(N=c.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var k,b,C;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="tw:flex tw:flex-wrap tw:gap-2">
      <Badge className="tw:cursor-pointer tw:hover:opacity-80" onClick={fn()} variant="default">
        Clickable Badge
      </Badge>
      <Badge className="tw:cursor-pointer tw:hover:opacity-80" onClick={fn()} variant="destructive">
        Remove <X className="tw:ms-1 tw:h-3 tw:w-3" />
      </Badge>
      <Badge className="tw:cursor-pointer tw:hover:opacity-80" onClick={fn()} variant="outline">
        Select <CheckCircle className="tw:ms-1 tw:h-3 tw:w-3" />
      </Badge>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Badges can be made clickable for interactive functionality.'
      }
    }
  }
}`,...(C=(b=n.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var I,S,A;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <Badge className="tw:cursor-pointer tw:hover:opacity-80" onClick={fn()} variant="destructive">
      Dismissible <X className="tw:ms-1 tw:h-3 tw:w-3" />
    </Badge>,
  parameters: {
    docs: {
      description: {
        story: 'A badge with a close icon that can be dismissed.'
      }
    }
  }
}`,...(A=(S=d.parameters)==null?void 0:S.docs)==null?void 0:A.source}}};var D,L,_;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="tw:space-y-2">
      <div className="tw:flex tw:items-center tw:gap-2">
        <span className="tw:text-sm">Status:</span>
        <Badge variant="secondary">
          <CheckCircle className="tw:me-1 tw:h-3 tw:w-3" />
          Active
        </Badge>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2">
        <span className="tw:text-sm">Priority:</span>
        <Badge variant="destructive">
          <AlertCircle className="tw:me-1 tw:h-3 tw:w-3" />
          High
        </Badge>
      </div>
      <div className="tw:flex tw:items-center tw:gap-2">
        <span className="tw:text-sm">Type:</span>
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
}`,...(_=(L=o.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};var M,E,O;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <Badge {...args}>Interactive Badge</Badge>,
  args: {
    variant: 'default',
    className: 'tw:cursor-pointer tw:hover:opacity-80',
    onClick: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive badge where you can experiment with different properties using the controls.'
      }
    }
  }
}`,...(O=(E=l.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};const $=["Default","Variants","WithIcons","Clickable","DismissibleBadge","StatusBadges","Interactive"];export{n as Clickable,r as Default,d as DismissibleBadge,l as Interactive,o as StatusBadges,i as Variants,c as WithIcons,$ as __namedExportsOrder,Z as default};
