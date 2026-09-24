import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn, userEvent, within } from 'storybook/test';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { CopyrightNoticeBanner } from './copyright-notice-banner.component';
import { COPYRIGHT_NOTICE_STRING_KEYS } from './copyright-notice.const';

/**
 * The strip across the top of a text pane that tells the reader about a text's license. Biblica's
 * traditionally licensed texts get Biblica's reference-only notice, and "More info…" opens
 * Biblica's terms for use outside Paratext. A text whose copyright starts with "Notification:" (the
 * ESV) gets its own wording, as in Paratext 9.
 *
 * The message is clamped to two lines in a narrow pane; **Show more** appears only when it does not
 * fit. The X dismisses it until the pane shows another text.
 */
const meta: Meta<typeof CopyrightNoticeBanner> = {
  title: 'Bundled Extensions/platform-scripture-editor/CopyrightNoticeBanner',
  component: CopyrightNoticeBanner,
  tags: ['autodocs'],
  args: {
    notice: {
      kind: 'restrictedLicense',
      name: 'NIV11',
      fullName: 'New International Version 2011',
      copyrightYears: '1973, 1978, 1984, 2011',
    },
    localizedStrings: getLocalizedStrings([...COPYRIGHT_NOTICE_STRING_KEYS]),
    onDismiss: fn(),
  },
  // A pane about as wide as a Simple-mode resource column, unless a story sets `paneWidth`
  parameters: { paneWidth: 300 },
  decorators: [
    (Story, { parameters }) => (
      <div className="tw:border tw:border-border" style={{ width: parameters.paneWidth }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CopyrightNoticeBanner>;

/** A Biblica text in a narrow pane: clamped to two lines, with Show more. */
export const BiblicaText: Story = {};

/** The same notice in a wide pane, where it fits without Show more. */
export const BiblicaTextWidePane: Story = {
  parameters: { paneWidth: 1200 },
};

/** "More info…" open: Biblica's terms, with the years from the text's copyright statement. */
export const BiblicaTermsOpen: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: /^More info/ }));
  },
};

/** "More info…" open for a text whose copyright names no years: the terms leave them out. */
export const BiblicaTermsOpenWithoutYears: Story = {
  args: {
    notice: {
      kind: 'restrictedLicense',
      name: 'NIV11',
      fullName: 'New International Version 2011',
      copyrightYears: '',
    },
  },
  play: BiblicaTermsOpen.play,
};

/**
 * A text whose copyright starts with "Notification:", as the ESV's does: its own banner wording,
 * and the rest of its copyright under "More info…".
 */
export const NotificationText: Story = {
  args: {
    notice: {
      kind: 'notification',
      name: 'ESVUK',
      fullName: 'English Standard Version Anglicised 2016',
      bannerText:
        'The English text of the ESV Bible may not be translated into any other language or used as the basis of a derivative work or the sole base English text from which any translation of the Bible is made.',
      details: [
        'The Holy Bible, English Standard Version® (ESV®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers.',
        'Used by permission. All rights reserved.',
      ].join('\n'),
    },
  },
};

/** A right-to-left name: it stays in place, bold, ahead of its colon. */
export const RightToLeftName: Story = {
  args: {
    notice: {
      kind: 'restrictedLicense',
      name: 'كتاب الحياة',
      fullName: 'كتاب الحياة',
      copyrightYears: '1988, 1997, 2012',
    },
  },
};
