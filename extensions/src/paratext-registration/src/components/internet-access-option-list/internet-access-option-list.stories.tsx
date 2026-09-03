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

/** Option 1 (Unrestricted) selected — active row, description text visible. */
export const Unrestricted: Story = {
  decorators: [createDecorator('Enabled')],
};

/** Option 2 selected — "Disable access to some Bible translation services". */
export const DisabledAccess: Story = {
  decorators: [createDecorator('VpnRequired')],
};

/**
 * A coming-soon value is the current setting (e.g., from a PT9 migration). The row renders
 * selected-but-disabled; the user cannot interact with it.
 */
export const ComingSoonSelected: Story = {
  decorators: [createDecorator('Disabled')],
};

/** All rows non-interactive — simulates the loading or saving state. */
export const FormDisabled: Story = {
  decorators: [createDecorator('VpnRequired')],
  args: { disabled: true },
};

/**
 * Footer note suppressed for space-constrained hosts such as the first-run wizard step. The "Coming
 * soon" badges still mark the unavailable options.
 */
export const WithoutFooter: Story = {
  decorators: [createDecorator('VpnRequired')],
  args: { showFooter: false },
};
