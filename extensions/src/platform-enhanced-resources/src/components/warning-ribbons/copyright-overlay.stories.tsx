import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import { MOCK_COPYRIGHT_TEXT } from '../../data/marble-form.story-data';
import { CopyrightOverlay, COPYRIGHT_OVERLAY_STRING_KEYS } from './copyright-overlay.component';

const localizedStrings = getLocalizedStrings([...COPYRIGHT_OVERLAY_STRING_KEYS]);

const meta: Meta<typeof CopyrightOverlay> = {
  title: 'Bundled Extensions/platform-enhanced-resources/CopyrightOverlay',
  component: CopyrightOverlay,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
    copyrightInfo: MOCK_COPYRIGHT_TEXT,
  },
};
export default meta;

type Story = StoryObj<typeof CopyrightOverlay>;

export const Visible: Story = {
  args: {
    dismissed: false,
  },
};

export const Dismissed: Story = {
  args: {
    dismissed: true,
  },
};
