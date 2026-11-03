import{j as e,M as o}from"./iframe-daLDEbis.js";import{useMDXComponents as i}from"./index-COLNwN0a.js";import"./preload-helper-CTOgD26E.js";function t(n){const s={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Guidelines/Dismissal Patterns"}),`
`,e.jsx(s.h1,{id:"dismissal-patterns",children:"Dismissal Patterns"}),`
`,e.jsxs(s.p,{children:[`When a transient surface is open — a popover, menu, inline editor, panel — something has to
decide `,e.jsx(s.em,{children:"when it closes again"}),'. "Dismissal" is that behavior. This page defines the ',e.jsx(s.strong,{children:`three
dismissal patterns`}),` we use, when to reach for each, and how the shared components handle the one
case Radix cannot see on its own: `,e.jsx(s.strong,{children:"iframe (WebView) boundaries"}),"."]}),`
`,e.jsx(s.p,{children:`This is a UX pattern, not a component. Most surfaces are built on shadcn/Radix primitives that
already implement dismissal; your job is to pick the right pattern and wire the Radix props
accordingly.`}),`
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
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Pattern"}),e.jsx(s.th,{style:{textAlign:"center"},children:"Outside press"}),e.jsx(s.th,{style:{textAlign:"center"},children:"Escape"}),e.jsx(s.th,{style:{textAlign:"center"},children:"Outside scroll"}),e.jsx(s.th,{style:{textAlign:"center"},children:"Window loses focus"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.strong,{children:"Light dismissal"})}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.strong,{children:"Click-away dismissal"})}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✗"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.strong,{children:"Explicit dismissal"})}),e.jsx(s.td,{style:{textAlign:"center"},children:"✗"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✓"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✗"}),e.jsx(s.td,{style:{textAlign:"center"},children:"✗"})]})]})]}),`
`,e.jsxs(s.p,{children:["The last column is the ",e.jsx(s.strong,{children:"window losing focus"}),` — focus moving into another frame, another
application, or DevTools. It counts as an outside press; see
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
select). Outside clicks, scroll, and window blur are `,e.jsx(s.strong,{children:"ignored"}),` so the user never loses in-progress
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
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Trigger"}),e.jsx(s.th,{children:"How"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Outside press"}),e.jsxs(s.td,{children:[e.jsx(s.code,{children:"onPointerDownOutside"})," / ",e.jsx(s.code,{children:"onInteractOutside"})," (portal-aware — see the iframe section)"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Escape"}),e.jsx(s.td,{children:e.jsx(s.code,{children:"onEscapeKeyDown"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Outside scroll"}),e.jsxs(s.td,{children:[e.jsx(s.strong,{children:"No Radix prop."})," Add a ",e.jsx(s.code,{children:"scroll"}),"/",e.jsx(s.code,{children:"wheel"})," listener on the scroll container and close. ",e.jsx(s.code,{children:"onInteractOutside"})," does ",e.jsx(s.em,{children:"not"})," fire on scroll."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"Window loses focus"}),e.jsxs(s.td,{children:["Nothing to wire — the shared wrappers turn it into an outside press (see the iframe section); controlled surfaces without ",e.jsx(s.code,{children:"onOpenChange"})," need their own ",e.jsx(s.code,{children:"window"})," blur listener"]})]})]})]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Light:"}),` accept Radix's defaults (outside press + Escape), and add a scroll listener to close on
ancestor/page scroll.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Click-away:"})," keep outside-press + Escape, and ",e.jsx(s.strong,{children:"don't"}),` add scroll dismissal. Where a Radix
primitive dismisses on ancestor scroll by default, suppress it.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Explicit:"})," call ",e.jsx(s.code,{children:"event.preventDefault()"})," in ",e.jsx(s.code,{children:"onPointerDownOutside"})," / ",e.jsx(s.code,{children:"onInteractOutside"}),` so the
surface stays open; leave `,e.jsx(s.code,{children:"onEscapeKeyDown"}),` alone (Escape should still work) and drive closing
from your own close/submit controls.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Surviving window blur."}),` Window blur is an outside press, so a surface that must stay open when
focus leaves (anything the user is typing text into) does what it does to survive a real outside
click: call `,e.jsx(s.code,{children:"event.preventDefault()"})," in ",e.jsx(s.code,{children:"onPointerDownOutside"})," / ",e.jsx(s.code,{children:"onInteractOutside"}),`, or control
`,e.jsx(s.code,{children:"open"})," without an ",e.jsx(s.code,{children:"onOpenChange"}),` handler. There is no opt-out prop. A picker with a search box is
not such a surface — losing a half-typed filter is not losing work.`]}),`
`,e.jsxs(s.li,{children:[e.jsxs(s.strong,{children:["An explicit-dismissal picker: the compact ",e.jsx(s.code,{children:"BookChapterControl"}),"."]}),` After the user clicks one of
its quick-nav arrows (previous or next chapter or verse) the book list is hidden and the popover
becomes a small stepper. A non-modal picker in that state stays open through outside clicks,
window blur and focus leaving, because the user steps through chapters while working elsewhere.
Only a click on its trigger, or Escape while focus is in the popover or on the trigger, closes it.
A modal picker makes everything outside inert, its trigger included, so it keeps the normal rules
and closes on an outside press and on Escape. A compact picker whose tab becomes hidden stays open
on purpose; it closes through its trigger once the tab is visible again, or on Escape with focus
in it. Clicks elsewhere still act where the user clicked; only the dismissal is prevented. Once
the book list returns (the search input takes focus, or the user types), the normal picker rules
apply again.`]}),`
`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(s.p,{children:"Dismissal is a keyboard and screen-reader concern, not just a pointer one:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Restore focus on close."}),` When a surface closes, return focus to the element that opened it
(WCAG 2.4.3). Radix primitives do this, with one deliberate departure in the shared wrappers:
focus is `,e.jsx(s.strong,{children:"not"})," returned when it is already in a web view (",e.jsx(s.code,{children:"activeElement"}),` is an iframe) or,
inside a web view, when the window is not focused. Returning focus across frames blurs the window
the user just moved to and closes the menu they opened there. In the main document an unfocused
window can only mean the OS window was deactivated, so the shared wrappers focus the trigger
themselves for keyboard users coming back from another application. After an outside interaction a
non-modal `,e.jsx(s.code,{children:"Popover"})," and a ",e.jsx(s.code,{children:"Menubar"})," would skip that restore, while a modal ",e.jsx(s.code,{children:"DropdownMenu"}),` would
restore anyway; the wrappers make the outcome the same for all three. Inside a web view focus
stays where the user put it. The renderer's overlay service (command palette, including a passive
one, context menu with its submenus, and popover) decides by how the overlay closed, not by where
focus is. Picking an item returns focus to the opener. Escape, the opener's own dismiss and the
app losing focus (the window blurs while `,e.jsx(s.code,{children:"document.hasFocus()"}),` is false) return focus to the
opener only if focus is inside that overlay's own content at that moment. A click elsewhere (in
the main document or a pane frame), a pane or tab switch, a click into a pane that blurs the
window while the app keeps focus, a replacement, a timeout and a scroll never return focus.
Modal dialogs return focus on every answer (OK, Cancel, Escape, the close button, the backdrop,
an error the dialog reports) but not when they are replaced or the window shuts down. The opener
is the requesting web view when it is a real web view whose frame exists; otherwise the tab the
user was last in (modal dialogs) or the focus the window service reported when the overlay
opened. `,e.jsx(s.code,{children:"Select"})," follows the same rule through ",e.jsx(s.code,{children:"SelectContent"}),". A hand-rolled dismissal (a ",e.jsx(s.code,{children:"window"}),` listener that sets your own state)
runs `,e.jsx(s.em,{children:"outside"}),` Radix's lifecycle: it must not focus the trigger on a blur dismissal in a web view,
or when the active element is an iframe (`,e.jsx(s.code,{children:"shouldSuppressFocusReturn"}),`); in the main document after
an OS-level deactivation it should return focus to the trigger, as the shared wrappers do. It must
call `,e.jsx(s.code,{children:"trigger.focus()"}),` on other dismissals (Escape, a choice) — otherwise keyboard users are
stranded on a closed surface's dead anchor. A consumer `,e.jsx(s.code,{children:"onCloseAutoFocus"}),` that calls
`,e.jsx(s.code,{children:"preventDefault()"}),` and then focuses something explicitly bypasses the rule, so it must gate that
focus call with `,e.jsx(s.code,{children:"shouldSuppressFocusReturn"}),` (exported by this library, together with
`,e.jsx(s.code,{children:"isRunningInWebView"}),`). Restoring focus is not the same as showing a focus ring: after a close the
user drove with the pointer, the ring would sit on a control the pointer has left. Suppress the
ring for that case rather than withholding the focus — see `,e.jsx(s.code,{children:"TabDropdownMenu"}),`, which marks its
trigger with `,e.jsx(s.code,{children:"data-quiet-focus"}),` and clears the mark on the next keydown. The ring stays under
forced colors (Windows High Contrast), where it is the only focus indicator left. For why the
browser's own "focus without the indicator" option is not usable here, see the
`,e.jsx(s.code,{children:"adr-menu-close-focus-restores-without-the-ring"}),` entry in
`,e.jsx(s.code,{children:".context/standards/Architecture-Decisions.md"}),". The helpers behind this (",e.jsx(s.code,{children:"QUIET_FOCUS_*"}),`,
`,e.jsx(s.code,{children:"useInteractionModality"}),`) are internal to this library for now and not exported, so an extension
cannot reuse them yet.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Exception: the editor toolbar's marker menus."}),` A pick from the paragraph-style menu returns
focus to the Scripture text rather than to the button, since the pick acted on the text. A
dismissal still returns focus to the opener, and the editor can be the opener: Enter on a selected
paragraph marker opens the menu from the text, so dismissing that menu returns focus to the text.
The character-marker menu returns focus to the text on every close. See the
`,e.jsx(s.code,{children:"adr-marker-menu-close-focus-follows-the-opener"}),` entry in
`,e.jsx(s.code,{children:".context/standards/Architecture-Decisions.md"}),"; the dismissal rule may still change."]}),`
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
(see `,e.jsx(s.code,{children:"src/renderer/services/web-view.service-shard.ts"}),`). Radix detects an outside press by listening
for `,e.jsx(s.code,{children:"pointerdown"})," on the document that owns the surface, and ",e.jsxs(s.strong,{children:[`a click inside an iframe never
produces a `,e.jsx(s.code,{children:"pointerdown"})," in any other document"]}),` — in either direction. Left alone, a menu in the
main toolbar would stay open when the user clicks into a WebView, and a menu inside a WebView would
stay open when the user clicks the toolbar or another pane.`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Window blur is an outside press."}),` When the user clicks into another frame, the surface's own
window fires `,e.jsx(s.code,{children:"blur"}),". ",e.jsx(s.code,{children:"PopoverContent"}),", ",e.jsx(s.code,{children:"DropdownMenuContent"}),", ",e.jsx(s.code,{children:"MenubarContent"}),` and
`,e.jsx(s.code,{children:"ContextMenuContent"})," listen for it through ",e.jsx(s.code,{children:"useDismissOnWindowBlur"}),` and dispatch a synthetic
`,e.jsx(s.code,{children:"pointerdown"}),` just outside the surface, so Radix runs its normal outside-press path. Every surface
built on those components gets the behavior with nothing to wire, in the main window and inside
every WebView alike. The exception is a controlled surface without an `,e.jsx(s.code,{children:"onOpenChange"}),` handler that
should still close on blur: it needs its own `,e.jsx(s.code,{children:"window"}),` blur listener (the inline markers menus are
the example). Because it is the ordinary outside-press path, the opt-outs in
`,e.jsx(s.a,{href:"#how-to-wire-each-pattern",children:"How to wire each pattern"}),` keep working, and a popover portaled into a
dialog through `,e.jsx(s.code,{children:"PopoverPortalContainerProvider"})," closes while the dialog stays open."]}),`
`,e.jsx(s.p,{children:`A plain window switch (alt-tab, DevTools) also dismisses a Light or Click-away surface, as native
menus do.`}),`
`,e.jsx(s.p,{children:"Consequences to know about:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:`The click that dismisses the surface is not swallowed. The pane it lands on receives it first, so
it acts there (places a caret, focuses the pane) and the surface closes.`}),`
`,e.jsxs(s.li,{children:["Not wired: ",e.jsx(s.code,{children:"Select"})," (it closes on window blur by itself; ",e.jsx(s.code,{children:"SelectContent"}),` applies the same
focus-return rule), `,e.jsx(s.code,{children:"Tooltip"})," and ",e.jsx(s.code,{children:"Dialog"}),` (not on this axis), sub-menu contents (dismissing the
root closes them), and the Scripture editor's right-click menu (not Radix; its window-blur close
is fixed separately in the editor package).`]}),`
`,e.jsx(s.li,{children:`Escape is not forwarded across frames. After a click into another frame, Escape goes to that
frame.`}),`
`,e.jsx(s.li,{children:`A modal menu opened inside a picker closes alone on a window blur; the picker stays open until the
next blur or outside press, as it would after a real click outside both.`}),`
`,e.jsx(s.li,{children:`Inside a web view, a dialog does not pull focus back from another frame when a picker nested in it
closes on blur. Platform.Bible patches Radix's focus trap for this; web views built in other
repositories carry their own copy of Radix and need the same patch until Radix fixes it upstream.`}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Don't hand-roll containment against the trigger."})," Radix portals content to ",e.jsx(s.code,{children:"document.body"}),`
(`,e.jsx(s.code,{children:"lib/platform-bible-react/src/components/shadcn-ui/popover.tsx"}),`), so the floating content is
`,e.jsx(s.strong,{children:"not"})," a DOM descendant of its trigger. A naive ",e.jsx(s.code,{children:"trigger.contains(activeElement)"}),` check reads the
surface's own content as "outside" and `,e.jsx(s.strong,{children:"dismisses itself"}),`. Radix's built-in
`,e.jsx(s.code,{children:"onInteractOutside"}),"/",e.jsx(s.code,{children:"onPointerDownOutside"})," are already portal-aware — use them."]}),`
`,e.jsx(s.h3,{id:"scroll-inside-a-webview-is-unobservable",children:"Scroll inside a WebView is unobservable"}),`
`,e.jsxs(s.p,{children:["Light is supposed to dismiss on outside scroll, but the parent ",e.jsx(s.strong,{children:`cannot observe scroll that happens
inside a cross-origin WebView`}),". Until the platform forwards WebView scroll up to the host, ",e.jsx(s.strong,{children:`Light
surfaces do not dismiss on scroll that occurs inside a foreign WebView`}),` — press and window blur
still dismiss them. We deliberately do `,e.jsx(s.strong,{children:"not"}),` approximate this from pointer position — treating
"pointer entered the WebView" as a scroll signal would conflate hovering with scrolling and dismiss
Light surfaces on mere cursor movement. The real fix is the `,e.jsx(s.strong,{children:`WebView forwarding its scroll events
to the host`})," (feasible over the existing channels — ",e.jsx(s.code,{children:"papi.webViewProviders.postMessageToWebView"}),` /
the reverse path for sandboxed WebViews, `,e.jsx(s.code,{children:"window.parent.papi"}),` for same-origin WebViews), which is
not built yet.`]}),`
`,e.jsx(s.h3,{id:"status",children:"Status"}),`
`,e.jsxs(s.p,{children:["The window-blur dismissal lives in ",e.jsx(s.code,{children:"useDismissOnWindowBlur"}),`
(`,e.jsx(s.code,{children:"lib/platform-bible-react/src/hooks/use-dismiss-on-window-blur.hook.ts"}),`) and is applied by the
shared wrappers. There is no WebView scroll-forwarding capability yet, so in-WebView scroll won't
dismiss a Light surface.`]}),`
`,e.jsxs(s.p,{children:["See also: ",e.jsx(s.a,{href:"./application-interactions.mdx",children:"Interactions"}),` for the menus and surfaces these patterns
apply to, and `,e.jsx(s.a,{href:"./component-choices.mdx",children:"Component Choices"}),` for picking the surface in the first
place.`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{id:"glossary",children:"Glossary"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Outside-interaction dismissal"}),` — umbrella term for closing a surface in response to interaction
elsewhere (pointer, Escape, scroll, or the window losing focus). Mirrors Radix's
`,e.jsx(s.code,{children:"onInteractOutside"}),"."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Light dismissal"})," — closes on ",e.jsx(s.em,{children:"any"}),` outside interaction, including scroll. (In UX writing,
"light dismissal" is sometimes used generically; here it names this specific pattern.)`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Click-away dismissal"}),` — closes on outside press + Escape + the window losing focus,
but `,e.jsx(s.strong,{children:"not"})," on outside scroll."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Explicit dismissal"}),` — closes only on a deliberate action (Escape, close, submit); ignores
outside press, scroll, and window blur.`]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Window blur"}),` — the surface's own window losing focus (a click into another frame, alt-tab,
DevTools). Treated as an outside press by the shared wrappers.`]}),`
`]})]})}function c(n={}){const{wrapper:s}={...i(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(t,{...n})}):t(n)}export{c as default};
