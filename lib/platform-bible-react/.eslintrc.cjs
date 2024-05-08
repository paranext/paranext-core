module.exports = {
  extends: '../../.eslintrc.js',
  root: true,
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-console': 'off',
    // https://github.com/shadcn-ui/ui/issues/120#issuecomment-1868274325
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
