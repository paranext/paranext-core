import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import { Sonner, sonner } from '@/components/shadcn-ui/sonner';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta<typeof Sonner> = {
  title: 'Shadcn/Sonner',
  component: Sonner,
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

type Story = StoryObj<typeof Sonner>;

export const Default: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <div className="tw-flex tw-flex-wrap tw-gap-2">
        <Button onClick={() => sonner('This is a normal message')}>Normal Toast</Button>
        <Button onClick={() => sonner.success('Operation successful!')}>Success Toast</Button>
        <Button onClick={() => sonner.warning('This is a warning!')}>Warning Toast</Button>
        <Button onClick={() => sonner.error('This is an error')}>Error Toast</Button>
      </div>
      <Sonner />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic Sonner toast notifications with different types.',
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <div className="tw-flex tw-flex-wrap tw-gap-2">
        <Button
          onClick={() =>
            sonner('This is a normal message', {
              description: 'This is a detailed description of what happened',
            })
          }
        >
          With Description
        </Button>
        <Button
          onClick={() =>
            sonner.success('Task completed!', {
              description: 'Your file has been uploaded successfully',
            })
          }
        >
          Success with Description
        </Button>
        <Button
          onClick={() =>
            sonner.error('Failed to save', {
              description: 'Please check your internet connection and try again',
            })
          }
        >
          Error with Description
        </Button>
      </div>
      <Sonner />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast notifications with detailed descriptions, similar to the original example.',
      },
    },
  },
};

export const Actions: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <div className="tw-flex tw-flex-wrap tw-gap-2">
        <Button
          onClick={() =>
            sonner('Event created', {
              description: 'Monday, January 3rd at 6:00pm',
              action: {
                label: 'Undo',
                onClick: () => sonner('Undone!'),
              },
            })
          }
        >
          Toast with Action
        </Button>
        <Button
          onClick={() =>
            sonner('Are you sure?', {
              description: 'This action cannot be undone',
              action: {
                label: 'Confirm',
                onClick: () => sonner.success('Confirmed!'),
              },
              cancel: {
                label: 'Cancel',
                onClick: () => sonner('Cancelled'),
              },
            })
          }
        >
          Toast with Actions
        </Button>
      </div>
      <Sonner />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast notifications with action buttons.',
      },
    },
  },
};

export const PromiseToast: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <Button
        onClick={() => {
          const promise = new Promise<string>(
            (resolve: (value: string) => void, reject: (reason: Error) => void) => {
              setTimeout(() => {
                if (Math.random() > 0.5) {
                  resolve('Success!');
                } else {
                  reject(new Error('Failed!'));
                }
              }, 2000);
            },
          );

          sonner.promise(promise, {
            loading: 'Loading...',
            success: 'Operation completed successfully!',
            error: 'Something went wrong!',
          });
        }}
      >
        Promise Toast
      </Button>
      <Sonner />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast that automatically updates based on a promise state.',
      },
    },
  },
};

export const Positioning: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <div className="tw-grid tw-grid-cols-3 tw-gap-2">
        <Button onClick={() => sonner('Top Left', { position: 'top-left' })}>Top Left</Button>
        <Button onClick={() => sonner('Top Center', { position: 'top-center' })}>Top Center</Button>
        <Button onClick={() => sonner('Top Right', { position: 'top-right' })}>Top Right</Button>
        <Button onClick={() => sonner('Bottom Left', { position: 'bottom-left' })}>
          Bottom Left
        </Button>
        <Button onClick={() => sonner('Bottom Center', { position: 'bottom-center' })}>
          Bottom Center
        </Button>
        <Button onClick={() => sonner('Bottom Right', { position: 'bottom-right' })}>
          Bottom Right
        </Button>
      </div>
      <Sonner />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast notifications in different positions on the screen.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <div className="tw-flex tw-flex-wrap tw-gap-2">
        <Button
          onClick={() =>
            sonner('This is a normal message', { description: 'This is a description' })
          }
        >
          Show normal message
        </Button>
        <Button onClick={() => sonner.warning('This is a warning!')}>Show warning</Button>
        <Button onClick={() => sonner.error('This is an error')}>Show error</Button>
      </div>
      <p className="tw-text-sm tw-text-muted-foreground">
        Click the buttons to see different toast notifications. This matches the original example.
      </p>
      <Sonner />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive toast examples matching the original component demo.',
      },
    },
  },
};
