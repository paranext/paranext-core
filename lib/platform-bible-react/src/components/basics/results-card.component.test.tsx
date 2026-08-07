import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { ResultsCard } from './results-card.component';

/**
 * Regression tests for PT-4100: keyboard events on interactive children of a ResultsCard (e.g. the
 * Replace button or the dropdown trigger) must not be hijacked by the card's own Enter/Space
 * selection handler. Before the fix, the card's onKeyDown fired onSelect (and preventDefault) for
 * any Enter/Space that bubbled up from a child button, so those buttons could never be activated
 * from the keyboard.
 */
describe('ResultsCard keyboard handling (PT-4100)', () => {
  it('does not select the card when Enter is pressed on a child button', () => {
    const onSelect = vi.fn();
    const { getByRole } = render(
      <ResultsCard
        cardKey="1"
        isSelected
        onSelect={onSelect}
        selectedButtons={<button type="button">Replace</button>}
      >
        Result content
      </ResultsCard>,
    );

    fireEvent.keyDown(getByRole('button', { name: 'Replace' }), { key: 'Enter' });

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('does not select the card when Space is pressed on a child button', () => {
    const onSelect = vi.fn();
    const { getByRole } = render(
      <ResultsCard
        cardKey="1"
        isSelected
        onSelect={onSelect}
        selectedButtons={<button type="button">Replace</button>}
      >
        Result content
      </ResultsCard>,
    );

    fireEvent.keyDown(getByRole('button', { name: 'Replace' }), { key: ' ' });

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('selects the card when Enter is pressed on the card itself', () => {
    const onSelect = vi.fn();
    const { getByRole } = render(
      <ResultsCard
        cardKey="1"
        isSelected
        onSelect={onSelect}
        selectedButtons={<button type="button">Replace</button>}
      >
        Result content
      </ResultsCard>,
    );

    fireEvent.keyDown(getByRole('button', { pressed: true }), { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('selects the card when Space is pressed on the card itself', () => {
    const onSelect = vi.fn();
    const { getByRole } = render(
      <ResultsCard
        cardKey="1"
        isSelected
        onSelect={onSelect}
        selectedButtons={<button type="button">Replace</button>}
      >
        Result content
      </ResultsCard>,
    );

    fireEvent.keyDown(getByRole('button', { pressed: true }), { key: ' ' });

    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
