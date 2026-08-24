// @vitest-environment jsdom
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import { BookChapterControl } from './book-chapter-control.component';
import { BookChapterControlHandle } from './book-chapter-control.types';

// jsdom doesn't ship a ResizeObserver, and `Element.prototype.scrollTo` is unimplemented.
// cmdk (used inside BookChapterControl's popover) instantiates a ResizeObserver on mount,
// and BCV schedules a `scrollTo` after the popover opens to center the selected book —
// either crashes any test that opens a BCV picker. No-op stubs are sufficient since the
// tests don't assert layout / scroll behavior.
class NoopResizeObserver implements ResizeObserver {
  // Touch `this` so the no-op methods don't trip @typescript-eslint/class-methods-use-this.
  // We keep `targets` as an internal record of attached elements so the polyfill behaves
  // like a (very dumb) real ResizeObserver: observe/unobserve mutate the set, disconnect
  // clears it. None of the tests inspect this state — it just satisfies the lint rule
  // without an eslint-disable.
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
  // Chapters view schedules a `scrollIntoView` on the target chapter cell after opening,
  // which jsdom also doesn't implement.
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

describe('BookChapterControl imperative handle', () => {
  test('open() opens the dropdown and focuses the search input', async () => {
    const handleRef = createRef<BookChapterControlHandle>();
    render(
      <BookChapterControl
        ref={handleRef}
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
      />,
    );

    expect(handleRef.current).not.toBeNull();
    act(() => {
      handleRef.current?.open();
    });

    await waitFor(() => {
      const input = screen.getByRole('combobox', { name: 'book-chapter-trigger' });
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
  });

  test('open() resets a stale chapters view back to books view and focuses the search input', async () => {
    const handleRef = createRef<BookChapterControlHandle>();
    // Radix popovers rely on PointerEvent sequences that jsdom lays out poorly;
    // `pointerEventsCheck: 0` is the established workaround (see scope-selector tests).
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <BookChapterControl
        ref={handleRef}
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
      />,
    );

    // Open via the trigger and drill into chapters view by picking a multi-chapter book
    await user.click(screen.getByRole('combobox', { name: 'book-chapter-trigger' }));
    await user.click(await screen.findByText('Genesis'));
    // CommandInput only renders in books view — its absence proves we're in chapters view
    await waitFor(() => {
      expect(document.querySelector('[cmdk-input]')).toBeNull();
    });

    // Close while chapters view is still active, leaving the stale view state behind
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.getByRole('combobox', { name: 'book-chapter-trigger' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    });

    // Imperative open() must reset to books view so the search input exists and gets focus
    act(() => {
      handleRef.current?.open();
    });

    await waitFor(() => {
      const input = document.querySelector('[cmdk-input]');
      expect(input).not.toBeNull();
      expect(input).toHaveFocus();
    });
  });

  test('disabled prop disables the trigger button', () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        disabled
      />,
    );
    expect(screen.getByRole('combobox', { name: 'book-chapter-trigger' })).toBeDisabled();
  });

  test('open() does not open the dropdown while the control is disabled', () => {
    const handleRef = createRef<BookChapterControlHandle>();
    render(
      <BookChapterControl
        ref={handleRef}
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        disabled
      />,
    );

    act(() => {
      handleRef.current?.open();
    });

    expect(screen.getByRole('combobox', { name: 'book-chapter-trigger' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  test('an open dropdown closes when the control becomes disabled', async () => {
    const handleRef = createRef<BookChapterControlHandle>();
    const { rerender } = render(
      <BookChapterControl
        ref={handleRef}
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
      />,
    );

    act(() => {
      handleRef.current?.open();
    });
    await waitFor(() => {
      expect(screen.getByRole('combobox', { name: 'book-chapter-trigger' })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
    });

    // The control's target disappears mid-interaction (e.g. the toolbar's last editor closes)
    rerender(
      <BookChapterControl
        ref={handleRef}
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        disabled
      />,
    );

    await waitFor(() => {
      expect(screen.getByRole('combobox', { name: 'book-chapter-trigger' })).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    });
  });

  test('does not render a chevron by default', () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'MAT', chapterNum: 5, verseNum: 3 }}
        handleSubmit={() => {}}
      />,
    );
    expect(screen.queryByTestId('book-chapter-control-chevron')).not.toBeInTheDocument();
  });

  test('renders a chevron when showTriggerChevron is true', () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'MAT', chapterNum: 5, verseNum: 3 }}
        handleSubmit={() => {}}
        showTriggerChevron
      />,
    );
    expect(screen.getByTestId('book-chapter-control-chevron')).toBeInTheDocument();
  });
});

describe('BookChapterControl additional books', () => {
  const PROJECT_BOOKS = ['GEN', 'MAT'];
  const getProjectBooks = () => PROJECT_BOOKS;
  const getExtraBooks = () => ['REV'];

  /** The trigger button and the search input are both comboboxes; only the trigger is named. */
  const getTrigger = () => screen.getByRole('combobox', { name: 'book-chapter-trigger' });
  const getSearchInput = () => screen.getByRole('combobox', { name: '' });

  test('an additional book is absent from the collapsed list', async () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await userEvent.click(getTrigger());

    expect(await screen.findByRole('option', { name: /Genesis/ })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /Revelation/ })).not.toBeInTheDocument();
  });

  test('typing finds an additional book while the list is collapsed', async () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await userEvent.click(getTrigger());
    await userEvent.type(getSearchInput(), 'Revelation');

    expect(await screen.findByText(/REV/)).toBeInTheDocument();
  });

  test('a typed reference to an additional book submits', async () => {
    const handleSubmit = vi.fn();
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={handleSubmit}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await userEvent.click(getTrigger());
    await userEvent.type(getSearchInput(), 'rev 3:4{Enter}');

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({ book: 'REV', chapterNum: 3, verseNum: 4 }),
    );
  });

  test('a book outside the project renders dimmed with a spoken reason', async () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await userEvent.click(getTrigger());
    // A query several books match keeps the list rendered; a single match collapses to a top match.
    await userEvent.type(getSearchInput(), 'e');

    const revelation = await screen.findByRole('option', {
      name: /Revelation \(REV\), not in this project/,
    });
    expect(revelation).toHaveClass('tw:text-muted-foreground/50');
  });

  test('additional ids already in the project are not dimmed', async () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={() => ['GEN']}
      />,
    );

    await userEvent.click(getTrigger());

    const genesis = await screen.findByRole('option', { name: /Genesis/ });
    expect(genesis).not.toHaveClass('tw:text-muted-foreground/50');
  });

  test('the current book is dimmed when the project lacks it, even with no additional books', async () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'REV', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={() => []}
      />,
    );

    await userEvent.click(getTrigger());
    // Type a fragment matching several books so a top match does not replace the book list.
    await userEvent.type(getSearchInput(), 'e');

    const revelation = await screen.findByRole('option', { name: /Revelation/ });
    expect(revelation).toHaveClass('tw:text-muted-foreground/50');
  });

  test('the toggle is absent when there are no books outside the project', async () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={() => []}
      />,
    );

    await userEvent.click(getTrigger());

    expect(await screen.findByRole('option', { name: /Genesis/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Show all books' })).not.toBeInTheDocument();
  });

  test('the toggle is absent when getActiveBookIds is not supplied', async () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await userEvent.click(getTrigger());

    expect(await screen.findByRole('option', { name: /Genesis/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Show all books' })).not.toBeInTheDocument();
  });

  test('the toggle starts unpressed and reveals the extra book when pressed', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await user.click(getTrigger());

    const toggle = await screen.findByRole('button', { name: 'Show all books' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('option', { name: /Revelation/ })).not.toBeInTheDocument();

    await user.click(toggle);

    expect(await screen.findByRole('option', { name: /Revelation/ })).toBeInTheDocument();
    await waitFor(() => expect(toggle).toHaveAttribute('aria-expanded', 'true'));
  });

  test('a revealed book outside the project is dimmed', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await user.click(getTrigger());
    await user.click(await screen.findByRole('button', { name: 'Show all books' }));

    const revelation = await screen.findByRole('option', { name: /Revelation/ });
    expect(revelation).toHaveClass('tw:text-muted-foreground/50');
  });

  test('selecting a revealed book navigates to it', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const handleSubmit = vi.fn();
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={handleSubmit}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await user.click(getTrigger());
    await user.click(await screen.findByRole('button', { name: 'Show all books' }));
    await user.click(await screen.findByRole('option', { name: /Revelation/ }));
    // Revelation has chapters, so the control advances to the chapter grid before submitting.
    await user.click(await screen.findByRole('option', { name: '1' }));

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({ book: 'REV', chapterNum: 1, verseNum: 1 }),
    );
  });

  test('the toggle is hidden while a search is active', async () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await userEvent.click(getTrigger());
    expect(await screen.findByRole('button', { name: 'Show all books' })).toBeInTheDocument();

    // Searching already spans every reachable book, so the control has nothing left to do.
    await userEvent.type(getSearchInput(), 'rev');

    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Show all books' })).not.toBeInTheDocument(),
    );
  });

  test('pressing the toggle a second time collapses the list', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await user.click(getTrigger());

    const toggle = await screen.findByRole('button', { name: 'Show all books' });
    await user.click(toggle);
    expect(await screen.findByRole('option', { name: /Revelation/ })).toBeInTheDocument();

    await user.click(toggle);

    await waitFor(() =>
      expect(screen.queryByRole('option', { name: /Revelation/ })).not.toBeInTheDocument(),
    );
  });

  test('clearing a search restores the expanded list and the toggle', async () => {
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await userEvent.click(getTrigger());
    await userEvent.click(await screen.findByRole('button', { name: 'Show all books' }));
    expect(await screen.findByRole('option', { name: /Revelation/ })).toBeInTheDocument();

    await userEvent.type(getSearchInput(), 'rev');
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Show all books' })).not.toBeInTheDocument(),
    );

    await userEvent.clear(getSearchInput());

    // Typing never touches the expansion state, so clearing returns to exactly the prior view.
    const toggle = await screen.findByRole('button', { name: 'Show all books' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByRole('option', { name: /Revelation/ })).toBeInTheDocument();
  });
});
