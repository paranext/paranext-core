// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { FirstRunStatus } from '@renderer/services/first-run-store';
import {
  SIMPLE_PANEL_ID_MODEL_TEXT,
  SIMPLE_PANEL_ID_PROJECT,
} from '@renderer/components/docking/simple-layout.data';
import {
  reportConnectionLost,
  resetConnectionLost,
} from '@renderer/services/connection-lost-store';
import { readTourDone } from './onboarding-tour.store';
import { OnboardingTour } from './onboarding-tour.component';

// Separate from `onboarding-tour.component.test.tsx` because that file mocks `./tour.component` at
// module scope, so the overlay's real Escape handler never runs there and a key dispatched at it
// would prove nothing. What matters when the connection drops is that standing the tour down
// actually withdraws that handler: Escape routes through `onSkip`, which permanently persists the
// done flag, and a stuck user's only remaining action is a reload. Proving the handler is gone
// needs the real `Tour`, so this file renders it and leaves every other mock as the sibling has it.

// window.matchMedia — which theme.service-host.ts calls at module init, reached here via
// papi-frontend.service.ts — is stubbed for every jsdom test in vitest.setup.ts.

// Mutable knobs the mocks read, so each test can set the scenario before rendering.
let mockStatus: FirstRunStatus = { kind: 'app' };
let mockIsPowerMode = false;
let mockIsLocalizationLoading = false;

let mockTourDone = false;
const mockTourDoneListeners = new Set<() => void>();

// Stands in for the store's replay channel — a count plus its listeners, exactly as the real one.
let mockReplayCount = 0;
const mockReplayListeners = new Set<() => void>();

vi.mock('@renderer/services/first-run-store', () => ({
  getFirstRunStatus: () => mockStatus,
  subscribeToFirstRun: () => () => {},
}));

vi.mock('./onboarding-tour.store', () => ({
  readTourDone: () => mockTourDone,
  writeTourDone: () => {
    mockTourDone = true;
    mockTourDoneListeners.forEach((listener) => listener());
  },
  subscribeToTourDone: (listener: () => void) => {
    mockTourDoneListeners.add(listener);
    return () => {
      mockTourDoneListeners.delete(listener);
    };
  },
  getTourReplayCount: () => mockReplayCount,
  subscribeToTourReplay: (listener: () => void) => {
    mockReplayListeners.add(listener);
    return () => {
      mockReplayListeners.delete(listener);
    };
  },
  requestTourReplay: () => {
    mockReplayCount += 1;
    mockReplayListeners.forEach((listener) => listener());
  },
}));

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: () => mockIsPowerMode,
}));

// useLocalizedStrings returns [strings, isLoading] — mirror that shape; echo keys as values.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: (keys: string[]) => [
    Object.fromEntries(keys.map((k) => [k, k])),
    mockIsLocalizationLoading,
  ],
}));

/**
 * Gives an element a non-empty box. jsdom reports every rect as zero-size, and Tour drops any step
 * whose target cannot be measured — with nothing left to spotlight it reports a skip, which is the
 * very flag this file is checking never gets written.
 *
 * Assigns per element rather than swapping `Element.prototype.getBoundingClientRect`, which a file
 * rendering the real tree must not do. It keeps no handle on what it overwrote, so it is only safe
 * on elements that live no longer than one test — the fixtures below are built in `beforeEach` and
 * removed in `afterEach`. Anything longer-lived needs a restoring variant.
 */
function stubBoundingRect(element: HTMLElement, width: number, height: number) {
  const rect: DOMRect = {
    top: 0,
    left: 0,
    width,
    height,
    right: width,
    bottom: height,
    x: 0,
    y: 0,
    toJSON: () => ({ top: 0, left: 0, width, height }),
  };
  element.getBoundingClientRect = () => rect;
}

// OnboardingTour polls for this element before it opens (the dock layout loads async, so the
// panel divs are not present at startup; we add a stand-in so the layoutReady gate clears).
let layoutPanelEl: HTMLElement;
// The model-text panel. Present so the tour has three visible stops rather than two, which leaves
// a genuinely mid-tour step index to lose — the state a socket dying on suspend actually catches.
let modelTextPanelEl: HTMLElement;
// The toolbar's Profile button — the one stop that survives Tour's filter in Power mode, and so
// what the readiness gate waits for there. `platform-bible-toolbar` renders it in both modes.
let profileTriggerEl: HTMLElement;

beforeEach(() => {
  mockStatus = { kind: 'app' };
  mockIsPowerMode = false;
  mockIsLocalizationLoading = false;
  mockTourDone = false;
  mockReplayCount = 0;
  mockTourDoneListeners.clear();
  mockReplayListeners.clear();
  // The connection-lost store is a module-level singleton that never clears itself, so it is reset
  // on both sides: before, in case another file sharing this worker latched it, and after, so a
  // test in this file that latches it does not leave every later test permanently stood down.
  resetConnectionLost();

  layoutPanelEl = document.createElement('div');
  layoutPanelEl.setAttribute('data-dockid', SIMPLE_PANEL_ID_PROJECT);
  stubBoundingRect(layoutPanelEl, 300, 400);
  document.body.appendChild(layoutPanelEl);

  modelTextPanelEl = document.createElement('div');
  modelTextPanelEl.setAttribute('data-dockid', SIMPLE_PANEL_ID_MODEL_TEXT);
  stubBoundingRect(modelTextPanelEl, 300, 400);
  document.body.appendChild(modelTextPanelEl);

  profileTriggerEl = document.createElement('button');
  profileTriggerEl.setAttribute('data-testid', 'user-profile-popover-trigger');
  stubBoundingRect(profileTriggerEl, 32, 32);
  document.body.appendChild(profileTriggerEl);
});

afterEach(() => {
  cleanup();
  mockTourDone = false;
  resetConnectionLost();
  layoutPanelEl?.remove();
  modelTextPanelEl?.remove();
  profileTriggerEl?.remove();
});

/**
 * Presses Escape the way a user does — at the focused element, letting it bubble — rather than
 * dispatching on `window`, which nothing below `window` would ever see. Faithful whichever host the
 * overlay's listener is attached to.
 */
function pressEscape() {
  act(() => {
    fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' });
  });
}

// `useLocalizedStrings` is mocked to echo its keys, so the tour's chrome is labelled by key.
const NEXT_LABEL = '%firstRun_button_next%';

describe('OnboardingTour with the real Tour overlay', () => {
  it('leaves Escape unable to record the tour as done once the connection is lost', () => {
    render(<OnboardingTour />);
    // The real overlay is a modal dialog; its presence is what puts the Escape listener on window.
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Advance off the first stop. A socket dies on suspend far more often than on the first frame,
    // and a mid-tour tour is the one holding a saved focus target and a step index — the state the
    // stand-down has to give up cleanly rather than report as a dismissal.
    fireEvent.click(screen.getByRole('button', { name: NEXT_LABEL }));
    // The counter template is an un-substituted echoed key here, so the stop's own title is what
    // identifies which stop is showing.
    expect(screen.getByText('%onboardingTour_step_modelText_title%')).toBeInTheDocument();

    act(() => {
      reportConnectionLost();
    });

    expect(screen.queryByRole('dialog')).toBeNull();

    pressEscape();

    // Nothing is left to route the key through onSkip, so the permanent, cross-window done flag
    // stays unwritten and the tour is still owed to the user after they reload.
    expect(readTourDone()).toBe(false);
  });

  it('records the tour as done when Escape is pressed while the connection is intact', () => {
    // Positive control for the test above. Without it, a dispatch that never reached the handler
    // at all would read as proof the handler was withdrawn, and the file's central assertion would
    // pass while asserting nothing.
    render(<OnboardingTour />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    pressEscape();

    expect(readTourDone()).toBe(true);
  });
});
