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
  },
  // overrides: [
  //   {
  //     // Allow this file to have overrides to rules from paranext-core
  //     files: ['.eslintrc.*js'],
  //     rules: {
  //       'no-console': 'off',
  //     },
  //   },
  // ],
};
