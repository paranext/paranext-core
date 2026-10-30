import { vi } from 'vitest';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
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

  it('should ignore the outside press a window blur produces', async () => {
    const onDismiss = vi.fn();

    render(
      <OverlayContextMenuPresentational
        items={[{ type: 'item', id: 'copy', label: 'Copy' }]}
        position={position}
        onSelect={vi.fn()}
        onDismiss={onDismiss}
      />,
    );

    // Radix attaches its outside-press listener on the next tick
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 20);
      });
    });

    // The shared wrapper answers a window blur with a marked outside press
    fireEvent.blur(window);
    expect(onDismiss).not.toHaveBeenCalled();

    // Positive control: an ordinary outside press still dismisses
    fireEvent.pointerDown(document.body);
    expect(onDismiss).toHaveBeenCalled();
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

  it('shows the shortcut as keycaps beside an item that has one, and nothing beside one without', () => {
    const items: OverlayContextMenuItem[] = [
      { type: 'item', id: 'find', label: 'Find', shortcut: 'Ctrl+F' },
      { type: 'item', id: 'other', label: 'Other' },
    ];

    render(
      <OverlayContextMenuPresentational
        items={items}
        position={position}
        onSelect={vi.fn()}
        onDismiss={vi.fn()}
      />,
    );

    const find = screen.getByRole('menuitem', { name: /^Find/ });
    const shortcut = find.querySelector('[data-slot="dropdown-menu-shortcut"]');
    expect(shortcut).not.toBeNull();
    expect(within(find).getByText('Ctrl').tagName).toBe('KBD');
    expect(within(find).getByText('F').tagName).toBe('KBD');
    const other = screen.getByRole('menuitem', { name: 'Other' });
    expect(other.querySelector('[data-slot="dropdown-menu-shortcut"]')).toBeNull();
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

  describe('reporting Escape', () => {
    it('reports Escape in the menu before it dismisses', () => {
      const calls: string[] = [];

      render(
        <OverlayContextMenuPresentational
          items={[{ type: 'item', id: 'copy', label: 'Copy' }]}
          position={position}
          onSelect={vi.fn()}
          onDismiss={() => calls.push('dismiss')}
          onEscape={() => calls.push('escape')}
        />,
      );

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

      expect(calls).toEqual(['escape', 'dismiss']);
    });

    it('reports Escape pressed inside a submenu, which closes the whole menu', () => {
      const calls: string[] = [];

      render(
        <OverlayContextMenuPresentational
          items={[
            {
              type: 'submenu',
              label: 'More',
              items: [{ type: 'item', id: 'inner', label: 'Inner' }],
            },
          ]}
          position={position}
          onSelect={vi.fn()}
          onDismiss={() => calls.push('dismiss')}
          onEscape={() => calls.push('escape')}
        />,
      );

      const trigger = screen.getByRole('menuitem', { name: 'More' });
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'ArrowRight' });
      const inner = screen.getByRole('menuitem', { name: 'Inner' });
      fireEvent.keyDown(inner, { key: 'Escape' });

      expect(calls).toEqual(['escape', 'dismiss']);
    });

    it('does not report an outside press as Escape', async () => {
      const onEscape = vi.fn();
      const onDismiss = vi.fn();

      render(
        <OverlayContextMenuPresentational
          items={[{ type: 'item', id: 'copy', label: 'Copy' }]}
          position={position}
          onSelect={vi.fn()}
          onDismiss={onDismiss}
          onEscape={onEscape}
        />,
      );
      await act(async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 20);
        });
      });

      fireEvent.pointerDown(document.body);

      expect(onDismiss).toHaveBeenCalled();
      expect(onEscape).not.toHaveBeenCalled();
    });
  });

  describe('scale', () => {
    const items: OverlayContextMenuItem[] = [{ type: 'item', id: 'copy', label: 'Copy' }];

    it('draws at interface scale', () => {
      render(
        <OverlayContextMenuPresentational
          items={items}
          position={position}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );

      const menu = screen.getByRole('menu');
      // jsdom leaves an unassigned inline style property `undefined` rather than '', so check both.
      expect(menu.style.zoom || '').toBe('');
      expect(menu.style.maxWidth).toBe('');
    });
  });
});
