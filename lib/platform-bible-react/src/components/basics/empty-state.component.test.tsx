// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './empty-state.component';

describe('EmptyState', () => {
  it('renders the message passed in', () => {
    render(<EmptyState message="No texts to display." />);
    expect(screen.getByText('No texts to display.')).toBeInTheDocument();
  });

  it('announces the message via role="status" so screen readers pick it up', () => {
    render(<EmptyState message="Nothing here yet." />);
    expect(screen.getByRole('status')).toHaveTextContent('Nothing here yet.');
  });

  it('exposes the given id as a data-testid so callers can locate it', () => {
    render(<EmptyState message="anything" id="my-empty-state" />);
    expect(screen.getByTestId('my-empty-state')).toBeInTheDocument();
  });

  it('appends a caller-supplied className to the message element', () => {
    render(<EmptyState message="anything" className="tw:italic" />);
    expect(screen.getByRole('status')).toHaveClass('tw:italic');
  });
});
