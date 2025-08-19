import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn-ui/drawer';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Drawer> = {
  title: 'Shadcn/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    direction: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a drawer description explaining what this drawer is for.
          </DrawerDescription>
        </DrawerHeader>
        <div className="tw-p-4">
          <p>This is the main content of the drawer.</p>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic drawer that slides in from the bottom.',
      },
    },
  },
};

export const Directions: Story = {
  render: () => (
    <div className="tw-flex tw-flex-col tw-items-start tw-gap-4">
      <Drawer direction="top">
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer (Top)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          Content
          <DrawerFooter>
            Footer
            <DrawerClose asChild>
              <Button variant="outline">Close Drawer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer (Right)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          Content
          <DrawerFooter>
            Footer
            <DrawerClose asChild>
              <Button variant="outline">Close Drawer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer (Left)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          Content
          <DrawerFooter>
            Footer
            <DrawerClose asChild>
              <Button variant="outline">Close Drawer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer (Bottom)</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Title</DrawerTitle>
            <DrawerDescription>Description</DrawerDescription>
          </DrawerHeader>
          Content
          <DrawerFooter>
            Footer
            <DrawerClose asChild>
              <Button variant="outline">Close Drawer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Drawers that slide in from different directions (top, right, bottom, left), matching the original example.',
      },
    },
  },
};

export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <div className="tw-space-y-4 tw-p-4">
          <div className="tw-space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div className="tw-space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your email" />
          </div>
          <div className="tw-space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="tw-w-full tw-rounded tw-border tw-p-2"
              rows={3}
              placeholder="Tell us about yourself"
            />
          </div>
        </div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A drawer containing a form with multiple input fields.',
      },
    },
  },
};

export const Responsive: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Responsive Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="tw-max-h-[96%]">
        <DrawerHeader>
          <DrawerTitle>Responsive Drawer</DrawerTitle>
          <DrawerDescription>
            This drawer adapts to different screen sizes and has a max height.
          </DrawerDescription>
        </DrawerHeader>
        <div className="tw-overflow-y-auto tw-p-4">
          <div className="tw-space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="tw-rounded tw-border tw-p-3">
                <h4 className="tw-font-medium">Item {i + 1}</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  This is item {i + 1} in the scrollable content area.
                </p>
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <Button>Action</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A responsive drawer with scrollable content and max height constraints.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Interactive Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Interactive Drawer</DrawerTitle>
          <DrawerDescription>
            Use the controls to experiment with different drawer properties.
          </DrawerDescription>
        </DrawerHeader>
        <div className="tw-p-4">
          <p>This drawer&apos;s behavior can be controlled via the Storybook controls.</p>
        </div>
        <DrawerFooter>
          <Button>Confirm</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  args: {
    direction: 'bottom',
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive drawer where you can experiment with properties using the controls.',
      },
    },
  },
};
