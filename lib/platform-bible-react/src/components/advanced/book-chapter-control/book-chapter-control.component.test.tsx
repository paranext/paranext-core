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

    // Open via the trigger and drill into chapters view by picking a multi-chapter book.
    // Matched by its `option` role rather than its text: the trigger renders the book name in a
    // span of its own (the shrink ladder splits the reference into book + chapter:verse), so a bare
    // text query matches both the trigger and the list entry.
    await user.click(screen.getByRole('combobox', { name: 'book-chapter-trigger' }));
    await user.click(await screen.findByRole('option', { name: /Genesis/ }));
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

describe('BookChapterControl trigger shrink ladder', () => {
  const scrRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

  test('shows the full book name and the chapter:verse at the widest step', () => {
    render(<BookChapterControl scrRef={scrRef} handleSubmit={() => {}} shrinkStep={0} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('Genesis');
    expect(trigger).toHaveTextContent('1:1');
  });

  test('swaps the full book name for the three-letter id once space is tight', () => {
    render(<BookChapterControl scrRef={scrRef} handleSubmit={() => {}} shrinkStep={1} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('GEN');
    expect(trigger).not.toHaveTextContent('Genesis');
    expect(trigger).toHaveTextContent('1:1');
  });

  test('drops the chapter:verse entirely at the narrowest step, keeping the book', () => {
    render(<BookChapterControl scrRef={scrRef} handleSubmit={() => {}} shrinkStep={3} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('GEN');
    expect(trigger).not.toHaveTextContent('1:1');
  });

  test('still renders its full-width form with no toolbar above it, so standalone embeddings are unchanged', () => {
    render(<BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />);

    expect(screen.getByRole('combobox')).toHaveTextContent('Genesis');
  });

  test('keeps a bounded slot so a longer reference cannot shift the controls beside it', () => {
    // The trigger's width comes from these bounds, not from its content, so `Genesis 1:1` and
    // `1 Chronicles 29:30` occupy the same slot and neighbours never move.
    render(<BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger.className).toMatch(/(?:^|\s)tw:max-w-48(?:\s|$)/);
    expect(trigger.className).toMatch(/(?:^|\s)tw:min-w-16(?:\s|$)/);
  });

  test('prefers a localized book id over the plain id when the consumer supplies one', () => {
    render(
      <BookChapterControl
        scrRef={scrRef}
        handleSubmit={() => {}}
        shrinkStep={1}
        localizedBookNames={new Map([['GEN', { localizedId: 'GN', localizedName: 'Génesis' }]])}
      />,
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('GN');
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
      name: /Revelation is not in this project/,
    });
    expect(revelation).toHaveClass('tw:bg-muted/50');
    // The label stays readable while the row is highlighted, unlike a hover-only tooltip
    expect(revelation).toHaveTextContent('Not in project');
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
    expect(genesis).not.toHaveClass('tw:bg-muted/50');
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
    expect(screen.queryByRole('button', { name: 'Show more books' })).not.toBeInTheDocument();
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
    expect(screen.queryByRole('button', { name: 'Show more books' })).not.toBeInTheDocument();
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

    const toggle = await screen.findByRole('button', { name: 'Show more books' });
    // The flipping label carries the state; aria-expanded would encode it a second time,
    // in the opposite direction ("Show project books only" + expanded=true reads as a
    // contradiction), so the toggle deliberately has none.
    expect(toggle).not.toHaveAttribute('aria-expanded');
    expect(screen.queryByRole('option', { name: /Revelation/ })).not.toBeInTheDocument();

    await user.click(toggle);

    expect(await screen.findByRole('option', { name: /Revelation/ })).toBeInTheDocument();
    await waitFor(() => expect(toggle).toHaveAccessibleName('Show project books only'));
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
    await user.click(await screen.findByRole('button', { name: 'Show more books' }));

    const revelation = await screen.findByRole('option', { name: /Revelation/ });
    expect(revelation).toHaveClass('tw:bg-muted/50');
  });

  // Search deliberately spans every reachable book whatever the toggle says, so a book in an open
  // resource is findable by name without expanding first. Matches stay labelled, so nothing the
  // search surfaces is presented as a project book.
  test('search reaches a book outside the project while the list is collapsed', async () => {
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
    // Collapsed: the toggle still offers to expand, so nothing has been revealed yet
    expect(await screen.findByRole('button', { name: 'Show more books' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /Revelation/ })).not.toBeInTheDocument();

    await user.type(getSearchInput(), 'e');

    const revelation = await screen.findByRole('option', {
      name: /Revelation is not in this project/,
    });
    expect(revelation).toHaveClass('tw:bg-muted/50');
  });

  // The toggle governs the book list, so it has nothing to act on once quick navigation hides it
  test('the toggle is not offered while the book list is hidden', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <BookChapterControl
        scrRef={{ book: 'GEN', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
        getEndVerse={() => 31}
      />,
    );

    await user.click(getTrigger());
    expect(await screen.findByRole('button', { name: 'Show more books' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Next chapter' }));

    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Show more books' })).not.toBeInTheDocument(),
    );
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
    await user.click(await screen.findByRole('button', { name: 'Show more books' }));
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
    expect(await screen.findByRole('button', { name: 'Show more books' })).toBeInTheDocument();

    // Searching already spans every reachable book, so the control has nothing left to do.
    await userEvent.type(getSearchInput(), 'rev');

    await waitFor(() =>
      expect(screen.queryByRole('button', { name: 'Show more books' })).not.toBeInTheDocument(),
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

    const toggle = await screen.findByRole('button', { name: 'Show more books' });
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
    await userEvent.click(await screen.findByRole('button', { name: 'Show more books' }));
    expect(await screen.findByRole('option', { name: /Revelation/ })).toBeInTheDocument();

    await userEvent.type(getSearchInput(), 'rev');
    // Neither label may be on screen: which one would render depends on the expansion state.
    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: /Show more books|Show project books only/ }),
      ).not.toBeInTheDocument(),
    );

    await userEvent.clear(getSearchInput());

    // Typing never touches the expansion state, so clearing returns to exactly the prior view.
    await screen.findByRole('button', { name: 'Show project books only' });
    expect(await screen.findByRole('option', { name: /Revelation/ })).toBeInTheDocument();
  });

  test('opens expanded when the current book is outside the project', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <BookChapterControl
        scrRef={{ book: 'REV', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await user.click(getTrigger());

    await screen.findByRole('button', { name: 'Show project books only' });
    expect(await screen.findByRole('option', { name: /Revelation/ })).toBeInTheDocument();
  });

  test('the seeded expansion can still be collapsed', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <BookChapterControl
        scrRef={{ book: 'REV', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await user.click(getTrigger());

    const toggle = await screen.findByRole('button', { name: 'Show project books only' });
    expect(await screen.findByRole('option', { name: /Revelation/ })).toBeInTheDocument();

    await user.click(toggle);

    await waitFor(() =>
      expect(screen.queryByRole('option', { name: /Revelation/ })).not.toBeInTheDocument(),
    );
  });

  test('opens collapsed when the current book is in the project', async () => {
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

    await screen.findByRole('button', { name: 'Show more books' });
    expect(screen.queryByRole('option', { name: /Revelation/ })).not.toBeInTheDocument();
  });

  // Regression guard for consumers that never opt into books outside the project: the control must
  // render exactly what the caller offers, adding nothing of its own.
  test('with no additional books the whole control is limited to the project', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <BookChapterControl
        scrRef={{ book: 'REV', chapterNum: 1, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
      />,
    );

    await user.click(getTrigger());

    // The browsable list is the project's books, with nothing to reveal.
    expect(await screen.findByRole('option', { name: /Genesis/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Matthew/ })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /Revelation/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Show more books' })).not.toBeInTheDocument();

    // Quick navigation spans the project's books only, so the current book offers no next chapter.
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Next chapter' })).toBeDisabled(),
    );

    // Searching spans the same books. A fragment several books match keeps the list rendered.
    await user.type(getSearchInput(), 'e');

    expect(await screen.findByRole('option', { name: /Genesis/ })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /Revelation/ })).not.toBeInTheDocument();
  });

  test('reopening resets the expansion to the seed', async () => {
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
    await user.click(await screen.findByRole('button', { name: 'Show more books' }));
    expect(await screen.findByRole('option', { name: /Revelation/ })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await waitFor(() => expect(getTrigger()).toHaveAttribute('aria-expanded', 'false'));

    await user.click(getTrigger());

    await screen.findByRole('button', { name: 'Show more books' });
    expect(screen.queryByRole('option', { name: /Revelation/ })).not.toBeInTheDocument();
  });

  test('the toggle label names the state it switches to', async () => {
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

    const toggle = await screen.findByRole('button', { name: 'Show more books' });

    await user.click(toggle);
    await waitFor(() => expect(toggle).toHaveAccessibleName('Show project books only'));

    await user.click(toggle);
    await waitFor(() => expect(toggle).toHaveAccessibleName('Show more books'));
  });

  test('quick navigation stops at the project while the list is collapsed', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <BookChapterControl
        scrRef={{ book: 'MAT', chapterNum: 28, verseNum: 1 }}
        handleSubmit={() => {}}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await user.click(getTrigger());

    // MAT 28 is the last chapter of the project's last book, so stepping forward from here would
    // have to leave the project — which the collapsed list does not offer.
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Next chapter' })).toBeDisabled(),
    );
  });

  test('quick navigation reaches a book outside the project once the list is expanded', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const handleSubmit = vi.fn();
    render(
      <BookChapterControl
        scrRef={{ book: 'MAT', chapterNum: 28, verseNum: 1 }}
        handleSubmit={handleSubmit}
        getActiveBookIds={getProjectBooks}
        getAdditionalBookIds={getExtraBooks}
      />,
    );

    await user.click(getTrigger());
    await user.click(await screen.findByRole('button', { name: 'Show more books' }));

    const nextChapter = await screen.findByRole('button', { name: 'Next chapter' });
    await waitFor(() => expect(nextChapter).toBeEnabled());

    await user.click(nextChapter);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({ book: 'REV', chapterNum: 1, verseNum: 1 }),
    );
  });
});
