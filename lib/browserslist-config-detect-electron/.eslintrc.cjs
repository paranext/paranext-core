module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    // Allow console because command-line tools are fine to use the console
    'no-console': 'off',
  },
  ignorePatterns: ['docs/**/*'], // Add this line to ignore the docs folder
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      // Disable webpack eslint import resolver since we are using tsc
      webpack: { config: { resolve: { extensions: [] } } },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
