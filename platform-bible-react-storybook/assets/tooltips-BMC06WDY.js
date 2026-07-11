import{j as e,M as m}from"./iframe-BKOggoAO.js";import{useMDXComponents as x}from"./index-DZKez9Oj.js";import{B as o}from"./button-DJJbP5Mh.js";import{T as r,a as s,b as a,c as l}from"./tooltip-7gmOdMmq.js";import{K as j,a as h}from"./kbd-G3f2bn5N.js";import{E as d,a as n}from"./example-block.component-krQTHBa-.js";import{S as c}from"./save-Evi9i9Fy.js";import{I as p}from"./info-Bb_euEux.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-BwqOFUaJ.js";import"./z-index-CoNkaVR8.js";import"./index-BN0fWOl8.js";import"./index-9NE6y8HQ.js";import"./index-96H_U_DX.js";import"./index-B4UPmRYF.js";import"./index-D6ZGOYzH.js";import"./index-BzgSO8CO.js";import"./index-CPWyjS2m.js";import"./index-0qCGaMRR.js";import"./index-CyA-yTcG.js";import"./index-dDO-xXGJ.js";import"./index-DLzN4pAV.js";import"./createLucideIcon-B_YJVc2I.js";import"./chevron-down-WxXvQcGh.js";function u(i){const t={a:"a",code:"code",div:"div",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",span:"span",strong:"strong",ul:"ul",...x(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(m,{title:"Guidelines/Tooltips"}),`
`,e.jsx(t.h1,{id:"tooltips",children:"Tooltips"}),`
`,e.jsx(t.p,{children:`Tooltips are required for every icon button and any control without a visible label — including
toolbar items. Tooltips are supplementary: if the tooltip would only repeat the visible label,
omit it. Keep tooltip text short enough to scan at a glance.`}),`
`,e.jsx(t.h2,{id:"required-contexts",children:"Required contexts"}),`
`,e.jsx(t.p,{children:`Tooltips are required for every icon button and any control without a visible label — including
toolbar items.`}),`
`,e.jsxs(d,{children:[e.jsx(n,{variant:"avoid",previewClassName:"tw:pb-8",preview:e.jsx(r,{children:e.jsx(o,{variant:"outline",size:"icon","aria-label":"Save",children:e.jsx(c,{})})}),children:e.jsx(t.p,{children:"This icon button lacks a tooltip, so users can't learn what it means."})}),e.jsx(n,{title:"Avoid redundant tooltips",variant:"avoid",previewClassName:"tw:pb-8",preview:e.jsx(r,{children:e.jsxs(s,{open:!0,children:[e.jsx(a,{asChild:!0,children:e.jsx(o,{children:"Save"})}),e.jsx(l,{side:"bottom",children:"Save"})]})}),children:e.jsx(t.p,{children:"The tooltip only repeats the visible label — omit it."})})]}),`
`,e.jsx(t.h2,{id:"keep-text-short",children:"Keep text short"}),`
`,e.jsx(t.p,{children:"Tooltip text must be short enough to scan at a glance. A tooltip is a hint, not an explanation."}),`
`,e.jsxs(d,{children:[e.jsx(n,{variant:"avoid",previewClassName:"tw:pb-16",preview:e.jsx(r,{children:e.jsxs(s,{open:!0,children:[e.jsx(a,{asChild:!0,children:e.jsx(o,{variant:"outline",size:"icon","aria-label":"Save",children:e.jsx(c,{})})}),e.jsx(l,{side:"bottom",className:"tw:max-w-[200px]",children:"Click this button to apply your changes and save the current document"})]})}),children:e.jsx(t.p,{children:"Too long to scan — a tooltip is a hint, not a sentence."})}),e.jsx(n,{variant:"prefer",previewClassName:"tw:pb-16",preview:e.jsx(r,{children:e.jsxs(s,{open:!0,children:[e.jsx(a,{asChild:!0,children:e.jsx(o,{variant:"outline",size:"icon","aria-label":"Save",children:e.jsx(c,{})})}),e.jsx(l,{side:"bottom",children:"Save changes"})]})}),children:e.jsx(t.p,{children:"The tooltip adds meaning an icon alone cannot convey, and it's short enough to read at a glance."})})]}),`
`,e.jsx(t.h2,{id:"keyboard-shortcuts-in-tooltips",children:"Keyboard shortcuts in tooltips"}),`
`,e.jsxs(t.p,{children:["Render keyboard shortcut hints using the ",e.jsx(t.code,{children:"Kbd"}),` component, not plain text in parentheses. The
`,e.jsx(t.code,{children:"Kbd"})," styling provides sufficient visual distinction on its own — no parentheses needed."]}),`
`,e.jsxs(d,{children:[e.jsx(n,{variant:"avoid",preview:e.jsx(t.span,{children:"Undo (⌘Z)"}),code:"Undo (⌘Z)",children:e.jsx(t.p,{children:`Parentheses blend into prose and don't signal "keyboard shortcut" to the reader.`})}),e.jsx(n,{variant:"prefer",preview:e.jsxs(t.span,{children:["Undo ",e.jsxs(j,{children:[e.jsx(h,{children:"⌘"}),e.jsx(h,{children:"Z"})]})]}),code:"Undo <KbdGroup><Kbd>⌘</Kbd><Kbd>Z</Kbd></KbdGroup>",children:e.jsxs(t.p,{children:["The ",e.jsx("code",{children:"Kbd"})," component provides visual distinction without extra punctuation."]})})]}),`
`,e.jsxs(t.p,{children:["For which symbol or word to use per key on each OS, see ",e.jsx(t.a,{href:"./keyboard-shortcuts.mdx",children:"Keyboard shortcuts"}),"."]}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{id:"when-to-use-a-tooltip",children:"When to use a tooltip"}),`
`,e.jsxs(t.p,{children:["Use a ",e.jsx(t.code,{children:"Tooltip"}),` when the extra information is purely supplemental — the UI is fully usable without
it, it is triggered only by hover or keyboard focus, and it contains no interactive elements.`]}),`
`,e.jsx(t.h3,{id:"tooltip-like-overlays-with-redundant-links",children:"Tooltip-like overlays with redundant links"}),`
`,e.jsxs(d,{children:[e.jsx(n,{variant:"neutral",title:"Currently valid",previewClassName:"tw:pb-12",preview:e.jsx(r,{children:e.jsxs(s,{open:!0,children:[e.jsx(a,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"icon","aria-label":"API key info",children:e.jsx(p,{})})}),e.jsx(l,{side:"bottom",children:"Used to authenticate requests."})]})}),children:e.jsx(t.p,{children:"A tooltip with supplemental text only — no link needed."})}),e.jsx(n,{variant:"under-consideration",previewClassName:"tw:pb-12",preview:e.jsxs(t.div,{className:"tw:relative tw:inline-flex tw:items-center tw:justify-center",children:[e.jsx(o,{variant:"ghost",size:"icon","aria-label":"API key info",children:e.jsx(p,{})}),e.jsxs(t.div,{className:"tw:absolute tw:top-full tw:left-1/2 tw:-translate-x-1/2 tw:mt-2 tw:rounded-md tw:border tw:border-border tw:bg-popover tw:px-3 tw:py-1.5 tw:text-xs tw:text-popover-foreground tw:shadow-md tw:whitespace-nowrap",children:["Used to authenticate requests."," ",e.jsx(t.a,{href:"#",className:"tw:text-primary tw:underline",children:"Learn more →"})]})]}),children:e.jsx(t.p,{children:`A hover-triggered overlay that looks and feels like a tooltip but can contain a
single supplemental navigation link.`})})]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"This pattern is not yet adopted."}),` It must not be implemented without explicit UX sign-off.
Patterns like this need agreement across the team and a formal addition to the style guide;
ad-hoc implementations by individual contributors are not acceptable.`]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"If adopted, the requirements would be:"})}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[`Must use a component with an appropriate ARIA role that supports interactive content (e.g. a
hover-card or popover-style overlay) — `,e.jsx(t.strong,{children:"not"})," the ",e.jsx(t.code,{children:"Tooltip"}),` component, which carries
`,e.jsx(t.code,{children:'role="tooltip"'})," and cannot safely contain links."]}),`
`,e.jsxs(t.li,{children:["The link must be ",e.jsx(t.strong,{children:"redundant"}),`: the same destination must already be reachable by another path
in the UI. The overlay link is a shortcut, never the only route. This also makes the
keyboard-accessibility concern acceptable — users who cannot reach the hover-triggered link can
always navigate to the destination the regular way.`]}),`
`,e.jsx(t.li,{children:`A single link only. Multiple links or other interactive controls push the pattern into standard
Popover territory.`}),`
`]}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{id:"when-to-use-a-popover-instead",children:"When to use a popover instead"}),`
`,e.jsxs(t.p,{children:["Use a ",e.jsx(t.code,{children:"Popover"})," when any of the following apply:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The content requires keyboard focus, multiple controls, links, form fields, or any meaningful interaction."}),`
`,e.jsx(t.li,{children:"The content must stay open while the user acts on it."}),`
`]}),`
`,e.jsxs(t.p,{children:["The tooltip role is not in the tab order and cannot contain interactive elements. Our ",e.jsx(t.code,{children:"Tooltip"}),`
component is Radix-based — it carries `,e.jsx(t.code,{children:'role="tooltip"'}),` and dismisses on pointer-leave and blur.
A link inside it cannot be reached by keyboard and is nearly unreachable by mouse before the
tooltip closes.`]}),`
`,e.jsxs(t.p,{children:[`A concrete example: an info icon next to "API key" could show a tooltip saying
"Used to authenticate requests." But if the panel also includes a `,e.jsx(t.em,{children:"Copy key"}),` button,
that interaction belongs in a click-triggered popover, not a tooltip.`]})]})}function F(i={}){const{wrapper:t}={...x(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(u,{...i})}):u(i)}export{F as default};
