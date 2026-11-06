import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';
import { WindowCrashedView } from './window-crashed-view.component';

/**
 * Gives the screen a box of its own to fill.
 *
 * The `transform` is what makes this work: the component is `position: fixed`, which is normally
 * measured from the viewport, but a transformed ancestor becomes the containing block for fixed
 * descendants. Without it every story here would ignore its box and paint over the whole Docs page,
 * description and controls and neighbouring stories included. Applied per story rather than on
 * `meta` so a story's own box is its only box: story decorators compose with `meta` ones rather
 * than replacing them, so a `meta` box would nest inside every story's.
 *
 * @param height Box height. The roomy one shows the screen as a user meets it; a short one
 *   exercises the too-short-to-center path.
 */
function inWindowOfHeight(height: string): Decorator {
  return function InWindow(Story: Parameters<Decorator>[0]): ReturnType<Decorator> {
    return (
      <div
        style={{
          position: 'relative',
          transform: 'translate(0)',
          height,
          border: '1px dashed var(--border, #d4d4d4)',
        }}
      >
        <Story />
      </div>
    );
  };
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
          'The two are meant to read as one pattern, and are: they share their markup, their styling',
          'and their localization boundary through `crashed-view.component.tsx` and',
          '`crashed-view.util.ts`. All either screen still owns is how it is positioned.',
          '',
          '**Why this story matters more than most.** The screen it shows is nearly impossible to',
          'reach on purpose in a running build — that is the whole difficulty of the crash it exists',
          'to contain — so this story is the practical way to review its copy, layout and theme',
          'behaviour before it ships.',
          '',
          '**What this story does and does not show.** The component is `position: fixed; inset: 0`,',
          'so each story is given a transformed box to be measured from and fills it the way it fills',
          'a real window. Text is resolved through the',
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
export const Default: Story = {
  decorators: [inWindowOfHeight('22rem')],
};

/**
 * A window too short to center the content in. `justify-content: safe center` plus `overflow: auto`
 * keep the title reachable — plain `center` would push it out of the scrollable area.
 */
export const ShortWindow: Story = {
  decorators: [inWindowOfHeight('9rem')],
};
