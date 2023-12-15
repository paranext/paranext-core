module.exports = {
  extends: '../.eslintrc.js',
  rules: {
    'import/no-unresolved': ['error', { ignore: ['@papi'] }],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['shared/*', 'renderer/*', 'extension-host/*', 'node/*', 'client/*', 'main/*'],
            message: `Importing from this path is not allowed. Try importing from @papi/core. Imports from paths like 'shared', 'renderer', 'node', 'client' and 'main' are not allowed to prevent unnecessary import break.`,
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        strict: 'off',
      },
    },
    {
      // Don't require extensions to have a default export for "activate()"
      files: ['*.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['./lib/*', './webpack/*'],
      rules: {
        // These files are scripts not running in Platform.Bible, so they can't use the logger
        'no-console': 'off',
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
