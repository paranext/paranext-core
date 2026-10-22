import type { CopyrightNotice } from 'platform-scripture';
import { formatReplacementStringToArray, LanguageStrings } from 'platform-bible-utils';
import { ReactNode } from 'react';

/** A notice that has something to show */
export type ShowableCopyrightNotice = Exclude<CopyrightNotice, { kind: 'none' }>;

/**
 * Only the kinds the notice UI knows how to word. A newer backend may send others, and a setting
 * that has not been read may be `undefined`; both are shown as no notice.
 */
export function isShowableCopyrightNotice(
  notice: CopyrightNotice | undefined,
): notice is ShowableCopyrightNotice {
  return notice?.kind === 'restrictedLicense' || notice?.kind === 'notification';
}

/** The paragraphs of a "Notification:" text's copyright after its notice, one per non-blank line */
export function getCopyrightDetailsParagraphs(details: string): string[] {
  return details.split('\n').filter((paragraph) => paragraph.trim().length > 0);
}

/**
 * Whether the notice has details for "More info" to open: Biblica's terms always do, but a
 * "Notification:" text whose copyright is only its notice has nothing more to show
 */
export function hasCopyrightDetails(notice: ShowableCopyrightNotice): boolean {
  return (
    notice.kind === 'restrictedLicense' || getCopyrightDetailsParagraphs(notice.details).length > 0
  );
}

/** Gives each piece of a formatted string a key so it can be rendered as a list */
export function keyed(parts: ReactNode[]): ReactNode {
  return parts.map((part, index) => (
    // The pieces come from one format string and never reorder
    // eslint-disable-next-line react/no-array-index-key
    <span key={index}>{part}</span>
  ));
}

/** The localized format string that words the notice sentence for this kind of notice */
export function getCopyrightNoticeMessageFormat(
  notice: ShowableCopyrightNotice,
  localizedStrings: LanguageStrings,
): string {
  return localizedStrings[
    notice.kind === 'restrictedLicense'
      ? '%platformScripture_copyrightNotice_restrictedLicense_banner%'
      : '%platformScripture_copyrightNotice_notification_format%'
  ];
}

/** The notice sentence, e.g. "NIV11: … the NIV11 …", led by the name in bold */
function formatCopyrightNoticeMessage(
  notice: ShowableCopyrightNotice,
  localizedStrings: LanguageStrings,
): ReactNode[] {
  // Each name is isolated: a right-to-left name in a left-to-right sentence, or the reverse, would
  // otherwise reorder the punctuation around it
  const name = <bdi>{notice.name}</bdi>;
  return formatReplacementStringToArray(
    getCopyrightNoticeMessageFormat(notice, localizedStrings),
    notice.kind === 'restrictedLicense'
      ? { label: <strong>{name}</strong>, name }
      : { name, notice: notice.bannerText },
  );
}

/** The notice sentence as React content */
export function renderCopyrightNoticeMessage(
  notice: ShowableCopyrightNotice,
  localizedStrings: LanguageStrings,
): ReactNode {
  return keyed(formatCopyrightNoticeMessage(notice, localizedStrings));
}
