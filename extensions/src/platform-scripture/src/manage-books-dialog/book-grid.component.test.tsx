// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { TooltipProvider } from 'platform-bible-react';
import { BookGridSelector, type BookGridItem } from './book-grid.component';

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // ResizeObserver constructor as a vi.fn factory satisfies the runtime contract but not
    // structural typing; we cast through unknown to adapt it to the required type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
  // jsdom has no layout, so scrollIntoView is not implemented. Stub it to observe the call.
  Element.prototype.scrollIntoView = vi.fn();

  // BookGridSelector's column-measurement effect queries `:scope > li` on its `tw:grid` <ul>.
  // jsdom's nwsapi implements `:scope` by anchoring on the context element's class list, which
  // chokes on Tailwind v4 colon classes (e.g. `tw:grid`) — parsing `:grid` as an unknown
  // pseudo-class (see the same workaround in
  // semantic-domain-viewer.test.tsx's getRowButton/getLabelButton). That effect is unrelated to
  // scrollToBook, so patch the one selector here rather than touching production code.
  const origQuerySelectorAll = Element.prototype.querySelectorAll;
  Element.prototype.querySelectorAll = function scopedQuerySelectorAll<E extends Element>(
    selectors: string,
  ) {
    if (selectors === ':scope > li') {
      const lis = Array.from(this.children).filter((child) => child.tagName === 'LI');
      // Test-only shim: NodeList is not constructible directly, and every caller of this
      // selector only iterates or indexes the result, so an array stands in faithfully.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return lis as unknown as NodeListOf<E>;
    }
    // `Element.prototype.querySelectorAll` is a generic overload; `.call` widens the return to
    // NodeListOf<Element>, so it needs re-narrowing to the caller's element type.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return origQuerySelectorAll.call(this, selectors) as NodeListOf<E>;
  };
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

describe('BookGridSelector scrollToBook', () => {
  it('scrolls the named book into view on mount', () => {
    const { container } = render(
      <TooltipProvider>
        <BookGridSelector
          items={ITEMS}
          selected={new Set(['MRK'])}
          onToggle={vi.fn()}
          groupBy="none"
          scrollToBook="MRK"
        />
      </TooltipProvider>,
    );

    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    // Sanity-check the query target the implementation relies on actually exists.
    expect(container.querySelector('[data-book="MRK"]')).not.toBeNull();
  });

  it('does not scroll when scrollToBook is omitted', () => {
    render(
      <TooltipProvider>
        <BookGridSelector items={ITEMS} selected={new Set()} onToggle={vi.fn()} groupBy="none" />
      </TooltipProvider>,
    );

    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });

  it('does not scroll when the named book is not in the grid', () => {
    render(
      <TooltipProvider>
        <BookGridSelector
          items={ITEMS}
          selected={new Set()}
          onToggle={vi.fn()}
          groupBy="none"
          scrollToBook="REV"
        />
      </TooltipProvider>,
    );

    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });
});
