// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { ComboBox } from './combo-box.component';

beforeAll(() => {
  installNoopResizeObserver();
  // cmdk scrolls the highlighted item into view; jsdom does not implement it
  Element.prototype.scrollIntoView = vi.fn();
});

async function openComboBox(value?: string) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(<ComboBox options={['Alpha', 'Beta', 'Gamma']} value={value} ariaLabel="Letters" />);
  await user.click(screen.getByRole('combobox', { name: 'Letters' }));
  return screen.findAllByRole('option');
}

describe('ComboBox check', () => {
  test('checks the selected option and keeps the check space on every other option', async () => {
    const options = await openComboBox('Beta');
    expect(options).toHaveLength(3);
    options.forEach((option) => {
      const expected = option.textContent === 'Beta' ? 'true' : 'false';
      expect(option).toHaveAttribute('data-checked', expected);
      // Screen readers hear the selection, since the check itself is aria-hidden
      expect(option).toHaveAttribute('aria-checked', expected);
    });
  });

  test('keeps the check space on every option when nothing is selected', async () => {
    const options = await openComboBox();
    options.forEach((option) => expect(option).toHaveAttribute('data-checked', 'false'));
  });
});
