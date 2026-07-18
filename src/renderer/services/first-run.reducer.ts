import { FirstRunDecision, FirstRunFacts } from './first-run.model';

/**
 * Pure startup decision. Runs once at startup (simple mode only) to pick the wizard entry point;
 * the shell then handles in-wizard navigation. The full truth table is exercised in
 * first-run.reducer.test.ts.
 */
export function decideFirstRun({
  firstRunComplete,
  wizardActive,
  registrationValidity,
}: FirstRunFacts): FirstRunDecision {
  if (firstRunComplete) return { action: 'showApp' };
  if (registrationValidity === 'unknown') return { action: 'waitForRegistration' };
  if (registrationValidity === 'valid') {
    // W distinguishes "just registered via the wizard (resume)" from "pre-existing install".
    return wizardActive
      ? { action: 'startWizard', step: 'syncConsent' }
      : { action: 'completeThenShowApp' };
  }
  // registrationValidity === 'invalid': onboarding not done — (re)start at the front.
  return { action: 'startWizard', step: 'language' };
}
