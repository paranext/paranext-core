import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { getFirstRunStatus, subscribeToFirstRun } from '@renderer/services/first-run-store';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { Tour, TourStep } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

// NOTE ON THE TRIGGER: `getFirstRunStatus()` returns `{ kind: 'app' }` for EVERY already-onboarded
// user (seeded from the completion cache at module load), not only for someone who just finished
// the wizard — there is no wizard-completed edge to detect. So this shows once to anyone in Simple
// mode who has not yet seen it (new users after the wizard, existing users on their next launch),
// then never again thanks to the localStorage flag. That is the intended behavior.

const TOUR_DONE_KEY = 'platform-bible.onboardingTourComplete';

const LOCALIZE_KEYS: LocalizeKey[] = [
  '%onboardingTour_step_project_title%',
  '%onboardingTour_step_project_description%',
  '%onboardingTour_step_modelText_title%',
  '%onboardingTour_step_modelText_description%',
  '%onboardingTour_step_resources_title%',
  '%onboardingTour_step_resources_description%',
  '%onboardingTour_step_sendReceive_title%',
  '%onboardingTour_step_sendReceive_description%',
  '%onboardingTour_step_profile_title%',
  '%onboardingTour_step_profile_description%',
  '%onboardingTour_button_next%',
  '%onboardingTour_button_back%',
  '%onboardingTour_button_skip%',
  '%onboardingTour_button_done%',
];

function readTourDoneFlag(): boolean {
  try {
    return localStorage.getItem(TOUR_DONE_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeTourDoneFlag(): void {
  try {
    localStorage.setItem(TOUR_DONE_KEY, 'true');
  } catch {
    // Best-effort; a failed write just shows the tour again next launch.
  }
}

/**
 * One-shot Simple-mode orientation tour. Shows five spotlight stops once per user (see the trigger
 * note above), then never shows again (persisted in localStorage). Renders nothing if:
 *
 * - The user is in Power mode
 * - The app is not yet unlocked (`firstRunStatus.kind !== 'app'` — still loading or in the wizard)
 * - The tour has already been completed or skipped
 *
 * RTL is handled entirely inside `Tour` (logical `start`/`end` sides resolved via
 * `readDirection()`); this component never reads layout direction.
 */
export function OnboardingTour() {
  const isPowerMode = useIsPowerMode();
  const firstRunStatus = useSyncExternalStore(subscribeToFirstRun, getFirstRunStatus);
  const [tourDone, setTourDone] = useState(readTourDoneFlag);

  const [strings] = useLocalizedStrings(LOCALIZE_KEYS);

  const handleFinish = useCallback(() => {
    writeTourDoneFlag();
    setTourDone(true);
  }, []);

  const steps: TourStep[] = useMemo(
    () => [
      {
        target: '[data-dockid="simple-panel-project"]',
        title: strings['%onboardingTour_step_project_title%'] ?? '',
        description: strings['%onboardingTour_step_project_description%'] ?? '',
        side: 'end',
      },
      {
        target: '[data-dockid="simple-panel-model-text"]',
        title: strings['%onboardingTour_step_modelText_title%'] ?? '',
        description: strings['%onboardingTour_step_modelText_description%'] ?? '',
        side: 'end',
      },
      {
        target: '[data-dockid="simple-panel-resources"]',
        title: strings['%onboardingTour_step_resources_title%'] ?? '',
        description: strings['%onboardingTour_step_resources_description%'] ?? '',
        side: 'start',
      },
      {
        target: '[data-testid="toolbar-sync-button"]',
        title: strings['%onboardingTour_step_sendReceive_title%'] ?? '',
        description: strings['%onboardingTour_step_sendReceive_description%'] ?? '',
        side: 'bottom',
      },
      {
        target: '[data-testid="user-profile-popover-trigger"]',
        title: strings['%onboardingTour_step_profile_title%'] ?? '',
        description: strings['%onboardingTour_step_profile_description%'] ?? '',
        side: 'bottom',
      },
    ],
    [strings],
  );

  const isOpen = !isPowerMode && firstRunStatus.kind === 'app' && !tourDone;

  return (
    <Tour
      steps={steps}
      open={isOpen}
      onDone={handleFinish}
      onSkip={handleFinish}
      nextLabel={strings['%onboardingTour_button_next%']}
      backLabel={strings['%onboardingTour_button_back%']}
      skipLabel={strings['%onboardingTour_button_skip%']}
      doneLabel={strings['%onboardingTour_button_done%']}
    />
  );
}

export default OnboardingTour;
