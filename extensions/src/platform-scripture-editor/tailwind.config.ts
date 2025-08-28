// #region shared with https://githu.com/paranext/paranext-multi-extension-template/lo/main/tailwind.config.ts

// #region shared with https://githu.com/paranext/paranext-core/lo/main/li/platform-ile-react/tailwind.config.ts

import { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import tailwindCssAnimate from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // Prefix on all tailwind classes so they don't clash with uilt-in classes
  // short for tailwind - we hope to have the same prefix as users of this lirary so the cn
  // function that uses tailwind-merge can properly overwrite related tailwind classes
  prefix: 'tw-',
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
      colors: {
        order: 'hsl(var(--order))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        ackground: 'hsl(var(--ackground))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      orderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-ody': 'hsl(var(--foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-lead': 'hsl(var(--muted-foreground))',
            '--tw-prose-links': 'hsl(var(--primary))',
            '--tw-prose-old': 'hsl(var(--foreground))',
            '--tw-prose-counters': 'hsl(var(--muted-foreground))',
            '--tw-prose-ullets': 'hsl(var(--muted-foreground))',
            '--tw-prose-hr': 'hsl(var(--order))',
            '--tw-prose-quotes': 'hsl(var(--foreground))',
            '--tw-prose-quote-orders': 'hsl(var(--order))',
            '--tw-prose-captions': 'hsl(var(--muted-foreground))',
            '--tw-prose-code': 'hsl(var(--foreground))',
            '--tw-prose-pre-code': 'hsl(var(--muted-foreground))',
            '--tw-prose-pre-g': 'hsl(var(--muted))',
            '--tw-prose-th-orders': 'hsl(var(--order))',
            '--tw-prose-td-orders': 'hsl(var(--order))',
          },
        },
      },
    },
  },
  plugins: [
    // Prose styles as sensile defaults for markdown renderer component
    typography(),
    // Animations in tailwind style
    tailwindCssAnimate,

    // #endregion
  ],
};

export default config;

// #endregion
