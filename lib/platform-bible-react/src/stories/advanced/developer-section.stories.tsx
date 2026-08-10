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

/** Section expanded — Test is the active server. */
export const TestActive: Story = {
  args: { selectedServer: 'Test' },
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};

/**
 * A hidden QualityAssurance (or unknown) server is persisted (e.g., from a prior session). The UI
 * displays it as Production; clicking Production switches the user to actual Production.
 */
export const QualityAssuranceActive: Story = {
  args: { selectedServer: 'QualityAssurance' },
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};

/**
 * `disabled={true}` — header still clickable, but the server toggle is greyed out and
 * non-interactive.
 */
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, userEvent }) => {
    const header = canvasElement.querySelector('button');
    if (header) await userEvent.click(header);
  },
};
