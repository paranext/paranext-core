import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { NO_PADDING_STYLE, TenSimpleView } from './ten-layout-shared';

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
  title: 'platform/10Simple layout',
  component: TenSimpleLayout,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
