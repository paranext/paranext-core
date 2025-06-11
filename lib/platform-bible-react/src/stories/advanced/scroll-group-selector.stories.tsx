import { useState } from 'react';
import { getLocalizeKeyForScrollGroupId } from 'platform-bible-utils';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollGroupSelector } from '@/components/advanced/scroll-group-selector.component';

const availableScrollGroupIds = [undefined, 0, 1, 2, 3, 4];
const localizedStrings = {
  [getLocalizeKeyForScrollGroupId('undefined')]: 'None',
  [getLocalizeKeyForScrollGroupId(0)]: 'A',
  [getLocalizeKeyForScrollGroupId(1)]: 'B',
  [getLocalizeKeyForScrollGroupId(2)]: 'C',
  [getLocalizeKeyForScrollGroupId(3)]: 'D',
  [getLocalizeKeyForScrollGroupId(4)]: 'E',
};

const meta: Meta<typeof ScrollGroupSelector> = {
  title: 'Advanced/ScrollGroupSelector',
  component: ScrollGroupSelector,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ScrollGroupSelector>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return (
      <ScrollGroupSelector {...args} scrollGroupId={selected} onChangeScrollGroupId={setSelected} />
    );
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: undefined,
    localizedStrings,
  },
};

export const WithCustomSize: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return (
      <ScrollGroupSelector
        {...args}
        scrollGroupId={selected}
        onChangeScrollGroupId={setSelected}
        size="lg"
      />
    );
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 2,
    localizedStrings,
  },
};

export const WithCustomClass: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<number | undefined>(args.scrollGroupId);
    return (
      <ScrollGroupSelector
        {...args}
        scrollGroupId={selected}
        onChangeScrollGroupId={setSelected}
        className="tw-bg-yellow-100"
        size="sm"
      />
    );
  },
  args: {
    availableScrollGroupIds,
    scrollGroupId: 1,
    localizedStrings,
  },
};
