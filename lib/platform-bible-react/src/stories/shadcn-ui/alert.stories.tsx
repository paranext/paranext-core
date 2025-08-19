import type { Meta, StoryObj } from '@storybook/react-vite';
import { MarkdownRenderer } from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn-ui/alert';
import { AlertCircle, Terminal, Info, CheckCircle2, XCircle } from 'lucide-react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Alert> = {
  title: 'Shadcn/Alert',
  component: Alert,
  tags: ['autodocs', 'test'],
  argTypes: {
    variant: {
      options: ['default', 'destructive'],
      control: { type: 'select' },
    },
    className: { control: 'text' },
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

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <Terminal className="tw-h-4 tw-w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add an svg icon, title, and description to your alert.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic alert with an icon, title, and description.',
      },
    },
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} variant="destructive">
      <AlertCircle className="tw-h-4 tw-w-4" />
      <AlertTitle>Settings are incomplete</AlertTitle>
      <AlertDescription>
        Results from the Capitalization check may be misleading because settings are incomplete
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A destructive alert variant used for errors or warnings.',
      },
    },
  },
};

export const DescriptionOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <Terminal className="tw-h-4 tw-w-4" />
      <AlertDescription>
        You don&apos;t have to provide a title. Here is just an svg icon and a description.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert with only an icon and description, no title.',
      },
    },
  },
};

export const WithImageIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <img
        className="tw-h-4 tw-w-4"
        src="https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"
        alt="Wifi icon"
      />
      <AlertTitle>Connection Status</AlertTitle>
      <AlertDescription>You can alternatively use an img for your icon.</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert using an image icon instead of an SVG icon.',
      },
    },
  },
};

export const ContentOnly: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertDescription>
        Alert! With only AlertDescription, this looks like a Card 🤔
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert with only description content.',
      },
    },
  },
};

export const TextOnly: Story = {
  render: (args) => (
    <Alert {...args}>Alert! With nothing else in it, this looks like a Card 🤔</Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert with just plain text content.',
      },
    },
  },
};

export const WithMarkdown: Story = {
  render: (args) => (
    <Alert {...args}>
      <img
        className="tw-h-4 tw-w-4"
        src="https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg"
        alt="Markdown icon"
      />
      <AlertTitle>
        <MarkdownRenderer
          anchorTarget="_blank"
          className="tw-mb-1 tw-max-w-none tw-font-medium tw-leading-none tw-tracking-tight"
          markdown="[Markdown Support](https://www.markdownguide.org/cheat-sheet/)"
        />
      </AlertTitle>
      <AlertDescription>
        <MarkdownRenderer
          anchorTarget="_blank"
          className="tw-max-w-none tw-text-sm"
          markdown={`You can put a **markdown editor** in the *title* and *description*!\n- To match the markdown title with the original title, add \`tw-max-w-none tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight\` to the \`MarkdownRenderer\` class.\n- To match the markdown description with the normal description, add \`tw-max-w-none tw-text-sm\` to the \`MarkdownRenderer\` class.`}
        />
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An alert demonstrating markdown content support in both title and description.',
      },
    },
  },
};

export const VariantsShowcase: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <Alert>
        <Info className="tw-h-4 tw-w-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an informational alert.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <XCircle className="tw-h-4 tw-w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This is an error alert.</AlertDescription>
      </Alert>

      <Alert>
        <CheckCircle2 className="tw-h-4 tw-w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          This looks like a success alert (using default variant).
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A showcase of different alert styles with various icons and purposes.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <Alert {...args}>
      <Terminal className="tw-h-4 tw-w-4" />
      <AlertTitle>Interactive Alert</AlertTitle>
      <AlertDescription>
        Use the controls panel to experiment with different variants and properties.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive alert where you can test different properties using the controls.',
      },
    },
  },
};
