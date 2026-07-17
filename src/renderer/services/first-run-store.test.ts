import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { settingsService } from '@shared/services/settings.service';
import * as resolver from './resolve-registration-validity';
import {
  completeFirstRun,
  getFirstRunStatus,
  resetFirstRunStore,
  resolveFirstRunState,
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
    mockResolveReg.mockResolvedValue('valid'); // W is false (localStorage cleared)
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

  it('resumes at sync consent after the registration relaunch (W persisted)', async () => {
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
});

describe('completeFirstRun', () => {
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
});
