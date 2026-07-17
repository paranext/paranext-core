import papi, { logger } from '@papi/frontend';
import { Button, Progress, useEvent } from 'platform-bible-react';
import { getErrorMessage, LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useState } from 'react';

/** Banner text plus the reused general Cancel label. */
export const SYNC_BLOCKED_BANNER_STRING_KEYS: LocalizeKey[] = [
  '%webView_platformScriptureEditor_syncEditBlocked_banner%',
  '%general_cancel%',
];

const BANNER_TEXT_KEY: LocalizeKey = '%webView_platformScriptureEditor_syncEditBlocked_banner%';
const CANCEL_KEY: LocalizeKey = '%general_cancel%';

/**
 * Payload of the Send/Receive extension's sync progress event (the same public seam the old
 * full-workspace overlay used).
 */
type SyncProgressEvent = {
  /**
   * For determinate progress, the bare current item (e.g. a project name); for indeterminate
   * progress, a complete localized message shown verbatim.
   */
  progressText: string;
  /** Progress fraction 0–1 for determinate progress; null/undefined means indeterminate. */
  progressValue?: number | null;
};

type Props = {
  /** Localized strings from the editor (must include the keys in SYNC_BLOCKED_BANNER_STRING_KEYS). */
  localizedStrings: LanguageStrings;
};

/**
 * Slim, non-covering banner shown across the top of the Scripture editor pane while an automatic
 * (scheduled) Send/Receive is syncing this project. It states that editing is paused, shows live
 * sync progress, and offers a single-shot Cancel that requests the Send/Receive extension to cancel
 * the running sync (the bottom-right progress toast has its own Cancel too).
 *
 * This mounts only while blocking (the editor renders it conditionally), so its progress
 * subscription and single-shot Cancel state reset cleanly for each blocking episode — no explicit
 * teardown/re-arm-on-clear is needed, unlike the old always-mounted overlay.
 */
export function SyncBlockedBanner({ localizedStrings }: Props) {
  const [progress, setProgress] = useState<{ text: string; value?: number } | undefined>(undefined);
  const [isCancelEnabled, setIsCancelEnabled] = useState(true);

  // Live sync progress. Typed getNetworkEvent so the handler is strongly typed. Normalize the
  // payload's null (indeterminate) to undefined at this boundary (repo style forbids null).
  useEvent<SyncProgressEvent>(
    papi.network.getNetworkEvent<SyncProgressEvent>('paratextBibleSendReceive.onSyncProgress'),
    useCallback((event: SyncProgressEvent) => {
      setProgress({ text: event.progressText, value: event.progressValue ?? undefined });
    }, []),
  );

  const handleCancel = useCallback(() => {
    // Single-shot: one cancel request per blocking episode. Disable immediately; re-enable only if
    // the request is rejected (the sync is still running, so the user can retry).
    setIsCancelEnabled(false);
    papi.commands.sendCommand('paratextBibleSendReceive.cancelSync').catch((e) => {
      logger.warn(`Sync-blocked banner failed to cancel sync: ${getErrorMessage(e)}`);
      setIsCancelEnabled(true);
    });
  }, []);

  return (
    <div className="pr-twp">
      <div
        role="status"
        className="tw:flex tw:items-center tw:gap-3 tw:border-b tw:border-border tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm"
      >
        <span className="tw:font-medium">{localizedStrings[BANNER_TEXT_KEY]}</span>
        {progress?.text && (
          <span className="tw:text-muted-foreground tw:truncate">{progress.text}</span>
        )}
        {/* platform-bible-react's Progress has no indeterminate visual, so the bar only appears for
            determinate progress; indeterminate progress is shown as text only. */}
        {progress?.value !== undefined && (
          <Progress value={progress.value * 100} className="tw:w-32 tw:shrink-0" />
        )}
        <Button
          variant="outline"
          size="sm"
          className="tw:ms-auto tw:h-7 tw:shrink-0"
          disabled={!isCancelEnabled}
          onClick={handleCancel}
        >
          {localizedStrings[CANCEL_KEY]}
        </Button>
      </div>
    </div>
  );
}

export default SyncBlockedBanner;
