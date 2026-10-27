import { describe, expect, it } from 'vitest';
import type { EffectiveResourceReference } from 'platform-scripture';
import { buildPickerResources, type PickerResource } from './downloaded-resources.utils';
import {
  findSelectedRow,
  isTeamPickerResource,
  matchesSelectedResourceId,
  resolveResourceSelection,
  splitPickerResourcesBySource,
  type ResourceSelectionInputs,
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

/** A configured DBL resource that is installed, the kind that can replace a fallback. */
const configuredRow = (id: string): PickerResource => ({ ...dblRow(id), source: 'admin' });

/** Calls the resolver with a complete list and no pick, pending pick, or held fallback by default. */
const resolve = (rows: PickerResource[], inputs: Partial<ResourceSelectionInputs> = {}) =>
  resolveResourceSelection(rows, {
    selectedResourceId: undefined,
    userPickedResourceId: undefined,
    pendingResourceId: undefined,
    heldFallbackRowId: undefined,
    isListComplete: true,
    ...inputs,
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
    expect(resolve(rows, { selectedResourceId: 'project:proj-abc' }).selectedRow).toBe(rows[1]);
  });

  it('never falls back to a row that shows nothing', () => {
    expect(findSelectedRow([notInstalledRow('abc')], 'project:proj-abc')).toBeUndefined();
  });
});

describe('resolveResourceSelection', () => {
  it('commits a pick once its row arrives in the list, recording it as the user’s pick', () => {
    const rows = [dblRow('old'), dblRow('new')];
    const result = resolve(rows, { selectedResourceId: 'dbl:old', pendingResourceId: 'dbl:new' });
    expect(result.nextSelectedResourceId).toBe('dbl:new');
    expect(result.nextUserPickedResourceId).toBe('dbl:new');
    expect(result.shouldClearPending).toBe(true);
    expect(result.selectedRow?.projectId).toBe('proj-new');
  });

  it('commits a pick of a locally-installed non-DBL resource, which stores a project reference', () => {
    // `selectTextConnection` writes a ProjectReference for these, so the pending id must be
    // `project:<projectId>`. A bare DBL entry UID would never match and the pick would never land.
    const rows = [dblRow('old'), projectRow('VULGP83')];
    const result = resolve(rows, {
      selectedResourceId: 'dbl:old',
      pendingResourceId: 'project:VULGP83',
    });
    expect(result.nextSelectedResourceId).toBe('project:VULGP83');
    expect(result.shouldClearPending).toBe(true);
  });

  it('holds the selection still while a pick has not arrived yet', () => {
    const result = resolve([dblRow('old')], {
      selectedResourceId: 'dbl:old',
      pendingResourceId: 'dbl:not-here-yet',
    });
    expect(result.nextSelectedResourceId).toBeUndefined();
    expect(result.shouldClearPending).toBe(false);
  });

  it('does not auto-correct away a selection that has left the list while a pick is in flight', () => {
    // Without this the pick is overwritten by the fallback before its row lands.
    const result = resolve([dblRow('other')], {
      selectedResourceId: 'dbl:gone',
      pendingResourceId: 'dbl:not-here-yet',
    });
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  it('rewrites a legacy bare id to its namespaced form without changing which row is selected', () => {
    const rows = [dblRow('first'), dblRow('abc')];
    const result = resolve(rows, { selectedResourceId: 'abc' });
    expect(result.nextSelectedResourceId).toBe('dbl:abc');
    expect(result.nextUserPickedResourceId).toBeUndefined();
    expect(result.selectedRow?.reference).toMatchObject({ id: 'abc' });
  });

  it('keeps a project selection on its resource when the row becomes a DBL row', () => {
    const rows = [dblRow('first'), dblRow('abc')];
    expect(resolve(rows, { selectedResourceId: 'project:proj-abc' })).toEqual({
      nextSelectedResourceId: 'dbl:abc',
      nextUserPickedResourceId: undefined,
      shouldClearPending: false,
      selectedRow: rows[1],
      shownFallbackRowId: undefined,
    });
  });

  it('rewrites the user’s pick along with the selection when the selection’s id is rewritten', () => {
    // Opened from Home by its project while the catalog loaded; the catalog now names it a DBL row.
    const rows = [dblRow('first'), dblRow('abc')];
    const result = resolve(rows, {
      selectedResourceId: 'project:proj-abc',
      userPickedResourceId: 'project:proj-abc',
    });
    expect(result.nextSelectedResourceId).toBe('dbl:abc');
    expect(result.nextUserPickedResourceId).toBe('dbl:abc');
  });

  it('leaves an already-namespaced selection alone', () => {
    const result = resolve([dblRow('abc')], { selectedResourceId: 'dbl:abc' });
    expect(result.nextSelectedResourceId).toBeUndefined();
    expect(result.selectedRow?.reference).toMatchObject({ id: 'abc' });
  });

  it('falls back to the first displayable row when the selection has left the list', () => {
    const result = resolve([dblRow('a'), dblRow('b')], { selectedResourceId: 'dbl:gone' });
    expect(result.nextSelectedResourceId).toBe('dbl:a');
    // A fallback the panel saves is not the user's pick, and the mark stays on the id it names.
    expect(result.nextUserPickedResourceId).toBeUndefined();
  });

  it('skips rows with nothing to display when falling back to a configured row', () => {
    const rows = [notInstalledRow('uninstalled'), dblRow('installed')];
    const result = resolve(rows, { selectedResourceId: 'dbl:gone' });
    expect(result.nextSelectedResourceId).toBe('dbl:installed');
  });

  it('persists nothing when no row is displayable', () => {
    const result = resolve([notInstalledRow('uninstalled')], { selectedResourceId: 'dbl:gone' });
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  it('selects nothing when the list is empty', () => {
    const result = resolve([], { selectedResourceId: 'dbl:abc' });
    expect(result.selectedRow).toBeUndefined();
    expect(result.nextSelectedResourceId).toBeUndefined();
  });

  describe('a downloaded fallback', () => {
    it('is shown without being persisted when nothing configured is in the list', () => {
      // Persisting it would keep the panel on it after a configured resource arrives.
      const result = resolve([downloadedRow('WEB')]);
      expect(result.selectedRow?.projectId).toBe('WEB');
      expect(result.nextSelectedResourceId).toBeUndefined();
      expect(result.shownFallbackRowId).toBe('project:WEB');
    });

    it('is shown without being persisted when the selection has left the list', () => {
      const result = resolve([downloadedRow('WEB')], { selectedResourceId: 'dbl:gone' });
      expect(result.selectedRow?.projectId).toBe('WEB');
      expect(result.nextSelectedResourceId).toBeUndefined();
    });

    it('stays put when a resource that sorts before it is installed', () => {
      // Downloaded rows arrive in short-name order, so a new install can land ahead of it.
      const result = resolve([downloadedRow('ASV'), downloadedRow('WEB')], {
        heldFallbackRowId: 'project:WEB',
      });
      expect(result.selectedRow?.projectId).toBe('WEB');
      expect(result.shownFallbackRowId).toBe('project:WEB');
    });

    it('moves on when the resource it held is no longer listed', () => {
      const result = resolve([downloadedRow('ASV')], { heldFallbackRowId: 'project:WEB' });
      expect(result.selectedRow?.projectId).toBe('ASV');
    });

    it('gives way to a configured resource as soon as one is displayable, persisting it', () => {
      const rows = [configuredRow('ESV'), downloadedRow('WEB')];
      const result = resolve(rows, { heldFallbackRowId: 'project:WEB' });
      expect(result.selectedRow?.projectId).toBe('proj-ESV');
      expect(result.nextSelectedResourceId).toBe('dbl:ESV');
      expect(result.shownFallbackRowId).toBeUndefined();
    });

    it('gives way to a configured resource that is not installed yet, so it gets installed', () => {
      // Shown, it is what the panel auto-installs; once installed, the branch above persists it.
      const rows = [notInstalledRow('team-text'), downloadedRow('WEB')];
      const result = resolve(rows, { heldFallbackRowId: 'project:WEB' });
      expect(result.selectedRow?.reference).toMatchObject({ id: 'team-text' });
      expect(result.nextSelectedResourceId).toBeUndefined();
      expect(result.shownFallbackRowId).toBeUndefined();
    });

    it('is held while a pick is in flight and nothing configured is displayable', () => {
      const rows = [downloadedRow('ASV'), downloadedRow('WEB')];
      const result = resolve(rows, {
        selectedResourceId: 'project:gone',
        pendingResourceId: 'dbl:not-here-yet',
        heldFallbackRowId: 'project:WEB',
      });
      expect(result.selectedRow?.projectId).toBe('WEB');
      expect(result.nextSelectedResourceId).toBeUndefined();
    });
  });

  describe('a saved downloaded selection', () => {
    it('is kept when it is the user’s pick, even with a configured resource listed', () => {
      const rows = [configuredRow('ESV'), downloadedRow('WEB')];
      const result = resolve(rows, {
        selectedResourceId: 'project:WEB',
        userPickedResourceId: 'project:WEB',
      });
      expect(result.selectedRow?.projectId).toBe('WEB');
      expect(result.nextSelectedResourceId).toBeUndefined();
    });

    it('is kept when it is the user’s pick saved as a legacy bare id', () => {
      const rows = [configuredRow('ESV'), downloadedRow('WEB')];
      const result = resolve(rows, { selectedResourceId: 'WEB', userPickedResourceId: 'WEB' });
      expect(result.selectedRow?.projectId).toBe('WEB');
      expect(result.nextSelectedResourceId).toBe('project:WEB');
      expect(result.nextUserPickedResourceId).toBe('project:WEB');
    });

    // Saved layouts can hold a downloaded selection with no user's pick at all, and nothing there
    // distinguishes the user's own pick from a fallback the panel saved.
    describe('that is not the user’s pick', () => {
      it('gives way to an installed configured DBL resource', () => {
        const rows = [configuredRow('ESV'), downloadedRow('WEB')];
        const result = resolve(rows, { selectedResourceId: 'project:WEB' });
        expect(result.selectedRow?.projectId).toBe('proj-ESV');
        expect(result.nextSelectedResourceId).toBe('dbl:ESV');
        expect(result.nextUserPickedResourceId).toBeUndefined();
      });

      it('gives way when saved as a legacy bare id', () => {
        const rows = [configuredRow('ESV'), downloadedRow('WEB')];
        const result = resolve(rows, { selectedResourceId: 'WEB' });
        expect(result.nextSelectedResourceId).toBe('dbl:ESV');
      });

      it('gives way when the user’s pick names some other resource', () => {
        const rows = [configuredRow('ESV'), downloadedRow('WEB')];
        const result = resolve(rows, {
          selectedResourceId: 'project:WEB',
          userPickedResourceId: 'dbl:older-pick',
        });
        expect(result.nextSelectedResourceId).toBe('dbl:ESV');
      });

      it('is kept while the user’s own list is unreadable', () => {
        // The resource may be in the user's list, listed as downloaded only because that list is
        // missing for now; replacing it would be saved for good.
        const rows = [configuredRow('ESV'), downloadedRow('WEB')];
        const result = resolve(rows, { selectedResourceId: 'project:WEB', isListComplete: false });
        expect(result.selectedRow?.projectId).toBe('WEB');
        expect(result.nextSelectedResourceId).toBeUndefined();
      });

      it('is kept when the configured resource is a project reference', () => {
        // TODO(PT-4896): a project reference counts as displayable even when its project is not on
        // this machine, so it would replace a working text with a blank editor.
        const rows = [{ ...projectRow('BT'), source: 'admin' as const }, downloadedRow('WEB')];
        const result = resolve(rows, { selectedResourceId: 'project:WEB' });
        expect(result.selectedRow?.projectId).toBe('WEB');
        expect(result.nextSelectedResourceId).toBeUndefined();
      });

      it('gives way to the DBL resource, not a project reference listed ahead of it', () => {
        const rows = [
          { ...projectRow('BT'), source: 'admin' as const },
          configuredRow('ESV'),
          downloadedRow('WEB'),
        ];
        const result = resolve(rows, { selectedResourceId: 'project:WEB' });
        expect(result.selectedRow?.projectId).toBe('proj-ESV');
        expect(result.nextSelectedResourceId).toBe('dbl:ESV');
      });

      it('is kept while the configured resource is not installed', () => {
        const rows = [notInstalledRow('team-text'), downloadedRow('WEB')];
        const result = resolve(rows, { selectedResourceId: 'project:WEB' });
        expect(result.selectedRow?.projectId).toBe('WEB');
        expect(result.nextSelectedResourceId).toBeUndefined();
      });

      it('is kept while nothing configured is listed', () => {
        const result = resolve([downloadedRow('WEB')], { selectedResourceId: 'project:WEB' });
        expect(result.selectedRow?.projectId).toBe('WEB');
        expect(result.nextSelectedResourceId).toBeUndefined();
        expect(result.shownFallbackRowId).toBeUndefined();
      });

      it('gives way to a displayable configured row while a pick is in flight', () => {
        // The first row has nothing to display, so showing it would spin until the pick lands.
        const rows = [notInstalledRow('uninstalled'), configuredRow('ESV'), downloadedRow('WEB')];
        const result = resolve(rows, {
          selectedResourceId: 'project:WEB',
          pendingResourceId: 'dbl:not-here-yet',
        });
        expect(result.selectedRow?.projectId).toBe('proj-ESV');
        expect(result.nextSelectedResourceId).toBeUndefined();
      });

      it('gives way to the DBL resource while a pick is in flight, not a project reference ahead of it', () => {
        const rows = [
          { ...projectRow('BT'), source: 'admin' as const },
          configuredRow('ESV'),
          downloadedRow('WEB'),
        ];
        const result = resolve(rows, {
          selectedResourceId: 'project:WEB',
          pendingResourceId: 'dbl:not-here-yet',
        });
        expect(result.selectedRow?.projectId).toBe('proj-ESV');
        expect(result.nextSelectedResourceId).toBeUndefined();
      });
    });
  });

  describe('while the user’s own list is unreadable', () => {
    it('shows a configured row in place of a selection that has left the list, without saving it', () => {
      // The selection is probably in the user's list, which is missing for now.
      const result = resolve([configuredRow('ESV')], {
        selectedResourceId: 'dbl:personal',
        isListComplete: false,
      });
      expect(result.selectedRow?.projectId).toBe('proj-ESV');
      expect(result.nextSelectedResourceId).toBeUndefined();
    });

    it('still commits a pick and rewrites a legacy bare id', () => {
      expect(
        resolve([dblRow('new')], { pendingResourceId: 'dbl:new', isListComplete: false })
          .nextSelectedResourceId,
      ).toBe('dbl:new');
      expect(
        resolve([dblRow('abc')], { selectedResourceId: 'abc', isListComplete: false })
          .nextSelectedResourceId,
      ).toBe('dbl:abc');
    });
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
