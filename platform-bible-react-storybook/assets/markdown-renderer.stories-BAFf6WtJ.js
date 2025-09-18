import{j as a}from"./jsx-runtime-4wK_0ZO4.js";import{M as T}from"./markdown-renderer.component-DWWrHvCP.js";import{T as j}from"./theme-provider.component-Bum-YBGl.js";import"./iframe-BcYeWgcr.js";import"./shadcn-ui.util-DMJ19wEV.js";const R={title:"Advanced/MarkdownRenderer",component:T,tags:["autodocs"],decorators:[v=>a.jsx(j,{children:a.jsx("div",{className:"tw-max-w-4xl tw-p-4",children:a.jsx(v,{})})})],argTypes:{markdown:{control:"text"},className:{control:"text"},anchorTarget:{control:"select",options:["_blank","_self","_parent","_top"]}}},e={args:{markdown:`# Hello World

This is a **markdown** renderer component that supports:

- Lists
- *Italic text*
- **Bold text**
- [Links](https://example.com)
- \`Inline code\`

## Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> This is a blockquote

### Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |`},parameters:{docs:{description:{story:"A comprehensive markdown renderer supporting various markdown features."}}}},n={args:{markdown:"This is **simple** markdown with *italic* text and a [link](https://example.com)."},parameters:{docs:{description:{story:"Simple markdown text with basic formatting."}}}},t={args:{markdown:`# Scripture Editor Extension

A powerful extension for editing and annotating biblical texts.

## Features

- **Real-time collaboration** - Work together with your translation team
- **Advanced search** - Find specific verses and passages quickly
- **Comments and notes** - Add annotations to specific verses
- **Export options** - Export your work in multiple formats

## Installation

1. Download the extension from the marketplace
2. Install using the extension manager
3. Restart the application

For more information, visit our [documentation](https://docs.example.com).`},parameters:{docs:{description:{story:"Example markdown content for an extension description."}}}},o={args:{markdown:`Check out these resources:

- [Platform.Bible Documentation](https://platform.bible)
- [GitHub Repository](https://github.com/paranext/paranext-core)
- [Community Discord](https://discord.gg/paranext)

All links will open in a new tab.`,anchorTarget:"_blank"},parameters:{docs:{description:{story:"Markdown with links that open in a new tab."}}}},r={args:{markdown:`## Custom Styled Content

This markdown has custom CSS classes applied for specific styling needs.

- Custom spacing
- Different typography
- Theme-aware colors`,className:"tw-prose-sm tw-text-muted-foreground"},parameters:{docs:{description:{story:"Markdown renderer with custom CSS classes for styling."}}}},s={args:{markdown:`# Code Examples

Inline code: \`const message = "Hello World";\`

## JavaScript Example

\`\`\`javascript
function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result); // Output: 8
\`\`\`

## TypeScript Example

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
\`\`\`

## JSON Example

\`\`\`json
{
  "name": "My Extension",
  "version": "1.0.0",
  "description": "A sample extension"
}
\`\`\``},parameters:{docs:{description:{story:"Markdown renderer showcasing various code block syntaxes."}}}};var i,c,l;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    markdown: \`# Hello World

This is a **markdown** renderer component that supports:

- Lists
- *Italic text*
- **Bold text**
- [Links](https://example.com)
- \\\`Inline code\\\`

## Code Block

\\\`\\\`\\\`javascript
function greet(name) {
  return \\\`Hello, \\\${name}!\\\`;
}
\\\`\\\`\\\`

> This is a blockquote

### Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |\`
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive markdown renderer supporting various markdown features.'
      }
    }
  }
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var m,p,d;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    markdown: 'This is **simple** markdown with *italic* text and a [link](https://example.com).'
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple markdown text with basic formatting.'
      }
    }
  }
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,h,x;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    markdown: \`# Scripture Editor Extension

A powerful extension for editing and annotating biblical texts.

## Features

- **Real-time collaboration** - Work together with your translation team
- **Advanced search** - Find specific verses and passages quickly
- **Comments and notes** - Add annotations to specific verses
- **Export options** - Export your work in multiple formats

## Installation

1. Download the extension from the marketplace
2. Install using the extension manager
3. Restart the application

For more information, visit our [documentation](https://docs.example.com).\`
  },
  parameters: {
    docs: {
      description: {
        story: 'Example markdown content for an extension description.'
      }
    }
  }
}`,...(x=(h=t.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var w,g,k;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    markdown: \`Check out these resources:

- [Platform.Bible Documentation](https://platform.bible)
- [GitHub Repository](https://github.com/paranext/paranext-core)
- [Community Discord](https://discord.gg/paranext)

All links will open in a new tab.\`,
    anchorTarget: '_blank'
  },
  parameters: {
    docs: {
      description: {
        story: 'Markdown with links that open in a new tab.'
      }
    }
  }
}`,...(k=(g=o.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var f,y,C;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    markdown: \`## Custom Styled Content

This markdown has custom CSS classes applied for specific styling needs.

- Custom spacing
- Different typography
- Theme-aware colors\`,
    className: 'tw-prose-sm tw-text-muted-foreground'
  },
  parameters: {
    docs: {
      description: {
        story: 'Markdown renderer with custom CSS classes for styling.'
      }
    }
  }
}`,...(C=(y=r.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};var b,S,E;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    markdown: \`# Code Examples

Inline code: \\\`const message = "Hello World";\\\`

## JavaScript Example

\\\`\\\`\\\`javascript
function calculateSum(a, b) {
  return a + b;
}

const result = calculateSum(5, 3);
console.log(result); // Output: 8
\\\`\\\`\\\`

## TypeScript Example

\\\`\\\`\\\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
\\\`\\\`\\\`

## JSON Example

\\\`\\\`\\\`json
{
  "name": "My Extension",
  "version": "1.0.0",
  "description": "A sample extension"
}
\\\`\\\`\\\`\`
  },
  parameters: {
    docs: {
      description: {
        story: 'Markdown renderer showcasing various code block syntaxes.'
      }
    }
  }
}`,...(E=(S=s.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};const H=["Default","Simple","ExtensionDescription","LinksOpenInNewTab","CustomStyling","CodeExamples"];export{s as CodeExamples,r as CustomStyling,e as Default,t as ExtensionDescription,o as LinksOpenInNewTab,n as Simple,H as __namedExportsOrder,R as default};
