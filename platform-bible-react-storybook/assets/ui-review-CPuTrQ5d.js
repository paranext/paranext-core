import{j as e,M as n}from"./iframe-Cm01qzT1.js";import{useMDXComponents as i}from"./index-B1U2z0oa.js";import"./preload-helper-CTOgD26E.js";function s(r){const t={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",input:"input",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{title:"Guidelines/UI Review"}),`
`,e.jsx(t.h1,{id:"ui-review",children:"UI Review"}),`
`,e.jsxs(t.p,{children:["A UI work item can only be moved to ",e.jsx(t.code,{children:"Done"})," once its UX review property is set to ",e.jsx(t.code,{children:"done"})," or ",e.jsx(t.code,{children:"review not needed"}),". This article covers what that review looks like and how to get there."]}),`
`,e.jsx(t.p,{children:e.jsx(t.em,{children:"Written by Alex Mercado, UX"})}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{id:"request-a-ux-review",children:"Request a UX review"}),`
`,e.jsx(t.h3,{id:"pre-review-checklist",children:"Pre-Review Checklist"}),`
`,e.jsxs(t.ul,{className:"contains-task-list",children:[`
`,e.jsxs(t.li,{className:"task-list-item",children:[e.jsx(t.input,{type:"checkbox",disabled:!0})," ","Acceptance criteria are checked off or explicitly declared in the Jira work item"]}),`
`,e.jsxs(t.li,{className:"task-list-item",children:[e.jsx(t.input,{type:"checkbox",disabled:!0})," ","Jira UX review property is set to ",e.jsx(t.code,{children:"needs review"})]}),`
`,e.jsxs(t.li,{className:"task-list-item",children:[e.jsx(t.input,{type:"checkbox",disabled:!0})," ","Storybook stories or documentation demonstrate the work"]}),`
`,e.jsxs(t.li,{className:"task-list-item",children:[e.jsx(t.input,{type:"checkbox",disabled:!0})," ","The PR description links to any reference UIs using specific file paths and ",e.jsx(t.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/",rel:"nofollow",children:"Storybook"})," links"]}),`
`,e.jsxs(t.li,{className:"task-list-item",children:[e.jsx(t.input,{type:"checkbox",disabled:!0})," ","A narrated before/after video or screen recording is posted in the PR description or Jira work item, or else a meeting is requested"]}),`
`]}),`
`,e.jsx(t.h3,{id:"submitting-the-request",children:"Submitting the request"}),`
`,e.jsxs(t.p,{children:["Post in a new thread in ",e.jsx(t.a,{href:"https://ptb.discord.com/channels/892072317436448768/1451254233910476992",rel:"nofollow",children:"#review-ux"})," on the Paratext Discord. Include:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["A link to the ",e.jsx(t.strong,{children:"Jira work item"})," — full URL, e.g. ",e.jsx(t.code,{children:"https://paratextstudio.atlassian.net/browse/PT-3901"}),", not just ",e.jsx(t.code,{children:"PT-3901"})]}),`
`,e.jsxs(t.li,{children:["A link to the ",e.jsx(t.strong,{children:"GitHub PR"})]}),`
`,e.jsx(t.li,{children:"A brief description of what was done"}),`
`]}),`
`,e.jsxs(t.p,{children:["Also include a link to the Jira work item ",e.jsx(t.strong,{children:"in the PR description"}),", so it is traceable from the code change."]}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{id:"reference",children:"Reference"}),`
`,e.jsx(t.h3,{id:"jira-ux-review-property",children:"Jira UX review property"}),`
`,e.jsxs(t.p,{children:["Every Jira work item has a ",e.jsx(t.strong,{children:"UX review"})," property, set during grooming:"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"State"}),e.jsx(t.th,{children:"Meaning"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"open"})}),e.jsxs(t.td,{children:[e.jsx(t.strong,{children:"Default"})," — not yet assessed or decision deferred"]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"needs review"})}),e.jsx(t.td,{children:"Changes affect the user experience enough to need a UX review"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"done"})}),e.jsx(t.td,{children:"UX review completed and approved"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"review not needed"})}),e.jsx(t.td,{children:"UX approval explicitly not required"})]})]})]}),`
`,e.jsx(t.h3,{id:"acceptance-criteria",children:"Acceptance criteria"}),`
`,e.jsxs(t.p,{children:["Checkboxes on a Jira work item assert that the developer ",e.jsx(t.strong,{children:"did the thing"})," — not that it has been verified. Checking a box is a claim, not a sign-off."]}),`
`,e.jsx(t.p,{children:"Verification is the responsibility of:"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"What"}),e.jsx(t.th,{children:"Who verifies"}),e.jsx(t.th,{children:"Where to post"}),e.jsx(t.th,{children:"Notes"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Code quality"}),e.jsx(t.td,{children:"Code reviewer"}),e.jsxs(t.td,{children:["New ",e.jsx(t.a,{href:"https://ptb.discord.com/channels/1064938364597436416/1369016160485511222",rel:"nofollow",children:"#reviews"})," thread on Platform.Bible Discord"]}),e.jsxs(t.td,{children:["Review happens in Reviewable (built on ",e.jsx(t.a,{href:"https://github.com/paranext",rel:"nofollow",children:"GitHub"}),")"]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"User interface and experience"}),e.jsx(t.td,{children:"UX reviewer"}),e.jsxs(t.td,{children:["New ",e.jsx(t.a,{href:"https://ptb.discord.com/channels/892072317436448768/1451254233910476992",rel:"nofollow",children:"#review-ux"})," thread on Paratext Discord — one thread per issue"]}),e.jsx(t.td,{children:"Subtasks receive a directional review; parent work items require full UX approval."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:"Functional behavior"}),e.jsx(t.td,{children:"QA / testing"}),e.jsxs(t.td,{children:["New ",e.jsx(t.a,{href:"https://ptb.discord.com/channels/892072317436448768/1451251686709395548",rel:"nofollow",children:"#10-simple-testing"})," or ",e.jsx(t.a,{href:"https://ptb.discord.com/channels/892072317436448768/1451251722340139141",rel:"nofollow",children:"#10-power-testing"})," thread on Paratext Discord — one thread per item"]}),e.jsx(t.td,{children:"Testing happens independently after the code is marked done."})]})]})]}),`
`,e.jsx(t.h3,{id:"subtask-reviews",children:"Subtask reviews"}),`
`,e.jsxs(t.p,{children:["Work items are sometimes split into subtasks for engineering reasons. Subtask UX reviews can be treated as ",e.jsx(t.strong,{children:"check-ins"})," rather than full approvals — the parent work item is still the unit that requires UX sign-off. Don't block subtask PRs waiting for full UX approval, but make sure the parent gets a complete review before it closes."]}),`
`,e.jsx(t.h3,{id:"storybook-deliverables",children:"Storybook deliverables"}),`
`,e.jsxs(t.p,{children:["Every UI work item should have a ",e.jsx(t.strong,{children:"Storybook deliverable"})," — a story or documentation page that demonstrates the component or interaction. This makes the work reviewable, testable, and shareable without needing to run the full app."]}),`
`,e.jsx(t.h3,{id:"linking-to-reference-ui",children:"Linking to reference UI"}),`
`,e.jsxs(t.p,{children:["When your PR description references other parts of the UI for comparison, provide ",e.jsx(t.strong,{children:"specific file paths and Storybook links"})," — not just names. This allows reviewers and AI-assisted review tools to actually locate and verify those references."]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Unhelpful:"})}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:'"Adjusted padding to be consistent with the rest of the platform."'}),`
`]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Helpful:"})}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:['"Adjusted padding to match the ',e.jsx(t.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/basics-searchbar--docs",rel:"nofollow",children:"SearchBar"})," (",e.jsx(t.code,{children:"lib/platform-bible-react/src/components/basics/search-bar.component.tsx"}),") and the ",e.jsx(t.a,{href:"https://paranext.github.io/paranext-core/platform-bible-react-storybook/?path=/docs/advanced-tabtoolbar--docs",rel:"nofollow",children:"TabToolbar"})," (",e.jsx(t.code,{children:"lib/platform-bible-react/src/components/advanced/tab-toolbar/tab-toolbar.component.tsx"}),')."']}),`
`]})]})}function c(r={}){const{wrapper:t}={...i(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(s,{...r})}):s(r)}export{c as default};
