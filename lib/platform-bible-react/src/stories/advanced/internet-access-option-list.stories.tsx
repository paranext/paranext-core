import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import {
  InternetAccessOptionList,
  type InternetAccessOptionListProps,
  type InternetUse,
} from '@/components/advanced/internet-access-option-list/internet-access-option-list.component';

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
  '%paratextRegistration_internetUse_unsupportedSelection_title%':
    'This internet setting is not supported yet',
  '%paratextRegistration_internetUse_unsupportedSelection_description%':
    'Your Paratext internet settings have “{selectedOption}” selected. This version of Paratext does not support that option yet, so choose one of the available options to continue.',
};

const ENABLED_DESCRIPTION =
  localizedStrings['%paratextRegistration_description_internetUse_option_Enabled_details%'];

function Controlled(
  props: Omit<InternetAccessOptionListProps, 'value' | 'onChange'> & { initialValue: InternetUse },
) {
  const { initialValue, ...rest } = props;
  const [value, setValue] = useState<InternetUse>(initialValue);
  return <InternetAccessOptionList {...rest} value={value} onChange={setValue} />;
}

/**
 * Each option's description sits behind an info icon button beside its label, revealed as a tooltip
 * on hover or keyboard focus, rather than under the label as body copy — which kept the list from
 * becoming five stacked paragraphs of small grey text. The button carries the description as its
 * accessible name and is its own tab stop, so the description is reachable on every row, including
 * the "Coming soon" rows whose radios are disabled. A visually-hidden copy of the same description
 * is also wired to each radio via `aria-describedby`, so a screen reader moving through the radios
 * hears it too.
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

/**
 * Option 1 (Unrestricted) selected — active row, no description shown until its info button is
 * used.
 */
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

/** Hovering an option's info button opens its description tooltip. */
export const DescriptionTooltipOnHover: Story = {
  render: (args) => <Controlled {...args} initialValue="Enabled" />,
  play: async ({ canvasElement, userEvent }) => {
    await userEvent.hover(within(canvasElement).getByRole('button', { name: ENABLED_DESCRIPTION }));
    await expectVisibleTooltip(ENABLED_DESCRIPTION);
  },
};

/**
 * The same descriptions are reachable without a mouse, on every row. Tabbing into the group lands
 * on the checked radio, and each info button after it is a tab stop of its own — so a "Coming soon"
 * row's description opens even though its disabled radio never takes focus.
 *
 * The mirror image — the panel's programmatic focus on the checked radio revealing nothing — is
 * asserted in a real browser by the `internet-settings` Playwright spec.
 */
export const DescriptionTooltipOnKeyboardFocus: Story = {
  render: (args) => <Controlled {...args} initialValue="Enabled" />,
  play: async ({ canvasElement, userEvent }) => {
    const comingSoonDescription =
      localizedStrings['%paratextRegistration_description_internetUse_option_Disabled_details%'];
    await userEvent.tab(); // the checked radio
    await userEvent.tab(); // Unrestricted's info button
    await userEvent.tab(); // "Disable access to some Bible translation services" info button
    await userEvent.tab(); // "Disable ALL internet access" info button, on a "Coming soon" row
    await expect(
      within(canvasElement).getByRole('button', { name: comingSoonDescription }),
    ).toHaveFocus();
    await expectVisibleTooltip(comingSoonDescription);
  },
};

/**
 * Each label's click target stretches over its whole row, so clicking anywhere on a row selects its
 * option. The info button has to sit above that target, or a click meant for the description would
 * select the option instead. Both are hit-tested against real layout, which jsdom lacks.
 */
export const RowClickTargets: Story = {
  render: (args) => <Controlled {...args} initialValue="Enabled" />,
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);

    const infoButton = canvas.getByRole('button', { name: ENABLED_DESCRIPTION });
    const buttonBox = infoButton.getBoundingClientRect();
    const hitOnButton = document.elementFromPoint(
      buttonBox.left + buttonBox.width / 2,
      buttonBox.top + buttonBox.height / 2,
    );
    await expect(infoButton.contains(hitOnButton)).toBe(true);

    const radio = canvas.getByRole('radio', {
      name: 'Disable access to some Bible translation services',
    });
    const row = radio.closest('div');
    if (!row) throw new Error('expected the radio to sit inside its row');
    const rowBox = row.getBoundingClientRect();
    // The far end of the row, past both the label's text and its info button.
    const hitOnRowEnd = document.elementFromPoint(rowBox.right - 4, rowBox.top + rowBox.height / 2);
    if (!(hitOnRowEnd instanceof HTMLElement))
      throw new Error('expected an element at the far end of the row');
    await expect(hitOnRowEnd).toHaveAttribute('for', radio.id);

    await userEvent.click(hitOnRowEnd);
    await expect(radio).toBeChecked();
  },
};

/**
 * Roughly the width the first-run wizard gives this list, where the longer labels wrap onto a
 * second line. The info button stays with its label's last word instead of drifting out to the
 * row's edge next to the "Coming soon" badge, which reads as if it belonged to the badge.
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
 * A coming-soon value is the current setting — `InternetSettings.xml` is seeded once from a
 * co-installed Paratext 9 on first launch, so it can name an option this app does not implement
 * yet. The row renders selected-but-disabled so the carried-over setting is visible rather than
 * silently swapped, and a banner says why nothing acts on it.
 */
export const ComingSoonSelected: Story = {
  render: (args) => <Controlled {...args} initialValue="Disabled" />,
};

/** The other unsupported value a settings file can carry: "Configure proxy". */
export const ComingSoonProxySelected: Story = {
  render: (args) => <Controlled {...args} initialValue="ProxyOnly" />,
};

/**
 * All radios non-interactive — simulates the loading or saving state. The info buttons stay usable,
 * since the descriptions explain the options rather than being part of the setting.
 */
export const FormDisabled: Story = {
  render: (args) => <Controlled {...args} initialValue="VpnRequired" />,
  args: { disabled: true },
};
