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
import { useCallback, useState } from 'react';

const TOOLTIP_DELAY = 300;

/**
 * Message shown when Cancel is clicked but send/receive can't answer. Declared here rather than
 * inline so the key is spelled exactly once — `PlatformNotification.message` accepts any string, so
 * a typo would not fail the build; it would ship a raw `%key%` into a toast.
 *
 * Moved here from the toolbar along with the send/receive UI it belongs to. Its trigger changed
 * with that move: opening the status no longer sends a command (the popover is local), so the
 * remaining click that can go unserved is Cancel — for which this string's "try again in a moment"
 * is exactly right, since a rejected cancel means the sync is still running.
 */
export const SYNC_UNAVAILABLE_MESSAGE_KEY: LocalizeKey = '%toolbar_sync_unavailable%';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%general_cancel%',
  '%toolbar_sync%',
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
 * Deferred (PT-4336 NN-4): the four richer states in the design — "Sync conflict", "Connection
 * problem", "Unsaved changes", "Unsynced changes" — are not implemented. None is derivable from
 * what Send/Receive currently emits; each needs a new event from that extension, so showing them
 * now would mean guessing at state, which is precisely the untruthfulness this control exists to
 * fix.
 */
export function SyncStatusButton() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { status, syncingProjectNames } = useSyncStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelEnabled, setIsCancelEnabled] = useState(true);

  const handleCancel = useCallback(async () => {
    // Single-shot: one cancel request per click-through. Disabled immediately so a second click
    // can't queue another request, and re-enabled only if this one is rejected — the sync is still
    // running then, so the user must be able to retry.
    setIsCancelEnabled(false);
    try {
      await sendCommand('paratextBibleSendReceive.cancelSync');
    } catch (e) {
      logger.warn(`Toolbar could not cancel the running sync: ${getErrorMessage(e)}`);
      setIsCancelEnabled(true);
      try {
        await notificationService.send({
          message: SYNC_UNAVAILABLE_MESSAGE_KEY,
          severity: 'warning',
        });
      } catch (notificationError) {
        logger.warn(
          `Toolbar could not notify the user that cancelling sync failed: ${getErrorMessage(notificationError)}`,
        );
      }
    }
  }, []);

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
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <TooltipProvider delayDuration={TOOLTIP_DELAY}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                data-testid="toolbar-sync-button"
                variant="ghost"
                size="sm"
                className="pr-twp tw:h-8 tw:shrink-0"
              >
                {status === 'syncing' && <Spinner className="tw:h-4 tw:w-4" />}
                {status === 'synced' && (
                  <CircleCheck className="tw:h-4 tw:w-4 tw:text-success-foreground" />
                )}
                {buttonLabel}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p className="tw:font-light">{localizedStrings['%toolbar_sync_open_status%']}</p>
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
            <Button
              data-testid="toolbar-sync-cancel-button"
              variant="outline"
              size="sm"
              className="tw:h-7 tw:self-start"
              disabled={!isCancelEnabled}
              onClick={handleCancel}
            >
              {localizedStrings['%general_cancel%']}
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
  );
}

export default SyncStatusButton;
