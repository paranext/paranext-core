import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
      '%firstRun_step_language_placeholder%': 'Language picker (coming soon)',
      '%firstRun_step_identify_placeholder%': 'Identify (coming soon)',
      '%firstRun_step_syncConsent_placeholder%': 'Sync consent (coming soon)',
      '%firstRun_step_syncProgress_placeholder%': 'Sync progress (coming soon)',
    },
    false,
  ]),
}));
const mockGetStatus = vi.mocked(store.getFirstRunStatus);

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
    expect(screen.getByText(/language picker/i)).toBeInTheDocument();
  });

  it('does not dismiss on Escape (non-dismissable gate)', async () => {
    mockGetStatus.mockReturnValue({ kind: 'wizard', step: 'language' });
    render(<FirstRunOverlay />);
    await userEvent.keyboard('{Escape}');
    expect(screen.getByText(/language picker/i)).toBeInTheDocument();
  });

  it('offers a retry on the error status', async () => {
    mockGetStatus.mockReturnValue({ kind: 'error' });
    render(<FirstRunOverlay />);
    await userEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(store.retryFirstRunResolution).toHaveBeenCalledOnce();
  });
});
