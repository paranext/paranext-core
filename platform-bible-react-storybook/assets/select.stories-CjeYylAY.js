import{j as e,r as z}from"./iframe-BHDykt4K.js";import{S as s,a,b as r,c,d as t,e as v,f as j}from"./select-BhsGtafm.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";import"./createReactComponent-BXWBRzff.js";import"./IconCheck-B-B4_1cg.js";import"./index-BaQP4hhM.js";import"./index-Bw97KXOm.js";import"./index-Coj_m_-6.js";import"./index-CFe4-R8A.js";import"./index-B0BN33ZW.js";import"./index-CnubEOSe.js";import"./index-CsVCC_-7.js";import"./index-BNM6CXf_.js";import"./index-BDelcpdf.js";import"./index-DHncTnLF.js";import"./index-DHV28Huw.js";import"./index-Dw1O-l_u.js";import"./index-DUcS0uAH.js";import"./index-BIg6tOu9.js";import"./index-DkLkC4Ij.js";const{fn:i}=__STORYBOOK_MODULE_TEST__,Se={title:"Shadcn/Select",component:s,tags:["autodocs"],argTypes:{onValueChange:{action:"value changed"},disabled:{control:"boolean"},defaultValue:{control:"text"}}},o={render:l=>e.jsxs(s,{...l,children:[e.jsx(a,{className:"tw:w-48",children:e.jsx(r,{placeholder:"Select an option"})}),e.jsxs(c,{children:[e.jsx(t,{value:"option1",children:"Option 1"}),e.jsx(t,{value:"option2",children:"Option 2"}),e.jsx(t,{value:"option3",children:"Option 3"})]})]}),args:{onValueChange:i()},parameters:{docs:{description:{story:"A basic select dropdown with simple options."}}}},n={render:l=>e.jsxs(s,{...l,children:[e.jsx(a,{className:"tw:w-48",children:e.jsx(r,{placeholder:"Select framework"})}),e.jsxs(c,{position:"popper",children:[e.jsx(t,{value:"next",children:"Next.js"}),e.jsx(t,{value:"sveltekit",children:"SvelteKit"}),e.jsx(t,{value:"astro",children:"Astro"}),e.jsx(t,{value:"nuxt",children:"Nuxt.js"})]})]}),args:{onValueChange:i()},parameters:{docs:{description:{story:"A select dropdown for choosing frameworks, similar to the original example."}}}},d={render:l=>e.jsxs(s,{...l,children:[e.jsx(a,{className:"tw:w-60",children:e.jsx(r,{placeholder:"Select a fruit"})}),e.jsxs(c,{children:[e.jsxs(v,{children:[e.jsx(j,{children:"Fruits"}),e.jsx(t,{value:"apple",children:"Apple"}),e.jsx(t,{value:"banana",children:"Banana"}),e.jsx(t,{value:"orange",children:"Orange"})]}),e.jsxs(v,{children:[e.jsx(j,{children:"Vegetables"}),e.jsx(t,{value:"carrot",children:"Carrot"}),e.jsx(t,{value:"broccoli",children:"Broccoli"}),e.jsx(t,{value:"spinach",children:"Spinach"})]})]})]}),args:{onValueChange:i()},parameters:{docs:{description:{story:"A select dropdown with grouped options."}}}},m={render:l=>e.jsxs(s,{...l,children:[e.jsx(a,{className:"tw:w-48",children:e.jsx(r,{})}),e.jsxs(c,{children:[e.jsx(t,{value:"dark",children:"Dark"}),e.jsx(t,{value:"light",children:"Light"}),e.jsx(t,{value:"system",children:"System"})]})]}),args:{defaultValue:"system",onValueChange:i()},parameters:{docs:{description:{story:"A select dropdown with a default value pre-selected."}}}},p={render:l=>e.jsxs(s,{...l,children:[e.jsx(a,{className:"tw:w-48",children:e.jsx(r,{placeholder:"Disabled select"})}),e.jsxs(c,{children:[e.jsx(t,{value:"option1",children:"Option 1"}),e.jsx(t,{value:"option2",children:"Option 2"})]})]}),args:{disabled:!0,onValueChange:i()},parameters:{docs:{description:{story:"A disabled select dropdown that cannot be interacted with."}}}},u={render:()=>e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"basic-select",className:"tw:mb-2 tw:block tw:text-sm tw:font-medium",children:"Basic Select"}),e.jsxs(s,{children:[e.jsx(a,{id:"basic-select",className:"tw:w-48",children:e.jsx(r,{placeholder:"Choose option"})}),e.jsxs(c,{children:[e.jsx(t,{value:"a",children:"Option A"}),e.jsx(t,{value:"b",children:"Option B"}),e.jsx(t,{value:"c",children:"Option C"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"default-select",className:"tw:mb-2 tw:block tw:text-sm tw:font-medium",children:"With Default Value"}),e.jsxs(s,{defaultValue:"b",children:[e.jsx(a,{id:"default-select",className:"tw:w-48",children:e.jsx(r,{})}),e.jsxs(c,{children:[e.jsx(t,{value:"a",children:"Option A"}),e.jsx(t,{value:"b",children:"Option B"}),e.jsx(t,{value:"c",children:"Option C"})]})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"disabled-select",className:"tw:mb-2 tw:block tw:text-sm tw:font-medium",children:"Disabled"}),e.jsxs(s,{disabled:!0,children:[e.jsx(a,{id:"disabled-select",className:"tw:w-48",children:e.jsx(r,{placeholder:"Disabled"})}),e.jsxs(c,{children:[e.jsx(t,{value:"a",children:"Option A"}),e.jsx(t,{value:"b",children:"Option B"})]})]})]})]}),parameters:{docs:{description:{story:"Different select variants showing various configurations."}}}},h={render:()=>e.jsxs("div",{className:"tw:flex tw:gap-16 tw:items-start",children:[e.jsxs("div",{className:"tw:space-y-2",children:[e.jsx("p",{className:"tw:text-sm tw:font-medium",children:"popper (default)"}),e.jsx("p",{className:"tw:text-xs tw:text-muted-foreground tw:max-w-40",children:"Popup drops below the trigger. Width is at least as wide as the trigger."}),e.jsxs(s,{children:[e.jsx(a,{children:e.jsx(r,{placeholder:"A"})}),e.jsxs(c,{position:"popper",children:[e.jsx(t,{value:"genesis",children:"Genesis"}),e.jsx(t,{value:"exodus",children:"Exodus"}),e.jsx(t,{value:"leviticus",children:"Leviticus"})]})]})]}),e.jsxs("div",{className:"tw:space-y-2",children:[e.jsx("p",{className:"tw:text-sm tw:font-medium",children:"item-aligned"}),e.jsx("p",{className:"tw:text-xs tw:text-muted-foreground tw:max-w-40",children:"Popup overlays the trigger, aligned to the selected item. Width matches content."}),e.jsxs(s,{children:[e.jsx(a,{children:e.jsx(r,{placeholder:"A"})}),e.jsxs(c,{position:"item-aligned",children:[e.jsx(t,{value:"genesis",children:"Genesis"}),e.jsx(t,{value:"exodus",children:"Exodus"}),e.jsx(t,{value:"leviticus",children:"Leviticus"})]})]})]})]}),parameters:{docs:{description:{story:'**popper** (default) drops the popup below the trigger like a standard dropdown and constrains its minimum width to the trigger width. **item-aligned** overlays the popup on the trigger, positioning it so the selected item aligns with the trigger — useful when you want the list to appear "in place".'}}}},S={render:l=>{const[g,U]=z.useState(""),Y=x=>{var w;U(x),(w=l.onValueChange)==null||w.call(l,x)};return e.jsxs("div",{className:"tw:space-y-4",children:[e.jsxs(s,{...l,value:g,onValueChange:Y,children:[e.jsx(a,{className:"tw:w-48",children:e.jsx(r,{placeholder:"Select a theme"})}),e.jsxs(c,{children:[e.jsx(t,{value:"light",children:"Light"}),e.jsx(t,{value:"dark",children:"Dark"}),e.jsx(t,{value:"system",children:"System"})]})]}),e.jsxs("div",{className:"tw:text-sm tw:text-muted-foreground",children:["Selected value: ",e.jsx("code",{children:g||"(none)"})]})]})},args:{onValueChange:i()},parameters:{docs:{description:{story:"An interactive select dropdown that shows the current selection."}}}};var f,b,I;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <SelectTrigger className="tw:w-48">
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
}`,...(I=(b=o.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var C,V,N;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <SelectTrigger className="tw:w-48">
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
}`,...(N=(V=n.parameters)==null?void 0:V.docs)==null?void 0:N.source}}};var y,O,T;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <SelectTrigger className="tw:w-60">
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
}`,...(T=(O=d.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var A,k,D;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <SelectTrigger className="tw:w-48">
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
}`,...(D=(k=m.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var B,L,G;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <Select {...args}>
      <SelectTrigger className="tw:w-48">
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
}`,...(G=(L=p.parameters)==null?void 0:L.docs)==null?void 0:G.source}}};var E,F,W;u.parameters={...u.parameters,docs:{...(E=u.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="tw:space-y-4">
      <div>
        <label htmlFor="basic-select" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
          Basic Select
        </label>
        <Select>
          <SelectTrigger id="basic-select" className="tw:w-48">
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
        <label htmlFor="default-select" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
          With Default Value
        </label>
        <Select defaultValue="b">
          <SelectTrigger id="default-select" className="tw:w-48">
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
        <label htmlFor="disabled-select" className="tw:mb-2 tw:block tw:text-sm tw:font-medium">
          Disabled
        </label>
        <Select disabled>
          <SelectTrigger id="disabled-select" className="tw:w-48">
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
}`,...(W=(F=u.parameters)==null?void 0:F.docs)==null?void 0:W.source}}};var _,P,K;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="tw:flex tw:gap-16 tw:items-start">
      <div className="tw:space-y-2">
        <p className="tw:text-sm tw:font-medium">popper (default)</p>
        <p className="tw:text-xs tw:text-muted-foreground tw:max-w-40">
          Popup drops below the trigger. Width is at least as wide as the trigger.
        </p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="A" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="genesis">Genesis</SelectItem>
            <SelectItem value="exodus">Exodus</SelectItem>
            <SelectItem value="leviticus">Leviticus</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="tw:space-y-2">
        <p className="tw:text-sm tw:font-medium">item-aligned</p>
        <p className="tw:text-xs tw:text-muted-foreground tw:max-w-40">
          Popup overlays the trigger, aligned to the selected item. Width matches content.
        </p>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="A" />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            <SelectItem value="genesis">Genesis</SelectItem>
            <SelectItem value="exodus">Exodus</SelectItem>
            <SelectItem value="leviticus">Leviticus</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: '**popper** (default) drops the popup below the trigger like a standard dropdown and constrains its minimum width to the trigger width. **item-aligned** overlays the popup on the trigger, positioning it so the selected item aligns with the trigger — useful when you want the list to appear "in place".'
      }
    }
  }
}`,...(K=(P=h.parameters)==null?void 0:P.docs)==null?void 0:K.source}}};var q,R,M;S.parameters={...S.parameters,docs:{...(q=S.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState('');
    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };
    return <div className="tw:space-y-4">
        <Select {...args} value={value} onValueChange={handleValueChange}>
          <SelectTrigger className="tw:w-48">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <div className="tw:text-sm tw:text-muted-foreground">
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
}`,...(M=(R=S.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};const ge=["Default","Framework","WithGroups","WithDefaultValue","Disabled","Variants","Position","Interactive"];export{o as Default,p as Disabled,n as Framework,S as Interactive,h as Position,u as Variants,m as WithDefaultValue,d as WithGroups,ge as __namedExportsOrder,Se as default};
