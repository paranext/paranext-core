import type { Meta, StoryObj } from '@storybook/react-vite';

function ComponentName() {
  return <div>Story Template</div>;
}

const meta: Meta<typeof ComponentName> = {
  title: 'ComponentCategory/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Define your argTypes here
  },
  parameters: {
    // Enable code editor for live editing (optional)
    codeEditor: {
      editable: true,
      language: 'typescript',
    },
    docs: {
      description: {
        component: 'Description of your component and its purpose.',
      },
    },
  },
  // Add decorators if needed (e.g., for context providers)
  // decorators: [
  //   (Story) => (
  //     <SomeProvider>
  //       <Story />
  //     </SomeProvider>
  //   ),
  // ],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // Define your default args here
  },
};

// Example of a story with live editing capabilities
export const LiveEditable: Story = {
  render: () => (
    <div className="tw-space-y-4">
      <ComponentName />
      <p className="tw-text-sm tw-text-gray-600">
        Use the Code Editor tab to modify this component in real-time!
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'This story allows live code editing. Try modifying the component properties or adding new functionality.',
      },
    },
  },
};
