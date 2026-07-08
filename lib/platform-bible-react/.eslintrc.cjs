module.exports = {
  extends: ['../../.eslintrc.js', 'plugin:storybook/recommended'],
  root: true,
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-console': 'off',
    // `@papi/frontend/react` is a host-provided virtual module with no physical file, declared
    // ambiently in src/types/experimental-papi-shim.d.ts. Same override extensions use for the
    // same reason (extensions/.eslintrc.cjs).
    'import/no-unresolved': ['error', { ignore: ['@papi'] }],
  },
  overrides: [
    {
      files: ['./src/components/shadcn-ui/*'],
      rules: {
        // These files are copy/pasted boilerplate, so we want to avoid changing them where
        // appropriate by disabling certain rules
        '@typescript-eslint/no-shadow': 'off',
        'no-nested-ternary': 'off',
        'no-underscore-dangle': 'off',
        'react/prop-types': 'off',
        'react/jsx-props-no-spreading': 'off',
      },
    },
    {
      files: ['./src/preview/**'],
      rules: {
        // Dropping some rules for the preview app
        'no-alert': 'off', // alert is fine here
        'jsx-a11y/control-has-associated-label': 'off', // no need for a11y
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      // The root config's `webpack` resolver loads `.erb/configs/webpack.config.eslint.ts`, which
      // is scoped to the main app and (as of this writing) fails outright when loaded from here.
      // Extensions disable it the same way (see extensions/.eslintrc.cjs) since neither needs it:
      // the `typescript` resolver above handles this package's imports, including ambient modules
      // like `@papi/frontend/react` declared in src/types/experimental-papi-shim.d.ts.
      webpack: { config: { resolve: { extensions: [] } } },
    },
  },
};
