// Test fixtures use `as ScrollGroupId` to construct branded-number values from literals, and `!`
// non-null assertions immediately after `expect(x).toBeDefined()` calls to read fields off the
// just-asserted value. Both are idiomatic for test code; the lint rule's strict prohibition fits
// production code better than test fixtures.
/* eslint-disable no-type-assertion/no-type-assertion */
import { describe, it, expect } from 'vitest';
import type { ScrollGroupId } from 'platform-bible-utils';
import {
  computeRows,
  partitionAndSort,
  type OpenProjectTab,
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

const openTabs: OpenProjectTab[] = [
  { projectId: 'a', scrollGroupId: A },
  { projectId: 'a', scrollGroupId: B },
  { projectId: 'b', scrollGroupId: A },
];

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

  it('selected rows float to the top of their section', () => {
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
    expect(other!.rows[0].projectId).toBe('m');
    expect(other!.rows[1].projectId).toBe('a');
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
    const tabs: OpenProjectTab[] = [
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
