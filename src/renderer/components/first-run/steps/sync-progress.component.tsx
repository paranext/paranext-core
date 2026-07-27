import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEvent, Spinner, Progress } from 'platform-bible-react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { getNetworkEvent } from '@shared/services/network.service';
import type { SyncProgressDetail, SyncProgressEvent } from 'paratext-bible-send-receive';
import { LocalizeKey, PlatformEvent } from 'platform-bible-utils';
import { FirstRunStepProps } from '../first-run-step-props.model';

type SyncProgressStepProps = FirstRunStepProps & {
  /**
   * S/R "sync started/ended" event source. Defaults to the live
   * `paratextBibleSendReceive.onSyncStateChanged` network event. Injectable (with
   * {@link SyncProgressStepProps.onSyncProgressEvent}) so Storybook stories and tests can drive the
   * step deterministically without a live PAPI backend; production callers omit it. Pass a
   * reference-stable event — a changing reference re-subscribes the listener on every render.
   */
  onSyncStateChangedEvent?: PlatformEvent<SyncProgressEvent>;
  /**
   * S/R progress event source. Defaults to the live `paratextBibleSendReceive.onSyncProgress`
   * network event. See {@link SyncProgressStepProps.onSyncStateChangedEvent}.
   */
  onSyncProgressEvent?: PlatformEvent<SyncProgressDetail>;
};

const KEYS: LocalizeKey[] = [
  '%firstRun_step_syncProgress_body%',
  '%firstRun_step_syncProgress_complete_body%',
  '%firstRun_step_syncProgress_complete_heading%',
  '%firstRun_step_syncProgress_heading%',
];

/**
 * How long to wait after mount before assuming sync completed before this step was reached. If no
 * S/R events arrive within this window, the completion event was missed and we enable Finish.
 */
const SYNC_STARTED_TIMEOUT_MS = 30_000;

/** A project row accumulated from live S/R progress events. */
type ProjectRow = {
  /** Bare project name from progressText (e.g. "GreekNT"). */
  name: string;
  status: 'syncing' | 'done';
};

/** Renders the list of per-project rows below the global progress bar. */
function ProjectRowList({ rows }: { rows: ProjectRow[] }) {
  return (
    // Tailwind's reset strips list semantics in Safari; role="list" re-establishes them for VoiceOver.
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul role="list" className="tw:mt-2 tw:flex tw:flex-col tw:gap-1">
      {rows.map((row) => (
        <li key={row.name} className="tw:flex tw:items-center tw:gap-2 tw:text-sm">
          {row.status === 'syncing' ? (
            // Decorative: the global progressbar already announces overall sync progress.
            <Spinner aria-hidden="true" />
          ) : (
            // Decorative: row text provides the accessible label.
            <span aria-hidden="true">✓</span>
          )}
          <span>{row.name}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Cannot use `<Progress value={undefined}>` for the indeterminate case — its indicator style uses
 * `value || 0`, rendering a stuck empty bar instead of an animation. Use a div+Spinner instead.
 */
function IndeterminateProgress({ label }: { label: string }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100}>
      <Spinner />
    </div>
  );
}

/**
 * Sync progress wizard step. Subscribes to S/R live-progress events and enables the Finish button
 * only after observing a full sync cycle (isSyncing: true → isSyncing: false).
 *
 * Assumption: sync may be in flight or may have already completed when this step mounts. If the
 * sync-consent step fires `sendReceiveProjects` (async, non-blocking) before advancing, events will
 * arrive here. If it calls `syncProjects` and waits for completion before advancing, sync is
 * already done and no events will arrive (the recovery timeout below is the only path to Finish in
 * that case). The exact handoff must be reconciled with PT-4178.
 *
 * Recovery: if sync completes before this step mounts, no events will arrive. After
 * {@link SYNC_STARTED_TIMEOUT_MS} with no events, `setSyncComplete(true)` fires as a fallback so
 * Finish is always reachable. The event stream is otherwise fire-and-forget with no query API.
 *
 * In Storybook shell stories, `stepComponents` replaces this step with a plain stub; for
 * interactive previews of the real sync states, see `sync-progress.component.stories.tsx`.
 */
export function SyncProgressStep({
  setCanProceed,
  onSyncStateChangedEvent: injectedOnSyncStateChangedEvent,
  onSyncProgressEvent: injectedOnSyncProgressEvent,
}: SyncProgressStepProps) {
  const [strings] = useLocalizedStrings(KEYS);
  const [progressText, setProgressText] = useState('');
  // null from SyncProgressDetail.progressValue is normalized to undefined; both mean indeterminate.
  const [progressValue, setProgressValue] = useState<number | undefined>(undefined);
  const [syncComplete, setSyncComplete] = useState(false);
  // Ref (not state) so the handler stays stable across renders — changing it would cause useEvent
  // to tear down and re-attach the S/R event listener on each render.
  const hasSyncStartedRef = useRef(false);
  const [rows, setRows] = useState<ProjectRow[]>([]);

  // Gate the shell's Finish button: disabled while syncing, enabled on completion.
  useEffect(() => {
    setCanProceed?.(syncComplete);
  }, [syncComplete, setCanProceed]);

  // Recovery: if no S/R events arrive within SYNC_STARTED_TIMEOUT_MS, sync completed before this
  // step mounted and we missed the completion event. Enable Finish so the user is never stuck.
  useEffect(() => {
    const id = setTimeout(() => {
      if (!hasSyncStartedRef.current) setSyncComplete(true);
    }, SYNC_STARTED_TIMEOUT_MS);
    return () => clearTimeout(id);
  }, []); // mount-only: hasSyncStartedRef is a stable ref; setSyncComplete is a stable state setter

  // useMemo is consistent with other renderer call sites; getNetworkEvent's Map cache means the
  // deps never change, so these references are stable across renders. An injected event (Storybook/
  // tests) takes precedence over the live network event; production omits the injected props.
  const defaultOnSyncStateChangedEvent = useMemo(
    () => getNetworkEvent('paratextBibleSendReceive.onSyncStateChanged'),
    [],
  );
  const defaultOnSyncProgressEvent = useMemo(
    () => getNetworkEvent('paratextBibleSendReceive.onSyncProgress'),
    [],
  );
  const onSyncStateChangedEvent = injectedOnSyncStateChangedEvent ?? defaultOnSyncStateChangedEvent;
  const onSyncProgressEvent = injectedOnSyncProgressEvent ?? defaultOnSyncProgressEvent;

  const handleSyncStateChanged = useCallback(({ isSyncing }: SyncProgressEvent) => {
    if (isSyncing) {
      hasSyncStartedRef.current = true;
    } else if (hasSyncStartedRef.current) {
      // Only mark complete after seeing isSyncing:true — stale-event guard.
      setSyncComplete(true);
      setRows((prev) => prev.map((r) => ({ ...r, status: 'done' as const })));
    }
  }, []);

  const handleSyncProgress = useCallback(
    ({ progressText: text, progressValue: value }: SyncProgressDetail) => {
      // Belt-and-suspenders: a progress event also confirms sync is under way, covering any code
      // path that emits onSyncProgress before (or instead of) onSyncStateChanged isSyncing:true.
      hasSyncStartedRef.current = true;
      setProgressText(text);
      const normalizedValue = value ?? undefined;
      setProgressValue(normalizedValue);

      // Row accumulation: only for determinate events with a non-empty project name that is not
      // already in the list. Indeterminate events (progressValue null/undefined) carry localized
      // status messages ("Reconnecting…"), not project names — skip them. The membership check
      // is inside setRows so it uses the committed state and handles both consecutive and
      // non-consecutive recurrences (e.g. a retry that re-emits an earlier project name).
      if (normalizedValue !== undefined && text) {
        setRows((prev) => {
          if (prev.some((r) => r.name === text)) return prev;
          return [
            ...prev.map((r) => (r.status === 'syncing' ? { ...r, status: 'done' as const } : r)),
            { name: text, status: 'syncing' },
          ];
        });
      }
    },
    [],
  );

  useEvent(onSyncStateChangedEvent, handleSyncStateChanged);
  useEvent(onSyncProgressEvent, handleSyncProgress);

  const progressLabel = strings['%firstRun_step_syncProgress_heading%'];

  if (syncComplete) {
    return (
      <div className="tw:flex tw:flex-col tw:gap-2">
        {/* role="status" wraps only the announcement text — not the rows — so screen readers
            do not re-read the whole project list on the heading transition. */}
        <div role="status" className="tw:flex tw:flex-col tw:gap-2">
          <h2 className="tw:text-base tw:font-medium">
            {strings['%firstRun_step_syncProgress_complete_heading%']}
          </h2>
          <p className="tw:text-sm tw:text-muted-foreground">
            {strings['%firstRun_step_syncProgress_complete_body%']}
          </p>
        </div>
        {rows.length > 0 && <ProjectRowList rows={rows} />}
      </div>
    );
  }

  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      {/* role="status" mirrors the completion branch so screen readers are told the heading
          for both states. Wraps only the static heading/body — not the progress indicator
          (which changes frequently) — to avoid over-announcing. */}
      <div role="status" className="tw:flex tw:flex-col tw:gap-1">
        <h2 className="tw:text-base tw:font-medium">
          {strings['%firstRun_step_syncProgress_heading%']}
        </h2>
        <p className="tw:text-sm tw:text-muted-foreground">
          {strings['%firstRun_step_syncProgress_body%']}
        </p>
      </div>
      {progressText || progressValue !== undefined ? (
        <div className="tw:mt-2 tw:flex tw:flex-col tw:gap-1">
          {progressValue !== undefined ? (
            // Determinate: progressValue drives the bar; progressText is the current item label.
            <Progress value={Math.round(progressValue * 100)} aria-label={progressLabel} />
          ) : (
            <IndeterminateProgress label={progressLabel} />
          )}
          {progressText && (
            <p className="tw:text-xs tw:text-muted-foreground" aria-live="polite">
              {progressText}
            </p>
          )}
        </div>
      ) : (
        // No progress events received yet — show indeterminate spinner.
        <IndeterminateProgress label={progressLabel} />
      )}
      {rows.length > 0 && <ProjectRowList rows={rows} />}
    </div>
  );
}

export default SyncProgressStep;
