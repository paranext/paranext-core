import { cn } from '@/utils/shadcn-ui.util';
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { useMemo } from 'react';

interface MarkdownRendererProps {
  /** Optional unique identifier */
  id?: string;
  /** The markdown string to render */
  markdown: string;
  className?: string;
  /**
   * The [`target` attribute for `a` html
   * tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target). Defaults to not
   * adding a `target` to `a` tags
   */
  anchorTarget?: string;
  /** Optional flag to truncate the content to 3 lines */
  truncate?: boolean;
}

/**
 * Parse Paratext specific HTML tags
 *
 * @param html - HTML string to parse
 * @returns Parsed HTML string
 */
function parseParatextHtml(html: string): string {
  return (
    html
      // Replace `<strikethrough>` with `<s>`
      .replace(/<strikethrough>([\s\S]*?)<\/strikethrough>/gi, '<s>$1</s>')
      // Convert `<color>` tags to `<span>` with inline color styles
      .replace(
        /<color[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/color>/gi,
        (_match, colorName, content) => {
          // Map common color names to CSS colors
          const colorMap: Record<string, string> = {
            red: '#ef4444',
            green: '#22c55e',
            blue: '#3b82f6',
          };

          const cssColor = colorMap[colorName.toLowerCase()] || colorName;
          return `<span style="color: ${cssColor}">${content}</span>`;
        },
      )
      // Remove `<language>` tags but keep their content
      // TODO: This needs to be revisited when we support multilingual content
      .replace(/<language[^>]*>([\s\S]*?)<\/language>/gi, '$1')
  );
}

/**
 * Truncate markdown content to approximately 3 lines worth of text
 *
 * @param markdown - Markdown string to truncate
 * @returns Truncated markdown string
 */
function truncateMarkdown(markdown: string): string {
  // Remove markdown formatting to get plain text length
  const plainText = markdown
    .replace(/[#*_~`[\]()]/g, '') // Remove markdown syntax characters
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim();

  // Approximate character limit for 3 lines (assuming ~50 chars per line)
  const charLimit = 150;

  if (plainText.length <= charLimit) {
    return markdown;
  }

  // Find a good breaking point (end of word, sentence, or paragraph)
  let truncateAt = charLimit;
  const breakPoints = ['. ', '! ', '? ', '\n', ' '];

  // Try to find a natural break point near the limit
  const foundBreak = breakPoints.find((breakPoint) => {
    const lastBreak = plainText.lastIndexOf(breakPoint, charLimit);
    if (lastBreak > charLimit * 0.7) {
      // Accept break if it's at least 70% of desired length
      truncateAt = lastBreak + breakPoint.length;
      return true;
    }
    return false;
  });

  // If we didn't find a good break point, truncateAt remains charLimit
  if (!foundBreak) {
    truncateAt = charLimit;
  }

  // Truncate the original markdown at approximately the same position
  // This is approximate since markdown has formatting characters
  return `${markdown.slice(0, truncateAt).trim()}...`;
}

/**
 * This component renders markdown content given a markdown string. It uses typography styles from
 * the platform.
 *
 * @param MarkdownRendererProps
 * @returns A div containing the rendered markdown content.
 */
export function MarkdownRenderer({
  id,
  markdown,
  className,
  anchorTarget,
  truncate,
}: MarkdownRendererProps) {
  // Clean up Paratext-specific HTML before rendering
  const cleanedMarkdown = useMemo(() => parseParatextHtml(markdown), [markdown]);

  // Truncate content if needed
  const processedMarkdown = useMemo(
    () => (truncate ? truncateMarkdown(cleanedMarkdown) : cleanedMarkdown),
    [cleanedMarkdown, truncate],
  );

  const options: MarkdownToJSX.Options = useMemo(
    () => ({
      overrides: {
        a: {
          props: {
            target: anchorTarget,
          },
        },
      },
    }),
    [anchorTarget],
  );
  return (
    <div id={id} className={cn('pr-twp', className)}>
      <Markdown options={options}>{processedMarkdown}</Markdown>
    </div>
  );
}

export default MarkdownRenderer;
