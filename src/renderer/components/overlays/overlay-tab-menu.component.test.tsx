import { vi } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { addOverlay, clearAllOverlays } from '@renderer/services/overlays/overlay-store';
import { OverlayTabMenu, OverlayTabMenuPresentational } from './overlay-tab-menu.component';

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

/** Two columns, given out of order, and an Edit submenu */
const MENU: Localized<MultiColumnMenu> = {
  columns: {
    'ext.insert': { label: 'Insert', order: 2 },
    'ext.edit': { label: 'Edit', order: 1 },
  },
  groups: {
    'ext.editTop': { column: 'ext.edit', order: 1 },
    'ext.editActions': { menuItem: 'ext.editSubmenu', order: 1 },
    'ext.notes': { column: 'ext.insert', order: 1 },
  },
  items: [
    {
      id: 'ext.editSubmenu',
      label: 'Clipboard',
      localizeNotes: '',
      group: 'ext.editTop',
      order: 1,
    },
    { label: 'Copy', localizeNotes: '', group: 'ext.editActions', order: 1, command: 'ext.copy' },
    {
      label: 'Insert footnote',
      localizeNotes: '',
      group: 'ext.notes',
      order: 1,
      command: 'ext.insertFootnote',
    },
  ],
};
const ANCHOR = { x: 300, y: 80, width: 32, height: 28 };

function openClipboardSubmenu() {
  const trigger = screen.getByRole('menuitem', { name: /^Clipboard/ });
  trigger.focus();
  fireEvent.keyDown(trigger, { key: 'ArrowRight' });
  return screen.getByRole('menuitem', { name: 'Copy' });
}

describe('OverlayTabMenuPresentational', () => {
  it('shows the sections in column order, headed by their column labels', () => {
    render(
      <OverlayTabMenuPresentational
        menu={MENU}
        anchor={ANCHOR}
        onSelect={vi.fn()}
        onDismiss={vi.fn()}
      />,
    );

    const sections = screen.getAllByRole('group');
    expect(sections).toHaveLength(2);
    expect(sections[0]).toHaveAccessibleName('Edit');
    expect(sections[1]).toHaveAccessibleName('Insert');
  });

  it('opens with its first item focused when the keyboard opened it', async () => {
    render(
      <OverlayTabMenuPresentational
        menu={MENU}
        anchor={ANCHOR}
        focusFirstItem
        onSelect={vi.fn()}
        onDismiss={vi.fn()}
      />,
    );

    await waitFor(() => expect(screen.getByRole('menuitem', { name: /^Clipboard/ })).toHaveFocus());
  });

  it('hands the picked item to onSelect, including one in a submenu', () => {
    const onSelect = vi.fn();
    render(
      <OverlayTabMenuPresentational
        menu={MENU}
        anchor={ANCHOR}
        onSelect={onSelect}
        onDismiss={vi.fn()}
      />,
    );

    fireEvent.click(openClipboardSubmenu());

    expect(onSelect).toHaveBeenCalledWith(MENU.items[1]);
  });

  it('marks the menu and its submenus as this overlay, and as a tab menu', () => {
    render(
      <OverlayTabMenuPresentational
        menu={MENU}
        anchor={ANCHOR}
        onSelect={vi.fn()}
        onDismiss={vi.fn()}
        overlayId="tab-menu-1"
      />,
    );

    const menu = screen.getAllByRole('menu')[0];
    expect(menu).toHaveAttribute('data-overlay-id', 'tab-menu-1');
    expect(menu).toHaveAttribute('data-overlay-tab-menu');
    const submenu = openClipboardSubmenu().closest('[data-overlay-id="tab-menu-1"]');
    expect(submenu).not.toBeNull();
    expect(submenu).toHaveAttribute('data-overlay-tab-menu');
  });

  it('reports Escape pressed inside a submenu before the menu dismisses', () => {
    const calls: string[] = [];
    render(
      <OverlayTabMenuPresentational
        menu={MENU}
        anchor={ANCHOR}
        onSelect={vi.fn()}
        onDismiss={() => calls.push('dismiss')}
        onEscape={() => calls.push('escape')}
      />,
    );

    fireEvent.keyDown(openClipboardSubmenu(), { key: 'Escape' });

    expect(calls).toEqual(['escape', 'dismiss']);
  });

  it('dismisses on a press outside, but not on the one a window blur produces', async () => {
    const onDismiss = vi.fn();
    const onEscape = vi.fn();
    render(
      <OverlayTabMenuPresentational
        menu={MENU}
        anchor={ANCHOR}
        onSelect={vi.fn()}
        onDismiss={onDismiss}
        onEscape={onEscape}
      />,
    );
    // Radix arms its outside-press listener on a timer after mounting
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
    expect(onEscape).not.toHaveBeenCalled();
  });
});

describe('OverlayTabMenu', () => {
  afterEach(() => clearAllOverlays());

  it('settles the overlay with the picked item, once', () => {
    const resolve = vi.fn();
    const overlay = {
      type: 'tabMenu' as const,
      id: 'tab-menu-2',
      webViewId: 'web-view-1',
      menu: MENU,
      anchor: ANCHOR,
      focusFirstItem: false,
      resolve,
      reject: vi.fn(),
    };
    addOverlay(overlay);
    render(<OverlayTabMenu overlay={overlay} />);

    fireEvent.click(screen.getByRole('menuitem', { name: /^Insert footnote/ }));
    fireEvent.keyDown(screen.getAllByRole('menu')[0], { key: 'Escape' });

    expect(resolve).toHaveBeenCalledTimes(1);
    expect(resolve).toHaveBeenCalledWith(MENU.items[2]);
  });
});
