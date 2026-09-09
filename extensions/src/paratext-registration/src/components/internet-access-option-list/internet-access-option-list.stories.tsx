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
    { args }: { args: InternetAccessOptionListProps },
  ) {
    const [value, setValue] = useState<InternetUse>(initialValue);
    // Args passed to <Story> replace the story's args rather than merging into them, so spread the
    // resolved ones back in — otherwise `localizedStrings` and `disabled` arrive undefined.
    return <Story args={{ ...args, value, onChange: setValue }} />;
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
 * A coming-soon value is the current setting — `InternetSettings.xml` is seeded once from a
 * co-installed Paratext 9 on first launch, so it can name an option this app does not implement
 * yet. The row renders selected-but-disabled and a banner says why nothing acts on it.
 */
export const ComingSoonSelected: Story = {
  decorators: [createDecorator('Disabled')],
};

/** All rows non-interactive — simulates the loading or saving state. */
export const FormDisabled: Story = {
  decorators: [createDecorator('VpnRequired')],
  args: { disabled: true },
};
