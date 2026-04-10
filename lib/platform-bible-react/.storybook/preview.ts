import type { Preview } from '@storybook/react-vite';
import { createElement } from 'react';
import { setupMonaco } from 'storybook-addon-code-editor';
import { persistDirection, readDirection } from '../src/utils/dir-helper.util';
import { withPlatformBibleThemes } from './theme-decorator';
import '../src/index.css';
import './preview-storybook.css';
import './storybook-themes.css';

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
        order: ['Home', 'Guidelines', 'Guides', 'Shadcn', 'Basics', 'Advanced', 'Demo'],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    /**
     * Toolbar Color scheme + Theme: `.storybook/manager.tsx` + `.storybook/theme-decorator.ts` (not
     * `globals.theme`)
     */
    backgrounds: {
      default: 'theme',
      values: [
        /**
         * Canvas fill uses `--background` from `index.css` (toolbar theme classes via
         * theme-decorator)
         */
        { name: 'theme', value: 'transparent' },
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
  },
  initialGlobals: {
    addonRtl: readDirection(),
  },
  decorators: [
    withPlatformBibleThemes(),
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
    /**
     * Layout wrapper: themed backgrounds are scoped in preview-storybook.css (`#storybook-root`,
     * Docs roots, `.sbdocs-preview`). This div only supplies min-height and width for the story
     * subtree.
     */
    (Story) =>
      // .ts extension — JSX unavailable, use createElement
      createElement(
        'div',
        {
          className: 'tw-box-border tw-min-h-full tw-w-full',
        },
        createElement(Story),
      ),
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
