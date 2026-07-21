import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as store from '@renderer/services/first-run-store';
import { FirstRunOverlay } from './first-run-overlay.component';

vi.mock('@renderer/services/first-run-store', async (importActual) => {
  const actual = await importActual<typeof store>();
  return { ...actual, getFirstRunStatus: vi.fn(), retryFirstRunResolution: vi.fn() };
});
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_title%': 'Set up Platform.Bible',
      '%firstRun_description%': 'Complete the initial setup to start using Platform.Bible.',
      '%firstRun_loading%': 'Starting setup…',
      '%firstRun_loading_detail%':
        'Checking your registration information. This may take a moment.',
      '%firstRun_error_title%': "Couldn't verify your registration",
      '%firstRun_error_body%': 'Check your connection and try again.',
      '%firstRun_button_retry%': 'Retry',
      '%firstRun_stepIndicator%': 'Step {stepNumber} of {stepCount}',
      '%firstRun_button_next%': 'Next',
      '%firstRun_button_back%': 'Back',
      '%firstRun_button_skip%': 'Skip',
      '%firstRun_button_finish%': 'Finish',
      '%firstRun_step_identify_placeholder%': 'Identify (coming soon)',
      '%firstRun_step_syncConsent_placeholder%': 'Sync consent (coming soon)',
      '%firstRun_step_syncProgress_placeholder%': 'Sync progress (coming soon)',
      '%firstRun_language_title%': 'Choose your language',
      '%firstRun_language_instruction%': 'You can change it later.',
      '%firstRun_language_search_placeholder%': 'Search languages',
      '%firstRun_language_noResults%': 'No matching languages',
      '%firstRun_language_selected%': 'Selected',
    },
    false,
  ]),
  useSetting: vi.fn(() => [['en'], () => {}, () => {}]),
  useData: vi.fn(() => ({
    SetupDialogLanguages: () => [{ en: { autonym: 'English' } }, () => {}, false],
  })),
}));
vi.mock('@shared/services/localization.service', () => ({
  localizationService: { dataProviderName: 'platform.localizationDataServiceDataProvider' },
}));
vi.mock('@shared/services/logger.service', () => ({ logger: { warn: vi.fn() } }));
const mockGetStatus = vi.mocked(store.getFirstRunStatus);

// jsdom doesn't ship ResizeObserver or scrollIntoView; cmdk (used inside LanguageStep's
// InterfaceLanguagePicker) instantiates a ResizeObserver on mount. No-op stubs are sufficient
// since these tests don't assert layout or scroll behavior.
class NoopResizeObserver implements ResizeObserver {
  // `targets` gives the no-op methods a `this` use (satisfies class-methods-use-this); unused by tests.
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

afterEach(() => vi.clearAllMocks());

describe('FirstRunOverlay', () => {
  it('renders nothing when status is app', () => {
    mockGetStatus.mockReturnValue({ kind: 'app' });
    const { container } = render(<FirstRunOverlay />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the wizard shell when status is wizard', () => {
    mockGetStatus.mockReturnValue({ kind: 'wizard', step: 'language' });
    render(<FirstRunOverlay />);
    expect(screen.getByText(/choose your language/i)).toBeInTheDocument();
  });

  it('does not dismiss on Escape (non-dismissable gate)', async () => {
    mockGetStatus.mockReturnValue({ kind: 'wizard', step: 'language' });
    render(<FirstRunOverlay />);
    await userEvent.keyboard('{Escape}');
    expect(screen.getByText(/choose your language/i)).toBeInTheDocument();
  });

  it('offers a retry on the error status', async () => {
    mockGetStatus.mockReturnValue({ kind: 'error' });
    render(<FirstRunOverlay />);
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(store.retryFirstRunResolution).toHaveBeenCalledOnce();
  });

  it('renders a loading status element when status is loading', () => {
    mockGetStatus.mockReturnValue({ kind: 'loading' });
    render(<FirstRunOverlay />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('re-renders when the store emits a new status (subscription live-update)', () => {
    let captured: (() => void) | undefined;
    vi.spyOn(store, 'subscribeToFirstRun').mockImplementation((listener) => {
      captured = listener;
      return () => {};
    });
    mockGetStatus.mockReturnValue({ kind: 'loading' });
    render(<FirstRunOverlay />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    mockGetStatus.mockReturnValue({ kind: 'wizard', step: 'language' });
    act(() => {
      captured?.();
    });
    expect(screen.getByText(/choose your language/i)).toBeInTheDocument();
  });
});
