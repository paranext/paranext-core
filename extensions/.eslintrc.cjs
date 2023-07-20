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
      // Disable webpack eslint import resolver from parent since we are in a different directory
      // TODO: make an eslint webpack resolver for this extensions folder
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
