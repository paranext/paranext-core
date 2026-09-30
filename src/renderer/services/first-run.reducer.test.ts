import { describe, expect, it } from 'vitest';
import { decideFirstRun } from './first-run.reducer';
import { FirstRunFacts } from './first-run.model';

const facts = (overrides: Partial<FirstRunFacts>): FirstRunFacts => ({
  firstRunComplete: false,
  wizardActive: false,
  registrationValidity: 'invalid',
  wizardJustRestarted: false,
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
});
