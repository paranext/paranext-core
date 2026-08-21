import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { useListbox, type ListboxOption } from './listbox-keyboard-navigation.hook';

/**
 * Minimal harness that wires `useListbox` to a listbox container exactly like real consumers (e.g.
 * `SourceLanguageIndexedList`): a `<ul role="listbox" tabIndex={0}>` whose options carry
 * `tabIndex={-1}`. The container receives DOM focus in the ARIA activedescendant pattern, so it is
 * the keyboard event target on initial focus and after a detail panel closes.
 */
function ListboxHarness({ onCharacterPress }: { onCharacterPress?: (char: string) => void }) {
  const options: ListboxOption[] = [{ id: 'apple' }, { id: 'banana' }];
  const { listboxRef, handleKeyDown } = useListbox({ options, onCharacterPress });
  return (
    <ul
      role="listbox"
      tabIndex={0}
      // useListbox returns a generic HTMLElement ref; consumers cast it the same way.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      ref={listboxRef as React.RefObject<HTMLUListElement>}
      onKeyDown={handleKeyDown}
      data-testid="listbox"
    >
      {options.map((option) => (
        <li key={option.id} id={option.id} role="option" aria-selected={false} tabIndex={-1}>
          {option.id}
          {/* A real interactive control nested inside an option (used by the guard test). */}
          {/* tabIndex={-1} ensures the guard test exercises the interactive-tag detection
              path specifically, not an incidental tabindex classification. */}
          <input
            data-testid={`input-${option.id}`}
            aria-label={`edit ${option.id}`}
            tabIndex={-1}
          />
        </li>
      ))}
    </ul>
  );
}

describe('useListbox type-ahead', () => {
  it('invokes onCharacterPress when a printable key is pressed while the listbox container is focused', () => {
    const onCharacterPress = vi.fn();
    render(<ListboxHarness onCharacterPress={onCharacterPress} />);

    const listbox = screen.getByTestId('listbox');
    // The container itself is the event target before any arrow navigation (initial focus).
    fireEvent.keyDown(listbox, { key: 'b' });

    expect(onCharacterPress).toHaveBeenCalledTimes(1);
    expect(onCharacterPress).toHaveBeenCalledWith('b');
  });

  it('does NOT invoke onCharacterPress when typing inside a genuine interactive control in an option', () => {
    const onCharacterPress = vi.fn();
    render(<ListboxHarness onCharacterPress={onCharacterPress} />);

    const input = screen.getByTestId('input-apple');
    fireEvent.keyDown(input, { key: 'b' });

    expect(onCharacterPress).not.toHaveBeenCalled();
  });
});
