import{j as t}from"./iframe-D69FfaBZ.js";import{c as w}from"./utils-BPbySc-g.js";import"./preload-helper-CTOgD26E.js";function o({message:e,id:y,className:u}){return t.jsx("p",{role:"status","data-testid":y,className:w("tw:text-sm tw:text-muted-foreground",u),children:e})}o.__docgenInfo={description:'A presentational empty-state message for a list, grid, or panel that currently has nothing to\nshow. Renders the localized `message` in a `role="status"` region so screen readers announce it\nwhen the surrounding content becomes empty. Layout is left to the caller via `className`.\n\nFor a richer zero-state that needs media, a heading, or an action, use the `Empty` composition\n(`Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`)\ninstead.',methods:[],displayName:"EmptyState",props:{message:{required:!0,tsType:{name:"string"},description:"Localized message explaining why the region is empty and, ideally, what the user can do next."},id:{required:!1,tsType:{name:"string"},description:"Optional `data-testid` for locating the empty state (e.g. from an e2e test)."},className:{required:!1,tsType:{name:"string"},description:`Optional class name appended to the message element so the caller controls layout (centering,
spacing, emphasis).`}}};const E={title:"Basics/EmptyState",component:o,tags:["autodocs","test"],parameters:{docs:{description:{component:'\nA presentational empty-state message for a list, grid, or panel that has nothing to show.\n\n**Features:**\n- Renders the localized `message` in a `role="status"` region so screen readers announce it when the content becomes empty\n- Layout (centering, spacing, emphasis) is left to the caller via `className`\n- Optional `id` becomes a `data-testid` for e2e/test lookup\n\nFor a richer zero-state that needs media, a heading, or an action, use the [`Empty`](?path=/docs/shadcn-empty--docs) composition instead. `EmptyState` is the one-line case; `Empty` is the composed case.\n        '}}},argTypes:{message:{control:"text",description:"Localized message describing why the region is empty and what the user can do."},id:{control:"text",description:"Optional data-testid for locating the empty state."},className:{control:"text",description:"Optional class name appended to the message element for layout/styling."}},decorators:[e=>t.jsx("div",{className:"tw:p-4",children:t.jsx(e,{})})]},s={args:{message:"No texts to display. Open View Options to choose which texts to show."}},a={args:{message:"No texts to display. Open View Options to choose which texts to show.",className:"tw:text-center"},render:e=>t.jsx("div",{className:"tw:flex tw:h-40 tw:items-center tw:justify-center tw:rounded tw:border",children:t.jsx(o,{...e})}),parameters:{docs:{description:{story:"Filling a grid body: the caller supplies a centering wrapper and passes `tw:text-center`."}}}},n={args:{message:"No texts added yet. Use Get resources to add them.",className:"tw:py-1 tw:italic"},parameters:{docs:{description:{story:"Inside a panel section: an inline, italic hint sitting above a list."}}}};var r,i,c;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    message: 'No texts to display. Open View Options to choose which texts to show.'
  }
}`,...(c=(i=s.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var d,p,l;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    message: 'No texts to display. Open View Options to choose which texts to show.',
    className: 'tw:text-center'
  },
  render: args => <div className="tw:flex tw:h-40 tw:items-center tw:justify-center tw:rounded tw:border">
      <EmptyState {...args} />
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Filling a grid body: the caller supplies a centering wrapper and passes \`tw:text-center\`.'
      }
    }
  }
}`,...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var m,h,g;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    message: 'No texts added yet. Use Get resources to add them.',
    className: 'tw:py-1 tw:italic'
  },
  parameters: {
    docs: {
      description: {
        story: 'Inside a panel section: an inline, italic hint sitting above a list.'
      }
    }
  }
}`,...(g=(h=n.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const O=["Default","Centered","Inline"];export{a as Centered,s as Default,n as Inline,O as __namedExportsOrder,E as default};
