import type { LocalizeKey } from 'platform-bible-utils';

/**
 * Every string key the tour's stops request, in stop order. Kept in its own module, free of the
 * component's hooks and services, so a test can read the list without importing the tour (which
 * pulls in PAPI and can open a connection to a running app).
 */
export const STEP_LOCALIZE_KEYS: LocalizeKey[] = [
  '%onboardingTour_step_project_title%',
  '%onboardingTour_step_project_description%',
  '%onboardingTour_step_baseOrModelText_title%',
  '%onboardingTour_step_baseOrModelText_description%',
  '%onboardingTour_step_resources_title%',
  '%onboardingTour_step_resources_description%',
  // The Send/Receive stop's heading reuses the toolbar's own label for the control it spotlights,
  // rather than shipping a third "Sync" for translators alongside %toolbar_sync% and
  // %firstRun_button_sync%.
  '%toolbar_sync%',
  '%onboardingTour_step_sendReceive_description%',
  '%onboardingTour_step_profile_title%',
  '%onboardingTour_step_profile_description%',
];
