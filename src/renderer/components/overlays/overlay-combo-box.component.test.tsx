import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OverlayComboBoxPresentational } from './overlay-combo-box.component';
import { ComboBoxItem } from '../../services/overlays/overlay.service-model';

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

describe('OverlayComboBoxPresentational', () => {
  const sampleItems: ComboBoxItem[] = [
    { id: 'open', label: 'Open File' },
    { id: 'save', label: 'Save File' },
    { id: 'close', label: 'Close Tab' },
  ];

  describe('centered mode (no position)', () => {
    it('should call onSelect with the correct item id when an item is clicked', () => {
      const onSelect = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayComboBoxPresentational
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
        <OverlayComboBoxPresentational
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
        <OverlayComboBoxPresentational
          items={sampleItems}
          onSelect={onSelect}
          onDismiss={onDismiss}
        />,
      );

      const backdrop = document.querySelector('[data-overlay-combo-box-backdrop]');
      expect(backdrop).toBeInTheDocument();
      // querySelector returns Element | null; the expect above guards null, but TS can't narrow it
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      fireEvent.click(backdrop as Element);

      expect(onDismiss).toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('should display custom noResultsText', () => {
      render(
        <OverlayComboBoxPresentational
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
        <OverlayComboBoxPresentational
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
      const items: ComboBoxItem[] = [
        { id: 'disabled-item', label: 'Cannot Click', disabled: true },
      ];

      render(
        <OverlayComboBoxPresentational items={items} onSelect={onSelect} onDismiss={vi.fn()} />,
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
        <OverlayComboBoxPresentational
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
        <OverlayComboBoxPresentational
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
        <OverlayComboBoxPresentational
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
        <OverlayComboBoxPresentational
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
        <OverlayComboBoxPresentational
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
      const groupedItems: ComboBoxItem[] = [
        { id: 'open', label: 'Open File', group: 'File' },
        { id: 'save', label: 'Save File', group: 'File' },
        { id: 'find', label: 'Find', group: 'Edit' },
      ];

      render(
        <OverlayComboBoxPresentational
          items={groupedItems}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      expect(screen.getByText('File')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });
  });
});
