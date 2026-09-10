import { vi } from 'vitest';
import { MAX_REQUEST_ATTEMPTS, REQUEST_ATTEMPT_WAIT_TIME_MS } from '@shared/data/rpc.model';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { logger } from '@shared/services/logger.service';
import { type ProjectMetadata } from '@shared/models/project-metadata.model';
import { waitForScriptureWorkspaceReady } from './startup-readiness.util';

vi.mock('@shared/services/network-object-status.service', () => ({
  networkObjectStatusService: {
    waitForNetworkObject: vi.fn(),
    getAllNetworkObjectDetails: vi.fn(),
  },
}));

vi.mock('@shared/services/project-lookup.service', () => ({
  projectLookupService: { getMetadataForAllProjectsWithoutRetries: vi.fn() },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockWaitForNetworkObject = vi.mocked(networkObjectStatusService.waitForNetworkObject);
const mockGetMetadata = vi.mocked(projectLookupService.getMetadataForAllProjectsWithoutRetries);
const mockLoggerDebug = vi.mocked(logger.debug);

/**
 * A minimal valid `ProjectMetadata`. The readiness probe only checks that the array is non-empty,
 * never its contents, so the fields are deliberately empty rather than realistic — building a
 * lifelike project here would imply the probe inspects it.
 */
const A_PROJECT = {
  id: 'PROJ1',
  projectInterfaces: [],
  pdpFactoryInfo: {},
} satisfies ProjectMetadata;

/** The network object details `waitForNetworkObject` resolves with when the factory is up. */
const FACTORY_DETAILS = {
  id: 'pdpf-scripture-extender',
  objectType: 'pdpFactory',
  functionNames: [],
  attributes: { projectInterfaces: ['platformScripture.USJ_Chapter'] },
};

/** Runs `body` with fake timers installed, restoring real timers even if it throws. */
async function withFakeTimers(body: () => Promise<void>): Promise<void> {
  vi.useFakeTimers({ toFake: ['performance', 'setTimeout', 'clearTimeout'] });
  try {
    await body();
  } finally {
    vi.useRealTimers();
  }
}

/** A promise plus its resolve/reject, for driving a call that is deliberately left in flight. */
function deferred<T>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
} {
  let resolveFn: (value: T) => void = () => {};
  let rejectFn: (reason: unknown) => void = () => {};
  const promise = new Promise<T>((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  });
  return { promise, resolve: resolveFn, reject: rejectFn };
}

beforeEach(() => {
  // resetAllMocks (not clearAllMocks): clearAllMocks does not drain mockResolvedValueOnce /
  // mockRejectedValueOnce queues, so an under-consumed queue from one test can leak into the next
  // and make an unrelated test fail. resetAllMocks also clears implementations, so the defaults
  // below are re-established every time.
  vi.resetAllMocks();
  mockWaitForNetworkObject.mockResolvedValue(FACTORY_DETAILS);
  mockGetMetadata.mockResolvedValue([A_PROJECT]);
});

describe('waitForScriptureWorkspaceReady', () => {
  it('resolves "ready" when the factory is registered and metadata is non-empty', async () => {
    await expect(waitForScriptureWorkspaceReady()).resolves.toEqual({ outcome: 'ready' });
    expect(mockWaitForNetworkObject).toHaveBeenCalledWith(
      {
        objectType: 'pdpFactory',
        attributes: { projectInterfaces: ['platformScripture.USJ_Chapter'] },
      },
      expect.any(Number),
    );
  });

  it('passes the remaining budget — not -1 (no-timeout) or 0 — as the timeout to waitForNetworkObject', async () => {
    // Today nothing pins this number: mutating it to -1 (AsyncVariable's documented no-timeout
    // sentinel) would make phase 1 wait forever with an otherwise-green suite. Fake timers make the
    // computed remaining budget deterministic so the exact number can be pinned.
    await withFakeTimers(async () => {
      await waitForScriptureWorkspaceReady({ timeoutMs: 5_000 });
    });
    expect(mockWaitForNetworkObject).toHaveBeenCalledWith(expect.anything(), 5_000);
  });

  it('resolves "timed-out" when the factory never registers within the budget', async () => {
    // Production shape: the same remaining budget is handed to `waitForNetworkObject`, so its own
    // `AsyncVariable` expires at the deadline and it rejects having consumed everything. Rejecting
    // INSTANTLY is a different case — budget left over — which is deliberately not terminal (see
    // the two fall-through tests below).
    //
    // The surfaced detail is the generic one rather than the underlying timeout message, and that
    // is correct: with the budget spent, `settleWithin` short-circuits on its own `remainingMs <= 0`
    // guard and reports `TIMED_OUT` without ever observing the rejection. Asserting the underlying
    // message here would be asserting a path production cannot take.
    mockWaitForNetworkObject.mockImplementation(async () => {
      vi.advanceTimersByTime(5_000);
      throw new Error('Timeout reached when waiting for wait-for-net-obj to settle');
    });

    await withFakeTimers(async () => {
      await expect(waitForScriptureWorkspaceReady({ timeoutMs: 5_000 })).resolves.toEqual({
        outcome: 'timed-out',
        detail:
          'the scripture project data provider factory did not register within the readiness budget',
      });
    });

    // Phase 2 must not run once the budget is genuinely spent — there is nothing left to probe with.
    expect(mockGetMetadata).not.toHaveBeenCalled();
  });

  it('continues to the metadata probe when the registration wait fails with budget remaining', async () => {
    // A rejection is not the same thing as an exhausted budget. `waitForNetworkObject` also rejects
    // when the status service is unreachable, which can land with nearly the whole budget unspent;
    // treating that as terminal would collapse the gate and fire the whole-workspace sync early,
    // reintroducing the starvation this module exists to prevent — and invisibly, since the cause
    // is only logged at debug. Phase 2 tests the stronger condition anyway, so the gate goes on.
    mockWaitForNetworkObject.mockRejectedValue(
      new Error('NetworkObjectStatusService is not available as a network object'),
    );
    mockGetMetadata.mockResolvedValue([A_PROJECT]);

    await expect(waitForScriptureWorkspaceReady({ timeoutMs: 5_000 })).resolves.toEqual({
      outcome: 'ready',
    });
    expect(mockGetMetadata).toHaveBeenCalled();
  });

  it('still resolves "timed-out" when the registration wait fails and the probe cannot answer either', async () => {
    // The other half of the fall-through: continuing past phase 1 must not turn a workspace that
    // genuinely cannot list projects into a false 'ready'. The outcome degrades to the same
    // 'timed-out' phase 1 would have returned, just after spending the budget it was given.
    mockWaitForNetworkObject.mockRejectedValue(
      new Error('NetworkObjectStatusService is not available as a network object'),
    );
    mockGetMetadata.mockResolvedValue([]);

    await withFakeTimers(async () => {
      const readinessPromise = waitForScriptureWorkspaceReady({ timeoutMs: 5_000 });
      await vi.advanceTimersByTimeAsync(5_000);
      await expect(readinessPromise).resolves.toEqual({
        outcome: 'timed-out',
        detail: expect.any(String),
      });
    });
    expect(mockGetMetadata).toHaveBeenCalled();
  });

  it('abandons a registration wait that never settles once the deadline passes, yielding "timed-out"', async () => {
    // This, not the rejection above, is the ordinary production timeout for phase 1. The same
    // remaining budget is handed to both `waitForNetworkObject` and `settleWithin`, and
    // `settleWithin` starts its timer a moment later — so its deadline almost always fires first
    // and the underlying wait never gets to reject. Without this test that whole path is unpinned,
    // and only the rarer rejection path is covered. Mirrors the phase-2 equivalent below.
    const registration = deferred<typeof FACTORY_DETAILS>();
    mockWaitForNetworkObject.mockReturnValue(registration.promise);

    await withFakeTimers(async () => {
      const readinessPromise = waitForScriptureWorkspaceReady({ timeoutMs: 5_000 });
      await vi.advanceTimersByTimeAsync(5_000);
      await expect(readinessPromise).resolves.toEqual({
        outcome: 'timed-out',
        // Asserting the phase-1 reason specifically: a generic string would also pass if the gate
        // wrongly fell through to phase 2 and timed out there instead.
        detail: expect.stringContaining('did not register'),
      });
    });

    expect(mockGetMetadata).not.toHaveBeenCalled();
  });

  it('logs the real cause distinguishably when the status service itself is unavailable', async () => {
    // Not a timeout: `networkObjectStatusService.initialize()` throws when the status service
    // network object cannot be reached. The cause has to survive into the log — asserting only the
    // shared "could not wait for..." prefix (common to both causes) would pass even if the
    // distinguishing text were dropped, which is why this asserts on that text specifically.
    // The OUTCOME is covered by the two fall-through tests above; this one is about the log.
    mockWaitForNetworkObject.mockRejectedValue(
      new Error('NetworkObjectStatusService is not available as a network object'),
    );
    const distinguishingText = 'NetworkObjectStatusService is not available as a network object';

    await waitForScriptureWorkspaceReady({ timeoutMs: 5_000 });

    expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining(distinguishingText));
  });

  it('resolves "timed-out" immediately when the budget is already exhausted, without calling waitForNetworkObject', async () => {
    // A zero remaining budget must fail fast rather than pass through: `AsyncVariable` only arms
    // its timeout for a strictly positive value, so an unguarded `0` would mean "no timeout" and
    // wait unbounded. The second assertion is the one that matters — it fails if the zero is ever
    // forwarded to `waitForNetworkObject` instead of being caught first.
    await expect(waitForScriptureWorkspaceReady({ timeoutMs: 0 })).resolves.toEqual({
      outcome: 'timed-out',
      detail: expect.any(String),
    });
    expect(mockWaitForNetworkObject).not.toHaveBeenCalled();
  });

  it('resolves "aborted" immediately when the signal is already aborted', async () => {
    const abort = new AbortController();
    abort.abort();
    await expect(waitForScriptureWorkspaceReady({ abortSignal: abort.signal })).resolves.toEqual({
      outcome: 'aborted',
    });
    expect(mockWaitForNetworkObject).not.toHaveBeenCalled();
  });

  it('resolves "aborted" when the app quits while still waiting for the factory to register', async () => {
    // The case the abort race exists for, and the one a boot-time quit actually hits.
    // `waitForNetworkObject` takes a timeout but NO AbortSignal, so an implementation that simply
    // awaits it would ignore the quit for the full budget and still pass every other test here.
    const abort = new AbortController();
    const registration = deferred<typeof FACTORY_DETAILS>();
    mockWaitForNetworkObject.mockReturnValue(registration.promise);

    const readinessPromise = waitForScriptureWorkspaceReady({ abortSignal: abort.signal });
    abort.abort();

    await expect(readinessPromise).resolves.toEqual({ outcome: 'aborted' });
    expect(mockGetMetadata).not.toHaveBeenCalled();

    // Settle the abandoned wait the way the real one eventually does — its AsyncVariable rejects at
    // its own timeout long after we stopped listening. This is a smoke check only: a missing
    // rejection handler would surface as an unhandled-rejection warning, not a failed expectation.
    registration.reject(new Error('Timeout reached when waiting for wait-for-net-obj to settle'));
  });

  it('resolves "aborted", not "timed-out", when a quit lands in the same tick as the registration promise rejecting', async () => {
    // Exercises the catch's abort recheck. `settleWithin`'s gate resolves on whichever outcome
    // reaches it first, so if the rejection is scheduled before the abort listener's resolution the
    // raw rejection wins that internal race and lands in the catch — which must still report
    // 'aborted' when a quit landed in that same tick, not misreport 'timed-out' (which would make
    // the caller warn "syncing anyway" during shutdown).
    const abort = new AbortController();
    const registration = deferred<typeof FACTORY_DETAILS>();
    mockWaitForNetworkObject.mockReturnValue(registration.promise);

    const readinessPromise = waitForScriptureWorkspaceReady({ abortSignal: abort.signal });
    await vi.waitFor(() => expect(mockWaitForNetworkObject).toHaveBeenCalled());
    // Order matters: reject before abort, so the rejection wins the internal race instead of the
    // abort listener.
    registration.reject(
      new Error('NetworkObjectStatusService is not available as a network object'),
    );
    abort.abort();

    await expect(readinessPromise).resolves.toEqual({ outcome: 'aborted' });
  });

  it('polls until metadata answers non-empty, then resolves "ready"', async () => {
    mockGetMetadata.mockResolvedValueOnce([]).mockResolvedValueOnce([A_PROJECT]);

    await withFakeTimers(async () => {
      const readinessPromise = waitForScriptureWorkspaceReady();
      // One poll interval must elapse before the second probe fires.
      await vi.advanceTimersByTimeAsync(1_000);
      await expect(readinessPromise).resolves.toEqual({ outcome: 'ready' });
    });

    expect(mockGetMetadata).toHaveBeenCalledTimes(2);
    expect(mockGetMetadata).toHaveBeenCalledWith({
      // Escaped: includeProjectInterfaces is matched as an unanchored RegExp, so the literal `.`
      // must be escaped or the match becomes a wildcard/substring match.
      includeProjectInterfaces: ['platformScripture\\.USJ_Chapter'],
    });
  });

  it('resolves "timed-out" when the factory registers but metadata stays empty past the budget', async () => {
    // The case that distinguishes Phase 2 from Phase 1: registration succeeded, so an
    // implementation with no Phase 2 would wrongly report "ready" here.
    mockGetMetadata.mockResolvedValue([]);

    await withFakeTimers(async () => {
      const readinessPromise = waitForScriptureWorkspaceReady({ timeoutMs: 5_000 });
      await vi.advanceTimersByTimeAsync(6_000);
      await expect(readinessPromise).resolves.toEqual({
        outcome: 'timed-out',
        detail: expect.any(String),
      });
    });
  });

  it('abandons a metadata probe that never settles once the deadline passes, yielding "timed-out"', async () => {
    // The budget is a real ceiling: a probe that hangs (the .NET provider saturated, no response
    // ever arriving) must still be abandoned at the deadline rather than holding the whole gate
    // open indefinitely.
    const probe = deferred<ProjectMetadata[]>();
    mockGetMetadata.mockReturnValue(probe.promise);

    await withFakeTimers(async () => {
      const readinessPromise = waitForScriptureWorkspaceReady({ timeoutMs: 5_000 });
      await vi.advanceTimersByTimeAsync(5_000);
      await expect(readinessPromise).resolves.toEqual({
        outcome: 'timed-out',
        detail: expect.any(String),
      });
    });
  });

  it('retries a throwing metadata probe rather than treating it as fatal', async () => {
    mockGetMetadata
      .mockRejectedValueOnce(new Error('data provider not answering'))
      .mockResolvedValueOnce([A_PROJECT]);

    await withFakeTimers(async () => {
      const readinessPromise = waitForScriptureWorkspaceReady();
      await vi.advanceTimersByTimeAsync(1_000);
      await expect(readinessPromise).resolves.toEqual({ outcome: 'ready' });
    });

    expect(mockGetMetadata).toHaveBeenCalledTimes(2);
  });

  it('resolves "aborted" when the app quits mid-poll and issues no further probes', async () => {
    mockGetMetadata.mockResolvedValue([]);
    const abort = new AbortController();

    await withFakeTimers(async () => {
      const readinessPromise = waitForScriptureWorkspaceReady({ abortSignal: abort.signal });
      // Let the first probe run and the poll wait begin.
      await vi.advanceTimersByTimeAsync(0);
      abort.abort();
      await expect(readinessPromise).resolves.toEqual({ outcome: 'aborted' });
      // Pinned to the literal, not read from the mock: reading the expected count from the mock
      // itself would make this assertion pass vacuously even if the implementation made zero probes.
      expect(mockGetMetadata).toHaveBeenCalledTimes(1);
    });
  });

  it('resolves "aborted" when the app quits while a metadata probe is in flight, even though the probe later resolves non-empty', async () => {
    // The bug this pins down: the loop previously re-checked the abort signal only at the TOP of
    // each iteration, so an abort landing while this probe was in flight was missed if the probe
    // went on to resolve non-empty — the loop returned 'ready' instead of 'aborted'.
    const abort = new AbortController();
    const probe = deferred<ProjectMetadata[]>();
    mockGetMetadata.mockReturnValue(probe.promise);

    const readinessPromise = waitForScriptureWorkspaceReady({ abortSignal: abort.signal });
    await vi.waitFor(() => expect(mockGetMetadata).toHaveBeenCalled());
    abort.abort();
    probe.resolve([A_PROJECT]);

    await expect(readinessPromise).resolves.toEqual({ outcome: 'aborted' });
  });

  it('resolves "aborted", not "timed-out", when a quit lands in the same tick as an in-flight probe rejecting', async () => {
    // Distinct from the test above: this exercises the probe's catch path (a rejection), not its
    // resolved-array path. Order matters here too, for the same reason as phase 1's equivalent
    // test: reject before abort, so the rejection wins the internal race and lands in the catch,
    // which must still report 'aborted' rather than falling through to a stale 'timed-out'.
    const abort = new AbortController();
    const probe = deferred<ProjectMetadata[]>();
    mockGetMetadata.mockReturnValue(probe.promise);

    const readinessPromise = waitForScriptureWorkspaceReady({ abortSignal: abort.signal });
    await vi.waitFor(() => expect(mockGetMetadata).toHaveBeenCalled());
    probe.reject(new Error('data provider not answering'));
    abort.abort();

    await expect(readinessPromise).resolves.toEqual({ outcome: 'aborted' });
  });

  it('probes at least once even when registration consumed the whole budget', async () => {
    // A factory that registers right at the deadline must still be asked whether it works, rather
    // than falling straight through to "timed-out". Advances to just under the deadline (not
    // exactly onto it): landing exactly on the deadline would make the already-resolved
    // registration and settleWithin's own freshly-computed deadline timer for the NEXT await a
    // genuine tie, which is not what this test means to exercise.
    mockWaitForNetworkObject.mockImplementation(async () => {
      vi.advanceTimersByTime(4_999);
      return FACTORY_DETAILS;
    });

    await withFakeTimers(async () => {
      await expect(waitForScriptureWorkspaceReady({ timeoutMs: 5_000 })).resolves.toEqual({
        outcome: 'ready',
      });
    });

    expect(mockGetMetadata).toHaveBeenCalledTimes(1);
  });

  it('pins the two-phase probe backoff and the attempt-log sampling', async () => {
    // Poll cadence (see startup-readiness.util.ts): the first INITIAL_READINESS_POLL_ATTEMPTS waits
    // are INITIAL_READINESS_POLL_INTERVAL_MS, every wait after that is
    // EXTENDED_READINESS_POLL_INTERVAL_MS. Nothing else crosses that transition, so without this
    // test dropping the backoff or inverting the two phases stays green. Mirrors the sibling
    // Power-mode cadence test in `startup-tasks.test.ts`, including deriving the initial phase from
    // the shared rpc.model constants this module aliases rather than re-typing the literals.
    const INITIAL_POLL_ATTEMPTS = MAX_REQUEST_ATTEMPTS;
    const INITIAL_POLL_INTERVAL_MS = REQUEST_ATTEMPT_WAIT_TIME_MS;
    const EXTENDED_POLL_INTERVAL_MS = 2000;
    // Answer on a deliberately NON-symmetric attempt so the two-phase cadence is observable: 10
    // waits @1s + 4 waits @2s before the 15th probe = 18s. Flattening the backoff (all @1s = 14s)
    // or inverting the phases (@2s then @1s = 22s) both change this elapsed time and fail below.
    const ANSWER_ON_PROBE = 15;
    const EXPECTED_ELAPSED_MS =
      INITIAL_POLL_ATTEMPTS * INITIAL_POLL_INTERVAL_MS +
      (ANSWER_ON_PROBE - 1 - INITIAL_POLL_ATTEMPTS) * EXTENDED_POLL_INTERVAL_MS; // 18_000
    let probeCount = 0;
    mockGetMetadata.mockImplementation(async () => {
      probeCount += 1;
      return probeCount < ANSWER_ON_PROBE ? [] : [A_PROJECT];
    });

    await withFakeTimers(async () => {
      const readinessPromise = waitForScriptureWorkspaceReady();
      // 1ms before the expected time the answering probe has not fired yet.
      await vi.advanceTimersByTimeAsync(EXPECTED_ELAPSED_MS - 1);
      expect(probeCount).toBe(ANSWER_ON_PROBE - 1);
      // Crossing the expected elapsed time triggers exactly the answering probe.
      await vi.advanceTimersByTimeAsync(1);
      await expect(readinessPromise).resolves.toEqual({ outcome: 'ready' });
    });

    expect(probeCount).toBe(ANSWER_ON_PROBE);
    // Sampling: 14 empty probes, logged on the 1st and every 10th. The answering probe returns
    // before it can log. Pinned to the literal attempt numbers so widening the sampling (or logging
    // every attempt, which is what would bury the surrounding startup logs) fails here.
    expect(mockLoggerDebug).toHaveBeenCalledTimes(2);
    expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('(attempt 1)'));
    expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('(attempt 10)'));
  });
});
