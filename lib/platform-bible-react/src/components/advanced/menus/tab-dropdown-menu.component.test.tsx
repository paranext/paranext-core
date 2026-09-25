// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { QUIET_FOCUS_ATTRIBUTE } from '@/utils/focus.util';
import { installNoopResizeObserver } from '@/test-utils/resize-observer.util';
import TabDropdownMenu from './tab-dropdown-menu.component';

// The hasPointerCapture / scrollIntoView shims this menu needs in jsdom are installed repo-wide by
// vitest.setup.ts. ResizeObserver is opt-in there, because tests that never open an overlay depend
// on jsdom leaving it undefined.
beforeAll(() => {
  installNoopResizeObserver();
});

// userEvent-driven Radix menus can take seconds per click on a contended Windows CI worker
vi.setConfig({ testTimeout: 20_000 });

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
    expect(shortcut).toHaveClass('tw:[unicode-bidi:plaintext]');
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
