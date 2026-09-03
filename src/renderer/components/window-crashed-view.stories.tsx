import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import { WindowCrashedView } from './window-crashed-view.component';

/**
 * Constrains the screen to a short box so the too-short-to-center case can be inspected.
 *
 * The `transform` is what makes this work: the component is `position: fixed`, which is normally
 * measured from the viewport, but a transformed ancestor becomes the containing block for fixed
 * descendants. Without it the story would ignore the box and fill the preview frame.
 */
function InShortWindow(Story: Parameters<Decorator>[0]): ReturnType<Decorator> {
  return (
    <div
      style={{
        position: 'relative',
        transform: 'translate(0)',
        height: '9rem',
        border: '1px dashed var(--border, #d4d4d4)',
      }}
    >
      <Story />
    </div>
  );
}

const meta: Meta<typeof WindowCrashedView> = {
  title: 'Advanced/WindowCrashedView',
  component: WindowCrashedView,
  tags: ['autodocs'],
  args: { onReload: () => {} },
  parameters: {
    docs: {
      description: {
        component: [
          'Replaces a window’s content when the renderer’s root error boundary catches a render',
          'failure, so the window shows what happened instead of going blank.',
          '',
          'It is the window-level counterpart to `WebViewCrashedView`, which replaces a single pane.',
          'The two are meant to read as one pattern and share their type, message and button styling',
          'through `crashed-view.util.ts`; they differ in how they are positioned and in whether they',
          'claim focus on mount.',
          '',
          '**Why this story matters more than most.** The screen it shows is nearly impossible to',
          'reach on purpose in a running build — that is the whole difficulty of the crash it exists',
          'to contain — so this story is the practical way to review its copy, layout and theme',
          'behaviour before it ships.',
          '',
          '**What this story does and does not show.** The component is `position: fixed; inset: 0`,',
          'so it fills the preview frame the way it fills a real window. Text is resolved through the',
          'localization service when that works and falls back to built-in English when it does not;',
          'both paths render identical layout, so what you see here is accurate either way. What a',
          'story cannot reproduce is the condition it renders under — a React tree that has already',
          'failed once. Only the unit tests and a real crash cover that half.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WindowCrashedView>;

/** The screen as a user meets it, filling the window. */
export const Default: Story = {};

/**
 * A window too short to center the content in. `justify-content: safe center` plus `overflow: auto`
 * keep the title reachable — plain `center` would push it out of the scrollable area.
 */
export const ShortWindow: Story = {
  decorators: [InShortWindow],
};
