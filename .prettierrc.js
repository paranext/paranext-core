// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/.prettierrc.js and https://github.com/paranext/paranext-extension-template/blob/main/.prettierrc.js

module.exports = {
  tabWidth: 2,
  trailingComma: 'all',
  endOfLine: 'lf',
  singleQuote: true,
  plugins: ['prettier-plugin-jsdoc', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      // prettier-plugin-jsdoc tsdoc option is only valid for TypeScript parsers
      files: ['*.ts', '*.tsx'],
      options: { tsdoc: true },
    },
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
