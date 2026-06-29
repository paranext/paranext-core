// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
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
