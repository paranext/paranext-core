import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { TextField } from '@/components/basics/text-field.component';

const meta: Meta<typeof TextField> = {
  title: 'Basics/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A text input field component with label, validation, and helper text support.

Based on shadcn-ui Input component with additional features like error states and full-width support.
        `,
      },
    },
  },
  argTypes: {
    isDisabled: {
      control: 'boolean',
      description: 'If true, the component is disabled',
    },
    hasError: {
      control: 'boolean',
      description: 'If true, the label is displayed in an error state',
    },
    isFullWidth: {
      control: 'boolean',
      description: 'If true, the input will take up the full width of its container',
    },
    isRequired: {
      control: 'boolean',
      description: 'If true, the label is displayed as required and the input element is required',
    },
    label: {
      control: 'text',
      description: 'The title of the TextField',
    },
    placeholder: {
      control: 'text',
      description: 'The short hint displayed in the input before the user enters a value',
    },
    helperText: {
      control: 'text',
      description: 'Text that gives the user instructions on what contents the TextField expects',
    },
    defaultValue: {
      control: 'text',
      description: 'Starting value for the text field if it is not controlled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'user@example.com',
    helperText: 'We will never share your email with anyone else.',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    isRequired: true,
    helperText: 'Password must be at least 8 characters long.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'user@example.com',
    hasError: true,
    helperText: 'Please enter a valid email address.',
    defaultValue: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Read Only Field',
    defaultValue: 'This field is disabled',
    isDisabled: true,
    helperText: 'This field cannot be edited.',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description...',
    isFullWidth: true,
    helperText: 'This field takes up the full width of its container.',
  },
  parameters: {
    layout: 'padded',
  },
};

export const NoLabel: Story = {
  args: {
    placeholder: 'Search...',
    helperText: 'This field has no label, only placeholder text.',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Name',
    defaultValue: 'John Doe',
    helperText: 'This field has a default value.',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('Controlled value');

    return <TextField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
  args: {
    label: 'Controlled Input',
    helperText: 'This input is controlled by React state.',
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      feedback: '',
    });
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, boolean> = {};

      if (!formData.firstName) newErrors.firstName = true;
      if (!formData.lastName) newErrors.lastName = true;
      if (!formData.email || !formData.email.includes('@')) newErrors.email = true;

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        // eslint-disable-next-line no-alert
        alert('Form submitted successfully!');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="tw-max-w-md tw-space-y-4">
        <TextField
          label="First Name"
          placeholder="John"
          isRequired
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          hasError={errors.firstName}
          helperText={errors.firstName ? 'First name is required' : undefined}
          isFullWidth
        />

        <TextField
          label="Last Name"
          placeholder="Doe"
          isRequired
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          hasError={errors.lastName}
          helperText={errors.lastName ? 'Last name is required' : undefined}
          isFullWidth
        />

        <TextField
          label="Email"
          placeholder="john.doe@example.com"
          isRequired
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          hasError={errors.email}
          helperText={
            errors.email ? 'Please enter a valid email address' : 'We will never share your email'
          }
          isFullWidth
        />

        <TextField
          label="Feedback"
          placeholder="Optional feedback..."
          value={formData.feedback}
          onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
          helperText="Tell us what you think (optional)"
          isFullWidth
        />

        <button
          type="submit"
          className="tw-rounded tw-bg-blue-500 tw-px-4 tw-py-2 tw-text-white hover:tw-bg-blue-600"
        >
          Submit Form
        </button>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive form example showing validation, controlled inputs, and error states.',
      },
    },
  },
};
