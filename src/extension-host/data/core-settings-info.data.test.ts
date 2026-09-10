import { describe, expect, it, vi } from 'vitest';

vi.mock('@extension-host/services/papi-backend.service', () => ({
  localization: {
    getLocalizedString: vi.fn(async () => 'Allowed range is {lowerLimit} to {upperLimit}.'),
  },
}));
vi.mock('@shared/services/localization.service', () => ({
  localizationService: { getAvailableInterfaceLanguages: vi.fn(async () => ({ en: {} })) },
}));

// Import the module under test after the mocks above so its module-level code sees them.
// eslint-disable-next-line import/first
import { coreSettingsValidators, platformSettings } from './core-settings-info.data';

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

describe('content zoom settings', () => {
  it('declares the new Zoom setting first in the General group and the memory setting hidden', () => {
    const [group] = Array.isArray(platformSettings) ? platformSettings : [platformSettings];
    const keys = Object.keys(group.properties);
    expect(keys[0]).toBe('platform.webViewContentZoom');
    expect(group.properties['platform.webViewContentZoom']).toMatchObject({
      label: '%settings_platform_webViewContentZoom_label%',
      description: '%settings_platform_webViewContentZoom_description%',
      default: 1,
    });
    expect(group.properties['platform.webViewContentZoomMemory']).toMatchObject({
      default: {},
      isHidden: true,
    });
  });

  it('validates the default zoom range with a localized message', async () => {
    const validate = coreSettingsValidators['platform.webViewContentZoom'];
    if (!validate) throw new Error('validator missing');
    await expect(validate(1.2, 1, {})).resolves.toBe(true);
    await expect(validate(0.4, 1, {})).rejects.toThrow('Allowed range is 0.5 to 3.');
    await expect(validate(Number.NaN, 1, {})).resolves.toBe(false);
  });

  it('validates the memory as a record of in-range numbers', async () => {
    const validate = coreSettingsValidators['platform.webViewContentZoomMemory'];
    if (!validate) throw new Error('validator missing');
    await expect(
      validate({ 'editor:p1:main': 1.5, 'editor:p1:footnotes': 0.9 }, {}, {}),
    ).resolves.toBe(true);
    await expect(validate({ 'editor:p1:main': 9 }, {}, {})).resolves.toBe(false);
    // @ts-expect-error ts(2322) - intentional bad input
    await expect(validate({ 'editor:p1:main': 'big' }, {}, {})).resolves.toBe(false);
  });

  it('rejects a memory value that is not a plain record of numbers', async () => {
    const validate = coreSettingsValidators['platform.webViewContentZoomMemory'];
    if (!validate) throw new Error('validator missing');
    /* eslint-disable no-null/no-null -- intentionally testing null rejection at runtime */
    // @ts-expect-error ts(2345) - intentional bad input
    await expect(validate(null, {}, {})).resolves.toBe(false);
    // @ts-expect-error ts(2345) - intentional bad input
    await expect(validate([1], {}, {})).resolves.toBe(false);
    // @ts-expect-error ts(2345) - intentional bad input
    await expect(validate('x', {}, {})).resolves.toBe(false);
    // @ts-expect-error ts(2345) - intentional bad input
    await expect(validate(42, {}, {})).resolves.toBe(false);
    /* eslint-enable no-null/no-null */
  });
});
