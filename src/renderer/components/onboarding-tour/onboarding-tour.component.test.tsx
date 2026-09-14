// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  reportConnectionLost,
  resetConnectionLost,
} from '@renderer/services/connection-lost-store';
import type { TourProps, TourStep } from './tour.component';
import type { TourDomFixtures } from './onboarding-tour.test-utils';
import {
  installTourDomFixtures,
  knobs,
  recordTourDoneElsewhere,
  resetTourHarness,
} from './onboarding-tour.test-utils';
import { readTourDone, requestTourReplay, writeTourDone } from './onboarding-tour.store';
import { OnboardingTour } from './onboarding-tour.component';

// window.matchMedia — which theme.service-host.ts calls at module init, reached here via
// papi-frontend.service.ts — is stubbed for every jsdom test in vitest.setup.ts.

// The mock harness this file shares with `onboarding-tour.connection-lost.test.tsx` — the knobs
// each test sets, and the factory payloads below — lives in `onboarding-tour.test-utils.ts`. Only
// the `Tour` mock further down is specific to this file. `vi.mock` is hoisted above imports, so the
// calls stay here and pull their payloads in dynamically.

vi.mock('@renderer/services/first-run-store', async () => {
  const { firstRunStoreMock } = await import('./onboarding-tour.test-utils');
  return firstRunStoreMock();
});

vi.mock('./onboarding-tour.store', async () => {
  const { tourStoreMock } = await import('./onboarding-tour.test-utils');
  return tourStoreMock();
});

vi.mock('@renderer/hooks/use-is-power-mode.hook', async () => {
  const { powerModeMock } = await import('./onboarding-tour.test-utils');
  return powerModeMock();
});

vi.mock('@renderer/hooks/papi-hooks', async () => {
  const { papiHooksMock } = await import('./onboarding-tour.test-utils');
  return papiHooksMock();
});

// Mock Tour so we can assert what OnboardingTour hands it without a real DOM/spotlight.
// Spread the real module so TOUR_LOCALIZE_KEYS (which the component composes into its key list)
// keeps its real value.
// NOTE: MockTour is defined inside the factory to avoid the vi.mock hoisting TDZ issue —
// vi.mock() calls are hoisted before const declarations, so a top-level MockTour const would
// be uninitialized when the factory runs.
vi.mock('./tour.component', async (importOriginal) => {
  const original = await importOriginal<typeof import('./tour.component')>();
  // Report only the keys Tour itself declares. Selecting them by identity rather than by name
  // prefix keeps the assertion honest now that one step key (`%toolbar_sync%`) is borrowed from
  // another feature and so shares no prefix with the rest.
  const chromeKeys = new Set<string>(original.TOUR_LOCALIZE_KEYS);
  // Function declaration required by react/function-component-definition; defined inside the
  // factory to avoid the vi.mock hoisting TDZ issue (top-level const would be uninitialized).
  function MockTourComponent({ open, steps, onDone, onSkip, localizedStrings }: TourProps) {
    if (!open) return undefined;
    return (
      <div data-testid="mock-tour">
        <span data-testid="step-count">{steps.length}</span>
        <span data-testid="step-sides">{steps.map((s: TourStep) => s.side).join(',')}</span>
        <span data-testid="step-padding">
          {steps.map((s: TourStep) => s.spotlightPadding ?? '').join(',')}
        </span>
        <span data-testid="chrome-strings">
          {Object.keys(localizedStrings ?? {})
            .filter((k) => chromeKeys.has(k))
            .sort()
            .join(',')}
        </span>
        <button type="button" onClick={onDone}>
          done
        </button>
        <button type="button" onClick={onSkip}>
          skip
        </button>
      </div>
    );
  }
  return {
    ...original,
    Tour: MockTourComponent,
  };
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

describe('OnboardingTour', () => {
  it('renders the tour in simple mode when app is unlocked and the flag is unset', () => {
    render(<OnboardingTour />);
    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();
  });

  it('passes 5 steps with logical sides (no left/right)', () => {
    render(<OnboardingTour />);
    expect(screen.getByTestId('step-count').textContent).toBe('5');
    // Logical sides only — never physical left/right (Tour resolves those via readDirection).
    expect(screen.getByTestId('step-sides').textContent).toBe('start,end,start,bottom,bottom');
  });

  it('resolves the tour chrome keys Tour declares, alongside its own step keys', () => {
    // The button and counter keys come from TOUR_STRING_KEYS rather than being restated here, so
    // this asserts the composed list actually reaches Tour — a key dropped from the request would
    // otherwise surface only as a raw `%key%` on screen.
    render(<OnboardingTour />);
    expect(screen.getByTestId('chrome-strings').textContent).toBe(
      [
        '%firstRun_button_back%',
        '%firstRun_button_next%',
        '%general_countOfTotal%',
        '%onboardingTour_button_done%',
        '%onboardingTour_button_skip%',
      ].join(','),
    );
  });

  it('passes spotlightPadding:1 for the three column panel steps, none for toolbar steps', () => {
    render(<OnboardingTour />);
    // Column panels use padding 1 so the spotlight edge sits at the rc-dock divider visual center.
    // Toolbar steps use the Tour default (omitted).
    expect(screen.getByTestId('step-padding').textContent).toBe('1,1,1,,');
  });

  it('sets the done flag and hides the tour when Done is clicked', () => {
    render(<OnboardingTour />);
    fireEvent.click(screen.getByRole('button', { name: 'done' }));
    expect(readTourDone()).toBe(true);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('sets the done flag and hides the tour when Skip is clicked', () => {
    render(<OnboardingTour />);
    fireEvent.click(screen.getByRole('button', { name: 'skip' }));
    expect(readTourDone()).toBe(true);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render while strings are still loading (prevents raw-key flash)', () => {
    knobs.isLocalizationLoading = true;
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render while the app is still gated (wizard/loading)', () => {
    knobs.firstRunStatus = { kind: 'wizard', step: 'language' };
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render while first-run status is still loading', () => {
    knobs.firstRunStatus = { kind: 'loading' };
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render when first-run status is error', () => {
    knobs.firstRunStatus = { kind: 'error' };
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not auto-show in Power mode', () => {
    knobs.isPowerMode = true;
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render when the tour has already been completed', () => {
    writeTourDone();
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('opens once the layout panel appears (MutationObserver path)', async () => {
    // Panel absent at mount → the layoutReady gate holds the tour closed and observes the DOM.
    fixtures.layoutPanelEl.remove();
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();

    // Panel mounts later (the real dock layout loads via an async PAPI round-trip).
    await act(async () => {
      document.body.appendChild(fixtures.layoutPanelEl);
      // MutationObserver callbacks deliver as a microtask; yield once so the gate can clear.
      await Promise.resolve();
    });
    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();
  });

  it('honors a done flag written externally between mount and open (e2e suppression path)', async () => {
    // Panel absent at mount → the tour is waiting on the layoutReady gate.
    fixtures.layoutPanelEl.remove();
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();

    // An external writer (e.g. the e2e harness) persists the done flag while the tour waits. Set
    // without notifying subscribers, which is what an out-of-band write looks like from here.
    knobs.tourDone = true;

    // Layout becomes ready — the tour must re-read the flag at open time and stay closed.
    await act(async () => {
      document.body.appendChild(fixtures.layoutPanelEl);
      await Promise.resolve();
    });
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('reopens a completed tour when a replay is requested (Help > Show the tour)', () => {
    writeTourDone();
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();

    act(() => {
      requestTourReplay();
    });

    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();
  });

  it('reopens on a second replay request after the first replay was finished', () => {
    // Each request has to start a fresh showing. Without the remount, the state that closed the
    // first replay would still be set and the tour would never come back.
    writeTourDone();
    render(<OnboardingTour />);

    act(() => {
      requestTourReplay();
    });
    fireEvent.click(screen.getByRole('button', { name: 'done' }));
    expect(screen.queryByTestId('mock-tour')).toBeNull();

    act(() => {
      requestTourReplay();
    });

    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();
  });

  it('shows a replay in Power mode, where the shared Profile stop still applies', () => {
    // Power has no Simple columns and no Sync button, so Tour's open-time filter drops those stops.
    // The Profile stop survives — the toolbar renders `UserProfilePopover` in both modes — and it
    // is the one thing Help > Show the tour can still teach a Power user.
    knobs.isPowerMode = true;
    writeTourDone();
    render(<OnboardingTour />);

    act(() => {
      requestTourReplay();
    });

    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();
  });

  it('opens a Power replay without waiting for the Simple layout panel', () => {
    // The readiness gate exists so the column stops are in the DOM before Tour snapshots its step
    // list. Power never mounts those panels, so waiting on them would stall the replay until the
    // 10s safety timeout — a Help menu item that appears to do nothing for ten seconds.
    fixtures.layoutPanelEl.remove();
    knobs.isPowerMode = true;
    writeTourDone();
    render(<OnboardingTour />);

    act(() => {
      requestTourReplay();
    });

    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();
  });

  it('waits for the toolbar Profile button before opening a Power replay', async () => {
    // The gate is what stops Tour snapshotting an empty step list. If every stop filters out, Tour
    // treats that as a skip and persists the done flag — so opening before the one Power anchor
    // exists would silently consume the tour rather than show it.
    fixtures.profileTriggerEl.remove();
    knobs.isPowerMode = true;
    writeTourDone();
    render(<OnboardingTour />);

    act(() => {
      requestTourReplay();
    });
    expect(screen.queryByTestId('mock-tour')).toBeNull();

    await act(async () => {
      document.body.appendChild(fixtures.profileTriggerEl);
      await Promise.resolve();
    });
    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();
  });

  it('closes when another window records the tour as done', () => {
    // Simple mode is single-window by design, but nothing collapses a Power user's extra windows
    // when they switch to Simple, and the completion flag is shared across renderers. Each window
    // would otherwise keep its own overlay up, at its own step, until something unrelated
    // re-rendered it.
    render(<OnboardingTour />);
    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();

    act(() => {
      recordTourDoneElsewhere();
    });

    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('closes the open tour without recording it as done when the connection is lost', () => {
    // The done flag is permanent and shared, so consuming it here would cost the user a tour they
    // never saw: the connection-lost state offers only a reload, and the reload comes back to an
    // app that believes the tour has already been given.
    render(<OnboardingTour />);
    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();

    act(() => {
      reportConnectionLost();
    });

    expect(screen.queryByTestId('mock-tour')).toBeNull();
    // Reaches only as far as this file's `Tour` stub, which has no effects and no cleanup: it
    // catches a gate that writes the flag on its way out, not a regression inside the real overlay.
    // `onboarding-tour.connection-lost.test.tsx` covers that half with the real `Tour`, and is the
    // test to keep if these two ever look redundant.
    expect(readTourDone()).toBe(false);
  });

  it('does not render when the connection is already lost at mount', () => {
    // The loss latches during startup often enough to matter — the socket can die before the dock
    // layout resolves, which is exactly what the readiness gate is waiting for.
    reportConnectionLost();

    render(<OnboardingTour />);

    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });
});
