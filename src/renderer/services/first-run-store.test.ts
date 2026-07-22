import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { settingsService } from '@shared/services/settings.service';
import * as resolver from './resolve-registration-validity';
import {
  completeFirstRun,
  continueWithoutRegistration,
  getFirstRunStatus,
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

const mockGet = vi.mocked(settingsService.get);
const mockSet = vi.mocked(settingsService.set);
const mockResolveReg = vi.mocked(resolver.resolveRegistrationValidity);

/** SettingsService.get is keyed; return the right value per setting. */
function stubSettings({ mode = 'simple', firstRunComplete = false } = {}) {
  // @ts-expect-error ts(2345) - mock returns a narrower type than the full SettingTypes union
  mockGet.mockImplementation(async (key: string) => {
    if (key === 'platform.interfaceMode') return mode;
    if (key === 'platform.firstRunComplete') return firstRunComplete;
    return undefined;
  });
}

// This suite deliberately uses the real (jsdom) localStorage rather than a mock: the cache
// read/write behavior IS the unit under test here (seed-from-cache, no-clobber-on-read-failure,
// self-heal), so mocking it would only re-assert the mock. jsdom's localStorage is a synchronous
// in-memory map, so these stay effectively as fast as a mock — no real I/O.
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  // @ts-expect-error ts(2345) - mock returns undefined but DataProviderUpdateInstructions is boolean | string | ...
  mockSet.mockResolvedValue(undefined);
  resetFirstRunStore();
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
    stubSettings({ firstRunComplete: true });
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

  it('resumes at sync consent after the registration relaunch (wizardActive persisted)', async () => {
    localStorage.setItem('platform-bible.firstRunWizardActive', 'true');
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('valid');
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'wizard', step: 'syncConsent' });
    expect(mockSet).not.toHaveBeenCalled(); // not completed yet
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
  });

  it('does not falsely gate a completed user when the setting read fails (no cache clobber)', async () => {
    localStorage.setItem('platform-bible.firstRunComplete', 'true'); // cached complete
    resetFirstRunStore(); // re-seed status from the cache we just set
    mockGet.mockImplementation(async (key: string) => {
      if (key === 'platform.interfaceMode') return 'simple';
      throw new Error('settings unavailable'); // firstRunComplete read fails
    });
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(localStorage.getItem('platform-bible.firstRunComplete')).toBe('true'); // not clobbered
    expect(mockResolveReg).not.toHaveBeenCalled();
  });

  it('does not re-onboard a completed user when a prior completion write failed to persist', async () => {
    // Reproduces the failed-write loop: completion set the cache to `true` but settingsService.set
    // threw, so the setting on disk is still `false`. A later *successful* read returns that `false`.
    // The gate must trust the protective cached `true`, keep the user in the app, and re-attempt the
    // persist — not clobber the cache to `false` and replay the wizard.
    localStorage.setItem('platform-bible.firstRunComplete', 'true'); // cache from a completion whose set() failed
    resetFirstRunStore();
    stubSettings({ firstRunComplete: false }); // setting on disk still false; read succeeds
    await resolveFirstRunState();
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(localStorage.getItem('platform-bible.firstRunComplete')).toBe('true'); // not clobbered
    expect(mockResolveReg).not.toHaveBeenCalled(); // never routed back into the wizard
    expect(mockSet).toHaveBeenCalledWith('platform.firstRunComplete', true); // self-heal retry
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
    await completeFirstRun({ syncSkipped: true });
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockSet).not.toHaveBeenCalled();
    expect(localStorage.getItem('platform-bible.firstRunComplete')).toBeNull();
    expect(localStorage.getItem('platform-bible.firstRunSyncSkipped')).toBeNull();
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

  it('records a sync-skipped hint when skipping', async () => {
    await completeFirstRun({ syncSkipped: true });
    expect(localStorage.getItem('platform-bible.firstRunSyncSkipped')).toBe('true');
  });

  it('persists platform.firstRunSyncSkipped when sync is skipped', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    await resolveFirstRunState();
    await completeFirstRun({ syncSkipped: true });
    expect(mockSet).toHaveBeenCalledWith('platform.firstRunSyncSkipped', true);
  });

  it('does not write platform.firstRunSyncSkipped when sync is not skipped', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    await resolveFirstRunState();
    await completeFirstRun();
    expect(mockSet).not.toHaveBeenCalledWith('platform.firstRunSyncSkipped', expect.anything());
  });

  it('still completes first run even when persisting syncSkipped throws', async () => {
    stubSettings({ firstRunComplete: false });
    mockResolveReg.mockResolvedValue('invalid');
    await resolveFirstRunState();
    // Make the syncSkipped write fail, but the firstRunComplete write succeed
    // @ts-expect-error ts(2345) - mock returns undefined but DataProviderUpdateInstructions is boolean | string | ...
    mockSet.mockImplementation(async (key: string) => {
      if (key === 'platform.firstRunSyncSkipped') throw new Error('write failed');
      return undefined;
    });
    await completeFirstRun({ syncSkipped: true });
    expect(getFirstRunStatus()).toEqual({ kind: 'app' });
    expect(mockSet).toHaveBeenCalledWith('platform.firstRunComplete', true);
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
