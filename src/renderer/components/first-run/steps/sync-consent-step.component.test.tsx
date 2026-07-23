import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { SyncConsentStep } from './sync-consent-step.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn((keys: string[]) => {
    const strings: Record<string, string> = {};
    keys.forEach((k) => {
      strings[k] = k; // return the key as-is so tests can assert on localization key usage
    });
    return [strings, false];
  }),
}));

describe('SyncConsentStep', () => {
  it('renders the sync consent heading localization key', () => {
    render(<SyncConsentStep />);
    expect(screen.getByRole('heading')).toHaveTextContent('%firstRun_step_syncConsent_heading%');
  });

  it('renders the sync consent body localization key', () => {
    render(<SyncConsentStep />);
    expect(screen.getByText('%firstRun_step_syncConsent_body%')).toBeInTheDocument();
  });

  it('does not render any buttons (shell owns the footer)', () => {
    render(<SyncConsentStep />);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
