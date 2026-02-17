import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@papi/frontend/react': path.resolve(__dirname, 'src/__tests__/mocks/papi-frontend-react.ts'),
      '@papi/core': path.resolve(__dirname, 'src/__tests__/mocks/papi-core.ts'),
      'platform-bible-react': path.resolve(
        __dirname,
        'src/__tests__/mocks/platform-bible-react.tsx',
      ),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
