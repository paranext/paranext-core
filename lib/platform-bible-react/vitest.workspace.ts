import { defineWorkspace } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const workspace = defineWorkspace([
  {
    extends: 'vite.config.ts',
    plugins: [
      // I can't get this plugin to work inside the regular vite.config.ts, but using it in a
      // workspace works fine. However, workspaces will be deprecated in the future, so
      // this is a temporary solution.
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
      browser: {
        enabled: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium', headless: true }],
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);

export default workspace;
