import { AsyncVariable, deepEqual } from 'platform-bible-utils';

/** How long a {@link SelectionTracker.getSelection} caller waits for the first report. */
const FIRST_REPORT_TIMEOUT_MS = 10000;

/**
 * Holds the selection an editor last reported, and lets callers wait for the first report.
 *
 * `undefined` is a legitimate reported selection (the editor has none), so "has the editor reported
 * yet" is tracked separately from the selection's value.
 */
export type SelectionTracker<TSelection> = {
  /** The last reported selection. `undefined` before any report and after a report of none. */
  readonly current: TSelection | undefined;
  /**
   * Resolves to the last reported selection, which is `undefined` if the editor reported none.
   * Before the editor's first report this waits for it, and resolves to `undefined` if none arrives
   * in time; it rejects only if the tracker is disposed while waiting.
   */
  getSelection: () => Promise<TSelection | undefined>;
  /**
   * Records a report from the editor.
   *
   * @returns `true` if the selection changed
   */
  report: (selection: TSelection | undefined) => boolean;
  /** Forgets the selection and rejects any caller still waiting for the first report. */
  dispose: () => void;
};

/**
 * Creates a {@link SelectionTracker}.
 *
 * @param name Identifies the waited-on variable in logs
 * @param firstReportTimeoutMs How long {@link SelectionTracker.getSelection} waits for the first
 *   report
 */
export function createSelectionTracker<TSelection>(
  name: string,
  firstReportTimeoutMs: number = FIRST_REPORT_TIMEOUT_MS,
): SelectionTracker<TSelection> {
  let current: TSelection | undefined;
  let hasReport = false;
  // Constructed lazily on the first waiting caller so its timeout timer never starts if nobody
  // waits.
  let firstReport: AsyncVariable<TSelection | undefined> | undefined;

  return {
    get current() {
      return current;
    },
    async getSelection() {
      if (hasReport) return current;
      if (!firstReport) firstReport = new AsyncVariable(name, firstReportTimeoutMs);
      const waitingOn = firstReport;
      try {
        return await waitingOn.promise;
      } catch (e) {
        if (!waitingOn.hasTimedOut) throw e;
        // No report in time means no selection to give. The next caller waits afresh.
        if (firstReport === waitingOn) firstReport = undefined;
        return undefined;
      }
    },
    report(selection) {
      const changed = !deepEqual(current, selection);
      hasReport = true;
      current = selection;
      if (firstReport && !firstReport.hasSettled) firstReport.resolveToValue(selection);
      return changed;
    },
    dispose() {
      current = undefined;
      if (firstReport && !firstReport.hasSettled)
        firstReport.rejectWithReason('Disposed before first selection received');
    },
  };
}
