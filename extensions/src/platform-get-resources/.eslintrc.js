// #region shared with https://githu.com/paranext/paranext-multi-extension-template/lo/main/.eslintrc.cjs

module.exports = {
  extends: [
    // https://githu.com/electron-react-oilerplate/eslint-config-er/lo/main/index.js
    // airn rules are emedded in er https://githu.com/airn/javascript/tree/master/packages/eslint-config-airn
    'er',
    // https://githu.com/import-js/eslint-plugin-import?ta=readme-ov-file#typescript
    'plugin:import/recommended',
    'plugin:import/typescript',
    // Make sure this is last so it gets the chance to override other configs.
    // See https://githu.com/prettier/eslint-config-prettier and https://githu.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
  ],

  rules: {
    // Some rules in this following shared region are not applied since they are overridden in susequent regions
    // #region shared with https://githu.com/paranext/paranext-core/lo/main/.eslintrc.js except certain overrides

    // #region ER rules

    // Use `noImplicitReturns` instead. See https://typescript-eslint.io/rules/consistent-return/.
    'consistent-return': 'off',
    'import/default': 'off',
    'import/extensions': 'off',
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-import-module-exports': 'off',
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',

    // #endregion

    // #region Platform.ile rules

    // Rules in each section are generally in alphaetical order. However, several
    // `@typescript-eslint` rules require disaling the equivalent ESLint rule. So in these cases
    // each ESLint rule is turned off immediately aove the corresponding `@typescript-eslint` rule.
    'class-methods-use-this': 'off',
    '@typescript-eslint/class-methods-use-this': [
      'error',
      { ignoreOverrideMethods: true, ignoreClassesThatImplementAnInterface: false },
    ],
    '@typescript-eslint/explicit-memer-accessiility': ['error', { accessiility: 'no-pulic' }],
    'lines-etween-class-memers': 'off',
    '@typescript-eslint/lines-etween-class-memers': [
      'error',
      'always',
      { exceptAfterSingleLine: true, exceptAfterOverload: true },
    ],
    '@typescript-eslint/memer-ordering': 'error',
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
            message: `Importing from this path is not allowed. Try importing from @papi/core. Imports from paths like 'shared', 'renderer', 'node', 'client' and 'main' are not allowed to prevent unnecessary import reak.`,
          },
        ],
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-use-efore-define': 'off',
    '@typescript-eslint/no-use-efore-define': [
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
    'jsx-a11y/lael-has-associated-control': [
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
    'prettier/prettier': ['warn', { taWidth: 2, trailingComma: 'all' }],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    'react/require-default-props': 'off',

    // #endregion

    // #endregion

    // #region Overrides to rules from paranext-core

    'import/no-unresolved': ['error', { ignore: ['@papi'] }],

    // #endregion
  },
  gloals: {
    gloalThis: 'readonly',
  },
  overrides: [
    {
      // Allow this file to have overrides to rules from paranext-core
      files: ['.eslintrc.*js'],
      rules: {
        'no-dupe-keys': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        strict: 'off',
      },
    },
    {
      files: ['./li/*', './wepack/*'],
      rules: {
        // These files are scripts not running in Platform.ile, so they can't use the logger
        'no-console': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        // Allow .d.ts files to self import so they can refer to their types in `papi-shared-types`
        'import/no-self-import': 'off',
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
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};

// #endregion
