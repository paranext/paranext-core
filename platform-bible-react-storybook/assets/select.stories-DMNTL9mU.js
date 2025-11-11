import{j as e}from"./jsx-runtime-CvGToidP.js";import{S as a,a as s,b as r,c,d as t,e as w,f as v}from"./select-Db4UU3si.js";import{r as M}from"./iframe-FHgAwj54.js";import{T as P}from"./theme-provider.component-BRfsG9zC.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";import"./index-BaQP4hhM.js";import"./index-Cb3YhHOz.js";import"./index-DMIDenWg.js";import"./index-CnlM3g2y.js";import"./index-DvVrmaIy.js";import"./index-D-wbo5Oc.js";import"./index-C6LUVuya.js";import"./index-lUSupRFo.js";import"./index-CBoFXSy3.js";import"./index-8o_pfAlr.js";import"./index-DmQmB0x9.js";import"./index-desAK0Z_.js";import"./floating-ui.react-dom-DDxLfT8M.js";import"./index-BXuT3Sj2.js";import"./Combination-CMZlQmZK.js";import"./index-DYbRprcN.js";import"./index-gPdjwkel.js";import"./index-DEtppfdW.js";import"./index-q5xUhQdo.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-BPbCuWFR.js";import"./chevron-down-i-XYDP49.js";import"./createLucideIcon-B4WsWZHQ.js";import"./check-Ce2iVscw.js";const{fn:o}=__STORYBOOK_MODULE_TEST__,be={title:"Shadcn/Select",component:a,tags:["autodocs"],decorators:[l=>e.jsx(P,{children:e.jsx(l,{})})],argTypes:{onValueChange:{action:"value changed"},disabled:{control:"boolean"},defaultValue:{control:"text"}}},n={render:l=>e.jsxs(a,{...l,children:[e.jsx(s,{className:"tw-w-48",children:e.jsx(r,{placeholder:"Select an option"})}),e.jsxs(c,{children:[e.jsx(t,{value:"option1",children:"Option 1"}),e.jsx(t,{value:"option2",children:"Option 2"}),e.jsx(t,{value:"option3",children:"Option 3"})]})]}),args:{onValueChange:o()},parameters:{docs:{description:{story:"A basic select dropdown with simple options."}}}},i={render:l=>e.jsxs(a,{...l,children:[e.jsx(s,{className:"tw-w-48",children:e.jsx(r,{placeholder:"Select framework"})}),e.jsxs(c,{position:"popper",children:[e.jsx(t,{value:"next",children:"Next.js"}),e.jsx(t,{value:"sveltekit",children:"SvelteKit"}),e.jsx(t,{value:"astro",children:"Astro"}),e.jsx(t,{value:"nuxt",children:"Nuxt.js"})]})]}),args:{onValueChange:o()},parameters:{docs:{description:{story:"A select dropdown for choosing frameworks, similar to the original example."}}}},d={render:l=>e.jsxs(a,{...l,children:[e.jsx(s,{className:"tw-w-60",children:e.jsx(r,{placeholder:"Select a fruit"})}),e.jsxs(c,{children:[e.jsxs(w,{children:[e.jsx(v,{children:"Fruits"}),e.jsx(t,{value:"apple",children:"Apple"}),e.jsx(t,{value:"banana",children:"Banana"}),e.jsx(t,{value:"orange",children:"Orange"})]}),e.jsxs(w,{children:[e.jsx(v,{children:"Vegetables"}),e.jsx(t,{value:"carrot",children:"Carrot"}),e.jsx(t,{value:"broccoli",children:"Broccoli"}),e.jsx(t,{value:"spinach",children:"Spinach"})]})]})]}),args:{onValueChange:o()},parameters:{docs:{description:{story:"A select dropdown with grouped options."}}}},m={render:l=>e.jsxs(a,{...l,children:[e.jsx(s,{className:"tw-w-48",children:e.jsx(r,{})}),e.jsxs(c,{children:[e.jsx(t,{value:"dark",children:"Dark"}),e.jsx(t,{value:"light",children:"Light"}),e.jsx(t,{value:"system",children:"System"})]})]}),args:{defaultValue:"system",onValueChange:o()},parameters:{docs:{description:{story:"A select dropdown with a default value pre-selected."}}}},p={render:l=>e.jsxs(a,{...l,children:[e.jsx(s,{className:"tw-w-48",children:e.jsx(r,{placeholder:"Disabled select"})}),e.jsxs(c,{children:[e.jsx(t,{value:"option1",children:"Option 1"}),e.jsx(t,{value:"option2",children:"Option 2"})]})]}),args:{disabled:!0,onValueChange:o()},parameters:{docs:{description:{story:"A disabled select dropdown that cannot be interacted with."}}}},u={render:()=>e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"basic-select",className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Basic Select"}),e.jsxs(a,{children:[e.jsx(s,{id:"basic-select",className:"tw-w-48",children:e.jsx(r,{placeholder:"Choose option"})}),e.jsxs(c,{children:[e.jsx(t,{value:"a",children:"Option A"}),e.jsx(t,{value:"b",children:"Option B"}),e.jsx(t,{value:"c",children:"Option C"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"default-select",className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"With Default Value"}),e.jsxs(a,{defaultValue:"b",children:[e.jsx(s,{id:"default-select",className:"tw-w-48",children:e.jsx(r,{})}),e.jsxs(c,{children:[e.jsx(t,{value:"a",children:"Option A"}),e.jsx(t,{value:"b",children:"Option B"}),e.jsx(t,{value:"c",children:"Option C"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"disabled-select",className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Disabled"}),e.jsxs(a,{disabled:!0,children:[e.jsx(s,{id:"disabled-select",className:"tw-w-48",children:e.jsx(r,{placeholder:"Disabled"})}),e.jsxs(c,{children:[e.jsx(t,{value:"a",children:"Option A"}),e.jsx(t,{value:"b",children:"Option B"})]})]})]})]}),parameters:{docs:{description:{story:"Different select variants showing various configurations."}}}},S={render:l=>{const[h,q]=M.useState(""),R=g=>{var x;q(g),(x=l.onValueChange)==null||x.call(l,g)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs(a,{...l,value:h,onValueChange:R,children:[e.jsx(s,{className:"tw-w-48",children:e.jsx(r,{placeholder:"Select a theme"})}),e.jsxs(c,{children:[e.jsx(t,{value:"light",children:"Light"}),e.jsx(t,{value:"dark",children:"Dark"}),e.jsx(t,{value:"system",children:"System"})]})]}),e.jsxs("div",{className:"tw-text-sm tw-text-muted-foreground",children:["Selected value: ",e.jsx("code",{children:h||"(none)"})]})]})},args:{onValueChange:o()},parameters:{docs:{description:{story:"An interactive select dropdown that shows the current selection."}}}};var j,b,I;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <SelectTrigger className="tw-w-48">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>,
  args: {
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic select dropdown with simple options.'
      }
    }
  }
}`,...(I=(b=n.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var f,C,V;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <SelectTrigger className="tw-w-48">
        <SelectValue placeholder="Select framework" />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectItem value="next">Next.js</SelectItem>
        <SelectItem value="sveltekit">SvelteKit</SelectItem>
        <SelectItem value="astro">Astro</SelectItem>
        <SelectItem value="nuxt">Nuxt.js</SelectItem>
      </SelectContent>
    </Select>,
  args: {
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A select dropdown for choosing frameworks, similar to the original example.'
      }
    }
  }
}`,...(V=(C=i.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var y,N,O;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <SelectTrigger className="tw-w-60">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="broccoli">Broccoli</SelectItem>
          <SelectItem value="spinach">Spinach</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>,
  args: {
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A select dropdown with grouped options.'
      }
    }
  }
}`,...(O=(N=d.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var T,k,A;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <SelectTrigger className="tw-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>,
  args: {
    defaultValue: 'system',
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A select dropdown with a default value pre-selected.'
      }
    }
  }
}`,...(A=(k=m.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var D,B,F;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <SelectTrigger className="tw-w-48">
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>,
  args: {
    disabled: true,
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled select dropdown that cannot be interacted with.'
      }
    }
  }
}`,...(F=(B=p.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var L,_,G;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="tw-space-y-4">
      <div>
        <label htmlFor="basic-select" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
          Basic Select
        </label>
        <Select>
          <SelectTrigger id="basic-select" className="tw-w-48">
            <SelectValue placeholder="Choose option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
            <SelectItem value="c">Option C</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="default-select" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
          With Default Value
        </label>
        <Select defaultValue="b">
          <SelectTrigger id="default-select" className="tw-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
            <SelectItem value="c">Option C</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="disabled-select" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
          Disabled
        </label>
        <Select disabled>
          <SelectTrigger id="disabled-select" className="tw-w-48">
            <SelectValue placeholder="Disabled" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Different select variants showing various configurations.'
      }
    }
  }
}`,...(G=(_=u.parameters)==null?void 0:_.docs)==null?void 0:G.source}}};var E,W,K;S.parameters={...S.parameters,docs:{...(E=S.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };
    return <div className="tw-space-y-4">
        <Select {...args} value={value} onValueChange={handleValueChange}>
          <SelectTrigger className="tw-w-48">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <div className="tw-text-sm tw-text-muted-foreground">
          Selected value: <code>{value || '(none)'}</code>
        </div>
      </div>;
  },
  args: {
    onValueChange: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive select dropdown that shows the current selection.'
      }
    }
  }
}`,...(K=(W=S.parameters)==null?void 0:W.docs)==null?void 0:K.source}}};const Ie=["Default","Framework","WithGroups","WithDefaultValue","Disabled","Variants","Interactive"];export{n as Default,p as Disabled,i as Framework,S as Interactive,u as Variants,m as WithDefaultValue,d as WithGroups,Ie as __namedExportsOrder,be as default};
