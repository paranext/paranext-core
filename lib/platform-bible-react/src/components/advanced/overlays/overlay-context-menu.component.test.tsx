import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  OverlayContextMenu,
  OverlayContextMenuItem,
  OverlayContextMenuResult,
} from './overlay-context-menu.component';

// Radix DropdownMenu uses ResizeObserver internally; jsdom doesn't provide it, so we stub a no-op
// implementation. The methods intentionally don't use `this` since they're empty stubs.
beforeAll(() => {
  global.ResizeObserver = class {
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    observe() {}
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    unobserve() {}
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    disconnect() {}
  };
});

describe('OverlayContextMenu', () => {
  const position = { x: 100, y: 200 };

  it('should call onSelect with the correct itemId when a plain item is clicked', () => {
    const onSelect = vi.fn();
    const onDismiss = vi.fn();
    const items: OverlayContextMenuItem[] = [
      { type: 'item', id: 'copy', label: 'Copy' },
      { type: 'item', id: 'paste', label: 'Paste' },
    ];

    render(
      <OverlayContextMenu
        items={items}
        position={position}
        onSelect={onSelect}
        onDismiss={onDismiss}
      />,
    );

    fireEvent.click(screen.getByRole('menuitem', { name: 'Paste' }));

    expect(onSelect).toHaveBeenCalledWith({ itemId: 'paste' } satisfies OverlayContextMenuResult);
  });

  it('should call onSelect with checked state when a checkbox item is toggled', () => {
    const onSelect = vi.fn();
    const onDismiss = vi.fn();
    const items: OverlayContextMenuItem[] = [
      { type: 'checkbox', id: 'bold', label: 'Bold', checked: false },
    ];

    render(
      <OverlayContextMenu
        items={items}
        position={position}
        onSelect={onSelect}
        onDismiss={onDismiss}
      />,
    );

    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Bold' }));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ itemId: 'bold', checked: true }),
    );
  });

  it('should call onSelect with checked state when a radio item is selected', () => {
    const onSelect = vi.fn();
    const onDismiss = vi.fn();
    const items: OverlayContextMenuItem[] = [
      { type: 'radio', id: 'small', label: 'Small', value: 'sm', group: 'size', checked: true },
      { type: 'radio', id: 'large', label: 'Large', value: 'lg', group: 'size', checked: false },
    ];

    render(
      <OverlayContextMenu
        items={items}
        position={position}
        onSelect={onSelect}
        onDismiss={onDismiss}
      />,
    );

    fireEvent.click(screen.getByRole('menuitemradio', { name: 'Large' }));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ itemId: 'large', checked: true }),
    );
  });

  it('should not call onSelect when a disabled item is clicked', () => {
    const onSelect = vi.fn();
    const onDismiss = vi.fn();
    const items: OverlayContextMenuItem[] = [
      { type: 'item', id: 'delete', label: 'Delete', disabled: true },
    ];

    render(
      <OverlayContextMenu
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
      <OverlayContextMenu
        items={items}
        position={position}
        onSelect={vi.fn()}
        onDismiss={vi.fn()}
      />,
    );

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
