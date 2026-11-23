import { FirstRunDecision, FirstRunFacts } from './first-run.model';

/**
 * Pure startup decision. Runs once at startup (simple mode only) to pick the wizard entry point;
 * the shell then handles in-wizard navigation. The full truth table is exercised in
 * first-run.reducer.test.ts.
 *
 * The wizard opens straight at the Sync step whenever a first sync is possible right now (the
 * internet choice was saved, internet is on, and the registration is valid) and Send/Receive is
 * available — whether or not setup was ever finished (a finished setup only while its first sync is
 * pending). A completed first run goes to the app whenever it is not reopened at the Sync step: the
 * earlier steps could trap it (the internet step's only way forward turns internet on, and Identify
 * needs a valid registration), and the consent gate keeps automatic syncs waiting. Otherwise an
 * unfinished first run starts at the first step, even when a registration already exists (e.g.
 * copied from Paratext 9) — the wizard shows those values for the user to confirm; such a user
 * never answered the internet question in this app, so they cannot sync yet and still see the first
 * steps. The one other exception is the launch right after a restart the wizard itself triggered
 * (to apply a registration or changed internet settings), which resumes at sync consent so the user
 * doesn't click through the steps they just finished.
 */
export function decideFirstRun({
  firstRunComplete,
  wizardActive,
  registrationValidity,
  wizardJustRestarted,
  firstSyncRequired,
  sendReceiveAvailable,
  canSyncNow,
}: FirstRunFacts): FirstRunDecision {
  if (firstRunComplete && !(firstSyncRequired && canSyncNow)) return { action: 'showApp' };
  if (registrationValidity === 'unknown') return { action: 'waitForRegistration' };
  if (sendReceiveAvailable && canSyncNow) return { action: 'startWizard', step: 'syncConsent' };
  if (registrationValidity === 'valid' && wizardActive && wizardJustRestarted)
    return { action: 'startWizard', step: 'syncConsent' };
  return { action: 'startWizard', step: 'language' };
}
