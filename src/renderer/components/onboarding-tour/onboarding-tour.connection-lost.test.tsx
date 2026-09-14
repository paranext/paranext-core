// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  reportConnectionLost,
  resetConnectionLost,
} from '@renderer/services/connection-lost-store';
import {
  CONNECTION_LOST_RELOAD_KEY,
  ConnectionLostOverlay,
  ENGLISH_FALLBACKS,
} from '@renderer/components/overlays/overlay-connection-lost.component';
import type { TourDomFixtures } from './onboarding-tour.test-utils';
import { installTourDomFixtures, knobs, resetTourHarness } from './onboarding-tour.test-utils';
import { readTourDone } from './onboarding-tour.store';
import { OnboardingTour } from './onboarding-tour.component';

// Separate from `onboarding-tour.component.test.tsx` because that file mocks `./tour.component` at
// module scope, so the overlay's real Escape handler never runs there and a key dispatched at it
// would prove nothing. What matters when the connection drops is that standing the tour down
// actually withdraws that handler: Escape routes through `onSkip`, which permanently persists the
// done flag, and a stuck user's only remaining action is a reload. Proving the handler is gone
// needs the real `Tour`, so this file renders it. The mock harness both files share lives in
// `onboarding-tour.test-utils.ts`.

// window.matchMedia — which theme.service-host.ts calls at module init, reached here via
// papi-frontend.service.ts — is stubbed for every jsdom test in vitest.setup.ts.

vi.mock('@renderer/services/first-run-store', async () => {
  const { firstRunStoreMock: factory } = await import('./onboarding-tour.test-utils');
  return factory();
});

vi.mock('./onboarding-tour.store', async () => {
  const { tourStoreMock: factory } = await import('./onboarding-tour.test-utils');
  return factory();
});

vi.mock('@renderer/hooks/use-is-power-mode.hook', async () => {
  const { powerModeMock: factory } = await import('./onboarding-tour.test-utils');
  return factory();
});

vi.mock('@renderer/hooks/papi-hooks', async () => {
  const { papiHooksMock: factory } = await import('./onboarding-tour.test-utils');
  return factory();
});

let fixtures: TourDomFixtures;

beforeEach(() => {
  resetTourHarness();
  // The connection-lost store is a module-level singleton that never clears itself, so it is reset
  // on both sides: before, so a test in this file that latches it cannot stand down the tour in the
  // next one, and after, so it does not stand down every later test in the run either.
  resetConnectionLost();
  fixtures = installTourDomFixtures();
});

afterEach(() => {
  cleanup();
  resetConnectionLost();
  fixtures.remove();
});

/**
 * Presses Escape at a fixed node outside the tour card, so the negative case below and its control
 * exercise the same propagation path. Dispatching at `document.activeElement` instead would put the
 * two on different paths — focus sits inside the card while the tour is open and falls to `<body>`
 * once it is gone — and a listener moved off `window` onto the card would then leave the control
 * green while the negative case passed vacuously.
 */
function pressEscape() {
  act(() => {
    fireEvent.keyDown(document.body, { key: 'Escape' });
  });
}

// `useLocalizedStrings` is mocked to echo its keys, so the tour's chrome is labelled by key.
const NEXT_LABEL = '%firstRun_button_next%';
// The overlay resolves its own copy through `localizedOrEnglish`, so with `useLocalizedStrings`
// echoing keys it renders the shipped English fallback rather than the raw key.
const RELOAD_LABEL = ENGLISH_FALLBACKS[CONNECTION_LOST_RELOAD_KEY];

describe('OnboardingTour with the real Tour overlay', () => {
  it('leaves Escape unable to record the tour as done once the connection is lost', () => {
    render(<OnboardingTour />);
    // The real overlay is a modal dialog; its presence is what puts the Escape listener on window.
    expect(screen.getByTestId('tour-dialog')).toBeInTheDocument();

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

    expect(screen.queryByTestId('tour-dialog')).toBeNull();

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
    expect(screen.getByTestId('tour-dialog')).toBeInTheDocument();

    pressEscape();

    expect(readTourDone()).toBe(true);
  });

  it('never opens while localization has not resolved, so no handler is installed offline', () => {
    // The one case the mount guard does NOT cover: a reload while the server is still down comes
    // back to a renderer that never latches the connection-lost state, so nothing stands the tour
    // down. What keeps the Escape handler off the window there is the readiness gate — the
    // localization data provider lives over the dead socket, so `isLoading` never resolves.
    knobs.isLocalizationLoading = true;

    render(<OnboardingTour />);

    expect(screen.queryByTestId('tour-dialog')).toBeNull();

    pressEscape();

    expect(readTourDone()).toBe(false);
  });
});

describe('OnboardingTour alongside the connection-lost state', () => {
  it('hands the keyboard to the connection-lost shell when the connection drops mid-tour', () => {
    // The pairing the keyboard-shortcuts catalog documents, and the only place it is actually
    // exercised: rendered apart, neither component can show that the tour's focus trap releases
    // Tab to the shell's own containment, which is what keeps Reload reachable for a stuck user.
    render(
      <>
        <ConnectionLostOverlay />
        <OnboardingTour />
      </>,
    );
    expect(screen.getByTestId('tour-dialog')).toBeInTheDocument();

    act(() => {
      reportConnectionLost();
    });

    expect(screen.queryByTestId('tour-dialog')).toBeNull();
    const reloadButton = screen.getByRole('button', { name: RELOAD_LABEL });
    expect(reloadButton).toBeInTheDocument();
    // Focus lands on Reload rather than being stranded on `<body>` by the tour's teardown.
    expect(document.activeElement).toBe(reloadButton);

    pressEscape();

    // The shell swallows Escape, and the withdrawn tour handler cannot spend the done flag.
    expect(screen.getByRole('button', { name: RELOAD_LABEL })).toBeInTheDocument();
    expect(readTourDone()).toBe(false);
  });
});
