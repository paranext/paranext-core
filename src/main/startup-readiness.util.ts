import { MAX_REQUEST_ATTEMPTS, REQUEST_ATTEMPT_WAIT_TIME_MS } from '@shared/data/rpc.model';
import { PDP_FACTORY_OBJECT_TYPE } from '@shared/models/project-data-provider-factory.interface';
import { logger } from '@shared/services/logger.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { AsyncVariable, escapeStringRegexp, getErrorMessage, wait } from 'platform-bible-utils';

/**
 * How long (ms) the Simple-mode startup Send/Receive waits for the workspace to be able to list
 * scripture projects before firing anyway.
 *
 * Deliberately its own constant rather than an alias of `STARTUP_SYNC_RETRY_BUDGET_MS` in
 * `startup-tasks.ts`: same boot-appropriate magnitude and rationale, but a different measured thing
 * — that one bounds "how long until the S/R command registers", this one bounds "how long until the
 * workspace can list scripture projects". Aliasing would couple two budgets that should be free to
 * move apart.
 */
const STARTUP_SYNC_READINESS_BUDGET_MS = 120_000;

/**
 * Cadence (ms) for the first {@link INITIAL_READINESS_POLL_ATTEMPTS} phase-2 metadata probes.
 * Aliased from the shared `requestWithRetry` cadence ({@link REQUEST_ATTEMPT_WAIT_TIME_MS}) rather
 * than re-declared, mirroring `INITIAL_RETRY_INTERVAL_MS` in `startup-tasks.ts`'s sibling boot-race
 * loop: the common case (the factory answers within the first few seconds) polls at the shared
 * cadence, and only the long tail backs off further.
 */
const INITIAL_READINESS_POLL_INTERVAL_MS = REQUEST_ATTEMPT_WAIT_TIME_MS;

/**
 * Number of phase-2 probes at {@link INITIAL_READINESS_POLL_INTERVAL_MS} before backing off to the
 * gentler {@link EXTENDED_READINESS_POLL_INTERVAL_MS} cadence for the remainder of
 * {@link STARTUP_SYNC_READINESS_BUDGET_MS}. Aliased from the shared {@link MAX_REQUEST_ATTEMPTS} for
 * the same stay-in-lockstep reason as {@link INITIAL_READINESS_POLL_INTERVAL_MS}.
 */
const INITIAL_READINESS_POLL_ATTEMPTS = MAX_REQUEST_ATTEMPTS;

/** Cadence (ms) for phase-2 probes once {@link INITIAL_READINESS_POLL_ATTEMPTS} is exhausted. */
const EXTENDED_READINESS_POLL_INTERVAL_MS = 2000;

/**
 * The `projectInterface` whose PDP factory must be up before the workspace can show a project
 * picker. Provided by the Scripture Extender layering PDPF that `platform-scripture` registers
 * (`extensions/src/platform-scripture/src/main.ts`), NOT by the .NET data provider.
 *
 * Intentionally a local copy of `PICKER_PROJECT_INTERFACE` in
 * `src/renderer/hooks/use-project-picker-data.hook.ts` rather than a shared constant: hoisting it
 * into `src/shared` would publish an extension-specific `platformScripture.*` literal into the
 * generated `papi.d.ts` public surface permanently, and the two answer different questions (that
 * one is the picker's display filter; this one is a startup readiness gate). They coincide today;
 * nothing requires them to. If you change one, consider the other.
 */
const SCRIPTURE_READINESS_PROJECT_INTERFACE = 'platformScripture.USJ_Chapter';

/**
 * Why {@link waitForScriptureWorkspaceReady} stopped:
 *
 * - `'ready'` — the scripture PDP factory is registered AND answering; safe to start heavy work.
 * - `'timed-out'` — readiness was not reached within the budget. Callers should proceed anyway rather
 *   than suppress their work; this is a "we could not confirm", not a "do not run".
 * - `'aborted'` — the app began quitting while waiting.
 */
export type WorkspaceReadinessOutcome = 'ready' | 'timed-out' | 'aborted';

export interface WorkspaceReadinessResult {
  outcome: WorkspaceReadinessOutcome;
  /** Human-readable cause, present when `outcome` is `'timed-out'`. Safe to log at info/warn. */
  detail?: string;
}

export interface WorkspaceReadinessOptions {
  /** Stops the wait once the app has begun quitting. */
  abortSignal?: AbortSignal;
  /**
   * Overall budget in ms, shared by both phases. Defaults to
   * {@link STARTUP_SYNC_READINESS_BUDGET_MS}; a parameter only so tests can drive a short budget.
   */
  timeoutMs?: number;
}

/** Resolution value meaning the abort signal fired before the raced promise settled. */
const ABORTED = Symbol('aborted');
/** Resolution value meaning the readiness deadline passed before the raced promise settled. */
const TIMED_OUT = Symbol('timed out');

/**
 * How `promise` settled inside {@link settleWithin}. Both of its outcomes are funnelled into
 * RESOLUTIONS of the gate so that the gate's own timeout stays the only thing that can reject it.
 */
type SettledWithin<T> =
  | { kind: 'value'; value: T }
  | { kind: 'error'; error: unknown }
  | { kind: 'aborted' };

/**
 * Awaits `promise`, giving up as soon as `abortSignal` fires or `deadline` passes — whichever comes
 * first.
 *
 * Both phases route every await through here so the budget is a real ceiling. Neither of the calls
 * this module makes can be cancelled and neither takes an `AbortSignal`, so without this a single
 * slow call would overrun the budget by its own timeout (up to `platform.requestTimeout`), or never
 * return at all when that setting is `0` — which the network layer accepts and treats as "no
 * timeout".
 *
 * The bound comes from `AsyncVariable` rather than a raw `Promise.race` plus `setTimeout`, per the
 * async-coordination convention in the code style guide; `shared-store.service.ts` bridges an
 * in-flight promise into a bounded gate the same way. Funnelling both of `promise`'s outcomes into
 * resolutions is what keeps the timeout unambiguous — the gate's own timeout is then the only thing
 * that can reject it, so telling the two apart needs no message matching. `AsyncVariable` clears
 * its timer as it settles, so the repeated calls phase 2 makes leave nothing behind.
 *
 * Giving up only stops us awaiting; the abandoned call keeps running and settles on its own later.
 * A no-op rejection handler is attached first so that late settlement can never surface as an
 * unhandled rejection.
 */
async function settleWithin<T>(
  promise: Promise<T>,
  deadline: number,
  abortSignal?: AbortSignal,
): Promise<T | typeof ABORTED | typeof TIMED_OUT> {
  promise.catch(() => undefined);
  if (abortSignal?.aborted) return ABORTED;
  const remainingMs = deadline - performance.now();
  if (remainingMs <= 0) return TIMED_OUT;

  const gate = new AsyncVariable<SettledWithin<T>>('startup readiness wait', remainingMs);
  const cleanup = new AbortController();
  // Each resolution is guarded on `hasSettled` because the losing path still runs — an abort that
  // lands just after the promise settled, say — and `resolveToValue` logs a line every time it is
  // called on a settled variable. Same guard `network-object-status.service.ts` puts around its gate.
  promise
    .then(
      (value) => {
        if (!gate.hasSettled) gate.resolveToValue({ kind: 'value', value });
        return undefined;
      },
      (error) => {
        if (!gate.hasSettled) gate.resolveToValue({ kind: 'error', error });
        return undefined;
      },
    )
    .catch(() => undefined);
  abortSignal?.addEventListener(
    'abort',
    () => {
      if (!gate.hasSettled) gate.resolveToValue({ kind: 'aborted' });
    },
    { signal: cleanup.signal },
  );

  let settled: SettledWithin<T>;
  try {
    settled = await gate.promise;
  } catch {
    // Only the gate's own timeout can reject it, since every settlement of `promise` resolves it.
    return TIMED_OUT;
  } finally {
    cleanup.abort();
  }

  if (settled.kind === 'aborted') return ABORTED;
  if (settled.kind === 'error') throw settled.error;
  return settled.value;
}

/** Detail for a `'timed-out'` outcome reached because the factory never registered at all. */
const FACTORY_NOT_REGISTERED_DETAIL =
  'the scripture project data provider factory did not register within the readiness budget';

/**
 * Detail for a `'timed-out'` outcome reached because the factory registered but never answered a
 * metadata probe with any projects.
 */
const FACTORY_NOT_REPORTING_PROJECTS_DETAIL =
  'the scripture project data provider factory registered but never reported any projects';

/**
 * Phase 1: waits for the scripture PDP factory network object to register. This mirrors the wait
 * `getMetadataForProject` performs for a single project in `project-lookup.service-model.ts`, and
 * is the same factory registration the project picker ultimately depends on — but it is NOT the
 * picker's own call: the picker's list comes from `getMetadataForAllProjects`, which performs no
 * `waitForNetworkObject` at all and instead has its own grace loop bounded by
 * `LOAD_TIME_GRACE_PERIOD_MS`, measured from process start.
 */
async function waitForScriptureFactoryRegistration(
  deadline: number,
  abortSignal?: AbortSignal,
): Promise<WorkspaceReadinessResult> {
  const remainingMs = Math.max(0, deadline - performance.now());
  // A zero (already-elapsed) budget must fail fast, not pass through: `AsyncVariable` only arms
  // its timeout for a strictly positive value (see `rejectIfNotSettledWithinMS > 0` in
  // `lib/platform-bible-utils/src/promises/async-variable.ts`) — `-1` is its documented
  // "no timeout" sentinel, but an unguarded `0` hits that same false branch and would wait
  // unbounded instead of expiring instantly, violating this module's "never waits unbounded"
  // contract. `settleWithin` guards this too, but keeping the guard here documents the coupling at
  // the one call site that depends on it (`remainingMs` is also what we pass to
  // `waitForNetworkObject` as its own documented bound).
  if (remainingMs <= 0) return { outcome: 'timed-out', detail: FACTORY_NOT_REGISTERED_DETAIL };
  try {
    const settled = await settleWithin(
      networkObjectStatusService.waitForNetworkObject(
        {
          objectType: PDP_FACTORY_OBJECT_TYPE,
          attributes: { projectInterfaces: [SCRIPTURE_READINESS_PROJECT_INTERFACE] },
        },
        remainingMs,
      ),
      deadline,
      abortSignal,
    );
    if (settled === ABORTED) return { outcome: 'aborted' };
    if (settled === TIMED_OUT)
      return { outcome: 'timed-out', detail: FACTORY_NOT_REGISTERED_DETAIL };
    return { outcome: 'ready' };
  } catch (e) {
    // Re-check abort FIRST: the gate settles on whichever outcome reaches it first, so a quit
    // landing in the same tick as the underlying rejection would otherwise be reported as
    // 'timed-out' — which makes the caller warn "syncing anyway" during shutdown.
    if (abortSignal?.aborted) return { outcome: 'aborted' };
    // Any rejection means the same thing to the caller — we could not confirm readiness — but the
    // causes differ (budget elapsed vs. the status service itself being unreachable), so log the
    // message rather than asserting which one it was.
    const detail = `could not wait for the scripture project data provider factory: ${getErrorMessage(e)}`;
    logger.debug(`Startup sync readiness: ${detail}`);
    return { outcome: 'timed-out', detail };
  }
}

/**
 * Whether a phase-2 probe attempt should be logged. Logging every attempt in a workspace that
 * legitimately has no local scripture projects would run for the life of the readiness budget and
 * bury the surrounding startup logs. Sampling — the first attempt, then every tenth — tells the
 * same story at a fraction of the volume, without asserting how many attempts a given boot actually
 * makes: the backoff cadence below, and probes serializing behind the network layer's request
 * timeout when the provider is saturated, both push the real count around.
 */
function shouldLogProbeAttempt(attempt: number): boolean {
  return attempt === 1 || attempt % 10 === 0;
}

/**
 * Phase 2: polls until the workspace actually answers a scripture-metadata request.
 *
 * Registration alone is not enough. The Scripture Extender is a LAYERING factory: its
 * `getAvailableProjects` fans out to the .NET base factories, so it can be registered while still
 * unable to answer. Starting a whole-workspace Send/Receive in that window puts the sync's load
 * back on the .NET provider while the renderer's own metadata fetch is still outstanding — the same
 * failure one layer later.
 *
 * An empty result counts as not-ready, not ready-with-no-projects. A workspace that genuinely has
 * no local scripture projects therefore waits the full budget. Note this probe and the eventual
 * sync measure different things: the probe checks for projects visible via
 * `SCRIPTURE_READINESS_PROJECT_INTERFACE`, while `syncProjects(undefined)` means "all shared
 * projects already present locally" — those sets can differ, so the delayed sync is not always a
 * no-op. When there genuinely are no local scripture projects, though, it typically has nothing to
 * do.
 *
 * The polling itself is not free even in that case: `includeProjectInterfaces` is applied only
 * AFTER `getMetadataForAllProjectsWithoutRetries` fans out, so every probe still calls
 * `getAvailableProjects` on every registered factory. A workspace with no projects yet therefore
 * pays one fan-out per probe for the life of the budget, at the backoff cadence below.
 *
 * Deliberately uses the unscoped lookup (no `includePdpFactoryIds`) rather than narrowing the probe
 * to just the scripture factory: the Scripture Extender is a layering factory whose
 * `getAvailableProjects` needs to see its base (.NET) factories to answer at all, and
 * `internalGetMetadata` (`project-lookup.service-model.ts`) forwards `includePdpFactoryIds` to the
 * factory it calls AND adds that factory's own id to `excludePdpFactoryIds` — so scoping the probe
 * to the scripture factory would ask it to layer over `{itself} ∧ ¬{itself}`, i.e. nothing, and it
 * would report zero projects forever. The consequence: any OTHER, persistently-failing factory also
 * keeps this probe from ever confirming readiness — bounded by the budget, after which the sync
 * fires anyway (the same fallback as any other unconfirmed readiness), and the same exposure the
 * project picker itself has via its own unscoped `getMetadataForAllProjects` call.
 *
 * The probe runs BEFORE the deadline check so it always gets at least one attempt, even if phase 1
 * consumed the entire budget.
 */
async function pollUntilScriptureMetadataAnswers(
  deadline: number,
  abortSignal?: AbortSignal,
): Promise<WorkspaceReadinessResult> {
  let attempt = 0;
  for (;;) {
    if (abortSignal?.aborted) return { outcome: 'aborted' };
    attempt += 1;

    // Carries this attempt's cause into the deadline branch below, so a deadline reached right after
    // a throwing attempt reports the underlying error instead of the generic "no projects" detail.
    let attemptDetail: string = FACTORY_NOT_REPORTING_PROJECTS_DETAIL;

    try {
      // Intentionally awaiting inside the loop so we probe once at a time.
      // eslint-disable-next-line no-await-in-loop
      const settled = await settleWithin(
        projectLookupService.getMetadataForAllProjectsWithoutRetries({
          // Escaped because `includeProjectInterfaces` compiles to an unanchored `RegExp` matched
          // with `.test()` — an unescaped literal would match as a wildcard/substring rather than
          // exactly. Mirrors `getMetadataForProject`'s own `escapeStringRegexp` use for this same
          // field, so both phases key off the same exact-match predicate.
          includeProjectInterfaces: [escapeStringRegexp(SCRIPTURE_READINESS_PROJECT_INTERFACE)],
        }),
        deadline,
        abortSignal,
      );
      if (settled === ABORTED) return { outcome: 'aborted' };
      if (settled === TIMED_OUT)
        return { outcome: 'timed-out', detail: FACTORY_NOT_REPORTING_PROJECTS_DETAIL };
      // A quit can land while the probe above was in flight: re-check right after it settles so a
      // late quit is honored instead of reporting a stale 'ready' the app is already shutting down.
      if (abortSignal?.aborted) return { outcome: 'aborted' };
      if (settled.length > 0) return { outcome: 'ready' };
      if (shouldLogProbeAttempt(attempt))
        logger.debug(
          `Startup sync readiness: scripture factory is registered but reports no projects yet (attempt ${attempt}); retrying`,
        );
    } catch (e) {
      // Re-check abort first, for the same reason as phase 1's catch: a quit landing in the same
      // tick as the probe's rejection must be honored as 'aborted', not reported as 'timed-out'.
      if (abortSignal?.aborted) return { outcome: 'aborted' };
      // A probe that throws this early in boot means "not answering yet", not "broken" — the
      // factory's fan-out to the .NET provider can legitimately fail or time out while that
      // process is still coming up. Retry within the budget rather than giving up.
      attemptDetail = getErrorMessage(e);
      if (shouldLogProbeAttempt(attempt))
        logger.debug(
          `Startup sync readiness: project metadata probe failed on attempt ${attempt}; retrying: ${attemptDetail}`,
        );
    }

    // Same reasoning as the re-check above, for the deadline branch: a quit landing while a probe
    // was in flight (whether it resolved empty or threw) must be honored as 'aborted', not reported
    // as a stale 'timed-out'.
    if (abortSignal?.aborted) return { outcome: 'aborted' };
    if (performance.now() >= deadline) return { outcome: 'timed-out', detail: attemptDetail };

    // Backs off the same way `requestSessionSyncWithBootRetry` does in `startup-tasks.ts`: the
    // common case (the factory answers within the first few seconds) polls at the shared cadence,
    // and only the long tail backs off further.
    const intervalMs =
      attempt <= INITIAL_READINESS_POLL_ATTEMPTS
        ? INITIAL_READINESS_POLL_INTERVAL_MS
        : EXTENDED_READINESS_POLL_INTERVAL_MS;
    // Intentionally awaiting inside the loop so we wait a bit before probing again.
    // eslint-disable-next-line no-await-in-loop
    const raced = await settleWithin(wait(intervalMs), deadline, abortSignal);
    if (raced === ABORTED) return { outcome: 'aborted' };
    if (raced === TIMED_OUT) return { outcome: 'timed-out', detail: attemptDetail };
  }
}

/**
 * Waits, bounded, until this workspace can list scripture projects — i.e. until the scripture PDP
 * factory has registered and answers a metadata request.
 *
 * Never throws and never waits unbounded. Callers treat `'timed-out'` as "proceed anyway"; its
 * `detail` names a short, log-safe cause (safe at info/warn, including in packaged builds).
 */
export async function waitForScriptureWorkspaceReady(
  options: WorkspaceReadinessOptions = {},
): Promise<WorkspaceReadinessResult> {
  const { abortSignal, timeoutMs = STARTUP_SYNC_READINESS_BUDGET_MS } = options;
  // Monotonic, not wall-clock: this runs during OS cold boot, exactly when the wall clock gets
  // stepped (fresh boot, dual-boot RTC skew, VM resume).
  const deadline = performance.now() + timeoutMs;

  if (abortSignal?.aborted) return { outcome: 'aborted' };

  const registration = await waitForScriptureFactoryRegistration(deadline, abortSignal);
  if (registration.outcome !== 'ready') return registration;

  return pollUntilScriptureMetadataAnswers(deadline, abortSignal);
}
