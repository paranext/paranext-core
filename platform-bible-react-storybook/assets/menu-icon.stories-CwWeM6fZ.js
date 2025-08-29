import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{M as t}from"./menu-icon.component-Cl35FoQo.js";import"./iframe-ChjBVkNN.js";import"./shadcn-ui.util-DMJ19wEV.js";const C={title:"Advanced/Menu/MenuItemIcon",component:t,tags:["autodocs"],parameters:{docs:{description:{component:`
A utility component for displaying icons in menu items.

This component provides:
- Icon display with proper sizing and positioning
- Support for leading and trailing icon positions
- Accessibility with alt text based on menu label
- Consistent styling across menu implementations

Used internally by menu components to render icons consistently.
        `}}},argTypes:{icon:{control:"text",description:"URL or path to the icon image"},menuLabel:{control:"text",description:"Label of the menu item for accessibility"},leading:{control:"boolean",description:"Whether the icon appears before (true) or after (false) the text",defaultValue:!1}}},v="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMzMzMzMzIi8+Cjwvc3ZnPgo=",c="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEwVjIwWk0xNCAyMFYxNEgxOFYyMEgxNFpNMyAxMkwxMiAzTDIxIDEySDE5VjIxSDVWMTJIM1oiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",d="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDhBNCA0IDAgMSAwIDEyIDE2QTQgNCAwIDAgMCAxMiA4Wk0xMiAxNEEyIDIgMCAxIDEgMTIgMTBBMiAyIDAgMCAxIDEyIDE0WiIgZmlsbD0iIzMzMzMzMyIvPgo8cGF0aCBkPSJNMjEuNSAxMS41TDIwLjUgMTFMMjAuNSAxMEwyMS41IDguNUwyMiA3TDIwLjUgNi41TDIwIDVMMTguNSA0LjVMMTcgNEwxNi41IDVMMTYgNi41TDE1IDdMMTQuNSA4LjVMMTUgMTBMMTYgMTFMMTYuNSAxMS41TDE3IDEyTDE4LjUgMTIuNUwyMCAxM0wyMC41IDEyTDIxLjUgMTEuNVoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==",s={args:{icon:v,menuLabel:"Sample Menu Item",leading:!0}},n={args:{icon:c,menuLabel:"Home",leading:!0},parameters:{docs:{description:{story:"Icon displayed before the menu text (leading position)."}}}},a={args:{icon:d,menuLabel:"Settings",leading:!1},parameters:{docs:{description:{story:"Icon displayed after the menu text (trailing position)."}}}},i={args:{icon:"",menuLabel:"Menu Item Without Icon",leading:!0},parameters:{docs:{description:{story:"Component returns undefined when no icon is provided."}}}},o={render:()=>e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Icon Size Demonstration"}),e.jsxs("div",{className:"tw-space-y-2",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-rounded tw-border tw-p-2",children:[e.jsx(t,{icon:c,menuLabel:"Home",leading:!0}),e.jsx("span",{className:"tw-text-sm",children:"Home (Leading)"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-rounded tw-border tw-p-2",children:[e.jsx("span",{className:"tw-text-sm",children:"Settings"}),e.jsx(t,{icon:d,menuLabel:"Settings",leading:!1})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-rounded tw-border tw-p-2",children:[e.jsx(t,{icon:v,menuLabel:"Star",leading:!0}),e.jsx("span",{className:"tw-text-sm",children:"Star (Leading)"})]})]}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Icons are constrained to max 20px (tw-max-h-5 tw-max-w-5) for consistent sizing."})]}),parameters:{docs:{description:{story:"Example showing how icons appear in actual menu-like contexts."}}}},r={render:()=>e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Accessibility Features"}),e.jsxs("div",{className:"tw-space-y-2",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-rounded tw-border tw-p-2",children:[e.jsx(t,{icon:c,menuLabel:"Dashboard",leading:!0}),e.jsx("span",{className:"tw-text-sm",children:"Dashboard"})]}),e.jsxs("div",{className:"tw-flex tw-items-center tw-rounded tw-border tw-p-2",children:[e.jsx("span",{className:"tw-text-sm",children:"User Profile"}),e.jsx(t,{icon:d,menuLabel:"User Profile",leading:!1})]})]}),e.jsxs("div",{className:"tw-space-y-1 tw-text-xs",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Alt text:"}),' "Leading icon for Dashboard"']}),e.jsxs("p",{children:[e.jsx("strong",{children:"Alt text:"}),' "Trailing icon for User Profile"']})]}),e.jsx("p",{className:"tw-text-xs tw-text-muted-foreground",children:"Icons include descriptive alt text that indicates position and menu item context."})]}),parameters:{docs:{description:{story:"Demonstrates the accessible alt text generation for screen readers."}}}};var l,m,p;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    icon: sampleIcon,
    menuLabel: 'Sample Menu Item',
    leading: true
  }
}`,...(p=(m=s.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,g,x;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    icon: homeIcon,
    menuLabel: 'Home',
    leading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon displayed before the menu text (leading position).'
      }
    }
  }
}`,...(x=(g=n.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var w,I,M;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    icon: settingsIcon,
    menuLabel: 'Settings',
    leading: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon displayed after the menu text (trailing position).'
      }
    }
  }
}`,...(M=(I=a.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var h,y,b;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    icon: '',
    menuLabel: 'Menu Item Without Icon',
    leading: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Component returns undefined when no icon is provided.'
      }
    }
  }
}`,...(b=(y=i.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var N,D,f;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="tw-space-y-4">
      <h3 className="tw-text-lg tw-font-semibold">Icon Size Demonstration</h3>
      <div className="tw-space-y-2">
        <div className="tw-flex tw-items-center tw-rounded tw-border tw-p-2">
          <MenuItemIcon icon={homeIcon} menuLabel="Home" leading />
          <span className="tw-text-sm">Home (Leading)</span>
        </div>
        <div className="tw-flex tw-items-center tw-rounded tw-border tw-p-2">
          <span className="tw-text-sm">Settings</span>
          <MenuItemIcon icon={settingsIcon} menuLabel="Settings" leading={false} />
        </div>
        <div className="tw-flex tw-items-center tw-rounded tw-border tw-p-2">
          <MenuItemIcon icon={sampleIcon} menuLabel="Star" leading />
          <span className="tw-text-sm">Star (Leading)</span>
        </div>
      </div>
      <p className="tw-text-xs tw-text-muted-foreground">
        Icons are constrained to max 20px (tw-max-h-5 tw-max-w-5) for consistent sizing.
      </p>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Example showing how icons appear in actual menu-like contexts.'
      }
    }
  }
}`,...(f=(D=o.parameters)==null?void 0:D.docs)==null?void 0:f.source}}};var j,A,L;r.parameters={...r.parameters,docs:{...(j=r.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="tw-space-y-4">
      <h3 className="tw-text-lg tw-font-semibold">Accessibility Features</h3>
      <div className="tw-space-y-2">
        <div className="tw-flex tw-items-center tw-rounded tw-border tw-p-2">
          <MenuItemIcon icon={homeIcon} menuLabel="Dashboard" leading />
          <span className="tw-text-sm">Dashboard</span>
        </div>
        <div className="tw-flex tw-items-center tw-rounded tw-border tw-p-2">
          <span className="tw-text-sm">User Profile</span>
          <MenuItemIcon icon={settingsIcon} menuLabel="User Profile" leading={false} />
        </div>
      </div>
      <div className="tw-space-y-1 tw-text-xs">
        <p>
          <strong>Alt text:</strong> &quot;Leading icon for Dashboard&quot;
        </p>
        <p>
          <strong>Alt text:</strong> &quot;Trailing icon for User Profile&quot;
        </p>
      </div>
      <p className="tw-text-xs tw-text-muted-foreground">
        Icons include descriptive alt text that indicates position and menu item context.
      </p>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the accessible alt text generation for screen readers.'
      }
    }
  }
}`,...(L=(A=r.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};const Z=["Default","LeadingIcon","TrailingIcon","NoIcon","IconSizeExample","AccessibilityExample"];export{r as AccessibilityExample,s as Default,o as IconSizeExample,n as LeadingIcon,i as NoIcon,a as TrailingIcon,Z as __namedExportsOrder,C as default};
