import Markdown from 'markdown-to-jsx';

interface MarkdownRendererProps {
  markdown: string;
}

/**
 * This component renders markdown content given a markdown string. It uses typography styles from the platform.
 * 
 * @param markdown The markdown string to render. 
 * @returns A div containing the rendered markdown content.
 */
export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  return (
    <div className="pr-prose">
      <Markdown>{markdown}</Markdown>
    </div>
  );
}
