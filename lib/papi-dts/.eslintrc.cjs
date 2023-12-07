module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    // Allow console because command-line tools are fine to use the console
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['papi.d.ts'],
      rules: {
        // Turn off formatting rules that tsc and prettier don't fix for us on this auto-generated
        // type definitions file
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        'max-classes-per-file': 'off',
        'import/newline-after-import': 'off',
        // Ignore problems with pseudomodules provided in the src/declarations folder
        // For example, papi-shared-types. If this causes problems, we can improve it
        'import/no-unresolved': ['error', { ignore: ['papi-*', '@papi*'] }],
        'vars-on-top': 'off',
        'no-restricted-imports': 'off',
        'no-var': 'off',
        'no-undef': 'off',
        // Stop warnings from JSDocs not being formatted with 'prettier-plugin-jsdoc' since it is
        // turned off here.
        'prettier/prettier': 'off',
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
