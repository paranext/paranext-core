import * as commandService from '@shared/services/command.service';
import { settingsService } from '@shared/services/settings.service';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { localizationService } from '@shared/services/localization.service';
import { dataProviderService } from '@shared/services/data-provider.service';
import type { InternetSettings } from 'paratext-registration';
import type { FirstSyncState } from 'papi-shared-types';
import {
  deepEqual,
  getCurrentLocale,
  getErrorMessage,
  isPlatformError,
} from 'platform-bible-utils';
import { readCachedInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';
import { clearBooleanFlag, readBooleanFlag, writeBooleanFlag } from './local-storage-flag.util';
import { decideFirstRun } from './first-run.reducer';
import { FirstRunStep } from './first-run.model';
import {
  publishRegistrationValidity,
  refreshRegistrationValidity,
} from './registration-validity-store';
import { pickBestSetupLanguage } from './pick-best-setup-language';
import { askForInternetUseChoiceIfNeeded } from './internet-use-choice-store';

/** What the app should currently render for first-run gating. */
export type FirstRunStatus =
  | { kind: 'loading' }
  | { kind: 'app' }
  | {
      kind: 'wizard';
      step: FirstRunStep;
      allowContinueWithoutRegistration?: boolean;
      /**
       * The registration was valid when this wizard run started. Language, internet settings and
       * identify then count as already completed (check marks, reachable with Next).
       */
      registrationValidAtStart?: boolean;
      /**
       * The registration is the one Platform.Bible copied from Paratext 9 when it first set up its
       * own folder, and nothing has replaced it since (the data provider forgets the copy whenever
       * the registration changes). Shows the "copied from Paratext 9" banner.
       */
      registrationPreexisting?: boolean;
      /**
       * Send/Receive is available and the user's first sync has not succeeded yet, so the wizard
       * keeps reopening at the Sync step on later launches until it does.
       */
      firstSyncRequired?: boolean;
    }
  | { kind: 'error' };

const FIRST_RUN_COMPLETE_CACHE_KEY = 'platform-bible.firstRunComplete';
const WIZARD_ACTIVE_KEY = 'platform-bible.firstRunWizardActive';
// Mirrors a `platform.firstSyncState` of 'pending' with Send/Receive available, as last seen by
// resolveInternal. A completed setup with this set will reopen the wizard, so startup seeds the
// loading gate instead of the app (see computeInitialStatus).
const FIRST_SYNC_PENDING_CACHE_KEY = 'platform-bible.firstSyncPending';
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
// Written by the Identify step immediately before it restarts the app to apply changed internet
// settings for an already-registered user; consumed on the next startup, which then resumes at sync
// consent — with the same 'invalid' allowance — the way a restart after registering does.
const WIZARD_RESTARTED_KEY = 'platform-bible.firstRunWizardRestarted';

// Guards startBackgroundRegistrationRecheck so the completed-user re-check runs at most once per
// startup even if resolveInternal is re-entered (e.g. via retryFirstRunResolution).
let backgroundRecheckStarted = false;

// The one-launch flags (JUST_REGISTERED_KEY, WIZARD_RESTARTED_KEY) that were set when this startup
// began. See consumeOneLaunchFlag.
const oneLaunchFlagsSetThisStartup = new Set<string>();

// Internet settings only take effect after a restart. The wizard's Internet settings step reports
// the values it first loaded and every value it saves; the Identify step restarts the app when the
// saved values differ from the first ones. In memory only: the restart is what applies the change.
let internetSettingsAtStart: InternetSettings | undefined;
let internetSettingsChangedThisRun = false;

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

/**
 * Records that the wizard is about to restart the app to apply changed internet settings, so the
 * next startup resumes at sync consent instead of the first step.
 */
export function markWizardRestarting(): void {
  writeBooleanFlag(WIZARD_RESTARTED_KEY, true);
}

/**
 * Records the internet settings the wizard's Internet settings step first loaded this run, as the
 * baseline {@link noteInternetSettingsSaved} compares against. Later calls are ignored.
 */
export function noteInternetSettingsLoaded(settings: InternetSettings): void {
  internetSettingsAtStart ??= settings;
}

/**
 * Records internet settings the wizard just saved. They need a restart to take effect unless they
 * are back to what the step first loaded.
 */
export function noteInternetSettingsSaved(settings: InternetSettings): void {
  internetSettingsChangedThisRun =
    internetSettingsAtStart === undefined || !deepEqual(settings, internetSettingsAtStart);
}

/** Whether the internet settings saved in the wizard differ from the ones it started with. */
export function haveInternetSettingsChanged(): boolean {
  return internetSettingsChangedThisRun;
}

function computeInitialStatus(): FirstRunStatus {
  // Demo mode always resolves into the wizard, so don't seed 'app' from a stale completion cache
  // (which would flash the app before resolveInternal routes back to the wizard).
  if (isDemoMode()) return { kind: 'loading' };
  // Power mode is never gated, and already-onboarded simple users are done — seed 'app' for both so
  // neither flashes the gate before the async settings read resolves. Fresh/unknown → loading gate,
  // as is an onboarded user still waiting for a first sync, whom resolution will route back into
  // the wizard.
  if (readCachedInterfaceMode() === 'power') return { kind: 'app' };
  return readBooleanFlag(FIRST_RUN_COMPLETE_CACHE_KEY) &&
    !readBooleanFlag(FIRST_SYNC_PENDING_CACHE_KEY)
    ? { kind: 'app' }
    : { kind: 'loading' };
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
 * Whether `value` is what `platform.interfaceLanguage` holds before anyone has chosen a language:
 * unset, empty, or the default `['en']`. Anything else was set on purpose and must not be
 * replaced.
 */
function isDefaultInterfaceLanguage(value: unknown): boolean {
  if (value === undefined) return true;
  if (!Array.isArray(value)) return false;
  return value.length === 0 || (value.length === 1 && value[0] === 'en');
}

/**
 * On a fresh wizard start, default the interface language to the OS language when it qualifies for
 * the setup-dialog picker (offered, with enough setup-dialog localization). Writes only while the
 * setting is still at its default (see {@link isDefaultInterfaceLanguage}), so a language set before
 * setup is kept. Skips the write when the best match is English, which is already the default.
 * Best-effort: any failure leaves the wizard in English.
 */
async function seedInterfaceLanguageFromOsLocale(): Promise<void> {
  try {
    const current = await settingsService.get('platform.interfaceLanguage');
    if (!isDefaultInterfaceLanguage(current)) return;
    const qualifying = await localizationService.getSetupDialogLanguages();
    const best = pickBestSetupLanguage(getCurrentLocale(), Object.keys(qualifying));
    if (!best || best === 'en') return;
    await settingsService.set('platform.interfaceLanguage', [best]);
  } catch (e) {
    logger.warn(`Could not default interface language to the OS locale: ${getErrorMessage(e)}`);
  }
}

/**
 * Asks whether this build can run Send/Receive. Answers `undefined` when the request rejects (e.g.
 * the backend has not registered the command yet); callers treat that as unavailable.
 */
async function askSendReceiveAvailable(): Promise<boolean | undefined> {
  try {
    return (await commandService.sendCommand('paratextBibleSendReceive.isAvailable')) === true;
  } catch (e) {
    logger.warn(`Could not tell whether Send/Receive is available: ${getErrorMessage(e)}`);
    return undefined;
  }
}

/**
 * Reads `platform.firstSyncState`. A failed read answers `'unknown'`, which counts as synced, so a
 * transient failure never reopens the wizard for a user who finished setup.
 */
async function readFirstSyncState(): Promise<FirstSyncState> {
  try {
    const value = await settingsService.get('platform.firstSyncState');
    if (!isPlatformError(value)) return value;
    logger.warn(`Could not read platform.firstSyncState: ${getErrorMessage(value)}`);
  } catch (e) {
    logger.warn(`Could not read platform.firstSyncState: ${getErrorMessage(e)}`);
  }
  return 'unknown';
}

/**
 * Whether a first sync could run right now as far as the user's own choices go: they saved an
 * internet-use choice in this app and internet access is enabled. The caller adds the registration
 * check. Any failed read answers false.
 *
 * The internet settings the provider reports are the saved ones, which take effect only after a
 * restart. The wizard always restarts after saving changed settings, so by the launch that reads
 * them here the saved and effective values agree.
 */
async function canUseInternetForFirstSync(): Promise<boolean> {
  try {
    const asked = await settingsService.get('platform.internetUseChoiceAsked');
    if (isPlatformError(asked) || asked !== true) return false;
    const provider = await dataProviderService.get(
      'paratextRegistration.internetSettingsDataProvider',
    );
    if (!provider) return false;
    const { permittedInternetUse } = await provider.getInternetSettings(undefined);
    return permittedInternetUse === 'Enabled';
  } catch (e) {
    logger.warn(`Could not tell whether a first sync can run now: ${getErrorMessage(e)}`);
    return false;
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
      // Power mode never shows the wizard, so its internet-use question is asked here instead.
      askForInternetUseChoiceIfNeeded();
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
    const firstSyncState = await readFirstSyncState();
    // Availability can change the outcome only for an unfinished setup or a finished one whose
    // first sync is pending; everyone else goes to the app without waiting for the backend to
    // register the question. `undefined` here means either not asked or the request rejected.
    const earlySendReceiveAnswer =
      !firstRunComplete || firstSyncState === 'pending'
        ? await askSendReceiveAvailable()
        : undefined;
    let sendReceiveAvailable = earlySendReceiveAnswer === true;
    // A user who finished setup is held in the wizard only while a first sync is recorded as
    // pending. 'unknown' means setup finished before the first-sync state existed: that counts as
    // synced, so those users are left alone.
    const isFirstSyncRequired = (available: boolean): boolean =>
      available && (firstRunComplete ? firstSyncState === 'pending' : firstSyncState !== 'synced');
    // Unguarded by isSuperseded, unlike the durable writes below: this cache only mirrors the
    // durable state just read, so writing it after a bail is still correct. A pending state with no
    // availability answer leaves the cache as it was, so a rejected question cannot seed the app
    // for the next launch of a user still waiting for a first sync.
    const rememberFirstSyncPending = (available: boolean | undefined): void => {
      if (firstSyncState !== 'pending') writeBooleanFlag(FIRST_SYNC_PENDING_CACHE_KEY, false);
      else if (available !== undefined) writeBooleanFlag(FIRST_SYNC_PENDING_CACHE_KEY, available);
    };
    rememberFirstSyncPending(earlySendReceiveAnswer);
    // A finished setup whose first sync is pending but whose availability question rejected falls
    // through to the registration probe and asks again below, rather than being let into the app
    // where the tour could be shown and spent before the first sync.
    if (firstRunComplete && (firstSyncState !== 'pending' || earlySendReceiveAnswer === false)) {
      applyStatus({ kind: 'app' });
      // Completed Simple-mode user: re-check registration in the background (not awaited) so a
      // registration that has since become invalid can re-raise the wizard without regressing
      // startup latency. Simple-mode is guaranteed here (non-simple returned early above).
      startBackgroundRegistrationRecheck();
      return;
    }

    const wizardActive = readBooleanFlag(WIZARD_ACTIVE_KEY);
    // Consume the one-launch flags before resolving validity: the wizard set one just before calling
    // platform.restart() with a registration that was valid (just entered, or already there), so
    // 'invalid' here is almost certainly a transient backend fluke.
    const justRegistered = consumeOneLaunchFlag(JUST_REGISTERED_KEY);
    const wizardRestarted = consumeOneLaunchFlag(WIZARD_RESTARTED_KEY);
    const wizardJustRestarted = justRegistered || wizardRestarted;
    const registrationValidity = await refreshRegistrationValidity();
    const effectiveValidity =
      wizardJustRestarted && registrationValidity === 'invalid' ? 'valid' : registrationValidity;
    // Record the answer the gate acted on, not the raw probe, so the reminder dot starts the session
    // agreeing with the suppression decided here. A later forced re-check (opening the profile
    // popover) can still re-probe past it.
    // See `adr-registration-validity-once-per-session`.
    //
    // Deliberately ahead of the supersession check below, unlike every other side effect here. That
    // guard exists to keep a superseded run from making *durable* writes; this is in-memory session
    // state. The flag was already consumed above, so a run that bails out after consuming it and
    // before publishing would spend the suppression without anyone acting on it, and the dot would
    // then contradict a registration the user really did just complete.
    if (effectiveValidity !== registrationValidity) publishRegistrationValidity(effectiveValidity);
    // A cold start can reject the early question before the backend registers it. A registration
    // probe that resolved has just proven the backend is up, so ask again. Treating the rejection as
    // final would leave an unfinished setup unmarked, and finishing it would then look like a setup
    // from before the first-sync state existed — exempt for good. When the probe could not resolve
    // either, the backend is not answering: an unfinished setup waits for the registration whatever
    // the answer, and a finished one goes to the app as it would without Send/Receive.
    if (earlySendReceiveAnswer === undefined && effectiveValidity !== 'unknown') {
      const laterSendReceiveAnswer = await askSendReceiveAvailable();
      sendReceiveAvailable = laterSendReceiveAnswer === true;
      rememberFirstSyncPending(laterSendReceiveAnswer);
    }
    const firstSyncRequired = isFirstSyncRequired(sendReceiveAvailable);
    const canSyncNow =
      sendReceiveAvailable && effectiveValidity === 'valid' && (await canUseInternetForFirstSync());
    const decision = decideFirstRun({
      firstRunComplete,
      wizardActive,
      registrationValidity: effectiveValidity,
      wizardJustRestarted,
      firstSyncRequired,
      sendReceiveAvailable,
      canSyncNow,
    });

    // The registration probe above is the long await where the watchdog reveals the escape hatch, so
    // it's where a "continue without setup" bail most likely lands. If that superseded us, the user
    // is already in the app — skip the switch entirely so none of its persisted writes run. (Every
    // durable write below sits in this switch. The writes before the probe either complete before
    // the watchdog's reveal threshold or, like the first-sync cache, only mirror state just read.)
    if (isSuperseded()) return;

    switch (decision.action) {
      case 'waitForRegistration':
        applyStatus({ kind: 'error' });
        break;
      case 'startWizard': {
        const registrationValidAtStart = effectiveValidity === 'valid';
        const registrationPreexisting =
          registrationValidAtStart && (await isRegistrationCopiedFromParatext9());
        // A newer resolution may have superseded this one while that answer was on its way.
        if (isSuperseded()) return;
        // Fresh start at the language step: default to the OS language if it has enough setup-dialog
        // localization. `wizardActive` here is the pre-transition value, so this runs once per
        // wizard run, and the seed itself never replaces a language already chosen. Seeding the
        // setting *before* setStatus means the wizard's localized strings resolve straight to the
        // OS language — the live-render bridge never has to fire a change. (The very first
        // synchronous render still shows the English defaults that useLocalizedStrings/useSetting
        // return before their async fetch resolves; that brief default-then-resolve is the same
        // for the English case, so seeding introduces no new flash.)
        if (!wizardActive && decision.step === 'language') {
          await seedInterfaceLanguageFromOsLocale();
          // seedInterfaceLanguageFromOsLocale is another await a bail could land across; re-check so
          // WIZARD_ACTIVE_KEY isn't persisted for a run the user already superseded.
          if (isSuperseded()) return;
        }
        if (firstSyncRequired) {
          const pending =
            firstSyncState === 'pending' || (await markFirstSyncPending(isSuperseded));
          if (isSuperseded()) return;
          if (pending) writeBooleanFlag(FIRST_SYNC_PENDING_CACHE_KEY, true);
        }
        writeBooleanFlag(WIZARD_ACTIVE_KEY, true);
        applyStatus({
          kind: 'wizard',
          step: decision.step,
          registrationValidAtStart,
          registrationPreexisting,
          ...(firstSyncRequired && { firstSyncRequired: true }),
        });
        break;
      }
      default:
        // 'showApp' is unreachable here: a completed setup with no first sync required returned
        // early above. Defensive fallback.
        applyStatus({ kind: 'app' });
        break;
    }
  } catch (e) {
    logger.warn(`resolveFirstRunState failed: ${getErrorMessage(e)}`);
    applyStatus({ kind: 'error' });
  }
}

/**
 * Records that the wizard is waiting for the user's first successful sync, unless that sync has
 * already succeeded. Best-effort: a failed read or write is logged and the wizard still opens.
 *
 * The state is re-read right before the write to keep the window short, and nothing is written
 * unless that read returns a real value: a read failure must not turn into overwriting 'synced'.
 * This is still a read-then-write: if the backend records `'synced'` for a sync that finishes in
 * between, this can overwrite it with `'pending'`, and the wizard reopens at the Sync step until
 * the next successful sync. A sync finishing while the wizard is starting is rare, and the cost is
 * one extra sync.
 *
 * @param isSuperseded Whether the resolution that called this was superseded; checked right before
 *   the write
 * @returns Whether the state is now `'pending'`
 */
async function markFirstSyncPending(isSuperseded: () => boolean): Promise<boolean> {
  try {
    const current = await settingsService.get('platform.firstSyncState');
    if (isPlatformError(current)) {
      logger.warn(`Could not read platform.firstSyncState: ${getErrorMessage(current)}`);
      return false;
    }
    if (current === 'synced') return false;
    if (current === 'pending') return true;
    if (isSuperseded()) return false;
    await settingsService.set('platform.firstSyncState', 'pending');
    return true;
  } catch (e) {
    logger.warn(`Could not save platform.firstSyncState: ${getErrorMessage(e)}`);
    return false;
  }
}

/**
 * Asks the data provider whether the registration was copied from Paratext 9 when Platform.Bible
 * first set up its own ParatextData folder. Best-effort: only the banner depends on it, so any
 * failure answers false.
 */
async function isRegistrationCopiedFromParatext9(): Promise<boolean> {
  try {
    return await commandService.sendCommand(
      'paratextRegistration.isRegistrationCopiedFromParatext9',
    );
  } catch (e) {
    logger.warn(
      `Could not tell whether the registration came from Paratext 9: ${getErrorMessage(e)}`,
    );
    return false;
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
 * Reads and clears a one-launch flag the wizard sets just before restarting the app, returning
 * whether it was set at any point during this startup. A transient 'invalid' on that launch is
 * treated as a backend fluke, not a re-nag.
 *
 * Clearing the durable flag and remembering the answer are deliberately separate. The flag grants
 * exactly one launch of trust and must not survive into the next one, so it is cleared on the first
 * read. But within that launch the answer has to outlive the read: an `'unknown'` probe routes the
 * user to the "couldn't verify" screen without ever using the flag, and the transient `'invalid'`
 * it was meant to absorb then arrives on the Retry — which, unguarded, mis-routes a user with a
 * valid registration back to the language step instead of resuming at sync consent.
 */
function consumeOneLaunchFlag(key: string): boolean {
  if (readBooleanFlag(key)) {
    writeBooleanFlag(key, false);
    oneLaunchFlagsSetThisStartup.add(key);
  }
  return oneLaunchFlagsSetThisStartup.has(key);
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
    const justRegistered = consumeOneLaunchFlag(JUST_REGISTERED_KEY);
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
 * Finish the wizard: persist completion, clear the active marker, reveal the app. Persists no sync
 * preference. Persisted completion opens the automatic sync gates, so declining the wizard's sync
 * goes through {@link declineFirstRunSync} instead.
 */
export async function completeFirstRun(): Promise<void> {
  // Unlike continueWithoutRegistration, this doesn't bump resolutionGeneration: completeFirstRun is
  // only reachable from the wizard UI, which renders after resolveInternal already set 'wizard' and
  // returned — so no resolution is in flight whose late result could clobber this status.
  // Demo/UX mode: reveal the app but persist nothing, so the click-through re-runs on next launch.
  if (isDemoMode()) {
    setStatus({ kind: 'app' });
    return;
  }
  await markFirstRunComplete();
  setStatus({ kind: 'app' });
}

/**
 * Finish the wizard by declining its sync ("Don't sync yet"): withhold automatic sync for the rest
 * of this app session, then complete as {@link completeFirstRun} does. Persists no sync preference,
 * so the next launch syncs as usual.
 *
 * The deferral is recorded before completion is persisted, because persisted completion is what
 * opens the automatic sync gates. If the deferral cannot be recorded this throws and completes
 * nothing, so the wizard stays open rather than finishing with every gate open.
 */
export async function declineFirstRunSync(): Promise<void> {
  await sendCommand('platform.deferAutomaticSyncForSession');
  await completeFirstRun();
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

/**
 * Clears every first-run flag this store keeps in `localStorage`, for the developer reset
 * (`platform.resetFirstRun`), which restarts the app right after. Leaves demo mode alone: that is a
 * deliberate developer toggle, not first-run progress.
 */
export function clearFirstRunLocalState(): void {
  [
    FIRST_RUN_COMPLETE_CACHE_KEY,
    FIRST_SYNC_PENDING_CACHE_KEY,
    WIZARD_ACTIVE_KEY,
    JUST_REGISTERED_KEY,
    WIZARD_RESTARTED_KEY,
  ].forEach(clearBooleanFlag);
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
  oneLaunchFlagsSetThisStartup.clear();
  internetSettingsAtStart = undefined;
  internetSettingsChangedThisRun = false;
  listeners.clear();
}
