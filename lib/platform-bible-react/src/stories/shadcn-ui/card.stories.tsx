import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '@/components/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { Switch } from '@/components/shadcn-ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { BellRing, Check, Star, MessageSquare } from 'lucide-react';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Card> = {
  title: 'Shadcn/Card',
  component: Card,
  tags: ['autodocs', 'test'],
  argTypes: {
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

type Story = StoryObj<typeof Card>;

export const Simple: Story = {
  render: (args) => <Card {...args}>Simple card content</Card>,
  parameters: {
    docs: {
      description: {
        story: 'A simple card with just text content.',
      },
    },
  },
};

export const WithDescription: Story = {
  render: (args) => (
    <Card {...args}>
      <CardDescription>Card with CardDescription only</CardDescription>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A card containing only a description.',
      },
    },
  },
};

export const WithHeader: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card with header including title and description</CardDescription>
      </CardHeader>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A card with header section containing title and description.',
      },
    },
  },
};

export const ProjectCard: Story = {
  render: (args) => (
    <Card {...args} className="tw-w-[350px]">
      <CardHeader>
        <CardTitle>Psalms Layer-by-Layer</CardTitle>
        <CardDescription className="tw-text-balance tw-leading-relaxed">
          Unpacking the meaning of the Psalms for translators
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={fn()}>More information</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A project card with title, description, and action button.',
      },
    },
  },
};

export const CreateProjectForm: Story = {
  render: (args) => (
    <Card {...args} className="tw-w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="tw-grid tw-w-full tw-items-center tw-gap-4">
            <div className="tw-flex tw-flex-col tw-space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="tw-flex tw-flex-col tw-space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="tw-flex tw-justify-between">
        <Button variant="outline" onClick={fn()}>
          Cancel
        </Button>
        <Button onClick={fn()}>Deploy</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A form card for creating a new project with input fields and action buttons.',
      },
    },
  },
};

export const NotificationCard: Story = {
  render: (args) => (
    <Card {...args} className="tw-w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="tw-grid tw-gap-4">
        <div className="tw-flex tw-items-center tw-gap-x-4 tw-rounded-md tw-border tw-p-4">
          <BellRing />
          <div className="tw-flex-1 tw-space-y-1">
            <p className="tw-text-sm tw-font-medium tw-leading-none">Push Notifications</p>
            <p className="tw-text-sm tw-text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="tw-w-full" onClick={fn()}>
          <Check className="tw-mr-2 tw-h-4 tw-w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A notification card with settings toggle and action button.',
      },
    },
  },
};

export const VariousLayouts: Story = {
  render: () => (
    <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="tw-flex tw-items-center tw-gap-2">
            <Star className="tw-h-4 tw-w-4" />
            Featured
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="tw-text-sm tw-text-muted-foreground">
            This is a featured item with an icon in the title.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="tw-pt-6">
          <div className="tw-flex tw-items-center tw-justify-between">
            <div>
              <p className="tw-text-sm tw-font-medium">Total Messages</p>
              <p className="tw-text-2xl tw-font-bold">1,234</p>
            </div>
            <MessageSquare className="tw-h-8 tw-w-8 tw-text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="tw-pb-2">
          <CardTitle className="tw-text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="tw-space-y-2">
          <Button variant="outline" className="tw-w-full tw-justify-start" onClick={fn()}>
            Action 1
          </Button>
          <Button variant="outline" className="tw-w-full tw-justify-start" onClick={fn()}>
            Action 2
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="tw-pt-6">
          <div className="tw-text-center">
            <p className="tw-mb-2 tw-text-sm tw-text-muted-foreground">Status</p>
            <p className="tw-text-lg tw-font-semibold tw-text-green-600">All Systems Operational</p>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various card layouts demonstrating different use cases and compositions.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <Card {...args} className="tw-w-[300px]">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Experiment with card properties using the controls.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="tw-text-sm tw-text-muted-foreground">
          This card demonstrates the available properties and customization options.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={fn()}>Try Action</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An interactive card for experimenting with properties using the controls panel.',
      },
    },
  },
};
