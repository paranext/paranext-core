import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { getFirstRunStatus, subscribeToFirstRun } from '@renderer/services/first-run-store';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import {
  SIMPLE_PANEL_ID_MODEL_TEXT,
  SIMPLE_PANEL_ID_PROJECT,
  SIMPLE_PANEL_ID_RESOURCES,
} from '@renderer/components/docking/simple-layout.data';
import { Tour, TourStep, TOUR_LOCALIZE_KEYS } from './tour.component';
import {
  getTourReplayCount,
  readTourDone,
  subscribeToTourReplay,
  writeTourDone,
} from './onboarding-tour.store';

// NOTE ON THE TRIGGER: `getFirstRunStatus()` returns `{ kind: 'app' }` for EVERY already-onboarded
// user (seeded from the completion cache at module load), not only for someone who just finished the
// wizard — there is no wizard-completed edge to detect. Possible `kind` values are: `loading`
// (initial), `wizard` (first-run wizard active), `app` (wizard completed or bypassed), `error`
// (status could not be determined). So this tour shows once to anyone in Simple mode who has not
// yet seen it (new users after the wizard, existing users on their next launch), then never again
// on its own thanks to the localStorage flag. That is the intended behavior; Help > Show the tour
// again is the deliberate way back to it.

const STEP_LOCALIZE_KEYS: LocalizeKey[] = [
  '%onboardingTour_step_project_title%',
  '%onboardingTour_step_project_description%',
  '%onboardingTour_step_modelText_title%',
  '%onboardingTour_step_modelText_description%',
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

// The tour's own chrome keys come from Tour itself, so the button/counter half of this list has a
// single source rather than being restated here.
const LOCALIZE_KEYS: LocalizeKey[] = [...STEP_LOCALIZE_KEYS, ...TOUR_LOCALIZE_KEYS];

/** Hook-bearing implementation of the tour — mounted only while the tour might still show. */
function OnboardingTourNotYetDone({ isReplay }: { isReplay: boolean }) {
  const isPowerMode = useIsPowerMode();
  const firstRunStatus = useSyncExternalStore(subscribeToFirstRun, getFirstRunStatus);
  // The persisted flag is re-read every render (it is a cheap synchronous localStorage read)
  // rather than snapshotted in state: an external writer — e.g. the e2e harness suppressing the
  // tour between mount and open — must be honored at the moment the tour would open. The state
  // half only exists to trigger the closing re-render on Done/Skip, since same-document
  // localStorage writes fire no event. A replay skips the flag entirely: the user asked for the
  // tour from the Help menu, which only ever happens after they have already completed it.
  const [finishedThisSession, setFinishedThisSession] = useState(false);
  const tourDone = finishedThisSession || (!isReplay && readTourDone());

  const [strings, isLoading] = useLocalizedStrings(LOCALIZE_KEYS);

  const handleFinish = useCallback(() => {
    writeTourDone();
    setFinishedThisSession(true);
  }, []);

  // Stop order is deliberately semantic — project, then model text, then resources, then the two
  // toolbar controls — and is NOT mirrored for RTL. The sequence follows what a new user needs to
  // understand in order, not where the columns sit on screen; only each card's *placement* is
  // direction-aware (Tour resolves the logical `start`/`end` sides below).
  const steps: TourStep[] = useMemo(
    () => [
      {
        target: `[data-dockid="${SIMPLE_PANEL_ID_PROJECT}"]`,
        title: strings['%onboardingTour_step_project_title%'] ?? '',
        description: strings['%onboardingTour_step_project_description%'] ?? '',
        side: 'start',
        // rc-dock dividers are 2 px wide but transform: scaleX(8) makes them visually 16 px —
        // extending ~7 px into each adjacent panel. spotlightPadding: 1 places the spotlight edge
        // at the divider's visual center so neither adjacent panel bleeds into the lit area.
        spotlightPadding: 1,
      },
      {
        target: `[data-dockid="${SIMPLE_PANEL_ID_MODEL_TEXT}"]`,
        title: strings['%onboardingTour_step_modelText_title%'] ?? '',
        description: strings['%onboardingTour_step_modelText_description%'] ?? '',
        side: 'end',
        spotlightPadding: 1,
      },
      {
        target: `[data-dockid="${SIMPLE_PANEL_ID_RESOURCES}"]`,
        title: strings['%onboardingTour_step_resources_title%'] ?? '',
        description: strings['%onboardingTour_step_resources_description%'] ?? '',
        side: 'start',
        spotlightPadding: 1,
      },
      {
        // TODO(PT-4007): the sync button does not render in the toolbar until this is fixed, and
        // `toolbar-sync-area` is then an empty zero-size wrapper — so Tour skips this stop and the
        // tour runs with four. Nothing here needs to change once the button is back; this note
        // exists so a four-stop tour is recognized as that bug rather than a regression here.
        target: '[data-testid="toolbar-sync-area"]',
        title: strings['%toolbar_sync%'] ?? '',
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

  // The dock layout initializes asynchronously (loadLayout() is a PAPI round-trip that fires after
  // mount). Poll for the project panel before opening the tour so Tour's step filter always runs
  // with the layout already in the DOM — otherwise only the 2 always-present toolbar elements are
  // found and the tour shows just 2 of its 5 steps.
  const mightShow = !isPowerMode && firstRunStatus.kind === 'app' && !tourDone && !isLoading;
  const [layoutReady, setLayoutReady] = useState(
    () => !!document.querySelector(`[data-dockid="${SIMPLE_PANEL_ID_PROJECT}"]`),
  );
  useEffect(() => {
    if (!mightShow) setLayoutReady(false);
  }, [mightShow]);
  useEffect(() => {
    if (!mightShow || layoutReady) return undefined;
    const selector = `[data-dockid="${SIMPLE_PANEL_ID_PROJECT}"]`;
    if (document.querySelector(selector)) {
      setLayoutReady(true);
      return undefined;
    }
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        clearTimeout(timeoutId);
        setLayoutReady(true);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Safety timeout: if the panel never appears (e.g. layout load failure), open the
    // tour anyway after 10 s rather than blocking it forever.
    timeoutId = setTimeout(() => {
      observer.disconnect();
      setLayoutReady(true);
    }, 10_000);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [mightShow, layoutReady]);

  const isOpen = mightShow && layoutReady;

  return (
    <Tour
      steps={steps}
      open={isOpen}
      localizedStrings={strings}
      // Both done and skip persist the flag — the user has seen the tour either way.
      onDone={handleFinish}
      onSkip={handleFinish}
    />
  );
}

/**
 * Simple-mode orientation tour. Shows five spotlight stops once per user (see the trigger note
 * above), then never shows again on its own (persisted in localStorage) — Help > Show the tour
 * again is the one way back to it. Renders nothing if:
 *
 * - The user is in Power mode
 * - The app is not yet unlocked (`firstRunStatus.kind !== 'app'` — still loading or in the wizard)
 * - The tour has already been completed or skipped, and no replay has been requested
 *
 * Completion is recorded on Done and on Skip (Escape routes through Skip), and only then. Quitting
 * or reloading with the tour still open leaves the flag unwritten, so the tour resumes from stop 1
 * on the next launch: a user who never reached the end has not yet been oriented, and the whole
 * point of the tour is that they are.
 *
 * RTL is handled entirely inside `Tour` (logical `start`/`end` sides resolved via
 * `readDirection()`); this component never reads layout direction.
 */
export function OnboardingTour() {
  // Replay requests arrive from the Help menu by way of the onboarding tour service shard. The
  // count is also the remount key, so asking again while the tour is open restarts it from stop 1
  // rather than leaving it wherever it was.
  const replayCount = useSyncExternalStore(subscribeToTourReplay, getTourReplayCount);
  // One-shot gate: for users who completed the tour in an earlier session (the permanent common
  // case), skip mounting the implementation entirely so every launch doesn't pay its localized-
  // strings subscription and first-run/power-mode hooks for a tour that can never show. Read once
  // at mount, since only a replay can reopen the tour after that.
  const [doneAtMount] = useState(readTourDone);
  // React components render nothing via null.
  // eslint-disable-next-line no-null/no-null
  if (doneAtMount && replayCount === 0) return null;
  return <OnboardingTourNotYetDone key={replayCount} isReplay={replayCount > 0} />;
}

export default OnboardingTour;
