import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InternetPlaceholderStep } from './internet.placeholder.component';
import { SyncConsentPlaceholderStep } from './sync-consent.placeholder.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_step_internet_placeholder%': 'Internet settings (coming soon)',
      '%firstRun_step_syncConsent_placeholder%': 'Sync consent (coming soon)',
    },
    false,
  ]),
}));

describe('placeholder steps', () => {
  it('internet placeholder renders its coming-soon text', () => {
    render(<InternetPlaceholderStep />);
    expect(screen.getByText(/internet settings/i)).toBeInTheDocument();
  });

  it('sync consent placeholder renders its coming-soon text', () => {
    render(<SyncConsentPlaceholderStep />);
    expect(screen.getByText(/sync consent/i)).toBeInTheDocument();
  });
});
