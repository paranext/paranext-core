import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  FilterDropdown,
  DropdownMenuItemType,
  type DropdownGroup,
} from '@/components/advanced/extension-marketplace/filter-dropdown.component';

const meta: Meta<typeof FilterDropdown> = {
  title: 'Advanced/FilterDropdown',
  component: FilterDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

function FilterDropdownDemo() {
  const [checkboxStates, setCheckboxStates] = useState({
    option1: true,
    option2: false,
    option3: true,
  });

  const [radioValue, setRadioValue] = useState('medium');

  const handleCheckboxChange = (key: keyof typeof checkboxStates) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const groups: DropdownGroup[] = [
    {
      label: 'Checkbox Options',
      items: [
        {
          label: 'Option 1',
          itemType: DropdownMenuItemType.Check,
          checked: checkboxStates.option1,
          onClick: () => handleCheckboxChange('option1'),
        },
        {
          label: 'Option 2',
          itemType: DropdownMenuItemType.Check,
          checked: checkboxStates.option2,
          onClick: () => handleCheckboxChange('option2'),
        },
        {
          label: 'Option 3',
          itemType: DropdownMenuItemType.Check,
          checked: checkboxStates.option3,
          onClick: () => handleCheckboxChange('option3'),
        },
      ],
    },
    {
      label: 'Radio Options (Priority)',
      radioValue,
      onRadioValueChange: setRadioValue,
      items: [
        {
          label: 'Low',
          itemType: DropdownMenuItemType.Radio,
          value: 'low',
          onClick: () => setRadioValue('low'),
        },
        {
          label: 'Medium',
          itemType: DropdownMenuItemType.Radio,
          value: 'medium',
          onClick: () => setRadioValue('medium'),
        },
        {
          label: 'High',
          itemType: DropdownMenuItemType.Radio,
          value: 'high',
          onClick: () => setRadioValue('high'),
        },
      ],
    },
  ];

  return (
    <div className="tw-p-4">
      <FilterDropdown id="demo-filter" label="Filter Options" groups={groups} />
      <div className="tw-mt-4 tw-text-sm tw-text-muted-foreground">
        <p>Checkbox states: {JSON.stringify(checkboxStates)}</p>
        <p>Radio value: {radioValue}</p>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <FilterDropdownDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive FilterDropdown with proper state management. Checkbox items show their checked state, and radio items work as a proper radio group with visual selection feedback.',
      },
    },
  },
};

export const CheckboxOnly: Story = {
  args: {
    label: 'Status Filter',
    groups: [
      {
        label: 'Status',
        items: [
          {
            label: 'Active',
            itemType: DropdownMenuItemType.Check,
            checked: true,
            onClick: () => console.log('Active clicked'),
          },
          {
            label: 'Inactive',
            itemType: DropdownMenuItemType.Check,
            checked: false,
            onClick: () => console.log('Inactive clicked'),
          },
          {
            label: 'Pending',
            itemType: DropdownMenuItemType.Check,
            checked: false,
            onClick: () => console.log('Pending clicked'),
          },
        ],
      },
    ],
  },
};

export const RadioOnly: Story = {
  args: {
    label: 'Sort By',
    groups: [
      {
        label: 'Sort Order',
        radioValue: 'name',
        onRadioValueChange: (value) => console.log('Radio changed to:', value),
        items: [
          {
            label: 'Name',
            itemType: DropdownMenuItemType.Radio,
            value: 'name',
            onClick: () => console.log('Name selected'),
          },
          {
            label: 'Date',
            itemType: DropdownMenuItemType.Radio,
            value: 'date',
            onClick: () => console.log('Date selected'),
          },
          {
            label: 'Size',
            itemType: DropdownMenuItemType.Radio,
            value: 'size',
            onClick: () => console.log('Size selected'),
          },
        ],
      },
    ],
  },
};

export const MultipleGroups: Story = {
  args: {
    label: 'Advanced Filter',
    groups: [
      {
        label: 'File Types',
        items: [
          {
            label: 'Images',
            itemType: DropdownMenuItemType.Check,
            checked: true,
            onClick: () => console.log('Images toggled'),
          },
          {
            label: 'Documents',
            itemType: DropdownMenuItemType.Check,
            checked: false,
            onClick: () => console.log('Documents toggled'),
          },
        ],
      },
      {
        label: 'Sort By',
        radioValue: 'date',
        items: [
          {
            label: 'Date Modified',
            itemType: DropdownMenuItemType.Radio,
            value: 'date',
            onClick: () => console.log('Date selected'),
          },
          {
            label: 'File Size',
            itemType: DropdownMenuItemType.Radio,
            value: 'size',
            onClick: () => console.log('Size selected'),
          },
        ],
      },
      {
        label: 'Additional Options',
        items: [
          {
            label: 'Show Hidden Files',
            itemType: DropdownMenuItemType.Check,
            checked: false,
            onClick: () => console.log('Hidden files toggled'),
          },
        ],
      },
    ],
  },
};
