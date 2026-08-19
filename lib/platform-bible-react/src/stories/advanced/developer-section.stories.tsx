import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeveloperSection } from '@/components/advanced/developer-section/developer-section.component';

const localizedStrings = {
  '%paratextRegistration_developer_section_label%': 'Developer only',
  '%paratextRegistration_label_serverType_option_Production%': 'Production',
  '%paratextRegistration_label_serverType_option_Development%': 'Development',
  '%paratextRegistration_label_serverType_option_Test%': 'Test',
};

const meta: Meta<typeof DeveloperSection> = {
  title: 'Advanced/DeveloperSection',
  component: DeveloperSection,
  tags: ['autodocs'],
  args: {
    localizedStrings,
    selectedServer: 'Production',
    onServerChange: () => {},
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof DeveloperSection>;

/** Collapsed by default — the server radio buttons are not visible. */
export const Collapsed: Story = {};

/** Section expanded — Production is the selected server. */
export const Expanded: Story = {
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};

/** Section expanded — Development is the selected server. */
export const DevelopmentActive: Story = {
  args: { selectedServer: 'Development' },
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};

/** Section expanded — Test is the selected server. */
export const TestActive: Story = {
  args: { selectedServer: 'Test' },
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};

/**
 * A QualityAssurance server is persisted (e.g., from a prior session). QA is the only value with no
 * row of its own, so the UI collapses it to the Production display. Clicking the already-checked
 * Production radio fires no Radix change event, so the component persists Production explicitly on
 * that click — otherwise this user would have no one-click route back to the real Production
 * server.
 */
export const QualityAssuranceActive: Story = {
  args: { selectedServer: 'QualityAssurance' },
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};

/**
 * `disabled={true}` — header still clickable, but the Production/Development/Test radios are greyed
 * out and non-interactive.
 */
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};
