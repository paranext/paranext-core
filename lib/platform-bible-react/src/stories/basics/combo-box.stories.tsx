import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ComboBox } from '@/components/basics/combo-box.component';
import { BookOpen, Calendar, User, Settings } from 'lucide-react';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { useState } from 'react';

// Mock data for examples
const simpleOptions = ['Option1', 'Option2', 'Option3'];

const revisionOptions = [
  '08/24/24 05:50PM - Revision author',
  '08/24/24 05:30PM - Revision author',
  '08/24/24 05:45PM - Revision author',
];

const bookOptions = [
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  'Deuteronomy',
  'Joshua',
  'Judges',
  'Ruth',
];

const meta: Meta<typeof ComboBox<string>> = {
  title: 'Basics/ComboBox',
  component: ComboBox<string>,
  tags: ['autodocs', 'test'],
  argTypes: {
    options: { control: 'object' },
    textPlaceholder: { control: 'text' },
    buttonPlaceholder: { control: 'text' },
    commandEmptyMessage: { control: 'text' },
    buttonVariant: {
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      control: { type: 'select' },
    },
    alignDropDown: {
      options: ['start', 'center', 'end'],
      control: { type: 'select' },
    },
    className: { control: 'text' },
    isDisabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-max-w-lg tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ComboBox<string>>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return <ComboBox<string> {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: simpleOptions,
    textPlaceholder: 'Text Placeholder',
    buttonPlaceholder: 'Button Placeholder',
    commandEmptyMessage: 'No options found',
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic combo box with simple string options.',
      },
    },
  },
};

export const WithLongText: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          Combobox with long text options that will truncate - using ghost variant here
        </p>
        <ComboBox<string> {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: revisionOptions,
    textPlaceholder: 'Select revision ...',
    buttonPlaceholder: 'Select revision ...',
    commandEmptyMessage: 'No revisions found',
    buttonVariant: 'ghost',
  },
  parameters: {
    docs: {
      description: {
        story: 'A combo box with longer text options that will be truncated to fit the container.',
      },
    },
  },
};

export const WithIcon: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          An icon can be shown on the trigger button
        </p>
        <ComboBox<string>
          {...args}
          value={value}
          onChange={setValue}
          buttonVariant={value ? 'outline' : 'ghost'}
        />
      </div>
    );
  },
  args: {
    options: revisionOptions,
    textPlaceholder: 'Select revision ...',
    buttonPlaceholder: 'Select revision ...',
    commandEmptyMessage: 'No revisions found',
    icon: <BookOpen />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A combo box with an icon displayed on the trigger button. The button variant changes based on selection.',
      },
    },
  },
};

export const CustomAlignment: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          Alignment of dropdown menu can be controlled
        </p>
        <ComboBox<string> {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    options: revisionOptions,
    textPlaceholder: 'Select revision ...',
    buttonPlaceholder: 'Select revision ...',
    commandEmptyMessage: 'No revisions found',
    className: 'tw-w-[400px]',
    alignDropDown: 'end',
  },
  parameters: {
    docs: {
      description: {
        story: 'A wider combo box demonstrating dropdown alignment control.',
      },
    },
  },
};

export const DifferentVariants: Story = {
  render: () => {
    const [value1, setValue1] = useState<string | undefined>(undefined);
    const [value2, setValue2] = useState<string | undefined>(undefined);
    const [value3, setValue3] = useState<string | undefined>(undefined);

    return (
      <div className="tw-space-y-4">
        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">Default Variant</p>
          <ComboBox<string>
            options={bookOptions}
            textPlaceholder="Search books..."
            buttonPlaceholder="Select a book"
            commandEmptyMessage="No books found"
            value={value1}
            onChange={setValue1}
            buttonVariant="default"
          />
        </div>

        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">Outline Variant</p>
          <ComboBox<string>
            options={bookOptions}
            textPlaceholder="Search books..."
            buttonPlaceholder="Select a book"
            commandEmptyMessage="No books found"
            value={value2}
            onChange={setValue2}
            buttonVariant="outline"
          />
        </div>

        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">Ghost Variant</p>
          <ComboBox<string>
            options={bookOptions}
            textPlaceholder="Search books..."
            buttonPlaceholder="Select a book"
            commandEmptyMessage="No books found"
            value={value3}
            onChange={setValue3}
            buttonVariant="ghost"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different button variants available for the combo box trigger.',
      },
    },
  },
};

export const WithDifferentIcons: Story = {
  render: () => {
    const [value1, setValue1] = useState<string | undefined>(undefined);
    const [value2, setValue2] = useState<string | undefined>(undefined);
    const [value3, setValue3] = useState<string | undefined>(undefined);

    return (
      <div className="tw-space-y-4">
        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">Calendar Icon</p>
          <ComboBox<string>
            options={['Today', 'Tomorrow', 'Next Week']}
            textPlaceholder="Select date..."
            buttonPlaceholder="Select date"
            commandEmptyMessage="No dates found"
            value={value1}
            onChange={setValue1}
            icon={<Calendar />}
            buttonVariant="outline"
          />
        </div>

        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">User Icon</p>
          <ComboBox<string>
            options={['John Doe', 'Jane Smith', 'Bob Wilson']}
            textPlaceholder="Search users..."
            buttonPlaceholder="Select user"
            commandEmptyMessage="No users found"
            value={value2}
            onChange={setValue2}
            icon={<User />}
            buttonVariant="outline"
          />
        </div>

        <div>
          <p className="tw-mb-2 tw-text-sm tw-font-medium">Settings Icon</p>
          <ComboBox<string>
            options={['Theme', 'Language', 'Notifications']}
            textPlaceholder="Search settings..."
            buttonPlaceholder="Select setting"
            commandEmptyMessage="No settings found"
            value={value3}
            onChange={setValue3}
            icon={<Settings />}
            buttonVariant="outline"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of combo boxes with different icons to represent different data types.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | undefined>(undefined);
    return (
      <ComboBox<string>
        {...args}
        value={value}
        onChange={(newValue: string) => {
          setValue(newValue);
          fn()(newValue);
        }}
      />
    );
  },
  args: {
    options: bookOptions,
    textPlaceholder: 'Search books...',
    buttonPlaceholder: 'Select a book',
    commandEmptyMessage: 'No books found',
    buttonVariant: 'outline',
    icon: <BookOpen />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'An interactive combo box where you can experiment with all the available properties using the controls panel.',
      },
    },
  },
};
