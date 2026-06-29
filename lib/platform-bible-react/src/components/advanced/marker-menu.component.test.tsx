// @vitest-environment jsdom
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MarkerMenu } from '@/components/advanced/marker-menu.component';

// cmdk (Command/CommandInput) instantiates a ResizeObserver on mount and cmdk's list
// schedules scrollTo; jsdom ships neither. No-op stubs are sufficient — these tests
// only assert the input's placeholder text, not layout/scroll behavior.
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
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.scrollTo !== 'function') {
    Element.prototype.scrollTo = () => {};
  }
  // cmdk scrolls the active item into view on selection; jsdom doesn't implement it.
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

const DEFAULT_LOCALIZED_STRINGS = {
  '%markerMenu_searchPlaceholder%': 'Type a style or search.',
};

describe('MarkerMenu — search placeholder', () => {
  it('falls back to the default localized placeholder when searchPlaceholder is omitted', () => {
    render(<MarkerMenu localizedStrings={DEFAULT_LOCALIZED_STRINGS} markerMenuItems={[]} />);
    expect(screen.getByPlaceholderText('Type a style or search.')).toBeInTheDocument();
  });

  it('uses the searchPlaceholder prop over the default when provided', () => {
    render(
      <MarkerMenu
        localizedStrings={DEFAULT_LOCALIZED_STRINGS}
        markerMenuItems={[]}
        searchPlaceholder="Search to insert a style."
      />,
    );
    expect(screen.getByPlaceholderText('Search to insert a style.')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Type a style or search.')).not.toBeInTheDocument();
  });
});

describe('MarkerMenu — disallowed items', () => {
  // This is the gate that actually enforces structure protection in the UI: protected (block)
  // markers are passed in with `isDisallowed: true` and the menu must render them as disabled and
  // refuse to fire their action when selected. If a refactor ever flips this so disallowed items
  // become selectable, these tests fail — pinning the layer that the in-action guard only backs up.
  const DISALLOWED_STRINGS = {
    ...DEFAULT_LOCALIZED_STRINGS,
    '%markerMenu_disallowed_label%': 'Disallowed',
  };

  it('renders a disallowed item as disabled and does not fire its action when selected', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const action = vi.fn();
    render(
      <MarkerMenu
        localizedStrings={DISALLOWED_STRINGS}
        markerMenuItems={[{ marker: 'q', title: 'Poetry', isDisallowed: true, action }]}
      />,
    );

    const item = screen.getByRole('option', { name: /Poetry/ });
    expect(item).toHaveAttribute('aria-disabled', 'true');

    await user.click(item);
    expect(action).not.toHaveBeenCalled();
  });

  it('fires an allowed item action when selected', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const action = vi.fn();
    render(
      <MarkerMenu
        localizedStrings={DISALLOWED_STRINGS}
        markerMenuItems={[{ marker: 'f', title: 'Footnote', action }]}
      />,
    );

    const item = screen.getByRole('option', { name: /Footnote/ });
    expect(item).not.toHaveAttribute('aria-disabled', 'true');

    await user.click(item);
    expect(action).toHaveBeenCalledTimes(1);
  });
});
