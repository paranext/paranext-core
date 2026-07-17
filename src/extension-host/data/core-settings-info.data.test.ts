import { describe, expect, it } from 'vitest';
import { platformSettings, coreSettingsValidators } from './core-settings-info.data';

describe('platform.firstRunComplete setting', () => {
  it('is declared as a hidden setting with a false default', () => {
    // @ts-expect-error ts(7053) - platformSettings is an array per the implementation
    const group = platformSettings[0];
    const setting = group.properties['platform.firstRunComplete'];
    expect(setting).toBeDefined();
    expect(setting.default).toBe(false);
    expect(setting.isHidden).toBe(true);
  });

  it('validates that the value is a boolean', async () => {
    const validator = coreSettingsValidators['platform.firstRunComplete'];
    expect(validator).toBeDefined();
    // SettingValidator signature is (newValue, currentValue, allChanges).
    await expect(validator?.(true, false, {})).resolves.toBe(true);
    // `as never` satisfies the boolean param type while feeding a non-boolean at runtime.
    await expect(validator?.(123 as never, false, {})).resolves.toBe(false);
  });
});
