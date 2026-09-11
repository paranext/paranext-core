// @vitest-environment jsdom
/**
 * Keyboard operation of RecentSearches. The list is a cmdk `Command` inside a popover, and cmdk
 * handles the arrow keys and Enter on its own root element, so these fail whenever the popover
 * opens with focus somewhere those key events cannot reach that root from.
 */
import { beforeAll, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecentSearches from './recent-searches.component';

// cmdk and Radix instantiate a ResizeObserver and schedule scrollTo/scrollIntoView on mount;
// jsdom ships none of these.
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
  if (typeof globalThis.ResizeObserver === 'undefined')
    globalThis.ResizeObserver = NoopResizeObserver;
  if (typeof Element.prototype.scrollTo !== 'function') Element.prototype.scrollTo = () => {};
  if (typeof Element.prototype.scrollIntoView !== 'function')
    Element.prototype.scrollIntoView = () => {};
});

const RECENT_SEARCHES = ['grace', 'faith', 'hope'];

function renderRecentSearches() {
  const onSearchItemSelect = vi.fn();
  render(
    <RecentSearches recentSearches={RECENT_SEARCHES} onSearchItemSelect={onSearchItemSelect} />,
  );
  return onSearchItemSelect;
}

describe('RecentSearches — keyboard operation', () => {
  it('selects the highlighted search with Enter as soon as the list opens', async () => {
    const user = userEvent.setup();
    const onSearchItemSelect = renderRecentSearches();

    await user.click(screen.getByRole('button', { name: 'Show recent searches' }));
    await user.keyboard('{Enter}');

    expect(onSearchItemSelect).toHaveBeenCalledWith('grace');
  });

  it('moves the highlight to another search with the arrow keys', async () => {
    const user = userEvent.setup();
    const onSearchItemSelect = renderRecentSearches();

    await user.click(screen.getByRole('button', { name: 'Show recent searches' }));
    await user.keyboard('{ArrowDown}{Enter}');

    expect(onSearchItemSelect).toHaveBeenCalledWith('faith');
  });
});
