import type { Preview } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { onClick: fn() },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
