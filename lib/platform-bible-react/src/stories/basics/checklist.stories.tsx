import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Checklist } from '@/components/basics/checklist.component';
import { Card, CardContent } from '@/components/shadcn-ui/card';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Checklist> = {
  title: 'Basics/Checklist',
  component: Checklist,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    handleSelectListItem: { action: 'item selected' },
    listItems: { control: 'object' },
    selectedListItems: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof Checklist>;

export const Default: Story = {
  args: {
    listItems: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    selectedListItems: ['Item 2'],
    handleSelectListItem: fn(),
  },
};

export const InCard: Story = {
  render: (args) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(['Box B', 'Box E']);

    const handleSelect = (item: string, selected: boolean) => {
      if (selected) {
        setSelectedItems((prev) => [...prev, item]);
      } else {
        setSelectedItems((prev) => prev.filter((i) => i !== item));
      }
      args.handleSelectListItem?.(item, selected);
    };

    return (
      <Card>
        <CardContent className="tw-h-64 tw-w-full tw-overflow-auto tw-p-4">
          <Checklist
            {...args}
            selectedListItems={selectedItems}
            handleSelectListItem={handleSelect}
          />
        </CardContent>
      </Card>
    );
  },
  args: {
    listItems: ['Box A', 'Box B', 'Box C', 'Box D', 'Box E', 'Box F'],
    selectedListItems: ['Box B', 'Box E'],
    handleSelectListItem: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A checklist displayed inside a card container, similar to the original example.',
      },
    },
  },
};

export const ManyItems: Story = {
  render: (args) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelect = (item: string, selected: boolean) => {
      if (selected) {
        setSelectedItems((prev) => [...prev, item]);
      } else {
        setSelectedItems((prev) => prev.filter((i) => i !== item));
      }
      args.handleSelectListItem?.(item, selected);
    };

    return (
      <div className="tw-h-96 tw-w-80">
        <Checklist
          {...args}
          selectedListItems={selectedItems}
          handleSelectListItem={handleSelect}
        />
      </div>
    );
  },
  args: {
    listItems: Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`),
    selectedListItems: [],
    handleSelectListItem: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A checklist with many items to demonstrate scrolling behavior.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(args.selectedListItems || []);

    const handleSelect = (item: string, selected: boolean) => {
      if (selected) {
        setSelectedItems((prev) => [...prev, item]);
      } else {
        setSelectedItems((prev) => prev.filter((i) => i !== item));
      }
      args.handleSelectListItem?.(item, selected);
    };

    return (
      <Checklist {...args} selectedListItems={selectedItems} handleSelectListItem={handleSelect} />
    );
  },
  args: {
    listItems: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
    selectedListItems: ['Banana', 'Date'],
    handleSelectListItem: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive checklist where you can select and deselect items.',
      },
    },
  },
};
