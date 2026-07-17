import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguagePlaceholderStep from './language.placeholder.component';
import SyncConsentPlaceholderStep from './sync-consent.placeholder.component';

// Without a PAPI backend, useLocalizedStrings returns raw keys; mock it to return English.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_step_language_placeholder%': 'Language picker (coming soon)',
      '%firstRun_step_syncConsent_placeholder%': 'Sync consent (coming soon)',
    },
    false,
  ]),
}));

describe('placeholder steps', () => {
  it('language placeholder renders its coming-soon text', () => {
    render(<LanguagePlaceholderStep />);
    expect(screen.getByText(/language picker/i)).toBeInTheDocument();
  });

  it('sync consent placeholder renders its coming-soon text', () => {
    render(<SyncConsentPlaceholderStep />);
    expect(screen.getByText(/sync consent/i)).toBeInTheDocument();
  });
});
