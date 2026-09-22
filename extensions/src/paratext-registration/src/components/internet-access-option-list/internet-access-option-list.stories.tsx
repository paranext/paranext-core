import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ReactElement, useState } from 'react';
import { InternetUse } from 'paratext-registration';
import {
  InternetAccessOptionList,
  INTERNET_ACCESS_OPTION_LIST_STRING_KEYS,
  type InternetAccessOptionListProps,
} from 'platform-bible-react/experimental';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';

const localizedStrings = getLocalizedStrings(INTERNET_ACCESS_OPTION_LIST_STRING_KEYS);

const meta: Meta<typeof InternetAccessOptionList> = {
  title: 'Bundled Extensions/paratext-registration/InternetAccessOptionList',
  component: InternetAccessOptionList,
  tags: ['autodocs', 'test'],
  args: {
    localizedStrings,
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof InternetAccessOptionList>;

function createDecorator(initialValue: InternetUse) {
  return function Decorator(
    Story: (update?: { args: Partial<InternetAccessOptionListProps> }) => ReactElement,
  ) {
    const [value, setValue] = useState<InternetUse>(initialValue);
    return <Story args={{ value, onChange: setValue }} />;
  };
}

/** "Unrestricted" selected — active row, description text visible. */
export const Unrestricted: Story = {
  decorators: [createDecorator('Enabled')],
};

/**
 * "Block internet when in sensitive locations" selected — blocks only where the location cannot be
 * confirmed safe.
 */
export const SensitiveLocations: Story = {
  decorators: [createDecorator('VpnRequired')],
};

/** "Disable all Internet access" selected — the only option that blocks unconditionally. */
export const AllInternetDisabled: Story = {
  decorators: [createDecorator('Disabled')],
};

/**
 * A coming-soon value is the current setting (e.g., a proxy configured in Paratext 9, which shares
 * these settings). The row renders selected-but-disabled; the user cannot interact with it.
 */
export const ComingSoonSelected: Story = {
  decorators: [createDecorator('ProxyOnly')],
};

/** All rows non-interactive — simulates the loading or saving state. */
export const FormDisabled: Story = {
  decorators: [createDecorator('VpnRequired')],
  args: { disabled: true },
};

/**
 * Footer note suppressed for space-constrained hosts such as the first-run wizard step. A "Coming
 * soon" badge still marks any option that is not yet available.
 */
export const WithoutFooter: Story = {
  decorators: [createDecorator('VpnRequired')],
  args: { showFooter: false },
};
