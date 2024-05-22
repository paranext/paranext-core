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
