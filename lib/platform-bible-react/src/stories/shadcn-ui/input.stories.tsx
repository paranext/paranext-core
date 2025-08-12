import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@/components/shadcn-ui/input';
import { useState, type ChangeEvent } from 'react';
// import { ThemeProvider } from '@/preview/preview-components/theme-provider.component'; // Temporarily disabled

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
        <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
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
