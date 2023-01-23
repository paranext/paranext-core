module.exports = {
  extends: 'erb',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',

    // TJ's rules
    indent: 'off',
    'react/jsx-indent-props': ['warn', 4],
    'comma-dangle': ['error', 'always-multiline'],
    'prettier/prettier': ['warn', { tabWidth: 2, trailingComma: 'all' }],
    'no-console': 'off',
    'react/require-default-props': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    // This is already a Typescript rule, so we don't need it to be reported twice
    '@typescript-eslint/no-unused-vars': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
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
