// Test fixtures use `as ScrollGroupId` to construct branded-number values from literals, and `!`
// non-null assertions immediately after `expect(x).toBeDefined()` calls to read fields off the
// just-asserted value. Both are idiomatic for test code; the lint rule's strict prohibition fits
// production code better than test fixtures.
/* eslint-disable no-type-assertion/no-type-assertion */
import { describe, it, expect, vi } from 'vitest';
import { normalizeProjectId, type ScrollGroupId } from 'platform-bible-utils';
import {
  computeRows,
  partitionAndSort,
  partitionByCustomSections,
  type ProjectRow,
  type ProjectSelectorOpenTab,
  type ProjectSelectorProject,
} from './project-selector.rows';

const A: ScrollGroupId = 0 as ScrollGroupId;
const B: ScrollGroupId = 1 as ScrollGroupId;
const C: ScrollGroupId = 2 as ScrollGroupId;

const projects: ProjectSelectorProject[] = [
  { id: 'a', shortName: 'A', fullName: 'Project A' },
  { id: 'b', shortName: 'B', fullName: 'Project B' },
  { id: 'c', shortName: 'C', fullName: 'Project C' },
];

const openTabs: ProjectSelectorOpenTab[] = [
  { projectId: 'a', scrollGroupId: A },
  { projectId: 'a', scrollGroupId: B },
  { projectId: 'b', scrollGroupId: A },
];

describe('computeRows — case-insensitive project-id matching', () => {
  // Real-world casing mismatch: canonical project ids are UPPERCASE (C# ProjectSummary →
  // Guid.ToUpperInvariant), but the open-tabs hook lowercases projectId. The join must still match
  // so the "Open Tabs" section renders. All-lowercase fixtures above never exercise this path.
  const upperProjects: ProjectSelectorProject[] = [
    { id: 'ABC123', shortName: 'A', fullName: 'Project A' },
    { id: 'DEF456', shortName: 'B', fullName: 'Project B' },
  ];
  const lowerTabs: ProjectSelectorOpenTab[] = [
    { projectId: 'abc123', scrollGroupId: A },
    { projectId: 'abc123', scrollGroupId: B },
  ];

  it('matches open tabs to projects regardless of id casing (project mode)', () => {
    const rows = computeRows({
      mode: 'project',
      projects: upperProjects,
      openTabs: lowerTabs,
      selection: { projectId: undefined },
    });
    const rowA = rows.find((r) => r.projectId === 'ABC123');
    expect(rowA).toBeDefined();
    expect(rowA!.openGroups).toEqual([A, B]);
    expect(rowA!.isMuted).toBe(false);
  });

  it('selects the row when a single-select id differs in casing from the canonical id', () => {
    const rows = computeRows({
      mode: 'project',
      projects: upperProjects,
      openTabs: [],
      selection: { projectId: 'abc123' },
    });
    expect(rows.filter((r) => r.isSelected).map((r) => r.projectId)).toEqual(['ABC123']);
  });

  it('selects nothing in single-select mode when no project is selected', () => {
    const rows = computeRows({
      mode: 'project',
      projects: upperProjects,
      openTabs: [],
      selection: { projectId: undefined },
    });
    expect(rows.some((r) => r.isSelected)).toBe(false);
  });

  it('keeps a bound-but-closed row when the selection pair id differs in casing', () => {
    // A pair bound to a scroll group with no open tab produces a synthetic "bound but closed" row.
    // Resolving that pair back to its project normalizes casing, so a lowercased pair id still
    // finds its uppercase canonical project and the user's selected project stays in the list.
    const rows = computeRows({
      mode: 'project-multi',
      projects: upperProjects,
      openTabs: [],
      selection: { pairs: [{ projectId: 'abc123', scrollGroupId: A }] },
    });
    const bound = rows.filter((r) => r.isBoundButClosed);
    expect(bound).toHaveLength(1);
    expect(normalizeProjectId(bound[0].projectId)).toBe('ABC123');
    expect(bound[0].isSelected).toBe(true);
  });

  it('matches open tabs to projects regardless of id casing (project-multi mode)', () => {
    const rows = computeRows({
      mode: 'project-multi',
      projects: upperProjects,
      openTabs: lowerTabs,
      selection: { pairs: [] },
    });
    // With a working join, ABC123 has two open groups → two per-pair rows (not one muted row).
    const abcRows = rows.filter((r) => r.projectId === 'ABC123');
    expect(abcRows).toHaveLength(2);
    expect(abcRows.every((r) => r.isMuted === false)).toBe(true);
  });
});

describe('computeRows — project mode', () => {
  it('emits one row per project with openGroups reflecting open tabs', () => {
    const rows = computeRows({
      mode: 'project',
      projects,
      openTabs,
      selection: { projectId: undefined },
    });
    expect(rows).toHaveLength(3);
    const [rowA, rowB, rowC] = rows;
    expect(rowA.projectId).toBe('a');
    expect(rowA.openGroups).toEqual([A, B]);
    expect(rowA.isMuted).toBe(false);
    expect(rowB.openGroups).toEqual([A]);
    expect(rowC.openGroups).toEqual([]);
    expect(rowC.isMuted).toBe(true);
  });

  it('marks the selected project', () => {
    const rows = computeRows({
      mode: 'project',
      projects,
      openTabs,
      selection: { projectId: 'b' },
    });
    expect(rows.find((r) => r.projectId === 'b')?.isSelected).toBe(true);
    expect(rows.filter((r) => r.isSelected)).toHaveLength(1);
  });

  it('never emits synthetic or in-group rows', () => {
    const rows = computeRows({
      mode: 'project',
      projects,
      openTabs,
      selection: { projectId: 'a' },
    });
    expect(rows.every((r) => r.scrollGroupId === undefined)).toBe(true);
    expect(rows.every((r) => !r.isBoundButClosed)).toBe(true);
  });

  it('passes through scrollGroupScrRefLabel — not used in project mode', () => {
    const rows = computeRows({
      mode: 'project',
      projects,
      openTabs: [{ projectId: 'a', scrollGroupId: A, scrollGroupScrRefLabel: 'MAT 3:16' }],
      selection: { projectId: undefined },
    });
    // Project mode rows don't carry a scrollGroupScrRefLabel (aggregate chips)
    expect(rows.find((r) => r.projectId === 'a')?.scrollGroupScrRefLabel).toBeUndefined();
  });
});

describe('computeRows — project-multi mode (per-pair selection)', () => {
  it('emits one row per (project, open group) pair plus one row per not-open project', () => {
    const rows = computeRows({
      mode: 'project-multi',
      projects,
      openTabs,
      selection: { pairs: [] },
    });
    // a in A, a in B, b in A, c not open
    expect(rows).toHaveLength(4);
    expect(rows.find((r) => r.projectId === 'c')?.isMuted).toBe(true);
  });

  it('marks ONLY the exact (projectId, scrollGroupId) pairs in the selection', () => {
    const rows = computeRows({
      mode: 'project-multi',
      projects,
      openTabs,
      selection: {
        pairs: [
          { projectId: 'a', scrollGroupId: A },
          { projectId: 'b', scrollGroupId: A },
        ],
      },
    });
    expect(
      rows
        .filter((r) => r.isSelected)
        .map((r) => `${r.projectId}:${r.scrollGroupId}`)
        .sort(),
    ).toEqual(['a:0', 'b:0']);
  });

  it('selecting the same project in one scroll group does NOT select it in another', () => {
    const rows = computeRows({
      mode: 'project-multi',
      projects,
      openTabs,
      selection: { pairs: [{ projectId: 'a', scrollGroupId: A }] },
    });
    const aInB = rows.find((r) => r.projectId === 'a' && r.scrollGroupId === B);
    expect(aInB?.isSelected).toBe(false);
  });

  it('emits a synthetic bound-but-closed row for a selected pair whose tab is not open', () => {
    const rows = computeRows({
      mode: 'project-multi',
      projects,
      openTabs,
      selection: {
        pairs: [
          { projectId: 'a', scrollGroupId: B },
          { projectId: 'a', scrollGroupId: C },
        ],
      },
    });
    const synthetic = rows.filter((r) => r.isBoundButClosed);
    expect(synthetic).toHaveLength(1);
    expect(synthetic[0].projectId).toBe('a');
    expect(synthetic[0].scrollGroupId).toBe(C);
    expect(synthetic[0].isSelected).toBe(true);
  });

  it('a not-open project can be selected via a pair with undefined scrollGroupId', () => {
    const rows = computeRows({
      mode: 'project-multi',
      projects,
      openTabs,
      selection: { pairs: [{ projectId: 'c' }] },
    });
    const cRow = rows.find((r) => r.projectId === 'c');
    expect(cRow?.isSelected).toBe(true);
    expect(cRow?.scrollGroupId).toBeUndefined();
    expect(rows.some((r) => r.isBoundButClosed)).toBe(false);
  });

  it('carries scrollGroupScrRefLabel through to matching tab rows', () => {
    const rows = computeRows({
      mode: 'project-multi',
      projects,
      openTabs: [{ projectId: 'a', scrollGroupId: A, scrollGroupScrRefLabel: 'MAT 3:16' }],
      selection: { pairs: [] },
    });
    expect(
      rows.find((r) => r.projectId === 'a' && r.scrollGroupId === A)?.scrollGroupScrRefLabel,
    ).toBe('MAT 3:16');
  });
});

describe('computeRows — projectScrollGroup mode', () => {
  it('emits one row per (project, open group) pair and a row for projects not open anywhere', () => {
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects,
      openTabs,
      selection: { projectId: undefined, scrollGroupId: undefined },
    });
    expect(rows).toHaveLength(4);
    expect(rows.find((r) => r.projectId === 'a' && r.scrollGroupId === A)?.isMuted).toBe(false);
    expect(rows.find((r) => r.projectId === 'c')?.isMuted).toBe(true);
    expect(rows.find((r) => r.projectId === 'c')?.scrollGroupId).toBeUndefined();
  });

  it('marks the exact (projectId, scrollGroupId) pair as selected', () => {
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects,
      openTabs,
      selection: { projectId: 'a', scrollGroupId: B },
    });
    const selected = rows.filter((r) => r.isSelected);
    expect(selected).toHaveLength(1);
    expect(selected[0].projectId).toBe('a');
    expect(selected[0].scrollGroupId).toBe(B);
  });

  it('does NOT mark other open rows of the same project as selected', () => {
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects,
      openTabs,
      selection: { projectId: 'a', scrollGroupId: A },
    });
    const aInB = rows.find((r) => r.projectId === 'a' && r.scrollGroupId === B);
    expect(aInB?.isSelected).toBe(false);
  });

  it('adds a synthetic bound-but-closed row when the selected pair is not open', () => {
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects,
      openTabs,
      selection: { projectId: 'a', scrollGroupId: C },
    });
    const synthetic = rows.find((r) => r.isBoundButClosed);
    expect(synthetic).toBeDefined();
    expect(synthetic?.projectId).toBe('a');
    expect(synthetic?.scrollGroupId).toBe(C);
    expect(synthetic?.isSelected).toBe(true);
    expect(rows.filter((r) => r.projectId === 'a' && !r.isBoundButClosed)).toHaveLength(2);
  });

  it('does NOT add synthetic row when the selected pair is already open', () => {
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects,
      openTabs,
      selection: { projectId: 'a', scrollGroupId: A },
    });
    expect(rows.some((r) => r.isBoundButClosed)).toBe(false);
  });

  it('does NOT add synthetic row when selection projectId is absent from projects', () => {
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects,
      openTabs,
      selection: { projectId: 'missing', scrollGroupId: A },
    });
    expect(rows.some((r) => r.isBoundButClosed)).toBe(false);
  });

  it('does NOT add synthetic row when scrollGroupId is undefined', () => {
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects,
      openTabs,
      selection: { projectId: 'a', scrollGroupId: undefined },
    });
    expect(rows.some((r) => r.isBoundButClosed)).toBe(false);
  });
});

describe('partitionAndSort', () => {
  it('flat mode returns a single section with no section kind header', () => {
    const rows = computeRows({
      mode: 'project',
      projects,
      openTabs,
      selection: { projectId: 'b' },
    });
    const sections = partitionAndSort(rows, false);
    expect(sections).toHaveLength(1);
    expect(sections[0].kind).toBe('flat');
  });

  it('grouped mode splits into Open tabs / Other projects for project mode', () => {
    const rows = computeRows({
      mode: 'project',
      projects,
      openTabs,
      selection: { projectId: undefined },
    });
    const sections = partitionAndSort(rows, true);
    expect(sections.map((s) => s.kind)).toEqual(['openTabs', 'other']);
    expect(sections[0].rows.map((r) => r.projectId).sort()).toEqual(['a', 'b']);
    expect(sections[1].rows.map((r) => r.projectId)).toEqual(['c']);
  });

  it('bound-but-closed rows land in the Other projects section', () => {
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects,
      openTabs,
      selection: { projectId: 'a', scrollGroupId: C },
    });
    const sections = partitionAndSort(rows, true);
    const other = sections.find((s) => s.kind === 'other');
    expect(other).toBeDefined();
    expect(other!.rows.some((r) => r.isBoundButClosed && r.projectId === 'a')).toBe(true);
  });

  it('selected rows stay in alphabetical position (no float-to-top)', () => {
    // Selected rows do NOT float to the top — the component scrolls the
    // selected row into view on open, but the ordering itself is the
    // canonical alphabetical sort.
    const many: ProjectSelectorProject[] = [
      { id: 'z', shortName: 'Z', fullName: 'Z' },
      { id: 'a', shortName: 'A', fullName: 'A' },
      { id: 'm', shortName: 'M', fullName: 'M' },
    ];
    const rows = computeRows({
      mode: 'project-multi',
      projects: many,
      openTabs: [{ projectId: 'z', scrollGroupId: A }],
      selection: { pairs: [{ projectId: 'm' }] },
    });
    const sections = partitionAndSort(rows, true);
    const other = sections.find((s) => s.kind === 'other');
    expect(other!.rows.map((r) => r.projectId)).toEqual(['a', 'm']);
  });

  it('selection state is preserved across groupByOpenTabs flips', () => {
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects,
      openTabs,
      selection: { projectId: 'a', scrollGroupId: B },
    });
    const flat = partitionAndSort(rows, false);
    const grouped = partitionAndSort(rows, true);
    const flatSelected = flat.flatMap((s) => s.rows).filter((r) => r.isSelected);
    const groupedSelected = grouped.flatMap((s) => s.rows).filter((r) => r.isSelected);
    expect(flatSelected.map((r) => `${r.projectId}:${r.scrollGroupId}`)).toEqual(
      groupedSelected.map((r) => `${r.projectId}:${r.scrollGroupId}`),
    );
  });

  it('row set is identical between grouped and flat (grouping only affects headers)', () => {
    const rows = computeRows({
      mode: 'project',
      projects,
      openTabs,
      selection: { projectId: 'a' },
    });
    const flatKeys = partitionAndSort(rows, false)
      .flatMap((s) => s.rows)
      .map((r) => r.rowKey)
      .sort();
    const groupedKeys = partitionAndSort(rows, true)
      .flatMap((s) => s.rows)
      .map((r) => r.rowKey)
      .sort();
    expect(flatKeys).toEqual(groupedKeys);
  });

  it('within a section, ties on selection are broken alphabetically, then by scroll group', () => {
    const many: ProjectSelectorProject[] = [
      { id: 'p', shortName: 'P', fullName: 'P' },
      { id: 'q', shortName: 'Q', fullName: 'Q' },
    ];
    const tabs: ProjectSelectorOpenTab[] = [
      { projectId: 'p', scrollGroupId: B },
      { projectId: 'p', scrollGroupId: A },
      { projectId: 'q', scrollGroupId: A },
    ];
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects: many,
      openTabs: tabs,
      selection: { projectId: undefined, scrollGroupId: undefined },
    });
    const sections = partitionAndSort(rows, true);
    const open = sections.find((s) => s.kind === 'openTabs');
    expect(open!.rows.map((r) => `${r.projectId}:${r.scrollGroupId}`)).toEqual([
      'p:0',
      'p:1',
      'q:0',
    ]);
  });
});

describe('computeRows — isDisabled / disabledReason flow-through', () => {
  it('project mode propagates isDisabled and disabledReason from project to row', () => {
    const disabledProjects: ProjectSelectorProject[] = [
      { id: 'a', shortName: 'A', fullName: 'A' },
      {
        id: 'b',
        shortName: 'B',
        fullName: 'B',
        isDisabled: true,
        disabledReason: 'Read-only target',
      },
    ];
    const rows = computeRows({
      mode: 'project',
      projects: disabledProjects,
      openTabs: [],
      selection: { projectId: undefined },
    });
    const rowA = rows.find((r) => r.projectId === 'a');
    const rowB = rows.find((r) => r.projectId === 'b');
    expect(rowA?.isDisabled).toBe(false);
    expect(rowA?.disabledReason).toBeUndefined();
    expect(rowB?.isDisabled).toBe(true);
    expect(rowB?.disabledReason).toBe('Read-only target');
  });

  it('project-multi mode propagates isDisabled to per-tab rows of a disabled project', () => {
    const disabledProjects: ProjectSelectorProject[] = [
      { id: 'a', shortName: 'A', fullName: 'A' },
      { id: 'b', shortName: 'B', fullName: 'B', isDisabled: true, disabledReason: 'Locked' },
    ];
    const rows = computeRows({
      mode: 'project-multi',
      projects: disabledProjects,
      openTabs: [
        { projectId: 'a', scrollGroupId: A },
        { projectId: 'b', scrollGroupId: A },
        { projectId: 'b', scrollGroupId: B },
      ],
      selection: { pairs: [] },
    });
    const bRows = rows.filter((r) => r.projectId === 'b');
    expect(bRows).toHaveLength(2);
    expect(bRows.every((r) => r.isDisabled)).toBe(true);
    expect(bRows.every((r) => r.disabledReason === 'Locked')).toBe(true);
  });

  it('synthetic bound-but-closed rows inherit isDisabled from the source project', () => {
    const disabledProjects: ProjectSelectorProject[] = [
      { id: 'a', shortName: 'A', fullName: 'A', isDisabled: true, disabledReason: 'Archived' },
    ];
    const rows = computeRows({
      mode: 'projectScrollGroup',
      projects: disabledProjects,
      openTabs: [],
      selection: { projectId: 'a', scrollGroupId: A },
    });
    const closed = rows.find((r) => r.isBoundButClosed);
    expect(closed?.isDisabled).toBe(true);
    expect(closed?.disabledReason).toBe('Archived');
  });

  it('rows for projects without isDisabled report isDisabled=false (boolean, not undefined)', () => {
    const rows = computeRows({
      mode: 'project',
      projects: [{ id: 'a', shortName: 'A', fullName: 'A' }],
      openTabs: [],
      selection: { projectId: undefined },
    });
    expect(rows[0].isDisabled).toBe(false);
  });
});

describe('partitionAndSort — flat fallback when no Open Tabs section', () => {
  it('returns a single flat section (no headings) when grouping is on but no rows belong to Open Tabs', () => {
    const rows = computeRows({
      mode: 'project',
      projects,
      openTabs: [],
      selection: { projectId: undefined },
    });
    const sections = partitionAndSort(rows, true);
    expect(sections).toHaveLength(1);
    expect(sections[0].kind).toBe('flat');
    expect(sections[0].rows).toHaveLength(projects.length);
  });

  it('still emits both Open Tabs + Other Projects sections when at least one tab is open', () => {
    const rows = computeRows({
      mode: 'project',
      projects,
      openTabs: [{ projectId: 'a', scrollGroupId: A }],
      selection: { projectId: undefined },
    });
    const sections = partitionAndSort(rows, true);
    expect(sections.map((s) => s.kind)).toEqual(['openTabs', 'other']);
  });

  it('falls back to flat in project-multi mode when no projects are open', () => {
    const rows = computeRows({
      mode: 'project-multi',
      projects,
      openTabs: [],
      selection: { pairs: [] },
    });
    const sections = partitionAndSort(rows, true);
    expect(sections).toHaveLength(1);
    expect(sections[0].kind).toBe('flat');
  });
});

describe('partitionByCustomSections', () => {
  const byId = (list: ProjectSelectorProject[]) =>
    new Map(list.map((p) => [normalizeProjectId(p.id), p]));

  const rowsFor = (list: ProjectSelectorProject[], tabs: ProjectSelectorOpenTab[] = []) =>
    computeRows({ mode: 'project', projects: list, openTabs: tabs, selection: {} });

  it('renders sections in the supplied order, not alphabetically', () => {
    const list: ProjectSelectorProject[] = [
      { id: 'z', shortName: 'Z', fullName: 'Zebra' },
      { id: 'a', shortName: 'A', fullName: 'Apple' },
    ];
    const sections = partitionByCustomSections(
      rowsFor(list),
      [
        { id: 'second', label: 'Second', match: (p) => p.id === 'a' },
        { id: 'first', label: 'First', match: () => true },
      ],
      byId(list),
    );
    expect(sections.map((s) => s.label)).toEqual(['Second', 'First']);
  });

  it('assigns each project to the first matching section', () => {
    const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
    const sections = partitionByCustomSections(
      rowsFor(list),
      [
        { id: 'one', label: 'One', match: () => true },
        { id: 'two', label: 'Two', match: () => true },
      ],
      byId(list),
    );
    expect(sections).toHaveLength(1);
    expect(sections[0].label).toBe('One');
  });

  it('collects unmatched rows into a trailing unlabeled section', () => {
    const list: ProjectSelectorProject[] = [
      { id: 'a', shortName: 'A', fullName: 'Apple' },
      { id: 'b', shortName: 'B', fullName: 'Banana' },
    ];
    const sections = partitionByCustomSections(
      rowsFor(list),
      [{ id: 'only-a', label: 'Only A', match: (p) => p.id === 'a' }],
      byId(list),
    );
    expect(sections).toHaveLength(2);
    expect(sections[0].label).toBe('Only A');
    expect(sections[1].label).toBeUndefined();
    expect(sections[1].rows.map((r) => r.shortName)).toEqual(['B']);
  });

  it('elides sections that match no rows', () => {
    const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
    const sections = partitionByCustomSections(
      rowsFor(list),
      [
        { id: 'empty', label: 'Empty', match: () => false },
        { id: 'all', label: 'All', match: () => true },
      ],
      byId(list),
    );
    expect(sections.map((s) => s.label)).toEqual(['All']);
  });

  it('falls back to a single flat section when no sections are supplied', () => {
    const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
    const sections = partitionByCustomSections(rowsFor(list), [], byId(list));
    expect(sections).toHaveLength(1);
    expect(sections[0].kind).toBe('flat');
  });

  it('applies one match verdict to every row a project produces', () => {
    // project-multi fans one project out into one row per scroll group. All of those rows must
    // land in the same section, and `match` must be consulted once per project, not per row.
    const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
    const tabs: ProjectSelectorOpenTab[] = [
      { projectId: 'a', scrollGroupId: A },
      { projectId: 'a', scrollGroupId: B },
    ];
    const rows = computeRows({
      mode: 'project-multi',
      projects: list,
      openTabs: tabs,
      selection: { pairs: [] },
    });
    expect(rows.length).toBeGreaterThan(1);
    const match = vi.fn(() => true);
    const sections = partitionByCustomSections(
      rows,
      [{ id: 'all', label: 'All', match }],
      byId(list),
    );
    expect(sections).toHaveLength(1);
    expect(sections[0].rows).toHaveLength(rows.length);
    expect(match).toHaveBeenCalledTimes(1);
  });

  it('normalizes projectId casing when looking up a project in the map', () => {
    // Callers key the map by canonical project id; a row's projectId may arrive in any casing.
    // The lookup must normalize or the row falls through to the unmatched section.
    const project: ProjectSelectorProject = { id: 'ABC123', shortName: 'A', fullName: 'Apple' };
    const row: ProjectRow = {
      rowKey: 'test-key',
      projectId: 'abc123',
      shortName: 'A',
      fullName: 'Apple',
      openGroups: [],
      isSelected: false,
      isMuted: false,
      isBoundButClosed: false,
      isDisabled: false,
    };
    const sections = partitionByCustomSections(
      [row],
      [{ id: 'mine', label: 'Mine', match: (p) => p.id === 'ABC123' }],
      byId([project]),
    );
    expect(sections).toHaveLength(1);
    expect(sections[0].label).toBe('Mine');
  });

  it('uses a per-section compare when supplied, overriding alphabetical order', () => {
    // The canonical order is alphabetical by shortName, which would render a "Recent" section
    // alphabetically — useless. A section may impose its own order.
    const list: ProjectSelectorProject[] = [
      { id: 'a', shortName: 'A', fullName: 'Apple' },
      { id: 'b', shortName: 'B', fullName: 'Banana' },
      { id: 'c', shortName: 'C', fullName: 'Cherry' },
    ];
    const recency = ['c', 'a', 'b'];
    const sections = partitionByCustomSections(
      rowsFor(list),
      [
        {
          id: 'recent',
          label: 'Recent',
          match: () => true,
          compare: (x, y) => recency.indexOf(x.id) - recency.indexOf(y.id),
        },
      ],
      byId(list),
    );
    expect(sections[0].rows.map((r) => r.shortName)).toEqual(['C', 'A', 'B']);
  });

  it('falls back to compareRows when a caller compare treats two rows as equal', () => {
    // The project is open in scroll group B and separately selected (but not open) in scroll
    // group A, so `computeRows` produces the B row before the synthetic A row — descending, not
    // canonical order. A caller `compare` that does not consider scroll group returns 0 for that
    // pair, so the canonical tie-break must decide their relative order.
    const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
    const rows = computeRows({
      mode: 'project-multi',
      projects: list,
      openTabs: [{ projectId: 'a', scrollGroupId: B }],
      selection: { pairs: [{ projectId: 'a', scrollGroupId: A }] },
    });
    expect(rows.map((r) => r.scrollGroupId)).toEqual([B, A]);
    const sections = partitionByCustomSections(
      rows,
      [{ id: 'all', label: 'All', match: () => true, compare: () => 0 }],
      byId(list),
    );
    expect(sections).toHaveLength(1);
    expect(sections[0].rows.map((r) => r.scrollGroupId)).toEqual([A, B]);
  });

  it('gives two unlabeled sections distinct ids so React keys stay stable', () => {
    const list: ProjectSelectorProject[] = [
      { id: 'a', shortName: 'A', fullName: 'Apple' },
      { id: 'b', shortName: 'B', fullName: 'Banana' },
    ];
    const sections = partitionByCustomSections(
      rowsFor(list),
      [{ id: 'just-a', match: (p) => p.id === 'a' }],
      byId(list),
    );
    // One caller-supplied unlabeled section plus the trailing unmatched one.
    expect(sections).toHaveLength(2);
    expect(sections[0].label).toBeUndefined();
    expect(sections[1].label).toBeUndefined();
    expect(sections[0].id).not.toBe(sections[1].id);
  });

  it('warns once per duplicate id no matter how many times it partitions', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
      const sections = [
        { id: 'dup', label: 'One', match: () => false },
        { id: 'dup', label: 'Two', match: () => true },
      ];
      // The selector re-partitions on every search keystroke, so a per-call warning would bury
      // the console under the same message the caller can only act on once.
      partitionByCustomSections(rowsFor(list), sections, byId(list));
      partitionByCustomSections(rowsFor(list), sections, byId(list));
      partitionByCustomSections(rowsFor(list), sections, byId(list));
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('dup');
    } finally {
      warnSpy.mockRestore();
    }
  });

  it('warns once even when the sections array is rebuilt on every call', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
      // A caller building `customSections` inline hands over a new array each render. The guard
      // has to key off the id, not the array, or this is the case that warns hundreds of times.
      const partitionWithFreshArray = () =>
        partitionByCustomSections(
          rowsFor(list),
          [
            { id: 'inline-dup', label: 'One', match: () => false },
            { id: 'inline-dup', label: 'Two', match: () => true },
          ],
          byId(list),
        );
      partitionWithFreshArray();
      partitionWithFreshArray();
      partitionWithFreshArray();
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('inline-dup');
    } finally {
      warnSpy.mockRestore();
    }
  });

  it('warns about every distinct duplicate id in one array, not just the first', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
      partitionByCustomSections(
        rowsFor(list),
        [
          { id: 'first-dup', label: 'One', match: () => false },
          { id: 'first-dup', label: 'Two', match: () => false },
          { id: 'second-dup', label: 'Three', match: () => false },
          { id: 'second-dup', label: 'Four', match: () => true },
        ],
        byId(list),
      );
      const warned = warnSpy.mock.calls.map((call) => call[0]);
      expect(warned).toHaveLength(2);
      expect(warned.some((message) => message.includes('first-dup'))).toBe(true);
      expect(warned.some((message) => message.includes('second-dup'))).toBe(true);
    } finally {
      warnSpy.mockRestore();
    }
  });

  it('warns when a caller section id collides with the reserved unmatched-bucket id', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
      partitionByCustomSections(
        rowsFor(list),
        [{ id: '__unmatched__', label: 'Mine', match: () => true }],
        byId(list),
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('__unmatched__');
    } finally {
      warnSpy.mockRestore();
    }
  });

  it('does not warn when supplied section ids are unique', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
      partitionByCustomSections(
        rowsFor(list),
        [{ id: 'unique', label: 'One', match: () => true }],
        byId(list),
      );
      expect(warnSpy).not.toHaveBeenCalled();
    } finally {
      warnSpy.mockRestore();
    }
  });

  it('heads the unmatched bucket with the supplied label', () => {
    const list: ProjectSelectorProject[] = [
      { id: 'a', shortName: 'A', fullName: 'Apple' },
      { id: 'b', shortName: 'B', fullName: 'Banana' },
    ];
    const sections = partitionByCustomSections(
      rowsFor(list),
      [{ id: 'just-a', label: 'Mine', match: (p) => p.id === 'a' }],
      byId(list),
      'Other',
    );
    expect(sections.map((section) => section.label)).toEqual(['Mine', 'Other']);
    expect(sections[1].rows.map((r) => r.shortName)).toEqual(['B']);
  });

  it('keeps rows whose project is missing from the map in the unmatched section', () => {
    const list: ProjectSelectorProject[] = [{ id: 'a', shortName: 'A', fullName: 'Apple' }];
    const sections = partitionByCustomSections(
      rowsFor(list),
      [{ id: 'all', label: 'All', match: () => true }],
      new Map(), // deliberately empty
    );
    expect(sections).toHaveLength(1);
    expect(sections[0].label).toBeUndefined();
    expect(sections[0].rows).toHaveLength(1);
  });
});
