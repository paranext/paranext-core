// @vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StepLoading } from './step-loading.component';

vi.mock('platform-bible-react', () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

describe('StepLoading', () => {
  it('renders the spinner', () => {
    render(<StepLoading />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('keeps the polite live region mounted even with no message, so a later message is announced', () => {
    // An aria-live region must already exist in the DOM before its text changes, or assistive tech
    // stays silent. Mount empty, then populate — the region must be the SAME element throughout.
    const { container, rerender } = render(<StepLoading />);
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveTextContent('');

    rerender(<StepLoading message="Getting things ready…" />);
    // Content changed inside the pre-existing region — the announcement-triggering transition.
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent(
      'Getting things ready…',
    );
    expect(screen.getByText('Getting things ready…')).toBeInTheDocument();
  });
});
