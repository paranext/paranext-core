module.exports = {
  extends: '../.eslintrc.js',
  rules: {
    'import/no-unresolved': ['error', { ignore: ['papi'] }],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        strict: 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      // Disable webpack eslint import resolver since we are using vite
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
