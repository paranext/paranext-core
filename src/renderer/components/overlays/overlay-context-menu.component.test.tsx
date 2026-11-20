import { vi } from 'vitest';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  OverlayContextMenu,
  OverlayContextMenuPresentational,
  OverlayContextMenuItem,
  OverlayContextMenuResult,
} from './overlay-context-menu.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{}]),
}));

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

  describe('item icons', () => {
    const SPACER = '[data-slot="menu-icon-spacer"]';

    function renderItems(items: OverlayContextMenuItem[]) {
      render(
        <OverlayContextMenuPresentational
          items={items}
          position={position}
          onSelect={vi.fn()}
          onDismiss={vi.fn()}
        />,
      );
    }

    it('draws the named icon of an item', () => {
      renderItems([{ type: 'item', id: 'find', label: 'Find', iconName: 'search' }]);

      expect(screen.getByRole('menuitem', { name: 'Find' }).querySelector('svg')).not.toBeNull();
    });

    it('draws the image of an item that has an icon path and no icon name', () => {
      renderItems([
        { type: 'item', id: 'find', label: 'Find', iconPath: 'https://example.test/find.svg' },
      ]);

      expect(
        // The image's alt text is part of the item's accessible name, so match by substring
        screen.getByRole('menuitem', { name: /Find/ }).querySelector('img[src$="find.svg"]'),
      ).not.toBeNull();
    });

    it('gives items without an icon the leading spacer when another item has one', () => {
      renderItems([
        { type: 'item', id: 'find', label: 'Find', iconName: 'search' },
        { type: 'item', id: 'other', label: 'Other' },
      ]);

      const withIcon = screen.getByRole('menuitem', { name: 'Find' });
      const without = screen.getByRole('menuitem', { name: 'Other' });
      expect(withIcon.querySelector(SPACER)).toBeNull();
      expect(without.querySelector(SPACER)).not.toBeNull();
    });

    it('gives a submenu trigger the leading spacer when an item in its list has an icon', () => {
      renderItems([
        { type: 'item', id: 'find', label: 'Find', iconName: 'search' },
        { type: 'submenu', label: 'More', items: [{ type: 'item', id: 'x', label: 'X' }] },
      ]);

      expect(screen.getByRole('menuitem', { name: 'More' }).querySelector(SPACER)).not.toBeNull();
    });

    it('reserves no spacer for a submenu trigger when no item in its list has an icon', () => {
      renderItems([
        { type: 'item', id: 'a', label: 'A' },
        { type: 'submenu', label: 'More', items: [{ type: 'item', id: 'x', label: 'X' }] },
      ]);

      expect(screen.getByRole('menuitem', { name: 'More' }).querySelector(SPACER)).toBeNull();
    });

    it('draws nothing for an unknown icon name with no path, and does not reserve a slot alone', () => {
      renderItems([
        { type: 'item', id: 'odd', label: 'Odd', iconName: 'not-a-known-icon' },
        { type: 'item', id: 'plain', label: 'Plain' },
      ]);

      const odd = screen.getByRole('menuitem', { name: 'Odd' });
      expect(odd.querySelector('svg')).toBeNull();
      expect(odd.querySelector('img')).toBeNull();
      expect(odd.querySelector(SPACER)).toBeNull();
      expect(screen.getByRole('menuitem', { name: 'Plain' }).querySelector(SPACER)).toBeNull();
    });

    it('treats an unknown icon name with no path like an icon-less row beside a drawn icon', () => {
      renderItems([
        { type: 'item', id: 'find', label: 'Find', iconName: 'search' },
        { type: 'item', id: 'odd', label: 'Odd', iconName: 'not-a-known-icon' },
      ]);

      const odd = screen.getByRole('menuitem', { name: 'Odd' });
      expect(odd.querySelector('svg')).toBeNull();
      expect(odd.querySelector(SPACER)).not.toBeNull();
    });

    it('reserves no spacer when no item has an icon', () => {
      renderItems([
        { type: 'item', id: 'a', label: 'A' },
        { type: 'item', id: 'b', label: 'B' },
      ]);

      expect(screen.getByRole('menuitem', { name: 'A' }).querySelector(SPACER)).toBeNull();
      expect(screen.getByRole('menuitem', { name: 'B' }).querySelector(SPACER)).toBeNull();
    });
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

    describe('when the items change while open', () => {
      const renameSubmenu = (rename: OverlayContextMenuItem): OverlayContextMenuItem => ({
        type: 'submenu',
        id: 'ext.more',
        label: 'More Actions',
        items: [rename],
      });
      const rename: OverlayContextMenuItem = { type: 'item', id: 'rename', label: 'Rename' };

      function renderOpenSubmenu(items: OverlayContextMenuItem[]) {
        vi.useFakeTimers();
        const view = render(
          <OverlayContextMenuPresentational
            items={items}
            position={position}
            onSelect={vi.fn()}
            onDismiss={vi.fn()}
          />,
        );
        fireEvent.pointerEnter(screen.getByText('More Actions'));
        act(() => {
          vi.advanceTimersByTime(200);
        });
        return view;
      }

      function rerenderWith(view: ReturnType<typeof render>, items: OverlayContextMenuItem[]) {
        view.rerender(
          <OverlayContextMenuPresentational
            items={items}
            position={position}
            onSelect={vi.fn()}
            onDismiss={vi.fn()}
          />,
        );
      }

      afterEach(() => {
        vi.useRealTimers();
      });

      it('keeps an open submenu open when an item appears above it', () => {
        const view = renderOpenSubmenu([renameSubmenu(rename)]);
        expect(screen.getByText('Rename')).toBeInTheDocument();

        rerenderWith(view, [{ type: 'item', id: 'ext.new', label: 'New' }, renameSubmenu(rename)]);

        expect(screen.getByText('Rename')).toBeInTheDocument();
      });

      it('disables a submenu item in place', () => {
        const view = renderOpenSubmenu([renameSubmenu(rename)]);

        const disabledRename: OverlayContextMenuItem = {
          type: 'item',
          id: 'rename',
          label: 'Rename',
          disabled: true,
        };
        rerenderWith(view, [renameSubmenu(disabledRename)]);

        expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveAttribute(
          'aria-disabled',
          'true',
        );
      });
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

    it('writes the overlay id to the menu content and to its submenu content', () => {
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
          onDismiss={vi.fn()}
          overlayId="menu-x"
        />,
      );

      expect(screen.getByRole('menu')).toHaveAttribute('data-overlay-id', 'menu-x');
      const trigger = screen.getByRole('menuitem', { name: 'More' });
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'ArrowRight' });
      const inner = screen.getByRole('menuitem', { name: 'Inner' });
      expect(inner.closest('[data-overlay-id="menu-x"]')).not.toBeNull();
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

  describe('OverlayContextMenu', () => {
    it("requests the menu's prefetched keys", () => {
      render(
        <OverlayContextMenu
          overlay={{
            type: 'contextMenu',
            id: 'menu-1',
            webViewId: 'wv',
            items: [{ type: 'item', id: 'a', label: '%a%' }],
            localizeKeys: ['%a%', '%b%'],
            position,
            resolve: vi.fn(),
            reject: vi.fn(),
          }}
        />,
      );

      expect(useLocalizedStrings).toHaveBeenCalledWith(['%a%', '%b%']);
    });
  });
});
