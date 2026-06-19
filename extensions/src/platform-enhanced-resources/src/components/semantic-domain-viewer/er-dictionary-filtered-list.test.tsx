// @vitest-environment jsdom
// Regression coverage for the ErDictionaryFilteredList keyboard-selection boundary behavior.
//
// In wide (side-by-side) mode, arrow keys immediately select items. The documented intent
// (see handleListKeyDown: "At the boundaries the list stays put (no wrap, no reselect)") is
// that pressing ArrowUp while the first row is current — or ArrowDown while the last row is
// current — is a no-op. After a user CLICKS a row, focusedIndex is reset to -1 while the row
// stays selected; the boundary no-op guard compared the computed target against focusedIndex
// (-1) instead of the effective start index, so it fell through to selectItem(), whose toggle
// semantics turned the selection OFF. Because the detail panel is rendered iff an item is
// selected, that deselection collapses the detail panel the user just opened.
//
// These tests assert on `aria-selected` of the list option — the exact `selectedId` state that
// gates the detail panel — so they capture the defect deterministically without depending on
// the resizable-panel layout. (renderDetailContent is intentionally omitted: with no detail to
// show, the component stays in the single-column layout while still exercising the identical
// wide-mode arrow-selection code path, since `narrow` gates selection, not the detail panel.)
//
// jsdom does not implement ResizeObserver; the component reads it only to toggle `narrow`
// (width < 350px). With a no-op stub the observer callback never fires, so `narrow` keeps its
// default `false` — i.e. wide mode, which is the production default (the SemanticDomainViewer
// dialog is ~720px wide). That is exactly the path these tests exercise.

import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { SemanticDomain } from 'platform-bible-react/experimental';
import ErDictionaryFilteredList from './er-dictionary-filtered-list.component';

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    const stubResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    // The DOM lib types ResizeObserver as a constructor; a vi.fn factory satisfies the runtime
    // contract but not the structural typing, so a cast through `unknown` is the correct shape
    // adapter (mirrors semantic-domain-viewer.test.tsx).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    globalThis.ResizeObserver = stubResizeObserver as unknown as typeof ResizeObserver;
  }
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  }
});

type Item = { id: string; primaryText: string };

const ITEMS: Item[] = [
  { id: 'a', primaryText: 'Alpha' },
  { id: 'b', primaryText: 'Beta' },
  { id: 'c', primaryText: 'Gamma' },
];

const DOMAIN: SemanticDomain = { id: 'd1', label: 'Domain 1' };

function renderList() {
  return render(
    <ErDictionaryFilteredList<Item>
      items={ITEMS}
      domainPath={[DOMAIN]}
      allDomains={[DOMAIN]}
      onDomainChange={vi.fn()}
      renderItem={(item) => <span>{item.primaryText}</span>}
    />,
  );
}

/** The option <li> whose visible text matches. */
function option(name: RegExp) {
  return screen.getByRole('option', { name });
}

describe('ErDictionaryFilteredList keyboard boundary selection (wide mode)', () => {
  it('ArrowUp on the already-selected first row (after a click) keeps it selected', () => {
    renderList();

    // Click the first row: selects it and resets focusedIndex to -1.
    act(() => {
      fireEvent.click(option(/Alpha/));
    });
    expect(option(/Alpha/)).toHaveAttribute('aria-selected', 'true');

    // ArrowUp at the top boundary must be a no-op: the first row stays selected
    // (a deselection here is what collapses the open detail panel).
    act(() => {
      fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowUp' });
    });

    expect(option(/Alpha/)).toHaveAttribute('aria-selected', 'true');
  });

  it('ArrowDown on the already-selected last row (after a click) keeps it selected', () => {
    renderList();

    act(() => {
      fireEvent.click(option(/Gamma/));
    });
    expect(option(/Gamma/)).toHaveAttribute('aria-selected', 'true');

    // ArrowDown at the bottom boundary must be a no-op: the last row stays selected.
    act(() => {
      fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });
    });

    expect(option(/Gamma/)).toHaveAttribute('aria-selected', 'true');
  });

  it('ArrowDown from the first row still moves selection to the second row', () => {
    // Guards against an over-broad fix that would block all boundary movement.
    renderList();

    act(() => {
      fireEvent.click(option(/Alpha/));
    });
    act(() => {
      fireEvent.keyDown(screen.getByRole('listbox'), { key: 'ArrowDown' });
    });

    const list = screen.getByRole('listbox');
    expect(within(list).getByText('Beta').closest('[role="option"]')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(option(/Alpha/)).toHaveAttribute('aria-selected', 'false');
  });
});
