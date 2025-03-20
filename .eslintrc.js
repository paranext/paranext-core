module.exports = {
  extends: [
    // https://github.com/electron-react-boilerplate/eslint-config-erb/blob/main/index.js
    // airbnb rules are embedded in erb https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
    'erb',
    // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#typescript
    'plugin:import/recommended',
    'plugin:import/typescript',
    // https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/recommended.ts
    'plugin:storybook/recommended',
    // Make sure this is last so it gets the chance to override other configs.
    // See https://github.com/prettier/eslint-config-prettier and https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
  ],

  rules: {
    // #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/.eslintrc.cjs and https://github.com/paranext/paranext-extension-template/blob/main/.eslintrc.js except certain overrides

    // #region ERB rules

    // Use `noImplicitReturns` instead. See https://typescript-eslint.io/rules/consistent-return/.
    'consistent-return': 'off',
    'import/default': 'off',
    'import/extensions': 'off',
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-import-module-exports': 'off',
    'import/no-unresolved': 'error',
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',

    // #endregion

    // #region Platform.Bible rules

    // Rules in each section are generally in alphabetical order. However, several
    // `@typescript-eslint` rules require disabling the equivalent ESLint rule. So in these cases
    // each ESLint rule is turned off immediately above the corresponding `@typescript-eslint` rule.
    'class-methods-use-this': 'off',
    '@typescript-eslint/class-methods-use-this': [
      'error',
      { ignoreOverrideMethods: true, ignoreClassesThatImplementAnInterface: false },
    ],
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true, exceptAfterOverload: true },
    ],
    '@typescript-eslint/member-ordering': 'error',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
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
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, allowNamedExports: true, typedefs: false, ignoreTypeReferences: true },
    ],
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-anonymous-default-export': ['error', { allowCallExpression: false }],
    indent: 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    // Should use our logger anytime you want logs that persist. Otherwise use console only in testing
    'no-console': 'warn',
    'no-null/no-null': 2,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-type-assertion/no-type-assertion': 'error',
    'prettier/prettier': ['warn', { tabWidth: 2, trailingComma: 'all' }],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    'react/require-default-props': 'off',

    // #endregion

    // #endregion
  },
  globals: {
    globalThis: 'readonly',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  plugins: ['@typescript-eslint', 'no-type-assertion', 'no-null'],
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
