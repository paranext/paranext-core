// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { FirstRunStatus } from '@renderer/services/first-run-store';
import { readTourDone, writeTourDone } from '@renderer/services/first-run-store';
import type { TourProps, TourStep } from 'platform-bible-react';
import { SIMPLE_PANEL_ID_PROJECT } from '@renderer/components/docking/simple-layout.data';
import { OnboardingTour } from './onboarding-tour.component';

// jsdom does not implement window.matchMedia; theme.service-host.ts calls it at module init (via
// papi-frontend.service.ts). vi.hoisted runs before any imports, so the stub is in place before
// the module initialization chain reaches theme.service-host.ts.
// Precedent: notification-display.test.tsx and share-layout.dialog.test.tsx use the same stub.
vi.hoisted(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: undefined,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

// Mutable knobs the mocks read, so each test can set the scenario before rendering.
let mockStatus: FirstRunStatus = { kind: 'app' };
let mockIsPowerMode = false;
let mockIsLocalizationLoading = false;

let mockTourDone = false;

vi.mock('@renderer/services/first-run-store', () => ({
  getFirstRunStatus: () => mockStatus,
  subscribeToFirstRun: () => () => {},
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
// Spread the real module so other platform-bible-react imports in the tested component
// (e.g. TourStep type, future hooks) don't silently become undefined.
// NOTE: MockTour is defined inside the factory to avoid the vi.mock hoisting TDZ issue —
// vi.mock() calls are hoisted before const declarations, so a top-level MockTour const would
// be uninitialized when the factory runs.
vi.mock('platform-bible-react', async (importOriginal) => {
  // Function declaration required by react/function-component-definition; defined inside the
  // factory to avoid the vi.mock hoisting TDZ issue (top-level const would be uninitialized).
  function MockTourComponent({ open, steps, onDone, onSkip }: TourProps) {
    if (!open) return undefined;
    return (
      <div data-testid="mock-tour">
        <span data-testid="step-count">{steps.length}</span>
        <span data-testid="step-sides">{steps.map((s: TourStep) => s.side).join(',')}</span>
        <span data-testid="step-padding">
          {steps.map((s: TourStep) => s.spotlightPadding ?? '').join(',')}
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
    ...(await importOriginal<typeof import('platform-bible-react')>()),
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
});
