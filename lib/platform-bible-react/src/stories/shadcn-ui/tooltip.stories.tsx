import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '@/components/shadcn-ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Tooltip> = {
  title: 'Shadcn/Tooltip',
  component: Tooltip,
  tags: ['autodocs', 'test'],
  argTypes: {
    delayDuration: { control: 'number' },
    disableHoverableContent: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <TooltipProvider>
          <div className="tw-flex tw-justify-center tw-p-8">
            <Story />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic tooltip that appears when hovering over the trigger element.',
      },
    },
  },
};

export const WithCustomContent: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="default">Rich Content</Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="tw-space-y-1">
          <p className="tw-font-semibold">Custom Tooltip</p>
          <p className="tw-text-sm">You can put any content here</p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can contain rich content including multiple elements and custom styling.',
      },
    },
  },
};

export const WithDifferentTriggers: Story = {
  render: (args) => (
    <div className="tw-flex tw-gap-4">
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Outline Button</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip on outline button</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="destructive">Destructive Button</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip on destructive button</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="ghost">Ghost Button</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip on ghost button</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips can be applied to different button variants and other trigger elements.',
      },
    },
  },
};

export const DelayedTooltip: Story = {
  render: (args) => (
    <Tooltip {...args} delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button variant="secondary">Delayed Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip appears after 1 second</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'You can customize the delay before the tooltip appears using the delayDuration prop.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={fn()}>
          Click &amp; Hover
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This button is both clickable and has a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
  args: {
    delayDuration: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltips work seamlessly with interactive elements like clickable buttons.',
      },
    },
  },
};
