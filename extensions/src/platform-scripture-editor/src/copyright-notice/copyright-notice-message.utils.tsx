import { Button } from 'platform-bible-react';
import type { CopyrightNotice } from 'platform-scripture';
import { formatReplacementStringToArray, LanguageStrings } from 'platform-bible-utils';
import { ReactNode } from 'react';

/** A notice that has something to show */
export type ShowableCopyrightNotice = Exclude<CopyrightNotice, { kind: 'none' }>;

/** Where Biblica asks people to request permission for uses outside Paratext */
export const BIBLICA_PERMISSIONS_URL = 'https://www.biblica.com/permissions/';

/**
 * Only the kinds the notice UI knows how to word. A newer backend may send others, which are then
 * shown as no notice.
 */
export function isShowableCopyrightNotice(
  notice: CopyrightNotice,
): notice is ShowableCopyrightNotice {
  return notice.kind === 'restrictedLicense' || notice.kind === 'notification';
}

/** Gives each piece of a formatted string a key so it can be rendered as a list */
function keyed(parts: ReactNode[]): ReactNode {
  return parts.map((part, index) => (
    // The pieces come from one format string and never reorder
    // eslint-disable-next-line react/no-array-index-key
    <span key={index}>{part}</span>
  ));
}

/**
 * The notice sentence, e.g. "NIV11: Biblica permits the use of the NIV11 as a translation
 * “reference text” resource only…". Each name is wrapped by `wrapName`, and the leading name by
 * `wrapLabel`, so a caller rendering it can isolate the names (a right-to-left name in a
 * left-to-right sentence, or the reverse, would otherwise reorder the punctuation around it) and
 * embolden the label.
 */
export function formatCopyrightNoticeMessage<T>(
  notice: ShowableCopyrightNotice,
  name: string,
  localizedStrings: LanguageStrings,
  wrapName: (name: string) => T,
  wrapLabel: (name: string) => T = wrapName,
): (string | T)[] {
  return notice.kind === 'restrictedLicense'
    ? formatReplacementStringToArray(
        localizedStrings['%platformScripture_copyrightNotice_restrictedLicense_banner%'],
        { label: wrapLabel(name), name: wrapName(name) },
      )
    : formatReplacementStringToArray(
        localizedStrings['%platformScripture_copyrightNotice_notification_format%'],
        { name: wrapName(name), notice: notice.bannerText },
      );
}

/** The notice sentence as React content, with the names isolated for bidirectional text */
export function renderCopyrightNoticeMessage(
  notice: ShowableCopyrightNotice,
  name: string,
  localizedStrings: LanguageStrings,
): ReactNode {
  return keyed(
    formatCopyrightNoticeMessage(
      notice,
      name,
      localizedStrings,
      (text) => <bdi>{text}</bdi>,
      (text) => (
        <strong>
          <bdi>{text}</bdi>
        </strong>
      ),
    ),
  );
}

/** The notice sentence as plain text, e.g. for an accessible name */
export function copyrightNoticeMessageText(
  notice: ShowableCopyrightNotice,
  name: string,
  localizedStrings: LanguageStrings,
): string {
  return formatCopyrightNoticeMessage(notice, name, localizedStrings, (text) => text).join('');
}

/**
 * What "More info…" shows: for a restricted Biblica text, Biblica's terms for use outside Paratext
 * with a link to its permissions page; for a "Notification:" text, the rest of its own copyright,
 * one paragraph per line, as Paratext 9 shows it.
 *
 * @param onOpenUrl Opens a web page outside the application
 */
export function renderCopyrightNoticeDetails(
  notice: ShowableCopyrightNotice,
  name: string,
  fullName: string,
  localizedStrings: LanguageStrings,
  onOpenUrl: (url: string) => void,
): ReactNode {
  if (notice.kind === 'notification')
    return notice.details
      .split('\n')
      .filter((paragraph) => paragraph.length > 0)
      .map((paragraph, index) => (
        // Paragraphs of one copyright never reorder, and two can have the same text
        // eslint-disable-next-line react/no-array-index-key
        <p key={index} dir="auto" className="tw:text-sm tw:leading-relaxed">
          {paragraph}
        </p>
      ));

  const format = notice.copyrightYears
    ? localizedStrings['%platformScripture_copyrightNotice_restrictedLicense_details%']
    : localizedStrings['%platformScripture_copyrightNotice_restrictedLicense_details_noYears%'];
  return (
    <p className="tw:text-sm tw:leading-relaxed">
      {keyed(
        formatReplacementStringToArray(format, {
          name: <bdi>{name}</bdi>,
          fullName: <bdi>{fullName || name}</bdi>,
          years: notice.copyrightYears,
          permissionsLink: (
            <Button
              variant="link"
              className="tw:h-auto tw:p-0 tw:text-sm"
              onClick={() => onOpenUrl(BIBLICA_PERMISSIONS_URL)}
            >
              {BIBLICA_PERMISSIONS_URL}
            </Button>
          ),
        }),
      )}
    </p>
  );
}
