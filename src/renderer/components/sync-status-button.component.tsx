import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useSyncStatus } from '@renderer/hooks/use-sync-status.hook';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import { CircleCheck } from 'lucide-react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Spinner,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { formatReplacementString, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useState } from 'react';

const TOOLTIP_DELAY = 300;

/**
 * Message shown when Cancel is clicked but send/receive can't answer. Declared here rather than
 * inline so the key is spelled exactly once — `PlatformNotification.message` accepts any string, so
 * a typo would not fail the build; it would ship a raw `%key%` into a toast.
 *
 * Specific to a rejected cancel rather than a general "sync is unavailable": a cancel that comes
 * back rejected means the sync is still RUNNING, so a message saying sync isn't available would
 * contradict the spinner still turning next to it.
 */
export const SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY: LocalizeKey = '%toolbar_sync_cancel_unavailable%';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%toolbar_sync%',
  '%toolbar_sync_cancel%',
  '%toolbar_sync_cancelling%',
  '%toolbar_sync_open_status%',
  '%toolbar_sync_popover_idle%',
  '%toolbar_sync_popover_synced%',
  '%toolbar_sync_status_synced%',
  '%toolbar_sync_status_syncing%',
  '%toolbar_sync_status_syncing_project%',
  '%toolbar_sync_status_syncing_projects%',
];

/**
 * Ambient Send/Receive status for the toolbar: a button reporting whether a sync is running, and a
 * popover naming what is syncing with a one-click Cancel.
 *
 * Replaces an earlier button that opened the sync status web view. A popover keeps the status and
 * its only action in place, which is what makes a single truthful indicator possible — the previous
 * button could put a second, separately-updating sync surface on screen alongside this one.
 *
 * Deferred: the four richer states in the design — "Sync conflict", "Connection problem", "Unsaved
 * changes", "Unsynced changes" — are not implemented. None is derivable from what Send/Receive
 * currently emits; each needs a new event from that extension, so showing them now would mean
 * guessing at state, which is precisely the untruthfulness this control exists to fix. See ADR-0014
 * in `.context/standards/Architecture-Decisions.md`.
 */
export function SyncStatusButton() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { status, syncingProjectNames } = useSyncStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelEnabled, setIsCancelEnabled] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = useCallback(async () => {
    // Single-shot: one cancel request per click-through. Disabled immediately so a second click
    // can't queue another request, and re-enabled only if this one is rejected — the sync is still
    // running then, so the user must be able to retry.
    setIsCancelEnabled(false);
    // A cancel takes effect whenever send/receive reaches a stopping point, so the sync keeps
    // reporting `syncing` for a while yet. Saying "Cancelling…" is what distinguishes a request that
    // was accepted from a button that has merely gone dim.
    setIsCancelling(true);
    try {
      await sendCommand('paratextBibleSendReceive.cancelSync');
    } catch (e) {
      logger.warn(`Toolbar could not cancel the running sync: ${getErrorMessage(e)}`);
      setIsCancelEnabled(true);
      setIsCancelling(false);
      try {
        await notificationService.send({
          message: SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY,
          severity: 'warning',
        });
      } catch (notificationError) {
        logger.warn(
          `Toolbar could not notify the user that cancelling sync failed: ${getErrorMessage(notificationError)}`,
        );
      }
    }
  }, []);

  // Whenever no sync is running, the pending cancel is settled — by completing, by being cancelled,
  // or by a different sync taking over. Re-arming here (rather than only on reopen) means a sync
  // starting while the popover is still open gets a live Cancel instead of a dead one.
  useEffect(() => {
    if (status !== 'syncing') {
      setIsCancelling(false);
      setIsCancelEnabled(true);
    }
  }, [status]);

  // Re-arm Cancel each time the popover is reopened, so a rejected-then-abandoned attempt doesn't
  // leave the button dead for the rest of the session.
  const handleOpenChange = useCallback((nextIsOpen: boolean) => {
    setIsOpen(nextIsOpen);
    if (nextIsOpen) setIsCancelEnabled(true);
  }, []);

  const buttonLabel = (() => {
    if (status === 'synced') return localizedStrings['%toolbar_sync_status_synced%'];
    if (status !== 'syncing') return localizedStrings['%toolbar_sync%'];
    // Names are unknown for a Send/Receive build predating `syncingProjectIds`, or when the state
    // read failed. The bare "Syncing" is the honest label then — never a guessed project.
    if (syncingProjectNames.length === 0) return localizedStrings['%toolbar_sync_status_syncing%'];
    if (syncingProjectNames.length === 1)
      return formatReplacementString(localizedStrings['%toolbar_sync_status_syncing_project%'], {
        projectName: syncingProjectNames[0],
      });
    return formatReplacementString(localizedStrings['%toolbar_sync_status_syncing_projects%'], {
      count: syncingProjectNames.length,
    });
  })();

  return (
    <>
      {/*
       * The status changes on its own as syncs start and finish, so without a live region a screen
       * reader user would only learn a sync is running by happening to focus the button. Kept
       * mounted at all times (empty while idle) because a region added along with its text is not
       * reliably announced.
       */}
      <span role="status" aria-live="polite" className="tw:sr-only">
        {status === 'idle' ? '' : buttonLabel}
      </span>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <TooltipProvider delayDuration={TOOLTIP_DELAY}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                {/*
                 * Shrinks and truncates rather than growing or vanishing: the label embeds a
                 * project name of any length, and a toolbar item that pushes its neighbours off the
                 * bar is the failure this must not have. `shrink` overrides the button variants'
                 * default `shrink-0`, `min-w-0` lets the inner label truncate instead of setting a
                 * floor, the icons keep their size, and the tooltip carries the full text.
                 */}
                <Button
                  data-testid="toolbar-sync-button"
                  variant="ghost"
                  size="sm"
                  className="pr-twp tw:h-8 tw:max-w-[180px] tw:min-w-0 tw:shrink"
                >
                  {status === 'syncing' && (
                    <Spinner className="tw:h-4 tw:w-4 tw:shrink-0" aria-hidden />
                  )}
                  {status === 'synced' && (
                    <CircleCheck
                      className="tw:h-4 tw:w-4 tw:shrink-0 tw:text-success-foreground"
                      aria-hidden
                    />
                  )}
                  <span className="tw:truncate">{buttonLabel}</span>
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              {/* The full label, so a truncated project name stays recoverable. */}
              <p className="tw:font-light">{buttonLabel}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent align="end" className="tw:w-72">
          <PopoverHeader className="tw:gap-0 tw:px-2">
            <PopoverTitle className="tw:text-xs tw:font-bold">
              {localizedStrings['%toolbar_sync_open_status%']}
            </PopoverTitle>
          </PopoverHeader>
          {status === 'syncing' ? (
            <div className="tw:flex tw:flex-col tw:gap-2 tw:px-2 tw:pb-1">
              {syncingProjectNames.length > 0 ? (
                <ul data-testid="toolbar-sync-popover-projects" className="tw:text-sm">
                  {syncingProjectNames.map((projectName) => (
                    <li key={projectName} className="tw:truncate">
                      {projectName}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="tw:text-sm">{localizedStrings['%toolbar_sync_status_syncing%']}</p>
              )}
              {/*
               * "Cancel sync", not "Cancel": inside a dismissible popover a bare "Cancel" reads as
               * closing the popover rather than stopping the sync. Once requested it says
               * "Cancelling…", so an accepted request is distinguishable from a button gone dim.
               */}
              <Button
                data-testid="toolbar-sync-cancel-button"
                variant="outline"
                size="sm"
                className="tw:h-7 tw:self-start"
                disabled={!isCancelEnabled}
                onClick={handleCancel}
              >
                {isCancelling
                  ? localizedStrings['%toolbar_sync_cancelling%']
                  : localizedStrings['%toolbar_sync_cancel%']}
              </Button>
            </div>
          ) : (
            <p data-testid="toolbar-sync-popover-status" className="tw:px-2 tw:pb-1 tw:text-sm">
              {status === 'synced'
                ? localizedStrings['%toolbar_sync_popover_synced%']
                : localizedStrings['%toolbar_sync_popover_idle%']}
            </p>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SyncStatusButton;
