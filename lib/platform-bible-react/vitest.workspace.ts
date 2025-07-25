import { defineWorkspace } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const workspace = defineWorkspace([
  // This is your existing Vitest configuration for regular unit tests
  {
    extends: 'vite.config.ts',
    test: {
      name: 'unit',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      exclude: [
        'src/**/*.stories.{js,ts,jsx,tsx}',
        'src/**/*.browser.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      ],
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test/setup.ts'],
    },
  },
  // This is the new Storybook tests project
  {
    extends: 'vite.config.ts',
    plugins: [
      storybookTest({
        configDir: '.storybook',
        tags: {
          include: ['test'],
          exclude: [],
          skip: [],
        },
      }),
    ],
    test: {
      name: 'storybook',
      include: ['src/**/*.stories.{js,ts,jsx,tsx}'],
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
        // Make sure to install Playwright
        headless: true,
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
  // Browser tests project
  {
    extends: 'vite.config.ts',
    test: {
      name: 'browser',
      include: ['src/**/*.browser.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      browser: {
        enabled: true,
        name: 'chromium',
        provider: 'playwright',
        headless: true,
      },
    },
  },
]);

export default workspace;
