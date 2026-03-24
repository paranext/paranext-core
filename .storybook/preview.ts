import type { Preview } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import React, { useEffect } from 'react';
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
    // Apply Platform.Bible Tailwind preflight wrapper to the iframe's body.
    // See lib/platform-bible-react/src/index.css for details on the .pr-twp class.
    // useEffect ensures mutations are cleaned up when navigating between stories.
    (Story) => {
      useEffect(() => {
        document.documentElement.classList.add('pr-twp');
        document.body.classList.add('pr-twp');
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        return () => {
          document.documentElement.classList.remove('pr-twp');
          document.body.classList.remove('pr-twp');
          document.body.style.removeProperty('margin');
          document.body.style.removeProperty('padding');
        };
      }, []);

      return React.createElement(Story);
    },
  ],
};

export default preview;
