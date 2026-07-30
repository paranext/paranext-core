// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { FirstRunStatus } from '@renderer/services/first-run-store';
import type { TourProps, TourStep } from 'platform-bible-react';
import { OnboardingTour } from './onboarding-tour.component';

// Mutable knobs the mocks read, so each test can set the scenario before rendering.
let mockStatus: FirstRunStatus = { kind: 'app' };
let mockIsPowerMode = false;

vi.mock('@renderer/services/first-run-store', () => ({
  getFirstRunStatus: () => mockStatus,
  subscribeToFirstRun: () => () => {},
}));

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: () => mockIsPowerMode,
}));

// useLocalizedStrings returns [strings, isLoading] — mirror that shape; echo keys as values.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: (keys: string[]) => [Object.fromEntries(keys.map((k) => [k, k])), false],
}));

// Mock Tour so we can assert what OnboardingTour hands it without a real DOM/spotlight.
vi.mock('platform-bible-react', () => ({
  Tour: ({ open, steps, onDone, onSkip }: TourProps) =>
    open ? (
      <div data-testid="mock-tour">
        <span data-testid="step-count">{steps.length}</span>
        <span data-testid="step-sides">{steps.map((s: TourStep) => s.side).join(',')}</span>
        <button type="button" onClick={onDone}>
          done
        </button>
        <button type="button" onClick={onSkip}>
          skip
        </button>
      </div>
    ) : undefined,
}));

const TOUR_DONE_KEY = 'platform-bible.onboardingTourComplete';

beforeEach(() => {
  mockStatus = { kind: 'app' };
  mockIsPowerMode = false;
  localStorage.removeItem(TOUR_DONE_KEY);
});

afterEach(() => {
  cleanup();
  localStorage.removeItem(TOUR_DONE_KEY);
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
    expect(screen.getByTestId('step-sides').textContent).toBe('end,end,start,bottom,bottom');
  });

  it('sets the done flag and hides the tour when Done is clicked', () => {
    render(<OnboardingTour />);
    fireEvent.click(screen.getByRole('button', { name: 'done' }));
    expect(localStorage.getItem(TOUR_DONE_KEY)).toBe('true');
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('sets the done flag and hides the tour when Skip is clicked', () => {
    render(<OnboardingTour />);
    fireEvent.click(screen.getByRole('button', { name: 'skip' }));
    expect(localStorage.getItem(TOUR_DONE_KEY)).toBe('true');
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render while the app is still gated (wizard/loading)', () => {
    mockStatus = { kind: 'wizard', step: 'language' };
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render in Power mode', () => {
    mockIsPowerMode = true;
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });

  it('does not render when the tour has already been completed', () => {
    localStorage.setItem(TOUR_DONE_KEY, 'true');
    render(<OnboardingTour />);
    expect(screen.queryByTestId('mock-tour')).toBeNull();
  });
});
