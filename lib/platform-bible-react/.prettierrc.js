import prettierConfig from '../../.prettierrc.js';

export default {
  ...prettierConfig,
  plugins: [...prettierConfig.plugins, 'prettier-plugin-tailwindcss'],
};
