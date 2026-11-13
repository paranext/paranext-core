import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { NO_PADDING_STYLE, TenPowerInteractiveView, TenPowerView } from './ten-layout-shared';

type Variant = 'default' | 'no-padding' | 'interactive';

/**
 * Outdated early draft of the Paratext 10 layout — not the current app. See
 * `current-simple-mode.stories.tsx` / `current-power-mode.stories.tsx` for the current window.
 */
function TenPowerLayout({ variant = 'default' }: { variant?: Variant }) {
  const noPadding = variant === 'no-padding';
  return (
    <div className={`tw:flex tw:h-[820px] tw:w-full ${noPadding ? 'ten-no-padding' : ''}`}>
      {noPadding ? <style>{NO_PADDING_STYLE}</style> : undefined}
      {variant === 'interactive' ? (
        <TenPowerInteractiveView paddedDock />
      ) : (
        <TenPowerView paddedDock={!noPadding} />
      )}
    </div>
  );
}

type Story = StoryObj<typeof TenPowerLayout>;

export const Default: Story = { args: { variant: 'default' } };
export const NoPadding: Story = { args: { variant: 'no-padding' } };
export const Interactive: Story = { args: { variant: 'interactive' } };

const meta: Meta<typeof TenPowerLayout> = {
  title: 'platform/Drafts (outdated)/10Power layout',
  component: TenPowerLayout,
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
