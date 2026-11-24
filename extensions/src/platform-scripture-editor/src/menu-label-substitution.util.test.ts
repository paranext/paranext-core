import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
import {
  PROJECT_COLUMN_KEY,
  substituteProjectNameInMenu,
  substituteResourceNameInColumnHeading,
} from './menu-label-substitution.util';

type Menu = Localized<MultiColumnMenu>;

function buildMenu(label: string, extras: { tooltip?: string; searchTerms?: string } = {}): Menu {
  return {
    columns: {},
    groups: {},
    items: [
      { label: 'Other', group: 'a.b', order: 1, command: 'a.other', localizeNotes: '' },
      { label, group: 'a.b', order: 2, command: 'a.sync', localizeNotes: '', ...extras },
    ],
  };
}

const labelOf = (menu: Menu | undefined) => menu?.items[1].label;

describe('substituteProjectNameInMenu', () => {
  it('fills the project name into the label', () => {
    expect(labelOf(substituteProjectNameInMenu(buildMenu('Sync {projectName}'), 'HPUXR'))).toBe(
      'Sync HPUXR',
    );
  });

  it('fills a Spanish label', () => {
    expect(
      labelOf(substituteProjectNameInMenu(buildMenu('Sincronizar {projectName}'), 'HPUXR')),
    ).toBe('Sincronizar HPUXR');
  });

  it('removes the placeholder and the space before it when the name is empty', () => {
    expect(labelOf(substituteProjectNameInMenu(buildMenu('Sync {projectName}'), ''))).toBe('Sync');
  });

  it('leaves the space after a leading placeholder when the name is empty', () => {
    // The whitespace rule only absorbs the space BEFORE a placeholder, so a leading placeholder
    // leaves a leading space.
    expect(labelOf(substituteProjectNameInMenu(buildMenu('{projectName} sync'), ''))).toBe(' sync');
  });

  it('fills every placeholder when one string contains it twice', () => {
    expect(
      labelOf(substituteProjectNameInMenu(buildMenu('{projectName}: sync {projectName}'), 'HPUXR')),
    ).toBe('HPUXR: sync HPUXR');
  });

  it('fills the placeholder in every item that contains it, including one in a submenu', () => {
    const menu: Menu = {
      columns: {},
      groups: { 'a.sub': { menuItem: 'a.submenu', order: 1 } },
      items: [
        {
          id: 'a.submenu',
          label: 'Project {projectName}',
          group: 'a.b',
          order: 1,
          localizeNotes: '',
        },
        {
          label: 'Sync {projectName}',
          group: 'a.sub',
          order: 1,
          command: 'a.sync',
          localizeNotes: '',
        },
      ],
    };
    const result = substituteProjectNameInMenu(menu, 'HPUXR');
    expect(result.items.map((item) => item.label)).toEqual(['Project HPUXR', 'Sync HPUXR']);
  });

  it('inserts a name containing braces literally', () => {
    expect(labelOf(substituteProjectNameInMenu(buildMenu('Sync {projectName}'), 'A{b}c'))).toBe(
      'Sync A{b}c',
    );
  });

  it('inserts a name containing replacement patterns literally', () => {
    expect(labelOf(substituteProjectNameInMenu(buildMenu('Sync {projectName}'), "A$&B$'"))).toBe(
      "Sync A$&B$'",
    );
  });

  it('passes a right-to-left name through unchanged', () => {
    expect(labelOf(substituteProjectNameInMenu(buildMenu('Sync {projectName}'), 'عربي'))).toBe(
      'Sync عربي',
    );
  });

  it('fills tooltip and searchTerms, and leaves other items alone', () => {
    const menu = buildMenu('Sync {projectName}', {
      tooltip: 'Send and receive {projectName}',
      searchTerms: 'sync {projectName} share',
    });
    const result = substituteProjectNameInMenu(menu, 'HPUXR');
    expect(result.items[1].tooltip).toBe('Send and receive HPUXR');
    expect(result.items[1].searchTerms).toBe('sync HPUXR share');
    expect(result.items[0]).toBe(menu.items[0]);
  });

  it('returns the same reference when nothing contains the placeholder', () => {
    const menu = buildMenu('Sync');
    expect(substituteProjectNameInMenu(menu, 'HPUXR')).toBe(menu);
  });

  it('passes undefined through', () => {
    expect(substituteProjectNameInMenu(undefined, 'HPUXR')).toBeUndefined();
  });
});

describe('substituteResourceNameInColumnHeading', () => {
  function buildColumnMenu(): Menu {
    return {
      columns: {
        [PROJECT_COLUMN_KEY]: { label: 'Project', order: 1, localizeNotes: '' },
        'platform.view': { label: 'View', order: 2, localizeNotes: '' },
      },
      groups: {},
      items: [],
    };
  }

  it('labels the Project column with the resource short name', () => {
    const result = substituteResourceNameInColumnHeading(buildColumnMenu(), true, 'engWEBUS');
    expect(result.columns[PROJECT_COLUMN_KEY]).toMatchObject({ label: 'engWEBUS', order: 1 });
    expect(result.columns['platform.view']).toMatchObject({ label: 'View' });
  });

  it('keeps the Project heading for a project', () => {
    const menu = buildColumnMenu();
    expect(substituteResourceNameInColumnHeading(menu, false, 'engWEBUS')).toBe(menu);
  });

  it('keeps the Project heading while the short name is empty', () => {
    const menu = buildColumnMenu();
    expect(substituteResourceNameInColumnHeading(menu, true, '')).toBe(menu);
  });

  it('returns the menu unchanged when it has no Project column', () => {
    const menu = buildMenu('Sync');
    expect(substituteResourceNameInColumnHeading(menu, true, 'engWEBUS')).toBe(menu);
  });

  it('returns undefined for an undefined menu', () => {
    expect(substituteResourceNameInColumnHeading(undefined, true, 'engWEBUS')).toBeUndefined();
  });
});
