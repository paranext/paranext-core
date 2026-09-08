import{j as e}from"./iframe-Cp-z13My.js";import{B}from"./button-zrfk9vc0.js";import{E as r,a as n,b as a,c as s,d as o,e as R}from"./empty-CWNCTagz.js";import{c as W}from"./createLucideIcon-CfD4M_VI.js";import{S as O}from"./search-DZ_hKb_Q.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-BDiIUCVm.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M12 17h.01",key:"p32p05"}],["path",{d:"M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3",key:"mhlwft"}]],K=W("file-question-mark",F);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],P=W("folder-open",L),{fn:I}=__STORYBOOK_MODULE_TEST__,Z={title:"Shadcn/Empty",component:r,tags:["autodocs","test"],parameters:{docs:{description:{component:'\nA centered zero-state composition for when there is no content to show.\n\n**Choosing between this and `EmptyState`:**\n- Use `Empty` when the zero-state needs media, a heading, or an action.\n- Use [`EmptyState`](?path=/docs/basics-emptystate--docs) for a plain one-line message inside a list, grid, or panel — it takes a single localized `message` and renders it in a `role="status"` region.\n\n**Two things the caller controls:**\n- These primitives set no ARIA role. Pass `role="status"` yourself, and mount it before the content changes — see the `LiveRegion` story.\n- The root sets `border-dashed` but no border width, so pass `className="tw:border"` to draw the dashed outline.\n- `EmptyTitle` renders a `<div>`, not a heading. Nest your own heading element inside it when the zero-state is a region\'s entire content.\n        '}}},argTypes:{className:{control:"text"}},decorators:[t=>e.jsx("div",{className:"tw:max-w-lg tw:p-4",children:e.jsx(t,{})})]},i={render:t=>e.jsx(r,{...t,children:e.jsxs(n,{children:[e.jsx(s,{children:"No projects"}),e.jsx(o,{children:"Projects you open will appear here."})]})}),parameters:{docs:{description:{story:"A zero-state with just a title and description."}}}},d={render:t=>e.jsx(r,{...t,children:e.jsxs(n,{children:[e.jsx(a,{variant:"icon",children:e.jsx(P,{})}),e.jsx(s,{children:"No projects"}),e.jsx(o,{children:"Projects you open will appear here."})]})}),parameters:{docs:{description:{story:"The `icon` variant of `EmptyMedia` renders the icon in a small muted rounded container."}}}},c={render:t=>e.jsx(r,{...t,children:e.jsxs(n,{children:[e.jsx(a,{children:e.jsx(K,{className:"tw:size-10 tw:text-muted-foreground"})}),e.jsx(s,{children:"Nothing to show"}),e.jsx(o,{children:"The default media variant adds no background, so it suits larger illustrations."})]})}),parameters:{docs:{description:{story:"The `default` variant of `EmptyMedia` is a transparent container for a larger icon or illustration."}}}},p={render:t=>e.jsxs(r,{...t,children:[e.jsxs(n,{children:[e.jsx(a,{variant:"icon",children:e.jsx(O,{})}),e.jsx(s,{children:"No results found"}),e.jsx(o,{children:"No projects match your search. Try a different term or clear the filters."})]}),e.jsx(R,{children:e.jsx(B,{onClick:I(),children:"Clear filters"})})]}),parameters:{docs:{description:{story:"A zero-state with a call to action in `EmptyContent`."}}}},m={render:t=>e.jsx(r,{...t,className:"tw:border",children:e.jsxs(n,{children:[e.jsx(a,{variant:"icon",children:e.jsx(P,{})}),e.jsx(s,{children:"No projects"}),e.jsx(o,{children:"Empty sets a dashed border style but no border width, so the caller adds a border width to draw the outline."})]})}),parameters:{docs:{description:{story:"The dashed outline only renders when the caller supplies a border width via `className`."}}}},l={render:t=>e.jsx("div",{className:"tw:w-[300px] tw:border tw:border-border",children:e.jsxs(r,{...t,children:[e.jsxs(n,{children:[e.jsx(a,{variant:"icon",children:e.jsx(O,{})}),e.jsx(s,{children:"No results found"}),e.jsx(o,{children:"No projects match your search. Try a different term or clear the filters."})]}),e.jsx(R,{children:e.jsx(B,{onClick:I(),children:"Clear filters"})})]})}),parameters:{docs:{description:{story:"The same content at the 300px minimum width that `Guidelines/Responsiveness` mandates for web views. The outer border marks the 300px boundary; `tw:p-6` on the root spends 48px of it, and `EmptyContent` stacks its actions in a column."}}}},h={render:t=>e.jsx(r,{...t,role:"status",children:e.jsxs(n,{children:[e.jsx(s,{children:"No comments"}),e.jsx(o,{children:"Keep the status region mounted across the change so screen readers announce the new message."})]})}),parameters:{docs:{description:{story:'\nThe `Empty` primitives set no ARIA role, so pass `role="status"` yourself for a zero-state that replaces content the user was reading.\n\nPlacement matters more than the role: assistive tech announces *mutations* to a live region that is already in the accessibility tree. Mounting the region and its text in one commit — the shape this static story shows — typically announces nothing in NVDA or JAWS. Keep the `role="status"` element mounted across the transition and swap only its text.\n\nScope it too: `role="status"` on the `Empty` root makes every button label inside `EmptyContent` announced content, so prefer the role on `EmptyHeader` or on the description when the zero-state has actions.\n        '}}}};var y,u,E;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(E=(u=i.parameters)==null?void 0:u.docs)==null?void 0:E.source}}};var f,w,x;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(x=(w=d.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var g,j,T;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(T=(j=c.parameters)==null?void 0:j.docs)==null?void 0:T.source}}};var b,v,N;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(N=(v=p.parameters)==null?void 0:v.docs)==null?void 0:N.source}}};var M,S,C;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(C=(S=m.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var D,k,H;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(H=(k=l.parameters)==null?void 0:k.docs)==null?void 0:H.source}}};var A,z,_;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(_=(z=h.parameters)==null?void 0:z.docs)==null?void 0:_.source}}};const ee=["Simple","WithIconMedia","WithDefaultMedia","WithAction","DashedBorder","NarrowWidth","LiveRegion"];export{m as DashedBorder,h as LiveRegion,l as NarrowWidth,i as Simple,p as WithAction,c as WithDefaultMedia,d as WithIconMedia,ee as __namedExportsOrder,Z as default};
