import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { settingsService } from '@shared/services/settings.service';
import { getCurrentLocale } from 'platform-bible-utils';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import * as resolver from './resolve-registration-validity';
import { RegistrationValidity } from './first-run.model';
import {
  getRegistrationValidity,
  resetRegistrationValidityStore,
} from './registration-validity-store';
import {
  completeFirstRun,
  continueWithoutRegistration,
  getFirstRunStatus,
  markJustRegistered,
  resetFirstRunStore,
  resolveFirstRunState,
  retryFirstRunResolution,
} from './first-run-store';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn(), set: vi.fn() },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock('./resolve-registration-validity', () => ({
  REGISTRATION_RESOLVE_TIMEOUT_MS: 15000,
  resolveRegistrationValidity: vi.fn(),
}));
vi.mock('@shared/services/localization.service', () => ({
  localizationService: { getSetupDialogLanguages: vi.fn() },
}));
vi.mock('platform-bible-utils', async (importOriginal) => ({
  ...(await importOriginal<typeof import('platform-bible-utils')>()),
  getCurrentLocale: vi.fn(() => 'en-US'),
}));

const mockGet = vi.mocked(settingsService.get);
const mockSet = vi.mocked(settingsService.set);
const mockResolveReg = vi.mocked(resolver.resolveRegistrationValidity);
const mockGetCurrentLocale = vi.mocked(getCurrentLocale);
const mockGetSetupDialogLanguages = vi.mocked(localizationService.getSetupDialogLanguages);
const mockLogger = vi.mocked(logger);

/** SettingsService.get is keyed; return the right value per setting. */
function stubSettings({
  mode = 'simple',
  firstRunComplete = false,
  showReminder,
}: { mode?: string; firstRunComplete?: boolean; showReminder?: boolean } = {}) {
  // @ts-expect-error ts(2345) - mock returns a narrower type than the full SettingTypes union
  mockGet.mockImplementation(async (key: string) => {
    if (key === 'platform.interfaceMode') return mode;
    if (key === 'platform.firstRunComplete') return firstRunComplete;
    if (key === 'platform.showRegistrationReminderOnStartup') return showReminder;
    // Intentionally leave platform.interfaceLanguage undefined to exercise the 'en' fallback in currentPrimary derivation.
    return undefined;
  });
}

// This suite deliberately uses the real (jsdom) localStorage rather than a mock: the cache
// read/write behavior IS the unit under test here (seed-from-cache, no-clobber-on-read-failure,
// self-heal), so mocking it would only re-assert the mock. jsdom's localStorage is a synchronous
// in-memory map, so these stay effectively as fast as a mock — no real I/O.
beforeEach(() => {
  vi.clearAllMocks();
  mockGetCurrentLocale.mockReturnValue('en-US');
  mockGetSetupDialogLanguages.mockResolvedValue({ en: { autonym: 'English' } });
  localStorage.clear();
  // @ts-expect-error ts(2345) - mock returns undefined but DataProviderUpdateInstructions is boolean | string | ...
  mockSet.mockResolvedValue(undefined);
  resetFirstRunStore();
  // Required, not hygiene: the gate now resolves registration through the shared store, which caches
  // a definitive answer for the session. Without this reset a value cached by one test would be
  // reused by the next, which would silently stop probing and make `mockResolveReg` assertions lie.
  resetRegistrationValidityStore();
});
afterEach(() => localStorage.clear());

describe('resolveFirstRunState', () => {
  it('shows the app immediately in power mode', async () => {
    stubSettings({ mode: 'power' });
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockResolveReg).not.toHaveBeenCalled();
  });

  it('shows the app when first run is already complete', async () => {
    stubSettings({ firstRunComplete: true, showReminder: false }); // suppress background recheck so this stays a unit test of the sync path only
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockResolveReg).not.toHaveBeenCalled();
  });

  it('silently completes for a pre-existing registered user (no wizard)', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('valid'); // wizardActive is false (localStorage cleared)
    await resolveFirstRunState();
    expect(mockSet).toHaveBeenCalledWith('platform.firstRunComplete', true);
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
  });

  it('starts a fresh user at the language step and marks the wizard active', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
    expect(localStorage.getItem('platform-bible.firstRunWizardActive')).toBe('true');
  });

  it('continuing without setup supersedes a slow in-flight resolution (PT-4302)', async () => {
    stubSettings({ firstRunComplete: false });
    // A probe that stays pending until we release it — models the slow-provider window in which the
    // loading watchdog surfaces the "continue without setup" escape hatch.
    let releaseProbe: (validity: RegistrationValidity) => void = () => {};
    mockResolveReg.mockReturnValue(
      new Promise<RegistrationValidity>((resolve) => {
        releaseProbe = resolve;
      }),
    );
    const resolution = resolveFirstRunState();
    // User bails out while the probe is still pending.
    continueWithoutRegistration();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    // The probe now settles to a value that, unguarded, would route to the error screen.
    releaseProbe('unknown');
    await resolution;
    // The late result must not clobber the user's choice.
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
  });

  it('continuing without setup blocks a superseded run from persisting wizard state (PT-4302)', async () => {
    stubSettings({ firstRunComplete: false });
    // Pending probe → the slow-provider window where the watchdog surfaces the escape hatch.
    let releaseProbe: (validity: RegistrationValidity) => void = () => {};
    mockResolveReg.mockReturnValue(
      new Promise<RegistrationValidity>((resolve) => {
        releaseProbe = resolve;
      }),
    );
    const resolution = resolveFirstRunState();
    // User bails out while the probe is still pending.
    continueWithoutRegistration();
    // The probe now settles to 'invalid', which unguarded routes to startWizard(language) and would
    // persist WIZARD_ACTIVE_KEY (and seed the interface language) — resuming the wizard mid-flow on
    // the next launch even though the user chose to skip setup. The generation gate must suppress
    // these durable writes, not just the in-memory status.
    releaseProbe('invalid');
    await resolution;
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(localStorage.getItem('platform-bible.firstRunWizardActive')).toBeNull();
    expect(mockSet).not.toHaveBeenCalledWith('platform.interfaceLanguage', expect.anything());
  });

  it('resumes at sync consent after the registration relaunch (wizardActive persisted)', async () => {
    localStorage.setItem('platform-bible.firstRunWizardActive', 'true');
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('valid');
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'syncConsent' });
    expect(mockSet).not.toHaveBeenCalled(); // not completed yet
  });

  it('resumes at sync consent when the just-registered flag is set and validity returns invalid (transient failure guard)', async () => {
    localStorage.setItem('platform-bible.firstRunWizardActive', 'true');
    localStorage.setItem('platform-bible.firstRunJustRegistered', 'true');
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid'); // transient backend failure after restart
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'syncConsent' });
    // Flag must be consumed so it doesn't persist into a subsequent startup.
    expect(localStorage.getItem('platform-bible.firstRunJustRegistered')).toBe('false');
  });

  it('still routes to the error screen when just-registered is set but validity returns unknown', async () => {
    localStorage.setItem('platform-bible.firstRunWizardActive', 'true');
    localStorage.setItem('platform-bible.firstRunJustRegistered', 'true');
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('unknown');
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'error' });
    // Flag is consumed regardless.
    expect(localStorage.getItem('platform-bible.firstRunJustRegistered')).toBe('false');
  });

  it('surfaces an error when registration validity cannot be resolved', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('unknown');
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'error' });
  });

  it('is idempotent across duplicate startup calls (StrictMode-safe)', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    await Promise.all([resolveFirstRunState(), resolveFirstRunState()]);
    expect(mockResolveReg).toHaveBeenCalledTimes(1);
    // Assert the whole resolution ran once, not just that the probe was deduped: the shared
    // registration-validity store dedupes the probe by itself, so a probe-count assertion alone
    // passes even with this store's guard removed. resolveInternal's settings reads are the part
    // only the guard can prevent from repeating — and with them, its durable writes.
    expect(mockGet.mock.calls.filter(([key]) => key === 'platform.firstRunComplete')).toHaveLength(
      1,
    );
  });

  it('does not falsely gate a completed user when the setting read fails (no cache clobber)', async () => {
    localStorage.setItem('platform-bible.firstRunComplete', 'true'); // cached complete
    resetFirstRunStore(); // re-seed status from the cache we just set
    mockGet.mockImplementation(async (key: string) => {
      if (key === 'platform.interfaceMode') return 'simple';
      if (key === 'platform.showRegistrationReminderOnStartup') return false; // suppress background recheck; focus on cache-fallback path
      throw new Error('settings unavailable'); // firstRunComplete read fails
    });
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(localStorage.getItem('platform-bible.firstRunComplete')).toBe('true'); // not clobbered
    expect(mockResolveReg).not.toHaveBeenCalled(); // background recheck suppressed by showReminder: false
  });

  it('does not re-onboard a completed user when a prior completion write failed to persist', async () => {
    // Reproduces the failed-write loop: completion set the cache to `true` but settingsService.set
    // threw, so the setting on disk is still `false`. A later *successful* read returns that `false`.
    // The gate must trust the protective cached `true`, keep the user in the app, and re-attempt the
    // persist — not clobber the cache to `false` and replay the wizard.
    localStorage.setItem('platform-bible.firstRunComplete', 'true'); // cache from a completion whose set() failed
    resetFirstRunStore();
    stubSettings({ firstRunComplete: false, showReminder: false }); // suppress background recheck; focus on self-heal path
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(localStorage.getItem('platform-bible.firstRunComplete')).toBe('true'); // not clobbered
    expect(mockResolveReg).not.toHaveBeenCalled(); // never routed back into the wizard
    expect(mockSet).toHaveBeenCalledWith('platform.firstRunComplete', true); // self-heal retry
  });

  it('re-persists platform.syncOnStartup when cache indicates a failed write', async () => {
    // Reproduces the analogous failure for skipping sync: the wizard wrote the localStorage cache
    // but settingsService.set threw. A subsequent launch finds firstRunComplete=true but
    // syncOnStartup still true on disk — the self-heal must re-persist from the cache.
    localStorage.setItem('platform-bible.syncOnStartupDisabled', 'true');
    stubSettings({ firstRunComplete: true, showReminder: false }); // suppress background recheck; focus on self-heal path
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockSet).toHaveBeenCalledWith('platform.syncOnStartup', false);
    // Cache cleared after success so subsequent startups skip the settings round-trip.
    expect(localStorage.getItem('platform-bible.syncOnStartupDisabled')).toBe('false');
  });

  it('does not re-persist platform.syncOnStartup when the setting is already persisted', async () => {
    localStorage.setItem('platform-bible.syncOnStartupDisabled', 'true');
    // @ts-expect-error ts(2345) - mock returns a narrower type than the full SettingTypes union
    mockGet.mockImplementation(async (key: string) => {
      if (key === 'platform.interfaceMode') return 'simple';
      if (key === 'platform.firstRunComplete') return true;
      if (key === 'platform.syncOnStartup') return false; // already persisted as false (skip)
      if (key === 'platform.showRegistrationReminderOnStartup') return false; // suppress background recheck
      return undefined;
    });
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockSet).not.toHaveBeenCalledWith('platform.syncOnStartup', expect.anything());
    // Cache cleared even when no write was needed, to avoid future redundant reads.
    expect(localStorage.getItem('platform-bible.syncOnStartupDisabled')).toBe('false');
  });

  it('does not attempt platform.syncOnStartup self-heal when cache says skip never happened', async () => {
    stubSettings({ firstRunComplete: true, showReminder: false }); // suppress background recheck; focus on self-heal path
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockSet).not.toHaveBeenCalledWith('platform.syncOnStartup', expect.anything());
  });
});

describe('markJustRegistered', () => {
  it('writes the just-registered localStorage flag', () => {
    markJustRegistered();
    expect(localStorage.getItem('platform-bible.firstRunJustRegistered')).toBe('true');
  });
});

describe('demo mode (PT-4219)', () => {
  const DEMO_MODE_KEY = 'platform-bible.firstRunDemoMode';

  it('launches the wizard at language and bypasses the registration backend', async () => {
    localStorage.setItem(DEMO_MODE_KEY, 'true');
    resetFirstRunStore();
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
    // Demo must NOT dirty the wizard-active flag: leaving it set would misroute a later real
    // first-run on the same profile to the sync-consent resume step (code-review finding).
    expect(localStorage.getItem('platform-bible.firstRunWizardActive')).toBeNull();
    expect(mockResolveReg).not.toHaveBeenCalled(); // never touches the real backend
    expect(mockGet).not.toHaveBeenCalled(); // no settings reads either
  });

  it('launches the wizard even when interface mode is power and first run is complete', async () => {
    localStorage.setItem(DEMO_MODE_KEY, 'true');
    localStorage.setItem('platform-bible.interfaceMode', 'power');
    localStorage.setItem('platform-bible.firstRunComplete', 'true');
    resetFirstRunStore();
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
  });

  it('seeds loading synchronously (never flashes the app from a stale completion cache)', () => {
    localStorage.setItem(DEMO_MODE_KEY, 'true');
    localStorage.setItem('platform-bible.firstRunComplete', 'true');
    resetFirstRunStore();
    expect(getFirstRunStatus()).toEqual({ kind: 'loading' });
  });

  it('completion reveals the app but persists nothing, so the demo re-runs next launch', async () => {
    localStorage.setItem(DEMO_MODE_KEY, 'true');
    resetFirstRunStore();
    await completeFirstRun({ skippedStep: 'syncConsent' });
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockSet).not.toHaveBeenCalled();
    expect(localStorage.getItem('platform-bible.firstRunComplete')).toBeNull();
    expect(localStorage.getItem('platform-bible.syncOnStartupDisabled')).toBeNull();
  });
});

describe('completeFirstRun', () => {
  it('still shows app and caches flags when settings.set throws', async () => {
    mockSet.mockRejectedValue(new Error('write failed'));
    await completeFirstRun();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(localStorage.getItem('platform-bible.firstRunComplete')).toBe('true');
    expect(localStorage.getItem('platform-bible.firstRunWizardActive')).toBe('false');
  });

  it('persists completion, clears the wizard marker, and shows the app', async () => {
    localStorage.setItem('platform-bible.firstRunWizardActive', 'true');
    await completeFirstRun();
    expect(mockSet).toHaveBeenCalledWith('platform.firstRunComplete', true);
    expect(localStorage.getItem('platform-bible.firstRunWizardActive')).toBe('false');
    expect(localStorage.getItem('platform-bible.firstRunComplete')).toBe('true');
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
  });

  it('clears the sync-disabled cache hint after a successful syncOnStartup write', async () => {
    // The hint is set before the write (crash recovery) and cleared once the write is confirmed.
    // A stale 'true' hint would trigger a redundant self-heal read on every subsequent launch.
    await completeFirstRun({ skippedStep: 'syncConsent' });
    expect(localStorage.getItem('platform-bible.syncOnStartupDisabled')).toBe('false');
  });

  it('persists platform.syncOnStartup=false when sync consent is skipped', async () => {
    await completeFirstRun({ skippedStep: 'syncConsent' });
    expect(mockSet).toHaveBeenCalledWith('platform.syncOnStartup', false);
  });

  it('does not write platform.syncOnStartup when no step was skipped', async () => {
    await completeFirstRun();
    expect(mockSet).not.toHaveBeenCalledWith('platform.syncOnStartup', expect.anything());
  });

  it('clears the sync-disabled hint when no step was skipped', async () => {
    // A stale hint (e.g. from devtools or a prior aborted skip flow) must not trigger the self-heal
    // to set syncOnStartup=false on a user who completed without skipping.
    localStorage.setItem('platform-bible.syncOnStartupDisabled', 'true');
    await completeFirstRun();
    expect(localStorage.getItem('platform-bible.syncOnStartupDisabled')).toBe('false');
  });

  it('writes firstRunComplete before syncOnStartup (crash-safe ordering)', async () => {
    // A crash between the two writes must leave the wizard closed and sync enabled.
    // If the order were swapped, an aborted session would permanently disable sync.
    const callOrder: string[] = [];
    // @ts-expect-error ts(2345) - mock returns undefined but DataProviderUpdateInstructions is boolean | string | ...
    mockSet.mockImplementation(async (key: string) => {
      callOrder.push(key);
      return undefined;
    });

    await completeFirstRun({ skippedStep: 'syncConsent' });

    const completeIdx = callOrder.indexOf('platform.firstRunComplete');
    const skippedIdx = callOrder.indexOf('platform.syncOnStartup');
    expect(completeIdx).toBeGreaterThanOrEqual(0);
    expect(skippedIdx).toBeGreaterThanOrEqual(0);
    expect(completeIdx).toBeLessThan(skippedIdx);
  });

  it('still completes first run even when persisting sync-disabled throws', async () => {
    // Make the syncOnStartup write fail, but the firstRunComplete write succeed
    // @ts-expect-error ts(2345) - mock returns undefined but DataProviderUpdateInstructions is boolean | string | ...
    mockSet.mockImplementation(async (key: string) => {
      if (key === 'platform.syncOnStartup') throw new Error('write failed');
      return undefined;
    });
    await completeFirstRun({ skippedStep: 'syncConsent' });
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockSet).toHaveBeenCalledWith('platform.firstRunComplete', true);
    expect(mockSet).toHaveBeenCalledWith('platform.syncOnStartup', false);
    expect(localStorage.getItem('platform-bible.syncOnStartupDisabled')).toBe('true');
  });
});

describe('retryFirstRunResolution', () => {
  it('two concurrent retry calls only invoke resolveRegistrationValidity once (FIX 1)', async () => {
    // Simulate a slow resolution so the second retry arrives while the first is in-flight.
    stubSettings({ firstRunComplete: false });
    let resolveSlowCall!: () => void;
    mockResolveReg.mockReturnValue(
      new Promise<'invalid'>((resolve) => {
        resolveSlowCall = () => resolve('invalid');
      }),
    );

    const first = retryFirstRunResolution();
    const second = retryFirstRunResolution(); // in-flight, should be a no-op
    resolveSlowCall();
    await Promise.all([first, second]);

    expect(mockResolveReg).toHaveBeenCalledTimes(1);
    // See the StrictMode test above: the probe count alone no longer proves the `resolving` guard
    // works, because the shared store dedupes the probe regardless.
    expect(mockGet.mock.calls.filter(([key]) => key === 'platform.firstRunComplete')).toHaveLength(
      1,
    );
  });

  it('reaches wizard status on a successful retry after an initial error', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('unknown');
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'error' });

    mockResolveReg.mockResolvedValue('invalid');
    await retryFirstRunResolution();
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
  });
});

describe('continueWithoutRegistration', () => {
  it('reveals the app without persisting completion, so the wizard returns next launch', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('unknown'); // backend down → error screen
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'error' });

    continueWithoutRegistration();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockSet).not.toHaveBeenCalled(); // completion NOT persisted
    // The cache may read 'false' (resolveFirstRunState cached the real setting), but must never be
    // 'true' — that is what would suppress the wizard next launch.
    expect(localStorage.getItem('platform-bible.firstRunComplete')).not.toBe('true');
  });
});

describe('background registration re-check (completed simple-mode user)', () => {
  it('raises the wizard at identify when registration is definitively invalid', async () => {
    stubSettings({ firstRunComplete: true, showReminder: true });
    mockResolveReg.mockResolvedValue('invalid');
    await resolveFirstRunState();
    // App shows immediately; the re-check flips status in the background.
    await vi.waitFor(() =>
      expect(getFirstRunStatus()).toEqual({
        kind: 'wizard',
        step: 'identify',
        allowContinueWithoutRegistration: true,
      }),
    );
  });

  it('stays in the app and does not query the backend when the reminder is suppressed', async () => {
    stubSettings({ firstRunComplete: true, showReminder: false });
    mockResolveReg.mockResolvedValue('invalid');
    await resolveFirstRunState();
    // Prove the re-check actually ran (read the setting) before asserting it declined to query.
    await vi.waitFor(() =>
      expect(mockGet).toHaveBeenCalledWith('platform.showRegistrationReminderOnStartup'),
    );
    expect(mockResolveReg).not.toHaveBeenCalled();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
  });

  it('stays in the app when registration is valid', async () => {
    stubSettings({ firstRunComplete: true, showReminder: true });
    mockResolveReg.mockResolvedValue('valid');
    await resolveFirstRunState();
    // Wait until the re-check has actually resolved validity, so this is not a trivial pass.
    await vi.waitFor(() => expect(mockResolveReg).toHaveBeenCalled());
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
  });

  it('stays in the app when registration is unknown (backend down/slow)', async () => {
    stubSettings({ firstRunComplete: true, showReminder: true });
    mockResolveReg.mockResolvedValue('unknown');
    await resolveFirstRunState();
    await vi.waitFor(() => expect(mockResolveReg).toHaveBeenCalled());
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
  });

  it('does not re-raise on the launch right after a successful re-register (justRegistered guard)', async () => {
    stubSettings({ firstRunComplete: true, showReminder: true });
    mockResolveReg.mockResolvedValue('invalid');
    // The Identify step sets this immediately before platform.restart(); a transient 'invalid' on
    // the very next launch must be treated as a fluke, not an immediate re-nag.
    localStorage.setItem('platform-bible.firstRunJustRegistered', 'true');
    await resolveFirstRunState();
    await vi.waitFor(() => expect(mockResolveReg).toHaveBeenCalled());
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    // Flag is consumed, so a *second* startup with a still-invalid registration would re-raise.
    expect(localStorage.getItem('platform-bible.firstRunJustRegistered')).toBe('false');
  });

  it('never runs in power mode', async () => {
    stubSettings({ mode: 'power', firstRunComplete: true, showReminder: true });
    mockResolveReg.mockResolvedValue('invalid');
    await resolveFirstRunState();
    await Promise.resolve();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockResolveReg).not.toHaveBeenCalled();
    // The re-check must never even have started — it should not have read the reminder setting.
    expect(mockGet).not.toHaveBeenCalledWith('platform.showRegistrationReminderOnStartup');
  });

  it('never throws or leaves a broken status when the re-check errors', async () => {
    stubSettings({ firstRunComplete: true, showReminder: true });
    mockResolveReg.mockRejectedValue(new Error('boom'));
    await expect(resolveFirstRunState()).resolves.toBeUndefined();
    await vi.waitFor(() => expect(mockResolveReg).toHaveBeenCalled());
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockLogger.warn).toHaveBeenCalledWith(
      expect.stringContaining('Background registration re-check failed'),
    );
  });

  it('fails open and raises the wizard when the reminder setting read throws', async () => {
    // @ts-expect-error ts(2345) - mock returns a narrower type than the full SettingTypes union
    mockGet.mockImplementation(async (key: string) => {
      if (key === 'platform.interfaceMode') return 'simple';
      if (key === 'platform.firstRunComplete') return true;
      if (key === 'platform.showRegistrationReminderOnStartup')
        throw new Error('settings unavailable');
      return undefined;
    });
    mockResolveReg.mockResolvedValue('invalid');
    await resolveFirstRunState();
    // The read error is logged as a warning.
    await vi.waitFor(() =>
      expect(mockLogger.warn).toHaveBeenCalledWith(
        expect.stringContaining('platform.showRegistrationReminderOnStartup'),
      ),
    );
    // Fail-open: the wizard IS raised (a read error is not a deliberate suppression).
    await vi.waitFor(() =>
      expect(getFirstRunStatus()).toEqual({
        kind: 'wizard',
        step: 'identify',
        allowContinueWithoutRegistration: true,
      }),
    );
  });

  it('raises the wizard when the reminder setting is undefined (default: keep showing)', async () => {
    // showReminder not set → get returns undefined; that is NOT an explicit `false`, so the re-check
    // proceeds and the wizard is raised when registration is invalid.
    stubSettings({ firstRunComplete: true }); // showReminder omitted → undefined
    mockResolveReg.mockResolvedValue('invalid');
    await resolveFirstRunState();
    await vi.waitFor(() =>
      expect(getFirstRunStatus()).toEqual({
        kind: 'wizard',
        step: 'identify',
        allowContinueWithoutRegistration: true,
      }),
    );
  });

  it('consumes the just-registered flag even when the reminder is suppressed', async () => {
    stubSettings({ firstRunComplete: true, showReminder: false });
    mockResolveReg.mockResolvedValue('invalid');
    localStorage.setItem('platform-bible.firstRunJustRegistered', 'true');
    await resolveFirstRunState();
    await vi.waitFor(() =>
      expect(mockGet).toHaveBeenCalledWith('platform.showRegistrationReminderOnStartup'),
    );
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    // Flag consumed once per startup regardless of suppression — not left stale.
    expect(localStorage.getItem('platform-bible.firstRunJustRegistered')).toBe('false');
  });

  it('raises the wizard on the next launch after the one-launch justRegistered guard was spent', async () => {
    // First launch: justRegistered is set → guard fires, wizard NOT raised.
    stubSettings({ firstRunComplete: true, showReminder: true });
    mockResolveReg.mockResolvedValue('invalid');
    localStorage.setItem('platform-bible.firstRunJustRegistered', 'true');
    await resolveFirstRunState();
    await vi.waitFor(() => expect(mockResolveReg).toHaveBeenCalled());
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    // Flag consumed on first launch.
    expect(localStorage.getItem('platform-bible.firstRunJustRegistered')).toBe('false');

    // Simulate a new launch (flag already consumed — reads false this time). A real relaunch is a
    // new process, so every piece of per-process module state has to be cleared — including the
    // registration-validity store, whose whole job is to cache one probe per session. Leaving it
    // would hand this second launch the first launch's suppressed 'valid' instead of re-probing.
    resetFirstRunStore();
    resetRegistrationValidityStore();
    stubSettings({ firstRunComplete: true, showReminder: true });
    mockResolveReg.mockResolvedValue('invalid');
    await resolveFirstRunState();
    // On the second launch the guard is spent, so the wizard IS raised.
    await vi.waitFor(() =>
      expect(getFirstRunStatus()).toEqual({
        kind: 'wizard',
        step: 'identify',
        allowContinueWithoutRegistration: true,
      }),
    );
  });
});

describe('resolveFirstRunState — power mode cache fallback (FIX 3)', () => {
  it('routes a power-mode user to app when the settings read throws but cache says power', async () => {
    localStorage.setItem('platform-bible.interfaceMode', 'power');
    resetFirstRunStore();
    mockGet.mockRejectedValue(new Error('settings unavailable'));
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockResolveReg).not.toHaveBeenCalled();
  });
});

describe('computeInitialStatus — power mode startup gate flash (PT-4175 FIX 1)', () => {
  it('seeds status as app synchronously when cached interface mode is power (no async needed)', () => {
    localStorage.setItem('platform-bible.interfaceMode', 'power');
    resetFirstRunStore(); // recomputes status from computeInitialStatus
    // Assert SYNCHRONOUSLY — no resolveFirstRunState call — to prove it is the initial seed value
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
  });
});

describe('OS-language default on fresh first-run', () => {
  test('defaults the interface language to the OS language when it qualifies', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    mockGetCurrentLocale.mockReturnValue('km-KH');
    mockGetSetupDialogLanguages.mockResolvedValue({
      en: { autonym: 'English' },
      km: { autonym: 'ខ្មែរ' },
    });
    await resolveFirstRunState();
    expect(mockSet).toHaveBeenCalledWith('platform.interfaceLanguage', ['km']);
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
  });

  test('stays in English when the OS language does not qualify', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    mockGetCurrentLocale.mockReturnValue('ja-JP');
    mockGetSetupDialogLanguages.mockResolvedValue({
      en: { autonym: 'English' },
      km: { autonym: 'ខ្មែរ' },
    });
    await resolveFirstRunState();
    // Positive control: the seed path DID run (lookup happened) but correctly declined to write —
    // distinguishes "matcher rejected ja" from "seed never ran".
    expect(mockGetSetupDialogLanguages).toHaveBeenCalled();
    expect(mockSet).not.toHaveBeenCalledWith('platform.interfaceLanguage', expect.anything());
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
  });

  test('stays in English when only English qualifies (early-startup / minimal set)', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    mockGetCurrentLocale.mockReturnValue('km-KH');
    // The qualifying set can be just { en } if the seed runs before extra locales load; the km OS
    // locale then has nothing to match and we stay English without crashing.
    mockGetSetupDialogLanguages.mockResolvedValue({ en: { autonym: 'English' } });
    await resolveFirstRunState();
    expect(mockGetSetupDialogLanguages).toHaveBeenCalled();
    expect(mockSet).not.toHaveBeenCalledWith('platform.interfaceLanguage', expect.anything());
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
  });

  test('does not re-seed when reopening mid-wizard (wizard already active)', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    mockGetCurrentLocale.mockReturnValue('km-KH');
    mockGetSetupDialogLanguages.mockResolvedValue({
      en: { autonym: 'English' },
      km: { autonym: 'ខ្មែរ' },
    });
    localStorage.setItem('platform-bible.firstRunWizardActive', 'true');
    await resolveFirstRunState();
    // Positive control: reopening skips the seed entirely — the lookup must NOT have run, proving the
    // `!wizardActive` guard (not merely a non-matching locale) is what suppressed the write.
    expect(mockGetSetupDialogLanguages).not.toHaveBeenCalled();
    expect(mockSet).not.toHaveBeenCalledWith('platform.interfaceLanguage', expect.anything());
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
  });

  test('still starts the wizard if the OS-default lookup throws', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    mockGetCurrentLocale.mockReturnValue('km-KH');
    mockGetSetupDialogLanguages.mockRejectedValue(new Error('boom'));
    await resolveFirstRunState();
    // Best-effort swallow: warn logged, no language write, wizard still starts.
    expect(mockLogger.warn).toHaveBeenCalled();
    expect(mockSet).not.toHaveBeenCalledWith('platform.interfaceLanguage', expect.anything());
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
  });

  test('skips the write when the OS match equals the current primary language (read as ["en"])', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    mockGetCurrentLocale.mockReturnValue('en-US');
    mockGetSetupDialogLanguages.mockResolvedValue({
      en: { autonym: 'English' },
    });
    // Override the stubSettings mock to return ['en'] for platform.interfaceLanguage.
    // @ts-expect-error ts(2345) - mock returns a narrower type than the full SettingTypes union
    mockGet.mockImplementation(async (key: string) => {
      if (key === 'platform.interfaceMode') return 'simple';
      if (key === 'platform.firstRunComplete') return false;
      if (key === 'platform.interfaceLanguage') return ['en'];
      return undefined;
    });
    await resolveFirstRunState();
    // Prove the seed ran (lookup happened)
    expect(mockGetSetupDialogLanguages).toHaveBeenCalled();
    // but the skip fired because best 'en' === currentPrimary 'en' read from the real array
    expect(mockSet).not.toHaveBeenCalledWith('platform.interfaceLanguage', expect.anything());
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
  });
});

describe('registration validity published to the shared store', () => {
  it('publishes the probe result so registration-dependent UI agrees with the gate', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');

    await resolveFirstRunState();

    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'language' });
    expect(getRegistrationValidity()).toBe('invalid');
  });

  it("publishes 'valid' when the fresh-user path suppresses a just-registered transient 'invalid'", async () => {
    localStorage.setItem('platform-bible.firstRunWizardActive', 'true');
    localStorage.setItem('platform-bible.firstRunJustRegistered', 'true');
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');

    await resolveFirstRunState();

    // The gate treated the transient as valid; the store must not contradict it and re-nag.
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'syncConsent' });
    expect(getRegistrationValidity()).toBe('valid');
  });

  it("publishes 'valid' when the background re-check suppresses a just-registered transient 'invalid'", async () => {
    stubSettings({ firstRunComplete: true, showReminder: true });
    mockResolveReg.mockResolvedValue('invalid');
    localStorage.setItem('platform-bible.firstRunJustRegistered', 'true');

    await resolveFirstRunState();
    await vi.waitFor(() => expect(mockResolveReg).toHaveBeenCalled());

    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    await vi.waitFor(() => expect(getRegistrationValidity()).toBe('valid'));
  });

  it("leaves the store at 'invalid' when the background re-check genuinely raises the wizard", async () => {
    stubSettings({ firstRunComplete: true, showReminder: true });
    mockResolveReg.mockResolvedValue('invalid');

    await resolveFirstRunState();
    await vi.waitFor(() =>
      expect(getFirstRunStatus()).toEqual({
        kind: 'wizard',
        step: 'identify',
        allowContinueWithoutRegistration: true,
      }),
    );

    expect(getRegistrationValidity()).toBe('invalid');
  });

  it("publishes 'valid' when the reminder is suppressed and the user just re-registered", async () => {
    stubSettings({ firstRunComplete: true, showReminder: false });
    localStorage.setItem('platform-bible.firstRunJustRegistered', 'true');

    await resolveFirstRunState();

    // This path never probes, so nothing else can correct the toolbar's own transient 'invalid'.
    // Without the publish the spent flag would leave the dot nagging about a fixed registration.
    await vi.waitFor(() => expect(getRegistrationValidity()).toBe('valid'));
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockResolveReg).not.toHaveBeenCalled();
    expect(localStorage.getItem('platform-bible.firstRunJustRegistered')).toBe('false');
  });

  it('leaves the store alone when the reminder is suppressed and nothing was just registered', async () => {
    stubSettings({ firstRunComplete: true, showReminder: false });

    await resolveFirstRunState();

    expect(getRegistrationValidity()).toBe('unknown');
    expect(mockResolveReg).not.toHaveBeenCalled();
  });

  it("leaves the store at 'unknown' when the probe cannot resolve, so no UI nags", async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('unknown');

    await resolveFirstRunState();

    expect(getFirstRunStatus()).toEqual({ kind: 'error' });
    expect(getRegistrationValidity()).toBe('unknown');
  });
});
