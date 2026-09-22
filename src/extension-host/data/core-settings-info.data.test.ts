import { describe, expect, it, vi } from 'vitest';
// No mocks needed: unlike the module under test below, this one has no module-level code that
// touches the mocked services, so it can be imported normally rather than after the mocks.
import { platformProjectSettings } from './core-project-settings-info.data';

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

const groups = Array.isArray(platformSettings) ? platformSettings : [platformSettings];
const visibleKeys = (group: (typeof groups)[number]) =>
  Object.entries(group.properties)
    .filter(([, p]) => !p.isHidden)
    .map(([key]) => key);

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
    const group = groups[1];
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
  it('declares webViewContentZoom visible with the memory setting hidden', () => {
    const group = groups[0];
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

  it('labels the whole-application zoom with the renamed key, leaving the shipped one for fallback', () => {
    const [group] = Array.isArray(platformSettings) ? platformSettings : [platformSettings];
    expect(group.properties['platform.zoomFactor']).toMatchObject({
      label: '%settings_platform_zoomFactor_label_2%',
    });
  });

  it('validates the default zoom range with a localized message', async () => {
    const validate = coreSettingsValidators['platform.webViewContentZoom'];
    if (!validate) throw new Error('validator missing');
    await expect(validate(1.2, 1, {})).resolves.toBe(true);
    await expect(validate(0.4, 1, {})).rejects.toThrow('Allowed range is 0.5 to 3.');
    await expect(validate(Number.NaN, 1, {})).resolves.toBe(false);
  });

  it('rejects NaN for the whole-UI zoom factor', async () => {
    const validate = coreSettingsValidators['platform.zoomFactor'];
    if (!validate) throw new Error('validator missing');
    await expect(validate(1.2, 1, {})).resolves.toBe(true);
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

  it('no longer declares or validates the per-type zoom-area record', () => {
    const all = groups.flatMap((group) => Object.keys(group.properties));
    // Positive control: the neighbouring content-zoom settings are still declared.
    expect(all).toContain('platform.webViewContentZoomMemory');
    expect(all).not.toContain('platform.webViewContentZoomTypesWithAreas');
    expect(Object.keys(coreSettingsValidators)).not.toContain(
      'platform.webViewContentZoomTypesWithAreas',
    );
  });
});

describe('settings layout', () => {
  it("shows the General group's visible settings in the UX-approved order", () => {
    expect(visibleKeys(groups[0])).toEqual([
      'platform.interfaceLanguage',
      'platform.zoomFactor',
      'platform.webViewContentZoom',
    ]);
  });

  it('puts the supporter settings in their own group', () => {
    expect(groups).toHaveLength(2);
    expect(groups[1].label).toBe('%settings_platform_supporter_group_label%');
    expect(groups[1].description).toBe('%settings_platform_supporter_group_description%');
    expect(visibleKeys(groups[1])).toEqual([
      'platform.requestTimeout',
      'platform.showRegistrationReminderOnStartup',
    ]);
  });

  it("keeps the moved settings' keys, labels and defaults unchanged", () => {
    expect(groups[1].properties['platform.requestTimeout']).toMatchObject({
      label: '%settings_platform_requestTimeout_label%',
      description: '%settings_platform_requestTimeout_description%',
      default: 30,
    });
    expect(groups[1].properties['platform.showRegistrationReminderOnStartup']).toMatchObject({
      label: '%settings_platform_showRegistrationReminderOnStartup_label%',
      description: '%settings_platform_showRegistrationReminderOnStartup_description%',
      default: true,
    });
    expect(coreSettingsValidators['platform.requestTimeout']).toBeDefined();
    expect(coreSettingsValidators['platform.showRegistrationReminderOnStartup']).toBeDefined();
  });

  it('hides the interface mode, which is switched from the profile popover', () => {
    // The Simple/Power toggle lives in user-profile-popover.component.tsx, and the toolbar
    // renders that popover in both modes, so a Settings entry would be a second, redundant switch.
    expect(groups[0].properties['platform.interfaceMode']).toMatchObject({
      label: '%settings_platform_interfaceMode_label%',
      default: 'simple',
      isHidden: true,
    });
  });

  it('declares every setting exactly once across the groups', () => {
    // Named explicitly (rather than a bare length) so adding, removing, or renaming a setting is a
    // deliberate edit to this list instead of a silently-passing count.
    const expectedKeys = [
      'platform.interfaceLanguage',
      'platform.zoomFactor',
      'platform.webViewContentZoom',
      'platform.webViewContentZoomMemory',
      'platform.ptxUtilsMementoData',
      'platform.paratextDataLastRegistryDataCachedTimes',
      'platform.interfaceMode',
      'platform.firstRunComplete',
      'platform.syncOnStartup',
      'platform.requestTimeout',
      'platform.showRegistrationReminderOnStartup',
    ];
    const all = groups.flatMap((group) => Object.keys(group.properties));
    expect(new Set(all).size).toBe(all.length);
    expect(all.sort()).toEqual(expectedKeys.sort());
  });
});

describe('content zoom settings are core (user) settings, never project settings', () => {
  // ProjectSettingsContribution is a single group OR a group array (same shape `platformSettings`
  // itself takes above); `platformProjectSettings` happens to be one group today, but this reads it
  // the same normalized way rather than assuming so.
  const projectSettingGroups = Array.isArray(platformProjectSettings)
    ? platformProjectSettings
    : [platformProjectSettings];

  it('is registered only under platformSettings, with no matching key in platformProjectSettings', () => {
    // Send/Receive's project sync reaches settings registered as ProjectSettingsContribution
    // (`platformProjectSettings`, `core-project-settings-info.data.ts`) — the ScrText-backed keys
    // like `platform.isEditable` and `platform.language`. The content-zoom keys are per-window UI
    // state, registered instead under `platformSettings` (SettingsContribution), a separate
    // registration surface with no project-sync marker of its own. This pins that split by
    // construction: a future edit that moved either key onto `platformProjectSettings` would put
    // per-window zoom state on the one registration surface a project sync can reach.
    expect(groups.some((group) => 'platform.webViewContentZoom' in group.properties)).toBe(true);
    expect(groups.some((group) => 'platform.webViewContentZoomMemory' in group.properties)).toBe(
      true,
    );
    expect(
      projectSettingGroups.some((group) => 'platform.webViewContentZoom' in group.properties),
    ).toBe(false);
    expect(
      projectSettingGroups.some((group) => 'platform.webViewContentZoomMemory' in group.properties),
    ).toBe(false);
  });
});
