import MarkdownRenderer from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import { Input } from '@/components/shadcn-ui/input';
import { useState } from 'react';

function MarkdownRendererExample() {
  const [markdown, setMarkdown] = useState(`
# Sample Markdown

<!-- Here's a comment -->

This is an example of some markdown content that can be displayed using the \`MarkdownRenderer\` component in \`platform-bible-react\`.
- This is *one thing*
- This is **another**

<div style="color: red">
This is a red div
</div>

## Here's an h2

1. Here's the first list item
2. And the second item
3. Visit [example.com](https://example.com) now!

| Sample  | Column | headers |
|---------|--------|---------|
| Row     | thing  | another |
| Header  | some   | thing   |
| Another | 3      | *512*   |

\`\`\`typescript
const doesSupportCodeBlocks = true;
const doesSupportSyntaxHighlighting = false;
\`\`\``);
  const [anchorTarget, setAnchorTarget] = useState('');
  return (
    <div>
      <div>
        Anchor Target:{' '}
        <Input
          className="tw-inline-block"
          value={anchorTarget}
          onChange={(event) => setAnchorTarget(event.target.value)}
        />{' '}
        (Change this to _blank to make links open in a new tab)
      </div>
      <textarea
        className="tw-resize"
        cols={60}
        rows={15}
        value={markdown}
        onChange={(event) => setMarkdown(event.target.value)}
      />
      <MarkdownRenderer markdown={markdown} anchorTarget={anchorTarget} />
    </div>
  );
}

export default MarkdownRendererExample;
