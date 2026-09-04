import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import { reconcileInstalledFlags } from './installed-flags.util';

/** Minimal catalog row, defaulting to "not installed". */
function row(overrides: Partial<DblResourceData> & { dblEntryUid: string }): DblResourceData {
  return {
    displayName: overrides.dblEntryUid,
    fullName: overrides.dblEntryUid,
    bestLanguageName: '',
    type: 'ScriptureResource',
    size: 0,
    installed: false,
    updateAvailable: true,
    projectId: '',
    ...overrides,
  };
}

/**
 * TNCV is the resource this reconcile exists for: its installed project's id shares nothing with
 * its DBL entry uid, because a resource project's id is unrelated to the DBL entry it came from —
 * the entry uid is recorded in the project's settings instead. Ids observed from a real install.
 */
const TNCV_UID = '07ff1d5c6a53cb05';
const TNCV_PROJECT_ID = '9D60FD8F4A6E03BEE44C968CCD757F891A907346ABCDEFFF';

/** A resource (engWMB) whose project id happens to start with its DBL entry uid. */
const ENG_WMB_UID = 'f72b840c855f362c';
const ENG_WMB_PROJECT_ID = 'F72B840C855F362C88973C6C614090C46FCA1F11ABCDEFFF';

describe('reconcileInstalledFlags', () => {
  it('marks a resource installed when its project id shares no prefix with its DBL entry uid', () => {
    const { resources, isChanged } = reconcileInstalledFlags([row({ dblEntryUid: TNCV_UID })], {
      [TNCV_UID]: TNCV_PROJECT_ID,
    });

    expect(isChanged).toBe(true);
    expect(resources[0].installed).toBe(true);
    expect(resources[0].projectId).toBe(TNCV_PROJECT_ID);
  });

  it('marks a resource installed when its project id does start with its DBL entry uid', () => {
    const { resources } = reconcileInstalledFlags([row({ dblEntryUid: ENG_WMB_UID })], {
      [ENG_WMB_UID]: ENG_WMB_PROJECT_ID,
    });

    expect(resources[0].installed).toBe(true);
    expect(resources[0].projectId).toBe(ENG_WMB_PROJECT_ID);
  });

  it('clears installed state for a resource the backend reports as no longer installed', () => {
    const { resources, isChanged } = reconcileInstalledFlags(
      [row({ dblEntryUid: TNCV_UID, installed: true, projectId: TNCV_PROJECT_ID })],
      { [TNCV_UID]: '' },
    );

    expect(isChanged).toBe(true);
    expect(resources[0].installed).toBe(false);
    expect(resources[0].projectId).toBe('');
  });

  it('corrects a stale project id even when the installed flag is already right', () => {
    const { resources, isChanged } = reconcileInstalledFlags(
      [row({ dblEntryUid: TNCV_UID, installed: true, projectId: 'STALE-ID' })],
      { [TNCV_UID]: TNCV_PROJECT_ID },
    );

    expect(isChanged).toBe(true);
    expect(resources[0].projectId).toBe(TNCV_PROJECT_ID);
  });

  it('reports no change, and keeps the same objects, when every flag already agrees', () => {
    const resource = row({ dblEntryUid: TNCV_UID, installed: true, projectId: TNCV_PROJECT_ID });

    const { resources, isChanged } = reconcileInstalledFlags([resource], {
      [TNCV_UID]: TNCV_PROJECT_ID,
    });

    expect(isChanged).toBe(false);
    expect(resources[0]).toBe(resource);
  });

  it('leaves a resource untouched when the backend did not report on it', () => {
    const resource = row({ dblEntryUid: TNCV_UID, installed: true, projectId: TNCV_PROJECT_ID });

    const { resources, isChanged } = reconcileInstalledFlags([resource], {
      [ENG_WMB_UID]: ENG_WMB_PROJECT_ID,
    });

    expect(isChanged).toBe(false);
    expect(resources[0]).toBe(resource);
  });

  it('clears updateAvailable for a resource that just became installed', () => {
    const { resources } = reconcileInstalledFlags(
      [row({ dblEntryUid: TNCV_UID, updateAvailable: true })],
      { [TNCV_UID]: TNCV_PROJECT_ID },
    );

    expect(resources[0].updateAvailable).toBe(false);
  });

  it('keeps updateAvailable for an installed resource whose flags did not change', () => {
    const { resources } = reconcileInstalledFlags(
      [
        row({
          dblEntryUid: TNCV_UID,
          installed: true,
          projectId: TNCV_PROJECT_ID,
          updateAvailable: true,
        }),
      ],
      { [TNCV_UID]: TNCV_PROJECT_ID },
    );

    expect(resources[0].updateAvailable).toBe(true);
  });
});
