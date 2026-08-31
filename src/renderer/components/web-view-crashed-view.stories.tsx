import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import { WebViewCrashedView } from './web-view-crashed-view.component';

/**
 * Constrains the story to a pane-sized box, since the component fills its host and a web view is
 * never the whole window.
 */
function InPane(Story: Parameters<Decorator>[0]): ReturnType<Decorator> {
  return (
    <div style={{ height: '32rem', border: '1px dashed var(--border, #d4d4d4)', overflow: 'auto' }}>
      <Story />
    </div>
  );
}

const meta: Meta<typeof WebViewCrashedView> = {
  title: 'Advanced/WebViewCrashedView',
  component: WebViewCrashedView,
  tags: ['autodocs'],
  decorators: [InPane],
  args: { onReload: () => {} },
  parameters: {
    docs: {
      description: {
        component: [
          'Replaces a web view’s content when its error boundary catches a render failure, so the',
          'pane shows what happened instead of going blank.',
          '',
          '**What this story does and does not show.** In the real app this renders inside a web',
          'view’s iframe, whose document carries only the CSP, fonts, scrollbars and the theme',
          'stylesheet — never the renderer’s Tailwind build. That is why the component is styled with',
          'inline `CSSProperties` off theme CSS variables rather than `tw:` classes. Storybook renders',
          'it in the renderer’s document, WITH Tailwind present, so this story is a faithful check of',
          'layout, copy, and theme-variable behaviour, but it cannot reproduce the bare-iframe',
          'condition the inline styling exists for. Only running the app proves that half.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WebViewCrashedView>;

/** The common case: the crashed pane is named, so the user knows which one died. */
export const Default: Story = {
  args: { webViewTitle: 'Editor - WEB' },
};

/**
 * Web view titles may be localize keys rather than display text. The key is resolved before it
 * reaches the message; if it cannot be resolved, the untitled message is used instead so a raw
 * `%…%` never reaches the user.
 */
export const LocalizeKeyTitle: Story = {
  args: { webViewTitle: '%webView_modelTextPanel_title%' },
};

/** No title on the definition, so the message stays generic rather than naming an empty pane. */
export const Untitled: Story = {};

/** A long title still has to fit. The message wraps rather than overflowing the pane horizontally. */
export const LongTitle: Story = {
  args: {
    webViewTitle: 'Enhanced Resources — Ancient Near Eastern Backgrounds Commentary (NIVAC)',
  },
};
