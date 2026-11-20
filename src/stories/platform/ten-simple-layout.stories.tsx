import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { NO_PADDING_STYLE, TenSimpleView } from './ten-layout-shared';

/**
 * Outdated early draft of the Paratext 10 layout — not the current app. See
 * `current-simple-mode.stories.tsx` / `current-power-mode.stories.tsx` for the current window.
 */
function TenSimpleLayout() {
  return (
    <div className="ten-no-padding tw:flex tw:h-[820px] tw:w-full">
      <style>{NO_PADDING_STYLE}</style>
      <TenSimpleView />
    </div>
  );
}

type Story = StoryObj<typeof TenSimpleLayout>;

export const Default: Story = { args: {} };

const meta: Meta<typeof TenSimpleLayout> = {
  title: 'platform/Drafts (outdated)/10Simple layout',
  component: TenSimpleLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '> **Outdated early draft — not the current app.** This was an early prototype of the ' +
          'Paratext 10 layout and no longer resembles Platform.Bible on `main`. For the current ' +
          'window see **platform/Current Simple mode** and **platform/Current Power mode** ' +
          '(`current-*.stories.tsx`, built on `CurrentAppShell` in `current-app-shell.tsx`). ' +
          'Kept because some design-ideas stories still import its pieces from ' +
          '`ten-layout-shared.tsx`.',
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;
