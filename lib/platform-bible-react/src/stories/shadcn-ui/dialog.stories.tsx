import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Shadcn/Dialog',
  component: Dialog,
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

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description. You can place any content here.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A basic dialog with title, description, and footer.',
      },
    },
  },
};

export const ClearFilters: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Clear Filters</Button>
      </DialogTrigger>
      <DialogContent className="tw-max-w-sm">
        <DialogHeader>
          <DialogTitle>Clear filters</DialogTitle>
          <DialogDescription>Clear filters to show all results?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Show all results</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A confirmation dialog for clearing filters, similar to the original example.',
      },
    },
  },
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="tw-max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="tw-grid tw-gap-4 tw-py-4">
          <div className="tw-grid tw-grid-cols-4 tw-items-center tw-gap-4">
            <Label htmlFor="name" className="tw-text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="tw-col-span-3" />
          </div>
          <div className="tw-grid tw-grid-cols-4 tw-items-center tw-gap-4">
            <Label htmlFor="username" className="tw-text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="tw-col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A dialog containing a form with input fields.',
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Controlled Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog&apos;s open state is controlled by React state.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A dialog with controlled open state using React state.',
      },
    },
  },
};

export const Destructive: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent className="tw-max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A destructive confirmation dialog for dangerous actions.',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Interactive Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Interactive Dialog</DialogTitle>
          <DialogDescription>
            Use the controls to experiment with different dialog properties.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An interactive dialog where you can experiment with properties using the controls.',
      },
    },
  },
};
