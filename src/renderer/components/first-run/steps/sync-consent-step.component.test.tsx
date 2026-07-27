import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { SyncConsentStep } from './sync-consent-step.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn((keys: string[]) => {
    const strings: Record<string, string> = {
      '%firstRun_step_syncConsent_heading%': 'Sync your projects',
      '%firstRun_step_syncConsent_body%':
        'When working on shared projects, syncing updates your local copy and shares your changes with others.',
      '%firstRun_button_back%': 'Back',
      '%firstRun_button_skipSync%': 'Skip automatic sync',
      '%firstRun_button_sync%': 'Sync',
    };
    const result: Record<string, string> = {};
    keys.forEach((k) => {
      result[k] = strings[k] ?? k;
    });
    return [result, false];
  }),
}));

function makeOnSync(impl: () => Promise<void> = () => Promise.resolve()) {
  return vi.fn(impl);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SyncConsentStep', () => {
  it('renders the sync consent heading', () => {
    render(<SyncConsentStep onNext={vi.fn()} onSync={makeOnSync()} />);
    expect(screen.getByRole('heading')).toHaveTextContent('Sync your projects');
  });

  it('renders the sync consent body', () => {
    render(<SyncConsentStep onNext={vi.fn()} onSync={makeOnSync()} />);
    expect(screen.getByText(/shared projects/i)).toBeInTheDocument();
  });

  it('renders "Sync" and "Skip automatic sync" buttons when onSkip is provided', () => {
    render(<SyncConsentStep onNext={vi.fn()} onSkip={vi.fn()} onSync={makeOnSync()} />);
    expect(screen.getByRole('button', { name: /^sync$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /skip automatic sync/i })).toBeInTheDocument();
  });

  it('does not render "Skip automatic sync" when onSkip is absent', () => {
    render(<SyncConsentStep onNext={vi.fn()} onSync={makeOnSync()} />);
    expect(screen.queryByRole('button', { name: /skip automatic sync/i })).not.toBeInTheDocument();
  });

  it('"Sync" button calls onSync then onNext', async () => {
    const onSync = makeOnSync();
    const onNext = vi.fn();
    render(<SyncConsentStep onNext={onNext} onSync={onSync} />);
    await userEvent.click(screen.getByRole('button', { name: /^sync$/i }));
    expect(onSync).toHaveBeenCalledOnce();
    expect(onNext).toHaveBeenCalledOnce();
  });

  it('"Skip automatic sync" calls onSkip without triggering onSync', async () => {
    const onSync = makeOnSync();
    const onSkip = vi.fn();
    render(<SyncConsentStep onNext={vi.fn()} onSkip={onSkip} onSync={onSync} />);
    await userEvent.click(screen.getByRole('button', { name: /skip automatic sync/i }));
    expect(onSkip).toHaveBeenCalledOnce();
    expect(onSync).not.toHaveBeenCalled();
  });

  it('shows a spinner and hides "Skip automatic sync" while syncing', async () => {
    // onSync never resolves so the component stays in the syncing state
    const onSync = makeOnSync(() => new Promise(() => {}));
    render(<SyncConsentStep onNext={vi.fn()} onSkip={vi.fn()} onSync={onSync} />);
    await userEvent.click(screen.getByRole('button', { name: /^sync$/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /^sync$/i })).toBeDisabled());
    expect(screen.queryByRole('button', { name: /skip automatic sync/i })).not.toBeInTheDocument();
  });

  it('shows an error and re-enables "Sync" when onSync throws', async () => {
    const onSync = makeOnSync(() => Promise.reject(new Error('network error')));
    render(<SyncConsentStep onNext={vi.fn()} onSync={onSync} />);
    await userEvent.click(screen.getByRole('button', { name: /^sync$/i }));
    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^sync$/i })).not.toBeDisabled();
  });

  it('does not call onNext when onSync throws', async () => {
    const onNext = vi.fn();
    render(
      <SyncConsentStep
        onNext={onNext}
        onSync={makeOnSync(() => Promise.reject(new Error('fail')))}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /^sync$/i }));
    await screen.findByText(/fail/i);
    expect(onNext).not.toHaveBeenCalled();
  });

  it('does not render a Back button when onBack is absent', () => {
    render(<SyncConsentStep onNext={vi.fn()} onSync={makeOnSync()} />);
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  it('renders a Back button and calls onBack when clicked', async () => {
    const onBack = vi.fn();
    render(<SyncConsentStep onNext={vi.fn()} onBack={onBack} onSync={makeOnSync()} />);
    await userEvent.click(screen.getByRole('button', { name: /back/i }));
    expect(onBack).toHaveBeenCalledOnce();
  });
});
