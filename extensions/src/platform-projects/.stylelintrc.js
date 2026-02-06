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
    // Let Prettier handle the space between style property and value (they were fighting when a
    // value was long enough to be on its own line but not long enough to span multiple lines)
    '@stylistic/declaration-colon-space-after': null,
    // Disable Stylelint's function parentheses control for Prettier compatibility
    '@stylistic/function-parentheses-space-inside': 'never-single-line',
    // Disable Stylelint's indentation control
    '@stylistic/indentation': null,
    // Let Prettier handle selector list formatting
    '@stylistic/selector-list-comma-newline-after': null,
    'at-rule-no-unknown': null,
    'color-named': null,
    'max-nesting-depth': 2,
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'screen', 'variants'],
      },
    ],
    'selector-max-compound-selectors': 4,
    'selector-max-id': 1,
  },
};

// #endregion
