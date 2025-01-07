// #region shared with https://github.com/paranext/paranext-core/blob/main/.stylelintrc.js and https://github.com/paranext/paranext-extension-template/blob/main/.stylelintrc.js

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
    // Disable Stylelint's indentation control
    '@stylistic/indentation': null,
    // Let Prettier handle selector list formatting
    '@stylistic/selector-list-comma-newline-after': null,
    'color-named': null,
    'max-nesting-depth': 2,
    'no-descending-specificity': null,
    'selector-max-compound-selectors': 4,
    'selector-max-id': 1,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'screen', 'variants'],
      },
    ],
  },
};

// #endregion
