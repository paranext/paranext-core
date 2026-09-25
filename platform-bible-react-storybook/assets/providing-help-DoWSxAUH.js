import{j as e,M as d}from"./iframe-Do-b0QzA.js";import{useMDXComponents as a}from"./index-CVbCtKZZ.js";import{r as o}from"./index-Ca15zbBj.js";import{B as h}from"./button-7KhB_hPi.js";import{L as i}from"./label-aNqLsXtf.js";import{R as c,a as s}from"./radio-group-D1ZQwqPt.js";import{T as p,a as x,b as u,c as j}from"./tooltip-sXWIJ-qz.js";import{E as m,a as r}from"./example-block.component-DyamplX2.js";import{I as b}from"./info-SFXTssVv.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-DMxJ9bv8.js";import"./index-C-CE938h.js";import"./index-bQs8cwqs.js";import"./index-BplyWQEG.js";import"./index-KeMX8gi7.js";import"./index-CBNZpIfX.js";import"./index-f8hNhdIB.js";import"./index-BFRv-SdF.js";import"./index-Cc9EyAB6.js";import"./index-CoQYM8Tr.js";import"./index-DP8df34w.js";import"./index-RPXBk80K.js";import"./z-index-DiGYIwoM.js";import"./index-BbDRoLbU.js";import"./index-BowcncKm.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-gXb-x7SR.js";import"./createLucideIcon-BNWDJe2k.js";import"./chevron-down-B36yZq1d.js";function l(n){const t={code:"code",div:"div",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...a(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Guidelines/Providing Help"}),`
`,e.jsx(t.h1,{id:"providing-help",children:"Providing Help"}),`
`,e.jsx(t.p,{children:`How to explain what a control does, when to show more context, and where deeper help belongs.
Reach for the lightest option that still answers the user's question — extra text competes with
the UI for attention.`}),`
`,e.jsxs(t.p,{children:["We do ",e.jsx(t.strong,{children:"not"}),` ship Paratext 9-style embedded "guides" (numbered explanations anchored to the UI).
For anything past a sentence or two, link out to application help (see below).`]}),`
`,e.jsx(t.h2,{id:"the-ladder",children:"The ladder"}),`
`,e.jsx(t.p,{children:`Rows are ordered from lightest to heaviest in the space and attention they cost. Pick the first
row that fits, and move down only when the row above cannot carry the message — either because it
is too short, or because the message must be visible at a glance and a hover-only surface would
never show it.`}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Surface"}),e.jsx(t.th,{children:"Use for"}),e.jsx(t.th,{children:"Format"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Visible label"})}),e.jsx(t.td,{children:"The primary meaning of a control"}),e.jsx(t.td,{children:"1–3 words"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Tooltip on the control"})}),e.jsx(t.td,{children:"Icon buttons (required); short hints on other action buttons as needed"}),e.jsx(t.td,{children:"Short phrase (ideally 1–3 words)"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Label subtext"})}),e.jsx(t.td,{children:"A brief clarification that must be visible at a glance"}),e.jsxs(t.td,{children:["One ",e.jsx(t.code,{children:"muted"})," line"]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Info icon button"})}),e.jsx(t.td,{children:"An explanation too long for a control tooltip, or optional context"}),e.jsx(t.td,{children:"1–2 sentences in a tooltip, or a dialog for more"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Application help"})}),e.jsx(t.td,{children:"Concepts, workflows, anything more than a paragraph"}),e.jsx(t.td,{children:"Online article"})]})]})]}),`
`,e.jsx(t.h2,{id:"tooltips-on-action-buttons",children:"Tooltips on action buttons"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Icon buttons: required"})," — the tooltip is the label. Describe the action, not the icon."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Labelled buttons: optional."}),` Add one only when it says something the label doesn't. Don't
tooltip every button — it becomes noise.`]}),`
`,e.jsx(t.li,{children:"Keep tooltip text short and precise enough to scan at a glance."}),`
`]}),`
`,e.jsxs(t.p,{children:["See ",e.jsx(o,{title:"Guidelines/Tooltips",children:"Tooltips"}),` for length, keyboard-shortcut rendering,
and when a popover is needed instead.`]}),`
`,e.jsx(t.h2,{id:"label-subtext",children:"Label subtext"}),`
`,e.jsx(t.p,{children:`A single muted line directly below an option's label or below a headline. Use it when the
clarification is essential enough that a user should read it without hovering — for example,
disambiguating two similarly named settings, or naming a non-obvious consequence.`}),`
`,e.jsx(t.p,{children:`Use sparingly. If every option in a form carries subtext, the form gets loud and the important
ones stop standing out. Prefer a clearer label first; add subtext only when a clearer label isn't
possible.`}),`
`,e.jsxs(t.p,{children:["Give the subtext an ",e.jsx(t.code,{children:"id"})," and point the control's ",e.jsx(t.code,{children:"aria-describedby"}),` at it. Otherwise a
screen-reader user hears the label alone and misses the disambiguation the subtext exists to
provide.`]}),`
`,e.jsx(t.h2,{id:"info-icon-buttons",children:"Info icon buttons"}),`
`,e.jsxs(t.p,{children:["A ghost-variant icon button (",e.jsx(t.code,{children:"Info"})," from ",e.jsx(t.code,{children:"lucide-react"}),`) placed next to the thing it explains.
Two attributes carry the meaning, and they play different roles:`]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The ",e.jsx(t.strong,{children:"tooltip"}),` carries the explanation (up to 1–2 sentences). A screen-reader user hears it
as the button's `,e.jsx(t.em,{children:"description"}),": Radix renders ",e.jsx(t.code,{children:"TooltipContent"})," as a ",e.jsx(t.code,{children:'role="tooltip"'}),` node and
wires `,e.jsx(t.code,{children:"aria-describedby"}),` on the trigger, so the tooltip text is announced automatically on
keyboard focus.`]}),`
`,e.jsxs(t.li,{children:["The ",e.jsx(t.strong,{children:e.jsx(t.code,{children:"aria-label"})})," is the button's accessible ",e.jsx(t.em,{children:"name"})," — a short noun phrase for ",e.jsx(t.em,{children:"what"}),` the
button explains (e.g. `,e.jsx(t.code,{children:'"About the API key"'}),`), not the explanation itself. A sentence-length
`,e.jsx(t.code,{children:"aria-label"}),` gets read in full before the description, duplicates the tooltip, and breaks
voice control (`,e.jsx(t.code,{children:'"click About the API key"'})," stops matching a paragraph-long name)."]}),`
`]}),`
`,e.jsxs(t.p,{children:["Do ",e.jsx(t.strong,{children:"not"})," put the ",e.jsx(t.code,{children:"Info"})," icon directly inside ",e.jsx(t.code,{children:"TooltipTrigger asChild"}),". A bare ",e.jsx(t.code,{children:"<svg>"}),` is not
focusable and has no interactive role, so the tooltip only opens on hover — keyboard and
screen-reader users cannot reach it, and an `,e.jsx(t.code,{children:"aria-label"}),` on the SVG itself is not announced.
The ghost `,e.jsx(t.code,{children:"Button"}),` above is what makes the affordance keyboard-reachable and correctly labelled;
this is why the icon-button rule from
`,e.jsx(o,{title:"Guidelines/Tooltips",children:"Tooltips"})," applies here."]}),`
`,e.jsx(t.p,{children:"Two placements:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Next to a specific choice or action"})," — scoped help for one control."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Top right of a screen, next to view options / settings"}),` — help that applies to the whole
view.`]}),`
`]}),`
`,e.jsx(t.p,{children:"The info button reveals its help in one of these ways:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"A tooltip"}),` — for a slightly longer explanation than the control's own tooltip would
reasonably carry (up to 1–2 sentences). Still a hint, not an essay. Because our tooltip is
Radix-based (`,e.jsx(t.code,{children:'role="tooltip"'}),`), it appears on hover or keyboard focus and dismisses on
pointer-leave or blur — it does not open on click. On touch, where there is no hover, prefer a
dialog if the tooltip text is the only place the user can read the explanation.`]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"A dialog opened on click"}),` — as a stop-gap for the not-yet-available help system, when the
explanation needs paragraphs, structure, an example, or links.`]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Application help"}),` — when the explanation is long enough to belong in the online help
system (see below).`]}),`
`]}),`
`,e.jsxs(t.p,{children:[`Do not put interactive content (links, form fields, copy buttons) inside a tooltip — use a dialog
or popover. See `,e.jsx(o,{title:"Guidelines/Tooltips",children:"Tooltips"}),"."]}),`
`,e.jsxs(m,{children:[e.jsx(r,{variant:"prefer",previewClassName:"tw:pb-12",preview:e.jsx(p,{children:e.jsxs(t.div,{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx(i,{htmlFor:"api-key-input",children:"API key"}),e.jsxs(x,{open:!0,children:[e.jsx(u,{asChild:!0,children:e.jsx(h,{variant:"ghost",size:"icon","aria-label":"About the API key",children:e.jsx(b,{})})}),e.jsx(j,{side:"bottom",children:"Used to authenticate requests to your organization's server."})]})]})}),children:e.jsxs(t.p,{children:[`An info button whose tooltip carries a one- or two-sentence clarification of the labelled
field. The button has an `,e.jsx("code",{children:"aria-label"}),`; the tooltip appears on hover or keyboard
focus.`]})}),e.jsx(r,{variant:"avoid",preview:e.jsx(t.div,{className:"tw:flex tw:flex-col tw:gap-1",children:e.jsxs(c,{defaultValue:"opt-a",children:[e.jsxs(t.div,{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx(s,{value:"opt-a",id:"providing-help-opt-a","aria-describedby":"providing-help-opt-a-desc"}),e.jsx(i,{htmlFor:"providing-help-opt-a",children:"Enabled"})]}),e.jsx(t.p,{id:"providing-help-opt-a-desc",className:"tw:ps-6 tw:text-xs tw:text-muted-foreground",children:"Allows full network access for all sync, resource downloads, and telemetry — with no restrictions on what data is shared or when."}),e.jsxs(t.div,{className:"tw:flex tw:items-center tw:gap-2",children:[e.jsx(s,{value:"opt-b",id:"providing-help-opt-b","aria-describedby":"providing-help-opt-b-desc"}),e.jsx(i,{htmlFor:"providing-help-opt-b",children:"Disabled"})]}),e.jsx(t.p,{id:"providing-help-opt-b-desc",className:"tw:ps-6 tw:text-xs tw:text-muted-foreground",children:"Blocks all outgoing network traffic including sync, cloud resources, telemetry, and update checks — you will need to install resources manually."})]})}),children:e.jsx(t.p,{children:`A paragraph of subtext under each option is too heavy for a glance. If every option needs
this much explanation, move it into an info-button dialog or into application help.`})})]}),`
`,e.jsx(t.h2,{id:"application-help",children:"Application help"}),`
`,e.jsxs(t.p,{children:[`Deeper help — concepts, task walkthroughs, reference material — belongs in the online
application help. `,e.jsx(t.strong,{children:"The help system is under development."}),` Until it ships, defer writing this
content. If a piece of guidance cannot wait, ship a single, temporary in-app guide dialog for
that view — not one per feature or per extension — and plan to retire it once the help system is
available.`]}),`
`,e.jsxs(t.p,{children:["See also: ",e.jsx(o,{title:"Guidelines/Tooltips",children:"Tooltips"}),` — length, keyboard shortcuts, and
when a popover is needed instead; `,e.jsx(o,{title:"Guidelines/Applying Changes",children:"Applying Changes"}),`
— microcopy for buttons; `,e.jsx(o,{title:"Guidelines/Product Names",children:"Product Names"}),` — how
to refer to Paratext 9 and Platform.Bible in help text.`]})]})}function J(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(l,{...n})}):l(n)}export{J as default};
