import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FindHeaderDemo } from './find-header-demo.component';

const meta: Meta<typeof FindHeaderDemo> = {
  title: 'Bundled Extensions/find/FindHeaderDemo',
  component: FindHeaderDemo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="tw-p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FindHeaderDemo>;

export const Default: Story = {};
