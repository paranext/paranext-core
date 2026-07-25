import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SyncProgressPlaceholderStep } from './sync-progress.placeholder.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_step_syncProgress_placeholder%': 'Sync progress (coming soon)',
    },
    false,
  ]),
}));

describe('placeholder steps', () => {
  it('sync progress placeholder renders its coming-soon text', () => {
    render(<SyncProgressPlaceholderStep />);
    expect(screen.getByText(/sync progress/i)).toBeInTheDocument();
  });

  it('sync consent placeholder calls setCanProceed(true) on mount', async () => {
    const setCanProceed = vi.fn();
    render(<SyncConsentPlaceholderStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
    await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
  });
});
