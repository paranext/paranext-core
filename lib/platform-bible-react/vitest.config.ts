import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import config from './vite.config';

const workspace = defineConfig({
  ...config,
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
    ...config.test,
    name: 'platform-bible-react tests',
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium', headless: true }],
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
    projects: [
      // Unit tests configuration
      {
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
          exclude: ['src/**/*.stories.{js,ts,jsx,tsx}'],
          globals: true,
        },
      },
      // Storybook tests configuration
      {
        test: {
          name: 'storybook',
          include: ['src/**/*.stories.{js,ts,jsx,tsx}'],
        },
      },
    ],
  },
});

export default workspace;
