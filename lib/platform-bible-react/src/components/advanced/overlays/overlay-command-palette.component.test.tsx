import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  OverlayCommandPalette,
  OverlayCommandPaletteItem,
} from './overlay-command-palette.component';

beforeAll(() => {
  // Radix Popover uses ResizeObserver internally; jsdom doesn't provide it, so we stub a no-op
  // implementation. The methods intentionally don't use `this` since they're empty stubs.
  global.ResizeObserver = class {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
  // cmdk calls scrollIntoView which jsdom doesn't implement
  Element.prototype.scrollIntoView = vi.fn();
});

describe('OverlayCommandPalette', () => {
  const sampleItems: OverlayCommandPaletteItem[] = [
    { id: 'open', label: 'Open File' },
    { id: 'save', label: 'Save File' },
    { id: 'close', label: 'Close Tab' },
  ];

  describe('centered mode (no position)', () => {
    it('should call onSelect with the correct item id when an item is clicked', () => {
      const onSelect = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayCommandPalette items={sampleItems} onSelect={onSelect} onDismiss={onDismiss} />,
      );

      fireEvent.click(screen.getByText('Save File'));

      expect(onSelect).toHaveBeenCalledWith('save');
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it('should call onDismiss when Escape is pressed', () => {
      const onSelect = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayCommandPalette items={sampleItems} onSelect={onSelect} onDismiss={onDismiss} />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });

      expect(onDismiss).toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('should call onDismiss when clicking the backdrop', () => {
      const onSelect = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayCommandPalette items={sampleItems} onSelect={onSelect} onDismiss={onDismiss} />,
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
        <OverlayCommandPalette
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
        <OverlayCommandPalette
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
      const items: OverlayCommandPaletteItem[] = [
        { id: 'disabled-item', label: 'Cannot Click', disabled: true },
      ];

      render(<OverlayCommandPalette items={items} onSelect={onSelect} onDismiss={vi.fn()} />);

      fireEvent.click(screen.getByText('Cannot Click'));

      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('anchored mode (with position)', () => {
    it('should call onSelect with the correct item id when an item is clicked', () => {
      const onSelect = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayCommandPalette
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

  describe('grouped items', () => {
    it('should render group headings when items have group keys', () => {
      const groupedItems: OverlayCommandPaletteItem[] = [
        { id: 'open', label: 'Open File', group: 'File' },
        { id: 'save', label: 'Save File', group: 'File' },
        { id: 'find', label: 'Find', group: 'Edit' },
      ];

      render(<OverlayCommandPalette items={groupedItems} onSelect={vi.fn()} onDismiss={vi.fn()} />);

      expect(screen.getByText('File')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });
  });
});
