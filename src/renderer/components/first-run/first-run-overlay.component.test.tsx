import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { forwardRef, ReactNode, useEffect } from 'react';
import * as store from '@renderer/services/first-run-store';
import { FirstRunOverlay } from './first-run-overlay.component';

vi.mock('@renderer/services/first-run-store', async (importActual) => {
  const actual = await importActual<typeof store>();
  return {
    ...actual,
    getFirstRunStatus: vi.fn(),
    retryFirstRunResolution: vi.fn(),
    continueWithoutRegistration: vi.fn(),
  };
});
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_title%': 'Set up Platform.Bible',
      '%firstRun_description%': 'Complete the initial setup to start using Platform.Bible.',
      '%firstRun_loading%': 'Starting setup…',
      '%firstRun_loading_detail%':
        'Checking your registration information. This may take a moment.',
      '%firstRun_loading_slow%': 'This is taking longer than expected.',
      '%firstRun_error_title%': "Couldn't verify your registration",
      '%firstRun_error_body_providerStartingUp%':
        'It may still be starting up — retry in a moment.',
      '%firstRun_button_retry%': 'Retry',
      '%firstRun_button_continueWithoutFinishingSetup%': 'Continue without finishing setup',
      '%firstRun_stepIndicator%': 'Step {stepNumber} of {stepCount}',
      '%firstRun_button_next%': 'Next',
      '%firstRun_button_back%': 'Back',
      '%firstRun_step_internet_placeholder%': 'Internet settings (coming soon)',
      '%firstRun_step_syncConsent_heading%': 'Sync your projects',
      '%firstRun_step_syncConsent_body%':
        'When working on shared projects, syncing updates your local copy and shares your changes with others.',
      '%firstRun_button_sync%': 'Sync',
      '%firstRun_button_skipSync%': 'Skip automatic sync',
      '%firstRun_step_syncProgress_heading%': 'Syncing your projects.',
      '%firstRun_step_syncProgress_body%': 'Setting up your projects.',
      '%firstRun_step_syncProgress_complete_heading%': 'Sync complete',
      '%firstRun_step_syncProgress_complete_body%': 'Your projects are ready.',
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
    AvailableInterfaceLanguages: () => [{ en: { autonym: 'English' } }, () => {}, false],
  })),
}));
vi.mock('@shared/services/localization.service', () => ({
  localizationService: { dataProviderName: 'platform.localizationDataServiceDataProvider' },
}));
vi.mock('@shared/services/logger.service', () => ({ logger: { warn: vi.fn() } }));
// SyncProgressStep (now wired into the shell) subscribes to network events. Return a no-op so the
// component can mount without crashing in jsdom (no real network layer available in tests).
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => () => () => {}),
}));
// Mock platform-bible-react to avoid the React version conflict that arises when
// lib/platform-bible-react/dist/index.js loads a different React instance via demo-first-run-setup.
// Dialog/DialogContent render children unconditionally; Button forwards click/disabled.
vi.mock('platform-bible-react', () => {
  function DialogStub({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
  }
  function DialogContentStub({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
  }
  function DialogTitleStub({ children }: { children: ReactNode }) {
    return <span>{children}</span>;
  }
  function DialogDescriptionStub({ children }: { children: ReactNode }) {
    return <span>{children}</span>;
  }
  // forwardRef so the component's Retry / escape-hatch focus refs resolve to real jsdom buttons
  // (the real Button forwards refs), rather than triggering React's "function components cannot be
  // given refs" warning and leaving the refs null.
  const ButtonStub = forwardRef<
    HTMLButtonElement,
    { [key: string]: unknown; children: ReactNode; onClick?: () => void; disabled?: boolean }
  >(function ButtonStub({ children, onClick, disabled }, ref) {
    return (
      <button ref={ref} type="button" onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  });
  function InterfaceLanguagePickerStub() {
    return <div data-testid="language-picker" />;
  }
  return {
    Dialog: DialogStub,
    DialogContent: DialogContentStub,
    DialogTitle: DialogTitleStub,
    DialogDescription: DialogDescriptionStub,
    Button: ButtonStub,
    InterfaceLanguagePicker: InterfaceLanguagePickerStub,
    // Returning null is the idiomatic React "render nothing" pattern; ComponentType requires a renderable return.
    // eslint-disable-next-line no-null/no-null
    WizardStepper: () => null,
    Progress: ({ value, 'aria-label': l }: { value?: number; 'aria-label'?: string }) => (
      <div role="progressbar" aria-valuenow={value} aria-label={l} />
    ),
    Spinner: () => <span data-testid="spinner" />,
    Z_INDEX_FIRST_RUN: 9000,
    useEvent: (
      event: ((handler: (detail: unknown) => void) => () => void) | undefined,
      handler: (detail: unknown) => void,
    ) => {
      useEffect(() => {
        if (!event) return () => {};
        const unsubscribe = event(handler);
        return () => {
          unsubscribe();
        };
      }, [event, handler]);
    },
  };
});
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

// beforeEach (not afterEach) so mocks are clean even when a prior test throws mid-run.
beforeEach(() => vi.clearAllMocks());
// restoreAllMocks resets vi.spyOn implementations; clearAllMocks alone does not. useRealTimers
// undoes any fake timers a test installed so it can't leak into the next test's userEvent.
afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

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

  it('does not dismiss when the user interacts outside the dialog (non-dismissable gate)', () => {
    mockGetStatus.mockReturnValue({ kind: 'wizard', step: 'language' });
    render(<FirstRunOverlay />);
    // Radix's DismissableLayer listens for pointer events on `document` to detect an interaction
    // outside the dialog content; `document.body` is outside the content node, so this drives the
    // real outside-interaction path that `onPointerDownOutside`/`onInteractOutside` guard against.
    fireEvent.pointerDown(document.body);
    fireEvent.pointerUp(document.body);
    expect(screen.getByText(/choose your language/i)).toBeInTheDocument();
  });

  it('offers a retry on the error status', async () => {
    mockGetStatus.mockReturnValue({ kind: 'error' });
    render(<FirstRunOverlay />);
    // Guard the %firstRun_error_body_providerStartingUp% key wiring: if the component reverts to the deprecated key
    // or typos this one, formatReplacementString renders an empty body and this assertion fails —
    // otherwise a blank error screen would ship with a green suite.
    expect(screen.getByText(/it may still be starting up/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(store.retryFirstRunResolution).toHaveBeenCalledOnce();
    // The escape hatch must actually reach the store — a missing/wrong onClick would otherwise ship
    // a dead "continue without finishing setup" button that the render-only assertions wouldn't catch.
    await userEvent.click(
      screen.getByRole('button', { name: /continue without finishing setup/i }),
    );
    expect(store.continueWithoutRegistration).toHaveBeenCalledOnce();
  });

  it('renders a loading status element when status is loading', () => {
    mockGetStatus.mockReturnValue({ kind: 'loading' });
    render(<FirstRunOverlay />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('reveals a continue-without-setup escape after loading stays slow (PT-4302)', () => {
    vi.useFakeTimers();
    mockGetStatus.mockReturnValue({ kind: 'loading' });
    render(<FirstRunOverlay />);
    // Hidden while loading is still within the expected window, so a fast resolve never flashes it.
    expect(
      screen.queryByRole('button', { name: /continue without finishing setup/i }),
    ).not.toBeInTheDocument();
    // Past the reveal threshold the escape appears so a stuck startup is never a dead end.
    act(() => {
      vi.advanceTimersByTime(15000);
    });
    const escapeButton = screen.getByRole('button', {
      name: /continue without finishing setup/i,
    });
    expect(escapeButton).toBeInTheDocument();
    // Prove the watchdog's escape is wired to the store, not just rendered — a missing/wrong onClick
    // would otherwise ship a dead button that the presence assertion above wouldn't catch.
    fireEvent.click(escapeButton);
    expect(store.continueWithoutRegistration).toHaveBeenCalledOnce();
  });

  it('re-arms the slow-loading watchdog after loading → error → loading (PT-4302)', () => {
    vi.useFakeTimers();
    let notify: (() => void) | undefined;
    vi.spyOn(store, 'subscribeToFirstRun').mockImplementation((listener) => {
      notify = listener;
      return () => {};
    });
    mockGetStatus.mockReturnValue({ kind: 'loading' });
    render(<FirstRunOverlay />);

    // First loading window: the watchdog fires and reveals the escape hatch.
    act(() => {
      vi.advanceTimersByTime(15000);
    });
    expect(
      screen.getByRole('button', { name: /continue without finishing setup/i }),
    ).toBeInTheDocument();

    // Leave loading for error, then return to loading. The effect's reset + clearTimeout must clear
    // the slow flag so the escape hatch is gone again on re-entry — proving it isn't latched on.
    mockGetStatus.mockReturnValue({ kind: 'error' });
    act(() => notify?.());
    mockGetStatus.mockReturnValue({ kind: 'loading' });
    act(() => notify?.());
    expect(
      screen.queryByRole('button', { name: /continue without finishing setup/i }),
    ).not.toBeInTheDocument();

    // A fresh timer was armed on re-entry: advancing past the threshold reveals the escape again.
    act(() => {
      vi.advanceTimersByTime(15000);
    });
    expect(
      screen.getByRole('button', { name: /continue without finishing setup/i }),
    ).toBeInTheDocument();
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
