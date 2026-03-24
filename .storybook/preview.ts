import type { Preview } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import React from 'react';
import { localizationDecorator } from './localization-decorator';
import '../lib/platform-bible-react/src/index.css';

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

  decorators: [
    // Apply localization (converts %key% to localized strings)
    localizationDecorator,

    // Apply Platform.Bible Tailwind preflight wrapper to the iframe's body
    // See lib/platform-bible-react/src/index.css for details on the .pr-twp class
    (Story) => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('pr-twp');
        document.body.classList.add('pr-twp');
        document.body.style.margin = '0';
        document.body.style.padding = '0';
      }

      return React.createElement(Story);
    },
  ],
};

export default preview;
