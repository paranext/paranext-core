import { Dispose } from './disposal.model';
import { Unsubscriber, UnsubscriberAsync } from './unsubscriber';

/**
 * How long one late-arrival reporting window lasts. The first occurrence in a window is reported
 * verbatim; the rest are counted and reported once as a total when the window closes.
 */
export const LATE_ARRIVAL_REPORT_WINDOW_MS = 10_000;

/** {@link LATE_ARRIVAL_REPORT_WINDOW_MS} in the units the reported messages state it in. */
const LATE_ARRIVAL_REPORT_WINDOW_SECONDS = LATE_ARRIVAL_REPORT_WINDOW_MS / 1000;

/**
 * How many distinct error texts one window keeps from the occurrences it suppresses.
 *
 * Throttling a `threw` storm is the only case that discards information rather than just
 * repetition: a count alone cannot tell you whether a thousand suppressed throws had one cause or a
 * thousand. Keeping a few distinct texts restores the part worth having, and capping the set is
 * what stops a storm of unique messages from turning a throttle into a leak.
 */
const MAX_SUPPRESSED_ERROR_SAMPLES = 3;

/** Which of the three things that can happen to a late arrival is being reported. */
type LateArrivalOutcome = 'unsubscribed' | 'failed' | 'threw';

/** One reporting window's state: when it closes and how much it has swallowed so far. */
type LateArrivalReportWindow = {
  closesAt: number;
  suppressedCount: number;
  /**
   * Distinct error texts from suppressed occurrences, capped at
   * {@link MAX_SUPPRESSED_ERROR_SAMPLES}.
   */
  suppressedErrorSamples: Set<string>;
  summaryTimeout: ReturnType<typeof setTimeout> | undefined;
};

/**
 * Reporting windows keyed by list NAME (plus outcome), deliberately not by list instance.
 *
 * A late arrival during rapid re-subscription is an expected race, and the shape it takes is a
 * fresh list built per attempt rather than one long-lived list — so a per-instance budget would
 * throttle nothing at all. Keying by name is what lets one budget cover the whole storm.
 *
 * Lives for the process, bounded by the number of distinct list names produced at RUNTIME — not by
 * the number of construction sites, since several interpolate values into the name (`PDP Factory
 * for ${projectInterfaces}`, `WebViewFactory for webViewType ${webViewType}`, an extension's own
 * name). Entries are two numbers, a small set and a timer handle, so the practical ceiling is tiny;
 * the bound is worth stating accurately because this comment is the only thing arguing it exists.
 */
const lateArrivalReportWindows = new Map<string, LateArrivalReportWindow>();

/**
 * Discards every open reporting window and any summary timer it has pending.
 *
 * Exported for tests only — deliberately not re-exported from the package index, so it stays off
 * the public API surface. Because windows are keyed by list name and outlive the lists themselves,
 * a test that produces a late arrival otherwise leaves a window open for the next one; call this in
 * `beforeEach` so each test starts with no budget already spent and no timer about to fire inside
 * it.
 */
export function resetLateArrivalReportWindowsForTests(): void {
  lateArrivalReportWindows.forEach((openWindow) => {
    if (openWindow.summaryTimeout) clearTimeout(openWindow.summaryTimeout);
  });
  lateArrivalReportWindows.clear();
}

/**
 * How each outcome reports itself: which `console` channel it uses, and what it says for a first
 * occurrence and for a closing window's summary. Kept as one table so the three message pairs stay
 * visibly parallel and a change to the wording of one is made next to its siblings.
 */
const LATE_ARRIVAL_REPORTS: Record<
  LateArrivalOutcome,
  {
    log: (message: string) => void;
    first: (name: string, error: unknown) => string;
    suppressed: (name: string, suppressedCount: number, errorSamples: string[]) => string;
  }
> = {
  unsubscribed: {
    log: (message) => console.warn(message),
    first: (name) =>
      `UnsubscriberAsyncList ${name}: Unsubscriber arrived after the list was run, so it was unsubscribed immediately instead of being stored.`,
    suppressed: (name, suppressedCount) =>
      `UnsubscriberAsyncList ${name}: ${suppressedCount} more unsubscribers arrived after the list was run in the last ${LATE_ARRIVAL_REPORT_WINDOW_SECONDS}s and were unsubscribed immediately; per-occurrence warnings suppressed.`,
  },
  failed: {
    log: (message) => console.error(message),
    first: (name) =>
      `UnsubscriberAsyncList ${name}: Unsubscriber added after the list was run failed!`,
    suppressed: (name, suppressedCount) =>
      `UnsubscriberAsyncList ${name}: ${suppressedCount} more unsubscribers added after the list was run failed in the last ${LATE_ARRIVAL_REPORT_WINDOW_SECONDS}s; per-occurrence errors suppressed.`,
  },
  threw: {
    log: (message) => console.error(message),
    first: (name, error) =>
      `UnsubscriberAsyncList ${name}: Unsubscriber added after the list was run threw! ${error}`,
    // Unlike the other two outcomes, throttling this one discards more than repetition: each
    // occurrence carries its own error. The samples are what keep a storm's causes legible; a bare
    // count could not distinguish one recurring fault from many different ones.
    suppressed: (name, suppressedCount, errorSamples) =>
      `UnsubscriberAsyncList ${name}: ${suppressedCount} more unsubscribers added after the list was run threw in the last ${LATE_ARRIVAL_REPORT_WINDOW_SECONDS}s; per-occurrence errors suppressed. Distinct errors sampled (up to ${MAX_SUPPRESSED_ERROR_SAMPLES}): ${errorSamples.join(' | ')}`,
  },
};

/**
 * Reports one late arrival, at most once per {@link LATE_ARRIVAL_REPORT_WINDOW_MS} per list name and
 * outcome, so a storm cannot cost more than it reports. The first occurrence in a window is
 * reported verbatim; the rest are counted, and the total is reported once when the window closes.
 *
 * Each `console` call here is routed over IPC to the main-process log, which is why an unthrottled
 * per-occurrence report is not merely noisy: at a few hundred a second it becomes a significant
 * share of the load it is describing, and the renderer never gets a clear breath.
 *
 * @param name The list's name. Lists sharing a name share a budget — including the ones that took
 *   the default, which is deliberate: their reports are indistinguishable in the log anyway, so
 *   separate budgets would buy nothing a reader could act on.
 * @param outcome What happened to the late arrival
 * @param error The error this occurrence threw, for the outcome that carries one. Sampled while
 *   suppressed so the closing summary can say what went wrong and not merely how often.
 */
function reportLateArrival(name: string, outcome: LateArrivalOutcome, error?: unknown): void {
  const { log, first, suppressed } = LATE_ARRIVAL_REPORTS[outcome];
  const windowKey = `${name}\u0000${outcome}`;
  const now = Date.now();
  const openWindow = lateArrivalReportWindows.get(windowKey);

  if (!openWindow || now >= openWindow.closesAt) {
    log(first(name, error));
    lateArrivalReportWindows.set(windowKey, {
      closesAt: now + LATE_ARRIVAL_REPORT_WINDOW_MS,
      suppressedCount: 0,
      suppressedErrorSamples: new Set(),
      summaryTimeout: undefined,
    });
    return;
  }

  openWindow.suppressedCount += 1;
  if (error !== undefined && openWindow.suppressedErrorSamples.size < MAX_SUPPRESSED_ERROR_SAMPLES)
    openWindow.suppressedErrorSamples.add(`${error}`);
  // Reported on a timer rather than when the next occurrence arrives: a storm that stops abruptly
  // (the user quits, the loop finally settles) would otherwise lose its final — and largest — count,
  // which is exactly the number worth having.
  if (!openWindow.summaryTimeout) {
    openWindow.summaryTimeout = setTimeout(() => {
      const { suppressedCount } = openWindow;
      const errorSamples = [...openWindow.suppressedErrorSamples];
      openWindow.suppressedCount = 0;
      openWindow.suppressedErrorSamples.clear();
      openWindow.summaryTimeout = undefined;
      if (suppressedCount > 0) log(suppressed(name, suppressedCount, errorSamples));
    }, openWindow.closesAt - now);
    // Late arrivals cluster during teardown, so in the Node-side processes an un-unref'd window
    // timer can hold the event loop open for its full duration at shutdown. Absent in the browser,
    // where the handle is a number.
    if (typeof openWindow.summaryTimeout === 'object' && 'unref' in openWindow.summaryTimeout)
      openWindow.summaryTimeout.unref();
  }
}

/**
 * Simple collection for UnsubscriberAsync objects that also provides an easy way to run them.
 *
 * A list is single-use: it collects unsubscribers until {@link runAllUnsubscribers} runs them, and
 * that run seals it for good. Anything added to a sealed list is unsubscribed immediately instead
 * of being stored, because whatever these clean up after is already gone. Registration is usually
 * asynchronous, so an unsubscriber routinely arrives after the teardown that should have run it —
 * without sealing it would be stored in a list nobody drains again and its subscription would leak
 * for the rest of the session.
 */
export class UnsubscriberAsyncList {
  readonly unsubscribers = new Set<UnsubscriberAsync | Unsubscriber>();

  /**
   * Whether {@link runAllUnsubscribers} has started. Set at the top of the run rather than at the
   * end: the run takes a snapshot of the set and then clears it, so an unsubscriber added partway
   * through would land in a list that is never drained again.
   */
  private isSealed = false;

  constructor(private name = 'Anonymous') {}

  /**
   * Add unsubscribers to the list. Note that duplicates are not added twice.
   *
   * Once {@link runAllUnsubscribers} has started, unsubscribers are run immediately rather than
   * stored. Nothing can await that run, so its outcome — success included — is only reported.
   *
   * Those reports are rate-limited: within a `LATE_ARRIVAL_REPORT_WINDOW_MS` window, lists sharing
   * this list's name report the first occurrence of each outcome verbatim and then collapse the
   * rest into one count. So the reports are a faithful signal that late arrivals are happening, but
   * not a per-occurrence record — do not count log lines to count undone subscriptions.
   *
   * @param unsubscribers - Objects that were returned from a registration process.
   */
  add(...unsubscribers: (UnsubscriberAsync | Unsubscriber | Dispose)[]) {
    unsubscribers.forEach((unsubscriber) => {
      const unsubscribe =
        'dispose' in unsubscriber ? unsubscriber.dispose.bind(unsubscriber) : unsubscriber;
      if (this.isSealed) this.unsubscribeImmediately(unsubscribe);
      else this.unsubscribers.add(unsubscribe);
    });
  }

  /**
   * Run all unsubscribers added to this list, clear the list, and seal it so anything added later
   * is unsubscribed on arrival.
   *
   * An unsubscriber that throws (synchronously or asynchronously) does not make this method reject:
   * the error is caught and logged via `console.error`, the remaining unsubscribers still run, and
   * the thrower counts as a failure in the return value. An unsubscriber that arrives during the
   * run is not part of the returned result — nothing is waiting on it by then.
   *
   * @returns `true` if all unsubscribers succeeded, `false` if any returned `false` or threw.
   */
  async runAllUnsubscribers(): Promise<boolean> {
    this.isSealed = true;
    // Each unsubscriber is invoked and awaited independently so one that throws — synchronously or
    // otherwise — cannot stop the rest from running. This list is what cleans up after a window
    // closes, which happens repeatedly once more than one window can be open rather than only once
    // at shutdown, so a single bad unsubscriber must not strand everything behind it.
    const results = await Promise.all(
      [...this.unsubscribers].map(async (unsubscriber) => {
        try {
          return await unsubscriber();
        } catch (error) {
          console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber threw! ${error}`);
          return false;
        }
      }),
    );
    this.unsubscribers.clear();
    return results.every((unsubscriberSucceeded, index) => {
      if (!unsubscriberSucceeded)
        console.error(`UnsubscriberAsyncList ${this.name}: Unsubscriber at index ${index} failed!`);

      return unsubscriberSucceeded;
    });
  }

  /**
   * Run an unsubscriber that arrived after the list was sealed. `add` is synchronous and has no
   * caller to hand a result to, so the outcome is reported here rather than thrown.
   *
   * The success path is reported too: from the caller's point of view a subscription it just set up
   * has been undone, and without a line here that happens with no record anywhere.
   */
  private unsubscribeImmediately(unsubscriber: UnsubscriberAsync | Unsubscriber): void {
    (async () => {
      const { name } = this;
      try {
        const unsubscriberSucceeded = await unsubscriber();
        reportLateArrival(name, unsubscriberSucceeded ? 'unsubscribed' : 'failed');
      } catch (error) {
        reportLateArrival(name, 'threw', error);
      }
    })();
  }
}

export default UnsubscriberAsyncList;
