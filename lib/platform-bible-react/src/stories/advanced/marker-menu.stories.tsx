import {
  MarkerMenu,
  MarkerMenuLocalizedStrings,
} from '@/components/advanced/marker-menu.component';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ClipboardPaste } from 'lucide-react';

const meta: Meta<typeof MarkerMenu> = {
  title: 'Advanced/MarkerMenu',
  component: MarkerMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A component that lists the markers and a few commands that can be used in the
        scripture editor.`,
      },
    },
  },
  argTypes: {
    localizedStrings: {
      control: 'object',
      description: 'List of localized strings to use in the MarkerMenu component',
    },
    markerMenuItems: {
      control: 'object',
      description:
        'List of marker items to be displayed which can include both marker options or commands',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default localized strings for stories
const defaultLocalizedStrings: MarkerMenuLocalizedStrings = {
  '%markerMenu_deprecated_label%': 'Deprecated',
  '%markerMenu_disallowed_label%': 'Disallowed',
  '%markerMenu_noResults%': 'No results found.',
  '%markerMenu_searchPlaceholder%': 'Type a style or search.',
};

export const Default: Story = {
  args: {
    localizedStrings: defaultLocalizedStrings,
    markerMenuItems: [
      {
        marker: 'p',
        title: 'Paragraph',
        subtitle: 'normal (with indent first line)',
        // eslint-disable-next-line no-alert
        action: () => alert('Paragraph marker selected!'),
      },
      {
        icon: <ClipboardPaste size={16} />,
        title: 'Paste',
        // eslint-disable-next-line no-alert
        action: () => alert('Paste command selected!'),
      },
      {
        icon: <ClipboardPaste size={16} />,
        title: 'Paste as plaintext',
        // eslint-disable-next-line no-alert
        action: () => alert('Past as plaintext selected!'),
      },
      {
        marker: 'pi',
        title: 'Indented Paragraph',
        subtitle: 'indent level 1 (with first line indent)',
        // eslint-disable-next-line no-alert
        action: () => alert('Indented Paragraph marker selected!'),
        isDisallowed: true,
      },
      {
        marker: 'ph',
        title: 'Indented paragraph with hanging indent',
        // eslint-disable-next-line no-alert
        action: () => alert('Indented paragraph with hanging indent marker selected!'),
        isDeprecated: true,
      },
    ],
  },
};
