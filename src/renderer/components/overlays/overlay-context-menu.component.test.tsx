import { vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  OverlayContextMenuPresentational,
  OverlayContextMenuItem,
  OverlayContextMenuResult,
} from './overlay-context-menu.component';

// Radix DropdownMenu uses ResizeObserver internally; jsdom doesn't provide it, so we stub a no-op
// implementation. The methods intentionally don't use `this` since they're empty stubs.
beforeAll(() => {
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
});

describe('OverlayContextMenuPresentational', () => {
  const position = { x: 100, y: 200 };

  it('should call onSelect with the correct itemId when a plain item is clicked', () => {
    const onSelect = vi.fn();
    const onDismiss = vi.fn();
    const items: OverlayContextMenuItem[] = [
      { type: 'item', id: 'copy', label: 'Copy' },
      { type: 'item', id: 'paste', label: 'Paste' },
    ];

    render(
      <OverlayContextMenuPresentational
        items={items}
        position={position}
        onSelect={onSelect}
        onDismiss={onDismiss}
      />,
    );

    fireEvent.click(screen.getByRole('menuitem', { name: 'Paste' }));

    expect(onSelect).toHaveBeenCalledWith({ itemId: 'paste' } satisfies OverlayContextMenuResult);
  });

  it('should not call onSelect when a disabled item is clicked', () => {
    const onSelect = vi.fn();
    const onDismiss = vi.fn();
    const items: OverlayContextMenuItem[] = [
      { type: 'item', id: 'delete', label: 'Delete', disabled: true },
    ];

    render(
      <OverlayContextMenuPresentational
        items={items}
        position={position}
        onSelect={onSelect}
        onDismiss={onDismiss}
      />,
    );

    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should render separators between items', () => {
    const items: OverlayContextMenuItem[] = [
      { type: 'item', id: 'copy', label: 'Copy' },
      { type: 'separator' },
      { type: 'item', id: 'paste', label: 'Paste' },
    ];

    render(
      <OverlayContextMenuPresentational
        items={items}
        position={position}
        onSelect={vi.fn()}
        onDismiss={vi.fn()}
      />,
    );

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  describe('submenu', () => {
    it('should render a submenu trigger and show submenu items on pointer enter', () => {
      vi.useFakeTimers();
      const onSelect = vi.fn();
      const items: OverlayContextMenuItem[] = [
        {
          type: 'submenu',
          label: 'More Actions',
          items: [
            { type: 'item', id: 'rename', label: 'Rename' },
            { type: 'item', id: 'duplicate', label: 'Duplicate' },
          ],
        },
      ];

      render(
        <OverlayContextMenuPresentational
          items={items}
          position={position}
          onSelect={onSelect}
          onDismiss={vi.fn()}
        />,
      );

      // The submenu trigger should be visible
      const trigger = screen.getByText('More Actions');
      expect(trigger).toBeInTheDocument();

      // Hover over the submenu trigger to open it, wrapping timer advance in act
      fireEvent.pointerEnter(trigger);
      act(() => {
        vi.advanceTimersByTime(200);
      });

      // Submenu items should now be visible
      expect(screen.getByText('Rename')).toBeInTheDocument();
      expect(screen.getByText('Duplicate')).toBeInTheDocument();

      // Click a submenu item
      fireEvent.click(screen.getByRole('menuitem', { name: 'Rename' }));
      expect(onSelect).toHaveBeenCalledWith({
        itemId: 'rename',
      } satisfies OverlayContextMenuResult);

      vi.useRealTimers();
    });
  });

  describe('dismissal', () => {
    it('should call onDismiss when Escape is pressed', () => {
      const onDismiss = vi.fn();
      const items: OverlayContextMenuItem[] = [{ type: 'item', id: 'copy', label: 'Copy' }];

      render(
        <OverlayContextMenuPresentational
          items={items}
          position={position}
          onSelect={vi.fn()}
          onDismiss={onDismiss}
        />,
      );

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

      expect(onDismiss).toHaveBeenCalled();
    });

    it('should not call onSelect when dismissed via Escape', () => {
      const onSelect = vi.fn();
      const onDismiss = vi.fn();
      const items: OverlayContextMenuItem[] = [
        { type: 'item', id: 'copy', label: 'Copy' },
        { type: 'item', id: 'paste', label: 'Paste' },
      ];

      render(
        <OverlayContextMenuPresentational
          items={items}
          position={position}
          onSelect={onSelect}
          onDismiss={onDismiss}
        />,
      );

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

      expect(onDismiss).toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    });
  });
});
