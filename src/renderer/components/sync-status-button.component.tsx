import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { SyncStatus, useSyncStatus } from '@renderer/hooks/use-sync-status.hook';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import { CircleAlert, CircleCheck, CircleHelp, RefreshCw } from 'lucide-react';
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
import {
  formatReplacementString,
  getErrorMessage,
  isolateBidi,
  LocalizeKey,
} from 'platform-bible-utils';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Message shown when Cancel is clicked but send/receive can't answer. Declared here rather than
 * inline so the key is spelled exactly once — `PlatformNotification.message` accepts any string, so
 * a typo would not fail the build; it would ship a raw `%key%` into a toast.
 */
export const SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY: LocalizeKey = '%toolbar_sync_cancel_unavailable%';

/**
 * Message shown when "View sync details" is clicked but send/receive can't open the sync status web
 * view. Declared here for the same reason as {@link SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY}: the key is
 * spelled exactly once, because `PlatformNotification.message` accepts any string and a typo would
 * ship a raw `%key%` into a toast rather than failing the build.
 */
export const SYNC_VIEW_DETAILS_UNAVAILABLE_MESSAGE_KEY: LocalizeKey =
  '%toolbar_sync_view_details_unavailable%';

/**
 * Shared by every "sync details aren't available" toast so repeat clicks replace it rather than
 * stack copies of it.
 */
const SYNC_VIEW_DETAILS_UNAVAILABLE_NOTIFICATION_ID = 'toolbar-sync-view-details-unavailable';

/**
 * Shared by every "couldn't cancel" toast, for the same reason as
 * {@link SYNC_VIEW_DETAILS_UNAVAILABLE_NOTIFICATION_ID}: a rejected cancel re-enables the button, so
 * a user clicking it repeatedly against an unresponsive send/receive would otherwise collect one
 * toast per click.
 */
const SYNC_CANCEL_UNAVAILABLE_NOTIFICATION_ID = 'toolbar-sync-cancel-unavailable';

/**
 * Every key this component renders, plus the two toast messages — listed through their constants so
 * each key is still spelled once — so the en/es localization-parity tests cover them too. Exported
 * so those tests assert against the list the component actually reads, rather than a hand-copied
 * duplicate that silently stops matching the moment a key is added here.
 */
export const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%toolbar_sync%',
  '%toolbar_sync_cancel%',
  '%toolbar_sync_cancelling%',
  '%toolbar_sync_open_status%',
  '%toolbar_sync_popover_cancelled%',
  '%toolbar_sync_popover_last_sync_unfinished%',
  '%toolbar_sync_popover_idle%',
  '%toolbar_sync_popover_synced%',
  '%toolbar_sync_popover_unknown%',
  '%toolbar_sync_progress_item%',
  '%toolbar_sync_status_cancelled%',
  '%toolbar_sync_status_failed%',
  '%toolbar_sync_status_synced%',
  '%toolbar_sync_status_syncing%',
  '%toolbar_sync_status_syncing_project%',
  '%toolbar_sync_status_syncing_projects%',
  '%toolbar_sync_status_unknown%',
  '%toolbar_sync_view_details%',
  SYNC_CANCEL_UNAVAILABLE_MESSAGE_KEY,
  SYNC_VIEW_DETAILS_UNAVAILABLE_MESSAGE_KEY,
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
 * is derivable (from the last sync's per-project results) and is reported. See
 * `adr-toolbar-sync-status-is-local` in `.context/standards/Architecture-Decisions.md`.
 */
export function SyncStatusButton() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { status, syncingProjects, syncProgress } = useSyncStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [isCancelEnabled, setIsCancelEnabled] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  /**
   * Whether the sync that has just finished is one this control asked to cancel. Send/receive
   * reports a cancelled sync as a non-success result rather than as an outcome of its own, so
   * without this the user who clicked Cancel is answered with "Sync failed" in red — reporting
   * their own request back to them as an error.
   */
  const [wasCancelRequested, setWasCancelRequested] = useState(false);
  /**
   * The popover's rendered content node. Radix portals it to `document.body`, so it is NOT a
   * descendant of the trigger — which is why {@link handleWindowBlur} measures containment against
   * this rather than against the trigger.
   */
  // React's useRef requires null as the initial value for DOM refs
  // eslint-disable-next-line no-null/no-null
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const {
    ref: labelRef,
    open: isTooltipTruncated,
    onPointerEnter: handleLabelPointerEnter,
    onPointerLeave: handleLabelPointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();
  /**
   * Whether the user has pressed Escape to dismiss the truncation tooltip. Held here rather than in
   * `useTruncationTooltip`, which exposes `open` and the two pointer handlers but no way to force
   * the tooltip closed — so Escape has to be honoured by withholding `open` from Radix.
   *
   * WCAG 1.4.13 requires content shown on hover to be dismissable without moving the pointer, and
   * this tooltip is fully controlled, which leaves Radix's own Escape handling inert.
   *
   * Not fixed here: `useTruncationTooltip` offers only pointer handlers, so a keyboard user who
   * tabs to this button — a real toolbar Tab stop — still cannot REVEAL a clipped project name.
   * That needs focus handlers on the shared hook, which every other consumer would inherit.
   * Screen-reader users are unaffected either way: the accessible name carries the full text,
   * untruncated.
   */
  const [isTooltipDismissed, setIsTooltipDismissed] = useState(false);
  const isTooltipOpen = isTooltipTruncated && !isTooltipDismissed;

  /**
   * Mirrors `status` for {@link handleCancel}, which must not re-create itself when the status
   * changes — a new handler identity mid-click is exactly what the single-shot guard is
   * protecting.
   *
   * Written during RENDER, deliberately, and unlike the effect-written refs below. React schedules
   * the passive-effect flush as its own task after commit, i.e. after pending microtasks — so a
   * `cancelSync` rejection delivered between the commit that moved `status` to `failed` and that
   * flush would read an effect-written ref as still `syncing`, and toast "Couldn't cancel the sync"
   * beside a popover saying the sync finished. That is precisely what the guard exists to suppress.
   * A render-phase write cannot lag the commit it belongs to, and for a SUPPRESSION guard being
   * marginally ahead is the safe direction: it errs toward staying quiet.
   */
  const statusRef = useRef(status);
  statusRef.current = status;

  /**
   * Identifies the sync episode a cancel request belongs to. Bumped when a cancel is sent, and
   * again whenever the status leaves `syncing` (see the settle effect below) — so an episode
   * boundary invalidates any request still in flight across it.
   *
   * `cancelSync` can reject long after it was sent (an unregistered handler rejects only after the
   * RPC layer's ~10s retry budget), by which time the sync it targeted may have ended and another
   * begun. Without this, sync A's rejection re-enables Cancel and toasts "Couldn't cancel the sync"
   * against sync B — and if the user had already cancelled B, it reverts B's "Cancelling…" while
   * B's own request is still in flight, defeating the single-shot guard the whole handler is built
   * around.
   */
  const cancelGenerationRef = useRef(0);

  const handleCancel = useCallback(async () => {
    // The editor's sync-blocked banner (`extensions/src/platform-scripture-editor/`) offers the
    // same cancel and can be on screen at the same time as this popover; neither observes the
    // other's click. See `adr-toolbar-sync-status-is-local` in
    // `.context/standards/Architecture-Decisions.md`.
    // Single-shot: one cancel request per click-through. Disabled immediately so a second click
    // can't queue another request, and re-enabled only if this one is rejected while a sync is
    // still running, so the user can retry.
    setIsCancelEnabled(false);
    // A cancel takes effect whenever send/receive reaches a stopping point, so the sync keeps
    // reporting `syncing` for a while yet. Saying "Cancelling…" is what distinguishes a request that
    // was accepted from a button that has merely gone dim.
    setIsCancelling(true);
    cancelGenerationRef.current += 1;
    const generation = cancelGenerationRef.current;
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
      // The sync this request was for is over, and everything below would land on a later one's
      // state. Nothing to re-enable and nothing to report: whatever is showing now describes the
      // episode that is actually running.
      if (generation !== cancelGenerationRef.current) return;
      setIsCancelEnabled(true);
      setIsCancelling(false);
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
    // This popover is shown whenever send/receive is part of the build, which is true before its
    // commands finish registering — so a click can land while nothing is listening. This click also
    // leaves the renderer, and it is the only route to the detail behind a reported failure, so both
    // documented failures are surfaced rather than leaving the user with a link that appears to do
    // nothing: a rejection, and the `undefined` the command returns when it created no web view.
    let didOpen = false;
    try {
      didOpen = (await sendCommand('paratextBibleSendReceive.openSyncStatus')) !== undefined;
    } catch (e) {
      logger.warn(`Toolbar could not open the sync status view: ${getErrorMessage(e)}`);
    }
    if (didOpen) return;
    try {
      await notificationService.send({
        message: SYNC_VIEW_DETAILS_UNAVAILABLE_MESSAGE_KEY,
        severity: 'warning',
        notificationId: SYNC_VIEW_DETAILS_UNAVAILABLE_NOTIFICATION_ID,
      });
    } catch (notificationError) {
      logger.warn(
        `Toolbar could not notify the user that sync details are unavailable: ${getErrorMessage(notificationError)}`,
      );
    }
  }, []);

  /**
   * Escape closes the truncation tooltip; a fresh hover offers it again. See
   * {@link isTooltipDismissed}.
   */
  useEffect(() => {
    if (!isTooltipOpen) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsTooltipDismissed(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTooltipOpen]);

  const handleLabelPointerLeaveAndRearmTooltip = useCallback(() => {
    setIsTooltipDismissed(false);
    handleLabelPointerLeave();
  }, [handleLabelPointerLeave]);

  /**
   * Mirrors `isCancelling` for the settle effect below, which must read the value as of the moment
   * the sync ended without re-running every time the flag itself changes — re-running is what would
   * immediately overwrite the answer it just recorded.
   */
  const isCancellingRef = useRef(isCancelling);
  useEffect(() => {
    isCancellingRef.current = isCancelling;
  }, [isCancelling]);

  // Whenever no sync is running, the pending cancel is settled — by completing, by being cancelled,
  // or by a different sync taking over. Re-arming here (rather than only on reopen) means a sync
  // starting while the popover is still open gets a live Cancel instead of a dead one.
  //
  // The syncing project ids are deliberately NOT a second trigger. Upstream derives
  // `syncingProjectIds` from live, ref-counted per-project claims, and one continuous
  // `isSyncing: true` window spans however many overlapping claims the sync paths take out — so a
  // project can release and re-claim without a new sync having started, and "an id this cancel did
  // not cover" is not evidence of a different sync. A pending cancel is therefore settled only by
  // the status leaving `syncing` and by the popover being reopened, at the cost of a genuinely new
  // overlapping sync keeping a dim "Cancelling…" until the whole union goes idle. That is the safe
  // half of the trade: the alternative offers a live Cancel while a cancel is still in flight.
  // Settling it positively needs a monotonic sync-episode id in `SyncState` (`adr-toolbar-sync-status-is-local` follow-up 4).
  useEffect(() => {
    if (status === 'syncing') {
      // A running sync has no settled outcome to attribute to a cancel yet.
      setWasCancelRequested(false);
      return;
    }
    // Recorded before `isCancelling` is cleared, because it is the only evidence that the non-success
    // outcome now being reported is one the user asked for.
    setWasCancelRequested(isCancellingRef.current);
    setIsCancelling(false);
    setIsCancelEnabled(true);
    // This episode is over, so a cancel request still in flight from it must not reach the next one.
    cancelGenerationRef.current += 1;
  }, [status]);

  /**
   * Dismiss when focus leaves the popover's content for a foreign browsing context — a
   * scripture-editor WebView, say. Those WebViews are cross-origin sandboxed iframes, so a click
   * into one delivers no `pointerdown` to this document at all: Radix's outside-press detection
   * never fires and the popover would sit open over a view the user has already moved into. A
   * `blur` on this window is the only signal that arrives.
   *
   * `document.hasFocus()` is what separates the two things that blur reports. It stays true while
   * focus is anywhere in this top-level page — including inside a child iframe — and flips to false
   * only when the OS window itself loses focus, so a plain alt-tab or a DevTools click leaves the
   * popover open. Containment is measured against the portaled content node because Radix renders
   * it under `document.body`; asking the trigger instead would read the popover's own content as
   * "outside" and dismiss it the moment the user clicked inside it.
   *
   * Closing through the controlled `open` prop keeps Radix's own close lifecycle — and with it the
   * focus restore — rather than tearing the surface down behind its back. See the
   * `Guidelines/Dismissal Patterns` Storybook page; no shared hook for this exists yet, so each
   * Click-away surface implements it itself.
   *
   * What the tests here pin is this handler's logic given the values it reads, by spying
   * `document.activeElement` rather than moving focus into a real cross-origin iframe — which jsdom
   * has no way to reproduce. So the load-bearing assumption, that Electron has already moved focus
   * to the `<iframe>` element by the time `blur` fires on this window, is asserted from the spec
   * and not observed. It needs one manual pass in a Studio build with a scripture-editor WebView
   * open.
   */
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleWindowBlur = () => {
      // The whole window lost focus, not a crossing within the page.
      if (!document.hasFocus()) return;
      const contentEl = popoverContentRef.current;
      const focusedEl = document.activeElement;
      // Nothing to measure against, so there is no evidence focus went anywhere foreign.
      if (!contentEl || !focusedEl) return;
      // For a cross-origin WebView the element holding focus is the `<iframe>` itself.
      if (contentEl.contains(focusedEl)) return;
      setIsOpen(false);
    };
    window.addEventListener('blur', handleWindowBlur);
    return () => window.removeEventListener('blur', handleWindowBlur);
  }, [isOpen]);

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

  /**
   * Whether the localized strings have loaded. Before they do, every value is its own `%key%`.
   *
   * Read from the values rather than from `useLocalizedStrings`' `isLoading` flag, which is
   * narrower than this: `isLoading` goes false as soon as the localization data provider delivers
   * anything at all, and when what it delivers is a `PlatformError` the hook substitutes the same
   * key-for-value default state. So `isLoading: false` does not imply real strings — the error
   * fallback is indistinguishable from "not loaded yet" from a caller's point of view, and both are
   * cases the live region below must stay silent for. Testing the value covers both with one
   * check.
   *
   * Only the live region is guarded by this. The VISIBLE surfaces render whatever the hook returns,
   * so a localization `PlatformError` shows literal `%toolbar_sync%` text — which is how every
   * localized surface in this repo behaves, not something this control introduces, and there is no
   * localized fallback to substitute. Diverging here alone would make this the one component that
   * hides its own labels. The live region is the exception because a raw `%key%` SPOKEN aloud is a
   * different order of failure from one seen briefly on screen.
   */
  const areStringsLoaded = localizedStrings['%toolbar_sync%'] !== '%toolbar_sync%';

  /**
   * Whether the settled non-success outcome is one the user asked for. Reported as a cancellation
   * rather than as a failure: the sync did not go wrong, it was stopped on request. Send/receive
   * carries no `cancelled` result status, so this control's own pending request is the only
   * evidence that separates the two.
   *
   * Both sources are read, and `isCancelling` is what makes this true on the very render the sync
   * settles: {@link wasCancelRequested} is recorded by an effect, so it only arrives a commit later,
   * and anything computed from it alone spends that commit calling a cancelled sync a failure. The
   * visible surfaces repaint too fast for that to show, but the live region below speaks whatever
   * text it holds.
   */
  const wasCancelled = status === 'failed' && (wasCancelRequested || isCancelling);

  const buttonLabel = (() => {
    if (wasCancelled) return localizedStrings['%toolbar_sync_status_cancelled%'];
    if (status === 'synced') return localizedStrings['%toolbar_sync_status_synced%'];
    if (status === 'failed') return localizedStrings['%toolbar_sync_status_failed%'];
    // `unknown` says so in the button's accessible name instead (see `buttonAccessibleName`): the
    // visible label is capped and truncates, so it carries the control's identity rather than its
    // status, and the icon carries the distinction visually.
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
   */
  const [announcement, setAnnouncement] = useState('');
  /**
   * What the region was last computed for. The effect below re-runs on every render, because
   * `localizedStrings` is a fresh object each time — without this it would immediately recompute
   * `unknown` with itself as the previous status and blank the announcement it had just made.
   *
   * Every value the announcement is computed from belongs in this key: the status, `wasCancelled`,
   * and the TEXTS themselves. The guard runs before the effect's dependencies are consulted, so a
   * value left out of it is one the region can never be corrected for — the dep array still fires,
   * and the guard still returns. The texts are keyed by content rather than by `localizedStrings`'s
   * identity, which is a fresh object per render and would defeat the guard entirely; keying on
   * content is what lets a LOCALE SWITCH through, instead of leaving the previous language's
   * sentence sitting in `role="status"`.
   */
  const lastAnnouncedForRef = useRef<
    { status: SyncStatus; wasCancelled: boolean; stringsKey: string } | undefined
  >(undefined);
  /**
   * The status this effect last saw, updated on EVERY run — including runs that say nothing because
   * the strings have not loaded. Separate from {@link lastAnnouncedForRef}, which records what was
   * last SPOKEN: transitions have to be tracked through the silent window, or a status that moves
   * twice while the strings load is indistinguishable from one that never moved.
   */
  const lastSeenStatusRef = useRef<SyncStatus | undefined>(undefined);
  /**
   * Set when a sync the user was watching ended in "we cannot tell" while the region could not
   * speak. Without it that transition is simply lost: by the time the strings load, `status` and
   * the previous status are both `unknown`, which is indistinguishable from an `unknown` nobody was
   * waiting on — the one case this region deliberately stays quiet about.
   */
  const hasUnspokenSyncEndedUnknownRef = useRef(false);

  // Names every string the announcement can be built from, so a locale change is a change to this
  // key. Not memoized: it is a join of five strings, and the effect below reads it on every render
  // anyway.
  const announcementStringsKey = [
    localizedStrings['%toolbar_sync_status_syncing%'],
    localizedStrings['%toolbar_sync_status_synced%'],
    localizedStrings['%toolbar_sync_status_cancelled%'],
    localizedStrings['%toolbar_sync_status_failed%'],
    localizedStrings['%toolbar_sync_status_unknown%'],
  ].join('\u0000');

  useEffect(() => {
    const previousStatus = lastSeenStatusRef.current;
    lastSeenStatusRef.current = status;
    // A sync the user was watching ending in "we cannot tell" IS worth saying; `idle`, and an
    // `unknown` nobody was waiting on, are not transitions worth interrupting a screen reader for.
    // Recorded whether or not it can be spoken yet.
    if (status === 'unknown' && previousStatus === 'syncing')
      hasUnspokenSyncEndedUnknownRef.current = true;
    if (status !== 'unknown') hasUnspokenSyncEndedUnknownRef.current = false;

    // Silent until the strings load, so the region can never speak a raw `%key%`. No announcement
    // state is recorded either: nothing was said, so there is nothing to compare a later run against.
    if (!areStringsLoaded) return;

    const lastAnnouncedFor = lastAnnouncedForRef.current;
    if (
      lastAnnouncedFor &&
      lastAnnouncedFor.status === status &&
      lastAnnouncedFor.wasCancelled === wasCancelled &&
      lastAnnouncedFor.stringsKey === announcementStringsKey
    )
      return;
    lastAnnouncedForRef.current = { status, wasCancelled, stringsKey: announcementStringsKey };

    if (status === 'syncing') {
      setAnnouncement(localizedStrings['%toolbar_sync_status_syncing%']);
      return;
    }
    if (status === 'synced') {
      setAnnouncement(localizedStrings['%toolbar_sync_status_synced%']);
      return;
    }
    if (wasCancelled) {
      setAnnouncement(localizedStrings['%toolbar_sync_status_cancelled%']);
      return;
    }
    if (status === 'failed') {
      setAnnouncement(localizedStrings['%toolbar_sync_status_failed%']);
      return;
    }
    if (status === 'unknown' && hasUnspokenSyncEndedUnknownRef.current) {
      setAnnouncement(localizedStrings['%toolbar_sync_status_unknown%']);
      return;
    }
    setAnnouncement('');
  }, [status, areStringsLoaded, wasCancelled, localizedStrings, announcementStringsKey]);

  /**
   * The button's accessible name, supplied only for `unknown`. `idle` and `unknown` share one
   * visible label — the label is capped and truncates, so it names the control rather than the
   * status — which would otherwise leave the difference between them carried only by an
   * `aria-hidden` icon, and a screen-reader user hearing "Sync, button" for both. That collapses
   * the very distinction `unknown` exists to draw.
   *
   * The visible label is KEPT as the first half rather than replaced. An `aria-label` overrides the
   * accessible name wholesale, so naming the button only for its status leaves no overlap between
   * what a speech-control user sees and what they must say to activate it — WCAG 2.5.3 Label in
   * Name. In English "Sync status unavailable" happens to start with "Sync" and passes by accident;
   * in Spanish "Sincronizar" and "Estado de sincronización no disponible" share nothing.
   *
   * `undefined` until the strings load, so the name can never be a raw `%key%`. `claimStatus`
   * starts at `unknown`, so `status` is `unknown` on the very first render — exactly when
   * `useLocalizedStrings` is still seeding every value with its own key — and a screen reader
   * focusing the toolbar in that window would otherwise announce "percent toolbar underscore sync
   * underscore status underscore unknown percent, button". The live region beside it is explicitly
   * guarded against the same thing.
   */
  const unknownStatusText = localizedStrings['%toolbar_sync_status_unknown%'];
  const buttonAccessibleName =
    status === 'unknown' && areStringsLoaded && unknownStatusText
      ? `${buttonLabel} — ${unknownStatusText}`
      : undefined;

  /**
   * The progress line for the running sync, or `undefined` when there is nothing to say.
   *
   * Two shapes, per the `SyncProgressDetail` contract. DETERMINATE progress carries a bare item —
   * usually a project name — which is formatted here together with the percent. INDETERMINATE
   * progress carries a complete, already-localized sentence (ParatextData's "Connection to server
   * lost. Retrying…" is the one that matters most to a user on a flaky connection) and is shown
   * verbatim: formatting it would append a percent to a full sentence.
   *
   * The item is bidi-isolated because it is usually a project name, for the same reason the button
   * label isolates one.
   */
  const syncProgressMessage = (() => {
    if (!syncProgress) return undefined;
    if (syncProgress.fraction === undefined) return syncProgress.text;
    return formatReplacementString(localizedStrings['%toolbar_sync_progress_item%'], {
      item: isolateBidi(syncProgress.text),
      percent: Math.round(syncProgress.fraction * 100),
    });
  })();

  const popoverStatusMessage = (() => {
    if (status === 'synced') return localizedStrings['%toolbar_sync_popover_synced%'];
    if (wasCancelled) return localizedStrings['%toolbar_sync_popover_cancelled%'];
    if (status === 'failed') return localizedStrings['%toolbar_sync_popover_last_sync_unfinished%'];
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
       * It announces the status rather than this button's own label, and says nothing until the
       * strings load — see `announcement` above for why.
       */}
      <span role="status" className="tw:sr-only">
        {announcement}
      </span>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        {/*
         * No `delayDuration`: the tooltip's `open` is fully controlled by `useTruncationTooltip`, so
         * Radix's own hover timing never runs.
         */}
        <TooltipProvider>
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
                  aria-label={buttonAccessibleName}
                  onPointerEnter={handleLabelPointerEnter}
                  onPointerLeave={handleLabelPointerLeaveAndRearmTooltip}
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
                    // Muted rather than destructive when the user asked for the cancel: a stopped
                    // sync is not an error, and colouring it as one reports their own request back
                    // to them as a fault.
                    <CircleAlert
                      className={
                        wasCancelled
                          ? 'tw:h-4 tw:w-4 tw:shrink-0 tw:text-muted-foreground'
                          : 'tw:h-4 tw:w-4 tw:shrink-0 tw:text-destructive'
                      }
                      aria-hidden
                    />
                  )}
                  {/*
                   * `idle` and `unknown` carry an icon for the same reason the other three states
                   * do: the label is capped and truncates, so a squeezed toolbar would otherwise
                   * reduce this control to a clipped word with nothing identifying it. The sync
                   * glyph says which control this is; the question mark says the status could not be
                   * read, which is the whole difference between `unknown` and `idle`.
                   */}
                  {status === 'idle' && (
                    <RefreshCw className="tw:h-4 tw:w-4 tw:shrink-0" aria-hidden />
                  )}
                  {status === 'unknown' && (
                    <CircleHelp
                      className="tw:h-4 tw:w-4 tw:shrink-0 tw:text-muted-foreground"
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
        {/*
         * `aria-label` because this content is a `role="dialog"` and would otherwise have no
         * accessible name: `PopoverTitle` renders a plain `<div>` with no `id`, and `PopoverContent`
         * wires no `aria-labelledby` to it, so a screen-reader user tabbing in hears "dialog" and
         * nothing else — on the surface that holds a live Cancel button (WCAG 4.1.2). Labelled here
         * rather than in the shared component, which every other popover in the app also relies on.
         */}
        <PopoverContent
          align="end"
          ref={popoverContentRef}
          // Withheld until the strings load, for the same reason as `buttonAccessibleName`: an
          // `aria-label` of `%toolbar_sync_open_status%` would be spoken verbatim.
          aria-label={areStringsLoaded ? localizedStrings['%toolbar_sync_open_status%'] : undefined}
        >
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
                 * Progress detail, when the backend is sending it. Absent is the ordinary case — a
                 * build with no Send/Receive implementation emits no progress — so this is additive
                 * and the popover reads correctly without it. It matters most in Simple mode, where
                 * this indicator is the only sync surface: without it a user on a flaky connection
                 * sees a spinner and has no way to know the sync is retrying rather than stuck.
                 *
                 * Not in the live region: progress ticks on every item and percent change, and
                 * announcing each would talk over everything else the region has to say. The region
                 * announces the STATUS; this is detail for a user who has opened the popover.
                 */}
                {syncProgressMessage && (
                  <p
                    data-testid="toolbar-sync-popover-progress"
                    className="tw:truncate tw:text-xs tw:text-muted-foreground"
                  >
                    {syncProgressMessage}
                  </p>
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
