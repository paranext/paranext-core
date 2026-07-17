import { describe, expect, it } from 'vitest';
import { decideFirstRun } from './first-run.reducer';

describe('decideFirstRun', () => {
  it('shows the app when first run is already complete', () => {
    expect(
      decideFirstRun({
        firstRunComplete: true,
        wizardActive: false,
        registrationValidity: 'invalid',
      }),
    ).toEqual({ action: 'showApp' });
  });

  it('waits while registration validity is unknown', () => {
    expect(
      decideFirstRun({
        firstRunComplete: false,
        wizardActive: false,
        registrationValidity: 'unknown',
      }),
    ).toEqual({ action: 'waitForRegistration' });
  });

  it('silently completes for a pre-existing registered user (migration)', () => {
    expect(
      decideFirstRun({
        firstRunComplete: false,
        wizardActive: false,
        registrationValidity: 'valid',
      }),
    ).toEqual({ action: 'completeThenShowApp' });
  });

  it('resumes at sync consent after the registration relaunch', () => {
    expect(
      decideFirstRun({
        firstRunComplete: false,
        wizardActive: true,
        registrationValidity: 'valid',
      }),
    ).toEqual({ action: 'startWizard', step: 'syncConsent' });
  });

  it('starts a fresh user at the language step', () => {
    expect(
      decideFirstRun({
        firstRunComplete: false,
        wizardActive: false,
        registrationValidity: 'invalid',
      }),
    ).toEqual({ action: 'startWizard', step: 'language' });
  });

  it('restarts a mid-wizard, still-unregistered user at the language step', () => {
    expect(
      decideFirstRun({
        firstRunComplete: false,
        wizardActive: true,
        registrationValidity: 'invalid',
      }),
    ).toEqual({ action: 'startWizard', step: 'language' });
  });
});
