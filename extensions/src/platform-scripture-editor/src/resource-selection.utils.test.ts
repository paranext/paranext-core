import { describe, expect, it } from 'vitest';
import type { EffectiveResourceReference } from 'platform-scripture';
import { buildPickerResources, type PickerResource } from './downloaded-resources.utils';
import {
  findSelectedRow,
  isTeamPickerResource,
  matchesSelectedResourceId,
  resolveResourceSelection,
  splitPickerResourcesBySource,
} from './resource-selection.utils';

const dblRow = (id: string): PickerResource => ({
  reference: { type: 'dblResource', name: id, id },
  source: 'user',
  isAdminLocked: false,
  type: 'ScriptureResource',
  installed: true,
  projectId: `proj-${id}`,
});

/** A row for a resource that is referenced but not installed, so it has no content to display. */
const notInstalledRow = (id: string): PickerResource => ({
  ...dblRow(id),
  installed: false,
  projectId: undefined,
});

const projectRow = (id: string): PickerResource => ({
  reference: { type: 'project', name: id, id },
  source: 'user',
  isAdminLocked: false,
  type: 'ScriptureResource',
  installed: true,
  projectId: id,
});

describe('matchesSelectedResourceId', () => {
  it('matches the namespaced row id', () => {
    expect(matchesSelectedResourceId(dblRow('abc'), 'dbl:abc')).toBe(true);
  });

  it('matches a bare id persisted before ids were namespaced', () => {
    expect(matchesSelectedResourceId(dblRow('abc'), 'abc')).toBe(true);
    expect(matchesSelectedResourceId(projectRow('VULGP83'), 'VULGP83')).toBe(true);
  });

  it('does not match a row of a different kind sharing the id', () => {
    expect(matchesSelectedResourceId(projectRow('abc'), 'dbl:abc')).toBe(false);
  });

  it('matches nothing when no selection is persisted', () => {
    expect(matchesSelectedResourceId(dblRow('abc'), undefined)).toBe(false);
  });
});

describe('findSelectedRow', () => {
  it('finds a DBL row by the project a selection names, once the catalog names that row', () => {
    // Selected from Home by its project before the catalog arrived; the row is now a DBL row.
    const rows = [dblRow('first'), dblRow('abc')];
    expect(findSelectedRow(rows, 'project:proj-abc')).toBe(rows[1]);
    expect(findSelectedRow(rows, 'project:proj-other')).toBeUndefined();
  });

  it('keeps the project row the user picked when the same resource is also listed by DBL entry', () => {
    const rows = [dblRow('abc'), projectRow('proj-abc')];
    expect(findSelectedRow(rows, 'project:proj-abc')).toBe(rows[1]);
    expect(resolveResourceSelection(rows, 'project:proj-abc', undefined).selectedRow).toBe(rows[1]);
  });

  it('never falls back to a row that shows nothing', () => {
    expect(findSelectedRow([notInstalledRow('abc')], 'project:proj-abc')).toBeUndefined();
  });
});

describe('resolveResourceSelection', () => {
  it('commits a pick once its row arrives in the list', () => {
    const rows = [dblRow('old'), dblRow('new')];
    const result = resolveResourceSelection(rows, 'dbl:old', 'dbl:new');
    expect(result.nextSelectedResourceId).toBe('dbl:new');
    expect(result.shouldClearPending).toBe(true);
    expect(result.selectedRow?.projectId).toBe('proj-new');
  });

  it('commits a pick of a locally-installed non-DBL resource, which stores a project reference', () => {
    // `selectTextConnection` writes a ProjectReference for these, so the pending id must be
    // `project:<projectId>`. A bare DBL entry UID would never match and the pick would never land.
    const rows = [dblRow('old'), projectRow('VULGP83')];
    const result = resolveResourceSelection(rows, 'dbl:old', 'project:VULGP83');
    expect(result.nextSelectedResourceId).toBe('project:VULGP83');
    expect(result.shouldClearPending).toBe(true);
  });

  it('holds the selection still while a pick has not arrived yet', () => {
    const rows = [dblRow('old')];
    const result = resolveResourceSelection(rows, 'dbl:old', 'dbl:not-here-yet');
    expect(result.nextSelectedResourceId).toBeUndefined();
    expect(result.shouldClearPending).toBe(false);
  });

  it('does not auto-correct away a selection that has left the list while a pick is in flight', () => {
    // Without this the pick is overwritten by the fallback before its row lands.
    const rows = [dblRow('other')];
    const result = resolveResourceSelection(rows, 'dbl:gone', 'dbl:not-here-yet');
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  it('rewrites a legacy bare id to its namespaced form without changing which row is selected', () => {
    const rows = [dblRow('first'), dblRow('abc')];
    const result = resolveResourceSelection(rows, 'abc', undefined);
    expect(result.nextSelectedResourceId).toBe('dbl:abc');
    expect(result.selectedRow?.reference).toMatchObject({ id: 'abc' });
  });

  it('keeps a project selection on its resource when the row becomes a DBL row', () => {
    const rows = [dblRow('first'), dblRow('abc')];
    expect(resolveResourceSelection(rows, 'project:proj-abc', undefined)).toEqual({
      nextSelectedResourceId: 'dbl:abc',
      shouldClearPending: false,
      selectedRow: rows[1],
    });
  });

  it('leaves an already-namespaced selection alone', () => {
    const rows = [dblRow('abc')];
    const result = resolveResourceSelection(rows, 'dbl:abc', undefined);
    expect(result.nextSelectedResourceId).toBeUndefined();
    expect(result.selectedRow?.reference).toMatchObject({ id: 'abc' });
  });

  it('falls back to the first displayable row when the selection has left the list', () => {
    const rows = [dblRow('a'), dblRow('b')];
    const result = resolveResourceSelection(rows, 'dbl:gone', undefined);
    expect(result.nextSelectedResourceId).toBe('dbl:a');
  });

  it('skips rows with nothing to display when falling back', () => {
    // A row with no `projectId` has no content to fetch, so selecting it would spin forever.
    const rows = [notInstalledRow('uninstalled'), dblRow('installed')];
    const result = resolveResourceSelection(rows, 'dbl:gone', undefined);
    expect(result.nextSelectedResourceId).toBe('dbl:installed');
  });

  it('persists nothing when no row is displayable', () => {
    const rows = [notInstalledRow('uninstalled')];
    const result = resolveResourceSelection(rows, 'dbl:gone', undefined);
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  it('selects nothing when the list is empty', () => {
    const result = resolveResourceSelection([], 'dbl:abc', undefined);
    expect(result.selectedRow).toBeUndefined();
    expect(result.nextSelectedResourceId).toBeUndefined();
  });
});

describe('isTeamPickerResource', () => {
  it.each([
    ['admin', true],
    ['user', false],
    ['downloaded', false],
  ] as const)("a %s row is the team's: %s", (source, expected) => {
    expect(isTeamPickerResource({ ...dblRow('a'), source })).toBe(expected);
  });
});

describe('splitPickerResourcesBySource', () => {
  const row = (id: string, source: PickerResource['source']): PickerResource => ({
    ...dblRow(id),
    source,
  });
  const names = (rows: PickerResource[]) => rows.map((r) => r.reference.name);
  // Interleaved so that a split which sorted, or which kept only the first run of each source,
  // would come out in a different order.
  const rows = [
    row('a', 'admin'),
    row('b', 'user'),
    row('c', 'downloaded'),
    row('d', 'admin'),
    row('e', 'downloaded'),
    row('f', 'user'),
  ];

  it("puts the team's, the user's and other installed rows in their own groups, keeping their order", () => {
    const { team, user, other } = splitPickerResourcesBySource(rows, {
      isCatalogUnavailable: false,
    });

    expect(names(team)).toEqual(['a', 'd']);
    expect(names(user)).toEqual(['b', 'f']);
    expect(names(other)).toEqual(['c', 'e']);
  });

  it("lists the user's and other installed rows together, in their order, while the catalog is unavailable", () => {
    const { team, user, other } = splitPickerResourcesBySource(rows, {
      isCatalogUnavailable: true,
    });

    expect(names(team)).toEqual(['a', 'd']);
    expect(names(user)).toEqual(['b', 'c', 'e', 'f']);
    expect(other).toEqual([]);
  });

  it("keeps an installed team resource with the user's rows while the catalog is unavailable", () => {
    // Without the catalog the team's DBL reference cannot be resolved, so it is dropped and the
    // project installed from it comes back as a plain downloaded row.
    const teamReference: EffectiveResourceReference = {
      type: 'dblResource',
      name: 'WEB',
      id: 'uid-web',
      source: 'admin',
    };
    const downloaded = { projectId: 'proj-web', name: 'WEB', language: 'English' };
    const pickerRows = buildPickerResources([teamReference], [downloaded], []);

    const { team, user, other } = splitPickerResourcesBySource(pickerRows, {
      isCatalogUnavailable: true,
    });

    expect(team).toEqual([]);
    expect(user).toEqual([
      expect.objectContaining({ source: 'downloaded', projectId: 'proj-web' }),
    ]);
    expect(other).toEqual([]);
  });
});
