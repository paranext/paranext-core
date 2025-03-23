import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../components/shadcn-ui/input';
import { ThemeProvider } from '../../preview/preview-components/theme-provider.component';

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
      <ThemeProvider>
        <Story />
      </ThemeProvider>
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
