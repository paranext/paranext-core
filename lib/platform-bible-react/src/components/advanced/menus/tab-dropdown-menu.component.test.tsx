// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import { persistDirection } from '@/utils/dir-helper.util';
import TabDropdownMenu from './tab-dropdown-menu.component';

// Radix menus instantiate a ResizeObserver; jsdom ships none.
class NoopResizeObserver implements ResizeObserver {
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
  if (typeof globalThis.ResizeObserver === 'undefined')
    globalThis.ResizeObserver = NoopResizeObserver;
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

  it('shows the shortcut beside an item that has one, and nothing beside one without', async () => {
    await openMenu(EDITOR_MENU);

    const find = screen.getByRole('menuitem', { name: /^Find/ });
    expect(within(find).getByText('Ctrl+F')).toHaveAttribute('data-slot', 'dropdown-menu-shortcut');
    const footnote = screen.getByRole('menuitem', { name: /^Insert footnote/ });
    expect(footnote.querySelector('[data-slot="dropdown-menu-shortcut"]')).toBeNull();
  });

  it('gives the shortcut its own direction so its keys keep their order in a right-to-left layout', async () => {
    await openMenu(EDITOR_MENU);

    const find = screen.getByRole('menuitem', { name: /^Find/ });
    // jsdom computes no bidi, so the class that isolates the hint is the checkable part
    expect(within(find).getByText('Ctrl+F')).toHaveClass('tw:[unicode-bidi:plaintext]');
  });

  it('opens a flyout and reaches its items by keyboard', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSelectMenuItem = vi.fn();
    render(
      <TabDropdownMenu
        menuData={{
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
            {
              label: 'Redo',
              localizeNotes: '',
              group: 'test.editActions',
              order: 2,
              command: 'test.redo',
            },
          ],
        }}
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

  it("shows a submenu item's tooltip on hover", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(
      <TabDropdownMenu
        menuData={{
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
              tooltip: 'Edit actions',
            },
            {
              label: 'Undo',
              localizeNotes: '',
              group: 'test.editActions',
              order: 1,
              command: 'test.undo',
            },
          ],
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
