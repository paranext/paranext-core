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
  '%paratextRegistration_internetUse_footer%': 'Disabled options are planned for future updates.',
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

/** Option 1 (Unrestricted) selected — active row, description text visible. */
export const Unrestricted: Story = {
  render: (args) => <Controlled {...args} initialValue="Enabled" />,
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
