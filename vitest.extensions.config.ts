import { defineConfig } from 'vitest/config';
import path from 'path';

const config = defineConfig(async () => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;

  return {
    plugins: [tsconfigPaths()],
    resolve: {
      alias: {
        // These modules are provided at runtime by Platform.Bible. We alias them to
        // empty stubs so Vite can resolve the imports before vi.mock intercepts them.
        '@papi/frontend/react': path.resolve(
          __dirname,
          'extensions/src/paratext-project-creation/test-stubs/papi-frontend-react.ts',
        ),
        '@papi/frontend': path.resolve(
          __dirname,
          'extensions/src/paratext-project-creation/test-stubs/papi-frontend.ts',
        ),
        'platform-bible-utils': path.resolve(__dirname, 'lib/platform-bible-utils/dist/index.js'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['extensions/**/*.test.ts', 'extensions/**/*.test.tsx'],
      setupFiles: ['./node_modules/@testing-library/jest-dom/vitest.js'],
    },
  };
});
export default config;
