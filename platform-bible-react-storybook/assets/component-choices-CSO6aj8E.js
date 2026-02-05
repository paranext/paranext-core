import{j as e}from"./jsx-runtime-ZjL3r2O0.js";import{useMDXComponents as s}from"./index-CyUcbIPc.js";import{M as i}from"./blocks-CrKC5Tix.js";import"./iframe-Ccj3oFXp.js";import"./preload-helper-CTOgD26E.js";import"./index-SwYDPuTC.js";import"./index-Rei2vlyU.js";function t(n){const o={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Guidelines/Component Choices"}),`
`,e.jsx(o.h1,{id:"component-choices",children:"Component Choices"}),`
`,e.jsx(o.p,{children:"Consistent usage of components across the application allows users to easily learn and use the application. They will know how to interact with the controls and what to expect from them."}),`
`,e.jsxs(o.p,{children:["It is an ongoing effort to review and agree on components and variants for common usage. Internal notes about this can be found ",e.jsx(o.a,{href:"https://docs.google.com/document/d/1gKmb2PnCWtRAbVN8ERskRRy-IoTRTsEpC4-kpgEvzxY/edit?tab=t.cmhqjv2sbcd#heading=h.feldja1s1r8b",rel:"nofollow",children:"here"})]}),`
`,e.jsx(o.h2,{id:"table-and-list",children:"Table and list"}),`
`,e.jsxs(o.p,{children:["For lists and tables, apply the ",e.jsx(o.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/",rel:"nofollow",children:"listbox pattern"})," to make it ",e.jsx(o.a,{href:"#",children:"accessible"})]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Code: ",e.jsx(o.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/hooks/listbox-keyboard-navigation.hook.ts",rel:"nofollow",children:"listbox-keyboard-navigation.hook.ts"})]}),`
`]}),`
`,e.jsx(o.p,{children:"For tables, use"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:e.jsx(o.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/shadcn-table--docs",rel:"nofollow",children:"Table"})}),`
`,e.jsx(o.li,{children:"Data Table"}),`
`]}),`
`,e.jsx(o.p,{children:"For lists, use"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:e.jsx(o.a,{href:"https://ui.shadcn.com/docs/components/item",rel:"nofollow",children:"Item"})}),`
`]}),`
`,e.jsxs(o.p,{children:["Lists may be styled like a single column table ",e.jsx(o.strong,{children:"or"})," as a list of Card-like items."]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["See ",e.jsx(o.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/basics-resultscard--docs",rel:"nofollow",children:"Result Card"})]}),`
`]}),`
`,e.jsxs(o.p,{children:["List entries and table rows may use context menus and ",e.jsx(o.a,{href:"https://lucide.dev/icons/ellipsis",rel:"nofollow",children:"Ellipsis"})," button to display more options in context of the item under the cursor."]}),`
`,e.jsx(o.p,{children:"There is a consistent selection and hover style for all lists, that is"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["hover: ",e.jsx(o.code,{children:"tw-bg-muted"})]}),`
`,e.jsxs(o.li,{children:["selected: ",e.jsx(o.code,{children:"tw-bg-muted/50"})]}),`
`]}),`
`,e.jsxs(o.p,{children:["There are consistent interaction patterns for lists, see ",e.jsx(o.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/stories/guidelines/application-interactions.mdx#scripture-editor--lists",rel:"nofollow",children:"Interactions/Scripture editor ↔ Lists"})]}),`
`,e.jsx(o.h2,{id:"single-and-multi-select-options-filters",children:"Single and multi select options, Filters"}),`
`,e.jsx(o.p,{children:"Using the"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/shadcn-select--docs",rel:"nofollow",children:"Select"})," component - for simple selections with little options"]}),`
`,e.jsxs(o.li,{children:["Combobox component - where search, grouping and more details are helpful",`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/basics-combobox--docs",rel:"nofollow",children:"Single Select Combobox"}),": use a ",e.jsx(o.a,{href:"https://lucide.dev/icons/chevron-down",rel:"nofollow",children:"Chevron Down"})," icon on the trigger, close on selection"]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/advanced-multiselectcombobox--docs",rel:"nofollow",children:"Multi Select Combobox"}),": use the default ",e.jsx(o.a,{href:"https://lucide.dev/icons/chevrons-up-down",rel:"nofollow",children:"Chevrons Up-Down"})," icon on the trigger, do not close on selection"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(o.p,{children:"Make sure to"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Show the selection with a start side checkbox (not on the end side like the ",e.jsx(o.a,{href:"https://ui.shadcn.com/docs/components/select",rel:"nofollow",children:"default New York style"}),") -- up for UX discussion"]}),`
`,e.jsx(o.li,{children:"Provide context by using headings and grouping"}),`
`,e.jsx(o.li,{children:"Apply sorting"}),`
`,e.jsx(o.li,{children:"Do not break the default component's focus and hover styles, overflow and grow-shrink behavior (if any, improve it)"}),`
`,e.jsx(o.li,{children:"Single select and multi select Combobox should behave the same - despite selection mode and different icon"}),`
`]}),`
`,e.jsx("iframe",{src:"https://embed.figma.com/design/hJirMCWP9O9riw39Gd5zyl/Design-System-Figma?node-id=0-1&embed-host=paratext-design-system",width:"100%",height:"400",style:{border:"none"},children:e.jsx(o.p,{children:"Your browser does not support iframes."})})]})}function x(n={}){const{wrapper:o}={...s(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(t,{...n})}):t(n)}export{x as default};
