import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CancelAcceptButtons,
  type CancelAcceptButtonsLocalizedStrings,
} from '@/components/basics/cancel-accept-buttons.component';
import standardStrings from '@/localizedStrings.json';

const meta: Meta<typeof CancelAcceptButtons> = {
  title: 'Basics/CancelAcceptButtons',
  component: CancelAcceptButtons,
  tags: ['autodocs', 'test'],
  parameters: {
    docs: {
      description: {
        component: `Composed from shadcn/ui primitives: [Button](https://ui.shadcn.com/docs/components/button) (incl. Button Group) and [Tooltip](https://ui.shadcn.com/docs/components/tooltip).

Cancel and Accept buttons with tooltips for use in editor toolbars.

- Pass \`canAccept\` to control the disabled state of each button.
- Pass \`localizedStrings\` to localize the tooltip text; keys fall back to the raw key string when omitted.
        `,
      },
    },
  },
  argTypes: {
    onCancelClick: { action: 'cancel-clicked' },
    onAcceptClick: { action: 'accept-clicked' },
    canAccept: { control: 'boolean' },
    localizedStrings: { control: 'object' },
    acceptLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultLocalizedStrings: CancelAcceptButtonsLocalizedStrings = {
  '%cancelButton_tooltip%': standardStrings.localizedStrings.en['%cancelButton_tooltip%'],
  '%acceptButton_tooltip%': standardStrings.localizedStrings.en['%acceptButton_tooltip%'],
};

export const Default: Story = {
  args: {
    canAccept: true,
    localizedStrings: defaultLocalizedStrings,
  },
};

export const AcceptDisabled: Story = {
  args: {
    canAccept: false,
    localizedStrings: defaultLocalizedStrings,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pass `canAccept={false}` to disable the Accept button, e.g. when an editor has no content to save.',
      },
    },
  },
};

export const FallbackLocalization: Story = {
  args: {
    canAccept: true,
    localizedStrings: {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'When localized strings are not provided the raw key (e.g. `%cancelButton_tooltip%`) is shown as fallback tooltip text.',
      },
    },
  },
};

export const ContextSpecificLabel: Story = {
  args: {
    canAccept: true,
    localizedStrings: defaultLocalizedStrings,
    acceptLabel: 'Save Comment',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pass `acceptLabel` to override the generic accept tooltip with a context-specific label such as "Save Comment" or "Save Footnote".',
      },
    },
  },
};

export const CustomLocalizedStrings: Story = {
  args: {
    canAccept: true,
    localizedStrings: {
      '%cancelButton_tooltip%': standardStrings.localizedStrings.es['%cancelButton_tooltip%'],
      '%acceptButton_tooltip%': standardStrings.localizedStrings.es['%acceptButton_tooltip%'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with Spanish localization.',
      },
    },
  },
};
