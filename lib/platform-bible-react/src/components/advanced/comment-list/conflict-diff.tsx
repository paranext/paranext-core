import { cn } from '@/utils/shadcn-ui/utils';
import { sanitizeHtml } from 'platform-bible-utils';
import { COMMENT_BODY_PROSE_CLASSES } from './comment-list.utils';

// Renders the PT9 diff HTML the same way CommentItem renders note contents, plus theme-token coloring
// for the diff markup: <u> = inserted → green + semibold; <s> = deleted → red + strikethrough. This is
// a green/red text-color treatment (theme tokens only, no hardcoded colors) — NOT a copy of any single
// PT9 diff style: PT9's default (BlueGray) and RedGreen both use background highlights, and RedGreen has
// no strikethrough. The <u>/<s> markup itself comes from PT9's decode; only the coloring is ours (CSS).
// Shared by the expanded ConflictNoteCard and the collapsed ConflictThreadSummary so both render the
// conflict diff identically.
export const DIFF_HTML_CLASSES = cn(
  COMMENT_BODY_PROSE_CLASSES,
  // `prose` gives block children (the top-level blockquote wrapper, and any p — whether nested
  // inside that blockquote or, in the non-verseText fallback, a direct child) vertical margins that
  // make these already-compact cards feel bulky. Zero both so the diff sits flush inside the card.
  'tw:[&>blockquote]:my-0 tw:[&_p]:my-0',
  'tw:[&_u]:font-semibold tw:[&_u]:text-success-foreground tw:[&_u]:no-underline',
  'tw:[&_s]:text-destructive tw:[&_s]:line-through',
);

/**
 * Moves a diff span's trailing whitespace outside its closing tag (e.g. `<s>town </s>` →
 * `<s>town</s> `) so the strikethrough/color decoration stops at the word rather than dangling into
 * the inter-word gap. PT9 keeps each word's trailing space inside the diff token
 * (DiffToken.SplitUsfmTokens, FB-38914) and masks it with a background highlight; our text-only
 * decoration would otherwise show a stray strike over the space. Only whitespace is relocated
 * across the closing tag — no text changes. Diff spans hold plain text only, so this is safe.
 */
const trimDiffSpanWhitespace = (html: string) => html.replace(/(\s+)(<\/[us]>)/g, '$2$1');

/** Sanitizes PT9 diff HTML and normalizes diff-span trailing whitespace for the shared coloring. */
export const sanitizeDiffHtml = (html: string) => trimDiffSpanWhitespace(sanitizeHtml(html));

/** Renders already-sanitized PT9 diff HTML with the shared diff coloring. */
export function DiffHtml({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn(DIFF_HTML_CLASSES, className)}
      // The content is PT9 HTML; sanitized by the caller before injecting.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
