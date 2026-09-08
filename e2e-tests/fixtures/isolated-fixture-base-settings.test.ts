/**
 * Unit test for the settings `isolated.fixture`'s `electronApp` pins before every test-scoped
 * launch, before the spec's own `seedSettings` is spread over them.
 *
 * The registration reminder is the one entry here with a non-obvious reason to be pinned: unlike
 * `interfaceMode`/`interfaceLanguage`, it is not read at boot — it gates an async background
 * recheck (`first-run-store.ts`'s `startBackgroundRegistrationRecheck`) that can fire once a spec's
 * own `seedSettings` sets `firstRunComplete: true`, and replace an already-loaded app with the
 * first-run wizard's re-registration step. Pinned here as plain data so a regression (the key
 * silently dropped, or its value flipped) is caught without booting Electron.
 */
import { describe, expect, it } from 'vitest';
import { isolatedFixtureBaseSettings } from './helpers';

describe('isolatedFixtureBaseSettings', () => {
  it('pins the registration reminder off, alongside the interface language and requested mode', () => {
    expect(isolatedFixtureBaseSettings('power')).toStrictEqual({
      'platform.interfaceMode': 'power',
      'platform.interfaceLanguage': ['en'],
      'platform.showRegistrationReminderOnStartup': false,
    });
  });

  it('carries the same registration-reminder suppression in simple mode', () => {
    expect(isolatedFixtureBaseSettings('simple')).toStrictEqual({
      'platform.interfaceMode': 'simple',
      'platform.interfaceLanguage': ['en'],
      'platform.showRegistrationReminderOnStartup': false,
    });
  });
});
