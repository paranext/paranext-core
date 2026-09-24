import type { CopyrightNotice } from 'platform-scripture';
import { formatReplacementStringToArray, LanguageStrings } from 'platform-bible-utils';
import { ReactNode } from 'react';

/** A notice that has something to show */
export type ShowableCopyrightNotice = Exclude<CopyrightNotice, { kind: 'none' }>;

/** Where Biblica asks people to request permission for uses outside Paratext */
export const BIBLICA_PERMISSIONS_URL = 'https://www.biblica.com/permissions/';

/**
 * Only the kinds the notice UI knows how to word. A newer backend may send others, and a setting
 * that has not been read may be `undefined`; both are shown as no notice.
 */
export function isShowableCopyrightNotice(
  notice: CopyrightNotice | undefined,
): notice is ShowableCopyrightNotice {
  return notice?.kind === 'restrictedLicense' || notice?.kind === 'notification';
}

/** Gives each piece of a formatted string a key so it can be rendered as a list */
export function keyed(parts: ReactNode[]): ReactNode {
  return parts.map((part, index) => (
    // The pieces come from one format string and never reorder
    // eslint-disable-next-line react/no-array-index-key
    <span key={index}>{part}</span>
  ));
}

/** The notice sentence, e.g. "NIV11: … the NIV11 …", led by the name in bold */
function formatCopyrightNoticeMessage(
  notice: ShowableCopyrightNotice,
  localizedStrings: LanguageStrings,
): ReactNode[] {
  // Each name is isolated: a right-to-left name in a left-to-right sentence, or the reverse, would
  // otherwise reorder the punctuation around it
  const name = <bdi>{notice.name}</bdi>;
  return notice.kind === 'restrictedLicense'
    ? formatReplacementStringToArray(
        localizedStrings['%platformScripture_copyrightNotice_restrictedLicense_banner%'],
        { label: <strong>{name}</strong>, name },
      )
    : formatReplacementStringToArray(
        localizedStrings['%platformScripture_copyrightNotice_notification_format%'],
        { name, notice: notice.bannerText },
      );
}

/** The notice sentence as React content */
export function renderCopyrightNoticeMessage(
  notice: ShowableCopyrightNotice,
  localizedStrings: LanguageStrings,
): ReactNode {
  return keyed(formatCopyrightNoticeMessage(notice, localizedStrings));
}
