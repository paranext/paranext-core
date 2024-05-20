module.exports = {
  extends: '../../.eslintrc.js',
  root: true,
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['./src/components/shadcn-ui/*'],
      rules: {
        // These files are copy/pasted boilerplate, so we want to avoid changing them where
        // appropriate
        'import/prefer-default-export': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
