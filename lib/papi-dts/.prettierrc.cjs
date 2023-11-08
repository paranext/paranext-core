const rootConfig = require('../../.prettierrc.js');

const config = { ...rootConfig };
// Remove plugin formatting with 'prettier-plugin-jsdoc'.
delete config.plugins;

module.exports = config;
