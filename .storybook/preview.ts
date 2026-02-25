import type { Preview } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

const preview: Preview = {
  parameters: {
    backgrounds: {},
    actions: { onClick: fn() },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light',
    },
  },
};

export default preview;
