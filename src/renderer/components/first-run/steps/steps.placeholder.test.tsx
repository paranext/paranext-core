import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});
