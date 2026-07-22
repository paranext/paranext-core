import { settingsService } from '@shared/services/settings.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { readCachedInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';
import { decideFirstRun } from './first-run.reducer';
import { FirstRunStep } from './first-run.model';
import { resolveRegistrationValidity } from './resolve-registration-validity';

/** What the app should currently render for first-run gating. */
export type FirstRunStatus =
  | { kind: 'loading' }
  | { kind: 'app' }
  | { kind: 'wizard'; step: FirstRunStep }
  | { kind: 'error' };

const FIRST_RUN_COMPLETE_CACHE_KEY = 'platform-bible.firstRunComplete';
const WIZARD_ACTIVE_KEY = 'platform-bible.firstRunWizardActive';
// Written when the user skips sync consent. TODO(PT-4178): no production reader yet, so skipping
// currently only suppresses the in-wizard sync — the next-launch auto-sync in startup-tasks.ts
// still fires. PT-4178 (Sync consent) owns making "skip" durably suppress future auto-sync; note
// that reader lives in the MAIN process, which cannot read this renderer localStorage flag, so the
// durable signal must be a platform setting (e.g. platform.firstRunSyncSkipped), not this cache.
const SYNC_SKIPPED_KEY = 'platform-bible.firstRunSyncSkipped';
// Demo/UX enablement only (PT-4219). When set, the wizard launches from the top without touching
// the real registration backend or triggering a relaunch, and completion is NOT persisted so the
// click-through re-runs on every launch. Toggle from devtools:
//   localStorage.setItem('platform-bible.firstRunDemoMode', 'true')
// Never set in shipped builds; remove/gate before release along with the rest of PT-4219.
const DEMO_MODE_KEY = 'platform-bible.firstRunDemoMode';

function readBooleanFlag(key: string): boolean {
  try {
    return localStorage.getItem(key) === 'true';
  } catch {
    // localStorage may be unavailable (sandboxed/test envs); treat as false.
    return false;
  }
}

function writeBooleanFlag(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, value ? 'true' : 'false');
  } catch {
    // Best-effort cache; a failed write just means the next startup re-resolves from scratch.
  }
}

/** Demo/UX mode — see {@link DEMO_MODE_KEY}. Enablement only; never true in shipped builds. */
export function isDemoMode(): boolean {
  return readBooleanFlag(DEMO_MODE_KEY);
}

function computeInitialStatus(): FirstRunStatus {
  // Demo mode always resolves into the wizard, so don't seed 'app' from a stale completion cache
  // (which would flash the app before resolveInternal routes back to the wizard).
  if (isDemoMode()) return { kind: 'loading' };
  // Power mode is never gated, and already-onboarded simple users are done — seed 'app' for both so
  // neither flashes the gate before the async settings read resolves. Fresh/unknown → loading gate.
  if (readCachedInterfaceMode() === 'power') return { kind: 'app' };
  return readBooleanFlag(FIRST_RUN_COMPLETE_CACHE_KEY) ? { kind: 'app' } : { kind: 'loading' };
}

let status: FirstRunStatus = computeInitialStatus();
// resolvePromise dedupes startup calls (React StrictMode double-invoke); resolving guards
// retryFirstRunResolution from starting a second run while one is already in flight.
let resolvePromise: Promise<void> | undefined;
let resolving = false;

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

function setStatus(next: FirstRunStatus): void {
  status = next;
  notifyListeners();
}

/**
 * Returns the current first-run gating status. Safe to call before `resolveFirstRunState` settles:
 * returns `{ kind: 'loading' }` (or `{ kind: 'app' }` seeded from cache for already-onboarded
 * users) until resolution completes.
 */
export function getFirstRunStatus(): FirstRunStatus {
  return status;
}

/** Subscribe to status changes. Returns an unsubscribe function. */
export function subscribeToFirstRun(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

async function markFirstRunComplete(): Promise<void> {
  try {
    await settingsService.set('platform.firstRunComplete', true);
  } catch (e) {
    logger.warn(`Failed to persist platform.firstRunComplete: ${getErrorMessage(e)}`);
  }
  writeBooleanFlag(FIRST_RUN_COMPLETE_CACHE_KEY, true);
  writeBooleanFlag(WIZARD_ACTIVE_KEY, false);
}

async function resolveInternal(): Promise<void> {
  try {
    // Demo/UX mode (PT-4219): bypass the real registration backend + relaunch entirely and drop the
    // user straight into the wizard from the top. Enablement only — never on in shipped builds.
    // Deliberately writes NO persisted flags: demo always restarts at `language` and never reads
    // WIZARD_ACTIVE_KEY, so leaving it unset keeps a later real first-run on the same profile from
    // wrongly resuming at the sync-consent step.
    if (isDemoMode()) {
      setStatus({ kind: 'wizard', step: 'language' });
      return;
    }

    let interfaceMode: string | undefined;
    try {
      interfaceMode = await settingsService.get('platform.interfaceMode');
    } catch (e) {
      logger.warn(`Could not read platform.interfaceMode: ${getErrorMessage(e)}`);
      // Fall back to the cached mode so a transient read failure on cold startup doesn't
      // route a power-mode user into the wizard (leaves interfaceMode undefined if no cache).
      interfaceMode = readCachedInterfaceMode();
    }
    if (interfaceMode !== undefined && interfaceMode !== 'simple') {
      setStatus({ kind: 'app' });
      return;
    }

    let firstRunComplete: boolean;
    let readSucceeded = false;
    try {
      const value = await settingsService.get('platform.firstRunComplete');
      firstRunComplete = !isPlatformError(value) && value === true;
      readSucceeded = true;
    } catch (e) {
      // Don't clobber the cache on a transient read failure — falsely writing `false` could gate a
      // completed user. Fall back to the cached value instead.
      logger.warn(`Could not read platform.firstRunComplete; using cache: ${getErrorMessage(e)}`);
      firstRunComplete = readBooleanFlag(FIRST_RUN_COMPLETE_CACHE_KEY);
    }
    if (readSucceeded) {
      // A completed user whose `settingsService.set` failed to persist leaves the setting `false` on
      // disk but the cache `true` (see markFirstRunComplete). A later *successful* read returns that
      // `false`; blindly caching it would clobber the protective `true` and replay the whole wizard
      // every launch until a write happens to succeed. So when the setting reads `false` but the
      // cache says complete, trust the cache and re-attempt the persist (self-heal) rather than
      // overwriting it. Otherwise cache the freshly-read value (never a failed read — see catch).
      if (!firstRunComplete && readBooleanFlag(FIRST_RUN_COMPLETE_CACHE_KEY)) {
        firstRunComplete = true;
        await markFirstRunComplete();
      } else {
        writeBooleanFlag(FIRST_RUN_COMPLETE_CACHE_KEY, firstRunComplete);
      }
    }
    if (firstRunComplete) {
      setStatus({ kind: 'app' });
      return;
    }

    const wizardActive = readBooleanFlag(WIZARD_ACTIVE_KEY);
    const registrationValidity = await resolveRegistrationValidity();
    const decision = decideFirstRun({
      firstRunComplete: false,
      wizardActive,
      registrationValidity,
    });

    switch (decision.action) {
      case 'completeThenShowApp':
        await markFirstRunComplete();
        setStatus({ kind: 'app' });
        break;
      case 'waitForRegistration':
        setStatus({ kind: 'error' });
        break;
      case 'startWizard':
        writeBooleanFlag(WIZARD_ACTIVE_KEY, true);
        setStatus({ kind: 'wizard', step: decision.step });
        break;
      default:
        // 'showApp' is unreachable here: we pass firstRunComplete: false above (the real flag was
        // checked and returned early). Defensive fallback.
        setStatus({ kind: 'app' });
        break;
    }
  } catch (e) {
    logger.warn(`resolveFirstRunState failed: ${getErrorMessage(e)}`);
    setStatus({ kind: 'error' });
  }
}

// Clears the `resolving` guard even if resolveInternal throws.
async function runResolution(): Promise<void> {
  resolving = true;
  try {
    await resolveInternal();
  } finally {
    resolving = false;
  }
}

/**
 * Resolves the first-run gating status once at startup. Idempotent: duplicate calls (e.g. React
 * StrictMode's double effect invocation) share one in-flight resolution.
 */
export async function resolveFirstRunState(): Promise<void> {
  if (!resolvePromise) resolvePromise = runResolution();
  return resolvePromise;
}

/** Finish the wizard: persist completion, clear the active marker, reveal the app. */
export async function completeFirstRun(options?: { syncSkipped?: boolean }): Promise<void> {
  // Demo/UX mode: reveal the app but persist nothing, so the click-through re-runs on next launch.
  if (isDemoMode()) {
    setStatus({ kind: 'app' });
    return;
  }
  if (options?.syncSkipped) writeBooleanFlag(SYNC_SKIPPED_KEY, true);
  await markFirstRunComplete();
  setStatus({ kind: 'app' });
}

/**
 * Enter the app without completing onboarding — e.g. the registration backend is unreachable and
 * the user chooses to proceed anyway from the error screen. Persists nothing (no completion flag),
 * so the first-run wizard shows again on the next launch, when the backend may be reachable. Until
 * then the user is in simple mode with no project and cannot open projects/resources.
 */
export function continueWithoutRegistration(): void {
  setStatus({ kind: 'app' });
}

/** Re-run resolution after an error (e.g. the Retry button on the "couldn't verify" screen). */
export async function retryFirstRunResolution(): Promise<void> {
  if (resolving) return resolvePromise ?? Promise.resolve();
  setStatus({ kind: 'loading' });
  resolvePromise = runResolution();
  return resolvePromise;
}

/**
 * Resets in-memory store state to match current localStorage. Clears listeners and the resolve
 * dedupe guard.
 *
 * WARNING: Test-only. @internal
 */
export function resetFirstRunStore(): void {
  status = computeInitialStatus();
  resolvePromise = undefined;
  resolving = false;
  listeners.clear();
}
