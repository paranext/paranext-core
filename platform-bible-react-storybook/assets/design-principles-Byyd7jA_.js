import{j as e,M as a}from"./iframe-C2E5fT_X.js";import{useMDXComponents as o}from"./index-WMkEXQVY.js";import{B as s}from"./button-DdeOESPE.js";import{E as d,a as r}from"./example-block.component-CDZwfuUw.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-DSFQTdMV.js";import"./createLucideIcon-0FACdxKg.js";import"./info-DEXHTUyc.js";import"./chevron-down-ELZRpDcd.js";function i(t){const n={a:"a",blockquote:"blockquote",code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Guidelines/Design Principles"}),`
`,e.jsx(n.h1,{id:"design-principles",children:"Design Principles"}),`
`,e.jsxs(n.p,{children:["This document defines the baseline quality standard for Paratext 10's UI. It is the ",e.jsx(n.strong,{children:"Definition of Done"})," for interface work — acceptance criteria on individual Jira items should treat this as the baseline and add only what is specific to that item."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"our-user",children:"Our user"}),`
`,e.jsxs(n.p,{children:["The primary user of Paratext 10 is ",e.jsx(n.strong,{children:"Saroj"})," — an expert Bible translator who hasn't spent much time with technology. Paratext may be his main reason for using a computer at all. He prefers the app to be simple and just work, and is not attached to the way things have always been done."]}),`
`,e.jsx(n.p,{children:"Design for Saroj: capable, purposeful, and unpretentious."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"styling-defaults",children:"Styling defaults"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Default to shadcn/ui UI styling."})," Unless a custom style carries specific meaning, leave elements at their shadcn/ui defaults. Custom styles that don't communicate anything add maintenance burden and get in the way of future restyling."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Prefer vanilla over custom."})," Default shadcn/ui styling can always be changed later at the component or theme level. Ad hoc overrides are harder to track, harder to update, and harder to reason about."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Only style meaningfully."})," Apply custom styling only when it communicates something specific — hierarchy, state, emphasis, or brand. If you can remove it and nothing is lost, remove it."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Consistent styling aids parsing."})," When elements share consistent styling, users can scan and understand the interface faster. Visual noise from unnecessary variation slows comprehension."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Consistency enables contrast."})," Intentionally contrastive styling — a bold highlight, an accent color, a size shift — is a powerful tool for directing attention, but only works when the surrounding design is consistent. Reserve it for moments that matter."]}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note on shadcn/ui component variation:"})," Different shadcn/ui components (e.g., command menu items, popovers, dropdown menus) may apply different default styles to visually similar elements. This is by design — the components have different underlying semantics. If similar content looks different across contexts, verify whether the underlying components differ before applying overrides, and surface that information to the design team."]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"color",children:"Color"}),`
`,e.jsx(n.h3,{id:"semantic-color-pairing",children:"Semantic color pairing"}),`
`,e.jsxs(n.p,{children:["Always pair background utility classes with their ",e.jsx(n.code,{children:"-foreground"})," counterparts. Never mix ",e.jsx(n.code,{children:"text-secondary"})," on ",e.jsx(n.code,{children:"bg-secondary"})," — it creates low contrast."]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Class"}),e.jsx(n.th,{children:"CSS Variable"}),e.jsx(n.th,{children:"Use case"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"tw:text-primary-foreground"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"--primary-foreground"})}),e.jsxs(n.td,{children:["Text ",e.jsx(n.strong,{children:"on"})," primary backgrounds"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"tw:text-secondary-foreground"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"--secondary-foreground"})}),e.jsxs(n.td,{children:["Text ",e.jsx(n.strong,{children:"on"})," secondary backgrounds"]})]})]})]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Examples:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Secondary card: ",e.jsx(n.code,{children:"bg-secondary text-secondary-foreground"})]}),`
`,e.jsxs(n.li,{children:["Primary button text: ",e.jsx(n.code,{children:"bg-primary text-primary-foreground"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"state-changes-and-contrast",children:"State changes and contrast"}),`
`,e.jsx(n.p,{children:"Desktop UIs carry many overlapping states: hover, focus, selected, active, unread. Each state change typically involves a color shift. When multiple states combine, contrast can be squeezed from both ends simultaneously."}),`
`,e.jsx(n.p,{children:"For example: if hover lightens a card background while activation darkens the text color, both shifts reduce contrast at the same time. This compounds quickly, and dark mode tends to amplify the problem. Always verify contrast when combining two or more state-driven color changes."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"dialogs-toolbars-and-action-buttons",children:"Dialogs, toolbars, and action buttons"}),`
`,e.jsx(n.h3,{id:"button-order",children:"Button order"}),`
`,e.jsxs(n.p,{children:["Cancel/discard goes on the ",e.jsx(n.strong,{children:"left"}),"; confirm/accept goes on the ",e.jsx(n.strong,{children:"right"}),". This is the standard convention and must be consistent across all editors and dialogs."]}),`
`,e.jsx(n.h3,{id:"destructive-action-icon",children:"Destructive action icon"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"Trash2"})," (not ",e.jsx(n.code,{children:"X"}),") when a button discards or deletes content. ",e.jsx(n.code,{children:"X"}),' means "close" — use it only when nothing will be lost. ',e.jsx(n.code,{children:"Trash2"})," is from ",e.jsx(n.code,{children:"lucide-react"}),"."]}),`
`,e.jsx(n.h3,{id:"button-variant-hierarchy",children:"Button variant hierarchy"}),`
`,e.jsxs(n.p,{children:["In dialogs and popovers, the discard button should use ",e.jsx(n.code,{children:'variant="secondary"'})," or ",e.jsx(n.code,{children:'variant="ghost"'}),", and the accept button ",e.jsx(n.code,{children:'variant="default"'})," (filled). Avoid pairing ",e.jsx(n.code,{children:"ghost"})," + ",e.jsx(n.code,{children:"ghost"})," — it removes visual hierarchy and makes the primary action unclear."]}),`
`,e.jsx(n.h3,{id:"button-labels",children:"Button labels"}),`
`,e.jsxs(n.p,{children:["Labels should communicate what will happen — even if the user skips the surrounding text. Use a specific action verb. Avoid ",e.jsx(n.strong,{children:"OK"}),": users learn to dismiss it without reading, which turns dialogs into interruptions rather than decisions."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Cancel"})," is sometimes appropriate, but a more descriptive alternative is usually clearer. Both buttons should be self-explanatory taken together."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Example scenario:"})," A user writes a comment, then tries to navigate away. The app needs to know: submit the comment or discard it? Draft-saving is not an option."]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{}),e.jsx(n.th,{children:"Dismiss"}),e.jsx(n.th,{children:"Confirm"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Avoid"}),e.jsx(n.td,{children:"Cancel"}),e.jsx(n.td,{children:"OK"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Acceptable"}),e.jsx(n.td,{children:"Cancel"}),e.jsx(n.td,{children:"Comment"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:"Preferred"}),e.jsx(n.td,{children:"Discard"}),e.jsx(n.td,{children:"Comment"})]})]})]}),`
`,e.jsxs(d,{children:[e.jsx(r,{variant:"avoid",preview:e.jsxs(n.div,{style:{display:"flex",gap:"8px"},children:[e.jsx(s,{variant:"secondary",children:"Cancel"}),e.jsx(s,{children:"OK"})]}),children:e.jsx(n.p,{children:"Neither label explains what will happen — users dismiss without reading."})}),e.jsx(r,{variant:"prefer",preview:e.jsxs(n.div,{style:{display:"flex",gap:"8px"},children:[e.jsx(s,{variant:"secondary",children:"Discard"}),e.jsx(s,{children:"Comment"})]}),children:e.jsx(n.p,{children:"Both actions are self-evident — the choice is clear without reading surrounding text."})})]}),`
`,e.jsx(n.h3,{id:"buttongroup",children:"ButtonGroup"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"ButtonGroup"})," and ",e.jsx(n.code,{children:"ButtonGroupSeparator"})," from ",e.jsx(n.code,{children:"lib/platform-bible-react/src/components/shadcn-ui/button-group.tsx"})," rather than manual gap spacing. Group related buttons together. Nesting two ",e.jsx(n.code,{children:"ButtonGroup"}),"s inside a parent automatically adds ",e.jsx(n.code,{children:"gap-2"})," between the groups."]}),`
`,e.jsx(n.h3,{id:"icon-only-buttons",children:"Icon-only buttons"}),`
`,e.jsxs(n.p,{children:["Every icon-only button must have an ",e.jsx(n.code,{children:"aria-label"}),". Screen readers cannot infer meaning from an icon alone. Use the localized string for the tooltip text when available."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"tooltips",children:"Tooltips"}),`
`,e.jsx(n.p,{children:`Tooltips are required for every icon button and any control without a visible label — including
toolbar items. Tooltips are supplementary: if the tooltip would only repeat the visible label,
omit it. Keep tooltip text short enough to scan at a glance.`}),`
`,e.jsxs(n.p,{children:[`For full tooltip guidance — when to use a tooltip vs. a popover, keyboard-shortcut formatting,
and patterns under consideration — see `,e.jsx(n.a,{href:"./tooltips.mdx",children:"Tooltips"}),"."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"keyboard-navigation-and-focus",children:"Keyboard navigation and focus"}),`
`,e.jsx(n.p,{children:"All interactive UI must be keyboard navigable. Focus should be indicated by a focus ring by default, unless UX specifies otherwise for a specific component."}),`
`,e.jsxs(n.p,{children:["Be aware that the focus ring sometimes goes on a ",e.jsx(n.strong,{children:"container"})," rather than the interactive element itself. For example, when a text input field contains buttons, the focus ring wraps the entire container — not each individual button."]}),`
`,e.jsx(n.h3,{id:"keyboard-shortcut-catalog",children:"Keyboard shortcut catalog"}),`
`,e.jsxs(n.p,{children:["Every keyboard shortcut in the entire application — main process, bundled extensions, and this component library — is documented in one curated catalog, so there is a single place to see what shortcuts exist, what they do, and where they are handled in code. It lives in the main Platform.Bible Storybook under ",e.jsx(n.strong,{children:"Reference → Keyboard shortcuts"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Definition of Done:"})," when you add, change, or remove any keyboard shortcut — a ",e.jsx(n.code,{children:"keydown"}),"/",e.jsx(n.code,{children:"keyup"})," handler, an Electron accelerator or ",e.jsx(n.code,{children:"before-input-event"})," branch, or a ",e.jsx(n.code,{children:"useHotkeys"})," binding — you must add, update, or remove its entry in the single catalog data file ",e.jsx(n.code,{children:"src/stories/keyboard-shortcuts.data.ts"})," as part of the same change. A shortcut change that leaves the catalog stale is not done."]}),`
`,e.jsxs(n.p,{children:["See also: ",e.jsx(n.a,{href:"./responsiveness.mdx",children:"Responsiveness"})," for minimum width requirements and container query guidance."]})]})}function b(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{b as default};
