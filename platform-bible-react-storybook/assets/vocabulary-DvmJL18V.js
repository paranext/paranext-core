import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{useMDXComponents as o}from"./index-CivEZp7D.js";import{M as s}from"./blocks-BgkOkf5T.js";import"./iframe-BcYeWgcr.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";function r(n){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Guidelines/Vocabulary"}),`
`,`
`,e.jsx(t.h1,{id:"vocabulary",children:"Vocabulary"}),`
`,e.jsx(t.p,{children:"Vocabulary isn’t a glossary or a dictionary. It contains usage guidelines for terms specific to products, extensions, and training in the Paratext Ecosystem."}),`
`,e.jsxs(t.p,{children:["To recommend additions, ",e.jsx(t.a,{href:"mailto:feedback+studio@paratext.org",children:"email the UX team"})," or make a pull request to ",e.jsx(t.a,{href:"https://github.com/paranext/paranext-core/tree/main/src/stories/Vocabulary.mdx",rel:"nofollow",children:"this file on Github"}),"."]}),`
`,e.jsx(t.h2,{id:"user-facing-vocabulary",children:"User-facing vocabulary"}),`
`,e.jsx(t.h3,{id:"my-vs-your",children:"my vs. your"}),`
`,e.jsx(t.p,{children:'Use "your", not "my", in the UI and related text'}),`
`,e.jsx(t.p,{children:`Using second person maintains a consistent voice and promotes a friendly, conversational quality. While "my" can feel personal, it risks encroaching on a user's sense of personal space and attributing choices to them that they haven't made. "Your" is clearer and avoids confusion because it can be used more consistently. For example, try writing this error message with "my":`}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-diff",children:`+ The following files are different from the shared project.  Do you wish to overwrite them with the shared project files?
- The following files are different from the shared project.  Do I wish to overwrite them with the shared project files?
`})}),`
`,e.jsx(t.p,{children:`Since some messages are best given in the second person, we use "your" to refer to the user. This keeps the focus on the user's actions and choices, while still allowing for a personal touch when needed.`}),`
`,e.jsx(t.h3,{id:"entry",children:"entry"}),`
`,e.jsx(t.p,{children:"Use entry to refer to a single item in a list."}),`
`,e.jsx(t.h3,{id:"filter",children:"filter"}),`
`,e.jsx(t.p,{children:"Use filter for UI elements that narrow down lists by type, language, or other criteria."}),`
`,e.jsx(t.h2,{id:"development-vocabulary",children:"Development vocabulary"}),`
`,e.jsx(t.h3,{id:"badge",children:"badge"}),`
`,e.jsx(t.p,{children:"Use badge for small UI elements that highlight status or category (e.g., installed, update available)."}),`
`,e.jsx(t.h3,{id:"muted",children:"muted"}),`
`,e.jsx(t.p,{children:"Use muted for text or UI elements that are less prominent, often for secondary information."}),`
`,e.jsx(t.h3,{id:"ghost",children:"ghost"}),`
`,e.jsx(t.p,{children:"Use ghost for control styles with very low emphasis. Ghost styles lack visual indications of their bounds, such as background color or border (unless they're hovered or focused). Ghost styles are often used in toolbars, dropdowns, or secondary actions."}),`
`]})}function u(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{u as default};
