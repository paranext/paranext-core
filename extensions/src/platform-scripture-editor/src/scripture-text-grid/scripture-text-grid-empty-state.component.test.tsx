// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScriptureTextGridEmptyState } from './scripture-text-grid-empty-state.component';

describe('ScriptureTextGridEmptyState', () => {
  it('renders the directional prompt text passed in', () => {
    render(
      <ScriptureTextGridEmptyState prompt="No texts to display. Open View Options to choose which texts to show." />,
    );
    expect(
      screen.getByText('No texts to display. Open View Options to choose which texts to show.'),
    ).toBeInTheDocument();
  });

  it('exposes a stable testid so e2e can locate it', () => {
    render(<ScriptureTextGridEmptyState prompt="anything" />);
    expect(screen.getByTestId('scripture-text-grid-empty-state')).toBeInTheDocument();
  });
});
