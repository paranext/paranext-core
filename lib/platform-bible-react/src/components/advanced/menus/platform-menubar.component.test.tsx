// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
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

const ICON_MENU: Localized<MultiColumnMenu> = {
  columns: { 'platform.app': { label: 'Project', order: 1 } },
  groups: {
    'test.top': { column: 'platform.app', order: 1 },
    'test.editActions': { menuItem: 'test.editSubmenu', order: 1 },
  },
  items: [
    {
      label: 'Before',
      localizeNotes: '',
      group: 'test.top',
      order: 1,
      command: 'test.before',
      iconNameBefore: 'search',
    },
    {
      label: 'After',
      localizeNotes: '',
      group: 'test.top',
      order: 2,
      command: 'test.after',
      iconNameAfter: 'external-link',
    },
    {
      label: 'PathOnly',
      localizeNotes: '',
      group: 'test.top',
      order: 3,
      command: 'test.pathOnly',
      iconPathBefore: 'https://example.test/icon.svg',
    },
    {
      label: 'Both',
      localizeNotes: '',
      group: 'test.top',
      order: 4,
      command: 'test.both',
      iconNameBefore: 'search',
      iconPathBefore: 'https://example.test/icon.svg',
    },
    {
      label: 'UnknownWithPath',
      localizeNotes: '',
      group: 'test.top',
      order: 4.1,
      command: 'test.unknownWithPath',
      iconNameBefore: 'a-name-this-build-lacks',
      iconPathBefore: 'https://example.test/icon.svg',
    },
    {
      label: 'UnknownOnly',
      localizeNotes: '',
      group: 'test.top',
      order: 4.2,
      command: 'test.unknownOnly',
      iconNameBefore: 'a-name-this-build-lacks',
    },
    {
      id: 'test.editSubmenu',
      label: 'Edit',
      localizeNotes: '',
      group: 'test.top',
      order: 5,
      iconNameBefore: 'pencil',
    },
    {
      label: 'Undo',
      localizeNotes: '',
      group: 'test.editActions',
      order: 1,
      command: 'test.undo',
    },
  ],
};

describe('PlatformMenubar icons', () => {
  async function openIconMenu() {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={ICON_MENU} onSelectMenuItem={() => {}} />);
    await user.click(screen.getByRole('menuitem', { name: 'Project' }));
    await screen.findByRole('menuitem', { name: /^Before/ });
  }

  it('shows a lucide icon before the label for iconNameBefore', async () => {
    await openIconMenu();
    const item = screen.getByRole('menuitem', { name: /^Before/ });
    const svg = item.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(item.firstElementChild).toBe(svg);
  });

  it('shows a lucide icon after the label for iconNameAfter', async () => {
    await openIconMenu();
    const item = screen.getByRole('menuitem', { name: /^After/ });
    const svg = item.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(item.lastElementChild).toBe(svg);
    expect(item.querySelector('img')).toBeNull();
  });

  it('still shows an image for an item that only has iconPathBefore', async () => {
    await openIconMenu();
    const item = screen.getByRole('menuitem', { name: /PathOnly/ });
    expect(item.querySelector('img')).not.toBeNull();
    expect(item.querySelector('svg')).toBeNull();
  });

  it('shows only the lucide icon when both a name and a path are set', async () => {
    await openIconMenu();
    const item = screen.getByRole('menuitem', { name: /^Both/ });
    expect(item.querySelector('svg')).not.toBeNull();
    expect(item.querySelector('img')).toBeNull();
  });

  it('falls back to the image path when the icon name is not a known icon', async () => {
    await openIconMenu();
    const item = screen.getByRole('menuitem', { name: /UnknownWithPath/ });
    expect(item.querySelector('img')).not.toBeNull();
    expect(item.querySelector('svg')).toBeNull();
  });

  it('treats an unknown icon name without a path as no icon, keeping the label aligned', async () => {
    await openIconMenu();
    const item = screen.getByRole('menuitem', { name: /UnknownOnly/ });
    expect(item.querySelector('img')).toBeNull();
    expect(item.querySelector('svg')).toBeNull();
    expect(item.querySelector('[data-slot="menu-icon-spacer"]')).not.toBeNull();
  });

  it('shows the icon of a submenu root', async () => {
    await openIconMenu();
    const root = screen.getByRole('menuitem', { name: /^Edit/ });
    // The sub-trigger also carries a chevron svg, so look for the lucide pencil specifically
    expect(root.querySelector('svg.lucide-pencil')).not.toBeNull();
  });
});

/**
 * Hiding menu items for an interface mode prunes items only — the groups and columns they belonged
 * to survive, so a group can end up with nothing in it. These fixtures place an emptied group in
 * each of the three positions a column can put one, since a separator must only ever sit between two
 * groups that still have items.
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
    ['a trailing group', ['g1', 'g2', 'g3'], ['g1', 'g2']],
    ['the last group after a lone populated one', ['g1', 'g2'], ['g1']],
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

  it('separates two populated groups', async () => {
    const kinds = childKinds(
      await openProjectColumn(menuWithGroupsAndItems(['g1', 'g2'], ['g1', 'g2'])),
    );

    expect(kinds).toEqual(['item', 'separator', 'item']);
  });
});

describe('PlatformMenubar submenu groups', () => {
  /** Two groups point at the Edit submenu; Find's group is stored first but ordered second */
  const TWO_GROUP_MENU: Localized<MultiColumnMenu> = {
    columns: { 'platform.app': { label: 'Project', order: 1 } },
    groups: {
      'test.top': { column: 'platform.app', order: 1 },
      'test.editFind': { menuItem: 'test.editSubmenu', order: 2 },
      'test.editActions': { menuItem: 'test.editSubmenu', order: 1 },
    },
    items: [
      { id: 'test.editSubmenu', label: 'Edit', localizeNotes: '', group: 'test.top', order: 1 },
      {
        label: 'Undo',
        localizeNotes: '',
        group: 'test.editActions',
        order: 1,
        command: 'test.undo',
      },
      {
        label: 'Redo',
        localizeNotes: '',
        group: 'test.editActions',
        order: 2,
        command: 'test.redo',
      },
      { label: 'Find', localizeNotes: '', group: 'test.editFind', order: 1, command: 'test.find' },
    ],
  };

  async function openEditFlyout(menuData: Localized<MultiColumnMenu>) {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={menuData} onSelectMenuItem={() => {}} />);
    await user.click(screen.getByRole('menuitem', { name: 'Project' }));
    const editTrigger = await screen.findByRole('menuitem', { name: /^Edit/ });
    await user.click(editTrigger);
    await waitFor(() => expect(screen.getAllByRole('menu')).toHaveLength(2));
    const menus = screen.getAllByRole('menu');
    return menus[menus.length - 1];
  }

  it('shows the items of every group, in group order, with one separator between the groups', async () => {
    const flyout = await openEditFlyout(TWO_GROUP_MENU);

    expect(
      within(flyout)
        .getAllByRole('menuitem')
        .map((item) => item.textContent),
    ).toEqual(['Undo', 'Redo', 'Find']);
    const separators = within(flyout).getAllByRole('separator');
    expect(separators).toHaveLength(1);
    // The separator sits between Redo and Find
    expect(
      Array.from(flyout.querySelectorAll('[role="menuitem"], [role="separator"]')).map((element) =>
        element.getAttribute('role') === 'separator' ? '---' : element.textContent,
      ),
    ).toEqual(['Undo', 'Redo', '---', 'Find']);
  });

  it('adds no separator for a group that has no items', async () => {
    const flyout = await openEditFlyout({
      ...TWO_GROUP_MENU,
      items: TWO_GROUP_MENU.items.filter((item) => item.group !== 'test.editFind'),
    });

    expect(within(flyout).getAllByRole('menuitem')).toHaveLength(2);
    expect(within(flyout).queryAllByRole('separator')).toHaveLength(0);
  });

  it('adds no separator for an empty group between two groups that have items', async () => {
    const flyout = await openEditFlyout({
      ...TWO_GROUP_MENU,
      groups: {
        ...TWO_GROUP_MENU.groups,
        'test.editEmpty': { menuItem: 'test.editSubmenu', order: 1.5 },
      },
    });

    expect(within(flyout).getAllByRole('menuitem')).toHaveLength(3);
    expect(within(flyout).getAllByRole('separator')).toHaveLength(1);
  });
});

describe('PlatformMenubar label alignment and shortcut spacing', () => {
  const MIXED: Localized<MultiColumnMenu> = {
    columns: {
      'platform.app': { label: 'Project', order: 1 },
      'platform.window': { label: 'Window', order: 2 },
    },
    groups: {
      'test.top': { column: 'platform.app', order: 1 },
      'test.win': { column: 'platform.window', order: 1 },
      'test.sub': { menuItem: 'test.submenu', order: 1 },
    },
    items: [
      {
        label: 'With icon',
        localizeNotes: '',
        group: 'test.top',
        order: 1,
        command: 'test.a',
        iconNameBefore: 'search',
      },
      {
        label: 'Plain',
        localizeNotes: '',
        group: 'test.top',
        order: 2,
        command: 'test.b',
        shortcut: 'Ctrl+Shift+T',
      },
      { id: 'test.submenu', label: 'Sub', localizeNotes: '', group: 'test.top', order: 3 },
      { label: 'Inner', localizeNotes: '', group: 'test.sub', order: 1, command: 'test.c' },
      { label: 'Other', localizeNotes: '', group: 'test.win', order: 1, command: 'test.d' },
    ],
  };
  const spacerOf = (el: HTMLElement) => el.querySelector('[data-slot="menu-icon-spacer"]');

  it('gives each icon-less item an aria-hidden spacer when another item has a leading icon', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={MIXED} onSelectMenuItem={() => {}} />);
    await user.click(screen.getByRole('menuitem', { name: 'Project' }));
    expect(spacerOf(await screen.findByRole('menuitem', { name: /^With icon/ }))).toBeNull();
    const plain = spacerOf(screen.getByRole('menuitem', { name: /^Plain/ }));
    expect(plain).not.toBeNull();
    expect(plain).toHaveAttribute('aria-hidden', 'true');
    expect(spacerOf(screen.getByRole('menuitem', { name: /^Sub/ }))).not.toBeNull();
  });

  it('sizes an image icon like a named icon and the icon-less spacer, so all labels line up', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <PlatformMenubar
        menuData={{
          ...MIXED,
          items: [
            ...MIXED.items,
            {
              label: 'With image',
              localizeNotes: '',
              group: 'test.top',
              order: 4,
              command: 'test.e',
              iconPathBefore: 'image.png',
            },
          ],
        }}
        onSelectMenuItem={() => {}}
      />,
    );
    await user.click(screen.getByRole('menuitem', { name: 'Project' }));
    const imageBox = (await screen.findByRole('menuitem', { name: /With image/ })).querySelector(
      '[data-slot="menu-icon-image-box"]',
    );
    expect(imageBox).toHaveClass('tw:w-4');
    expect(imageBox?.querySelector('img')).toHaveClass('tw:max-h-4', 'tw:max-w-4');
    expect(spacerOf(screen.getByRole('menuitem', { name: /^Plain/ }))).toHaveClass('tw:w-4');
  });

  it('decides the slot per menu, so a menu without icons gets no spacer', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={MIXED} onSelectMenuItem={() => {}} />);
    await user.click(screen.getByRole('menuitem', { name: 'Window' }));
    const other = await screen.findByRole('menuitem', { name: 'Other' });
    expect(spacerOf(other)).toBeNull();
  });

  it('decides the slot per submenu content', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={MIXED} onSelectMenuItem={() => {}} />);
    await user.click(screen.getByRole('menuitem', { name: 'Project' }));
    await user.click(await screen.findByRole('menuitem', { name: /^Sub/ }));
    const inner = await screen.findByRole('menuitem', { name: 'Inner' });
    expect(spacerOf(inner)).toBeNull();
  });

  it('keeps a minimum gap between the label and the shortcut', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<PlatformMenubar menuData={MIXED} onSelectMenuItem={() => {}} />);
    await user.click(screen.getByRole('menuitem', { name: 'Project' }));
    const shortcut = (await screen.findByRole('menuitem', { name: /^Plain/ })).querySelector(
      '[data-slot="menubar-shortcut"]',
    );
    expect(shortcut).toHaveClass('tw:ps-4');
  });
});
