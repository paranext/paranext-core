import type { Preview } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import React, { useEffect } from 'react';
import { DocsPageWithFilePath } from './blocks/DocsPageWithFilePath';
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

    docs: {
      // Show each story's source file path at the top of its autodocs page.
      page: DocsPageWithFilePath,
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'light',
    },
  },

  decorators: [
    // Apply Platform.Bible Tailwind preflight wrapper to the iframe's body, and paint the body with
    // the app panel background (`bg-background`/`text-foreground`) so every story renders on the
    // same surface a web view occupies inside an app dock panel — not Storybook's default white.
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

      // Wrap each story in a full-height panel-background surface so components that don't fill the
      // viewport still sit on the app panel color (matching how a web view fills its dock panel).
      return React.createElement(
        'div',
        { className: 'tw:bg-background tw:text-foreground tw:min-h-screen' },
        React.createElement(Story),
      );
    },
  ],
};

export default preview;
