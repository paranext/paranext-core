import { describe, expect, it } from 'vitest';
import { platformSettings, coreSettingsValidators } from './core-settings-info.data';

describe('platform.firstRunSyncSkipped setting', () => {
  it('is declared as a hidden setting with a false default', () => {
    const group = Array.isArray(platformSettings) ? platformSettings[0] : platformSettings;
    const setting = group.properties['platform.firstRunSyncSkipped'];
    expect(setting).toBeDefined();
    expect(setting?.default).toBe(false);
    expect(setting?.isHidden).toBe(true);
  });

  it('validates that the value is a boolean', async () => {
    const validator = coreSettingsValidators['platform.firstRunSyncSkipped'];
    expect(validator).toBeDefined();
    await expect(validator?.(true, false, {})).resolves.toBe(true);
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- deliberately violating the compile-time type to exercise the runtime type guard
    await expect(validator?.(123 as never, false, {})).resolves.toBe(false);
  });
});

describe('platform.firstRunComplete setting', () => {
  it('is declared as a hidden setting with a false default', () => {
    const group = Array.isArray(platformSettings) ? platformSettings[0] : platformSettings;
    const setting = group.properties['platform.firstRunComplete'];
    expect(setting).toBeDefined();
    expect(setting?.default).toBe(false);
    expect(setting?.isHidden).toBe(true);
  });

  it('validates that the value is a boolean', async () => {
    const validator = coreSettingsValidators['platform.firstRunComplete'];
    expect(validator).toBeDefined();
    // SettingValidator signature is (newValue, currentValue, allChanges).
    await expect(validator?.(true, false, {})).resolves.toBe(true);
    // The whole point of this case is to feed a NON-boolean past the validator's compile-time
    // `boolean` param and prove the runtime guard rejects it. There's no non-assertion way to do
    // that: any refactor either changes the production signature or drops the runtime-guard coverage.
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- deliberately violating the compile-time type to exercise the runtime type guard
    await expect(validator?.(123 as never, false, {})).resolves.toBe(false);
  });
});
