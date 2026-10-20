// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { PlatformMenubar } from './platform-menubar.component';

// jsdom doesn't ship a ResizeObserver, which Radix's Popper-positioned menu content instantiates
// on mount. A no-op stub is sufficient since these tests inspect structure, not layout.
class NoopResizeObserver implements ResizeObserver {
  // Keep an internal record of observed targets so the no-op methods touch `this` and don't
  // trip @typescript-eslint/class-methods-use-this. No test inspects this state.
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
  if (typeof Element.prototype.hasPointerCapture !== 'function') {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

// userEvent-driven Radix menus can take seconds per click on a contended Windows CI worker
vi.setConfig({ testTimeout: 20_000 });

const MAIN_MENU: Localized<MultiColumnMenu> = {
  columns: {
    'platform.app': { label: 'Project', order: 1 },
    'platform.window': { label: 'Window', order: 2 },
  },
  groups: {
    'platform.projectSettings': { column: 'platform.app', order: 1 },
    'platform.windowGeneral': { column: 'platform.window', order: 1 },
  },
  items: [
    {
      label: 'Find',
      localizeNotes: '',
      group: 'platform.projectSettings',
      order: 1,
      command: 'platformScripture.openFind',
      shortcut: 'Ctrl+F',
    },
    {
      label: 'Settings',
      localizeNotes: '',
      group: 'platform.projectSettings',
      order: 2,
      command: 'platform.openSettings',
    },
    {
      label: 'New window',
      localizeNotes: '',
      group: 'platform.windowGeneral',
      order: 1,
      command: 'platform.openWindow',
    },
  ],
};

describe('PlatformMenubar', () => {
  it('shows the shortcut as keycaps beside an item that has one, and nothing beside one without', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={MAIN_MENU} onSelectMenuItem={() => {}} />);

    await user.click(screen.getByRole('menuitem', { name: 'Project' }));

    const find = await screen.findByRole('menuitem', { name: /^Find/ });
    const shortcut = find.querySelector('[data-slot="menubar-shortcut"]');
    expect(shortcut).not.toBeNull();
    expect(within(find).getByText('Ctrl').tagName).toBe('KBD');
    expect(within(find).getByText('F').tagName).toBe('KBD');
    const settings = screen.getByRole('menuitem', { name: /^Settings/ });
    expect(settings.querySelector('[data-slot="menubar-shortcut"]')).toBeNull();
  });

  it('gives the shortcut its own direction so its keys keep their order in a right-to-left layout', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={MAIN_MENU} onSelectMenuItem={() => {}} />);

    await user.click(screen.getByRole('menuitem', { name: 'Project' }));

    const find = await screen.findByRole('menuitem', { name: /^Find/ });
    const group = within(find).getByText('Ctrl').closest('[data-slot="kbd-group"]');
    expect(group).toHaveAttribute('dir', 'ltr');
  });

  it('makes each column a top-level trigger instead of a heading inside an open menu', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={MAIN_MENU} onSelectMenuItem={() => {}} />);

    await user.click(screen.getByRole('menuitem', { name: 'Project' }));
    await screen.findByRole('menuitem', { name: /^Find/ });

    expect(document.querySelectorAll('[data-slot="menubar-label"]')).toHaveLength(0);
    // Each column label appears once, as the trigger that opens it — never repeated as a heading
    expect(screen.getAllByText('Project')).toHaveLength(1);
    expect(screen.getAllByText('Window')).toHaveLength(1);
  });
});

/**
 * Hiding menu items for an interface mode prunes items only — the groups and columns they belonged
 * to survive, so a group can end up with nothing in it. These fixtures place an emptied group in
 * each of the three positions a column can put one, because the separator rule keys off a group's
 * index among _all_ the column's groups rather than among the ones that still have items.
 */
function menuWithGroupsAndItems(
  groupKeys: string[],
  populatedGroupKeys: string[],
): Localized<MultiColumnMenu> {
  return {
    columns: { 'platform.app': { label: 'Project', order: 1 } },
    groups: Object.fromEntries(
      groupKeys.map((key, index) => [key, { column: 'platform.app', order: index + 1 }]),
    ),
    items: populatedGroupKeys.map((group, index) => ({
      label: `Item in ${group}`,
      localizeNotes: '',
      group,
      order: index + 1,
      command: `test.${group}`,
    })),
  };
}

// Radix opens a menubar column from a full pointer sequence, which userEvent produces and a bare
// fireEvent click does not.
async function openProjectColumn(menuData: Localized<MultiColumnMenu>) {
  render(<PlatformMenubar menuData={menuData} onSelectMenuItem={() => {}} />);
  await userEvent.click(screen.getByRole('menuitem', { name: 'Project' }));
  return screen.getByRole('menu');
}

/** Separators are decorative, so they carry no accessible role — find them by their data attribute. */
function childKinds(menu: HTMLElement): ('separator' | 'item')[] {
  return Array.from(menu.children).flatMap((child) => {
    if (child.getAttribute('data-slot') === 'menubar-separator') return ['separator' as const];
    if (child.getAttribute('role') === 'menuitem') return ['item' as const];
    return [];
  });
}

describe('PlatformMenubar separators around groups emptied by mode filtering', () => {
  it.each([
    ['a leading group', ['g1', 'g2', 'g3'], ['g2', 'g3']],
    ['a middle group', ['g1', 'g2', 'g3'], ['g1', 'g3']],
  ])('emits no stray separator when %s is empty', async (_, groupKeys, populatedGroupKeys) => {
    const kinds = childKinds(
      await openProjectColumn(menuWithGroupsAndItems(groupKeys, populatedGroupKeys)),
    );

    expect(kinds.length).toBeGreaterThan(0);
    expect(kinds.at(0)).not.toBe('separator');
    expect(kinds.at(-1)).not.toBe('separator');
    const doubledSeparators = kinds.filter(
      (kind, index) => index > 0 && kind === 'separator' && kinds[index - 1] === 'separator',
    );
    expect(doubledSeparators).toEqual([]);
  });

  /**
   * The shipped Simple menu does not hit this shape — the groups it empties are leading or middle
   * ones — but nothing prevents a later reordering from emptying a trailing group, so pin the
   * behavior rather than leave it undiscovered. Suppressing empty groups is deliberately out of
   * scope here; it belongs with the wider menu restructure.
   */
  it('leaves a trailing separator when the last group is empty', async () => {
    const kinds = childKinds(await openProjectColumn(menuWithGroupsAndItems(['g1', 'g2'], ['g1'])));

    expect(kinds.at(-1)).toBe('separator');
  });

  it('separates two populated groups', async () => {
    const kinds = childKinds(
      await openProjectColumn(menuWithGroupsAndItems(['g1', 'g2'], ['g1', 'g2'])),
    );

    expect(kinds).toEqual(['item', 'separator', 'item']);
  });
});
