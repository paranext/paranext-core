import type { EffectiveResourceReference, ResourceReference } from 'platform-scripture';
import type { DblResourceData, ResourceType } from 'platform-bible-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@papi/frontend', () => ({ default: {}, logger: { warn: vi.fn() } }));

// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import { buildPickerResources, type DownloadedResource } from './downloaded-resources.utils';
// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import { getResourceReferenceRowId, isSameResource } from './resource-reference.utils';
// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import { findSelectedRow, resolveResourceSelection } from './resource-selection.utils';
// vi.mock must appear before the imports it mocks so Vitest can hoist it; eslint's import/first
// rule cannot model this Vitest-specific hoisting requirement.
// eslint-disable-next-line import/first
import { toResourceReference } from './select-dbl-resource';

/*
 * `showResourceInReferencePanel` (extension host) picks the row the panel should select, and the
 * panel (web view) builds its rows on its own. Nothing ties the two together but this: the row id
 * the command queues must be the id of the row the panel lists for that resource, or the panel
 * falls back to its first row and shows a different text than the one the user opened.
 */

const ENTRY: DblResourceData = {
  dblEntryUid: 'UID-BYZ',
  displayName: 'BYZ',
  fullName: 'Byzantine Text',
  bestLanguageName: 'Greek',
  type: 'ScriptureResource',
  size: 100,
  installed: true,
  updateAvailable: false,
  projectId: 'byz-project',
};

const OTHER: DownloadedResource = { projectId: 'other', name: 'OTHER', language: 'en' };

/** The row the panel shows when the command queued `entry`'s reference. */
function selectedProjectId(
  entry: DblResourceData,
  userItems: EffectiveResourceReference[],
  panelType: ResourceType,
  queuedReference: ResourceReference = toResourceReference(entry),
): string | undefined {
  const rows = buildPickerResources(
    userItems,
    [OTHER, { projectId: entry.projectId, name: entry.displayName, language: 'grc' }],
    [entry],
  ).filter((row) => row.type === panelType);
  const queued = getResourceReferenceRowId(queuedReference);
  // Matched, not fallen back to: a fallback picks the first row, which could be this one by luck.
  if (!findSelectedRow(rows, queued)) return undefined;
  return resolveResourceSelection(rows, queued, undefined).selectedRow?.projectId;
}

describe('the selection queued for a resource is a row its panel lists', () => {
  it('for a DBL resource saved to the personal list', () => {
    const saved = { ...toResourceReference(ENTRY), source: 'user' as const };
    expect(selectedProjectId(ENTRY, [saved], 'ScriptureResource')).toBe('byz-project');
  });

  it('for a DBL resource whose save failed, listed among the downloaded resources', () => {
    expect(selectedProjectId(ENTRY, [], 'ScriptureResource')).toBe('byz-project');
  });

  it('for a DBL resource the team list holds with its uid in other casing', () => {
    const teamCopy = {
      type: 'dblResource' as const,
      name: 'BYZ',
      id: 'uid-byz',
      source: 'admin' as const,
    };
    // The command selects the team's copy, as found by `isSameResource`.
    expect(isSameResource(teamCopy, toResourceReference(ENTRY))).toBe(true);
    expect(selectedProjectId(ENTRY, [teamCopy], 'ScriptureResource', teamCopy)).toBe('byz-project');
  });

  it('for a DBL resource selected by its project before the catalog had loaded', () => {
    // The command could only name it by its project; the panel's rows now come from the catalog.
    const byProject = { type: 'project' as const, name: 'BYZ', id: 'byz-project' };
    expect(selectedProjectId(ENTRY, [], 'ScriptureResource', byProject)).toBe('byz-project');
  });

  it('for a locally-installed non-DBL resource', () => {
    const local = {
      ...ENTRY,
      dblEntryUid: 'VULGP83',
      projectId: 'VULGP83',
      displayName: 'VULGP83',
    };
    expect(selectedProjectId(local, [], 'ScriptureResource')).toBe('VULGP83');
  });

  it('for a downloaded resource the catalog does not have', () => {
    // The command names it by its project, as the panel lists a download with no catalog row.
    const rows = buildPickerResources(
      [],
      [OTHER, { projectId: 'local-1', name: 'LOCAL', language: 'en' }],
      [],
    ).filter((row) => row.type === 'ScriptureResource');
    const queued = getResourceReferenceRowId({ type: 'project', name: 'LOCAL', id: 'local-1' });
    expect(findSelectedRow(rows, queued)?.projectId).toBe('local-1');
  });

  it('for a commentary, in the Commentaries panel', () => {
    const commentary = { ...ENTRY, type: 'CommentaryResource' as const };
    expect(selectedProjectId(commentary, [], 'CommentaryResource')).toBe('byz-project');
  });
});
