import{j as e}from"./jsx-runtime-BqcUmbcY.js";import{S as s}from"./spinner.component-DJNrDCIF.js";import{T as I}from"./theme-provider.component-BIQjXua0.js";import"./utils-BPbySc-g.js";import"./iframe-DhiB43Kw.js";import"./preload-helper-CTOgD26E.js";import"./createLucideIcon-CyeqNRwi.js";const F={title:"Basics/Spinner",component:s,tags:["autodocs"],decorators:[m=>e.jsx(I,{children:e.jsx(m,{})})],argTypes:{size:{control:{type:"number",min:1,max:100}},className:{control:"text"}}},t={args:{},parameters:{docs:{description:{story:"A default spinner with standard size and color."}}}},r={args:{size:4},parameters:{docs:{description:{story:"A small spinner with custom size."}}}},a={args:{size:8},parameters:{docs:{description:{story:"A large spinner with custom size."}}}},n={args:{size:10},parameters:{docs:{description:{story:"A spinner with a custom size of 10."}}}},i={args:{className:"tw:text-red-600"},parameters:{docs:{description:{story:"A red-colored spinner using custom CSS classes."}}}},c={render:()=>e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-6",children:[e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{}),e.jsx("span",{className:"tw:text-sm",children:"Default"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{className:"tw:text-red-600"}),e.jsx("span",{className:"tw:text-sm",children:"Red"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{className:"tw:text-blue-600"}),e.jsx("span",{className:"tw:text-sm",children:"Blue"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{className:"tw:text-green-600"}),e.jsx("span",{className:"tw:text-sm",children:"Green"})]})]}),parameters:{docs:{description:{story:"Different colored spinner variants."}}}},o={render:()=>e.jsxs("div",{className:"tw:flex tw:items-center tw:gap-6",children:[e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{size:3}),e.jsx("span",{className:"tw:text-sm",children:"Size 3"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{size:4}),e.jsx("span",{className:"tw:text-sm",children:"Size 4"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{}),e.jsx("span",{className:"tw:text-sm",children:"Default"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{size:8}),e.jsx("span",{className:"tw:text-sm",children:"Size 8"})]}),e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-2",children:[e.jsx(s,{size:10}),e.jsx("span",{className:"tw:text-sm",children:"Size 10"})]})]}),parameters:{docs:{description:{story:"Different spinner sizes from small to large."}}}},l={render:m=>e.jsxs("div",{className:"tw:flex tw:flex-col tw:items-center tw:gap-4",children:[e.jsx(s,{...m}),e.jsx("p",{className:"tw:text-sm tw:text-muted-foreground",children:"Use the controls to adjust the spinner size and styling."})]}),args:{size:6},parameters:{docs:{description:{story:"An interactive spinner where you can experiment with properties using the controls."}}}};var d,p,w;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'A default spinner with standard size and color.'
      }
    }
  }
}`,...(w=(p=t.parameters)==null?void 0:p.docs)==null?void 0:w.source}}};var x,f,u;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(u=(f=r.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var g,N,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(h=(N=a.parameters)==null?void 0:N.docs)==null?void 0:h.source}}};var v,S,z;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(z=(S=n.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var j,y,A;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(A=(y=i.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var D,C,B;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(B=(C=c.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var T,b,E;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(G=(q=l.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};const H=["Default","Small","Large","CustomSize","Colored","Variants","Sizes","Interactive"];export{i as Colored,n as CustomSize,t as Default,l as Interactive,a as Large,o as Sizes,r as Small,c as Variants,H as __namedExportsOrder,F as default};
