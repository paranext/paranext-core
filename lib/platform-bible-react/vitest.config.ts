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
    name: 'storybook',
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium', headless: true }],
    },
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
});

export default workspace;
