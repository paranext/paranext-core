import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { userEvent, within } from 'storybook/test';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { CopyrightNoticeIndicatorView } from './copyright-notice-indicator.component';
import { COPYRIGHT_NOTICE_STRING_KEYS } from './copyright-notice.const';

/**
 * The info button a Text Collection cell shows beside a text's name when the text carries a
 * copyright notice. Hovering or focusing it shows the notice; clicking it opens the same details
 * the banner's "More info" opens. The cell supplies the notice through `CopyrightNoticeIndicator`,
 * which reads it from the text's `platformScripture.copyrightNotice` setting.
 */
const meta: Meta<typeof CopyrightNoticeIndicatorView> = {
  title: 'Bundled Extensions/platform-scripture-editor/CopyrightNoticeIndicator',
  component: CopyrightNoticeIndicatorView,
  tags: ['autodocs'],
  args: {
    notice: {
      kind: 'restrictedLicense',
      name: 'NIV11',
      fullName: 'New International Version 2011',
      copyrightYears: '1973, 1978, 1984, 2011',
    },
    localizedStrings: getLocalizedStrings([...COPYRIGHT_NOTICE_STRING_KEYS]),
  },
};
export default meta;

type Story = StoryObj<typeof CopyrightNoticeIndicatorView>;

/** A Biblica text's indicator. */
export const BiblicaText: Story = {};

/** Focused, so its tooltip shows the whole notice as one paragraph. */
export const TooltipShown: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await within(canvasElement.ownerDocument.body).findByRole('tooltip');
  },
};

/** Clicked: the details the banner's "More info" opens. */
export const DetailsOpen: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole('button', { name: /^Copyright notice for/ }),
    );
  },
};

/** A text whose copyright starts with "Notification:", as the ESV's does. */
export const NotificationText: Story = {
  args: {
    notice: {
      kind: 'notification',
      name: 'ESVUK',
      fullName: 'English Standard Version Anglicised 2016',
      bannerText:
        'The English text of the ESV Bible may not be translated into any other language or used as the basis of a derivative work.',
      details: 'Used by permission. All rights reserved.',
    },
  },
};
