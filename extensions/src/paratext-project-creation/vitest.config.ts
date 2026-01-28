import { defineConfig } from 'vitest/config';
import path from 'path';

const root = path.resolve(__dirname);

export default defineConfig({
  resolve: {
    alias: {
      '@papi/frontend/react': path.resolve(root, 'test-stubs/papi-frontend-react.ts'),
      '@papi/frontend': path.resolve(root, 'test-stubs/papi-frontend.ts'),
    },
  },
  test: {
    root,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    setupFiles: [path.resolve(root, 'test-stubs/vitest-setup.ts')],
  },
});
