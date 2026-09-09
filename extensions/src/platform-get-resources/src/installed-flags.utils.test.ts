import { describe, expect, it } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import { hasResourceProject, reconcileInstalledFlags } from './installed-flags.utils';

function resource(overrides: Partial<DblResourceData> = {}): DblResourceData {
  return {
    dblEntryUid: 'aabbccdd',
    displayName: 'GNTD',
    fullName: 'Good News Translation',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1200,
    installed: false,
    updateAvailable: false,
    projectId: '',
    ...overrides,
  };
}

/** An editable (non-resource) project — what a project list holds before the C# factory registers. */
const EDITABLE_PROJECT = { id: 'editable-web', isEditable: true };
/** A read-only project — only present once the C# factory has registered its projects. */
const RESOURCE_PROJECT = { id: 'AABBCCDD1122', isEditable: false };

describe('hasResourceProject', () => {
  it('is false for an empty list and for a list of editable projects only', () => {
    expect(hasResourceProject([])).toBe(false);
    expect(hasResourceProject([EDITABLE_PROJECT])).toBe(false);
  });

  it('is true once a read-only project is present', () => {
    expect(hasResourceProject([EDITABLE_PROJECT, RESOURCE_PROJECT])).toBe(true);
  });
});

describe('reconcileInstalledFlags', () => {
  it('marks a row installed when a local project id starts with its dbl entry uid', () => {
    const reconciled = reconcileInstalledFlags([resource()], [RESOURCE_PROJECT]);

    expect(reconciled).toEqual([
      resource({ installed: true, projectId: 'AABBCCDD1122', updateAvailable: false }),
    ]);
  });

  it('matches on projectId when the row has one', () => {
    const row = resource({ installed: false, projectId: 'AABBCCDD1122' });

    expect(reconcileInstalledFlags([row], [RESOURCE_PROJECT])).toEqual([
      resource({ installed: true, projectId: 'AABBCCDD1122' }),
    ]);
  });

  it('marks a row not installed when its project is gone from a settled list', () => {
    // The list is trustworthy — it contains a resource project — so an uninstalled resource that is
    // no longer in it really is gone, and the flag has to come back down.
    const uninstalled = resource({
      dblEntryUid: 'ffffffff',
      installed: true,
      projectId: 'FFFFFFFF9999',
    });

    expect(reconcileInstalledFlags([uninstalled], [RESOURCE_PROJECT])).toEqual([
      resource({ dblEntryUid: 'ffffffff', installed: false, projectId: '' }),
    ]);
  });

  it('returns undefined when the flags already agree with the project list', () => {
    const row = resource({ installed: true, projectId: 'AABBCCDD1122' });

    expect(reconcileInstalledFlags([row], [RESOURCE_PROJECT])).toBeUndefined();
  });

  it('does not downgrade an installed row from a project list with no resource projects', () => {
    // The regression this guards: the C# project factory registers its projects after activation,
    // so an early read returns only editable projects. Trusting it marks every installed resource
    // not-installed — and the caller persists that, which is what later makes a panel try to
    // install a resource it already has on disk.
    const installed = resource({ installed: true, projectId: 'AABBCCDD1122' });

    expect(reconcileInstalledFlags([installed], [EDITABLE_PROJECT])).toBeUndefined();
    expect(reconcileInstalledFlags([installed], [])).toBeUndefined();
  });

  it('never matches a row with an empty dbl entry uid and no project id', () => {
    // `''.startsWith('')` is true for every string, so an unguarded prefix match would claim the
    // first project in the list.
    const row = resource({ dblEntryUid: '', projectId: '' });

    expect(reconcileInstalledFlags([row], [RESOURCE_PROJECT])).toBeUndefined();
  });

  it('leaves rows that already agree untouched while changing the ones that do not', () => {
    const agreeing = resource({ dblEntryUid: '11112222', installed: false });
    const changing = resource({ dblEntryUid: 'aabbccdd', installed: false });

    const reconciled = reconcileInstalledFlags([agreeing, changing], [RESOURCE_PROJECT]);

    expect(reconciled?.[0]).toBe(agreeing);
    expect(reconciled?.[1]).toEqual(
      resource({ dblEntryUid: 'aabbccdd', installed: true, projectId: 'AABBCCDD1122' }),
    );
  });
});
