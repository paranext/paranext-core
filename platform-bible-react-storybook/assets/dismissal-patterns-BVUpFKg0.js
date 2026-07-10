import{j as e,M as o}from"./iframe-C5EseNWy.js";import{useMDXComponents as i}from"./index-MLO-NVwB.js";import"./preload-helper-CTOgD26E.js";function t(n){const s={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Guidelines/Dismissal Patterns"}),`
`,e.jsx(s.h1,{id:"dismissal-patterns",children:"Dismissal Patterns"}),`
`,e.jsxs(s.p,{children:[`When a transient surface is open — a popover, menu, inline editor, panel — something has to
decide `,e.jsx(s.em,{children:"when it closes again"}),'. "Dismissal" is that behavior. This page defines the ',e.jsx(s.strong,{children:`three
dismissal patterns`})," we use, when to reach for each, and the one case our stack does ",e.jsx(s.strong,{children:"not"}),` handle
for free: `,e.jsx(s.strong,{children:"iframe (WebView) boundaries"}),"."]}),`
`,e.jsx(s.p,{children:`This is a UX pattern, not a component. Most surfaces are built on shadcn/Radix primitives that
already implement dismissal; your job is to pick the right pattern and wire the Radix props
accordingly — and to add the iframe supplement when it matters.`}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Scope."})," This page is about ",e.jsx(s.em,{children:"which interactions dismiss a surface"}),". It is ",e.jsx(s.strong,{children:`orthogonal to
modality`})," — whether the rest of the UI is inert and focus is trapped. A ",e.jsx(s.code,{children:"Dialog"}),` can be modal
`,e.jsx(s.em,{children:"and"}),` use Explicit dismissal. Modal vs non-modal, touch long-press, and right-click context menus
are out of scope here.`]}),`
`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"pick-a-pattern-by-how-transient-the-surface-is",children:"Pick a pattern by how transient the surface is"}),`
`,e.jsxs(s.p,{children:["The three patterns differ only in ",e.jsx(s.strong,{children:"which interactions dismiss the surface"}),`. Read the table
top-to-bottom as "least sticky" to "most sticky".`]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Pattern"}),e.jsx(s.th,{style:{textAlign:"center"},children:"Outside press"}),e.jsx(s.th,{style:{textAlign:"center"},children:"Escape"}),e.jsx(s.th,{style:{textAlign:"center"},children:"Outside scroll"}),e.jsx(s.th,{style:{textAlign:"center"},children:"Focus → foreign WebView"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.strong,{children:"Light dismissal"})}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.strong,{children:"Click-away dismissal"})}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✗"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.strong,{children:"Explicit dismissal"})}),e.jsx(s.td,{style:{textAlign:"center"},children:"✗"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✗"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✗"})]})]})]}),`
`,e.jsxs(s.p,{children:["The last column is ",e.jsx(s.strong,{children:"focus moving into a different surface or WebView"})," — ",e.jsx(s.em,{children:"not"}),` the window merely
losing focus (alt-tab, DevTools). A plain window switch does not dismiss anything; see
`,e.jsx(s.a,{href:"#the-iframe-webview-gap",children:"the iframe section"}),"."]}),`
`,e.jsx(s.h3,{id:"light-dismissal",children:"Light dismissal"}),`
`,e.jsx(s.p,{children:"The surface gets out of the way the moment attention moves anywhere else — including a scroll."}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Use for:"})," transient popovers, hover cards, and non-critical menus you only ",e.jsx(s.em,{children:"glance"}),` at — they
should vanish the moment you look or scroll away.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Don't use for:"})," anything holding text the user is typing. (And not tooltips/hints — see below.)"]}),`
`]}),`
`,e.jsx(s.h3,{id:"click-away-dismissal",children:"Click-away dismissal"}),`
`,e.jsxs(s.p,{children:["Closes on a deliberate click elsewhere or Escape, but ",e.jsx(s.strong,{children:"stays open while the user scrolls"}),` the
content behind it. This is the right default for popovers and panels that act as a temporary
"layer" over scrollable content.`]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Use for:"})," filter panels, detail popovers, secondary controls you might consult ",e.jsx(s.em,{children:"while"}),`
scrolling the page behind them.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"The scroll column is the whole reason this pattern exists"})," — it's the difference from Light."]}),`
`]}),`
`,e.jsx(s.h3,{id:"explicit-dismissal",children:"Explicit dismissal"}),`
`,e.jsxs(s.p,{children:[`Only a deliberate action closes it: Escape, a close button, or completing the task (submit /
select). Outside clicks, scroll, and focus loss are `,e.jsx(s.strong,{children:"ignored"}),` so the user never loses in-progress
work by accident.`]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Use for:"}),` inline editors, comment composers, multi-step forms in a popover — anywhere an
accidental outside click would discard work.`]}),`
`]}),`
`,e.jsx(s.h3,{id:"not-on-this-axis-tooltips--hints",children:"Not on this axis: tooltips & hints"}),`
`,e.jsxs(s.p,{children:[`Tooltips and hints aren't a fourth, "weakest" pattern. This axis is about which `,e.jsx(s.strong,{children:`outside
interactions`})," dismiss an ",e.jsx(s.strong,{children:"open, interactive"}),` surface; a tooltip does the opposite — it closes on
the `,e.jsx(s.em,{children:"withdrawal"}),` of what opened it (hover/focus leaving its trigger), not on an outside interaction.
Reach for the
`,e.jsx(s.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/shadcn-tooltip--docs",rel:"nofollow",children:e.jsx(s.code,{children:"Tooltip"})}),`
primitive, which handles this (and stays out of the WebView gap below); don't wire a pattern from
this page.`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"how-to-wire-each-pattern",children:"How to wire each pattern"}),`
`,e.jsx(s.p,{children:"Radix (shadcn) primitives expose the triggers as props on the content element:"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Trigger"}),e.jsx(s.th,{children:"How"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Outside press"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"onPointerDownOutside"})," / ",e.jsx(s.code,{children:"onInteractOutside"})," (portal-aware — see the iframe section)"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Escape"}),e.jsx(s.td,{children:e.jsx(s.code,{children:"onEscapeKeyDown"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Outside scroll"}),e.jsxs(s.td,{children:[e.jsx(s.strong,{children:"No Radix prop."})," Add a ",e.jsx(s.code,{children:"scroll"}),"/",e.jsx(s.code,{children:"wheel"})," listener on the scroll container and close. ",e.jsx(s.code,{children:"onInteractOutside"})," does ",e.jsx(s.em,{children:"not"})," fire on scroll."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Focus → foreign WebView"}),e.jsx(s.td,{children:"No Radix prop — the focus supplement in the iframe section below"})]})]})]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Light:"}),` accept Radix's defaults (outside press + Escape), and add a scroll listener to close on
ancestor/page scroll.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Click-away:"})," keep outside-press + Escape, and ",e.jsx(s.strong,{children:"don't"}),` add scroll dismissal. Where a Radix
primitive dismisses on ancestor scroll by default, suppress it.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Explicit:"})," call ",e.jsx(s.code,{children:"event.preventDefault()"})," in ",e.jsx(s.code,{children:"onPointerDownOutside"})," / ",e.jsx(s.code,{children:"onInteractOutside"}),` so the
surface stays open; leave `,e.jsx(s.code,{children:"onEscapeKeyDown"}),` alone (Escape should still work) and drive closing
from your own close/submit controls.`]}),`
`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(s.p,{children:"Dismissal is a keyboard and screen-reader concern, not just a pointer one:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Restore focus on close."}),` When a surface closes, return focus to the element that opened it
(WCAG 2.4.3). Radix primitives do this automatically; a hand-rolled focus supplement (below) runs
`,e.jsx(s.em,{children:"outside"})," Radix's lifecycle, so it must call ",e.jsx(s.code,{children:"trigger.focus()"}),` on dismiss — otherwise keyboard
users are stranded on a closed surface's dead anchor.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Escape closes the topmost surface only."}),` When surfaces stack (e.g. a popover inside a dialog —
supported here via `,e.jsx(s.code,{children:"PopoverPortalContainerProvider"}),`), Escape should dismiss the innermost first.
Radix handles this per layer; preserve it rather than adding a global Escape handler.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Don't trap focus unless the surface is modal."})," Modal surfaces (",e.jsx(s.code,{children:"Dialog"}),`) trap focus by design;
non-modal surfaces (popover, menu) must not (WCAG 2.1.2). Modality is orthogonal to this axis.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Tooltips/hints"}),` must stay hoverable, be dismissible with Escape, and not disappear on their own
while hovered (WCAG 1.4.13). The `,e.jsx(s.code,{children:"Tooltip"})," primitive handles this."]}),`
`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"the-iframe-webview-gap",children:"The iframe (WebView) gap"}),`
`,e.jsxs(s.p,{children:["Platform.Bible renders most WebViews as ",e.jsxs(s.strong,{children:[e.jsx(s.code,{children:"iframe"}),"s"]}),", and many are ",e.jsx(s.strong,{children:"cross-origin and sandboxed"}),`
(see `,e.jsx(s.code,{children:"src/renderer/services/web-view.service-host.ts"}),"). Two consequences for dismissal:"]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"1. Pointer dismissal silently fails across a WebView."})," When a user clicks ",e.jsxs(s.strong,{children:[`into a
cross-origin/sandboxed iframe, the parent document never receives a `,e.jsx(s.code,{children:"pointerdown"}),"/",e.jsx(s.code,{children:"mousedown"}),"."]}),` So
pointer-based outside detection doesn't fire, and a parent popover stays open even though the user
has clearly moved into a sibling WebView.`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"2. Don't hand-roll containment against the trigger."})," Radix portals content to ",e.jsx(s.code,{children:"document.body"}),`
(`,e.jsx(s.code,{children:"lib/platform-bible-react/src/components/shadcn-ui/popover.tsx"}),"), so the floating content is ",e.jsx(s.strong,{children:"not"}),`
a DOM descendant of its trigger. A naive `,e.jsx(s.code,{children:"trigger.contains(activeElement)"}),` check therefore reads the
surface's own content as "outside" and `,e.jsx(s.strong,{children:"dismisses itself"}),`. Radix's built-in
`,e.jsx(s.code,{children:"onInteractOutside"}),"/",e.jsx(s.code,{children:"onPointerDownOutside"}),` are already portal-aware — use them for same-document
interactions instead of rolling your own.`]}),`
`,e.jsx(s.h3,{id:"the-focus-supplement-cross-iframe-only",children:"The focus supplement (cross-iframe only)"}),`
`,e.jsxs(s.p,{children:["For the one gap Radix can't see — focus crossing into a ",e.jsx(s.em,{children:"foreign"}),` WebView — supplement with a focus
check. Measure containment against the surface's `,e.jsx(s.strong,{children:"rendered content node"}),` (the portaled
`,e.jsx(s.code,{children:"PopoverContent"})," element), not its trigger, and guard against a plain window switch:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`// \`contentEl\` is the surface's PORTALED content node (e.g. the PopoverContent element).
function focusMovedIntoForeignFrame(contentEl: HTMLElement): boolean {
  // Distinguish "focus moved into an iframe in our page" from "the whole window lost focus"
  // (alt-tab, DevTools, another app) with document.hasFocus(): it stays true while focus is
  // anywhere in our top-level page — including a child iframe — and flips to false only when
  // the OS window itself loses focus. Do NOT rely on activeElement resetting to <body> on blur;
  // Chromium/Electron often leave it on the last-focused element, so that check misses some
  // window switches and can dismiss on a plain alt-tab.
  if (!document.hasFocus()) return false; // plain window switch — not a move into a WebView
  const focused = document.activeElement;
  // Focus is still in our page, on the element that took it — for a cross-origin WebView that
  // is the <iframe> element itself. Dismiss only if the surface's own content doesn't contain it.
  return !!focused && !contentEl.contains(focused);
}
// On window 'blur', if focusMovedIntoForeignFrame(contentEl) → dismiss (Light & Click-away only).
`})}),`
`,e.jsxs(s.p,{children:["Keep a surface's ",e.jsx(s.strong,{children:"own embedded WebView"})," (and any nested popover) ",e.jsx(s.em,{children:"inside"})," ",e.jsx(s.code,{children:"contentEl"}),`'s subtree so
the check treats it as inside: portal nested popovers into the content with
`,e.jsx(s.code,{children:"PopoverPortalContainerProvider"})," rather than letting them default to ",e.jsx(s.code,{children:"document.body"}),`. Explicit
dismissal ignores focus loss, so it needs none of this.`]}),`
`,e.jsxs(s.p,{children:["Why measure against the content node rather than the trigger? Because ",e.jsx(s.code,{children:"trigger.contains(...)"}),` reads
the surface's own portaled content as "outside" and self-dismisses. For the same reason we reject
`,e.jsx(s.strong,{children:"pointer-only"})," detection (blind across cross-origin iframes) and ",e.jsx(s.strong,{children:'"any iframe focus dismisses"'}),`
(a surface's own embedded WebView would close it).`]}),`
`,e.jsx(s.h3,{id:"scroll-inside-a-webview-is-unobservable",children:"Scroll inside a WebView is unobservable"}),`
`,e.jsxs(s.p,{children:["Light is supposed to dismiss on outside scroll, but the parent ",e.jsx(s.strong,{children:`cannot observe scroll that happens
inside a cross-origin WebView`}),". Until the platform forwards WebView scroll up to the host, ",e.jsx(s.strong,{children:`Light
surfaces do not dismiss on scroll that occurs inside a foreign WebView`}),` — press and focus crossings
still dismiss them. We deliberately do `,e.jsx(s.strong,{children:"not"}),` approximate this from pointer position — treating
"pointer entered the WebView" as a scroll signal would conflate hovering with scrolling and dismiss
Light surfaces on mere cursor movement. The real fix is the `,e.jsx(s.strong,{children:`WebView forwarding its scroll events
to the host`})," (feasible over the existing channels — ",e.jsx(s.code,{children:"papi.webViewProviders.postMessageToWebView"}),` /
the reverse path for sandboxed WebViews, `,e.jsx(s.code,{children:"window.parent.papi"}),` for same-origin WebViews), which is
not built yet.`]}),`
`,e.jsx(s.h3,{id:"status",children:"Status"}),`
`,e.jsxs(s.p,{children:["No outside-interaction/dismissal hook exists in ",e.jsx(s.code,{children:"lib/platform-bible-react/src/hooks/"}),` yet, and there
is no WebView scroll-forwarding capability. Until both land, implement the focus supplement
per-surface following the rule above (against the content node, with the window-switch guard), and
accept that in-WebView scroll won't dismiss a Light surface.`]}),`
`,e.jsxs(s.p,{children:["See also: ",e.jsx(s.a,{href:"./application-interactions.mdx",children:"Interactions"})," for the menus and surfaces these patterns apply to, and ",e.jsx(s.a,{href:"./component-choices.mdx",children:"Component Choices"})," for picking the surface in the first place."]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"glossary",children:"Glossary"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Outside-interaction dismissal"}),` — umbrella term for closing a surface in response to interaction
elsewhere (pointer, Escape, scroll, or focus moving away). Mirrors Radix's `,e.jsx(s.code,{children:"onInteractOutside"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Light dismissal"})," — closes on ",e.jsx(s.em,{children:"any"}),` outside interaction, including scroll. (In UX writing,
"light dismissal" is sometimes used generically; here it names this specific pattern.)`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Click-away dismissal"}),` — closes on outside press + Escape + focus moving into a foreign WebView,
but `,e.jsx(s.strong,{children:"not"})," on outside scroll."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Explicit dismissal"}),` — closes only on a deliberate action (Escape, close, submit); ignores
outside press, scroll, and focus loss.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Outside (across iframes)"})," — defined by ",e.jsx(s.strong,{children:`containment against the surface's portaled content
node`}),`, not its trigger. Focus moving to an element the content node doesn't contain is "outside";
the window merely losing focus (`,e.jsx(s.code,{children:"document.hasFocus()"})," is false) is not."]}),`
`]})]})}function d(n={}){const{wrapper:s}={...i(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(t,{...n})}):t(n)}export{d as default};
