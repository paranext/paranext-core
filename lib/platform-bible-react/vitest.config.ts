import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import config from './vite.config';

const workspace = defineConfig({
  ...config,
  test: {
    ...config.test,
    name: 'platform-bible-react tests',
    // Bump the default test/teardown timeouts so the suite tolerates CPU contention when run
    // via `npm test --workspaces` alongside the other workspaces. In particular the Storybook
    // project spins up a Playwright Chromium browser whose teardown can exceed the default 10s
    // close timeout under load.
    testTimeout: 30000,
    hookTimeout: 30000,
    teardownTimeout: 30000,
    projects: [
      // Unit tests configuration
      {
        plugins: [...(config.plugins ?? [])],
        test: {
          name: 'unit',
          include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
          exclude: ['src/**/*.stories.{js,ts,jsx,tsx}', 'src/components/shadcn-ui-old/*'],
          globals: true,
          environment: 'jsdom',
        },
      },
      // Node.js tests for build scripts
      {
        test: {
          name: 'scripts',
          include: ['scripts/**/*.test.ts'],
          environment: 'node',
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
