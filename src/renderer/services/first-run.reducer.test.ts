import { describe, expect, it } from 'vitest';
import { decideFirstRun } from './first-run.reducer';
import { FirstRunFacts } from './first-run.model';

const facts = (overrides: Partial<FirstRunFacts>): FirstRunFacts => ({
  firstRunComplete: false,
  wizardActive: false,
  registrationValidity: 'invalid',
  wizardJustRestarted: false,
  firstSyncRequired: false,
  sendReceiveAvailable: false,
  canSyncNow: false,
  ...overrides,
});

describe('decideFirstRun', () => {
  it('shows the app when first run is already complete', () => {
    expect(decideFirstRun(facts({ firstRunComplete: true }))).toEqual({ action: 'showApp' });
  });

  it('shows app when first run is complete even if the wizard was active', () => {
    expect(
      decideFirstRun(
        facts({
          firstRunComplete: true,
          wizardActive: true,
          registrationValidity: 'valid',
          wizardJustRestarted: true,
        }),
      ),
    ).toEqual({ action: 'showApp' });
  });

  it('waits while registration validity is unknown', () => {
    expect(decideFirstRun(facts({ registrationValidity: 'unknown' }))).toEqual({
      action: 'waitForRegistration',
    });
  });

  it('starts a fresh unregistered user at the language step', () => {
    expect(decideFirstRun(facts({}))).toEqual({ action: 'startWizard', step: 'language' });
  });

  it('starts an already-registered user (e.g. copied from Paratext 9) at the language step', () => {
    expect(decideFirstRun(facts({ registrationValidity: 'valid' }))).toEqual({
      action: 'startWizard',
      step: 'language',
    });
  });

  it('resumes at sync consent on the launch right after a restart the wizard triggered', () => {
    expect(
      decideFirstRun(
        facts({ registrationValidity: 'valid', wizardActive: true, wizardJustRestarted: true }),
      ),
    ).toEqual({ action: 'startWizard', step: 'syncConsent' });
  });

  it('starts at the language step when a registered user reopens an unfinished wizard', () => {
    // Also covers a wizard-active flag with no restart behind it, e.g. one left from an earlier run.
    expect(decideFirstRun(facts({ registrationValidity: 'valid', wizardActive: true }))).toEqual({
      action: 'startWizard',
      step: 'language',
    });
  });

  it('starts at the language step when the wizard-restarted flag is set without an active wizard', () => {
    expect(
      decideFirstRun(facts({ registrationValidity: 'valid', wizardJustRestarted: true })),
    ).toEqual({
      action: 'startWizard',
      step: 'language',
    });
  });

  it('restarts a mid-wizard, still-unregistered user at the language step', () => {
    expect(decideFirstRun(facts({ wizardActive: true, wizardJustRestarted: true }))).toEqual({
      action: 'startWizard',
      step: 'language',
    });
  });

  describe('first successful sync', () => {
    it('reopens a completed first run at the sync step when the first sync is still required', () => {
      expect(
        decideFirstRun(
          facts({
            firstRunComplete: true,
            firstSyncRequired: true,
            sendReceiveAvailable: true,
            canSyncNow: true,
            registrationValidity: 'valid',
          }),
        ),
      ).toEqual({ action: 'startWizard', step: 'syncConsent' });
    });

    // The earlier steps can trap a finished user: the internet step's only way forward turns
    // internet on, and Identify needs a valid registration. Automatic syncs stay gated meanwhile.
    it.each(['valid', 'invalid'] as const)(
      'shows the app to a completed first run that cannot sync now (registration %s)',
      (registrationValidity) => {
        expect(
          decideFirstRun(
            facts({
              firstRunComplete: true,
              firstSyncRequired: true,
              sendReceiveAvailable: true,
              canSyncNow: false,
              registrationValidity,
            }),
          ),
        ).toEqual({ action: 'showApp' });
      },
    );

    it('starts an unfinished first run at the sync step when it can sync now', () => {
      expect(
        decideFirstRun(
          facts({ sendReceiveAvailable: true, canSyncNow: true, registrationValidity: 'valid' }),
        ),
      ).toEqual({ action: 'startWizard', step: 'syncConsent' });
    });

    it('starts an unfinished first run at the language step when Send/Receive is unavailable', () => {
      expect(
        decideFirstRun(
          facts({ sendReceiveAvailable: false, canSyncNow: true, registrationValidity: 'valid' }),
        ),
      ).toEqual({ action: 'startWizard', step: 'language' });
    });

    it('shows the app when first run is complete and no first sync is required', () => {
      expect(
        decideFirstRun(
          facts({
            firstRunComplete: true,
            firstSyncRequired: false,
            sendReceiveAvailable: true,
            canSyncNow: true,
            registrationValidity: 'valid',
          }),
        ),
      ).toEqual({ action: 'showApp' });
    });

    it('waits for registration when the first sync is required but validity is unknown', () => {
      expect(
        decideFirstRun(
          facts({
            firstRunComplete: true,
            firstSyncRequired: true,
            sendReceiveAvailable: true,
            canSyncNow: true,
            registrationValidity: 'unknown',
          }),
        ),
      ).toEqual({ action: 'waitForRegistration' });
    });
  });
});
