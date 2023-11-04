// Please keep this file in sync with the .prettierrc.js file in the paranext-extension-template repo
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
