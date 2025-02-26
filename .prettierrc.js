// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/.prettierrc.js and https://github.com/paranext/paranext-extension-template/blob/main/.prettierrc.js

module.exports = {
  tabWidth: 2,
  trailingComma: 'all',
  endOfLine: 'lf',
  singleQuote: true,
  // prettier-plugin-jsdoc options
  tsdoc: true,
  plugins: ['prettier-plugin-jsdoc', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.json',
      options: { parser: 'json' },
    },
    {
      files: '*.html',
      options: { parser: 'html', plugins: [] },
    },
  ],
};

// #endregion
