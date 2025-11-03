import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ComboBox, type ComboBoxLabelOption } from '@/components/basics/combo-box.component';
import { BookOpen, Calendar, User, Settings, Folder } from 'lucide-react';
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

type Project = ComboBoxLabelOption & {
  id: string;
};

const projectOptions: Project[] = [
  { id: '1', label: 'WEB', secondaryLabel: 'World English Bible' },
  { id: '2', label: 'BSB', secondaryLabel: 'Berean Standard Bible' },
  { id: '3', label: 'NET', secondaryLabel: 'New English Translation' },
  { id: '4', label: 'ESV', secondaryLabel: 'English Standard Version' },
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

export const WithMultipleGroups: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>(undefined);

    // Grouped options: Old Testament and New Testament books
    const groupedBookOptions = [
      {
        groupHeading: 'Old Testament',
        options: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
      },
      {
        groupHeading: 'New Testament',
        options: ['Matthew', 'Mark', 'Luke', 'John', 'Acts'],
      },
      {
        groupHeading: 'Long Named Items',
        options: [
          'This is a very long item that should be truncated properly in the UI',
          'Another extremely long item to test the truncation behavior of the combo box component',
        ],
      },
    ];

    return (
      <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          Combo box with multiple groups and headings
        </p>
        <ComboBox<string>
          options={groupedBookOptions}
          textPlaceholder="Search books..."
          buttonPlaceholder="Select a book"
          commandEmptyMessage="No books found"
          value={value}
          onChange={setValue}
          buttonVariant="outline"
          icon={<BookOpen />}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A combo box demonstrating multiple groups with headings. The options are organized into Old Testament and New Testament sections.',
      },
    },
  },
};

export const WithSecondaryLabel: Story = {
  render: () => {
    const [value, setValue] = useState<Project | undefined>(undefined);

    return (
      <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          Combo box with primary and secondary labels - short name in normal text, full name in
          muted text
        </p>
        <ComboBox<Project>
          options={projectOptions}
          textPlaceholder="Search projects..."
          buttonPlaceholder="Select a project"
          commandEmptyMessage="No projects found"
          value={value}
          onChange={setValue}
          getButtonLabel={(project) => project.secondaryLabel || project.label}
          buttonVariant="outline"
          icon={<Folder />}
        />
        {value && (
          <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
            Selected: {value.label} - {value.secondaryLabel}
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A combo box using the ComboBoxLabelOption interface to display a short name as the primary label and a full name as muted secondary label, separated by a middot (·).',
      },
    },
  },
};

type StoryProject = StoryObj<typeof ComboBox<Project>>;

export const WithSecondaryLabelGrouped: StoryProject = {
  render: () => {
    const [value, setValue] = useState<Project | undefined>(undefined);

    const groupedProjects = [
      {
        groupHeading: 'Recently Opened',
        options: [
          {
            id: '1',
            label: 'WEB',
            secondaryLabel: 'World English Bible',
          },
          {
            id: '2',
            label: 'BSB',
            secondaryLabel: 'Berean Standard Bible',
          },
        ],
      },
      {
        groupHeading: 'All Projects',
        options: [
          {
            id: '3',
            label: 'NET',
            secondaryLabel: 'New English Translation',
          },
          {
            id: '4',
            label: 'ESV',
            secondaryLabel: 'English Standard Version',
          },
          {
            id: '5',
            label: 'NASB',
            secondaryLabel: 'New American Standard Bible',
          },
        ],
      },
    ];

    return (
      <div>
        <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">
          Grouped combo box with secondary labels - demonstrating project selector with recent and
          all projects
        </p>
        <ComboBox<Project>
          options={groupedProjects}
          textPlaceholder="Search projects..."
          buttonPlaceholder="Select a project"
          commandEmptyMessage="No projects found"
          value={value}
          onChange={setValue}
          getButtonLabel={(project) => project.secondaryLabel || project.label}
          buttonVariant="outline"
          icon={<Folder />}
        />
        {value && (
          <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">
            Selected: {value.label} - {value.secondaryLabel}
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A combo box combining group headings with secondary labels. Shows how to build a project selector with "Recently Opened" and "All Projects" sections, where each project displays its short name prominently with the full name in muted text.',
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
