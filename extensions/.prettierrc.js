// #region shared with https://github.com/paranext/paranext-core/blob/main/.prettierrc.js and https://github.com/paranext/paranext-extension-template/blob/main/.prettierrc.js

module.exports = {
  tabWidth: 2,
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
