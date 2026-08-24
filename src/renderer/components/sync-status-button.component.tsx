import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { SyncStatus, useSyncStatus } from '@renderer/hooks/use-sync-status.hook';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import { CircleAlert, CircleCheck } from 'lucide-react';
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
  useTruncationTooltip,
} from 'platform-bible-react';
import { formatReplacementString, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';

const TOOLTIP_DELAY = 300;

/** Unicode FIRST STRONG ISOLATE — opens a run whose direction is inferred from its own content. */
const FIRST_STRONG_ISOLATE = '\u2068';
/** Unicode POP DIRECTIONAL ISOLATE — closes the run opened by {@link FIRST_STRONG_ISOLATE}. */
const POP_DIRECTIONAL_ISOLATE = '\u2069';

/**
 * Wraps a project name in Unicode bidi isolates before it is interpolated into a sentence.
 *
 * A project name can be in any script. Dropped unisolated into a directional sentence, an RTL name
 * reorders the surrounding text around it, and combined with CSS truncation the visible fragment
 * can be a different substring than the one the user would read. These are the character-level
 * equivalent of HTML's `<bdi>`, which is what this needs and cannot use — the result is a plain
 * string for a button label, not markup.
 */
function isolateBidi(projectName: string): string {
  return `${FIRST_STRONG_ISOLATE}${projectName}${POP_DIRECTIONAL_ISOLATE}`;
}

/**
 * Message shown when Cancel is clicked but send/receive can't answer. Declared here rather than
 * inline so the key is spelled exactly once — `PlatformNotification.message` accepts any string, so
 * a typo would not fail the build; it would ship a raw `%key%` into a toast.
 */
export const SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY: LocalizeKey = '%toolbar_sync_cancel_unavailable%';

/**
 * Message shown when "View sync details" can't open the sync-status web view. Same reasoning as
 * {@link SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY} for declaring the key once.
 */
export const SYNC_UNAVAILABLE_MESSAGE_KEY: LocalizeKey = '%toolbar_sync_unavailable%';

/**
 * Ids that make each of this component's two warnings replace its own previous copy instead of
 * stacking another. Both fire on the cold-start path they exist for, where a user who clicks again
 * because nothing visibly happened would otherwise collect identical toasts. One id per message
 * rather than one shared id, so the two never overwrite each other's distinct text.
 */
const SYNC_CANCEL_UNAVAILABLE_NOTIFICATION_ID = 'toolbar-sync-cancel-unavailable';
const SYNC_UNAVAILABLE_NOTIFICATION_ID = 'toolbar-sync-unavailable';

/**
 * Every key this component renders. Exported so the localization-parity test asserts against the
 * list the component actually reads, rather than a hand-copied duplicate that silently stops
 * matching the moment a key is added here.
 */
export const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%toolbar_sync%',
  '%toolbar_sync_cancel%',
  '%toolbar_sync_cancelling%',
  '%toolbar_sync_open_status%',
  '%toolbar_sync_popover_failed%',
  '%toolbar_sync_popover_idle%',
  '%toolbar_sync_popover_synced%',
  '%toolbar_sync_popover_unknown%',
  '%toolbar_sync_status_failed%',
  '%toolbar_sync_status_synced%',
  '%toolbar_sync_status_syncing%',
  '%toolbar_sync_status_syncing_project%',
  '%toolbar_sync_status_syncing_projects%',
  '%toolbar_sync_status_unknown%',
  '%toolbar_sync_view_details%',
];

/**
 * Ambient Send/Receive status for the toolbar: a button reporting whether a sync is running, a
 * popover naming what is syncing with a one-click Cancel, and a way through to the full sync-status
 * web view for the detail this compact surface cannot carry (per-project conflicts, failure
 * messages, warnings).
 *
 * Deferred: three of the richer states in the design — "Connection problem", "Unsaved changes",
 * "Unsynced changes" — are not implemented, because none is derivable from what Send/Receive
 * currently emits; each needs a new event from that extension, so showing them now would mean
 * guessing at state, which is precisely the untruthfulness this control exists to fix. Sync FAILURE
 * is derivable (from the last sync's per-project results) and is reported. See ADR-0022 in
 * `.context/standards/Architecture-Decisions.md`.
 */
export function SyncStatusButton() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { status, syncingProjects } = useSyncStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelEnabled, setIsCancelEnabled] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const {
    ref: labelRef,
    open: isTooltipOpen,
    onPointerEnter: handleLabelPointerEnter,
    onPointerLeave: handleLabelPointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();

  /**
   * Mirrors `status` for {@link handleCancel}, which must not re-create itself when the status
   * changes — a new handler identity mid-click is exactly what the single-shot guard is
   * protecting.
   */
  const statusRef = useRef(status);
  statusRef.current = status;

  /** Mirrors the syncing project ids so {@link handleCancel} can latch them without taking a dep. */
  const syncingProjectIdsRef = useRef<readonly string[]>([]);
  syncingProjectIdsRef.current = syncingProjects.map((project) => project.projectId);

  /**
   * The syncing project ids a still-pending cancel was aimed at, or `undefined` when no cancel is
   * pending. This is what tells "a sync this cancel was never aimed at is now running" apart from
   * "the sync being cancelled re-reported itself", which the id set alone cannot distinguish.
   */
  const cancelledForIdsRef = useRef<readonly string[] | undefined>(undefined);

  const handleCancel = useCallback(async () => {
    // The editor's sync-blocked banner (`extensions/src/platform-scripture-editor/`) offers the same
    // cancel and can be on screen at the same time as this popover; neither observes the other's
    // click. See ADR-0022 in `.context/standards/Architecture-Decisions.md`.
    // Single-shot: one cancel request per click-through. Disabled immediately so a second click
    // can't queue another request, and re-enabled only if this one is rejected while a sync is
    // still running, so the user can retry.
    setIsCancelEnabled(false);
    // A cancel takes effect whenever send/receive reaches a stopping point, so the sync keeps
    // reporting `syncing` for a while yet. Saying "Cancelling…" is what distinguishes a request that
    // was accepted from a button that has merely gone dim.
    setIsCancelling(true);
    // Latch what this cancel is aimed at, so the re-arm effect below can tell a genuinely new sync
    // from this same one re-reporting itself.
    cancelledForIdsRef.current = syncingProjectIdsRef.current;
    try {
      // No `notificationId` argument: the contract's optional parameter exists so a caller that
      // RAISED a sync notification can prove the cancel targets that same sync, and this button
      // raises none — it reports whatever sync is running, whoever started it. Omitting it therefore
      // means "cancel the sync in progress", which is the only thing this control can truthfully
      // ask for. If an implementation ever REQUIRES the id to act, this cancel would silently do
      // nothing while the button said "Cancelling…", so the contract commits to treating an absent
      // id as an unconditional cancel.
      await sendCommand('paratextBibleSendReceive.cancelSync');
    } catch (e) {
      logger.warn(`Toolbar could not cancel the running sync: ${getErrorMessage(e)}`);
      setIsCancelEnabled(true);
      setIsCancelling(false);
      cancelledForIdsRef.current = undefined;
      // A rejected cancel does NOT prove the sync is still running — the declaration guarantees
      // nothing about why it rejected, and a sync that ended between render and click rejects too.
      // Telling the user the cancel failed while the popover beside it says the sync has finished
      // would be the more confusing message, so the toast is reserved for a sync still in progress.
      if (statusRef.current !== 'syncing') return;
      try {
        await notificationService.send({
          message: SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY,
          severity: 'warning',
          notificationId: SYNC_CANCEL_UNAVAILABLE_NOTIFICATION_ID,
        });
      } catch (notificationError) {
        logger.warn(
          `Toolbar could not notify the user that cancelling sync failed: ${getErrorMessage(notificationError)}`,
        );
      }
    }
  }, []);

  const handleViewDetails = useCallback(async () => {
    setIsOpen(false);
    // This click leaves the renderer, so unlike the rest of the popover it can fail — and it is the
    // only route to the detail behind a reported failure. Failing silently would close the popover
    // and show nothing at all, so both documented failures are surfaced: a rejection, and the
    // `undefined` the command returns when it did not create the web view.
    let didOpen = false;
    try {
      didOpen = (await sendCommand('paratextBibleSendReceive.openSyncStatus')) !== undefined;
    } catch (e) {
      logger.warn(`Toolbar could not open the sync status view: ${getErrorMessage(e)}`);
    }
    if (didOpen) return;
    try {
      await notificationService.send({
        message: SYNC_UNAVAILABLE_MESSAGE_KEY,
        severity: 'warning',
        notificationId: SYNC_UNAVAILABLE_NOTIFICATION_ID,
      });
    } catch (notificationError) {
      logger.warn(
        `Toolbar could not notify the user that the sync status view failed to open: ${getErrorMessage(notificationError)}`,
      );
    }
  }, []);

  // Whenever no sync is running, the pending cancel is settled — by completing, by being cancelled,
  // or by a different sync taking over. Re-arming here (rather than only on reopen) means a sync
  // starting while the popover is still open gets a live Cancel instead of a dead one.
  useEffect(() => {
    if (status !== 'syncing') {
      setIsCancelling(false);
      setIsCancelEnabled(true);
      cancelledForIdsRef.current = undefined;
    }
  }, [status]);

  /**
   * Re-arm Cancel for a sync that took over from the one the last cancel was aimed at.
   *
   * The effect above can't cover this: overlapping syncs union, and `isSyncing: true` fires again
   * when the set changes, so a new sync can begin without the status ever leaving `syncing`.
   *
   * The set merely CHANGING is not that signal, though. `useSyncStatus` blanks the ids before every
   * follow-up read, so one `onSyncStateChanged` walks the set through `["a"] -> [] -> ["a"]`, and a
   * project releasing from a still-running sync shrinks it — neither is a new sync, and both would
   * wrongly revive a cancel that is still in flight. What does mean a different sync is running is
   * an id that was NOT in the set this cancel was aimed at: a union with an overlapping sync adds
   * one, while a shrink, a re-report, and the transient blank never do.
   */
  const syncingProjectIdsKey = JSON.stringify(syncingProjects.map((project) => project.projectId));
  useEffect(() => {
    if (status !== 'syncing') return;
    const currentIds = syncingProjectIdsRef.current;
    // The blank between a clear and its follow-up read names nothing, so it cannot show a new sync.
    if (currentIds.length === 0) return;
    const cancelledForIds = cancelledForIdsRef.current;
    // No cancel pending: nothing to re-arm, and nothing to compare against.
    if (!cancelledForIds) return;
    // A latch that names nothing cannot prove a different sync is running, for the same reason the
    // blank set above cannot: a cancel clicked during that blank window latches `[]`, and every id
    // in the next read would then look new. Staying pending until the status leaves `syncing` (the
    // effect above) is the safe half of the trade — it can delay re-arming for a genuinely new
    // overlapping sync, but it never shows a live "Cancel sync" while a cancel is in flight.
    if (cancelledForIds.length === 0) return;
    if (!currentIds.some((id) => !cancelledForIds.includes(id))) return;
    setIsCancelling(false);
    setIsCancelEnabled(true);
    cancelledForIdsRef.current = undefined;
    // Deliberately keyed on the id set rather than on `syncingProjects`, whose identity changes on
    // every metadata read even when the same projects are syncing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncingProjectIdsKey, status]);

  // Re-arm Cancel each time the popover is reopened, so a rejected-then-abandoned attempt doesn't
  // leave the button dead for the rest of the session. Not while a cancel is still pending, though:
  // that would produce an enabled button reading "Cancelling…" which fires a second request.
  const handleOpenChange = useCallback(
    (nextIsOpen: boolean) => {
      setIsOpen(nextIsOpen);
      if (nextIsOpen && !isCancelling) setIsCancelEnabled(true);
    },
    [isCancelling],
  );

  /** Whether the localized strings have loaded. Before they do, every value is its own `%key%`. */
  const areStringsLoaded = localizedStrings['%toolbar_sync%'] !== '%toolbar_sync%';

  const buttonLabel = (() => {
    if (status === 'synced') return localizedStrings['%toolbar_sync_status_synced%'];
    if (status === 'failed') return localizedStrings['%toolbar_sync_status_failed%'];
    if (status !== 'syncing') return localizedStrings['%toolbar_sync%'];
    // Names are unknown for a Send/Receive build predating `syncingProjectIds`, or when the state
    // read failed. The bare "Syncing" is the honest label then — never a guessed project.
    if (syncingProjects.length === 0) return localizedStrings['%toolbar_sync_status_syncing%'];
    if (syncingProjects.length === 1)
      return formatReplacementString(localizedStrings['%toolbar_sync_status_syncing_project%'], {
        projectName: isolateBidi(syncingProjects[0].name),
      });
    return formatReplacementString(localizedStrings['%toolbar_sync_status_syncing_projects%'], {
      count: syncingProjects.length,
    });
  })();

  /**
   * What the live region says. Deliberately NOT `buttonLabel`: announcing the label would have a
   * screen reader read "Syncing HNF" and then "Syncing HNF, button" for a single change, and the
   * label churns as project names resolve, turning one sync into three announcements. Empty until
   * the strings load, so the region can never speak a raw `%key%` aloud.
   *
   * Held in state rather than derived during render because one case depends on where the status
   * came FROM: `unknown` is worth announcing when a sync a listener was already told about ends
   * unreadably — leaving them waiting for an outcome that never comes — but not when it is simply
   * how the control starts up, which no one was waiting on.
   */
  const [announcement, setAnnouncement] = useState('');
  /**
   * What the region was last computed for. The effect below re-runs on every render, because
   * `localizedStrings` is a fresh object each time — without this it would immediately recompute
   * `unknown` with itself as the previous status and blank the announcement it had just made.
   */
  const lastAnnouncedForRef = useRef<{ status: SyncStatus; areStringsLoaded: boolean } | undefined>(
    undefined,
  );
  useEffect(() => {
    const lastAnnouncedFor = lastAnnouncedForRef.current;
    if (
      lastAnnouncedFor &&
      lastAnnouncedFor.status === status &&
      lastAnnouncedFor.areStringsLoaded === areStringsLoaded
    )
      return;
    const previousStatus = lastAnnouncedFor?.status;
    lastAnnouncedForRef.current = { status, areStringsLoaded };
    if (!areStringsLoaded) return;
    if (status === 'syncing') {
      setAnnouncement(localizedStrings['%toolbar_sync_status_syncing%']);
      return;
    }
    if (status === 'synced') {
      setAnnouncement(localizedStrings['%toolbar_sync_status_synced%']);
      return;
    }
    if (status === 'failed') {
      setAnnouncement(localizedStrings['%toolbar_sync_status_failed%']);
      return;
    }
    if (status === 'unknown' && previousStatus === 'syncing') {
      setAnnouncement(localizedStrings['%toolbar_sync_status_unknown%']);
      return;
    }
    // `idle`, and an `unknown` nobody was waiting on, are not worth interrupting a screen reader for.
    setAnnouncement('');
  }, [status, areStringsLoaded, localizedStrings]);

  const popoverStatusMessage = (() => {
    if (status === 'synced') return localizedStrings['%toolbar_sync_popover_synced%'];
    if (status === 'failed') return localizedStrings['%toolbar_sync_popover_failed%'];
    // `unknown` means the read didn't answer, so "no sync is running" would be a positive claim with
    // nothing behind it.
    if (status === 'unknown') return localizedStrings['%toolbar_sync_popover_unknown%'];
    return localizedStrings['%toolbar_sync_popover_idle%'];
  })();

  return (
    <>
      {/*
       * The status changes on its own as syncs start and finish, so without a live region a screen
       * reader user would only learn a sync is running by happening to focus the button. Kept
       * mounted at all times (empty while idle) because a region added along with its text is not
       * reliably announced. `role="status"` already implies `aria-live="polite"`.
       *
       * Announces the STATUS, not the button's own label: announcing the label would have a screen
       * reader read "Syncing HNF" and then "Syncing HNF, button" for one change, and the label
       * churns as project names resolve, which would turn one sync into three announcements. Silent
       * until the strings load, so it can never speak a raw `%key%` aloud.
       */}
      <span role="status" className="tw:sr-only">
        {announcement}
      </span>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <TooltipProvider delayDuration={TOOLTIP_DELAY}>
          {/*
           * Controlled, and open only while the label is actually clipped: an unconditional tooltip
           * would repeat the button's own accessible name back to it (Radix wires
           * `aria-describedby`), giving a name and description that are word-for-word identical.
           */}
          <Tooltip open={isTooltipOpen}>
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
                  onPointerEnter={handleLabelPointerEnter}
                  onPointerLeave={handleLabelPointerLeave}
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
                  {status === 'failed' && (
                    <CircleAlert
                      className="tw:h-4 tw:w-4 tw:shrink-0 tw:text-destructive"
                      aria-hidden
                    />
                  )}
                  <span ref={labelRef} className="tw:truncate">
                    {buttonLabel}
                  </span>
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              {/* The full label, so a truncated project name stays recoverable. */}
              <p className="tw:font-light">{buttonLabel}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent align="end">
          <PopoverHeader className="tw:gap-0 tw:px-2">
            <PopoverTitle className="tw:text-xs tw:font-bold">
              {localizedStrings['%toolbar_sync_open_status%']}
            </PopoverTitle>
          </PopoverHeader>
          <div className="tw:flex tw:flex-col tw:gap-2 tw:px-2 tw:pb-1">
            {status === 'syncing' ? (
              <>
                {syncingProjects.length > 0 ? (
                  // Tailwind's reset strips list semantics in Safari; role="list" re-establishes
                  // them for VoiceOver, as `first-run/steps/sync-progress.component.tsx` documents.
                  // eslint-disable-next-line jsx-a11y/no-redundant-roles
                  <ul
                    role="list"
                    data-testid="toolbar-sync-popover-projects"
                    className="tw:text-sm"
                  >
                    {syncingProjects.map((project) => (
                      // Keyed on the id, not the name: two projects can share a name, and a name
                      // falls back to the id only when its metadata couldn't be read.
                      // `data-project-id` because two projects can share a display name, which
                      // makes the rendered rows indistinguishable from each other otherwise.
                      <li
                        key={project.projectId}
                        data-project-id={project.projectId}
                        className="tw:truncate"
                      >
                        {project.name}
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
                 *
                 * `aria-disabled` rather than `disabled`: a real `disabled` takes effect
                 * synchronously on the button the user just activated, and because this popover is
                 * non-modal Radix does not recapture the focus that drops to `<body>` — the next Tab
                 * would restart from the top of the document. See the same reasoning in
                 * `marble-guide.component.tsx`.
                 */}
                <Button
                  data-testid="toolbar-sync-cancel-button"
                  variant="outline"
                  size="sm"
                  className="tw:h-7 tw:self-start tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50"
                  aria-disabled={!isCancelEnabled}
                  onClick={isCancelEnabled ? handleCancel : undefined}
                >
                  {isCancelling
                    ? localizedStrings['%toolbar_sync_cancelling%']
                    : localizedStrings['%toolbar_sync_cancel%']}
                </Button>
              </>
            ) : (
              <p data-testid="toolbar-sync-popover-status" className="tw:text-sm">
                {popoverStatusMessage}
              </p>
            )}
            {/*
             * The way through to per-project conflicts, failure messages and warnings. This compact
             * surface deliberately reports only whether a sync is running and whether it succeeded;
             * the sync status web view is the only place the detail behind a failure exists, so
             * without this link a failed sync would be reported with nowhere to go.
             */}
            <Button
              data-testid="toolbar-sync-view-details-button"
              variant="link"
              size="sm"
              className="tw:h-6 tw:self-start tw:px-0"
              onClick={handleViewDetails}
            >
              {localizedStrings['%toolbar_sync_view_details%']}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SyncStatusButton;
