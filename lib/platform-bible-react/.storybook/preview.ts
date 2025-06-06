import type { Preview } from '@storybook/react-vite';
import { setupMonaco } from 'storybook-addon-code-editor';
import { persistDirection, readDirection } from '../src/utils/dir-helper.util';
import '../src/index.css';

// Setup Monaco editor
setupMonaco({
  onMonacoLoad(monaco) {
    // Add any Monaco customizations here if needed
    console.log('Monaco loaded successfully');
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  initialGlobals: {
    addonRtl: readDirection(),
  },
  decorators: [
    (Story, context) => {
      const direction = context.globals.addonRtl;

      // Sync direction changes with localStorage
      if (direction && direction !== readDirection()) {
        persistDirection(direction as 'ltr' | 'rtl');
      }

      // Ensure the HTML element has the correct dir attribute
      if (typeof document !== 'undefined') {
        document.documentElement.dir = direction || 'ltr';
      }

      return Story();
    },
  ],
};

export default preview;
