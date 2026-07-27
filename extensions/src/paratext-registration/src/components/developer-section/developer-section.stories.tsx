import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DeveloperSection, DEVELOPER_SECTION_STRING_KEYS } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';

const localizedStrings = getLocalizedStrings(DEVELOPER_SECTION_STRING_KEYS);

const meta: Meta<typeof DeveloperSection> = {
  title: 'Bundled Extensions/paratext-registration/DeveloperSection',
  component: DeveloperSection,
  tags: ['autodocs', 'test'],
  args: {
    localizedStrings,
    selectedServer: 'Production',
    onServerChange: () => {},
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof DeveloperSection>;

/** Collapsed by default — the server toggle is not visible. */
export const Collapsed: Story = {};

/** Section expanded — Production is the active server. */
export const Expanded: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};

/** Section expanded — Development is the active server. */
export const DevelopmentActive: Story = {
  args: { selectedServer: 'Development' },
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};

/**
 * `disabled={true}` — header still clickable, but the Production/Development toggle is greyed out
 * and non-interactive.
 */
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};
