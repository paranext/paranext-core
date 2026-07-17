import { settingsService } from '@shared/services/settings.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
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
const SYNC_SKIPPED_KEY = 'platform-bible.firstRunSyncSkipped';

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
  // Seed from the cached completion flag so already-onboarded users never see a gate flash, and
  // fresh users see a neutral loading gate (not the app) until the wizard resolves.
  return readBooleanFlag(FIRST_RUN_COMPLETE_CACHE_KEY) ? { kind: 'app' } : { kind: 'loading' };
}

let status: FirstRunStatus = computeInitialStatus();
// Dedupes duplicate resolve calls (e.g. React StrictMode double-invoking the startup effect).
let resolvePromise: Promise<void> | undefined;

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

function setStatus(next: FirstRunStatus): void {
  status = next;
  notifyListeners();
}

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
      case 'showApp':
      default:
        setStatus({ kind: 'app' });
        break;
    }
  } catch (e) {
    logger.warn(`resolveFirstRunState failed: ${getErrorMessage(e)}`);
    setStatus({ kind: 'error' });
  }
}

/**
 * Resolves the first-run gating status once at startup. Idempotent: duplicate calls (e.g. React
 * StrictMode's double effect invocation) share one in-flight resolution.
 */
export async function resolveFirstRunState(): Promise<void> {
  if (!resolvePromise) resolvePromise = resolveInternal();
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
  setStatus({ kind: 'loading' });
  resolvePromise = resolveInternal();
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
  listeners.clear();
}
