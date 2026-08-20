import type { MockedFunction } from 'vitest';
import type { settingsService } from '@shared/services/settings.service';

/** The mocked `settingsService.get` a suite drives (`vi.mocked(settingsService.get)`). */
type MockedSettingsGet = MockedFunction<typeof settingsService.get>;

/** Stubbed value meaning "this setting's read rejects" rather than resolving. */
export const READ_THROWS = Symbol('settings read throws');

/** What a stubbed setting answers a read with: the resolved value, or a rejection. */
export type StubbedSettingValue<T> = T | typeof READ_THROWS;

/** The settings the main-process task suites stub, each under the option name the suites use. */
interface SettingsStubValues {
  /** `platform.interfaceMode` */
  mode: string;
  /** `platform.firstRunComplete` */
  firstRunComplete: StubbedSettingValue<boolean>;
  /** `platform.syncOnStartup` */
  syncOnStartup: StubbedSettingValue<boolean>;
}

/**
 * Builds a suite's per-setting stub for the mocked `settingsService.get`. It answers only the
 * settings listed in `defaults` — the ones that suite's code under test reads — and each call may
 * override those values for one test.
 *
 * Per-setting rather than a blanket `mockSettingsGet.mockResolvedValue('simple')`, which is a trap:
 * that answers the `platform.firstRunComplete` read with `'simple'` too, and the consent gate
 * compares against a literal `true`, so it reads as "not complete" — silently disabling sync in
 * every Simple-mode test while the suite stays green.
 *
 * A setting the suite did not list throws instead of resolving `undefined`, so a newly added
 * settings read in the code under test fails loudly here rather than quietly taking whatever branch
 * `undefined` happens to select.
 */
export function createSettingsStub<TOption extends keyof SettingsStubValues>(
  mockSettingsGet: MockedSettingsGet,
  defaults: Pick<SettingsStubValues, TOption>,
): (overrides?: Partial<Pick<SettingsStubValues, TOption>>) => void {
  return (overrides = {}) => {
    const values: Partial<SettingsStubValues> = { ...defaults, ...overrides };
    mockSettingsGet.mockImplementation(async (key: string) => {
      if (key === 'platform.interfaceMode' && values.mode !== undefined) return values.mode;
      if (key === 'platform.firstRunComplete' && values.firstRunComplete !== undefined)
        return answerRead(values.firstRunComplete);
      if (key === 'platform.syncOnStartup' && values.syncOnStartup !== undefined)
        return answerRead(values.syncOnStartup);
      throw new Error(`Unexpected settings key in test stub: ${key}`);
    });
  };
}

/** Resolves a stubbed value, or rejects the read for {@link READ_THROWS}. */
function answerRead(value: StubbedSettingValue<boolean>): boolean {
  if (value === READ_THROWS) throw new Error('read failed');
  return value;
}
