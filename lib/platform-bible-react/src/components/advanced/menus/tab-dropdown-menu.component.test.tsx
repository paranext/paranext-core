// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { QUIET_FOCUS_ATTRIBUTE } from '@/utils/focus.util';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import { persistDirection } from '@/utils/dir-helper.util';
import TabDropdownMenu from './tab-dropdown-menu.component';

// The hasPointerCapture / scrollIntoView shims this menu needs in jsdom are installed repo-wide by
// vitest.setup.ts. ResizeObserver is opt-in there, because tests that never open an overlay depend
// on jsdom leaving it undefined.
beforeAll(() => {
  installNoopResizeObserver();
});

// userEvent-driven Radix menus can take seconds per click on a contended Windows CI worker
vi.setConfig({ testTimeout: 20_000 });

beforeEach(() => {
  persistDirection('ltr');
});

/** Menu data with a single submenu, shaped like the Edit flyout's editSubmenu/editActions group. */
const SUBMENU_MENU: Localized<MultiColumnMenu> = {
  columns: { 'test.project': { label: 'Project', order: 1 } },
  groups: {
    'test.top': { column: 'test.project', order: 1 },
    'test.editActions': { menuItem: 'test.editSubmenu', order: 1 },
  },
  items: [
    {
      id: 'test.editSubmenu',
      label: 'Edit',
      localizeNotes: '',
      group: 'test.top',
      order: 1,
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

/** A second action for the flyout in {@link SUBMENU_MENU}, for tests that move between items. */
const REDO_ITEM: Localized<MultiColumnMenu>['items'][number] = {
  label: 'Redo',
  localizeNotes: '',
  group: 'test.editActions',
  order: 2,
  command: 'test.redo',
};

/**
 * Shaped like the scripture editor's Project menu, including its empty Info column. Column keys are
 * in the order the served menu has them: the platform's column is merged in after the editor's
 * own.
 */
const EDITOR_MENU: Localized<MultiColumnMenu> = {
  columns: {
    'platformScriptureEditor.edit': { label: 'Edit', order: 2 },
    'platformScriptureEditor.insert': { label: 'Insert', order: 5 },
    'platformScriptureEditor.info': { label: 'Info', order: 6 },
    'platform.app': { label: 'Project', order: 1 },
  },
  groups: {
    'platform.projectTop': { column: 'platform.app', order: 1 },
    'platformScriptureEditor.find': { column: 'platformScriptureEditor.edit', order: 1 },
    'platformScriptureEditor.insertTextualNotes': {
      column: 'platformScriptureEditor.insert',
      order: 1,
    },
    'platformScriptureEditor.general': { column: 'platformScriptureEditor.info', order: 2 },
  },
  items: [
    {
      label: 'Open Project Settings…',
      localizeNotes: '',
      group: 'platform.projectTop',
      order: 3,
      command: 'platform.openSettings',
    },
    {
      label: 'Find',
      localizeNotes: '',
      group: 'platformScriptureEditor.find',
      order: 3,
      command: 'platformScripture.openFind',
      shortcut: 'Ctrl+F',
    },
    {
      label: 'Insert footnote',
      localizeNotes: '',
      group: 'platformScriptureEditor.insertTextualNotes',
      order: 1,
      command: 'platformScriptureEditor.insertFootnoteAtSelection',
    },
  ],
};

/** {@link EDITOR_MENU} with its Edit column set to show no heading */
const EDITOR_MENU_WITH_HIDDEN_EDIT_HEADER: Localized<MultiColumnMenu> = {
  ...EDITOR_MENU,
  columns: {
    ...EDITOR_MENU.columns,
    'platformScriptureEditor.edit': { label: 'Edit', order: 2, isHeaderHidden: true },
  },
};

async function openMenu(menuData: Localized<MultiColumnMenu>, showSectionHeadings = true) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(
    <TabDropdownMenu
      menuData={menuData}
      onSelectMenuItem={() => {}}
      tabLabel="Tab menu"
      showSectionHeadings={showSectionHeadings}
    />,
  );
  await user.click(screen.getByRole('button', { name: 'Tab menu' }));
  await screen.findByRole('menu');
}

describe('TabDropdownMenu', () => {
  it('heads each section with its column label when more than one section has items', async () => {
    await openMenu(EDITOR_MENU);

    const edit = screen.getByRole('group', { name: 'Edit' });
    expect(within(edit).getByRole('menuitem', { name: /^Find/ })).toBeInTheDocument();
    const insert = screen.getByRole('group', { name: 'Insert' });
    expect(within(insert).getByRole('menuitem', { name: /^Insert footnote/ })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Project' })).toBeInTheDocument();

    // Sections follow column `order`, not the order the columns appear in the menu data
    const sections = screen.getAllByRole('group');
    expect(sections).toHaveLength(3);
    expect(sections[0]).toHaveAccessibleName('Project');
    expect(sections[1]).toHaveAccessibleName('Edit');
    expect(sections[2]).toHaveAccessibleName('Insert');
  });

  it('gives a section to a column whose only item is a submenu, even an empty one', async () => {
    await openMenu({
      ...EDITOR_MENU,
      columns: {
        ...EDITOR_MENU.columns,
        'platformScriptureEditor.tools': { label: 'Tools', order: 4 },
      },
      groups: {
        ...EDITOR_MENU.groups,
        'platformScriptureEditor.inventories': {
          column: 'platformScriptureEditor.tools',
          order: 1,
        },
      },
      items: [
        ...EDITOR_MENU.items,
        {
          label: 'Inventories',
          localizeNotes: '',
          group: 'platformScriptureEditor.inventories',
          order: 1,
          id: 'platformScriptureEditor.inventoriesSubmenu',
        },
      ],
    });

    const tools = screen.getByRole('group', { name: 'Tools' });
    expect(within(tools).getByRole('menuitem', { name: 'Inventories' })).toBeInTheDocument();
  });

  it('leaves out a column with no items: no heading, and no separator for it', async () => {
    await openMenu(EDITOR_MENU);

    expect(screen.getByRole('group', { name: 'Insert' })).toBeInTheDocument();
    expect(screen.queryByText('Info')).not.toBeInTheDocument();
    // Three sections with items, so exactly two separators between them
    expect(screen.getAllByRole('separator')).toHaveLength(2);
  });

  it('shows a column that sets isHeaderHidden with no heading, but still names and divides it', async () => {
    await openMenu(EDITOR_MENU_WITH_HIDDEN_EDIT_HEADER);

    // Positive control: the neighboring sections keep their visible headings
    expect(screen.getByText('Project')).not.toHaveClass('tw:sr-only');
    expect(screen.getByText('Insert')).not.toHaveClass('tw:sr-only');
    // jsdom applies no styles, so the class is the observable part of "visually hidden"
    expect(screen.getByText('Edit')).toHaveClass('tw:sr-only');
    const edit = screen.getByRole('group', { name: 'Edit' });
    expect(within(edit).getByRole('menuitem', { name: /^Find/ })).toBeInTheDocument();
    expect(screen.getAllByRole('separator')).toHaveLength(2);
  });

  it('names no section, isHeaderHidden or not, without `showSectionHeadings`', async () => {
    await openMenu(EDITOR_MENU_WITH_HIDDEN_EDIT_HEADER, false);

    const sections = screen.getAllByRole('group');
    // Positive control: all three sections render, so there is something to be unnamed
    expect(sections).toHaveLength(3);
    sections.forEach((section) => expect(section).not.toHaveAccessibleName());
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('names no section when a column that sets isHeaderHidden is the only one with items', async () => {
    await openMenu({
      ...EDITOR_MENU_WITH_HIDDEN_EDIT_HEADER,
      items: EDITOR_MENU.items.filter((item) => item.group === 'platformScriptureEditor.find'),
    });

    const section = screen.getByRole('group');
    expect(within(section).getByRole('menuitem', { name: /^Find/ })).toBeInTheDocument();
    expect(section).not.toHaveAccessibleName();
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('puts no separator between two groups of one column', async () => {
    await openMenu({
      columns: { 'test.project': { label: 'Project', order: 1 } },
      groups: {
        'test.first': { column: 'test.project', order: 1 },
        'test.second': { column: 'test.project', order: 2 },
      },
      items: [
        { label: 'First', localizeNotes: '', group: 'test.first', order: 1, command: 'test.a' },
        { label: 'Second', localizeNotes: '', group: 'test.second', order: 1, command: 'test.b' },
      ],
    });

    // Positive control: both groups render, so there is something a separator could divide
    expect(screen.getByRole('menuitem', { name: 'First' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Second' })).toBeInTheDocument();
    expect(screen.queryAllByRole('separator')).toHaveLength(0);
  });

  it('shows no heading when only one section has items', async () => {
    await openMenu({
      ...EDITOR_MENU,
      items: EDITOR_MENU.items.filter((item) => item.group === 'platformScriptureEditor.find'),
    });

    expect(screen.getByRole('menuitem', { name: /^Find/ })).toBeInTheDocument();
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('separator')).toHaveLength(0);
  });

  it('shows no headings without `showSectionHeadings`, but still divides the sections', async () => {
    await openMenu(EDITOR_MENU, false);

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Insert')).not.toBeInTheDocument();
    expect(screen.queryByText('Project')).not.toBeInTheDocument();
    expect(screen.getAllByRole('separator')).toHaveLength(2);
  });

  it('shows the shortcut as keycaps beside an item that has one, and nothing beside one without', async () => {
    await openMenu(EDITOR_MENU);

    const find = screen.getByRole('menuitem', { name: /^Find/ });
    const shortcut = find.querySelector('[data-slot="dropdown-menu-shortcut"]');
    expect(shortcut).not.toBeNull();
    expect(within(find).getByText('Ctrl').tagName).toBe('KBD');
    expect(within(find).getByText('F').tagName).toBe('KBD');
    const footnote = screen.getByRole('menuitem', { name: /^Insert footnote/ });
    expect(footnote.querySelector('[data-slot="dropdown-menu-shortcut"]')).toBeNull();
  });

  it('gives the shortcut its own direction so its keys keep their order in a right-to-left layout', async () => {
    await openMenu(EDITOR_MENU);

    const find = screen.getByRole('menuitem', { name: /^Find/ });
    const group = within(find).getByText('Ctrl').closest('[data-slot="kbd-group"]');
    expect(group).toHaveAttribute('dir', 'ltr');
  });

  it('opens a flyout and reaches its items by keyboard', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSelectMenuItem = vi.fn();
    render(
      <TabDropdownMenu
        menuData={{ ...SUBMENU_MENU, items: [...SUBMENU_MENU.items, REDO_ITEM] }}
        onSelectMenuItem={onSelectMenuItem}
        tabLabel="Project"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Project' }));
    const editTrigger = await screen.findByRole('menuitem', { name: /^Edit/ });
    editTrigger.focus();
    await user.keyboard('{ArrowRight}');
    const undo = await screen.findByRole('menuitem', { name: 'Undo' });
    await waitFor(() => expect(undo).toHaveFocus());
    await user.keyboard('{ArrowDown}{Enter}');

    expect(onSelectMenuItem).toHaveBeenCalledWith(
      expect.objectContaining({ command: 'test.redo' }),
    );
  });

  it('opens a flyout with ArrowLeft in RTL', async () => {
    persistDirection('rtl');
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <TabDropdownMenu menuData={SUBMENU_MENU} onSelectMenuItem={() => {}} tabLabel="Project" />,
    );

    await user.click(screen.getByRole('button', { name: 'Project' }));
    const editTrigger = await screen.findByRole('menuitem', { name: /^Edit/ });
    editTrigger.focus();
    await user.keyboard('{ArrowLeft}');
    const undo = await screen.findByRole('menuitem', { name: 'Undo' });
    await waitFor(() => expect(undo).toHaveFocus());
  });

  it("reports an open flyout's state on its trigger", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <TabDropdownMenu menuData={SUBMENU_MENU} onSelectMenuItem={() => {}} tabLabel="Project" />,
    );

    await user.click(screen.getByRole('button', { name: 'Project' }));
    const editTrigger = await screen.findByRole('menuitem', { name: /^Edit/ });
    editTrigger.focus();
    await user.keyboard('{ArrowRight}');
    await screen.findByRole('menuitem', { name: 'Undo' });

    expect(editTrigger).toHaveAttribute('data-state', 'open');
    expect(editTrigger).toHaveAttribute('data-slot', 'dropdown-menu-sub-trigger');
  });

  it("shows a submenu item's tooltip on hover", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const [editSubmenu, ...editActions] = SUBMENU_MENU.items;
    render(
      <TabDropdownMenu
        menuData={{
          ...SUBMENU_MENU,
          items: [{ ...editSubmenu, tooltip: 'Edit actions' }, ...editActions],
        }}
        onSelectMenuItem={() => {}}
        tabLabel="Project"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Project' }));
    const editTrigger = await screen.findByRole('menuitem', { name: /^Edit/ });
    await user.hover(editTrigger);

    expect(await screen.findAllByText('Edit actions')).not.toHaveLength(0);
  });

  it('points the submenu trigger chevron right in LTR', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <TabDropdownMenu menuData={SUBMENU_MENU} onSelectMenuItem={() => {}} tabLabel="Project" />,
    );

    await user.click(screen.getByRole('button', { name: 'Project' }));
    const editTrigger = await screen.findByRole('menuitem', { name: /^Edit/ });

    expect(editTrigger.querySelector('.tabler-icon-chevron-right')).not.toBeNull();
    expect(editTrigger.querySelector('.tabler-icon-chevron-left')).toBeNull();
  });

  it('points the submenu trigger chevron left in RTL, toward the flyout it opens', async () => {
    persistDirection('rtl');
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <TabDropdownMenu menuData={SUBMENU_MENU} onSelectMenuItem={() => {}} tabLabel="Project" />,
    );

    await user.click(screen.getByRole('button', { name: 'Project' }));
    const editTrigger = await screen.findByRole('menuitem', { name: /^Edit/ });

    expect(editTrigger.querySelector('.tabler-icon-chevron-left')).not.toBeNull();
    expect(editTrigger.querySelector('.tabler-icon-chevron-right')).toBeNull();
  });
});

describe('TabDropdownMenu submenu groups', () => {
  /** Two groups point at the Edit submenu; Find's group is stored first but ordered second */
  const TWO_GROUP_MENU: Localized<MultiColumnMenu> = {
    columns: { 'test.project': { label: 'Project', order: 1 } },
    groups: {
      'test.top': { column: 'test.project', order: 1 },
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
    render(<TabDropdownMenu menuData={menuData} onSelectMenuItem={() => {}} tabLabel="Project" />);
    await user.click(screen.getByRole('button', { name: 'Project' }));
    const editTrigger = await screen.findByRole('menuitem', { name: /^Edit/ });
    editTrigger.focus();
    await user.keyboard('{ArrowRight}');
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

describe('TabDropdownMenu icons', () => {
  const ICON_MENU: Localized<MultiColumnMenu> = {
    columns: { 'test.project': { label: 'Project', order: 1 } },
    groups: {
      'test.top': { column: 'test.project', order: 1 },
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

  it('shows a lucide icon before the label for iconNameBefore', async () => {
    await openMenu(ICON_MENU);
    const item = screen.getByRole('menuitem', { name: /^Before/ });
    const svg = item.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(item.firstElementChild).toBe(svg);
  });

  it('shows a lucide icon after the label for iconNameAfter', async () => {
    await openMenu(ICON_MENU);
    const item = screen.getByRole('menuitem', { name: /^After/ });
    const svg = item.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(item.lastElementChild).toBe(svg);
    expect(item.querySelector('img')).toBeNull();
  });

  it('still shows an image for an item that only has iconPathBefore', async () => {
    await openMenu(ICON_MENU);
    const item = screen.getByRole('menuitem', { name: /PathOnly/ });
    expect(item.querySelector('img')).not.toBeNull();
    expect(item.querySelector('svg')).toBeNull();
  });

  it('shows only the lucide icon when both a name and a path are set', async () => {
    await openMenu(ICON_MENU);
    const item = screen.getByRole('menuitem', { name: /^Both/ });
    expect(item.querySelector('svg')).not.toBeNull();
    expect(item.querySelector('img')).toBeNull();
  });

  it('shows the icon of a submenu root', async () => {
    await openMenu(ICON_MENU);
    const root = screen.getByRole('menuitem', { name: /^Edit/ });
    // The sub-trigger also carries a tabler chevron, so look for the lucide pencil specifically
    expect(root.querySelector('svg.lucide-pencil')).not.toBeNull();
  });
});

const ITEM_LABEL = 'Show footnotes';

const MENU_DATA: Localized<MultiColumnMenu> = {
  columns: { 'test.column': { label: 'Column', order: 1 } },
  groups: { 'test.group': { column: 'test.column', order: 1 } },
  items: [
    {
      label: ITEM_LABEL,
      localizeNotes: 'Test menu item',
      group: 'test.group',
      order: 1,
      command: 'test.showFootnotes',
    },
  ],
};

type User = ReturnType<typeof userEvent.setup>;

const openWith = {
  pointer: async (user: User, trigger: HTMLElement) => user.click(trigger),
  keyboard: async (user: User, trigger: HTMLElement) => {
    trigger.focus();
    await user.keyboard('{Enter}');
  },
};

const closeWith = {
  'pointer selection': async (user: User) =>
    user.click(await screen.findByRole('menuitem', { name: ITEM_LABEL })),
  'click outside': async (user: User) => user.click(document.body),
  Escape: async (user: User) => user.keyboard('{Escape}'),
  'keyboard selection': async (user: User) => user.keyboard('{ArrowDown}{Enter}'),
};

// Focus itself always comes back to the trigger, whichever input opened or closed the menu — the tab
// order depends on it. What changes is whether the focus ring shows, which the trigger signals with
// a data attribute; whether that attribute actually hides the ring is a CSS question, pinned in a
// real browser by `tab-dropdown-menu-focus.stories.tsx`.
describe('TabDropdownMenu focus after the menu closes', () => {
  it.each([
    { open: 'pointer', close: 'pointer selection', ringSuppressed: true },
    { open: 'pointer', close: 'click outside', ringSuppressed: true },
    { open: 'keyboard', close: 'pointer selection', ringSuppressed: true },
    { open: 'keyboard', close: 'click outside', ringSuppressed: true },
    { open: 'keyboard', close: 'Escape', ringSuppressed: false },
    { open: 'pointer', close: 'Escape', ringSuppressed: false },
    { open: 'keyboard', close: 'keyboard selection', ringSuppressed: false },
    { open: 'pointer', close: 'keyboard selection', ringSuppressed: false },
  ] as const)(
    'opened with $open and closed by $close: focus returns, ring suppressed = $ringSuppressed',
    async ({ open, close, ringSuppressed }) => {
      // A modal Radix menu sets `pointer-events: none` on <body>, which user-event would otherwise
      // refuse to click through when closing by clicking outside. 0 is its "never check" level.
      const user = userEvent.setup({ pointerEventsCheck: 0 });
      render(
        <TabDropdownMenu onSelectMenuItem={vi.fn()} menuData={MENU_DATA} tabLabel="Project" />,
      );
      const trigger = screen.getByRole('button', { name: 'Project' });

      await openWith[open](user, trigger);
      await screen.findByRole('menu');
      await closeWith[close](user);
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());

      expect(trigger).toHaveFocus();
      expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(ringSuppressed);
    },
  );

  it('shows the ring again once the user goes back to the keyboard', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<TabDropdownMenu onSelectMenuItem={vi.fn()} menuData={MENU_DATA} tabLabel="Project" />);
    const trigger = screen.getByRole('button', { name: 'Project' });

    await openWith.pointer(user, trigger);
    await screen.findByRole('menu');
    await closeWith['pointer selection'](user);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(true);

    await user.keyboard('{Shift}');

    expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(false);
  });

  // Without this, the mark and its inline `outline: none` would outlive the focus they were meant
  // for, and the next *keyboard* arrival at this trigger would land with no ring — the very thing
  // the mechanism exists to prevent.
  it('stops suppressing the ring once focus leaves the trigger', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<TabDropdownMenu onSelectMenuItem={vi.fn()} menuData={MENU_DATA} tabLabel="Project" />);
    const trigger = screen.getByRole('button', { name: 'Project' });

    await openWith.pointer(user, trigger);
    await screen.findByRole('menu');
    await closeWith['pointer selection'](user);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(true);
    expect(trigger.style.outline).toBe('none');

    trigger.blur();

    expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(false);
    expect(trigger.style.outline).toBe('');
  });

  // Forced colors drops every box-shadow, so the outline is the only focus indicator left there.
  it('keeps the focus indicator after a pointer close when forced colors are active', async () => {
    const matchMedia = vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => ({
      matches: query === '(forced-colors: active)',
      media: query,
      // MediaQueryList types `onchange` as nullable, so a stub of it has to use null.
      // eslint-disable-next-line no-null/no-null
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(() => false),
    }));
    try {
      const user = userEvent.setup({ pointerEventsCheck: 0 });
      render(
        <TabDropdownMenu onSelectMenuItem={vi.fn()} menuData={MENU_DATA} tabLabel="Project" />,
      );
      const trigger = screen.getByRole('button', { name: 'Project' });

      await openWith.pointer(user, trigger);
      await screen.findByRole('menu');
      await closeWith['pointer selection'](user);
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());

      expect(trigger).toHaveFocus();
      expect(trigger.hasAttribute(QUIET_FOCUS_ATTRIBUTE)).toBe(false);
      expect(trigger.style.outline).toBe('');
    } finally {
      matchMedia.mockRestore();
    }
  });
});

describe('TabDropdownMenu focus after selecting an item that places focus itself', () => {
  /**
   * Renders the menu beside a text field. Selecting the item focuses the field from a task queued
   * by the select handler, the way an editor action returns focus to its text once the menu has
   * closed; `shouldReturnFocusOnSelect` decides whether the menu then takes focus back.
   */
  function renderWithFocusTarget(shouldReturnFocusOnSelect?: () => boolean) {
    const onSelectMenuItem = vi.fn(() => {
      setTimeout(() => screen.getByRole('textbox', { name: 'Text' }).focus(), 0);
    });
    render(
      <>
        <input aria-label="Text" />
        <TabDropdownMenu
          onSelectMenuItem={onSelectMenuItem}
          menuData={MENU_DATA}
          tabLabel="Project"
          shouldReturnFocusOnSelect={shouldReturnFocusOnSelect}
        />
      </>,
    );
    return {
      trigger: screen.getByRole('button', { name: 'Project' }),
      text: screen.getByRole('textbox', { name: 'Text' }),
      onSelectMenuItem,
    };
  }

  /** Lets the menu's own focus return, a task after it closes, run if it is going to. */
  const settle = () =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, 20);
    });

  it.each(['pointer selection', 'keyboard selection'] as const)(
    'leaves focus where the handler put it after a %s the predicate declines',
    async (close) => {
      const user = userEvent.setup({ pointerEventsCheck: 0 });
      const shouldReturnFocusOnSelect = vi.fn(() => false);
      const { text, trigger, onSelectMenuItem } = renderWithFocusTarget(shouldReturnFocusOnSelect);

      await openWith.pointer(user, trigger);
      await screen.findByRole('menu');
      await closeWith[close](user);
      await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
      await settle();

      expect(onSelectMenuItem).toHaveBeenCalledTimes(1);
      expect(text).toHaveFocus();
      expect(shouldReturnFocusOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({ command: 'test.showFootnotes' }),
      );
    },
  );

  it('returns focus to the trigger after a selection the predicate accepts', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { trigger } = renderWithFocusTarget(() => true);

    await openWith.pointer(user, trigger);
    await screen.findByRole('menu');
    await closeWith['pointer selection'](user);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    await settle();

    expect(trigger).toHaveFocus();
  });

  it('returns focus to the trigger when the menu closes without a selection', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const shouldReturnFocusOnSelect = vi.fn(() => false);
    const { trigger } = renderWithFocusTarget(shouldReturnFocusOnSelect);

    await openWith.keyboard(user, trigger);
    await screen.findByRole('menu');
    await closeWith.Escape(user);
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
    await settle();

    expect(trigger).toHaveFocus();
    expect(shouldReturnFocusOnSelect).not.toHaveBeenCalled();
  });
});

describe('TabDropdownMenu label alignment and shortcut spacing', () => {
  const MIXED: Localized<MultiColumnMenu> = {
    columns: { 'test.project': { label: 'Project', order: 1 } },
    groups: {
      'test.top': { column: 'test.project', order: 1 },
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
    ],
  };
  const spacerOf = (el: HTMLElement) => el.querySelector('[data-slot="menu-icon-spacer"]');

  it('gives each icon-less item an aria-hidden spacer when another item has a leading icon', async () => {
    await openMenu(MIXED);
    expect(spacerOf(screen.getByRole('menuitem', { name: /^With icon/ }))).toBeNull();
    const plain = spacerOf(screen.getByRole('menuitem', { name: /^Plain/ }));
    expect(plain).not.toBeNull();
    expect(plain).toHaveAttribute('aria-hidden', 'true');
    expect(spacerOf(screen.getByRole('menuitem', { name: /^Sub/ }))).not.toBeNull();
  });

  it('decides the slot per submenu content, not for the whole menu', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<TabDropdownMenu menuData={MIXED} onSelectMenuItem={() => {}} tabLabel="Tab menu" />);
    await user.click(screen.getByRole('button', { name: 'Tab menu' }));
    const trigger = await screen.findByRole('menuitem', { name: /^Sub/ });
    trigger.focus();
    await user.keyboard('{ArrowRight}');
    const inner = await screen.findByRole('menuitem', { name: 'Inner' });
    expect(spacerOf(inner)).toBeNull();
  });

  it('sizes an image icon like a named icon and the icon-less spacer, so all labels line up', async () => {
    await openMenu({
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
    });
    const imageBox = screen
      .getByRole('menuitem', { name: /With image/ })
      .querySelector('[data-slot="menu-icon-image-box"]');
    expect(imageBox).toHaveClass('tw:w-4');
    expect(imageBox?.querySelector('img')).toHaveClass('tw:max-h-4', 'tw:max-w-4');
    expect(spacerOf(screen.getByRole('menuitem', { name: /^Plain/ }))).toHaveClass('tw:w-4');
  });

  it('renders no spacer when no item has a leading icon', async () => {
    await openMenu({ ...MIXED, items: MIXED.items.filter((item) => !item.iconNameBefore) });
    expect(screen.getByRole('menuitem', { name: /^Plain/ })).toBeInTheDocument();
    expect(document.querySelectorAll('[data-slot="menu-icon-spacer"]')).toHaveLength(0);
  });

  it('keeps a minimum gap between the label and the shortcut', async () => {
    await openMenu(MIXED);
    const shortcut = screen
      .getByRole('menuitem', { name: /^Plain/ })
      .querySelector('[data-slot="dropdown-menu-shortcut"]');
    expect(shortcut).toHaveClass('tw:ps-4');
  });
});
