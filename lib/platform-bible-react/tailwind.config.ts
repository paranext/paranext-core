// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/tailwind.config.ts and https://github.com/paranext/paranext-extension-template/blob/main/tailwind.config.ts

import { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  // TW4: prefix is now handled by CSS `prefix(tw)` in index.css
  // TW4: content array removed — TW4 auto-detects source files
  // Theme from shadcn/ui
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-lead': 'hsl(var(--muted-foreground))',
            '--tw-prose-links': 'hsl(var(--primary))',
            '--tw-prose-bold': 'hsl(var(--foreground))',
            '--tw-prose-counters': 'hsl(var(--muted-foreground))',
            '--tw-prose-bullets': 'hsl(var(--muted-foreground))',
            '--tw-prose-hr': 'hsl(var(--border))',
            '--tw-prose-quotes': 'hsl(var(--foreground))',
            '--tw-prose-quote-borders': 'hsl(var(--border))',
            '--tw-prose-captions': 'hsl(var(--muted-foreground))',
            '--tw-prose-code': 'hsl(var(--foreground))',
            '--tw-prose-pre-code': 'hsl(var(--muted-foreground))',
            '--tw-prose-pre-bg': 'hsl(var(--muted))',
            '--tw-prose-th-borders': 'hsl(var(--border))',
            '--tw-prose-td-borders': 'hsl(var(--border))',
            blockquote: {
              // The default quotes are encoded with 0o or \, and it makes them not display in our
              // environment. So override them with not encoded characters to make them work.
              quotes: `"""""""'""'"`,
            },
          },
        },
        // Can use `tw-prose tw-prose-quoteless` to remove quotes on `blockquote`s
        // Thanks to RobinMalfait https://github.com/tailwindlabs/tailwindcss-typography/issues/66#issuecomment-756834635
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  plugins: [
    // Prose styles as sensible defaults for markdown renderer component
    typography(),

    // #endregion
    // TW4: containerQueries removed — built into TW4
    // TW4: tailwindCssAnimate removed — not needed with TW4
    // TW4: scopedPreflightStyles removed — replaced by @plugin "tailwindcss-scoped-preflight" in index.css
  ],
};

export default config;
