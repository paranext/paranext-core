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
