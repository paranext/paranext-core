import { describe, expect, it } from 'vitest';
import type { PickerResource } from './downloaded-resources.utils';
import {
  findSelectedRow,
  matchesSelectedResourceId,
  resolveResourceSelection,
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

/** A row for a resource installed locally but in neither the admin's nor the user's list. */
const downloadedRow = (id: string): PickerResource => ({ ...projectRow(id), source: 'downloaded' });

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
      nextIsUserPick: undefined,
      shouldClearPending: false,
      selectedRow: rows[1],
      isDownloadedFallback: false,
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

  it('marks a committed pick as the user’s own choice', () => {
    const result = resolveResourceSelection([dblRow('new')], undefined, 'dbl:new');
    expect(result.nextIsUserPick).toBe(true);
  });

  it('marks a fallback it persists as not the user’s choice', () => {
    const result = resolveResourceSelection([dblRow('a')], 'dbl:gone', undefined, true);
    expect(result.nextSelectedResourceId).toBe('dbl:a');
    expect(result.nextIsUserPick).toBe(false);
  });

  it('shows a downloaded resource when nothing configured is displayable, without persisting it', () => {
    // Persisting it would keep the panel on it after a configured resource arrives.
    const rows = [notInstalledRow('configured'), downloadedRow('WEB')];
    const result = resolveResourceSelection(rows, undefined, undefined);
    expect(result.selectedRow?.projectId).toBe('WEB');
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  it('moves a downloaded selection the user did not pick to a configured resource', () => {
    // A selection stored without a user-pick mark counts as a fallback, so it recovers here once
    // something configured is displayable.
    const rows = [projectRow('configured'), downloadedRow('WEB')];
    const result = resolveResourceSelection(rows, 'project:WEB', undefined, undefined);
    expect(result.selectedRow?.projectId).toBe('configured');
    expect(result.nextSelectedResourceId).toBe('project:configured');
  });

  it('keeps a downloaded selection the user did not pick while nothing configured is displayable', () => {
    const rows = [downloadedRow('WEB')];
    const result = resolveResourceSelection(rows, 'project:WEB', undefined, false);
    expect(result.selectedRow?.projectId).toBe('WEB');
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  it('holds on a displayable downloaded row while a pick is in flight and nothing configured is displayable', () => {
    const rows = [notInstalledRow('uninstalled'), downloadedRow('WEB')];
    const result = resolveResourceSelection(rows, 'project:gone', 'dbl:not-here-yet', true);
    expect(result.selectedRow?.projectId).toBe('WEB');
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  describe('a legacy bare id that names a downloaded resource', () => {
    it('gives way to a configured resource when the user did not pick it', () => {
      const rows = [projectRow('configured'), downloadedRow('WEB')];
      const result = resolveResourceSelection(rows, 'WEB', undefined);
      expect(result.selectedRow?.projectId).toBe('configured');
      expect(result.nextSelectedResourceId).toBe('project:configured');
      expect(result.nextIsUserPick).toBe(false);
    });

    it('is rewritten to its namespaced form, keeping the mark, when the user picked it', () => {
      const rows = [projectRow('configured'), downloadedRow('WEB')];
      const result = resolveResourceSelection(rows, 'WEB', undefined, true);
      expect(result.selectedRow?.projectId).toBe('WEB');
      expect(result.nextSelectedResourceId).toBe('project:WEB');
      expect(result.nextIsUserPick).toBeUndefined();
      expect(result.isDownloadedFallback).toBe(false);
    });
  });

  describe('a downloaded selection saved without a user-pick mark', () => {
    // Saved layouts can hold a downloaded selection with no mark at all, and nothing distinguishes
    // the user's own pick from a fallback there, so both are treated as a fallback.
    it('gives way to a configured resource and records that the user did not pick it', () => {
      const rows = [projectRow('configured'), downloadedRow('WEB')];
      const result = resolveResourceSelection(rows, 'project:WEB', undefined);
      expect(result.selectedRow?.projectId).toBe('configured');
      expect(result.nextSelectedResourceId).toBe('project:configured');
      expect(result.nextIsUserPick).toBe(false);
      expect(result.isDownloadedFallback).toBe(false);
    });

    it('stays on screen but is not offered to navigation while nothing configured is displayable', () => {
      const result = resolveResourceSelection([downloadedRow('WEB')], 'project:WEB', undefined);
      expect(result.selectedRow?.projectId).toBe('WEB');
      expect(result.nextSelectedResourceId).toBeUndefined();
      expect(result.nextIsUserPick).toBeUndefined();
      expect(result.isDownloadedFallback).toBe(true);
    });
  });

  it('keeps a downloaded resource the user picked even when a configured resource is listed', () => {
    const rows = [projectRow('configured'), downloadedRow('WEB')];
    const result = resolveResourceSelection(rows, 'project:WEB', undefined, true);
    expect(result.selectedRow?.projectId).toBe('WEB');
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  it('shows a downloaded resource without persisting it when the selection has left the list', () => {
    const rows = [notInstalledRow('configured'), downloadedRow('WEB')];
    const result = resolveResourceSelection(rows, 'dbl:gone', undefined);
    expect(result.selectedRow?.projectId).toBe('WEB');
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  it('shows a displayable configured row while a pick is in flight over a superseded fallback', () => {
    // The first row has nothing to display, so showing it would spin until the pick lands.
    const rows = [notInstalledRow('uninstalled'), projectRow('configured'), downloadedRow('WEB')];
    const result = resolveResourceSelection(rows, 'project:WEB', 'dbl:not-here-yet', undefined);
    expect(result.selectedRow?.projectId).toBe('configured');
    expect(result.nextSelectedResourceId).toBeUndefined();
  });
});

describe('resolveResourceSelection — isDownloadedFallback', () => {
  it('flags a downloaded resource shown because nothing configured is displayable', () => {
    const result = resolveResourceSelection([downloadedRow('WEB')], undefined, undefined);
    expect(result.selectedRow?.projectId).toBe('WEB');
    expect(result.isDownloadedFallback).toBe(true);
  });

  it('flags a persisted downloaded selection the user did not pick', () => {
    const result = resolveResourceSelection([downloadedRow('WEB')], 'project:WEB', undefined);
    expect(result.isDownloadedFallback).toBe(true);
  });

  it('does not flag a downloaded resource the user picked', () => {
    const result = resolveResourceSelection([downloadedRow('WEB')], 'project:WEB', undefined, true);
    expect(result.isDownloadedFallback).toBe(false);
  });

  it('does not flag a pick of a downloaded resource as it commits', () => {
    const result = resolveResourceSelection([downloadedRow('WEB')], undefined, 'project:WEB');
    expect(result.isDownloadedFallback).toBe(false);
  });

  it('flags a downloaded row held while a pick is in flight when the user’s pick has left the list', () => {
    const rows = [notInstalledRow('uninstalled'), downloadedRow('WEB')];
    const result = resolveResourceSelection(rows, 'project:gone', 'dbl:not-here-yet', true);
    expect(result.selectedRow?.projectId).toBe('WEB');
    expect(result.isDownloadedFallback).toBe(true);
  });

  it('does not flag the user’s downloaded pick held while another pick is in flight', () => {
    const rows = [projectRow('configured'), downloadedRow('WEB')];
    const result = resolveResourceSelection(rows, 'project:WEB', 'dbl:not-here-yet', true);
    expect(result.selectedRow?.projectId).toBe('WEB');
    expect(result.isDownloadedFallback).toBe(false);
  });

  it('does not flag a configured resource the panel falls back to', () => {
    const rows = [projectRow('configured'), downloadedRow('WEB')];
    const result = resolveResourceSelection(rows, undefined, undefined);
    expect(result.selectedRow?.projectId).toBe('configured');
    expect(result.isDownloadedFallback).toBe(false);
  });
});
