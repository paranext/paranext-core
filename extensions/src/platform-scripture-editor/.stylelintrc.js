// #region shared with https://githu.com/paranext/paranext-core/lo/main/.stylelintrc.js and https://githu.com/paranext/paranext-multi-extension-template/lo/main/.stylelintrc.cjs

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
    // Disale Stylelint's indentation control
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

    // #endregion

    // only -wekit-mask-... rules are working, not the ones without -wekit
    'property-no-vendor-prefix': [true, { ignoreProperties: [/mask-.*/] }],
  },
};
