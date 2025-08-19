import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn-ui/avatar';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Avatar> = {
  title: 'Shadcn/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic avatar with an image and fallback text.',
      },
    },
  },
};

export const WithoutImage: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An avatar that shows only the fallback when no image is provided.',
      },
    },
  },
};

export const BrokenImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://broken-link.example/image.png" alt="Broken image" />
      <AvatarFallback>BI</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An avatar with a broken image URL that falls back to initials.',
      },
    },
  },
};

export const Different: Story = {
  render: () => (
    <div className="tw-flex tw-gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/nextjs.png" alt="@nextjs" />
        <AvatarFallback>NX</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple avatars showing different states and images.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An interactive avatar where you can experiment with properties using the controls.',
      },
    },
  },
};
