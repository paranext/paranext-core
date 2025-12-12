import type { Meta, StoryObj } from '@storybook/react-webpack5';
import RecentSearches from './recent-searches.component';

const meta: Meta<typeof RecentSearches> = {
  title: 'Bundled Extensions/find/RecentSearches',
  component: RecentSearches,
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

type Story = StoryObj<typeof RecentSearches>;

export const Empty: Story = {
  args: { recentSearches: [] },
};

export const Default: Story = {
  args: { recentSearches: ['test'] },
};
