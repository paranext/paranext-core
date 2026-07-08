import {
  MarkerMenu,
  MarkerMenuLocalizedStrings,
} from '@/components/advanced/marker-menu.component';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ClipboardPaste } from 'lucide-react';
import { expect } from 'storybook/test';

const meta: Meta<typeof MarkerMenu> = {
  title: 'Advanced/MarkerMenu',
  component: MarkerMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `A component that lists the markers and a few commands that can be used in the scripture editor.`,
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
        // Story action callback - alert is intentional to demonstrate marker selection feedback
        // eslint-disable-next-line no-alert
        action: () => alert('Paragraph marker selected!'),
      },
      {
        icon: ClipboardPaste,
        title: 'Paste',
        // Story action callback - alert is intentional to demonstrate command selection feedback
        // eslint-disable-next-line no-alert
        action: () => alert('Paste command selected!'),
      },
      {
        icon: ClipboardPaste,
        title: 'Paste as plaintext',
        // Story action callback - alert is intentional to demonstrate command selection feedback
        // eslint-disable-next-line no-alert
        action: () => alert('Past as plaintext selected!'),
      },
      {
        marker: 'pi',
        title: 'Indented Paragraph',
        subtitle: 'indent level 1 (with first line indent)',
        // Story action callback - alert is intentional to demonstrate marker selection feedback
        // eslint-disable-next-line no-alert
        action: () => alert('Indented Paragraph marker selected!'),
        isDisallowed: true,
      },
      {
        marker: 'ph',
        title: 'Indented paragraph with hanging indent',
        // Story action callback - alert is intentional to demonstrate marker selection feedback
        // eslint-disable-next-line no-alert
        action: () => alert('Indented paragraph with hanging indent marker selected!'),
        isDeprecated: true,
      },
    ],
  },
};

/**
 * Disallowed markers (for example, styles blocked while the document's structure is protected) are
 * hidden until the search query matches them, so on an empty query the "Disallowed" badge is not
 * visible. This story types the disallowed marker's code to reveal it, demonstrating that a
 * revealed disallowed item is rendered disabled with a "Disallowed" badge.
 */
export const DisallowedMarker: Story = {
  args: Default.args,
  play: async ({ canvas, userEvent, step }) => {
    await step('Search for the disallowed "Indented Paragraph" (pi) marker', async () => {
      const searchInput = canvas.getByPlaceholderText('Type a style or search.');
      await userEvent.type(searchInput, 'pi');
    });

    await step('Verify the disallowed marker is revealed, disabled, with its badge', async () => {
      const item = await canvas.findByRole('option', { name: /Indented Paragraph/ });
      await expect(item).toHaveAttribute('aria-disabled', 'true');
      await expect(canvas.getByText('Disallowed')).toBeInTheDocument();
    });
  },
};
