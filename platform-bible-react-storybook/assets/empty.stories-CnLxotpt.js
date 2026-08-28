import{j as e}from"./iframe-Cze7um0c.js";import{B as R}from"./button-BlDhwh1l.js";import{c as K}from"./index-BnuTq2W6.js";import{c as i}from"./utils-BPbySc-g.js";import{c as W}from"./createLucideIcon-CLWhrR-x.js";import{S as P}from"./search-C68reAlF.js";import"./preload-helper-CTOgD26E.js";import"./index-jQQZmfBT.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",key:"mhlwft"}]],q=W("file-question-mark",L);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],O=W("folder-open",G);function s({className:t,...n}){return e.jsx("div",{"data-slot":"empty",className:i("pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",t),...n})}function r({className:t,...n}){return e.jsx("div",{"data-slot":"empty-header",className:i("pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",t),...n})}const J=K("tw:mb-2 tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0",{variants:{variant:{default:"tw:bg-transparent",icon:"tw:flex tw:size-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:bg-muted tw:text-foreground tw:[&_svg:not([class*=size-])]:size-4"}},defaultVariants:{variant:"default"}});function d({className:t,variant:n="default",...F}){return e.jsx("div",{"data-slot":"empty-icon","data-variant":n,className:i("pr-twp",J({variant:n}),t),...F})}function o({className:t,...n}){return e.jsx("div",{"data-slot":"empty-title",className:i("pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",t),...n})}function a({className:t,...n}){return e.jsx("div",{"data-slot":"empty-description",className:i("pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",t),...n})}function w({className:t,...n}){return e.jsx("div",{"data-slot":"empty-content",className:i("pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",t),...n})}s.__docgenInfo={description:`The Empty component displays a centered zero-state message — typically a title, description, and
an optional action — for when there is no content to show. The component is built and styled by
Shadcn UI.

Use this composition when the zero-state needs media, a heading, or an action. For a plain
one-line "nothing to show" message inside a list, grid, or panel, use {@link EmptyState} instead —
it takes a single localized \`message\` and renders it in a \`role="status"\` region. These
primitives set no ARIA role, so pass \`role="status"\` yourself before the zero-state appears.

Two things the caller controls: the root sets \`border-dashed\` but no border width —
Platform.Bible's scoped Tailwind Preflight zeroes borders, so pass \`className="tw:border"\` to
draw the dashed outline — and {@link EmptyTitle} renders a \`<div>\`, not a heading, so nest your
own heading element inside it when the zero-state is a region's entire content.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"Empty"};r.__docgenInfo={description:`Container for the Empty component's icon/media, title, and description. The component is built
and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"EmptyHeader"};o.__docgenInfo={description:`The Empty component's title text. The component is built and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"EmptyTitle"};a.__docgenInfo={description:`The Empty component's description text. The component is built and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"EmptyDescription"};w.__docgenInfo={description:`Container for the Empty component's main content, typically actions such as buttons. The
component is built and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"EmptyContent"};d.__docgenInfo={description:`Container for the Empty component's icon or other media, e.g. an illustration or avatar. The
component is built and styled by Shadcn UI.

@see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/radix/empty}`,methods:[],displayName:"EmptyMedia",props:{variant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const{fn:V}=__STORYBOOK_MODULE_TEST__,se={title:"Shadcn/Empty",component:s,tags:["autodocs","test"],parameters:{docs:{description:{component:'\nA centered zero-state composition for when there is no content to show.\n\n**Choosing between this and `EmptyState`:**\n- Use `Empty` when the zero-state needs media, a heading, or an action.\n- Use [`EmptyState`](?path=/docs/basics-emptystate--docs) for a plain one-line message inside a list, grid, or panel — it takes a single localized `message` and renders it in a `role="status"` region.\n\n**Two things the caller controls:**\n- These primitives set no ARIA role. Pass `role="status"` yourself, and mount it before the content changes — see the `LiveRegion` story.\n- The root sets `border-dashed` but no border width, so pass `className="tw:border"` to draw the dashed outline.\n- `EmptyTitle` renders a `<div>`, not a heading. Nest your own heading element inside it when the zero-state is a region\'s entire content.\n        '}}},argTypes:{className:{control:"text"}},decorators:[t=>e.jsx("div",{className:"tw:max-w-lg tw:p-4",children:e.jsx(t,{})})]},c={render:t=>e.jsx(s,{...t,children:e.jsxs(r,{children:[e.jsx(o,{children:"No projects"}),e.jsx(a,{children:"Projects you open will appear here."})]})}),parameters:{docs:{description:{story:"A zero-state with just a title and description."}}}},p={render:t=>e.jsx(s,{...t,children:e.jsxs(r,{children:[e.jsx(d,{variant:"icon",children:e.jsx(O,{})}),e.jsx(o,{children:"No projects"}),e.jsx(a,{children:"Projects you open will appear here."})]})}),parameters:{docs:{description:{story:"The `icon` variant of `EmptyMedia` renders the icon in a small muted rounded container."}}}},m={render:t=>e.jsx(s,{...t,children:e.jsxs(r,{children:[e.jsx(d,{children:e.jsx(q,{className:"tw:size-10 tw:text-muted-foreground"})}),e.jsx(o,{children:"Nothing to show"}),e.jsx(a,{children:"The default media variant adds no background, so it suits larger illustrations."})]})}),parameters:{docs:{description:{story:"The `default` variant of `EmptyMedia` is a transparent container for a larger icon or illustration."}}}},l={render:t=>e.jsxs(s,{...t,children:[e.jsxs(r,{children:[e.jsx(d,{variant:"icon",children:e.jsx(P,{})}),e.jsx(o,{children:"No results found"}),e.jsx(a,{children:"No projects match your search. Try a different term or clear the filters."})]}),e.jsx(w,{children:e.jsx(R,{onClick:V(),children:"Clear filters"})})]}),parameters:{docs:{description:{story:"A zero-state with a call to action in `EmptyContent`."}}}},h={render:t=>e.jsx(s,{...t,className:"tw:border",children:e.jsxs(r,{children:[e.jsx(d,{variant:"icon",children:e.jsx(O,{})}),e.jsx(o,{children:"No projects"}),e.jsx(a,{children:"Empty sets a dashed border style but no border width, so the caller adds a border width to draw the outline."})]})}),parameters:{docs:{description:{story:"The dashed outline only renders when the caller supplies a border width via `className`."}}}},y={render:t=>e.jsx("div",{className:"tw:w-[300px] tw:border tw:border-border",children:e.jsxs(s,{...t,children:[e.jsxs(r,{children:[e.jsx(d,{variant:"icon",children:e.jsx(P,{})}),e.jsx(o,{children:"No results found"}),e.jsx(a,{children:"No projects match your search. Try a different term or clear the filters."})]}),e.jsx(w,{children:e.jsx(R,{onClick:V(),children:"Clear filters"})})]})}),parameters:{docs:{description:{story:"The same content at the 300px minimum width that `Guidelines/Responsiveness` mandates for web views. The outer border marks the 300px boundary; `tw:p-6` on the root spends 48px of it, and `EmptyContent` stacks its actions in a column."}}}},u={render:t=>e.jsx(s,{...t,role:"status",children:e.jsxs(r,{children:[e.jsx(o,{children:"No comments"}),e.jsx(a,{children:"Keep the status region mounted across the change so screen readers announce the new message."})]})}),parameters:{docs:{description:{story:'\nThe `Empty` primitives set no ARIA role, so pass `role="status"` yourself for a zero-state that replaces content the user was reading.\n\nPlacement matters more than the role: assistive tech announces *mutations* to a live region that is already in the accessibility tree. Mounting the region and its text in one commit — the shape this static story shows — typically announces nothing in NVDA or JAWS. Keep the `role="status"` element mounted across the transition and swap only its text.\n\nScope it too: `role="status"` on the `Empty` root makes every button label inside `EmptyContent` announced content, so prefer the role on `EmptyHeader` or on the description when the zero-state has actions.\n        '}}}};var f,E,x;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <Empty {...args}>
      <EmptyHeader>
        <EmptyTitle>No projects</EmptyTitle>
        <EmptyDescription>Projects you open will appear here.</EmptyDescription>
      </EmptyHeader>
    </Empty>,
  parameters: {
    docs: {
      description: {
        story: 'A zero-state with just a title and description.'
      }
    }
  }
}`,...(x=(E=c.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};var g,j,b;p.parameters={...p.parameters,docs:{...(g=p.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No projects</EmptyTitle>
        <EmptyDescription>Projects you open will appear here.</EmptyDescription>
      </EmptyHeader>
    </Empty>,
  parameters: {
    docs: {
      description: {
        story: 'The \`icon\` variant of \`EmptyMedia\` renders the icon in a small muted rounded container.'
      }
    }
  }
}`,...(b=(j=p.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};var v,T,N;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia>
          <FileQuestion className="tw:size-10 tw:text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>Nothing to show</EmptyTitle>
        <EmptyDescription>
          The default media variant adds no background, so it suits larger illustrations.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>,
  parameters: {
    docs: {
      description: {
        story: 'The \`default\` variant of \`EmptyMedia\` is a transparent container for a larger icon or illustration.'
      }
    }
  }
}`,...(N=(T=m.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var S,k,D;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          No projects match your search. Try a different term or clear the filters.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={fn()}>Clear filters</Button>
      </EmptyContent>
    </Empty>,
  parameters: {
    docs: {
      description: {
        story: 'A zero-state with a call to action in \`EmptyContent\`.'
      }
    }
  }
}`,...(D=(k=l.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var M,C,_;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <Empty {...args} className="tw:border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No projects</EmptyTitle>
        <EmptyDescription>
          Empty sets a dashed border style but no border width, so the caller adds a border width to
          draw the outline.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>,
  parameters: {
    docs: {
      description: {
        story: 'The dashed outline only renders when the caller supplies a border width via \`className\`.'
      }
    }
  }
}`,...(_=(C=h.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};var I,z,A;y.parameters={...y.parameters,docs:{...(I=y.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <div className="tw:w-[300px] tw:border tw:border-border">
      <Empty {...args}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Search />
          </EmptyMedia>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            No projects match your search. Try a different term or clear the filters.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={fn()}>Clear filters</Button>
        </EmptyContent>
      </Empty>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'The same content at the 300px minimum width that \`Guidelines/Responsiveness\` mandates for web views. The outer border marks the 300px boundary; \`tw:p-6\` on the root spends 48px of it, and \`EmptyContent\` stacks its actions in a column.'
      }
    }
  }
}`,...(A=(z=y.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var H,U,B;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: args => <Empty {...args} role="status">
      <EmptyHeader>
        <EmptyTitle>No comments</EmptyTitle>
        <EmptyDescription>
          Keep the status region mounted across the change so screen readers announce the new
          message.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>,
  parameters: {
    docs: {
      description: {
        story: \`
The \\\`Empty\\\` primitives set no ARIA role, so pass \\\`role="status"\\\` yourself for a zero-state that replaces content the user was reading.

Placement matters more than the role: assistive tech announces *mutations* to a live region that is already in the accessibility tree. Mounting the region and its text in one commit — the shape this static story shows — typically announces nothing in NVDA or JAWS. Keep the \\\`role="status"\\\` element mounted across the transition and swap only its text.

Scope it too: \\\`role="status"\\\` on the \\\`Empty\\\` root makes every button label inside \\\`EmptyContent\\\` announced content, so prefer the role on \\\`EmptyHeader\\\` or on the description when the zero-state has actions.
        \`
      }
    }
  }
}`,...(B=(U=u.parameters)==null?void 0:U.docs)==null?void 0:B.source}}};const re=["Simple","WithIconMedia","WithDefaultMedia","WithAction","DashedBorder","NarrowWidth","LiveRegion"];export{h as DashedBorder,u as LiveRegion,y as NarrowWidth,c as Simple,l as WithAction,m as WithDefaultMedia,p as WithIconMedia,re as __namedExportsOrder,se as default};
