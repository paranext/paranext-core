/**
 * Unit test for the settings `app.fixture` pins before launching its worker-scoped Electron app.
 *
 * The registration reminder is the one entry here with a non-obvious reason to be pinned: unlike
 * `firstRunComplete`/`interfaceMode`/`interfaceLanguage`, it is not read at boot — it gates an
 * async background recheck (`first-run-store.ts`'s `startBackgroundRegistrationRecheck`) that can
 * fire minutes into a worker's lifetime and replace an already-loaded app with the first-run
 * wizard's re-registration step. Pinned here as plain data so a regression (the key silently
 * dropped, or its value flipped) is caught without booting Electron.
 */
import { describe, expect, it } from 'vitest';
import { smokeAppSettingsOverrides } from './helpers';

describe('smokeAppSettingsOverrides', () => {
  it('pins the registration reminder off, alongside first-run and the requested interface mode', () => {
    expect(smokeAppSettingsOverrides('power')).toStrictEqual({
      'platform.firstRunComplete': true,
      'platform.interfaceMode': 'power',
      'platform.interfaceLanguage': ['en'],
      'platform.showRegistrationReminderOnStartup': false,
    });
  });
});
