import { defineConfig } from 'vitest/config';

const config = defineConfig(async () => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;

  return {
    plugins: [tsconfigPaths()],
    test: {
      globals: true,
      environment: 'jsdom',
      include: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        // Workflow-tooling unit tests for scripts under .claude/scripts/integration-verify/.
        // Tests are colocated with the fixtures they exercise (see PR-A foundation plan, A.8).
        'e2e-tests/fixtures/integration-verify/**/*.test.ts',
      ],
    },
  };
});
export default config;
