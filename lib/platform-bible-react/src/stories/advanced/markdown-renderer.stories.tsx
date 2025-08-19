import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkdownRenderer } from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof MarkdownRenderer> = {
  title: 'Advanced/MarkdownRenderer',
  component: MarkdownRenderer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-4xl tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    markdown: { control: 'text' },
    className: { control: 'text' },
    anchorTarget: { control: 'select', options: ['_blank', '_self', '_parent', '_top'] },
  },
};

export default meta;

type Story = StoryObj<typeof MarkdownRenderer>;

export const Default: Story = {
  args: {
    markdown: `# Hello World

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
| Cell 4   | Cell 5   | Cell 6   |`,
  },
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive markdown renderer supporting various markdown features.',
      },
    },
  },
};

export const Simple: Story = {
  args: {
    markdown: 'This is **simple** markdown with *italic* text and a [link](https://example.com).',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple markdown text with basic formatting.',
      },
    },
  },
};

export const ExtensionDescription: Story = {
  args: {
    markdown: `# Scripture Editor Extension

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

For more information, visit our [documentation](https://docs.example.com).`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example markdown content for an extension description.',
      },
    },
  },
};

export const LinksOpenInNewTab: Story = {
  args: {
    markdown: `Check out these resources:

- [Platform.Bible Documentation](https://platform.bible)
- [GitHub Repository](https://github.com/paranext/paranext-core)
- [Community Discord](https://discord.gg/paranext)

All links will open in a new tab.`,
    anchorTarget: '_blank',
  },
  parameters: {
    docs: {
      description: {
        story: 'Markdown with links that open in a new tab.',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    markdown: `## Custom Styled Content

This markdown has custom CSS classes applied for specific styling needs.

- Custom spacing
- Different typography
- Theme-aware colors`,
    className: 'tw-prose-sm tw-text-muted-foreground',
  },
  parameters: {
    docs: {
      description: {
        story: 'Markdown renderer with custom CSS classes for styling.',
      },
    },
  },
};

export const CodeExamples: Story = {
  args: {
    markdown: `# Code Examples

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
\`\`\``,
  },
  parameters: {
    docs: {
      description: {
        story: 'Markdown renderer showcasing various code block syntaxes.',
      },
    },
  },
};
