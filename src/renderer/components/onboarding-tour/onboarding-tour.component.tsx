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
  subscribeToTourDone,
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

/**
 * The toolbar's Profile button. The only stop Power mode shares with Simple, so it is both a step
 * target below and what the readiness gate waits for in Power.
 */
const PROFILE_TRIGGER_SELECTOR = '[data-testid="user-profile-popover-trigger"]';

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
  // The persisted flag is subscribed to rather than snapshotted, for two reasons. `readTourDone`
  // as the snapshot keeps it re-read on every render, so an external writer — e.g. the e2e harness
  // suppressing the tour between mount and open — is honored at the moment the tour would open.
  // And subscribing adds the render trigger that read alone lacks: the flag is shared across
  // same-origin renderers, so a window that finishes the tour has to close the overlay in any
  // other window still showing it. That is reachable because nothing collapses a Power user's
  // extra windows when they switch to Simple. A replay skips the flag entirely: the user asked for
  // the tour from the Help menu, which only ever happens after they have already completed it.
  const [finishedThisSession, setFinishedThisSession] = useState(false);
  const persistedTourDone = useSyncExternalStore(subscribeToTourDone, readTourDone);
  const tourDone = finishedThisSession || (!isReplay && persistedTourDone);

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
        // Conditional stop: the sync button it anchors to renders only where Send/Receive is
        // installed, which is Paratext 10 Studio. In plain Platform.Bible `toolbar-sync-area`
        // stays an empty zero-size wrapper, so Tour skips this stop and the tour runs with four —
        // expected there, not a defect. Nothing here changes between the two builds.
        target: '[data-testid="toolbar-sync-area"]',
        title: strings['%toolbar_sync%'] ?? '',
        description: strings['%onboardingTour_step_sendReceive_description%'] ?? '',
        side: 'bottom',
      },
      {
        target: PROFILE_TRIGGER_SELECTOR,
        title: strings['%onboardingTour_step_profile_title%'] ?? '',
        description: strings['%onboardingTour_step_profile_description%'] ?? '',
        side: 'bottom',
      },
    ],
    [strings],
  );

  // Power gets the tour only when the user asks for it. Tour's open-time filter keeps just the
  // stops whose anchors exist, which in Power is the toolbar's Profile button — the columns and the
  // Sync button are Simple-only, and their copy ("only ever one project here", "can't be closed or
  // moved") describes a layout Power does not have. Auto-showing that single stop unprompted to
  // every Power user would be noise, so the unrequested path stays Simple-only.
  const mightShow =
    (!isPowerMode || isReplay) && firstRunStatus.kind === 'app' && !tourDone && !isLoading;
  // What "ready" means depends on the mode, because the modes anchor to different things: Simple
  // waits for the dock layout's project panel, Power for the toolbar button its one stop spotlights.
  // The wait exists because the dock layout initializes asynchronously (loadLayout() is a PAPI
  // round-trip that fires after mount), so Tour's open-time filter would otherwise snapshot a DOM
  // holding only the always-present toolbar elements and drop every column stop. Opening early is
  // not merely ugly at the extreme: Tour reads an empty step list as a skip and persists the done
  // flag, consuming the tour instead of showing it.
  const readySelector = isPowerMode
    ? PROFILE_TRIGGER_SELECTOR
    : `[data-dockid="${SIMPLE_PANEL_ID_PROJECT}"]`;
  const [layoutReady, setLayoutReady] = useState(() => !!document.querySelector(readySelector));
  useEffect(() => {
    if (!mightShow) setLayoutReady(false);
  }, [mightShow]);
  useEffect(() => {
    if (!mightShow || layoutReady) return undefined;
    if (document.querySelector(readySelector)) {
      setLayoutReady(true);
      return undefined;
    }
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const observer = new MutationObserver(() => {
      if (document.querySelector(readySelector)) {
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
  }, [mightShow, layoutReady, readySelector]);

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
