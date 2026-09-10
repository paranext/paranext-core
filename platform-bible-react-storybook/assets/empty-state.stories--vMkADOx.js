import{j as a}from"./iframe-Bqm5z7L0.js";import{E as g}from"./empty-state.component-A8loBI0G.js";import"./preload-helper-CTOgD26E.js";import"./utils-BPbySc-g.js";const f={title:"Basics/EmptyState",component:g,tags:["autodocs","test"],parameters:{docs:{description:{component:'\nA presentational empty-state message for a list, grid, or panel that has nothing to show.\n\n**Features:**\n- Renders the localized `message` in a `role="status"` region so screen readers announce it when the content becomes empty\n- Layout (centering, spacing, emphasis) is left to the caller via `className`\n- Optional `id` becomes a `data-testid` for e2e/test lookup\n\nFor a richer zero-state that needs media, a heading, or an action, use the [`Empty`](?path=/docs/shadcn-empty--docs) composition instead. `EmptyState` is the one-line case; `Empty` is the composed case.\n        '}}},argTypes:{message:{control:"text",description:"Localized message describing why the region is empty and what the user can do."},id:{control:"text",description:"Optional data-testid for locating the empty state."},className:{control:"text",description:"Optional class name appended to the message element for layout/styling."}},decorators:[o=>a.jsx("div",{className:"tw:p-4",children:a.jsx(o,{})})]},e={args:{message:"No texts to display. Open View Options to choose which texts to show."}},t={args:{message:"No texts to display. Open View Options to choose which texts to show.",className:"tw:text-center"},render:o=>a.jsx("div",{className:"tw:flex tw:h-40 tw:items-center tw:justify-center tw:rounded tw:border",children:a.jsx(g,{...o})}),parameters:{docs:{description:{story:"Filling a grid body: the caller supplies a centering wrapper and passes `tw:text-center`."}}}},s={args:{message:"No texts added yet. Use Get resources to add them.",className:"tw:py-1 tw:italic"},parameters:{docs:{description:{story:"Inside a panel section: an inline, italic hint sitting above a list."}}}};var n,r,i;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    message: 'No texts to display. Open View Options to choose which texts to show.'
  }
}`,...(i=(r=e.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};var c,d,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var l,m,h;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(h=(m=s.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};const N=["Default","Centered","Inline"];export{t as Centered,e as Default,s as Inline,N as __namedExportsOrder,f as default};
