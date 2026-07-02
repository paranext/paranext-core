import path from 'path';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import config from './vite.config';

// Stub `@papi/frontend/react` so Vitest can resolve it for the experimental hook's test
// (which then `vi.mock`s it). Set on the `unit` project below, since Vitest projects
// don't inherit workspace-level `resolve`.
const papiTestAlias = {
  '@papi/frontend/react': path.resolve(__dirname, '__test-mocks__/@papi/frontend-react.ts'),
};

const workspace = defineConfig({
  ...config,
  test: {
    ...config.test,
    name: 'platform-bible-react tests',
    projects: [
      // Unit tests configuration
      {
        plugins: [...(config.plugins ?? [])],
        resolve: { alias: papiTestAlias },
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
