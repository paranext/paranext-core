import type { FirstRunStatus } from '@renderer/services/first-run-store';
import {
  SIMPLE_PANEL_ID_MODEL_TEXT,
  SIMPLE_PANEL_ID_PROJECT,
} from '@renderer/components/docking/simple-layout.data';

/**
 * Shared mock harness for the two `OnboardingTour` suites. They exist as separate files because
 * `vi.mock('./tour.component')` is module-scoped and cannot be undone per test — one suite needs
 * the stub to inspect what `OnboardingTour` hands `Tour`, the other needs the real overlay so its
 * keyboard handlers actually run. Everything BELOW that split is the same in both, and hand-copying
 * it meant one contract change to `onboarding-tour.store` had to be mirrored in two factories with
 * nothing checking it was.
 *
 * Vitest gives each test file its own module registry, so the mutable knobs below are per file
 * despite living in a shared module: one suite's `beforeEach` cannot disturb the other's.
 *
 * The `vi.mock` factories that consume these are still written in each test file — `vi.mock` is
 * hoisted above imports, so only the factory _payloads_ can be shared, not the calls themselves.
 */

/** Mutable knobs the mocks read, so each test can set the scenario before rendering. */
export const knobs: {
  firstRunStatus: FirstRunStatus;
  isPowerMode: boolean;
  isLocalizationLoading: boolean;
  tourDone: boolean;
  replayCount: number;
} = {
  firstRunStatus: { kind: 'app' },
  isPowerMode: false,
  isLocalizationLoading: false,
  tourDone: false,
  replayCount: 0,
};

// Mirrors the real store's done-flag subscription, which exists so a write in another window
// reaches this one. Tests drive it through `recordTourDoneElsewhere`.
const tourDoneListeners = new Set<() => void>();
// Stands in for the store's replay channel — a count plus its listeners, exactly as the real one.
const replayListeners = new Set<() => void>();

/** Payload for `vi.mock('@renderer/services/first-run-store', …)`. */
export function firstRunStoreMock() {
  return {
    getFirstRunStatus: () => knobs.firstRunStatus,
    subscribeToFirstRun: () => () => {},
  };
}

/** Payload for `vi.mock('./onboarding-tour.store', …)`. Mirrors the real module's export surface. */
export function tourStoreMock() {
  return {
    readTourDone: () => knobs.tourDone,
    writeTourDone: () => {
      knobs.tourDone = true;
      tourDoneListeners.forEach((listener) => listener());
    },
    subscribeToTourDone: (listener: () => void) => {
      tourDoneListeners.add(listener);
      return () => {
        tourDoneListeners.delete(listener);
      };
    },
    getTourReplayCount: () => knobs.replayCount,
    subscribeToTourReplay: (listener: () => void) => {
      replayListeners.add(listener);
      return () => {
        replayListeners.delete(listener);
      };
    },
    requestTourReplay: () => {
      knobs.replayCount += 1;
      replayListeners.forEach((listener) => listener());
    },
  };
}

/** Payload for `vi.mock('@renderer/hooks/use-is-power-mode.hook', …)`. */
export function powerModeMock() {
  return { useIsPowerMode: () => knobs.isPowerMode };
}

/**
 * Payload for `vi.mock('@renderer/hooks/papi-hooks', …)`. `useLocalizedStrings` returns `[strings,
 * isLoading]` — mirror that shape; echo keys as values.
 */
export function papiHooksMock() {
  return {
    useLocalizedStrings: (keys: string[]) => [
      Object.fromEntries(keys.map((k) => [k, k])),
      knobs.isLocalizationLoading,
    ],
  };
}

/** Another window finished the tour: the shared flag flips and every window is notified. */
export function recordTourDoneElsewhere() {
  knobs.tourDone = true;
  tourDoneListeners.forEach((listener) => listener());
}

/** Returns every knob and subscription to the state a suite's first test would see. */
export function resetTourHarness() {
  knobs.firstRunStatus = { kind: 'app' };
  knobs.isPowerMode = false;
  knobs.isLocalizationLoading = false;
  knobs.tourDone = false;
  knobs.replayCount = 0;
  tourDoneListeners.clear();
  replayListeners.clear();
}

/**
 * Gives an element a non-empty box. jsdom reports every rect as zero-size, and the real `Tour`
 * drops any step whose target cannot be measured — with nothing left to spotlight it reports a
 * skip, which permanently spends the done flag.
 *
 * Assigns per element rather than swapping `Element.prototype.getBoundingClientRect`, which a suite
 * rendering the real tree must not do. It keeps no handle on what it overwrote, so it is only safe
 * on elements that live no longer than one test — {@link installTourDomFixtures} builds and removes
 * these within a single test. Anything longer-lived needs a restoring variant.
 */
function stubBoundingRect(element: HTMLElement, width: number, height: number) {
  const rect = new DOMRect(0, 0, width, height);
  element.getBoundingClientRect = () => rect;
}

/** The fixture elements, plus the `remove` that takes them back out of the document. */
export type TourDomFixtures = {
  /** The dock layout's project panel — the element the readiness gate waits for in Simple mode. */
  layoutPanelEl: HTMLElement;
  /** The dock layout's model-text panel, which gives the tour a third visible stop. */
  modelTextPanelEl: HTMLElement;
  /** The toolbar's Profile button — the readiness gate's target in Power mode. */
  profileTriggerEl: HTMLElement;
  remove: () => void;
};

/**
 * Builds the DOM the tour waits for and spotlights, and returns it alongside a `remove`.
 *
 * `OnboardingTour` polls for the project panel before it opens — the dock layout loads async, so
 * the panel divs are not present at startup — and the toolbar's Profile button is the one stop that
 * survives `Tour`'s filter in Power mode, so it is what the readiness gate waits for there. The
 * model-text panel gives the tour a third visible stop, which is what lets a test leave the tour
 * genuinely mid-flight rather than always on stop 1.
 */
export function installTourDomFixtures(): TourDomFixtures {
  const layoutPanelEl = document.createElement('div');
  layoutPanelEl.setAttribute('data-dockid', SIMPLE_PANEL_ID_PROJECT);
  stubBoundingRect(layoutPanelEl, 300, 400);
  document.body.appendChild(layoutPanelEl);

  const modelTextPanelEl = document.createElement('div');
  modelTextPanelEl.setAttribute('data-dockid', SIMPLE_PANEL_ID_MODEL_TEXT);
  stubBoundingRect(modelTextPanelEl, 300, 400);
  document.body.appendChild(modelTextPanelEl);

  const profileTriggerEl = document.createElement('button');
  profileTriggerEl.setAttribute('data-testid', 'user-profile-popover-trigger');
  stubBoundingRect(profileTriggerEl, 32, 32);
  document.body.appendChild(profileTriggerEl);

  return {
    layoutPanelEl,
    modelTextPanelEl,
    profileTriggerEl,
    remove: () => {
      layoutPanelEl.remove();
      modelTextPanelEl.remove();
      profileTriggerEl.remove();
    },
  };
}
