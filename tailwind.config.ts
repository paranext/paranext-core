// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/tailwind.config.ts and https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/tailwind.config.ts

import { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  // Theme from shadcn/ui
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--foreground)',
            '--tw-prose-headings': 'var(--foreground)',
            '--tw-prose-lead': 'var(--muted-foreground)',
            '--tw-prose-links': 'var(--primary)',
            '--tw-prose-bold': 'var(--foreground)',
            '--tw-prose-counters': 'var(--muted-foreground)',
            '--tw-prose-bullets': 'var(--muted-foreground)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-quotes': 'var(--foreground)',
            '--tw-prose-quote-borders': 'var(--border)',
            '--tw-prose-captions': 'var(--muted-foreground)',
            '--tw-prose-code': 'var(--foreground)',
            '--tw-prose-pre-code': 'var(--muted-foreground)',
            '--tw-prose-pre-bg': 'var(--muted)',
            '--tw-prose-th-borders': 'var(--border)',
            '--tw-prose-td-borders': 'var(--border)',
            // We handle dark mode with CSS variables, so the invert colors are the same as normal
            '--tw-prose-invert-body': 'var(--foreground)',
            '--tw-prose-invert-headings': 'var(--foreground)',
            '--tw-prose-invert-lead': 'var(--muted-foreground)',
            '--tw-prose-invert-links': 'var(--primary)',
            '--tw-prose-invert-bold': 'var(--foreground)',
            '--tw-prose-invert-counters': 'var(--muted-foreground)',
            '--tw-prose-invert-bullets': 'var(--muted-foreground)',
            '--tw-prose-invert-hr': 'var(--border)',
            '--tw-prose-invert-quotes': 'var(--foreground)',
            '--tw-prose-invert-quote-borders': 'var(--border)',
            '--tw-prose-invert-captions': 'var(--muted-foreground)',
            '--tw-prose-invert-code': 'var(--foreground)',
            '--tw-prose-invert-pre-code': 'var(--muted-foreground)',
            '--tw-prose-invert-pre-bg': 'var(--muted)',
            '--tw-prose-invert-th-borders': 'var(--border)',
            '--tw-prose-invert-td-borders': 'var(--border)',
            blockquote: {
              // The default quotes are encoded with 0o or \, and it makes them not display in our
              // environment. So override them with not encoded characters to make them work.
              quotes: ['"“"', '"”"', '"‘"', '"’"'],
            },
          },
        },
        // Can use `tw:prose tw:prose-quoteless` to remove quotes on `blockquote`s
        // Thanks to RobinMalfait https://github.com/tailwindlabs/tailwindcss-typography/issues/66#issuecomment-756834635
        quoteless: {
          css: {
            blockquote: { quotes: 'none' },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  plugins: [
    // Prose styles as sensible defaults for markdown renderer component
    typography(),
  ],
};

export default config;

// #endregion
