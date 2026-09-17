import path from 'path';
import { RuleTester } from '@typescript-eslint/utils/dist/ts-eslint';

export const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
});

/**
 * A rule tester with type information, for rules that inspect types rather than syntax.
 *
 * Fixtures live in `src/fixtures` and are type-checked against `src/fixtures/tsconfig.json`; a test
 * case's `filename` must name a file that exists inside that directory, because the parser resolves
 * types only for files the fixture program already contains.
 */
export const typeAwareRuleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: './src/fixtures/tsconfig.json',
    tsconfigRootDir: path.resolve(__dirname, '..'),
  },
});
