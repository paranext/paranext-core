import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@/components/shadcn-ui/input';
import { useState, type ChangeEvent } from 'react';
// import { ThemeProvider } from '@/storybook/theme-provider.component'; // Temporarily disabled

const meta: Meta<typeof Input> = {
  title: 'Shadcn/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      // Temporarily removing ThemeProvider due to known issues
      // <ThemeProvider>
      <Story />
      // </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const Playground: Story = {
  args: {
    placeholder: 'Playground Input',
  },
};

export const LiveEditable: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="tw-max-w-md tw-space-y-4">
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Test input"
        />
        <div className="tw-text-sm tw-text-gray-600">
          <p>
            Current value: <code>{value}</code>
          </p>
          <p>Use the Code Editor tab to modify this input in real-time!</p>
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Type here to test...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story allows live code editing. Try adding validation, changing the placeholder, or adding event handlers.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      // Simple validation example
      if (newValue.length < 3 && newValue.length > 0) {
        setError('Must be at least 3 characters');
      } else {
        setError('');
      }
    };

    return (
      <div className="tw-max-w-md tw-space-y-2">
        <Input
          value={value}
          onChange={handleChange}
          placeholder="Enter at least 3 characters"
          className={error ? 'tw-border-red-500' : ''}
        />
        {error && <p className="tw-text-sm tw-text-red-500">{error}</p>}
        <p className="tw-text-sm tw-text-gray-600">
          Edit this validation logic in the Code Editor!
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'An input with validation logic that you can edit and experiment with in real-time.',
      },
    },
  },
};

export const CustomStyles: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <div>
        <label htmlFor="default-input" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
          Default Shadcn Input
        </label>
        <Input id="default-input" placeholder="Default styling" />
      </div>
      <div>
        <label htmlFor="small-input" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
          Small Input (8px height)
        </label>
        <Input id="small-input" placeholder="Small input" className="tw-h-8" />
      </div>
      <div>
        <label htmlFor="bvc-input" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
          BVC Style Input
        </label>
        <Input
          id="bvc-input"
          placeholder="Book-chapter-control style"
          className="tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-border-black tw-bg-white tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-text-slate-900 tw-shadow-none tw-outline-none"
        />
      </div>
      <div>
        <label htmlFor="ring-input" className="tw-mb-2 tw-block tw-text-sm tw-font-medium">
          Custom Ring Color
        </label>
        <Input
          id="ring-input"
          placeholder="Custom focus ring"
          className="focus-visible:tw-ring-[color:hsl(240,5%,64.9%)]"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various input styling examples showing different visual approaches.',
      },
    },
  },
};
