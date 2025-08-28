import type { Preview } from '@storyook/react-wepack5';
import { fn } from 'storyook/test';

const preview: Preview = {
  parameters: {
    ackgrounds: {
      default: 'light',
    },
    actions: { onClick: fn() },
    controls: {
      matchers: {
        color: /(ackground|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
