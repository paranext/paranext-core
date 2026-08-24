// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { Canon } from '@sillsdev/scripture';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { SelectBooksPicker } from './select-books-picker.component';
import { SelectBooksLocalizedStrings } from './select-books.types';

// cmdk (Command/CommandInput) instantiates a ResizeObserver on mount and cmdk's list schedules
// scrollTo/scrollIntoView; jsdom ships none of them. No-op stubs are sufficient — these tests
// assert which controls are enabled and what they commit, not layout or scroll behavior.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.scrollTo !== 'function') {
    Element.prototype.scrollTo = () => {};
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

const localizedStrings: SelectBooksLocalizedStrings = {
  '%webView_book_selector_books_selected%': 'books selected',
  '%webView_book_selector_select_books%': 'Select books',
  '%webView_book_selector_search_books%': 'Search books',
  '%webView_book_selector_select_all%': 'Select all',
  '%webView_book_selector_clear_all%': 'Clear all',
  '%webView_book_selector_no_book_found%': 'No book found',
};

async function renderOpenPicker(availableBookInfo: string) {
  const onChangeSelectedBookIds = vi.fn();
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(
    <SelectBooksPicker
      availableBookInfo={availableBookInfo}
      selectedBookIds={['GEN', 'EXO']}
      onChangeSelectedBookIds={onChangeSelectedBookIds}
      localizedStrings={localizedStrings}
    />,
  );
  await user.click(screen.getByRole('combobox'));
  return { user, onChangeSelectedBookIds };
}

describe('SelectBooksPicker — "Select all" with no books known', () => {
  test("Selects every available book when the project's books are known", async () => {
    const { user, onChangeSelectedBookIds } = await renderOpenPicker(
      '1'.repeat(Canon.allBookIds.length),
    );

    await user.click(screen.getByRole('button', { name: 'Select all' }));

    expect(onChangeSelectedBookIds).toHaveBeenCalledTimes(1);
    expect(onChangeSelectedBookIds.mock.calls[0][0].length).toBeGreaterThan(0);
  });

  test('Disables "Select all" while the project\'s books are unknown', async () => {
    // `availableBookInfo` is the empty `BooksPresent` default until the setting resolves, and stays
    // empty if that read errors. Selecting all of nothing would commit an empty array, silently
    // wiping the selection the user already had.
    const { user, onChangeSelectedBookIds } = await renderOpenPicker('');

    const selectAllButton = screen.getByRole('button', { name: 'Select all' });
    expect(selectAllButton).toBeDisabled();

    await user.click(selectAllButton);
    expect(onChangeSelectedBookIds).not.toHaveBeenCalled();
  });
});
