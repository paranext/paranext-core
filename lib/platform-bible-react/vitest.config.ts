import path from 'path';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import config from './vite.config';

// Warm the lazy one-time ICU init behind Intl.* (e.g. the extension-marketplace footer's
// Intl.DisplayNames) so it never lands inside a test's timeout window on a slow CI worker.
// Shares the repo-root setup file. See ../../vitest.setup.ts for the full rationale.
const intlWarmupSetup = path.resolve(__dirname, '../../vitest.setup.ts');

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
          exclude: ['src/**/*.stories.{js,ts,jsx,tsx}', 'src/components/shadcn-ui-old/*'],
          globals: true,
          environment: 'jsdom',
          setupFiles: [intlWarmupSetup],
          // Timing-sensitive component tests here wait on React state settling, and on a contended
          // windows-latest runner that wait crosses the 5 s default while the assertion itself is
          // sound. 15 s absorbs the contention and still bounds a genuine hang.
          // The shared vitest.setup.ts also raises testing-library's asyncUtilTimeout to 5 s; this
          // budget must stay comfortably above that one for testing-library's richer failure to
          // ever be reachable.
          testTimeout: 15000,
        },
      },
      // Node.js tests for build scripts
      {
        test: {
          name: 'scripts',
          include: ['scripts/**/*.test.ts'],
          environment: 'node',
          setupFiles: [intlWarmupSetup],
          // The shared vitest.setup.ts raises testing-library's asyncUtilTimeout to 5 s so a
          // `waitFor` slowed by CI contention gives up on its own before the test's overall
          // budget, rather than sharing vitest's own testTimeout and losing the race to it. That
          // budget must stay comfortably below this one for testing-library's richer failure to
          // ever be reachable.
          testTimeout: 15000,
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
