// @vitest-environment jsdom

import type React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { TooltipProvider } from 'platform-bible-react';
import { BookGridSelector, type BookGridItem } from './book-grid.component';
import { installManageBooksJsdomShims, scrolledElements } from './manage-books-dialog.test-utils';

let uninstallShims: () => void;

beforeAll(() => {
  uninstallShims = installManageBooksJsdomShims();
});

afterAll(() => {
  uninstallShims();
});

beforeEach(() => {
  vi.mocked(Element.prototype.scrollIntoView).mockClear();
});

const ITEMS: BookGridItem[] = [
  {
    book: 'GEN',
    present: true,
    tone: 'neutral',
    statusGroupKey: 'inProject',
    statusLabel: 'In project',
  },
  {
    book: 'EXO',
    present: true,
    tone: 'neutral',
    statusGroupKey: 'inProject',
    statusLabel: 'In project',
  },
  {
    book: 'MRK',
    present: false,
    tone: 'neutral',
    statusGroupKey: 'notInProject',
    statusLabel: 'Not in project',
  },
];

/** Grouped by canon, MRK lands in a New Testament group and GEN/EXO in an Old Testament one. */
const grid = (props: Partial<React.ComponentProps<typeof BookGridSelector>> = {}) => (
  <TooltipProvider>
    <BookGridSelector
      items={ITEMS}
      selected={new Set()}
      onToggle={vi.fn()}
      groupBy="none"
      {...props}
    />
  </TooltipProvider>
);

describe('BookGridSelector scrollToBook', () => {
  it('scrolls the named book — and only that book — into view on mount', () => {
    const { container } = render(grid({ scrollToBook: 'MRK' }));

    expect(scrolledElements()).toEqual([container.querySelector('[data-book="MRK"]')]);
  });

  it('does not scroll when scrollToBook is omitted', () => {
    render(grid());

    expect(scrolledElements()).toEqual([]);
  });

  it('does not scroll when the named book is not in the grid', () => {
    render(grid({ scrollToBook: 'REV' }));

    expect(scrolledElements()).toEqual([]);
  });

  it('reports back once it has scrolled, so the owner can make the scroll one-shot', () => {
    const onScrolledToBook = vi.fn();
    render(grid({ scrollToBook: 'MRK', onScrolledToBook }));

    expect(onScrolledToBook).toHaveBeenCalledTimes(1);
  });

  it('does not report back when it could not scroll', () => {
    const onScrolledToBook = vi.fn();
    render(grid({ scrollToBook: 'REV', onScrolledToBook }));

    // Staying silent is what keeps the request pending instead of being swallowed.
    expect(onScrolledToBook).not.toHaveBeenCalled();
  });

  it('waits for the book to arrive rather than giving up on the first attempt', async () => {
    const onScrolledToBook = vi.fn();
    // The primary first-launch path: the grid mounts before the project's book list has loaded, so its
    // universe is briefly empty (or the full canon, then collapsed) and the target pill does not exist
    // yet. A mount-only scroll silently no-ops here.
    const { container, rerender } = render(
      grid({ items: [], scrollToBook: 'MRK', onScrolledToBook }),
    );

    expect(scrolledElements()).toEqual([]);
    expect(onScrolledToBook).not.toHaveBeenCalled();

    rerender(grid({ items: ITEMS, scrollToBook: 'MRK', onScrolledToBook }));

    await waitFor(() =>
      expect(scrolledElements()).toEqual([container.querySelector('[data-book="MRK"]')]),
    );
    expect(onScrolledToBook).toHaveBeenCalledTimes(1);
  });

  it('expands a collapsed group so the launched book is reachable', async () => {
    const onScrolledToBook = vi.fn();
    // Group-by defaults to canon in the dialog, and a group the user collapsed earlier stays collapsed.
    // Pills render only inside an expanded group, so without the expand the launch is swallowed
    // entirely: no scroll, and a footer counting a selection whose pill is nowhere on screen.
    const { container, rerender } = render(grid({ groupBy: 'canon' }));

    const ntHeader = screen
      .getAllByRole('button', { expanded: true })
      .find((button) => button.textContent?.includes('New Testament'));
    if (!ntHeader) throw new Error('expected an expanded New Testament group header to collapse');
    await userEvent.click(ntHeader);

    expect(container.querySelector('[data-book="MRK"]')).toBeNull();

    rerender(grid({ groupBy: 'canon', scrollToBook: 'MRK', onScrolledToBook }));

    await waitFor(() =>
      expect(scrolledElements()).toEqual([container.querySelector('[data-book="MRK"]')]),
    );
    expect(onScrolledToBook).toHaveBeenCalledTimes(1);
  });

  it('hands the roving tabindex to the book it scrolled to', async () => {
    const { container } = render(grid({ scrollToBook: 'MRK' }));

    // `focusedIndex` owns the grid's single `tabIndex={0}`. Left at 0, the user's first Tab focuses
    // book 0 and scrolls the grid straight back to the top, undoing the scroll.
    await waitFor(() => {
      const tabbable = container.querySelectorAll<HTMLButtonElement>('button[tabindex="0"]');
      expect(tabbable).toHaveLength(1);
      expect(container.querySelector('[data-book="MRK"]')).toContainElement(tabbable[0]);
    });
  });

  it('does not throw on a book id that is not selector-safe', () => {
    // The id is interpolated into a `[data-book="..."]` selector inside a LAYOUT effect, where a
    // `SyntaxError` escapes during commit with no error boundary to catch it — taking the dialog down
    // to a blank panel. Inert for today's book ids, which is why it needs a test rather than a comment.
    //
    // The unsafe id has to be IN `items`: the effect resolves the owning group first and returns
    // early when the book is absent, so a grid that does not contain it never builds the selector at
    // all — the test would then pass with `CSS.escape` deleted. Asserting the scroll landed on that
    // pill is what proves the escaped selector was built and matched.
    const unsafeBook = 'B"AD';
    const items: BookGridItem[] = [
      ...ITEMS,
      {
        book: unsafeBook,
        present: false,
        tone: 'neutral',
        statusGroupKey: 'notInProject',
        statusLabel: 'Not in project',
      },
    ];

    let container: HTMLElement | undefined;
    expect(() => {
      ({ container } = render(grid({ items, scrollToBook: unsafeBook })));
    }).not.toThrow();

    // The expect above already fails the test if render threw, but it cannot narrow the type for
    // TypeScript, so guard rather than assert non-null.
    if (!container) throw new Error('render did not produce a container');

    const unsafePill = Array.from(container.querySelectorAll('[data-book]')).find(
      (element) => element.getAttribute('data-book') === unsafeBook,
    );
    expect(unsafePill).toBeTruthy();
    expect(scrolledElements()).toEqual([unsafePill]);
  });
});
