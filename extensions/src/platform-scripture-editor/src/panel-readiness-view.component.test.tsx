// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PanelReadinessView } from './panel-readiness-view.component';

const STRINGS = {
  errorMessage: "The resource settings couldn't be read.",
  emptyPrompt: 'No Bible text selected.',
  pickLabel: 'Pick Bible text…',
  retryLabel: 'Try again',
};

function renderView(readiness: 'loading' | 'error' | 'empty' | 'configured', overrides = {}) {
  const props = { onRetry: vi.fn(), onPick: vi.fn(), ...overrides };
  const result = render(<PanelReadinessView readiness={readiness} {...STRINGS} {...props} />);
  return { ...result, ...props };
}

describe('PanelReadinessView', () => {
  it('renders the settings error with a retry that re-reads the setting', () => {
    const { onRetry } = renderView('error');

    expect(screen.getByText("The resource settings couldn't be read.")).toBeInTheDocument();
    // The empty prompt must never accompany the error: it would offer to reconfigure a resource
    // that may already be set.
    expect(screen.queryByText('No Bible text selected.')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders a spinner and neither the prompt nor the error while loading', () => {
    const { container } = renderView('loading');

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.queryByText('No Bible text selected.')).not.toBeInTheDocument();
    expect(screen.queryByText("The resource settings couldn't be read.")).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders the empty prompt with a pick action once emptiness is known', () => {
    const { onPick } = renderView('empty');

    expect(screen.getByText('No Bible text selected.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pick Bible text…' }));
    expect(onPick).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when the panel has something to show', () => {
    const { container } = renderView('configured');

    expect(container).toBeEmptyDOMElement();
  });
});
