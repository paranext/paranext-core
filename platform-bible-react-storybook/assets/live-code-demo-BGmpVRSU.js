import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{useMDXComponents as s}from"./index-CivEZp7D.js";import{M as r,D as i}from"./blocks-BgkOkf5T.js";import{C as d,B as l,I as c,a,b as h}from"./live-code-demo.stories-iTGcywM0.js";import"./iframe-BcYeWgcr.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";import"./button-BklEqBlb.js";import"./index-BJ893FO-.js";import"./index-DNc3TkLQ.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./input-CLS-C3Rv.js";function o(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d,name:"Docs"}),`
`,e.jsx(n.h1,{id:"live-code-editing-guide",children:"Live code editing guide"}),`
`,e.jsxs(n.p,{children:["This Storybook includes live code editing capabilities powered by ",e.jsx(n.code,{children:"storybook-addon-code-editor"}),". You can edit React TypeScript code in real-time using the Live Code Editor tab in the Storybook Panel and see changes immediately on the canvas."]}),`
`,e.jsx(n.h2,{id:"how-to-use",children:"How to Use"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Navigate to any Live Edit enabled story"})," in this section"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Look for the live code editor"})," - It will appear as a a tab in the bottom section."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Edit the code"})," directly in the editor"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"See changes instantly"})," on the canvas above"]}),`
`]}),`
`,e.jsx(n.h2,{id:"examples-to-try",children:"Examples to try"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"?path=/story/demo-live-code-editor--basic-example",children:e.jsx(n.strong,{children:"BasicExample"})}),`
`,e.jsx(i,{of:l}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"?path=/story/demo-live-code-editor--interactive-counter",children:e.jsx(n.strong,{children:"InteractiveCounter"})}),`
`,e.jsx(i,{of:c}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"?path=/story/demo-live-code-editor--counter",children:e.jsx(n.strong,{children:"Counter"})}),`
`,e.jsx(i,{of:a}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"?path=/story/demo-live-code-editor--input-with-state",children:e.jsx(n.strong,{children:"InputWithState"})}),`
`,e.jsx(i,{of:h}),`
`]}),`
`]}),`
`,e.jsx(n.h2,{id:"editing-code",children:"Editing code"}),`
`,e.jsx(n.p,{children:"Changes are temporary and won't affect the actual codebase."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Use Visual Studio Code shortcuts"}),`
`,e.jsxs(n.li,{children:[e.jsx("kbd",{children:"⌘"}),e.jsx("kbd",{children:"Z"})," or ",e.jsx("kbd",{children:"Ctrl"}),"+",e.jsx("kbd",{children:"Z"})," to undo changes"]}),`
`,e.jsxs(n.li,{children:[e.jsx("kbd",{children:"⌘"}),e.jsx("kbd",{children:"S"})," or ",e.jsx("kbd",{children:"Ctrl"}),"+",e.jsx("kbd",{children:"S"})," to format code"]}),`
`]}),`
`,e.jsx(n.h3,{id:"whats-available",children:"What's available"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["✅ ",e.jsx(n.strong,{children:"React Hooks"})," - useState, useEffect, and other hooks work out of the box (already imported)",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:` // Add state
 const [value, setValue] = useState('initial');

 // Add event handlers
 onClick={() => console.log('clicked')}
`})}),`
`]}),`
`,e.jsxs(n.li,{children:["✅ ",e.jsx(n.strong,{children:"Component Library"})," - Tailwind styling and Shadcn/ui components like Button and Input",`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-TypeScript",children:`// First, make components available to your Story:
const sharedImports = {
  '@/components/shadcn-ui/button': { Button },
  '@/components/shadcn-ui/input': { Input },
} as const;

makeLiveEditStory(YourStory, {
  code: \`/* your code */\`,
  availableImports: sharedImports,
});

// Then use them in your live code:
<Button variant="destructive">Click me</Button>
<Input placeholder="Type here..." />
`})}),`
`]}),`
`,e.jsxs(n.li,{children:["✅ ",e.jsx(n.strong,{children:"Monaco editor"})," - Visual Studio Code's editor with familiar shortcuts"]}),`
`,e.jsxs(n.li,{children:["✅ ",e.jsx(n.strong,{children:"TypeScript support"})," - Full syntax highlighting and IntelliSense"]}),`
`]}),`
`,e.jsx(n.h2,{id:"-ready-to-start",children:"🚀 Ready to start?"}),`
`,e.jsxs(n.p,{children:["Head to ",e.jsx(n.a,{href:"?path=/story/demo-live-code-editor--basic-example",children:e.jsx(n.strong,{children:"BasicExample"})})," to try your first live edit!"]})]})}function E(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{E as default};
