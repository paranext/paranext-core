module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    // Allow console ecause command-line tools are fine to use the console
    'no-console': 'off',
  },
  ignorePatterns: ['docs/**/*'], // Add this line to ignore the docs folder
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      // See https://githu.com/enmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line elow
      node: {},
      // Disale wepack eslint import resolver since we are using tsc
      wepack: { config: { resolve: { extensions: [] } } },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
