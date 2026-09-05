import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import {
  InternetAccessOptionList,
  type InternetAccessOptionListProps,
} from '@/components/advanced/internet-access-option-list/internet-access-option-list.component';

// Mirror the InternetUse union from the component (which does not export it).
type InternetUse = 'Enabled' | 'VpnRequired' | 'Disabled' | 'ProxyOnly';

const localizedStrings = {
  '%paratextRegistration_description_internetUse_option_Enabled_2%': 'Unrestricted',
  '%paratextRegistration_description_internetUse_option_Enabled_details%':
    'Allows Paratext to use the internet for all services: Registry, Send/Receive, and resource downloads.',
  '%paratextRegistration_description_internetUse_option_VpnRequired_2%':
    'Disable access to some Bible translation services',
  '%paratextRegistration_description_internetUse_option_VpnRequired_details%':
    'Disables access to Registry, Send/Receive, and the Digital Bible Library within the Paratext app. Other internet features and other applications are not affected.',
  '%paratextRegistration_description_internetUse_option_Disabled_2%': 'Disable ALL internet access',
  '%paratextRegistration_description_internetUse_option_Disabled_details%':
    'Blocks all internet access within the Paratext app. Other applications on your computer are not affected.',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations%':
    'Block internet when in sensitive locations',
  '%paratextRegistration_description_internetUse_option_BlockInSensitiveLocations_details%':
    'Automatically blocks Paratext internet access in configured sensitive areas.',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_2%': 'Configure proxy',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_details%':
    'Routes Paratext internet traffic through a configured proxy server.',
  '%paratextRegistration_internetUse_comingSoon%': 'Coming soon',
};

function Controlled(
  props: Omit<InternetAccessOptionListProps, 'value' | 'onChange'> & { initialValue: InternetUse },
) {
  const { initialValue, ...rest } = props;
  const [value, setValue] = useState<InternetUse>(initialValue);
  return <InternetAccessOptionList {...rest} value={value} onChange={setValue} />;
}

/**
 * Each option's description is revealed by hovering (or keyboard-focusing) anywhere on its row —
 * the radio button, the label, or the info icon — rather than sitting under the label as body copy,
 * which kept the list from becoming five stacked paragraphs of small grey text. The info icon is
 * the visible signal that a description exists; it is decorative, so it adds no tab stop. A
 * visually-hidden copy of the same description stays wired to each radio via `aria-describedby`, so
 * screen readers still get it on every row including the disabled coming-soon ones.
 */
const meta: Meta<typeof InternetAccessOptionList> = {
  title: 'Advanced/InternetAccessOptionList',
  component: InternetAccessOptionList,
  tags: ['autodocs'],
  args: {
    localizedStrings,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof InternetAccessOptionList>;

/** Option 1 (Unrestricted) selected — active row, no description shown until hover. */
export const Unrestricted: Story = {
  render: (args) => <Controlled {...args} initialValue="Enabled" />,
};

/**
 * Waits for the visible tooltip content and asserts it carries the expected description. Targets
 * `[data-slot="tooltip-content"]` rather than `role="tooltip"`, which Radix puts on a
 * visually-hidden copy that is present even when nothing is on screen.
 */
async function expectVisibleTooltip(text: string) {
  await waitFor(() => {
    const content = document.querySelector('[data-slot="tooltip-content"]');
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent(text);
  });
}

/** Hovering a row opens its description tooltip; the whole row is the hover target. */
export const DescriptionTooltipOnHover: Story = {
  render: (args) => <Controlled {...args} initialValue="Enabled" />,
  play: async ({ canvasElement, userEvent }) => {
    const row = canvasElement.querySelector<HTMLElement>('[data-slot="tooltip-trigger"]');
    if (!row) throw new Error('expected the first option row to be the tooltip trigger');
    await userEvent.hover(row);
    await expectVisibleTooltip('Allows Paratext to use the internet for all services');
  },
};

/**
 * The same description is reachable without a mouse: tabbing into the group lands on the checked
 * radio and opens its row's tooltip. Screen-reader users get it from the visually-hidden copy
 * instead, which also covers the disabled coming-soon rows that focus can never reach.
 *
 * The mirror image — a programmatic focus revealing nothing — is what keeps the standalone panel
 * from popping a description open as it loads, and is asserted in a real browser by the
 * `internet-settings` Playwright spec.
 */
export const DescriptionTooltipOnKeyboardFocus: Story = {
  render: (args) => <Controlled {...args} initialValue="Enabled" />,
  play: async ({ userEvent }) => {
    await userEvent.tab();
    await expectVisibleTooltip('Allows Paratext to use the internet for all services');
  },
};

/**
 * Roughly the width the first-run wizard gives this list, where the longer labels wrap onto a
 * second line. The info icon stays with its label's last word instead of drifting out to the row's
 * edge next to the "Coming soon" badge, which reads as if it belonged to the badge.
 */
export const NarrowColumn: Story = {
  render: (args) => (
    <div className="tw:w-[380px]">
      <Controlled {...args} initialValue="Enabled" />
    </div>
  ),
};

/** Option 2 selected — "Disable access to some Bible translation services". */
export const DisabledAccess: Story = {
  render: (args) => <Controlled {...args} initialValue="VpnRequired" />,
};

/**
 * A coming-soon value is the current setting (e.g., persisted from an older PT9 migration). The row
 * renders selected-but-disabled; the user cannot interact with it.
 */
export const ComingSoonSelected: Story = {
  render: (args) => <Controlled {...args} initialValue="Disabled" />,
};

/** All rows non-interactive — simulates the loading or saving state. */
export const FormDisabled: Story = {
  render: (args) => <Controlled {...args} initialValue="VpnRequired" />,
  args: { disabled: true },
};

/**
 * Footer note suppressed for space-constrained hosts such as the first-run wizard step. The "Coming
 * soon" badges still mark the unavailable options.
 */
export const WithoutFooter: Story = {
  render: (args) => <Controlled {...args} initialValue="VpnRequired" />,
  args: { showFooter: false },
};
