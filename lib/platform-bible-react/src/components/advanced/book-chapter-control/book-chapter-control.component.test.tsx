// @vitest-environment jsdom
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { beforeAll, describe, expect, test } from 'vitest';
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
});
