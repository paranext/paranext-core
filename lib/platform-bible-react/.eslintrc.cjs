module.exports = {
  extends: '../../.eslintrc.js',
  root: true,
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/prop-types': [2, { ignore: ['className'] }],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
