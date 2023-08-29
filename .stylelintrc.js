// Please keep this file in sync with the .stylelintrc.js file in the paranext-extension-template repo
module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-config-sass-guidelines'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'color-named': null,
    'function-parentheses-space-inside': null,
    'max-nesting-depth': 2,
    'no-descending-specificity': null,
    'selector-max-compound-selectors': 4,
    'selector-max-id': 1,
  },
};
