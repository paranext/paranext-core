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
        // appropriate by disabling certain rules
        'import/prefer-default-export': 'off',
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
    },
  },
};
