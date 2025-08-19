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
    options: {
      storySort: {
        order: [
          'Home',
          'Guidelines',
          'Guides',
          'Guidelines',
          'Shadcn',
          'Basics',
          'Advanced',
          'Demo',
        ],
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
        // Apply Platform.Bible Tailwind preflight wrapper globally so fonts/styles render correctly
        // See src/index.css for details on the .pr-twp class
        document.body.classList.add('pr-twp');
      }

      return Story();
    },
  ],
  tags: [
    /* Auto-generate "Docs" page by default for each Storybook component.
     * Use `tags: ['!autodocs']` any time you make a custom primary page
     * for a Storybook component. */
    'autodocs',
    // Enables testing with Storybook's Vitest plugin
    'test',
  ],
};

export default preview;
