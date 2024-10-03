import { scopedPreflightStyles } from 'tailwindcss-scoped-preflight';

// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/tailwind.config.ts and https://github.com/paranext/paranext-extension-template/blob/main/tailwind.config.ts

import { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import tailwindCssAnimate from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // Prefix on all tailwind classes so they don't clash with built-in classes
  // short for tailwind - we hope to have the same prefix as users of this library so the cn
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
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
      borderRadius: {
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
    },
  },
  plugins: [
    // Prose styles as sensible defaults for markdown renderer component
    typography(),
    // Animations in tailwind style
    tailwindCssAnimate,

    // #endregion
    // Restrict tailwind's preflight base css style modifications to within this component library
    scopedPreflightStyles({
      // short for platform-bible-react tailwind-preflight - need to put this class on top of each
      // component to apply our expected styling. This is named something unique to our library
      // because we want our preflight to be ours alone and not to affect anyone else's css. If they
      // want to use our preflight for some reason, they can. But generally if they make their own
      // scoped preflight, they would expect that putting their own scope class would apply their
      // preflight, not ours.
      cssSelector: '.pr-twp',
    }),
  ],
};

export default config;
