import type { Meta, StoryObj } from '@storybook/react';

import Button from '@renderer/components/papi-components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    primary: true,
    disabled: false,
    children: 'Primary Button',
  },
};

export const CustomJSXContents: Story = {
  args: {
    disabled: false,
    className: ['video'],
    children: (
      <a href="https://www.youtube.com/watch?v=z_lgjFAxP6c">
        Funny Meeting Video
      </a>
    ),
  },
};

export const Paratext: Story = {
  args: {
    disabled: false,
    className: ['paratext'],
    children: 'Paratext Button',
  },
};

export const ParatextBright: Story = {
  args: {
    disabled: false,
    className: ['paratext', 'bright'],
    children: 'Paratext Button',
  },
};
