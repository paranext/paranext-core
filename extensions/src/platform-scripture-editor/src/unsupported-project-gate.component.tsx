import { useLocalizedStrings } from '@papi/frontend/react';
import { Spinner } from 'platform-bible-react';
import {
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
  PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE,
  resolveLocalizedString,
  toProjectOpenBlockedReasonKey,
} from 'platform-bible-utils';
import { PropsWithChildren, useMemo } from 'react';
import { ResourceMessageView } from './resource-message-view.component';

export type UnsupportedProjectGateProps = PropsWithChildren<{
  /**
   * The project's `unsupportedReason`: a localize key saying why it cannot be opened, or `''` when
   * it can.
   */
  unsupportedReason: string;
  /** Remounts the message when the project changes, so the new subject is announced. */
  announcementKey: string | undefined;
}>;

/**
 * Shows why a project cannot be opened in place of its editor, or the editor when it can.
 *
 * The editor arrives as `children` and is only mounted on the openable branch, so an unsupported
 * project's text — and every subscription the editor makes — is never requested. That includes the
 * editor's own tab toolbar and menu, which live inside the editor component. The reason is
 * localized only on the unsupported branch, so an openable project adds no localization
 * subscription.
 */
export function UnsupportedProjectGate({
  unsupportedReason,
  announcementKey,
  children,
}: UnsupportedProjectGateProps) {
  if (!unsupportedReason) return children;
  return (
    <LocalizedUnsupportedProjectMessage
      unsupportedReason={unsupportedReason}
      announcementKey={announcementKey}
    />
  );
}

/** Localizes the reason for {@link UnsupportedProjectMessage}, never showing a raw key. */
export function LocalizedUnsupportedProjectMessage({
  unsupportedReason,
  announcementKey,
}: Omit<UnsupportedProjectGateProps, 'children'>) {
  const reasonKey = toProjectOpenBlockedReasonKey(unsupportedReason);
  const localizeKeys = useMemo(
    () => [...new Set([reasonKey, PROJECT_OPEN_BLOCKED_FALLBACK_KEY])],
    [reasonKey],
  );
  const [localizedStrings, isLoading] = useLocalizedStrings(localizeKeys);
  const message = isLoading
    ? undefined
    : resolveLocalizedString(
        localizedStrings[reasonKey],
        resolveLocalizedString(
          localizedStrings[PROJECT_OPEN_BLOCKED_FALLBACK_KEY],
          PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE,
        ),
      );
  return <UnsupportedProjectMessage message={message} announcementKey={announcementKey} />;
}

export type UnsupportedProjectMessageProps = {
  /** The localized reason, or `undefined` while it is still being localized. */
  message: string | undefined;
  /** Remounts the message when the project changes, so the new subject is announced. */
  announcementKey: string | undefined;
};

/** Why a project cannot be opened, filling the editor's place; a spinner until it is localized. */
export function UnsupportedProjectMessage({
  message,
  announcementKey,
}: UnsupportedProjectMessageProps) {
  if (message === undefined)
    return (
      <div className="tw:flex tw:items-center tw:justify-center tw:h-full">
        <Spinner />
      </div>
    );
  return (
    <div className="tw:h-full">
      <ResourceMessageView
        message={message}
        testId="unsupported-project-message"
        announcementKey={announcementKey}
      />
    </div>
  );
}
