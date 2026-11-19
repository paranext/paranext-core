// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { MultiSelectComboBox } from './multi-select-combo-box.component';

beforeAll(() => {
  installNoopResizeObserver();
  // cmdk scrolls the highlighted item into view; jsdom does not implement it
  Element.prototype.scrollIntoView = vi.fn();
});

const ENTRIES = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

describe('MultiSelectComboBox check', () => {
  test('checks every selected entry and keeps the check space on the others', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <MultiSelectComboBox
        entries={ENTRIES}
        selected={['a', 'c']}
        onChange={() => {}}
        placeholder="Pick letters"
      />,
    );
    await user.click(screen.getByRole('combobox'));

    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(3);
    options.forEach((option) => {
      const isSelected = /Alpha|Gamma/.test(option.textContent ?? '');
      expect(option).toHaveAttribute('data-checked', isSelected ? 'true' : 'false');
      // Screen readers hear the selection, since the check itself is aria-hidden
      expect(option).toHaveAttribute('aria-checked', isSelected ? 'true' : 'false');
    });
  });
});
