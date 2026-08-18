import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  addOverlay,
  clearAllOverlays,
  getOverlayById,
} from '../../services/overlays/overlay-store';
import {
  OverlayCommandPalette,
  OverlayCommandPalettePresentational,
} from './overlay-command-palette.component';
import { CommandPaletteItem, OverlayEntry } from '../../services/overlays/overlay.service-model';

// The store-connected component resolves LocalizeKeys via useLocalizedStrings; an empty map makes
// every value fall back to its raw text, so tests assert against the literal item labels.
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{}, false]),
}));

beforeAll(() => {
  // Radix Popover uses ResizeObserver internally; jsdom doesn't provide it, so we stub a no-op
  // implementation. The methods intentionally don't use `this` since they're empty stubs.
  global.ResizeObserver = class {
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // jsdom stub: empty no-op intentionally has no `this` usage
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
  // cmdk calls scrollIntoView which jsdom doesn't implement
  Element.prototype.scrollIntoView = vi.fn();
});

describe('OverlayCommandPalettePresentational', () => {
  const sampleItems: CommandPaletteItem[] = [
    { id: 'open', label: 'Open File' },
    { id: 'save', label: 'Save File' },
    { id: 'close', label: 'Close Tab' },
  ];

  describe('centered mode (no position)', () => {
    it('should call onSelect with the correct item id when an item is clicked', () => {
      const onSelect = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelect={onSelect}
          onDismiss={onDismiss}
        />,
      );

      fireEvent.click(screen.getByText('Save File'));

      expect(onSelect).toHaveBeenCalledWith('save');
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('should call onDismiss when Escape is pressed', () => {
      const onSelect = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelect={onSelect}
          onDismiss={onDismiss}
        />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });

      expect(onDismiss).toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('should call onDismiss when clicking the backdrop', () => {
      const onSelect = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelect={onSelect}
          onDismiss={onDismiss}
        />,
      );

      const backdrop = document.querySelector('[data-overlay-command-palette-backdrop]');
      expect(backdrop).toBeInTheDocument();
      // querySelector returns Element | null; the expect above guards null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      fireEvent.click(backdrop as Element);

      expect(onDismiss).toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('should display custom noResultsText', () => {
      render(
        <OverlayCommandPalettePresentational
          items={[]}
          noResultsText="Nothing here"
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Nothing here')).toBeInTheDocument();
    });

    it('should display custom placeholder text', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          placeholder="Type a command..."
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument();
    });

    it('should not call onSelect when a disabled item is clicked', () => {
      const onSelect = vi.fn();
      const items: CommandPaletteItem[] = [
        { id: 'disabled-item', label: 'Cannot Click', disabled: true },
      ];

      render(
        <OverlayCommandPalettePresentational
          items={items}
          onSelect={onSelect}
          onDismiss={vi.fn()}
        />,
      );

      fireEvent.click(screen.getByText('Cannot Click'));

      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('anchored mode (with position)', () => {
    it('should call onSelect with the correct item id when an item is clicked', () => {
      const onSelect = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          position={{ x: 100, y: 200 }}
          onSelect={onSelect}
          onDismiss={onDismiss}
        />,
      );

      fireEvent.click(screen.getByText('Close Tab'));

      expect(onSelect).toHaveBeenCalledWith('close');
      expect(onDismiss).not.toHaveBeenCalled();
    });
  });

  describe('search filtering', () => {
    it('should filter visible items when typing in the search input', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      // All items visible initially
      expect(screen.getByText('Open File')).toBeInTheDocument();
      expect(screen.getByText('Save File')).toBeInTheDocument();
      expect(screen.getByText('Close Tab')).toBeInTheDocument();

      // Type in the search input to filter
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Save' } });

      // Only matching item remains visible; non-matching items are hidden by cmdk
      expect(screen.getByText('Save File')).toBeInTheDocument();
      expect(screen.queryByText('Close Tab')).not.toBeInTheDocument();
    });

    it('should show noResultsText when search matches nothing', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          noResultsText="Nothing found"
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'zzzzz' } });

      expect(screen.getByText('Nothing found')).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('should select the first item when Enter is pressed without arrow navigation', () => {
      const onSelect = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelect={onSelect}
          onDismiss={vi.fn()}
        />,
      );

      // cmdk auto-selects the first item; pressing Enter should select it
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

      expect(onSelect).toHaveBeenCalledWith('open');
    });

    it('should select the second item after pressing ArrowDown then Enter', () => {
      const onSelect = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelect={onSelect}
          onDismiss={vi.fn()}
        />,
      );

      const input = screen.getByRole('combobox');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onSelect).toHaveBeenCalledWith('save');
    });
  });

  describe('active-palette auto-focus', () => {
    it('should retry across animation frames until the search input holds focus', async () => {
      // Simulate the palette losing the initial focus fight (an editor iframe re-grabbing focus
      // after the palette opens): while focus() is a no-op, the mount-time attempt cannot stick,
      // so the palette must keep retrying on animation frames.
      const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus').mockImplementation(() => {});

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      const input = screen.getByRole('combobox');
      expect(input).not.toHaveFocus();

      // Focus can stick again — a later animation-frame retry must land it without a re-render
      focusSpy.mockRestore();
      await vi.waitFor(() => expect(input).toHaveFocus());
    });

    it('should not throw when the palette unmounts before focus ever sticks', async () => {
      const focusSpy = vi.spyOn(HTMLElement.prototype, 'focus').mockImplementation(() => {});

      const { unmount } = render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );
      unmount();
      focusSpy.mockRestore();

      // Let a couple of animation frames pass; unmount must have cancelled the retry loop, so no
      // stray callback throws or focuses the removed input.
      await new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(undefined)));
      });
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
      expect(document.body).toHaveFocus();
    });
  });

  describe('active mode — store-driven selection and filter parity (single source of truth)', () => {
    // The host's commitCommandPaletteSelection resolves filterPaletteItems(items, store.filterText)
    // [store.selectedIndex]. These tests pin that the ACTIVE palette displays exactly that state:
    // forwarded updates move the visible selection, local input mirrors back out via callbacks,
    // and the visible list uses the same startsWith filter — so commit and display always agree.

    it('highlights the item at selectedIndex (a forwarded moveSelection moves the visible selection)', () => {
      const onSelect = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          selectedIndex={1}
          onSelect={onSelect}
          onDismiss={vi.fn()}
        />,
      );

      // Enter with no local navigation must select the externally-highlighted item, not item 0.
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter' });

      expect(onSelect).toHaveBeenCalledWith('save');
    });

    it('filters with the same containment algorithm the host commit uses (no cmdk fuzzy drift)', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      // cmdk's fuzzy scoring would keep 'Open File' for the subsequence 'onf' ('OpeN File');
      // plain containment must not — otherwise the display would disagree with what a forwarded
      // commit picks from the store-filtered list.
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'onf' } });

      expect(screen.queryByText('Open File')).not.toBeInTheDocument();
      expect(screen.queryByText('Save File')).not.toBeInTheDocument();
      expect(screen.queryByText('Close Tab')).not.toBeInTheDocument();
    });

    it('does NOT match description text — label-only, editor-palette parity (owner-directed)', () => {
      // Description containment is what buried exact marker matches (the "typed w, exact match
      // ranked 9th" report): matching runs on labels only now, identical to the editor palette.
      const items: CommandPaletteItem[] = [
        { id: 'p', label: 'Paragraph (p)', description: 'Normal paragraph' },
        { id: 'm', label: 'Margin (m)', description: 'Flush-left paragraph' },
      ];

      render(
        <OverlayCommandPalettePresentational
          items={items}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Normal' } });

      expect(screen.queryByText('Paragraph (p)')).not.toBeInTheDocument();
      expect(screen.queryByText('Margin (m)')).not.toBeInTheDocument();
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('matches labels case-insensitively (lowercase input finds capitalized labels)', () => {
      const items: CommandPaletteItem[] = [
        { id: 'p', label: 'Paragraph (p)', description: 'Normal paragraph' },
        { id: 'q1', label: 'Poetry Line 1 (q1)', description: 'First level poetry' },
      ];

      render(
        <OverlayCommandPalettePresentational
          items={items}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'paragraph' } });

      expect(screen.getByText('Paragraph (p)')).toBeInTheDocument();
      expect(screen.queryByText('Poetry Line 1 (q1)')).not.toBeInTheDocument();
    });

    it('reports typed filter text via onFilterTextChange so the store can mirror it', () => {
      const onFilterTextChange = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onFilterTextChange={onFilterTextChange}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Sa' } });

      expect(onFilterTextChange).toHaveBeenCalledWith('Sa');
    });

    it('reports arrow-key highlight moves via onSelectedIndexChange so the store can mirror them', () => {
      const onSelectedIndexChange = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelectedIndexChange={onSelectedIndexChange}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

      expect(onSelectedIndexChange).toHaveBeenCalledWith(1);
    });
  });

  describe('grouped items', () => {
    it('should render group headings when items have group keys', () => {
      const groupedItems: CommandPaletteItem[] = [
        { id: 'open', label: 'Open File', group: 'File' },
        { id: 'save', label: 'Save File', group: 'File' },
        { id: 'find', label: 'Find', group: 'Edit' },
      ];

      render(
        <OverlayCommandPalettePresentational
          items={groupedItems}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('File')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });
  });

  describe('passive mode', () => {
    it('should not render a search input', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
      expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
    });

    it('should never steal focus on mount', () => {
      const focusTarget = document.createElement('button');
      document.body.appendChild(focusTarget);
      focusTarget.focus();
      expect(document.activeElement).toBe(focusTarget);

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(document.activeElement).toBe(focusTarget);
      focusTarget.remove();
    });

    it('should still render all items via filterPaletteItems, grouped the same as active mode', () => {
      const groupedItems: CommandPaletteItem[] = [
        { id: 'open', label: 'Open File', group: 'File' },
        { id: 'find', label: 'Find', group: 'Edit' },
      ];

      render(
        <OverlayCommandPalettePresentational
          items={groupedItems}
          passive
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('File')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Open File')).toBeInTheDocument();
      expect(screen.getByText('Find')).toBeInTheDocument();
    });

    it('should narrow the rendered items via the filterText prop', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          filterText="Sa"
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Save File')).toBeInTheDocument();
      expect(screen.queryByText('Open File')).not.toBeInTheDocument();
      expect(screen.queryByText('Close Tab')).not.toBeInTheDocument();
    });

    it('should prefix-match the filterText case-insensitively (typed lowercase marker finds capitalized label)', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          filterText="sa"
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Save File')).toBeInTheDocument();
      expect(screen.queryByText('Open File')).not.toBeInTheDocument();
      expect(screen.queryByText('Close Tab')).not.toBeInTheDocument();
    });

    it('should keep prefix semantics (a mid-label match hides the item)', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          filterText="File"
          noResultsText="Nothing found"
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      // 'File' appears inside 'Open File' and 'Save File' but starts neither label — the passive
      // marker palette filters by typed prefix, so containment must not match
      expect(screen.queryByText('Open File')).not.toBeInTheDocument();
      expect(screen.queryByText('Save File')).not.toBeInTheDocument();
      expect(screen.getByText('Nothing found')).toBeInTheDocument();
    });

    it('should show noResultsText when filterText matches nothing', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          filterText="zzzzz"
          noResultsText="Nothing found"
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Nothing found')).toBeInTheDocument();
    });

    it('should highlight the item at selectedIndex', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          selectedIndex={1}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      const highlighted = screen.getByText('Save File').closest('[data-slot="command-item"]');
      const notHighlighted = screen.getByText('Open File').closest('[data-slot="command-item"]');
      expect(highlighted).toHaveAttribute('aria-selected', 'true');
      expect(notHighlighted).toHaveAttribute('aria-selected', 'false');
    });

    it('should move the highlight when selectedIndex changes (rerender)', () => {
      const { rerender } = render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          selectedIndex={0}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );
      expect(screen.getByText('Open File').closest('[data-slot="command-item"]')).toHaveAttribute(
        'aria-selected',
        'true',
      );

      rerender(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          selectedIndex={2}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('Open File').closest('[data-slot="command-item"]')).toHaveAttribute(
        'aria-selected',
        'false',
      );
      expect(screen.getByText('Close Tab').closest('[data-slot="command-item"]')).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });

    it('should render items with role="option" and point the listbox aria-activedescendant at the highlighted item', () => {
      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          selectedIndex={1}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3);

      const highlighted = screen.getByText('Save File').closest('[data-slot="command-item"]');
      expect(highlighted?.getAttribute('id')).toBeTruthy();
      expect(screen.getByRole('listbox')).toHaveAttribute(
        'aria-activedescendant',
        highlighted?.getAttribute('id') ?? '',
      );
    });

    it('should call onSelect when an item is clicked', () => {
      const onSelect = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          onSelect={onSelect}
          onDismiss={vi.fn()}
        />,
      );

      fireEvent.click(screen.getByText('Close Tab'));

      expect(onSelect).toHaveBeenCalledWith('close');
    });

    it('should not call onSelect when a disabled item is clicked', () => {
      const onSelect = vi.fn();
      const items: CommandPaletteItem[] = [
        { id: 'disabled-item', label: 'Cannot Click', disabled: true },
      ];

      render(
        <OverlayCommandPalettePresentational
          items={items}
          passive
          onSelect={onSelect}
          onDismiss={vi.fn()}
        />,
      );

      fireEvent.click(screen.getByText('Cannot Click'));

      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('mouse commits must not steal focus (mousedown default-prevented)', () => {
    // Pressing the mouse button on a palette item is what transfers focus to the renderer
    // document — BEFORE the click commit round-trips to the requesting editor. For the editor
    // (main web view or footnote popover) that blur can null Lexical's live selection, and the
    // marker apply then lands at the document tail instead of the caret. The classic
    // toolbar-button discipline: preventDefault on mousedown so a click commits without the
    // palette ever taking focus. The click must still select (selection fires on click, not
    // mousedown).

    it('passive mode: mousedown on an item is default-prevented and click still selects', () => {
      const onSelect = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          passive
          onSelect={onSelect}
          onDismiss={vi.fn()}
        />,
      );

      const item = screen.getByText('Save File');
      // fireEvent returns false when preventDefault was called on the (cancelable) event.
      expect(fireEvent.mouseDown(item)).toBe(false);
      fireEvent.click(item);
      expect(onSelect).toHaveBeenCalledWith('save');
    });

    it('active mode: mousedown on a cmdk item is default-prevented and click still selects', () => {
      const onSelect = vi.fn();

      render(
        <OverlayCommandPalettePresentational
          items={sampleItems}
          onSelect={onSelect}
          onDismiss={vi.fn()}
        />,
      );

      const item = screen.getByText('Save File');
      expect(fireEvent.mouseDown(item)).toBe(false);
      // cmdk selects on click, which preventDefault-on-mousedown must not suppress.
      fireEvent.click(item);
      expect(onSelect).toHaveBeenCalledWith('save');
    });
  });

  describe('muted items', () => {
    const mutedAndNormalItems: CommandPaletteItem[] = [
      { id: 'basic', label: 'Basic Marker' },
      { id: 'non-basic', label: 'Non-Basic Marker', muted: true },
    ];

    /**
     * The text block inside an item — where muted opacity is applied (not the item container).
     * Muted uses an INLINE style, not a tw: utility: the renderer has no Tailwind build of its own
     * (all tw: classes come from platform-bible-react's prebuilt stylesheet, which does not scan
     * this component), so a class-based approach silently loses the CSS rule at runtime.
     */
    function getTextBlockOpacity(label: string): string {
      const textBlock = screen.getByText(label).parentElement;
      expect(textBlock).toBeInstanceOf(HTMLElement);
      return textBlock instanceof HTMLElement ? textBlock.style.opacity : '';
    }

    it('should render muted items with reduced-opacity text in active mode, normal items without', () => {
      render(
        <OverlayCommandPalettePresentational
          items={mutedAndNormalItems}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(getTextBlockOpacity('Non-Basic Marker')).toBe('0.6');
      expect(getTextBlockOpacity('Basic Marker')).toBe('');
    });

    it('should render muted items with reduced-opacity text in passive mode, normal items without', () => {
      render(
        <OverlayCommandPalettePresentational
          items={mutedAndNormalItems}
          passive
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(getTextBlockOpacity('Non-Basic Marker')).toBe('0.6');
      expect(getTextBlockOpacity('Basic Marker')).toBe('');
    });

    it('should keep muted items selectable (unlike disabled)', () => {
      const onSelect = vi.fn();
      render(
        <OverlayCommandPalettePresentational
          items={mutedAndNormalItems}
          passive
          onSelect={onSelect}
          onDismiss={vi.fn()}
        />,
      );

      fireEvent.click(screen.getByText('Non-Basic Marker'));

      expect(onSelect).toHaveBeenCalledWith('non-basic');
    });
  });
});

describe('OverlayCommandPalette (store-connected)', () => {
  const paletteItems: CommandPaletteItem[] = [
    { id: 'open', label: 'Open File' },
    { id: 'save', label: 'Save File' },
    { id: 'close', label: 'Close Tab' },
  ];

  type CommandPaletteEntry = Extract<OverlayEntry, { type: 'commandPalette' }>;

  /** Builds a centered (no position) active-mode command palette entry backed by mock callbacks */
  function createPaletteEntry(overrides?: Partial<CommandPaletteEntry>): CommandPaletteEntry {
    return {
      type: 'commandPalette',
      id: 'palette-1',
      webViewId: 'webview-1',
      request: { items: paletteItems },
      items: paletteItems,
      selectedIndex: 0,
      resolve: vi.fn(),
      reject: vi.fn(),
      ...overrides,
    };
  }

  /** Reads the palette entry back from the real store, asserting it exists and has the right type */
  function getStoredPalette(id: string): CommandPaletteEntry {
    const overlay = getOverlayById(id);
    expect(overlay?.type).toBe('commandPalette');
    // Type is verified by the assertion above; TS can't narrow the OverlayEntry union
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return overlay as CommandPaletteEntry;
  }

  beforeEach(() => {
    clearAllOverlays();
  });

  it('mirrors typed filter text into the store so a forwarded commit resolves against the displayed list', () => {
    const entry = createPaletteEntry();
    addOverlay(entry);
    render(<OverlayCommandPalette overlay={entry} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Sa' } });

    expect(getStoredPalette('palette-1').filterText).toBe('Sa');
  });

  it('clamps the stored selectedIndex with the FILTERED item count when typing narrows the list', () => {
    // A filter matching nothing forces itemCount to 0 — the stale index 2 must clamp to 0. With an
    // empty filtered list cmdk reports no highlight change, so only the filter-text mirroring path
    // (its filterPaletteItems-derived itemCount) can produce the clamp.
    const entry = createPaletteEntry({ selectedIndex: 2 });
    addOverlay(entry);
    render(<OverlayCommandPalette overlay={entry} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'zz' } });

    const stored = getStoredPalette('palette-1');
    expect(stored.filterText).toBe('zz');
    expect(stored.selectedIndex).toBe(0);
  });

  it('mirrors arrow-key highlight moves into the store as an absolute selectedIndex', () => {
    const entry = createPaletteEntry();
    addOverlay(entry);
    render(<OverlayCommandPalette overlay={entry} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

    expect(getStoredPalette('palette-1').selectedIndex).toBe(1);
  });

  it('resolves the overlay with the clicked item id and removes it from the store', () => {
    const entry = createPaletteEntry();
    addOverlay(entry);
    render(<OverlayCommandPalette overlay={entry} />);

    fireEvent.click(screen.getByText('Save File'));

    expect(entry.resolve).toHaveBeenCalledTimes(1);
    expect(entry.resolve).toHaveBeenCalledWith('save');
    expect(getOverlayById('palette-1')).toBeUndefined();
  });

  it('resolves the overlay with undefined on Escape and removes it from the store', () => {
    const entry = createPaletteEntry();
    addOverlay(entry);
    render(<OverlayCommandPalette overlay={entry} />);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });

    expect(entry.resolve).toHaveBeenCalledTimes(1);
    expect(entry.resolve).toHaveBeenCalledWith(undefined);
    expect(getOverlayById('palette-1')).toBeUndefined();
  });

  it('never settles the store again after the first resolve (later select/dismiss are no-ops)', () => {
    const entry = createPaletteEntry();
    addOverlay(entry);
    render(<OverlayCommandPalette overlay={entry} />);

    fireEvent.click(screen.getByText('Save File'));
    expect(entry.resolve).toHaveBeenCalledTimes(1);

    // The store can later hold a different overlay under the same id; the already-settled (but
    // still mounted) palette instance must never resolve or dismiss an entry it did not create.
    // (Highlight/filter mirroring is intentionally not guarded — only settling is.)
    const successor = createPaletteEntry();
    addOverlay(successor);

    fireEvent.click(screen.getByText('Open File'));
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });

    expect(successor.resolve).not.toHaveBeenCalled();
    expect(successor.reject).not.toHaveBeenCalled();
    expect(getStoredPalette('palette-1')).toBeDefined();
    expect(entry.resolve).toHaveBeenCalledTimes(1);
  });
});
