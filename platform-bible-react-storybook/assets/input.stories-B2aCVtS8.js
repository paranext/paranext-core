import{j as e}from"./jsx-runtime-IYIyySKN.js";import{I as u}from"./input-qWw9nrId.js";import{r as p}from"./iframe-C-wXd9Ab.js";import"./shadcn-ui.util-DMJ19wEV.js";const q={title:"Shadcn/Input",component:u,tags:["autodocs"],argTypes:{placeholder:{control:"text"},disabled:{control:"boolean"},className:{control:"text"}},decorators:[t=>e.jsx(t,{})]},o={args:{placeholder:"Enter text..."}},n={args:{placeholder:"Disabled input",disabled:!0}},d={args:{placeholder:"Playground Input"}},l={render:t=>{const[r,a]=p.useState("");return e.jsxs("div",{className:"tw-max-w-md tw-space-y-4",children:[e.jsx(u,{...t,value:r,onChange:s=>a(s.target.value)}),e.jsxs("div",{className:"tw-text-sm tw-text-gray-600",children:[e.jsxs("p",{children:["Current value: ",e.jsx("code",{children:r})]}),e.jsx("p",{children:"Use the Code Editor tab to modify this input in real-time!"})]})]})},args:{placeholder:"Type here to test..."},parameters:{docs:{description:{story:"This story allows live code editing. Try adding validation, changing the placeholder, or adding event handlers."}}}},i={render:()=>{const[t,r]=p.useState(""),[a,s]=p.useState(""),T=I=>{const c=I.target.value;r(c),c.length<3&&c.length>0?s("Must be at least 3 characters"):s("")};return e.jsxs("div",{className:"tw-max-w-md tw-space-y-2",children:[e.jsx(u,{value:t,onChange:T,placeholder:"Enter at least 3 characters",className:a?"tw-border-red-500":""}),a&&e.jsx("p",{className:"tw-text-sm tw-text-red-500",children:a}),e.jsx("p",{className:"tw-text-sm tw-text-gray-600",children:"Edit this validation logic in the Code Editor!"})]})},parameters:{docs:{description:{story:"An input with validation logic that you can edit and experiment with in real-time."}}}};var m,h,g;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var x,v,w;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled input',
    disabled: true
  }
}`,...(w=(v=n.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var y,E,f;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    placeholder: 'Playground Input'
  }
}`,...(f=(E=d.parameters)==null?void 0:E.docs)==null?void 0:f.source}}};var C,b,S;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    return <div className="tw-max-w-md tw-space-y-4">
        <Input {...args} value={value} onChange={e => setValue(e.target.value)} />
        <div className="tw-text-sm tw-text-gray-600">
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
}`,...(S=(b=l.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var j,N,V;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
    return <div className="tw-max-w-md tw-space-y-2">
        <Input value={value} onChange={handleChange} placeholder="Enter at least 3 characters" className={error ? 'tw-border-red-500' : ''} />
        {error && <p className="tw-text-sm tw-text-red-500">{error}</p>}
        <p className="tw-text-sm tw-text-gray-600">
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
}`,...(V=(N=i.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};const A=["Default","Disabled","Playground","LiveEditable","WithValidation"];export{o as Default,n as Disabled,l as LiveEditable,d as Playground,i as WithValidation,A as __namedExportsOrder,q as default};
