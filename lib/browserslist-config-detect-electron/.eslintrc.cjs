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
  overrides: [
    {
      // For JavaScript files, don't use TypeScript parser options and disable TypeScript-specific rules
      files: ['*.js'],
      parserOptions: {
        // `undefined` doesn't work here - must be `null`.
        // eslint-disable-next-line no-null/no-null
        project: null,
      },
      rules: {
        // Disable TypeScript-specific rules for JavaScript files
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/class-methods-use-this': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/naming-convention': 'off',
        // Re-enable the base ESLint rules for JavaScript files
        'no-shadow': 'error',
        'no-use-before-define': 'error',
        'no-unused-vars': 'error',
        'class-methods-use-this': 'error',
        'lines-between-class-members': 'error',
        'no-empty-function': 'error',
        'no-redeclare': 'error',
        'no-useless-constructor': 'error',
      },
    },
  ],
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
