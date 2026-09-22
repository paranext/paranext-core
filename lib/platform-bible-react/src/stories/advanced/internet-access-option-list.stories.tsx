import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
  '%paratextRegistration_description_internetUse_option_VpnRequired_3%':
    'Block internet when in sensitive locations',
  '%paratextRegistration_description_internetUse_option_VpnRequired_details_2%':
    'Paratext checks the location your internet connection appears to come from. Where that location is flagged as sensitive — or cannot be confirmed — access to the Registry, Send/Receive, and the Digital Bible Library is blocked. Elsewhere they work normally.',
  '%paratextRegistration_description_internetUse_option_Disabled_2%': 'Disable all Internet access',
  '%paratextRegistration_description_internetUse_option_Disabled_details%':
    'Blocks all internet access within the Paratext app. Other applications on your computer are not affected.',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_2%': 'Configure proxy',
  '%paratextRegistration_description_internetUse_option_ProxyOnly_details%':
    'Routes Paratext internet traffic through a configured proxy server.',
  '%paratextRegistration_internetUse_comingSoon%': 'Coming soon',
  '%paratextRegistration_internetUse_footer_2%':
    'Options marked “Coming soon” are planned for future updates.',
};

function Controlled(
  props: Omit<InternetAccessOptionListProps, 'value' | 'onChange'> & { initialValue: InternetUse },
) {
  const { initialValue, ...rest } = props;
  const [value, setValue] = useState<InternetUse>(initialValue);
  return <InternetAccessOptionList {...rest} value={value} onChange={setValue} />;
}

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

/** "Unrestricted" selected — active row, description text visible. */
export const Unrestricted: Story = {
  render: (args) => <Controlled {...args} initialValue="Enabled" />,
};

/**
 * "Block internet when in sensitive locations" selected — blocks only where the location cannot be
 * confirmed safe.
 */
export const SensitiveLocations: Story = {
  render: (args) => <Controlled {...args} initialValue="VpnRequired" />,
};

/** "Disable all Internet access" selected — the only option that blocks unconditionally. */
export const AllInternetDisabled: Story = {
  render: (args) => <Controlled {...args} initialValue="Disabled" />,
};

/**
 * A coming-soon value is the current setting (e.g., a proxy configured in Paratext 9, which shares
 * these settings). The row renders selected-but-disabled; the user cannot interact with it.
 */
export const ComingSoonSelected: Story = {
  render: (args) => <Controlled {...args} initialValue="ProxyOnly" />,
};

/** All rows non-interactive — simulates the loading or saving state. */
export const FormDisabled: Story = {
  render: (args) => <Controlled {...args} initialValue="VpnRequired" />,
  args: { disabled: true },
};

/**
 * Footer note suppressed for space-constrained hosts such as the first-run wizard step. A "Coming
 * soon" badge still marks any option that is not yet available.
 */
export const WithoutFooter: Story = {
  render: (args) => <Controlled {...args} initialValue="VpnRequired" />,
  args: { showFooter: false },
};
