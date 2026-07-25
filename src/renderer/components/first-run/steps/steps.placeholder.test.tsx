import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LanguagePlaceholderStep } from './language.placeholder.component';
import { IdentifyPlaceholderStep } from './identify.placeholder.component';
import { SyncConsentPlaceholderStep } from './sync-consent.placeholder.component';

// Without a PAPI backend, useLocalizedStrings returns raw keys; mock it to return English.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%firstRun_step_language_placeholder%': 'Language picker (coming soon)',
      '%firstRun_step_identify_placeholder%': 'Identify: name + registration code (coming soon)',
      '%firstRun_step_syncConsent_placeholder%': 'Sync consent (coming soon)',
    },
    false,
  ]),
}));

describe('placeholder steps', () => {
  it('language placeholder renders its coming-soon text', () => {
    render(<LanguagePlaceholderStep onNext={vi.fn()} />);
    expect(screen.getByText(/language picker/i)).toBeInTheDocument();
  });

  it('language placeholder calls setCanProceed(true) on mount', async () => {
    const setCanProceed = vi.fn();
    render(<LanguagePlaceholderStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
    await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
  });

  it('identify placeholder renders its coming-soon text', () => {
    render(<IdentifyPlaceholderStep onNext={vi.fn()} />);
    expect(screen.getByText(/identify/i)).toBeInTheDocument();
  });

  it('identify placeholder calls setCanProceed(true) on mount', async () => {
    const setCanProceed = vi.fn();
    render(<IdentifyPlaceholderStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
    await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
  });

  it('sync consent placeholder renders its coming-soon text', () => {
    render(<SyncConsentPlaceholderStep onNext={vi.fn()} />);
    expect(screen.getByText(/sync consent/i)).toBeInTheDocument();
  });

  it('sync consent placeholder calls setCanProceed(true) on mount', async () => {
    const setCanProceed = vi.fn();
    render(<SyncConsentPlaceholderStep onNext={vi.fn()} setCanProceed={setCanProceed} />);
    await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(true));
  });
});
