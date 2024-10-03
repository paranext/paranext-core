import { cn } from '@/utils/shadcn-ui.util';
import Markdown from 'markdown-to-jsx';

interface MarkdownRendererProps {
  /** Optional unique identifier */
  id?: string;
  /** The markdown string to render */
  markdown: string;
  className?: string;
}

/**
 * This component renders markdown content given a markdown string. It uses typography styles from
 * the platform.
 *
 * @param markdown The markdown string to render.
 * @param id Optional unique identifier
 * @returns A div containing the rendered markdown content.
 */
export default function MarkdownRenderer({ id, markdown, className }: MarkdownRendererProps) {
  return (
    <div id={id} className={cn('pr-twp tw-prose', className)}>
      <Markdown>{markdown}</Markdown>
    </div>
  );
}
