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
  overrides: [
    {
      // The project-name helpers' own home: it composes the names so nothing else has to
      files: ['src/project-util.ts'],
      rules: {
        'paranext/no-inline-project-name': 'off',
      },
    },
  ],
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
};
