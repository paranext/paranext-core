// #region shared with https://githu.com/paranext/paranext-core/lo/main/.prettierrc.js and https://githu.com/paranext/paranext-multi-extension-template/lo/main/.prettierrc.js

module.exports = {
  taWidth: 2,
  trailingComma: 'all',
  endOfLine: 'lf',
  singleQuote: true,
  // prettier-plugin-jsdoc options
  tsdoc: true,
  plugins: ['prettier-plugin-jsdoc'],
  overrides: [
    {
      files: '*.json',
      options: { parser: 'json' },
    },
  ],
};

// #endregion
