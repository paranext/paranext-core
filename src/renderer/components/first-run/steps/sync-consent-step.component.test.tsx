import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { SyncConsentStep } from './sync-consent-step.component';

vi.mock('@renderer/services/first-run-store', () => ({
  isDemoMode: vi.fn(() => false),
}));

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn((keys: string[]) => {
    const strings: Record<string, string> = {
      '%firstRun_step_syncConsent_heading%': 'Sync your projects',
      '%firstRun_step_syncConsent_body%':
        'When working on shared projects, syncing updates your local copy and shares your changes with others.',
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

  it('calls setCanSkip(true) on mount to signal the shell to show a Skip button', async () => {
    const setCanSkip = vi.fn();
    render(<SyncConsentStep onNext={vi.fn()} setCanSkip={setCanSkip} onSync={makeOnSync()} />);
    await waitFor(() => expect(setCanSkip).toHaveBeenCalledWith(true));
  });

  it('calls setCanProceed(undefined) on mount to hide the shell Next button', async () => {
    const setCanProceed = vi.fn();
    render(
      <SyncConsentStep onNext={vi.fn()} setCanProceed={setCanProceed} onSync={makeOnSync()} />,
    );
    await waitFor(() => expect(setCanProceed).toHaveBeenCalledWith(undefined));
  });

  it('renders a Sync button but no Back or Skip buttons of its own', () => {
    render(<SyncConsentStep onNext={vi.fn()} onSync={makeOnSync()} />);
    expect(screen.getByRole('button', { name: /^sync$/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();
  });

  it('calls setCanSkip(false) when sync starts to prevent Skip while in-flight', async () => {
    const setCanSkip = vi.fn();
    render(
      <SyncConsentStep
        onNext={vi.fn()}
        setCanSkip={setCanSkip}
        onSync={makeOnSync(() => new Promise(() => {}))}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /^sync$/i }));
    expect(setCanSkip).toHaveBeenCalledWith(false);
  });

  it('calls setCanSkip(true) when sync throws so the user can still skip after a failed sync', async () => {
    const setCanSkip = vi.fn();
    render(
      <SyncConsentStep
        onNext={vi.fn()}
        setCanSkip={setCanSkip}
        onSync={makeOnSync(() => Promise.reject(new Error('network error')))}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /^sync$/i }));
    await screen.findByText(/network error/i);
    expect(setCanSkip).toHaveBeenLastCalledWith(true);
  });

  it('"Sync" button calls onSync then onNext', async () => {
    const onSync = makeOnSync();
    const onNext = vi.fn();
    render(<SyncConsentStep onNext={onNext} onSync={onSync} />);
    await userEvent.click(screen.getByRole('button', { name: /^sync$/i }));
    expect(onSync).toHaveBeenCalledOnce();
    expect(onNext).toHaveBeenCalledOnce();
  });

  it('shows a spinner and disables "Sync" while syncing', async () => {
    const onSync = makeOnSync(() => new Promise(() => {}));
    render(<SyncConsentStep onNext={vi.fn()} onSync={onSync} />);
    await userEvent.click(screen.getByRole('button', { name: /^sync$/i }));
    await waitFor(() => expect(screen.getByRole('button', { name: /^sync$/i })).toBeDisabled());
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
});
