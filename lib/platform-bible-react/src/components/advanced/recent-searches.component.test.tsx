// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import RecentSearches from './recent-searches.component';

// Radix measures its content on mount; jsdom ships neither ResizeObserver nor these methods.
class NoopResizeObserver implements ResizeObserver {
  // Keep an internal record of observed targets so the no-op methods touch `this` and don't trip
  // @typescript-eslint/class-methods-use-this. No test inspects this state.
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
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

const RECENT = ['Genesis 1:1', 'Exodus 2:3'];
const TRIGGER_NAME = 'Show recent searches';

function renderRecentSearches(recentSearches: string[] = RECENT) {
  const onSearchItemSelect = vi.fn();
  const user = userEvent.setup();
  render(
    <RecentSearches recentSearches={recentSearches} onSearchItemSelect={onSearchItemSelect} />,
  );
  return { onSearchItemSelect, user };
}

describe('RecentSearches', () => {
  test('renders nothing when there are no recent searches', () => {
    renderRecentSearches([]);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  // This component is exported from the library, so the roles it renders are part of its public
  // contract: a consumer's query or screen-reader script is written against them. Menu semantics
  // are what it promises — assert the listbox semantics are absent too, so a swap back to a
  // Command/CommandItem list fails here rather than silently in a consumer.
  test('the open list exposes menu semantics, not listbox semantics', async () => {
    const { user } = renderRecentSearches();

    await user.click(screen.getByRole('button', { name: TRIGGER_NAME }));

    expect(await screen.findByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(RECENT.length);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  test('selecting an item reports it and closes the list', async () => {
    const { onSearchItemSelect, user } = renderRecentSearches();

    await user.click(screen.getByRole('button', { name: TRIGGER_NAME }));
    await user.click(await screen.findByRole('menuitem', { name: /Exodus 2:3/ }));

    expect(onSearchItemSelect).toHaveBeenCalledWith('Exodus 2:3');
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
  });
});
