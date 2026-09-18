// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
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

function renderRecentSearches(
  recentSearches: string[] = RECENT,
  props: Partial<ComponentProps<typeof RecentSearches<string>>> = {},
) {
  const onSearchItemSelect = vi.fn();
  const user = userEvent.setup();
  render(
    <RecentSearches
      recentSearches={recentSearches}
      onSearchItemSelect={onSearchItemSelect}
      {...props}
    />,
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

  test('a selection reports the close exactly once', async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RecentSearches
        recentSearches={RECENT}
        onSearchItemSelect={vi.fn()}
        onOpenChange={onOpenChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: TRIGGER_NAME }));
    await user.click(await screen.findByRole('menuitem', { name: /Exodus 2:3/ }));
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());

    // Radix auto-closes on select, so closing again in the select handler would report it twice —
    // and a consumer that restores focus or reopens on close would do so twice per pick.
    expect(onOpenChange.mock.calls.filter(([isOpen]) => isOpen === false)).toHaveLength(1);
  });

  test('the list carries its heading as its accessible name', async () => {
    const { user } = renderRecentSearches(RECENT, { groupHeading: 'Recent' });

    await user.click(screen.getByRole('button', { name: TRIGGER_NAME }));

    // Without this the list announces as a bare "menu" with N items and nothing says these are
    // recent searches — the group name a heading used to carry programmatically.
    expect(await screen.findByRole('menu', { name: 'Recent' })).toBeInTheDocument();
  });

  test('a raw localization key never reaches the screen', async () => {
    // `useLocalizedStrings` yields `{ [key]: key }` while loading and permanently on a provider
    // error, so consumers really do hand these through. A key is harmless in an `aria-label` and
    // user-visible the moment it is rendered as tooltip or heading text.
    const { user } = renderRecentSearches(RECENT, {
      ariaLabel: '%history_recentSearches_ariaLabel%',
      groupHeading: '%history_recent%',
    });

    const trigger = screen.getByRole('button', { name: TRIGGER_NAME });
    await user.click(trigger);

    expect(await screen.findByRole('menu', { name: 'Recent' })).toBeInTheDocument();
    expect(screen.queryByText('%history_recent%')).not.toBeInTheDocument();
    expect(screen.queryByText('%history_recentSearches_ariaLabel%')).not.toBeInTheDocument();
  });

  test('dismissing the list does not leave a tooltip open over the surrounding UI', async () => {
    const { user } = renderRecentSearches(RECENT, { ariaLabel: TRIGGER_NAME });

    await user.click(screen.getByRole('button', { name: TRIGGER_NAME }));
    await user.click(await screen.findByRole('menuitem', { name: /Exodus 2:3/ }));
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());

    // Radix returns focus to the trigger when the list closes, which Tooltip reads as a reason to
    // open. The pointer is on the row that was clicked, never on the button, so no `pointerleave`
    // will arrive to close it again — it would sit over the search input until the button blurs.
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });
});
