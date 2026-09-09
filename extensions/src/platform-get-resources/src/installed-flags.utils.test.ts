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

/** The project list has settled, so a project missing from it really is missing. */
const SETTLED = true;
/** Registration may still be in progress, so absence proves nothing. */
const STILL_REGISTERING = false;

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
    const reconciled = reconcileInstalledFlags([resource()], [RESOURCE_PROJECT], SETTLED);

    expect(reconciled).toEqual([
      resource({ installed: true, projectId: 'AABBCCDD1122', updateAvailable: false }),
    ]);
  });

  it('matches on projectId when the row has one', () => {
    const row = resource({ installed: false, projectId: 'AABBCCDD1122' });

    expect(reconcileInstalledFlags([row], [RESOURCE_PROJECT], SETTLED)).toEqual([
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

    expect(reconcileInstalledFlags([uninstalled], [RESOURCE_PROJECT], SETTLED)).toEqual([
      resource({ dblEntryUid: 'ffffffff', installed: false, projectId: '' }),
    ]);
  });

  it('returns undefined when the flags already agree with the project list', () => {
    const row = resource({ installed: true, projectId: 'AABBCCDD1122' });

    expect(reconcileInstalledFlags([row], [RESOURCE_PROJECT], SETTLED)).toBeUndefined();
  });

  it('does not downgrade an installed row from a project list with no resource projects', () => {
    // The regression this guards: the C# project factory registers its projects after activation,
    // so an early read returns only editable projects. Trusting it marks every installed resource
    // not-installed — and the caller persists that, which is what later makes a panel try to
    // install a resource it already has on disk.
    const installed = resource({ installed: true, projectId: 'AABBCCDD1122' });

    expect(reconcileInstalledFlags([installed], [EDITABLE_PROJECT], SETTLED)).toBeUndefined();
    expect(reconcileInstalledFlags([installed], [], SETTLED)).toBeUndefined();
  });

  it('does not downgrade a row while registration may still be in progress', () => {
    // The regression this guards: a catalog whose flags C# read live, reconciled against a project
    // list that has registered one resource of many. Every unmatched row would be rewritten to
    // not-installed and persisted — manufacturing the stale flag the whole mechanism exists around.
    const authoritative = [
      resource({ dblEntryUid: 'aabbccdd', installed: true, projectId: 'AABBCCDD1122' }),
      resource({ dblEntryUid: 'ffffffff', installed: true, projectId: 'FFFFFFFF9999' }),
    ];

    // Only the first project has registered so far.
    expect(reconcileInstalledFlags(authoritative, [RESOURCE_PROJECT], STILL_REGISTERING)).toBe(
      undefined,
    );
    // Once the list is settled the absent one is genuinely gone, and the downgrade lands.
    const settled = reconcileInstalledFlags(authoritative, [RESOURCE_PROJECT], SETTLED);
    expect(settled?.[0]).toBe(authoritative[0]);
    expect(settled?.[1]).toMatchObject({ installed: false, projectId: '' });
  });

  it('still marks a row installed while registration is in progress', () => {
    // Presence is trustworthy whenever it appears: the project is there, so the resource is on
    // disk. Only absence has to wait, so a poisoned flag is corrected at the first opportunity.
    const stale = resource({ dblEntryUid: 'aabbccdd', installed: false });

    expect(reconcileInstalledFlags([stale], [RESOURCE_PROJECT], STILL_REGISTERING)).toEqual([
      resource({ installed: true, projectId: 'AABBCCDD1122' }),
    ]);
  });

  it('never matches a row with an empty dbl entry uid and no project id', () => {
    // `''.startsWith('')` is true for every string, so an unguarded prefix match would claim the
    // first project in the list.
    const row = resource({ dblEntryUid: '', projectId: '' });

    expect(reconcileInstalledFlags([row], [RESOURCE_PROJECT], SETTLED)).toBeUndefined();
  });

  it('leaves rows that already agree untouched while changing the ones that do not', () => {
    const agreeing = resource({ dblEntryUid: '11112222', installed: false });
    const changing = resource({ dblEntryUid: 'aabbccdd', installed: false });

    const reconciled = reconcileInstalledFlags([agreeing, changing], [RESOURCE_PROJECT], SETTLED);

    expect(reconciled?.[0]).toBe(agreeing);
    expect(reconciled?.[1]).toEqual(
      resource({ dblEntryUid: 'aabbccdd', installed: true, projectId: 'AABBCCDD1122' }),
    );
  });
});
