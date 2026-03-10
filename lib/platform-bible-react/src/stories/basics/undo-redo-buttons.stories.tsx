import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  UndoRedoButtons,
  type UndoRedoButtonsLocalizedStrings,
} from '@/components/basics/undo-redo-buttons.component';

const meta: Meta<typeof UndoRedoButtons> = {
  title: 'Basics/UndoRedoButtons',
  component: UndoRedoButtons,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Undo and (optionally) Redo buttons with tooltips for use in editor toolbars.

- Omit \`onRedoClick\` to render only the Undo button.
- Pass \`canUndo\` / \`canRedo\` to control the disabled state of each button.
- Pass \`localizedStrings\` to localize the tooltip text; keys fall back to the raw key string when omitted.
        `,
      },
    },
  },
  argTypes: {
    onUndoClick: { action: 'undo-clicked' },
    // onRedoClick is intentionally absent here: a meta-level action would inject a handler into
    // every story, causing the Redo button to always render even in the UndoOnly story.
    // Stories that want the Redo button add onRedoClick to their own argTypes.
    canUndo: { control: 'boolean' },
    canRedo: { control: 'boolean' },
    localizedStrings: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultLocalizedStrings: UndoRedoButtonsLocalizedStrings = {
  '%undoButton_tooltip%': 'Undo',
  '%redoButton_tooltip%': 'Redo',
};

export const Default: Story = {
  argTypes: { onRedoClick: { action: 'redo-clicked' } },
  args: {
    canUndo: true,
    canRedo: true,
    localizedStrings: defaultLocalizedStrings,
  },
};

export const UndoOnly: Story = {
  // Use a render function so onRedoClick is never forwarded to the component, regardless of
  // what Storybook's action system injects into args.
  render: ({ onUndoClick, canUndo, localizedStrings }) => (
    <UndoRedoButtons
      onUndoClick={onUndoClick}
      canUndo={canUndo}
      localizedStrings={localizedStrings}
    />
  ),
  args: {
    canUndo: true,
    localizedStrings: defaultLocalizedStrings,
  },
  parameters: {
    docs: {
      description: {
        story: 'When `onRedoClick` is not provided the Redo button is hidden entirely.',
      },
    },
  },
};

export const BothDisabled: Story = {
  argTypes: { onRedoClick: { action: 'redo-clicked' } },
  args: {
    canUndo: false,
    canRedo: false,
    localizedStrings: defaultLocalizedStrings,
  },
};

export const FallbackLocalization: Story = {
  argTypes: { onRedoClick: { action: 'redo-clicked' } },
  args: {
    canUndo: true,
    canRedo: true,
    localizedStrings: {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'When localized strings are not provided the raw key (e.g. `%undoButton_tooltip%`) is shown as fallback tooltip text.',
      },
    },
  },
};

export const CustomLocalizedStrings: Story = {
  argTypes: { onRedoClick: { action: 'redo-clicked' } },
  args: {
    canUndo: true,
    canRedo: true,
    localizedStrings: {
      '%undoButton_tooltip%': 'Deshacer',
      '%redoButton_tooltip%': 'Rehacer',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with Spanish localization and Redo disabled.',
      },
    },
  },
};

export const InOverflowContainer: Story = {
  argTypes: { onRedoClick: { action: 'redo-clicked' } },
  render: (args) => (
    <div
      style={{
        overflow: 'hidden',
        width: 120,
        border: '1px solid #ccc',
        padding: '4px',
      }}
    >
      <UndoRedoButtons {...args} />
    </div>
  ),
  args: {
    canUndo: true,
    canRedo: true,
    localizedStrings: defaultLocalizedStrings,
  },
  parameters: {
    docs: {
      description: {
        story: 'Rendered inside an overflow-hidden container; the tooltip should not be clipped.',
      },
    },
  },
};
