// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { FirstRunStatus } from '@renderer/services/first-run-store';
import { SIMPLE_PANEL_ID_PROJECT } from '@renderer/components/docking/simple-layout.data';
import type { TourProps, TourStep } from './tour.component';
import { readTourDone, writeTourDone } from './onboarding-tour.store';
import { OnboardingTour } from './onboarding-tour.component';

// window.matchMedia — which theme.service-host.ts calls at module init, reached here via
// papi-frontend.service.ts — is stubbed for every jsdom test in vitest.setup.ts.

// Mutable knobs the mocks read, so each test can set the scenario before rendering.
let mockStatus: FirstRunStatus = { kind: 'app' };
let mockIsPowerMode = false;
let mockIsLocalizationLoading = false;

let mockTourDone = false;

vi.mock('@renderer/services/first-run-store', () => ({
  getFirstRunStatus: () => mockStatus,
  subscribeToFirstRun: () => () => {},
}));

vi.mock('./onboarding-tour.store', () => ({
  readTourDone: () => mockTourDone,
  writeTourDone: () => {
    mockTourDone = true;
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

// Mock Tour so we can assert what OnboardingTour hands it without a real DOM/spotlight.
// Spread the real module so TOUR_LOCALIZE_KEYS (which the component composes into its key list)
// keeps its real value.
// NOTE: MockTour is defined inside the factory to avoid the vi.mock hoisting TDZ issue —
// vi.mock() calls are hoisted before const declarations, so a top-level MockTour const would
// be uninitialized when the factory runs.
vi.mock('./tour.component', async (importOriginal) => {
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
            .filter((k) => !k.startsWith('%onboardingTour_step_'))
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
    ...(await importOriginal<typeof import('./tour.component')>()),
    Tour: MockTourComponent,
  };
});

// OnboardingTour polls for this element before it opens (the dock layout loads async, so the
// panel divs are not present at startup; we add a stand-in so the layoutReady gate clears).
let layoutPanelEl: HTMLElement;

beforeEach(() => {
  mockStatus = { kind: 'app' };
  mockIsPowerMode = false;
  mockIsLocalizationLoading = false;
  mockTourDone = false;

  layoutPanelEl = document.createElement('div');
  layoutPanelEl.setAttribute('data-dockid', SIMPLE_PANEL_ID_PROJECT);
  document.body.appendChild(layoutPanelEl);
});

afterEach(() => {
  cleanup();
  mockTourDone = false;
  layoutPanelEl?.remove();
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
    mockIsLocalizationLoading = true;
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render while the app is still gated (wizard/loading)', () => {
    mockStatus = { kind: 'wizard', step: 'language' };
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render while first-run status is still loading', () => {
    mockStatus = { kind: 'loading' };
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render when first-run status is error', () => {
    mockStatus = { kind: 'error' };
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render in Power mode', () => {
    mockIsPowerMode = true;
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
    layoutPanelEl.remove();
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();

    // Panel mounts later (the real dock layout loads via an async PAPI round-trip).
    await act(async () => {
      document.body.appendChild(layoutPanelEl);
      // MutationObserver callbacks deliver as a microtask; yield once so the gate can clear.
      await Promise.resolve();
    });
    expect(screen.getByTestId('mock-tour')).toBeInTheDocument();
  });

  it('honors a done flag written externally between mount and open (e2e suppression path)', async () => {
    // Panel absent at mount → the tour is waiting on the layoutReady gate.
    layoutPanelEl.remove();
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();

    // An external writer (e.g. the e2e harness) persists the done flag while the tour waits.
    mockTourDone = true;

    // Layout becomes ready — the tour must re-read the flag at open time and stay closed.
    await act(async () => {
      document.body.appendChild(layoutPanelEl);
      await Promise.resolve();
    });
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });
});
