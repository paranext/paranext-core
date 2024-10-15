// #region shared with https://github.com/paranext/paranext-core/blob/main/.stylelintrc.js and https://github.com/paranext/paranext-multi-extension-template/blob/main/.stylelintrc.cjs

module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-sass-guidelines',
    'stylelint-config-tailwindcss/scss',
  ],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'color-named': null,
    'max-nesting-depth': 2,
    'no-descending-specificity': null,
    'selector-max-compound-selectors': 4,
    'selector-max-id': 1,
  },
};

// #endregion
