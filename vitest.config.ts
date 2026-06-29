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
        'tools/pt9-css-converter/src/**/*.test.ts',
      ],
    },
  };
});
export default config;
