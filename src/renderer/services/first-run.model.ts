/** The four setup steps, in runtime order. */
export type FirstRunStep = 'language' | 'identify' | 'syncConsent' | 'syncProgress';

/** Result of checking the user's Paratext registration. `unknown` = the backend hasn't answered. */
export type RegistrationValidity = 'valid' | 'invalid' | 'unknown';

/** What the startup reducer decides should happen, given the persisted facts. */
export type FirstRunDecision =
  | { action: 'showApp' }
  | { action: 'completeThenShowApp' }
  | { action: 'waitForRegistration' }
  | { action: 'startWizard'; step: FirstRunStep };

/** The three persisted/queried facts the reducer decides from. */
export interface FirstRunFacts {
  firstRunComplete: boolean;
  wizardActive: boolean;
  registrationValidity: RegistrationValidity;
}
