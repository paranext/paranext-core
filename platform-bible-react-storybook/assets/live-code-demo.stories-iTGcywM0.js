import{j as t}from"./jsx-runtime-4wK_0ZO4.js";import{B as r}from"./button-BklEqBlb.js";import{I as b}from"./input-CLS-C3Rv.js";import{r as p,m as a}from"./iframe-BcYeWgcr.js";const I={"@/components/shadcn-ui/button":{Button:r},"@/components/shadcn-ui/input":{Input:b}};function N(){const[c,k]=p.useState("Hello, World!"),[i,d]=p.useState(0);return t.jsxs("div",{className:"tw-space-y-4 tw-p-4",children:[t.jsx("h2",{className:"tw-text-xl tw-font-bold",children:"Live Code Editor Demo"}),t.jsxs("div",{className:"tw-space-y-2",children:[t.jsx(b,{value:c,onChange:B=>k(B.target.value),placeholder:"Type something..."}),t.jsxs("p",{className:"tw-text-sm tw-text-gray-600",children:["You typed: ",c]})]}),t.jsxs("div",{className:"tw-space-y-2",children:[t.jsxs(r,{onClick:()=>d(i+1),children:["Clicked ",i," times"]}),t.jsx(r,{variant:"outline",onClick:()=>d(0),children:"Reset"})]})]})}const T={title:"Demo/Live Code Editor",component:N,tags:["!autodocs"],parameters:{componentSubtitle:"Interactive code editing examples"}},e={parameters:{docs:{description:{story:"Simple HTML/React editing, perfect for getting started"}}}};a(e,{code:`export default function SimpleTest() {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Hello from Code Editor!</h1>
      <p>This is a simple test. Try editing this code!</p>
      <button onClick={() => alert('Button clicked!')}>
        Click me
      </button>
    </div>
  );
}`});const o={parameters:{docs:{description:{story:"React hooks and state management"}}}};a(o,{code:`import { useState } from 'react';

export default function StatefulTest() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>
        Reset
      </button>
    </div>
  );
}`});const n={parameters:{docs:{description:{story:"Complex example with Button + Input components"}}}};a(n,{code:`import { useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';

export default function LiveCodeDemo() {
  const [text, setText] = useState('Hello, World!');
  const [count, setCount] = useState(0);

  return (
    <div className="pr-twp tw-space-y-4 tw-p-4">
      <h2 className="tw-text-xl tw-font-bold">Live Code Editor Demo</h2>
      <div className="tw-space-y-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
        <p className="tw-text-sm tw-text-gray-600">You typed: {text}</p>
      </div>
      <div className="tw-space-y-2">
        <Button onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </Button>
        <Button
          variant="outline"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}`,availableImports:I});const s={parameters:{docs:{description:{story:"Input validation and state management"}}}};a(s,{code:`import { useState } from 'react';
import { Input } from '@/components/shadcn-ui/input';

export default function InputDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="pr-twp tw-space-y-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Edit this in the code editor!"
      />
      <p className="tw-text-sm">Value: {value}</p>
      <p className="tw-text-xs tw-text-gray-500">
        Try adding validation, changing the placeholder, or styling!
      </p>
    </div>
  );
}`,availableImports:I});var u,l,m;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Simple HTML/React editing, perfect for getting started'
      }
    }
  }
}`,...(m=(l=e.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var x,h,v;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'React hooks and state management'
      }
    }
  }
}`,...(v=(h=o.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var f,C,g;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Complex example with Button + Input components'
      }
    }
  }
}`,...(g=(C=n.parameters)==null?void 0:C.docs)==null?void 0:g.source}}};var y,S,w;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Input validation and state management'
      }
    }
  }
}`,...(w=(S=s.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};const j=["BasicExample","InteractiveCounter","Counter","InputWithState"],_=Object.freeze(Object.defineProperty({__proto__:null,BasicExample:e,Counter:n,InputWithState:s,InteractiveCounter:o,__namedExportsOrder:j,default:T},Symbol.toStringTag,{value:"Module"}));export{e as B,_ as C,o as I,n as a,s as b};
