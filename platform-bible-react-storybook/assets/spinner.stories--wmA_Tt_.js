import{j as e}from"./iframe-BGA3HOn9.js";import{S as s}from"./spinner.component-pkZzayeK.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./loader-circle-BaCVIuar.js";import"./createLucideIcon-BAce5ytx.js";const k={title:"Basics/Spinner",component:s,tags:["autodocs"],argTypes:{size:{control:{type:"number",min:1,max:100}},className:{control:"text"}}},t={args:{},parameters:{docs:{description:{story:"A default spinner with standard size and color."}}}},r={args:{size:4},parameters:{docs:{description:{story:"A small spinner with custom size."}}}},a={args:{size:8},parameters:{docs:{description:{story:"A large spinner with custom size."}}}},n={args:{size:10},parameters:{docs:{description:{story:"A spinner with a custom size of 10."}}}},i={args:{className:"tw:text-red-600"},parameters:{docs:{description:{story:"A red-colored spinner using custom CSS classes."}}}},c={render:()=>e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-6",children:[e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{}),e.jsx("span",{className:"tw:text-sm",children:"Default"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{className:"tw:text-red-600"}),e.jsx("span",{className:"tw:text-sm",children:"Red"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{className:"tw:text-blue-600"}),e.jsx("span",{className:"tw:text-sm",children:"Blue"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{className:"tw:text-green-600"}),e.jsx("span",{className:"tw:text-sm",children:"Green"})]})]}),parameters:{docs:{description:{story:"Different colored spinner variants."}}}},o={render:()=>e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-6",children:[e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{size:3}),e.jsx("span",{className:"tw:text-sm",children:"Size 3"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{size:4}),e.jsx("span",{className:"tw:text-sm",children:"Size 4"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{}),e.jsx("span",{className:"tw:text-sm",children:"Default"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{size:8}),e.jsx("span",{className:"tw:text-sm",children:"Size 8"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{size:10}),e.jsx("span",{className:"tw:text-sm",children:"Size 10"})]})]}),parameters:{docs:{description:{story:"Different spinner sizes from small to large."}}}},l={render:I=>e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-4",children:[e.jsx(s,{...I}),e.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:"Use the controls to adjust the spinner size and styling."})]}),args:{size:6},parameters:{docs:{description:{story:"An interactive spinner where you can experiment with properties using the controls."}}}};var m,p,d;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'A default spinner with standard size and color.'
      }
    }
  }
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var w,x,f;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    size: 4
  },
  parameters: {
    docs: {
      description: {
        story: 'A small spinner with custom size.'
      }
    }
  }
}`,...(f=(x=r.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var u,g,N;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    size: 8
  },
  parameters: {
    docs: {
      description: {
        story: 'A large spinner with custom size.'
      }
    }
  }
}`,...(N=(g=a.parameters)==null?void 0:g.docs)==null?void 0:N.source}}};var h,v,S;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    size: 10
  },
  parameters: {
    docs: {
      description: {
        story: 'A spinner with a custom size of 10.'
      }
    }
  }
}`,...(S=(v=n.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var z,j,y;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    className: 'tw:text-red-600'
  },
  parameters: {
    docs: {
      description: {
        story: 'A red-colored spinner using custom CSS classes.'
      }
    }
  }
}`,...(y=(j=i.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var A,D,C;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="tw:flex tw:items-center tw:gap-6">
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <Spinner />
        <span className="tw:text-sm">Default</span>
      </div>
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <Spinner className="tw:text-red-600" />
        <span className="tw:text-sm">Red</span>
      </div>
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <Spinner className="tw:text-blue-600" />
        <span className="tw:text-sm">Blue</span>
      </div>
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <Spinner className="tw:text-green-600" />
        <span className="tw:text-sm">Green</span>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Different colored spinner variants.'
      }
    }
  }
}`,...(C=(D=c.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};var B,b,E;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="tw:flex tw:items-center tw:gap-6">
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <Spinner size={3} />
        <span className="tw:text-sm">Size 3</span>
      </div>
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <Spinner size={4} />
        <span className="tw:text-sm">Size 4</span>
      </div>
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <Spinner />
        <span className="tw:text-sm">Default</span>
      </div>
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <Spinner size={8} />
        <span className="tw:text-sm">Size 8</span>
      </div>
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
        <Spinner size={10} />
        <span className="tw:text-sm">Size 10</span>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Different spinner sizes from small to large.'
      }
    }
  }
}`,...(E=(b=o.parameters)==null?void 0:b.docs)==null?void 0:E.source}}};var R,q,G;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => <div className="tw:flex tw:flex-col tw:items-center tw:gap-4">
      <Spinner {...args} />
      <p className="tw:text-sm tw:text-muted-foreground">
        Use the controls to adjust the spinner size and styling.
      </p>
    </div>,
  args: {
    size: 6
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive spinner where you can experiment with properties using the controls.'
      }
    }
  }
}`,...(G=(q=l.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};const F=["Default","Small","Large","CustomSize","Colored","Variants","Sizes","Interactive"];export{i as Colored,n as CustomSize,t as Default,l as Interactive,a as Large,o as Sizes,r as Small,c as Variants,F as __namedExportsOrder,k as default};
