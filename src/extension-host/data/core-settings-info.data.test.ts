import { describe, expect, it } from 'vitest';
import { platformSettings, coreSettingsValidators } from './core-settings-info.data';

describe('platform.syncOnStartup setting', () => {
  it('is declared as a hidden setting with a true default', () => {
    const group = Array.isArray(platformSettings) ? platformSettings[0] : platformSettings;
    const setting = group.properties['platform.syncOnStartup'];
    expect(setting).toBeDefined();
    expect(setting?.default).toBe(true);
    expect(setting?.isHidden).toBe(true);
  });

  it('validates that the value is a boolean', async () => {
    const validator = coreSettingsValidators['platform.syncOnStartup'];
    expect(validator).toBeDefined();
    await expect(validator?.(true, false, {})).resolves.toBe(true);
    // The whole point of this case is to feed a NON-boolean past the validator's compile-time
    // `boolean` param and prove the runtime guard rejects it. There's no non-assertion way to do
    // that: any refactor either changes the production signature or drops the runtime-guard coverage.
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- deliberately violating the compile-time type to exercise the runtime type guard
    await expect(validator?.(123 as never, false, {})).resolves.toBe(false);
  });
});

describe('platform.showRegistrationReminderOnStartup setting', () => {
  it('is declared as a visible setting with a true default', () => {
    const group = Array.isArray(platformSettings) ? platformSettings[0] : platformSettings;
    const setting = group.properties['platform.showRegistrationReminderOnStartup'];
    expect(setting).toBeDefined();
    expect(setting?.default).toBe(true);
    // Visible (not hidden) so the user has a settings-UI path to re-enable the reminder after
    // suppressing it from the wizard checkbox.
    expect(setting?.isHidden).toBeUndefined();
  });

  it('validates that the value is a boolean', async () => {
    const validator = coreSettingsValidators['platform.showRegistrationReminderOnStartup'];
    expect(validator).toBeDefined();
    await expect(validator?.(true, true, {})).resolves.toBe(true);
    // Feed a NON-boolean past the compile-time `boolean` param to prove the runtime guard rejects it.
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- deliberately violating the compile-time type to exercise the runtime type guard
    await expect(validator?.(123 as never, true, {})).resolves.toBe(false);
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
