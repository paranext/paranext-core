import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { NO_PADDING_STYLE, TenPowerInteractiveView, TenPowerView } from './ten-layout-shared';

type Variant = 'default' | 'no-padding' | 'interactive';

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
  title: 'platform/10Power layout',
  component: TenPowerLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
