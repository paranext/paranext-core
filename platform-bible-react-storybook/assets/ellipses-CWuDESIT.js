import{j as e}from"./jsx-runtime-CvGToidP.js";import{useMDXComponents as t}from"./index-CNm5GXnS.js";import{M as l}from"./blocks-bGJDhVXO.js";import"./iframe-FHgAwj54.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";function i(s){const n={a:"a",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Guidelines/Ellipses"}),`
`,e.jsx(n.h1,{id:"ellipses",children:"Ellipses"}),`
`,e.jsx(n.p,{children:"We have two rules about using ellipses on buttons and menu items"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Use a proper ellipsis character ",e.jsx(n.code,{children:"…"})," (U+2026), not three dots ",e.jsx(n.code,{children:"..."}),"."]}),`
`,e.jsxs(n.li,{children:["Only add an ellipsis if it won't ",e.jsx(n.em,{children:"do"})," an action immediately and there will be a chance to cancel."]}),`
`]}),`
`,e.jsx(n.h2,{id:"ellipsis-character",children:"Ellipsis character"}),`
`,e.jsx(n.p,{children:"Make sure to use a proper ellipsis character, not three consecutive periods."}),`
`,`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-diff",children:`- Open... // Don't use three periods
+ Open…   // Use ellipsis (U+2026)
`})}),`
`,e.jsx(n.h2,{id:"what-an-ellipsis-means",children:"What an ellipsis means"}),`
`,e.jsx(n.p,{children:"Conventionally, an ellipsis means an action will be interrupted by a choice and not done immediately."}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{}),e.jsx(n.th,{children:"Label without an ellipsis"}),e.jsx(n.th,{children:"Label ending with an ellipsis"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Means"})}),e.jsx(n.td,{children:"Do immediately."}),e.jsx(n.td,{children:"Do after a choice. You'll have a chance to back out."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Example"})}),e.jsx(n.td,{children:e.jsx(n.strong,{children:"New tab"})}),e.jsx(n.td,{children:e.jsx(n.strong,{children:"Open…"})})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"On click"})}),e.jsx(n.td,{children:"Immediately opens a new tab. There will be choices to make, but the tab will already exist at that point."}),e.jsxs(n.td,{children:["Opens a dialog to choose a file. ",e.jsx(n.strong,{children:"Cancel"})," will result in no action. Choosing a file and clicking ",e.jsx(n.strong,{children:"Open"})," will result in opening a file immediately."]})]})]})]}),`
`,e.jsxs(n.p,{children:["The grey area is that a great number of actions, especially navigation, are met by choices on the other end. In the above example, when a user makes a ",e.jsx(n.strong,{children:"New tab"}),", the tab is populated with choices for what to view. But at that point, the tab already exists, and there is no way to cancel the action, so the menu item's label doesn't end with an ellipsis."]}),`
`,e.jsx(n.p,{children:'To remember, lean strongly into the idea of "needs additional information" in a grammatical sense. These examples need ellipses because they need more info to complete the phrase:'}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"View > View as… (View as what!?)"}),`
`,e.jsx(n.li,{children:"File > Open… (Open what!?)"}),`
`]}),`
`,e.jsxs(n.p,{children:["In these examples, ",e.jsx(n.em,{children:"nothing"})," can be done until the user provides an object to fill in the ellipsis."]}),`
`,e.jsxs(n.p,{children:["In contrast, the following examples do ",e.jsx(n.strong,{children:"not"})," need ellipses"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Paratext 10 ",e.jsx(n.br,{}),`
`,e.jsx(n.strong,{children:"Help"})," > ",e.jsx(n.strong,{children:"About Paratext 10 Studio"})]}),`
`,e.jsxs(n.li,{children:["In Figma ",e.jsx(n.br,{}),`
`,e.jsx(n.strong,{children:"File"})," > ",e.jsx(n.strong,{children:"Open File Browser"})," ",e.jsx(n.br,{}),`
`,"Opening the file browser completes the action, so there's no missing info and no ellipsis needed."]}),`
`,e.jsxs(n.li,{children:["On macOS ",e.jsx(n.br,{}),`
`,e.jsx(n.strong,{children:"Apple"})," > ",e.jsx(n.strong,{children:"System Settings"})]}),`
`,e.jsxs(n.li,{children:["In Arc browser ",e.jsx(n.br,{}),`
`,e.jsx(n.strong,{children:"File"})," > ",e.jsx(n.strong,{children:"Capture Full Page"})," ",e.jsx(n.br,{}),`
`,"Notice that ",e.jsx(n.strong,{children:"Capture Full Page"}),' provides the object of "capture" but "Capture…" has no object to complete the verbal phrase, so it needs an ellipsis. ',e.jsx(n.br,{}),`
`,e.jsx(n.img,{src:"../../../assets/arc-file-menu.png",alt:"File menu from Arc browser"})]}),`
`]}),`
`,e.jsx(n.h3,{id:"historical-context-of-ellipsis",children:"Historical context of ellipsis"}),`
`,e.jsx(n.p,{children:"There used to be a lot more ellipses used in commands and menu items; Paratext's policy on ellipses should result in fewer than older applications."}),`
`,e.jsx(n.p,{children:"Here's an example of a menu item that conventionally gets an ellipsis but wouldn't according to our policy."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-diff",children:`- Paratext > Settings… // old convention
+ Paratext > Settings  // new
`})}),`
`,e.jsx(n.p,{children:`At the time of writing this article, while the English localization of "Settings" in Paratext 10 doesn't use an ellipsis (and it shouldn't), the Spanish localization does (and it also shouldn't!).`}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-diff",children:`// es.json
- "%mainMenu_settings%": "Configuración...", // non-compliant
+ "%mainMenu_settings%": "Configuración",

// en.json
+ "%mainMenu_settings%": "Settings", // fits policy
`})}),`
`,e.jsxs(n.p,{children:["The ellipsis after ",e.jsx(n.strong,{children:"Settings"}),' is so pervasive that in an audit of 20 macOS applications, every app used "Settings…" with an ellipsis. This convention is standardized by the ',e.jsx(n.a,{href:"https://developer.apple.com/design/human-interface-guidelines/the-menu-bar#App-menu",rel:"nofollow",children:"Apple Human Interface Guidelines"}),". This would be a good reason to make an exception, and we may choose to do so in the future."]})]})}function p(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{p as default};
