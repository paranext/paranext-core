import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OverlayCommandPalettePresentational } from './overlay-command-palette.component';
import { CommandPaletteItem } from '../../services/overlays/overlay.service-model';

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

  describe('muted items', () => {
    const mutedAndNormalItems: CommandPaletteItem[] = [
      { id: 'basic', label: 'Basic Marker' },
      { id: 'non-basic', label: 'Non-Basic Marker', muted: true },
    ];

    /** The text block inside an item — where muted opacity is applied (not the item container). */
    function getTextBlockClasses(label: string): string {
      const textBlock = screen.getByText(label).parentElement;
      expect(textBlock).not.toBeNull();
      return textBlock?.className ?? '';
    }

    it('should render muted items with reduced-opacity text in active mode, normal items without', () => {
      render(
        <OverlayCommandPalettePresentational
          items={mutedAndNormalItems}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(getTextBlockClasses('Non-Basic Marker')).toContain('tw:opacity-60');
      expect(getTextBlockClasses('Basic Marker')).not.toContain('tw:opacity-60');
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

      expect(getTextBlockClasses('Non-Basic Marker')).toContain('tw:opacity-60');
      expect(getTextBlockClasses('Basic Marker')).not.toContain('tw:opacity-60');
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
