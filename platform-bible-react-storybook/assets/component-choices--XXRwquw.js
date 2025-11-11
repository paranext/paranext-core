import{j as e}from"./jsx-runtime-CvGToidP.js";import{useMDXComponents as s}from"./index-CNm5GXnS.js";import{M as i}from"./blocks-bGJDhVXO.js";import"./iframe-FHgAwj54.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";function t(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Guidelines/Component Choices"}),`
`,e.jsx(n.h1,{id:"component-choices",children:"Component Choices"}),`
`,e.jsx(n.p,{children:"Consistent usage of components across the application allows users to easily learn and use the application. They will know how to interact with the controls and what to expect from them."}),`
`,e.jsxs(n.p,{children:["It is an ongoing effort to review and agree on components and variants for common usage. Internal notes about this can be found ",e.jsx(n.a,{href:"https://docs.google.com/document/d/1gKmb2PnCWtRAbVN8ERskRRy-IoTRTsEpC4-kpgEvzxY/edit?tab=t.cmhqjv2sbcd#heading=h.feldja1s1r8b",rel:"nofollow",children:"here"})]}),`
`,e.jsx(n.h2,{id:"table-and-list",children:"Table and list"}),`
`,e.jsxs(n.p,{children:["For lists and tables, apply the ",e.jsx(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-scrollable/",rel:"nofollow",children:"listbox pattern"})," to make it ",e.jsx(n.a,{href:"#",children:"accessible"})]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Code: ",e.jsx(n.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/hooks/listbox-keyboard-navigation.hook.ts",rel:"nofollow",children:"listbox-keyboard-navigation.hook.ts"})]}),`
`]}),`
`,e.jsx(n.p,{children:"For tables, use"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/shadcn-table--docs",rel:"nofollow",children:"Table"})}),`
`,e.jsx(n.li,{children:"Data Table"}),`
`]}),`
`,e.jsx(n.p,{children:"For lists, use"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://ui.shadcn.com/docs/components/item",rel:"nofollow",children:"Item"})}),`
`]}),`
`,e.jsxs(n.p,{children:["Lists may be styled like a single column table ",e.jsx(n.strong,{children:"or"})," as a list of Card-like items."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["See ",e.jsx(n.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/basics-resultscard--docs",rel:"nofollow",children:"Result Card"})]}),`
`]}),`
`,e.jsxs(n.p,{children:["List entries and table rows may use context menus and ",e.jsx(n.a,{href:"https://lucide.dev/icons/ellipsis",rel:"nofollow",children:"Ellipsis"})," button to display more options in context of the item under the cursor."]}),`
`,e.jsx(n.p,{children:"There is a consistent selection and hover style for all lists, that is"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["hover: ",e.jsx(n.code,{children:"tw-bg-muted"})]}),`
`,e.jsxs(n.li,{children:["selected: ",e.jsx(n.code,{children:"tw-bg-muted/50"})]}),`
`]}),`
`,e.jsxs(n.p,{children:["There are consistent interaction patterns for lists, see ",e.jsx(n.a,{href:"https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/stories/guidelines/application-interactions.mdx#scripture-editor--lists",rel:"nofollow",children:"Interactions/Scripture editor ↔ Lists"})]}),`
`,e.jsx(n.h2,{id:"single-and-multi-select-options-filters",children:"Single and multi select options, Filters"}),`
`,e.jsx(n.p,{children:"Using the"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/shadcn-select--docs",rel:"nofollow",children:"Select"})," component - for simple selections with little options"]}),`
`,e.jsxs(n.li,{children:["Combobox component - where search, grouping and more details are helpful",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/basics-combobox--docs",rel:"nofollow",children:"Single Select Combobox"}),": use a ",e.jsx(n.a,{href:"https://lucide.dev/icons/chevron-down",rel:"nofollow",children:"Chevron Down"})," icon on the trigger, close on selection"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/advanced-multiselectcombobox--docs",rel:"nofollow",children:"Multi Select Combobox"}),": use the default ",e.jsx(n.a,{href:"https://lucide.dev/icons/chevrons-up-down",rel:"nofollow",children:"Chevrons Up-Down"})," icon on the trigger, do not close on selection"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:"Make sure to"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Show the selection with a start side checkbox (not on the end side like the ",e.jsx(n.a,{href:"https://ui.shadcn.com/docs/components/select",rel:"nofollow",children:"default New York style"}),") -- up for UX discussion"]}),`
`,e.jsx(n.li,{children:"Provide context by using headings and grouping"}),`
`,e.jsx(n.li,{children:"Apply sorting"}),`
`,e.jsx(n.li,{children:"Do not break the default component's focus and hover styles, overflow and grow-shrink behavior (if any, improve it)"}),`
`,e.jsx(n.li,{children:"Single select and multi select Combobox should behave the same - despite selection mode and different icon"}),`
`]}),`
`,e.jsx("iframe",{src:"https://embed.figma.com/design/hJirMCWP9O9riw39Gd5zyl/Design-System-Figma?node-id=0-1&embed-host=paratext-design-system",width:"100%",height:"400",style:{border:"none"},children:e.jsx(n.p,{children:"Your browser does not support iframes."})})]})}function p(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{p as default};
