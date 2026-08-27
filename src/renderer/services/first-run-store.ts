import { settingsService } from '@shared/services/settings.service';
import { logger } from '@shared/services/logger.service';
import { localizationService } from '@shared/services/localization.service';
import { getCurrentLocale, getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { readCachedInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';
import { decideFirstRun } from './first-run.reducer';
import { FirstRunStep } from './first-run.model';
import {
  publishRegistrationValidity,
  refreshRegistrationValidity,
} from './registration-validity-store';
import { pickBestSetupLanguage } from './pick-best-setup-language';

/** What the app should currently render for first-run gating. */
export type FirstRunStatus =
  | { kind: 'loading' }
  | { kind: 'app' }
  | { kind: 'wizard'; step: FirstRunStep; allowContinueWithoutRegistration?: boolean }
  | { kind: 'error' };

const FIRST_RUN_COMPLETE_CACHE_KEY = 'platform-bible.firstRunComplete';
const WIZARD_ACTIVE_KEY = 'platform-bible.firstRunWizardActive';
// Written when the user skips sync consent and cleared once the durable setting is confirmed.
// The actual auto-sync gate lives in startup-tasks.ts (main process) and reads
// platform.syncOnStartup — see completeFirstRun and the self-heal block in resolveInternal.
// This localStorage cache is renderer-only; it is a one-time recovery hint, not the gate signal.
const SYNC_ON_STARTUP_DISABLED_CACHE_KEY = 'platform-bible.syncOnStartupDisabled';
// Demo/UX enablement only (PT-4219). When set, the wizard launches from the top without touching
// the real registration backend or triggering a relaunch, and completion is NOT persisted so the
// click-through re-runs on every launch. Toggle from devtools:
//   localStorage.setItem('platform-bible.firstRunDemoMode', 'true')
// Never set in shipped builds; remove/gate before release along with the rest of PT-4219.
const DEMO_MODE_KEY = 'platform-bible.firstRunDemoMode';
// Written by the Identify step immediately before calling platform.restart(). On the next startup,
// resolveInternal reads and consumes it to guard against transient 'invalid' responses from the
// registration backend: the user just registered, so 'invalid' is almost certainly a server fluke.
const JUST_REGISTERED_KEY = 'platform-bible.firstRunJustRegistered';

// Guards startBackgroundRegistrationRecheck so the completed-user re-check runs at most once per
// startup even if resolveInternal is re-entered (e.g. via retryFirstRunResolution).
let backgroundRecheckStarted = false;

// Remembers that JUST_REGISTERED_KEY was set when this startup began. The durable flag is a
// one-shot spent on the first read, but a startup can ask about registration more than once (the
// Retry button re-enters resolveInternal), and the transient 'invalid' the flag exists to absorb
// can just as easily land on the retry as on the first probe. See consumeJustRegisteredFlag.
let justRegisteredThisStartup = false;

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

/**
 * Records that the user just registered successfully and the app is about to restart. On the next
 * startup, `resolveInternal` reads and clears this flag, using it to guard against a transient
 * 'invalid' response from the registration backend that would otherwise mis-route the user back to
 * the language step instead of resuming at sync consent.
 */
export function markJustRegistered(): void {
  writeBooleanFlag(JUST_REGISTERED_KEY, true);
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
// Bumped when a resolution starts or a user action (continue-without-setup from the loading
// watchdog) supersedes an in-flight one, so a late-settling resolveInternal can't clobber the
// newer status. See applyStatus in resolveInternal.
let resolutionGeneration = 0;

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

/**
 * On a fresh wizard start, default the interface language to the OS language when it has enough
 * setup-dialog localization (i.e. it qualifies for the picker). Best-effort: any failure leaves the
 * wizard in English. The caller guarantees this only runs on the fresh-start path, so it never
 * overrides a language the user has already chosen. Skips the write when the OS match already
 * equals the current primary language (e.g. an English OS), to avoid a redundant set + re-render.
 */
async function seedInterfaceLanguageFromOsLocale(): Promise<void> {
  try {
    const qualifying = await localizationService.getSetupDialogLanguages();
    const best = pickBestSetupLanguage(getCurrentLocale(), Object.keys(qualifying));
    if (!best) return;
    const current = await settingsService.get('platform.interfaceLanguage');
    const currentPrimary =
      !isPlatformError(current) && Array.isArray(current) && current.length > 0 ? current[0] : 'en';
    if (best === currentPrimary) return;
    await settingsService.set('platform.interfaceLanguage', [best]);
  } catch (e) {
    logger.warn(`Could not default interface language to the OS locale: ${getErrorMessage(e)}`);
  }
}

async function resolveInternal(generation: number): Promise<void> {
  // True once a user action superseded this run mid-flight (e.g. "continue without setup" from the
  // loading watchdog while a slow probe was still awaiting). Gates both the in-memory status update
  // AND the durable wizard-resume writes below (WIZARD_ACTIVE_KEY, firstRunComplete), so a
  // late-settling run can neither clobber the user's status nor persist state that would resume the
  // wizard at the wrong step on the next launch. Note the interface-language seed is only guarded at
  // its boundaries: a bail landing inside seedInterfaceLanguageFromOsLocale's own awaits can still
  // write platform.interfaceLanguage — that's harmless (it just sets the OS-matched UI language and
  // never resumes the wizard), so the guard checks before and after the seed rather than atomically.
  const isSuperseded = (): boolean => generation !== resolutionGeneration;
  const applyStatus = (next: FirstRunStatus): void => {
    if (!isSuperseded()) setStatus(next);
  };
  try {
    // Demo/UX mode (PT-4219): bypass the real registration backend + relaunch entirely and drop the
    // user straight into the wizard from the top. Enablement only — never on in shipped builds.
    // Deliberately writes NO persisted flags: demo always restarts at `language` and never reads
    // WIZARD_ACTIVE_KEY, so leaving it unset keeps a later real first-run on the same profile from
    // wrongly resuming at the sync-consent step.
    if (isDemoMode()) {
      applyStatus({ kind: 'wizard', step: 'language' });
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
      applyStatus({ kind: 'app' });
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
      // Self-heal: if the settings write for syncOnStartup failed at wizard completion,
      // re-attempt it so the next startup correctly skips auto-sync. Clear the hint once the
      // durable setting is confirmed (written or already there) so we don't pay a settings round-trip
      // on every subsequent startup. Don't clear on failure — retry next launch.
      if (readBooleanFlag(SYNC_ON_STARTUP_DISABLED_CACHE_KEY)) {
        try {
          const syncOnStartup = await settingsService.get('platform.syncOnStartup');
          if (isPlatformError(syncOnStartup) || syncOnStartup !== false) {
            await settingsService.set('platform.syncOnStartup', false);
          }
          writeBooleanFlag(SYNC_ON_STARTUP_DISABLED_CACHE_KEY, false);
        } catch (e) {
          logger.warn(`Self-heal write of platform.syncOnStartup failed: ${getErrorMessage(e)}`);
        }
      }
      applyStatus({ kind: 'app' });
      // Completed Simple-mode user: re-check registration in the background (not awaited) so a
      // registration that has since become invalid can re-raise the wizard without regressing
      // startup latency. Simple-mode is guaranteed here (non-simple returned early above).
      startBackgroundRegistrationRecheck();
      return;
    }

    const wizardActive = readBooleanFlag(WIZARD_ACTIVE_KEY);
    // Consume the just-registered flag before resolving validity: the user set it just before
    // calling platform.restart(), so 'invalid' here is almost certainly a transient backend fluke.
    const justRegistered = consumeJustRegisteredFlag();
    const registrationValidity = await refreshRegistrationValidity();
    const effectiveValidity =
      justRegistered && registrationValidity === 'invalid' ? 'valid' : registrationValidity;
    // Record the answer the gate acted on, not the raw probe, so the reminder dot starts the session
    // agreeing with the just-registered suppression decided here. A later forced re-check (opening
    // the profile popover) can still re-probe past it.
    // See `adr-registration-validity-once-per-session`.
    if (effectiveValidity !== registrationValidity) publishRegistrationValidity(effectiveValidity);
    const decision = decideFirstRun({
      firstRunComplete: false,
      wizardActive,
      registrationValidity: effectiveValidity,
    });

    // The registration probe above is the long await where the watchdog reveals the escape hatch, so
    // it's where a "continue without setup" bail most likely lands. If that superseded us, the user
    // is already in the app — skip the switch entirely so none of its persisted writes run. (Every
    // durable write below sits in this switch; the reads/writes before the probe complete before the
    // watchdog's reveal threshold, so they aren't reachable after a bail.)
    if (isSuperseded()) return;

    switch (decision.action) {
      case 'completeThenShowApp':
        await markFirstRunComplete();
        applyStatus({ kind: 'app' });
        break;
      case 'waitForRegistration':
        applyStatus({ kind: 'error' });
        break;
      case 'startWizard':
        // Fresh start at the language step: default to the OS language if it has enough setup-dialog
        // localization. `wizardActive` here is the pre-transition value, so this runs once and never
        // overrides a choice a returning user already made. Seeding the setting *before* setStatus
        // means the wizard's localized strings resolve straight to the OS language — the live-render
        // bridge never has to fire a change. (The very first synchronous render still shows the
        // English defaults that useLocalizedStrings/useSetting return before their async fetch
        // resolves; that brief default-then-resolve is the same for the English case, so seeding
        // introduces no new flash.)
        if (!wizardActive && decision.step === 'language') {
          await seedInterfaceLanguageFromOsLocale();
          // seedInterfaceLanguageFromOsLocale is another await a bail could land across; re-check so
          // WIZARD_ACTIVE_KEY isn't persisted for a run the user already superseded.
          if (isSuperseded()) return;
        }
        writeBooleanFlag(WIZARD_ACTIVE_KEY, true);
        applyStatus({ kind: 'wizard', step: decision.step });
        break;
      default:
        // 'showApp' is unreachable here: we pass firstRunComplete: false above (the real flag was
        // checked and returned early). Defensive fallback.
        applyStatus({ kind: 'app' });
        break;
    }
  } catch (e) {
    logger.warn(`resolveFirstRunState failed: ${getErrorMessage(e)}`);
    applyStatus({ kind: 'error' });
  }
}

// Clears the `resolving` guard even if resolveInternal throws.
async function runResolution(): Promise<void> {
  resolving = true;
  resolutionGeneration += 1;
  const generation = resolutionGeneration;
  try {
    await resolveInternal(generation);
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

/**
 * Reads and clears the just-registered flag, returning whether it was set at any point during this
 * startup. The fresh-user startup path and the completed-user background re-check each consume it —
 * a transient 'invalid' on the launch right after a re-register is treated as a backend fluke, not
 * a re-nag.
 *
 * Clearing the durable flag and remembering the answer are deliberately separate. The flag grants
 * exactly one launch of trust and must not survive into the next one, so it is cleared on the first
 * read. But within that launch the answer has to outlive the read: an `'unknown'` probe routes the
 * user to the "couldn't verify" screen without ever using the flag, and the transient `'invalid'`
 * it was meant to absorb then arrives on the Retry — which, unguarded, mis-routes a user who just
 * registered successfully back to the language step instead of resuming at sync consent.
 */
function consumeJustRegisteredFlag(): boolean {
  if (readBooleanFlag(JUST_REGISTERED_KEY)) {
    writeBooleanFlag(JUST_REGISTERED_KEY, false);
    justRegisteredThisStartup = true;
  }
  return justRegisteredThisStartup;
}

/**
 * For an already-onboarded Simple-mode user, re-check registration validity in the background —
 * never awaited, never blocks startup. Only a definitive `'invalid'` raises the wizard at the
 * `identify` step so the user can re-register; a down/slow backend resolves to `'unknown'` and is
 * ignored, so an outage never re-onboards an established user (the key safety property). Honors
 * `platform.showRegistrationReminderOnStartup` (default `true`): when explicitly `false`, does
 * nothing. Runs at most once per startup and swallows all its own errors so it can never block or
 * crash startup.
 */
async function startBackgroundRegistrationRecheck(): Promise<void> {
  if (backgroundRecheckStarted) return;
  backgroundRecheckStarted = true;
  try {
    // Consume the just-registered flag once per startup, before any early return, so a suppressed
    // launch can't leave it stale (which could later swallow a legitimate wizard raise).
    const justRegistered = consumeJustRegisteredFlag();
    let reminderSuppressed = false;
    try {
      const value = await settingsService.get('platform.showRegistrationReminderOnStartup');
      // Only an explicit `false` suppresses; a missing/errored/default value keeps showing.
      reminderSuppressed = !isPlatformError(value) && value === false;
    } catch (e) {
      logger.warn(
        `Could not read platform.showRegistrationReminderOnStartup: ${getErrorMessage(e)}`,
      );
    }
    if (reminderSuppressed) {
      // This path consumed the one-shot just-registered flag above but returns before probing, so
      // without this the flag is spent for nothing: the toolbar's own probe would publish the
      // transient 'invalid' and nag all session about a registration the user just fixed. Matches
      // what resolveInternal and IdentifyStep already do.
      // See `adr-registration-validity-once-per-session`.
      if (justRegistered) publishRegistrationValidity('valid');
      return;
    }
    const validity = await refreshRegistrationValidity();
    // Only a definitive 'invalid' raises the wizard; 'valid'/'unknown' leave the user in the app.
    if (validity !== 'invalid') return;
    // Suppress a single post-re-register transient 'invalid'; a still-invalid next launch re-raises.
    if (justRegistered) {
      // Match the suppression above so the reminder dot doesn't nag on the one launch right after
      // re-registering. See `adr-registration-validity-once-per-session`.
      publishRegistrationValidity('valid');
      return;
    }
    setStatus({ kind: 'wizard', step: 'identify', allowContinueWithoutRegistration: true });
  } catch (e) {
    logger.warn(`Background registration re-check failed: ${getErrorMessage(e)}`);
  }
}

/**
 * Finish the wizard: persist completion, clear the active marker, reveal the app.
 *
 * @param options.skippedStep - The step that was skipped to end the wizard early (e.g.
 *   `'syncConsent'`). The store persists any step-specific preference: for `syncConsent`, writes
 *   `platform.syncOnStartup=false` so startup-tasks skips auto-sync on subsequent launches. Write
 *   is best-effort: a failure is logged but does not block wizard completion.
 */
export async function completeFirstRun(options?: { skippedStep?: FirstRunStep }): Promise<void> {
  // Unlike continueWithoutRegistration, this doesn't bump resolutionGeneration: completeFirstRun is
  // only reachable from the wizard UI, which renders after resolveInternal already set 'wizard' and
  // returned — so no resolution is in flight whose late result could clobber this status.
  // Demo/UX mode: reveal the app but persist nothing, so the click-through re-runs on next launch.
  if (isDemoMode()) {
    setStatus({ kind: 'app' });
    return;
  }
  // Write firstRunComplete FIRST so a crash between the two writes leaves the wizard closed and
  // sync enabled (safe fail) rather than sync permanently disabled from an aborted session.
  await markFirstRunComplete();
  if (options?.skippedStep === 'syncConsent') {
    writeBooleanFlag(SYNC_ON_STARTUP_DISABLED_CACHE_KEY, true);
    // Persist durably as a platform setting so the main-process startup-tasks can read it.
    try {
      await settingsService.set('platform.syncOnStartup', false);
      writeBooleanFlag(SYNC_ON_STARTUP_DISABLED_CACHE_KEY, false); // clear once confirmed
    } catch (e) {
      logger.warn(`Failed to persist platform.syncOnStartup: ${getErrorMessage(e)}`);
    }
  } else {
    // Clear any stale hint so a future startup's self-heal can't incorrectly disable sync.
    writeBooleanFlag(SYNC_ON_STARTUP_DISABLED_CACHE_KEY, false);
  }
  setStatus({ kind: 'app' });
}

/**
 * Enter the app without completing onboarding — e.g. the registration backend is unreachable and
 * the user chooses to proceed anyway from the error screen. Persists nothing (no completion flag),
 * so the first-run wizard shows again on the next launch, when the backend may be reachable. Until
 * then the user is in simple mode with no project and cannot open projects/resources.
 */
export function continueWithoutRegistration(): void {
  // Supersede any in-flight resolution (the user may reach this from the loading watchdog while a
  // slow probe is still awaiting) so its late result can't override this choice.
  resolutionGeneration += 1;
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
  backgroundRecheckStarted = false;
  justRegisteredThisStartup = false;
  listeners.clear();
}
