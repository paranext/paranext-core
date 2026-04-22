import { defineConfig } from 'vitest/config';
import path from 'path';

const config = defineConfig(async () => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;

  return {
    plugins: [tsconfigPaths()],
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, './assets'),
        '@client': path.resolve(__dirname, './src/client'),
        '@extension-host': path.resolve(__dirname, './src/extension-host'),
        '@main': path.resolve(__dirname, './src/main'),
        '@node': path.resolve(__dirname, './src/node'),
        '@renderer': path.resolve(__dirname, './src/renderer'),
        '@shared': path.resolve(__dirname, './src/shared'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    },
  };
});
export default config;
