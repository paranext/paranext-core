/** The navigable wizard steps shown in the step indicator (see `NUMBERED_STEPS`). */
export type NumberedStep = 'language' | 'internetSettings' | 'identify' | 'syncConsent';

/**
 * All wizard steps. 'syncProgress' is a post-consent interstitial: it is still the last entry in
 * `STEP_ORDER`, but is excluded from the numbered-step count shown in the step indicator.
 */
export type FirstRunStep = NumberedStep | 'syncProgress';

/** Result of checking the user's Paratext registration. `unknown` = the backend hasn't answered. */
export type RegistrationValidity = 'valid' | 'invalid' | 'unknown';

/** What the startup reducer decides should happen, given the persisted facts. */
export type FirstRunDecision =
  | { action: 'showApp' }
  | { action: 'waitForRegistration' }
  | { action: 'startWizard'; step: FirstRunStep };

/** The persisted/queried facts the reducer decides from. */
export interface FirstRunFacts {
  firstRunComplete: boolean;
  wizardActive: boolean;
  registrationValidity: RegistrationValidity;
  /**
   * The wizard restarted the app immediately before this launch — to apply a registration it saved,
   * or changed internet settings (a one-launch flag).
   */
  wizardJustRestarted: boolean;
  /**
   * The Sync step must be shown (again) because no Send/Receive has succeeded yet. Always false
   * when Send/Receive is unavailable.
   */
  firstSyncRequired: boolean;
  /** Send/Receive exists in this build and backend. */
  sendReceiveAvailable: boolean;
  /**
   * A first sync could start right now: the internet choice was saved, internet is on, and the
   * registration is valid.
   */
  canSyncNow: boolean;
}
