import { FirstRunDecision, FirstRunFacts } from './first-run.model';

/**
 * Pure startup decision. Runs once at startup (simple mode only) to pick the wizard entry point;
 * the shell then handles in-wizard navigation. The full truth table is exercised in
 * first-run.reducer.test.ts.
 *
 * An unfinished first run always starts at the first step, even when a registration already exists
 * (e.g. copied from Paratext 9) — the wizard shows those values for the user to confirm. The one
 * exception is the launch right after the wizard's own "Save and restart", which resumes at sync
 * consent so the user doesn't click through the steps they just finished.
 */
export function decideFirstRun({
  firstRunComplete,
  wizardActive,
  registrationValidity,
  justRegistered,
}: FirstRunFacts): FirstRunDecision {
  if (firstRunComplete) return { action: 'showApp' };
  if (registrationValidity === 'unknown') return { action: 'waitForRegistration' };
  if (registrationValidity === 'valid' && wizardActive && justRegistered)
    return { action: 'startWizard', step: 'syncConsent' };
  return { action: 'startWizard', step: 'language' };
}
