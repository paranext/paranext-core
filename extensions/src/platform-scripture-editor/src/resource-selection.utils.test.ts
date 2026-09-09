import { describe, expect, it } from 'vitest';
import type { PickerResource } from './downloaded-resources.utils';
import { matchesSelectedResourceId, resolveResourceSelection } from './resource-selection.utils';

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

describe('resolveResourceSelection', () => {
  it('commits a pick once its row arrives in the list', () => {
    const rows = [dblRow('old'), dblRow('new')];
    const result = resolveResourceSelection(rows, 'dbl:old', 'dbl:new', true);
    expect(result.nextSelectedResourceId).toBe('dbl:new');
    expect(result.shouldClearPending).toBe(true);
    expect(result.selectedRow?.projectId).toBe('proj-new');
  });

  it('commits a pick of a locally-installed non-DBL resource, which stores a project reference', () => {
    // `selectTextConnection` writes a ProjectReference for these, so the pending id must be
    // `project:<projectId>`. A bare DBL entry UID would never match and the pick would never land.
    const rows = [dblRow('old'), projectRow('VULGP83')];
    const result = resolveResourceSelection(rows, 'dbl:old', 'project:VULGP83', true);
    expect(result.nextSelectedResourceId).toBe('project:VULGP83');
    expect(result.shouldClearPending).toBe(true);
  });

  it('holds the selection still while a pick has not arrived yet', () => {
    const rows = [dblRow('old')];
    const result = resolveResourceSelection(rows, 'dbl:old', 'dbl:not-here-yet', true);
    expect(result.nextSelectedResourceId).toBeUndefined();
    expect(result.shouldClearPending).toBe(false);
  });

  it('does not auto-correct away a selection that has left the list while a pick is in flight', () => {
    // Without this the pick is overwritten by the fallback before its row lands.
    const rows = [dblRow('other')];
    const result = resolveResourceSelection(rows, 'dbl:gone', 'dbl:not-here-yet', true);
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  it('rewrites a legacy bare id to its namespaced form without changing which row is selected', () => {
    const rows = [dblRow('first'), dblRow('abc')];
    const result = resolveResourceSelection(rows, 'abc', undefined, true);
    expect(result.nextSelectedResourceId).toBe('dbl:abc');
    expect(result.selectedRow?.reference).toMatchObject({ id: 'abc' });
  });

  it('leaves an already-namespaced selection alone', () => {
    const rows = [dblRow('abc')];
    const result = resolveResourceSelection(rows, 'dbl:abc', undefined, true);
    expect(result.nextSelectedResourceId).toBeUndefined();
    expect(result.selectedRow?.reference).toMatchObject({ id: 'abc' });
  });

  it('falls back to the first displayable row when the selection has left the list', () => {
    const rows = [dblRow('a'), dblRow('b')];
    const result = resolveResourceSelection(rows, 'dbl:gone', undefined, true);
    expect(result.nextSelectedResourceId).toBe('dbl:a');
  });

  it('skips rows with nothing to display when falling back', () => {
    // A row with no `projectId` has no content to fetch, so selecting it would spin forever.
    const rows = [notInstalledRow('uninstalled'), dblRow('installed')];
    const result = resolveResourceSelection(rows, 'dbl:gone', undefined, true);
    expect(result.nextSelectedResourceId).toBe('dbl:installed');
  });

  it('persists nothing when no row is displayable', () => {
    const rows = [notInstalledRow('uninstalled')];
    const result = resolveResourceSelection(rows, 'dbl:gone', undefined, true);
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  it('selects nothing when the list is empty', () => {
    const result = resolveResourceSelection([], 'dbl:abc', undefined, true);
    expect(result.selectedRow).toBeUndefined();
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  describe('while the sources the rows are filtered against are still arriving', () => {
    it('persists no fallback over a selection that has not arrived yet', () => {
      // PT-4470: the rows are filtered against the DBL catalog, so a configured resource whose
      // catalog entry has not landed is simply absent. Auto-correcting on that absence overwrites
      // the user's pick with the first row, and the pick does not come back once the catalog
      // completes — it has already been persisted away.
      const rows = [dblRow('a'), dblRow('b')];
      const result = resolveResourceSelection(rows, 'dbl:not-arrived-yet', undefined, false);
      expect(result.nextSelectedResourceId).toBeUndefined();
    });

    it('displays no row rather than one the user did not choose', () => {
      // The rendered resource and the persisted `selectedResourceId` must agree, or the dropdown's
      // checkmark sits on a row nobody picked.
      const rows = [dblRow('a'), dblRow('b')];
      const result = resolveResourceSelection(rows, 'dbl:not-arrived-yet', undefined, false);
      expect(result.selectedRow).toBeUndefined();
    });

    it('still displays a selection whose row IS present', () => {
      // Gating suppresses auto-correct, not selection: a positive match is an answer whether or not
      // the remaining sources have settled.
      const rows = [dblRow('a'), dblRow('b')];
      const result = resolveResourceSelection(rows, 'dbl:b', undefined, false);
      expect(result.selectedRow?.projectId).toBe('proj-b');
      expect(result.nextSelectedResourceId).toBeUndefined();
    });

    it('still commits a pick that has arrived', () => {
      // A pick is the user's own action against a row already in hand; waiting on unrelated sources
      // would leave the picked resource unselected.
      const rows = [dblRow('old'), dblRow('new')];
      const result = resolveResourceSelection(rows, 'dbl:old', 'dbl:new', false);
      expect(result.nextSelectedResourceId).toBe('dbl:new');
      expect(result.shouldClearPending).toBe(true);
    });

    it('keeps the pick once the catalog completes and its row appears', () => {
      // The whole point, end to end: the selection survives the catalog going from partial to
      // complete, rather than having been reset while it was incomplete.
      const partialRows = [dblRow('a')];
      const duringFetch = resolveResourceSelection(partialRows, 'dbl:late', undefined, false);
      expect(duringFetch.nextSelectedResourceId).toBeUndefined();

      const completeRows = [dblRow('a'), dblRow('late')];
      const afterFetch = resolveResourceSelection(completeRows, 'dbl:late', undefined, true);
      expect(afterFetch.selectedRow?.projectId).toBe('proj-late');
    });
  });
});
