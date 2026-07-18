import { settingsService } from '@shared/services/settings.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { INTERFACE_MODE_CACHE_KEY } from '@renderer/hooks/use-interface-mode.hook';
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
const SYNC_SKIPPED_KEY = 'platform-bible.firstRunSyncSkipped'; // written when the user skips sync consent; read by a later ticket to offer sync from the home screen

// INTERFACE_MODE_CACHE_KEY is imported from use-interface-mode.hook.ts (the canonical writer) so
// the two files share one string literal — a silent mismatch can never cause a startup routing bug.
function readCachedInterfaceMode(): 'simple' | 'power' | undefined {
  try {
    const raw = localStorage.getItem(INTERFACE_MODE_CACHE_KEY);
    if (raw === 'power' || raw === 'simple') return raw;
  } catch {
    // localStorage unavailable
  }
  return undefined;
}

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

function computeInitialStatus(): FirstRunStatus {
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
    // Only cache on a successful read — never let a failed read overwrite a valid cached value.
    if (readSucceeded) writeBooleanFlag(FIRST_RUN_COMPLETE_CACHE_KEY, firstRunComplete);
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
  if (options?.syncSkipped) writeBooleanFlag(SYNC_SKIPPED_KEY, true);
  await markFirstRunComplete();
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
