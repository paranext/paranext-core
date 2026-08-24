// @vitest-environment jsdom
import '@testing-library/jest-dom';
import { Canon } from '@sillsdev/scripture';
import { Section } from 'platform-bible-utils';
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

async function renderOpenPicker(
  availableBookInfo: string,
  disabledSectionExplanations?: Partial<Record<Section, string>>,
) {
  const onChangeSelectedBookIds = vi.fn();
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(
    <SelectBooksPicker
      availableBookInfo={availableBookInfo}
      selectedBookIds={['GEN', 'EXO']}
      onChangeSelectedBookIds={onChangeSelectedBookIds}
      localizedStrings={localizedStrings}
      disabledSectionExplanations={disabledSectionExplanations}
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

describe('SelectBooksPicker — explanations for omitted sections', () => {
  test('Explains a section that renders no group, so a search for one of its books is not a dead end', async () => {
    // Only OT books are on offer, so the Extra group is absent entirely and searching "glossary"
    // otherwise lands on the bare "No book found" with nothing saying why.
    const { user } = await renderOpenPicker(booksPresentFor(['GEN', 'EXO']), {
      [Section.Extra]: "Find can't include extra material",
    });

    expect(screen.getByText("Find can't include extra material")).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('Search books'), 'glossary');

    expect(screen.getByText('No book found')).toBeInTheDocument();
    expect(screen.getByText("Find can't include extra material")).toBeInTheDocument();
  });

  test('Stays quiet about a section that does have books', async () => {
    await renderOpenPicker(booksPresentFor(['GEN', 'GLO']), {
      [Section.Extra]: "Find can't include extra material",
    });

    expect(screen.queryByText("Find can't include extra material")).not.toBeInTheDocument();
  });
});

/** Builds a `booksPresent` flag string of full canon length with the given books flagged present */
function booksPresentFor(bookIds: string[]): string {
  const flags = Array.from({ length: Canon.allBookIds.length }, () => '0');
  bookIds.forEach((bookId) => {
    const bookNumber = Canon.bookIdToNumber(bookId);
    if (bookNumber <= 0) throw new Error(`booksPresentFor: '${bookId}' is not a canon book id`);
    flags[bookNumber - 1] = '1';
  });
  return flags.join('');
}
