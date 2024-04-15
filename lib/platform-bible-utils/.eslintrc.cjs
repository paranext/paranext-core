module.exports = {
  extends: '../../.eslintrc.js',
  root: true,
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
};
