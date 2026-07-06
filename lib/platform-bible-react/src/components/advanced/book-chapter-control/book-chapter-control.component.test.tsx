// @vitest-environment jsdom
import { act, render, screen, waitFor } from '@testing-library/react';
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
