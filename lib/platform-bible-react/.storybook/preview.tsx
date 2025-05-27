import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      // Configure docs to handle MDX with GFM properly
      toc: {
        headingSelector: 'h1, h2, h3',
        title: 'On this page',
      },
    },
  },
};

export default preview;

