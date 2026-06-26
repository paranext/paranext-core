import{j as e,r as m}from"./iframe-IBdLfvjy.js";import{I as t}from"./input-i_N3Ipqq.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";const q={title:"Shadcn/Input",component:t,tags:["autodocs"],argTypes:{placeholder:{control:"text"},disabled:{control:"boolean"},className:{control:"text"}}},l={args:{placeholder:"Enter text..."}},o={args:{placeholder:"Disabled input",disabled:!0}},n={args:{placeholder:"Playground Input"}},i={render:u=>{const[r,a]=m.useState("");return e.jsxs("div",{className:"tw:max-w-md tw:space-y-4",children:[e.jsx(t,{...u,value:r,onChange:s=>a(s.target.value),"aria-label":"Test input"}),e.jsxs("div",{className:"tw:text-sm tw:text-gray-600",children:[e.jsxs("p",{children:["Current value: ",e.jsx("code",{children:r})]}),e.jsx("p",{children:"Use the Code Editor tab to modify this input in real-time!"})]})]})},args:{placeholder:"Type here to test..."},parameters:{docs:{description:{story:"This story allows live code editing. Try adding validation, changing the placeholder, or adding event handlers."}}}},d={render:()=>{const[u,r]=m.useState(""),[a,s]=m.useState(""),F=B=>{const p=B.target.value;r(p),p.length<3&&p.length>0?s("Must be at least 3 characters"):s("")};return e.jsxs("div",{className:"tw:max-w-md tw:space-y-2",children:[e.jsx(t,{value:u,onChange:F,placeholder:"Enter at least 3 characters",className:a?"tw:border-red-500":""}),a&&e.jsx("p",{className:"tw:text-sm tw:text-red-500",children:a}),e.jsx("p",{className:"tw:text-sm tw:text-gray-600",children:"Edit this validation logic in the Code Editor!"})]})},parameters:{docs:{description:{story:"An input with validation logic that you can edit and experiment with in real-time."}}}},c={render:()=>e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"default-input",className:"tw:mb-2 tw:block tw:text-sm tw:font-medium",children:"Default Shadcn Input"}),e.jsx(t,{id:"default-input",placeholder:"Default styling"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"small-input",className:"tw:mb-2 tw:block tw:text-sm tw:font-medium",children:"Small Input (8px height)"}),e.jsx(t,{id:"small-input",placeholder:"Small input",className:"tw:h-8"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"bvc-input",className:"tw:mb-2 tw:block tw:text-sm tw:font-medium",children:"BVC Style Input"}),e.jsx(t,{id:"bvc-input",placeholder:"Book-chapter-control style",className:"tw:box-border tw:gap-2.5 tw:rounded-lg tw:border tw:border-solid tw:border-black tw:bg-white tw:py-2 tw:pl-4 tw:pr-3 tw:font-medium tw:text-slate-900 tw:shadow-none tw:outline-hidden"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"ring-input",className:"tw:mb-2 tw:block tw:text-sm tw:font-medium",children:"Custom Ring Color"}),e.jsx(t,{id:"ring-input",placeholder:"Custom focus ring",className:"tw:focus-visible:ring-[color:hsl(240,5%,64.9%)]"})]})]}),parameters:{docs:{description:{story:"Various input styling examples showing different visual approaches."}}}};var h,w,g;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(g=(w=l.parameters)==null?void 0:w.docs)==null?void 0:g.source}}};var x,b,v;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled input',
    disabled: true
  }
}`,...(v=(b=o.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var y,f,N;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    placeholder: 'Playground Input'
  }
}`,...(N=(f=n.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};var C,S,j;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <div className="tw:max-w-md tw:space-y-4">
        <Input {...args} value={value} onChange={e => setValue(e.target.value)} aria-label="Test input" />
        <div className="tw:text-sm tw:text-gray-600">
          <p>
            Current value: <code>{value}</code>
          </p>
          <p>Use the Code Editor tab to modify this input in real-time!</p>
        </div>
      </div>;
  },
  args: {
    placeholder: 'Type here to test...'
  },
  parameters: {
    docs: {
      description: {
        story: 'This story allows live code editing. Try adding validation, changing the placeholder, or adding event handlers.'
      }
    }
  }
}`,...(j=(S=i.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var E,I,V;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      // Simple validation example
      if (newValue.length < 3 && newValue.length > 0) {
        setError('Must be at least 3 characters');
      } else {
        setError('');
      }
    };
    return <div className="tw:max-w-md tw:space-y-2">
        <Input value={value} onChange={handleChange} placeholder="Enter at least 3 characters" className={error ? 'tw:border-red-500' : ''} />
        {error && <p className="tw:text-sm tw:text-red-500">{error}</p>}
        <p className="tw:text-sm tw:text-gray-600">
          Edit this validation logic in the Code Editor!
        </p>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'An input with validation logic that you can edit and experiment with in real-time.'
      }
    }
  }
}`,...(V=(I=d.parameters)==null?void 0:I.docs)==null?void 0:V.source}}};var k,T,D;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <div className="tw:space-y-4">
      <div>
        <label htmlFor="default-input" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
          Default Shadcn Input
        </label>
        <Input id="default-input" placeholder="Default styling" />
      </div>
      <div>
        <label htmlFor="small-input" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
          Small Input (8px height)
        </label>
        <Input id="small-input" placeholder="Small input" className="tw:h-8" />
      </div>
      <div>
        <label htmlFor="bvc-input" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
          BVC Style Input
        </label>
        <Input id="bvc-input" placeholder="Book-chapter-control style" className="tw:box-border tw:gap-2.5 tw:rounded-lg tw:border tw:border-solid tw:border-black tw:bg-white tw:py-2 tw:pl-4 tw:pr-3 tw:font-medium tw:text-slate-900 tw:shadow-none tw:outline-hidden" />
      </div>
      <div>
        <label htmlFor="ring-input" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
          Custom Ring Color
        </label>
        <Input id="ring-input" placeholder="Custom focus ring" className="tw:focus-visible:ring-[color:hsl(240,5%,64.9%)]" />
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Various input styling examples showing different visual approaches.'
      }
    }
  }
}`,...(D=(T=c.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};const A=["Default","Disabled","Playground","LiveEditable","WithValidation","CustomStyles"];export{c as CustomStyles,l as Default,o as Disabled,i as LiveEditable,n as Playground,d as WithValidation,A as __namedExportsOrder,q as default};
