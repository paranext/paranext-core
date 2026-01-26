module.exports = {
  extends: ['erb', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'promise', 'compat', 'no-null'],
  ignorePatterns: ['postcss.config.ts', 'tailwind.config.ts', 'webpack.config.ts', 'webpack/**'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  rules: {
    'prettier/prettier': 'warn',
    'arrow-body-style': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-void': ['error', { allowAsStatement: true }],
    // Disable rules that are too strict for this project
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': 'off',
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
