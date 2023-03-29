import type { Meta, StoryObj } from '@storybook/react';

import Table from '@renderer/components/papi-components/Table';

const meta: Meta<typeof Table> = {
  title: 'Basics/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  args: {
    columns: [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
    ],

    rows: [
      { id: 0, title: 'Example' },
      { id: 1, title: 'Demo' },
    ],

    // rowKeyGetter: (row: { id: number }) => {
    //   return row.id;
    // },
  },
};
