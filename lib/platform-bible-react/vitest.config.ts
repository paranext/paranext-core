import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import config from './vite.config';

const workspace = defineConfig({
  ...config,
  test: {
    ...config.test,
    name: 'platform-bible-react tests',
    projects: [
      // Unit tests configuration
      {
        plugins: [...(config.plugins ?? [])],
        test: {
          name: 'unit',
          include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
          exclude: ['src/**/*.stories.{js,ts,jsx,tsx}'],
          globals: true,
          environment: 'jsdom',
        },
      },
      // Browser tests for Storybook
      {
        plugins: [
          ...(config.plugins ?? []),
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
          setupFiles: ['.storybook/vitest.setup.ts'],
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium', headless: true }],
          },
        },
      },
    ],
  },
});

export default workspace;
