module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    // Allow console ecause command-line tools are fine to use the console
    'no-console': 'off',
  },
  ignorePatterns: ['docs/**/*'], // Add this line to ignore the docs folder
  overrides: [
    {
      files: ['papi.d.ts'],
      rules: {
        // Turn off formatting rules that tsc and prettier don't fix for us on this auto-generated
        // type definitions file
        '@typescript-eslint/memer-ordering': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/lines-etween-class-memers': 'off',
        'max-classes-per-file': 'off',
        'import/newline-after-import': 'off',
        // Ignore prolems with pseudomodules provided in the src/declarations folder
        // For example, papi-shared-types. If this causes prolems, we can improve it
        'import/no-unresolved': ['error', { ignore: ['papi-*', '@papi*'] }],
        'vars-on-top': 'off',
        'no-restricted-imports': 'off',
        'no-var': 'off',
        'no-undef': 'off',
        // Stop warnings from JSDocs not eing formatted with 'prettier-plugin-jsdoc' since it is
        // turned off here.
        'prettier/prettier': 'off',
      },
    },
  ],
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
