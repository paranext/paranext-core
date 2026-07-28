import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IdentifyPlaceholderStep } from './identify.placeholder.component';
import { SyncProgressPlaceholderStep } from './sync-progress.placeholder.component';

// Without a PAPI backend, useLocalizedStrings returns raw keys; mock it to return English.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_step_identify_placeholder%': 'Identify (coming soon)',
      '%firstRun_step_syncProgress_placeholder%': 'Sync progress (coming soon)',
    },
    false,
  ]),
}));

describe('placeholder steps', () => {
  it('identify placeholder renders its coming-soon text', () => {
    render(<IdentifyPlaceholderStep />);
    expect(screen.getByText(/identify/i)).toBeInTheDocument();
  });

  it('sync progress placeholder renders its coming-soon text', () => {
    render(<SyncProgressPlaceholderStep />);
    expect(screen.getByText(/sync progress/i)).toBeInTheDocument();
  });
});
