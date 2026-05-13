import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { NO_PADDING_STYLE, TenPowerView } from './ten-layout-shared';

function TenPowerLayout({ noPadding = false }: { noPadding?: boolean }) {
  return (
    <div className={`tw:flex tw:h-[820px] tw:w-full ${noPadding ? 'ten-no-padding' : ''}`}>
      {noPadding ? <style>{NO_PADDING_STYLE}</style> : undefined}
      <TenPowerView paddedDock={!noPadding} />
    </div>
  );
}

type Story = StoryObj<typeof TenPowerLayout>;

export const Default: Story = { args: { noPadding: false } };
export const NoPadding: Story = { args: { noPadding: true } };

const meta: Meta<typeof TenPowerLayout> = {
  title: 'platform/10Power layout',
  component: TenPowerLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
