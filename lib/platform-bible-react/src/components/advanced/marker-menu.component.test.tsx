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

  it('reveals a disallowed item on exact marker-code match, renders it disabled, and does not fire its action when selected', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const action = vi.fn();
    render(
      <MarkerMenu
        localizedStrings={DISALLOWED_STRINGS}
        markerMenuItems={[{ marker: 'q', title: 'Poetry', isDisallowed: true, action }]}
      />,
    );

    await user.type(screen.getByPlaceholderText('Type a style or search.'), 'q');

    const item = await screen.findByRole('option', { name: /Poetry/ });
    expect(item).toHaveAttribute('aria-disabled', 'true');
    // Disallowed markers show the "Disallowed" badge to explain why they can't be inserted.
    expect(screen.getByText('Disallowed')).toBeInTheDocument();

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

  it('hides a disallowed item when the query is empty', () => {
    render(
      <MarkerMenu
        localizedStrings={DISALLOWED_STRINGS}
        markerMenuItems={[
          { marker: 'q', title: 'Poetry', isDisallowed: true, action: vi.fn() },
          { marker: 'f', title: 'Footnote', action: vi.fn() },
        ]}
      />,
    );

    expect(screen.getByRole('option', { name: /Footnote/ })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: /Poetry/ })).not.toBeInTheDocument();
  });

  it('does not reveal a disallowed item when the query is only a code substring, not exact', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <MarkerMenu
        localizedStrings={DISALLOWED_STRINGS}
        markerMenuItems={[
          { marker: 'qa', title: 'Acrostic Heading', isDisallowed: true, action: vi.fn() },
        ]}
      />,
    );

    await user.type(screen.getByPlaceholderText('Type a style or search.'), 'q');

    expect(screen.queryByRole('option', { name: /Acrostic Heading/ })).not.toBeInTheDocument();
  });

  it('reveals a disallowed item, disabled, when the query matches its title', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <MarkerMenu
        localizedStrings={DISALLOWED_STRINGS}
        markerMenuItems={[{ marker: 'q', title: 'Poetry', isDisallowed: true, action: vi.fn() }]}
      />,
    );

    await user.type(screen.getByPlaceholderText('Type a style or search.'), 'poet');

    const item = await screen.findByRole('option', { name: /Poetry/ });
    expect(item).toHaveAttribute('aria-disabled', 'true');
  });

  it('still matches an allowed item by code substring', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <MarkerMenu
        localizedStrings={DISALLOWED_STRINGS}
        markerMenuItems={[{ marker: 'qa', title: 'Acrostic Heading', action: vi.fn() }]}
      />,
    );

    await user.type(screen.getByPlaceholderText('Type a style or search.'), 'q');

    expect(await screen.findByRole('option', { name: /Acrostic Heading/ })).toBeInTheDocument();
  });

  it('keeps showing a deprecated item, disabled, with an empty query', () => {
    render(
      <MarkerMenu
        localizedStrings={{ ...DISALLOWED_STRINGS, '%markerMenu_deprecated_label%': 'Deprecated' }}
        markerMenuItems={[
          { marker: 'x', title: 'Cross Reference', isDeprecated: true, action: vi.fn() },
        ]}
      />,
    );

    const item = screen.getByRole('option', { name: /Cross Reference/ });
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows disallowed items disabled when the query is empty and every item is disallowed', () => {
    render(
      <MarkerMenu
        localizedStrings={DISALLOWED_STRINGS}
        markerMenuItems={[
          { marker: 'b', title: 'Blank Line', isDisallowed: true, action: vi.fn() },
          { marker: 'mte1', title: 'Major Title Ending 1', isDisallowed: true, action: vi.fn() },
        ]}
      />,
    );

    // When no markers can be inserted, the menu surfaces the disallowed markers (disabled) instead
    // of hiding everything and reading as an empty "No results" state.
    const blankLine = screen.getByRole('option', { name: /Blank Line/ });
    const majorTitle = screen.getByRole('option', { name: /Major Title Ending 1/ });
    expect(blankLine).toHaveAttribute('aria-disabled', 'true');
    expect(majorTitle).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows an item matching by both code and title exactly once, with a separator before the title-only matches', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <MarkerMenu
        localizedStrings={DISALLOWED_STRINGS}
        markerMenuItems={[
          { marker: 'p', title: 'Paragraph', action: vi.fn() },
          { marker: 'f', title: 'Poetry', action: vi.fn() },
        ]}
      />,
    );

    await user.type(screen.getByPlaceholderText('Type a style or search.'), 'p');

    // 'p' matches "Paragraph" by both its code and its title, but the title group excludes anything
    // already matched by code, so the item renders exactly once (in the code group).
    expect(screen.getAllByRole('option', { name: /Paragraph/ })).toHaveLength(1);
    // "Poetry" matches only by title, so both the code and title groups are populated and the
    // separator between them renders.
    expect(screen.getByRole('option', { name: /Poetry/ })).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});

describe('MarkerMenu — selection state', () => {
  const SELECTION_STRINGS = { '%markerMenu_searchPlaceholder%': 'Type a style or search.' };

  it('renders no selection affordance and sets no aria-checked when an item omits selectionState', () => {
    // The inertness guard. Both Power-mode consumers (the `\` menu and the footnote editor) pass
    // items without this field, and they must render exactly as they did before it existed.
    render(
      <MarkerMenu
        localizedStrings={SELECTION_STRINGS}
        markerMenuItems={[{ marker: 'bd', title: 'Bold', action: vi.fn() }]}
      />,
    );

    const row = screen.getByRole('option', { name: /Bold/ });
    expect(row).not.toHaveAttribute('aria-checked');
    expect(row.querySelector('[data-slot="marker-selection-state"]')).toBeNull();
  });

  it('marks a fully covered item as checked', () => {
    render(
      <MarkerMenu
        localizedStrings={SELECTION_STRINGS}
        markerMenuItems={[{ marker: 'bd', title: 'Bold', selectionState: 'all', action: vi.fn() }]}
      />,
    );

    expect(screen.getByRole('option', { name: /Bold/ })).toHaveAttribute('aria-checked', 'true');
  });

  it('marks a partially covered item as mixed', () => {
    render(
      <MarkerMenu
        localizedStrings={SELECTION_STRINGS}
        markerMenuItems={[
          { marker: 'bd', title: 'Bold', selectionState: 'partial', action: vi.fn() },
        ]}
      />,
    );

    expect(screen.getByRole('option', { name: /Bold/ })).toHaveAttribute('aria-checked', 'mixed');
  });

  it('shows a check for a partially covered item while still reporting mixed to assistive tech', () => {
    // UX chose a binary visual (checked / not) over a three-glyph one; aria-checked keeps the
    // distinction that the visual drops.
    render(
      <MarkerMenu
        localizedStrings={SELECTION_STRINGS}
        markerMenuItems={[
          { marker: 'bd', title: 'Bold', selectionState: 'partial', action: vi.fn() },
        ]}
      />,
    );

    const row = screen.getByRole('option', { name: /Bold/ });
    expect(row).toHaveAttribute('aria-checked', 'mixed');
    expect(row.querySelector('[data-slot="marker-selection-state"]')?.children).toHaveLength(1);
  });

  it('renders no glyph for an uncovered item, but keeps its slot so rows stay aligned', () => {
    render(
      <MarkerMenu
        localizedStrings={SELECTION_STRINGS}
        markerMenuItems={[
          { marker: 'it', title: 'Italic', selectionState: 'none', action: vi.fn() },
        ]}
      />,
    );

    const slot = screen
      .getByRole('option', { name: /Italic/ })
      .querySelector('[data-slot="marker-selection-state"]');
    expect(slot).not.toBeNull();
    expect(slot?.children).toHaveLength(0);
  });

  it('marks an uncovered item as unchecked while still rendering its slot', () => {
    render(
      <MarkerMenu
        localizedStrings={SELECTION_STRINGS}
        markerMenuItems={[
          { marker: 'it', title: 'Italic', selectionState: 'none', action: vi.fn() },
        ]}
      />,
    );

    const row = screen.getByRole('option', { name: /Italic/ });
    expect(row).toHaveAttribute('aria-checked', 'false');
    expect(row.querySelector('[data-slot="marker-selection-state"]')).not.toBeNull();
  });

  it('never sets data-checked, so the trailing check stays hidden', () => {
    // CommandItem renders its own trailing check keyed on data-checked. The leading glyph carries
    // all three states, so setting it would double the checkmark.
    render(
      <MarkerMenu
        localizedStrings={SELECTION_STRINGS}
        markerMenuItems={[{ marker: 'bd', title: 'Bold', selectionState: 'all', action: vi.fn() }]}
      />,
    );

    expect(screen.getByRole('option', { name: /Bold/ })).not.toHaveAttribute('data-checked');
  });

  it('still fires the action for an item that carries a selection state', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const action = vi.fn();
    render(
      <MarkerMenu
        localizedStrings={SELECTION_STRINGS}
        markerMenuItems={[{ marker: 'bd', title: 'Bold', selectionState: 'partial', action }]}
      />,
    );

    await user.click(screen.getByRole('option', { name: /Bold/ }));
    expect(action).toHaveBeenCalledTimes(1);
  });
});

describe('MarkerMenu — consumer-disabled rows', () => {
  const DISABLED_STRINGS = { '%markerMenu_searchPlaceholder%': 'Type a style or search.' };

  it('leaves a row selectable when isDisabled is absent', async () => {
    // The inertness guard for the new field. Both Power-mode consumers (the `\` menu and the
    // footnote editor) pass items without it, and those rows must stay clickable.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const action = vi.fn();
    render(
      <MarkerMenu
        localizedStrings={DISABLED_STRINGS}
        markerMenuItems={[{ marker: 'bd', title: 'Bold', action }]}
      />,
    );

    const row = screen.getByRole('option', { name: /Bold/ });
    expect(row).not.toHaveAttribute('aria-disabled', 'true');
    await user.click(row);
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('disables a row and suppresses its action when isDisabled is true', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const action = vi.fn();
    render(
      <MarkerMenu
        localizedStrings={DISABLED_STRINGS}
        markerMenuItems={[{ marker: 'bd', title: 'Bold', isDisabled: true, action }]}
      />,
    );

    const row = screen.getByRole('option', { name: /Bold/ });
    expect(row).toHaveAttribute('aria-disabled', 'true');
    await user.click(row);
    expect(action).not.toHaveBeenCalled();
  });

  it('renders no trailing label for a consumer-disabled row', () => {
    // Unlike isDisallowed/isDeprecated, this flag describes the consumer rather than the marker,
    // so it must not borrow either of their labels.
    render(
      <MarkerMenu
        localizedStrings={{
          ...DISABLED_STRINGS,
          '%markerMenu_disallowed_label%': 'Disallowed',
          '%markerMenu_deprecated_label%': 'Deprecated',
        }}
        markerMenuItems={[{ marker: 'bd', title: 'Bold', isDisabled: true, action: vi.fn() }]}
      />,
    );

    const row = screen.getByRole('option', { name: /Bold/ });
    expect(row).not.toHaveTextContent('Disallowed');
    expect(row).not.toHaveTextContent('Deprecated');
  });
});

describe('MarkerMenu — row layout', () => {
  const ITEMS = [
    { marker: 'p', title: 'Paragraph', subtitle: 'Normal paragraph text', action: vi.fn() },
  ];

  it('renders the marker code as code, not prose', () => {
    render(<MarkerMenu localizedStrings={DEFAULT_LOCALIZED_STRINGS} markerMenuItems={ITEMS} />);

    expect(screen.getByText('p').className).toMatch(/(?:^|\s)tw:font-mono(?:\s|$)/);
  });

  it('places the detail after the title so it reads as a trailing annotation rather than a second line', () => {
    render(<MarkerMenu localizedStrings={DEFAULT_LOCALIZED_STRINGS} markerMenuItems={ITEMS} />);

    // Reading the row's text in document order says "detail comes after title" directly, and
    // survives the two being nested differently — which a `compareDocumentPosition` bitmask check
    // does not.
    const row = screen.getByRole('option', { name: /Paragraph/ });

    expect(row.textContent).toMatch(/Paragraph.*Normal paragraph text/);
  });

  it('renders the detail smaller and muted so it never competes with the title', () => {
    render(<MarkerMenu localizedStrings={DEFAULT_LOCALIZED_STRINGS} markerMenuItems={ITEMS} />);

    const detail = screen.getByText('Normal paragraph text');
    expect(detail.className).toMatch(/(?:^|\s)tw:text-xs(?:\s|$)/);
    expect(detail.className).toMatch(/(?:^|\s)tw:text-muted-foreground(?:\s|$)/);
    expect(detail.className).toMatch(/(?:^|\s)tw:truncate(?:\s|$)/);
  });

  it('keeps both the title and the detail able to clip, so neither wraps in a narrow popover', () => {
    render(<MarkerMenu localizedStrings={DEFAULT_LOCALIZED_STRINGS} markerMenuItems={ITEMS} />);

    expect(screen.getByText('Paragraph').className).toMatch(/(?:^|\s)tw:min-w-0(?:\s|$)/);
    expect(screen.getByText('Normal paragraph text').className).toMatch(
      /(?:^|\s)tw:min-w-0(?:\s|$)/,
    );
  });

  it('weights the detail to give up its space first, so the title keeps as much of the row as it can', () => {
    // The title identifies the row; the detail restates it. Both truncate, but a shrink factor
    // this lopsided means the detail is down to an ellipsis before the title loses a character.
    render(<MarkerMenu localizedStrings={DEFAULT_LOCALIZED_STRINGS} markerMenuItems={ITEMS} />);

    expect(screen.getByText('Normal paragraph text').className).toMatch(
      /(?:^|\s)tw:shrink-\[9999\](?:\s|$)/,
    );
    expect(screen.getByText('Paragraph').className).toMatch(/(?:^|\s)tw:shrink(?:\s|$)/);
  });

  it('keeps the detail reachable at every width, since the popover has its own fixed width', () => {
    // The menu portals out of the toolbar, so the toolbar's width says nothing about how much room
    // the popover has. CSS truncation handles narrow popovers; the `title` attribute keeps the full
    // text available either way.
    render(<MarkerMenu localizedStrings={DEFAULT_LOCALIZED_STRINGS} markerMenuItems={ITEMS} />);

    expect(screen.getByText('Normal paragraph text')).toHaveAttribute(
      'title',
      'Normal paragraph text',
    );
  });

  it('renders a row with no detail as title only', () => {
    render(
      <MarkerMenu
        localizedStrings={DEFAULT_LOCALIZED_STRINGS}
        markerMenuItems={[{ marker: 'q1', title: 'Poetry line 1', action: vi.fn() }]}
      />,
    );

    // Two children — the marker slot and the title — with no empty third element where the detail
    // would sit. The previous version of this only asserted text the row query already guaranteed.
    const row = screen.getByRole('option', { name: /Poetry line 1/ });
    const titleRow = screen.getByText('Poetry line 1').parentElement;
    expect(titleRow?.children).toHaveLength(1);
    expect(row).toHaveTextContent('q1');
  });
});
