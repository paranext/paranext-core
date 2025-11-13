import DOMPurify from 'dompurify';

/**
 * Check if an HTML string contains custom Paratext-specific tags
 *
 * @param html - HTML string to check
 * @returns True if the HTML contains <color> or <language> tags
 */
export function hasCustomParatextTags(html: string): boolean {
  return /<color[^>]*>|<language[^>]*>/i.test(html);
}

/**
 * Parse Paratext specific HTML tags to standard HTML
 *
 * @param html - HTML string to parse
 * @returns Parsed HTML string
 */
export function parseParatextHtml(html: string): string {
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
 * Sanitizes HTML content to prevent security risks while preserving safe formatting.
 *
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      's',
      'span',
      'div',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'blockquote',
      'code',
      'pre',
    ],
    ALLOWED_ATTR: ['style', 'href', 'target', 'rel', 'class'],
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
  });
}
