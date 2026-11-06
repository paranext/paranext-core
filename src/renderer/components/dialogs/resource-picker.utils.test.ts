import { describe, expect, it } from 'vitest';
import { DblResourceData } from 'platform-bible-utils';
import {
  buildResourcePickerNotice,
  collectFetchedResources,
  ResourceFetchResult,
  toDblFetchResult,
  toLocalFetchResult,
} from './resource-picker.utils';

const RESOURCE: DblResourceData = {
  dblEntryUid: 'dbl-1',
  displayName: 'NIV',
  fullName: 'New International Version',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1_000_000,
  installed: false,
  updateAvailable: false,
  projectId: 'prj-1',
};

const LOCAL_RESOURCE: DblResourceData = { ...RESOURCE, dblEntryUid: 'prj-2', projectId: 'prj-2' };

const FAILED: ResourceFetchResult = { didFetchSucceed: false };
const FOUND_NOTHING: ResourceFetchResult = { didFetchSucceed: true, resources: [] };
const FOUND_ONE: ResourceFetchResult = { didFetchSucceed: true, resources: [LOCAL_RESOURCE] };

const STRINGS = {
  '%resourcePicker_notice_downloadsUnavailable%': 'Downloads unavailable here',
  '%resourcePicker_notice_dblCatalogUnavailable%': 'Library unreachable',
  '%resourcePicker_notice_localResourcesUnavailable%': 'Local scan failed',
};

describe('buildResourcePickerNotice', () => {
  it('gives no notice while either fetch is still pending', () => {
    expect(buildResourcePickerNotice(undefined, undefined, STRINGS)).toBeUndefined();
    expect(buildResourcePickerNotice(FAILED, undefined, STRINGS)).toBeUndefined();
    expect(buildResourcePickerNotice(undefined, FAILED, STRINGS)).toBeUndefined();
  });

  it('gives no notice when both fetches succeeded', () => {
    expect(buildResourcePickerNotice(FOUND_ONE, FOUND_ONE, STRINGS)).toBeUndefined();
    expect(buildResourcePickerNotice(FOUND_NOTHING, FOUND_NOTHING, STRINGS)).toBeUndefined();
  });

  it('says only local resources are listed when the catalog failed but local ones were found', () => {
    expect(buildResourcePickerNotice(FAILED, FOUND_ONE, STRINGS)).toBe('Library unreachable');
  });

  // Saying "only resources already on this computer are shown" above an empty list describes a
  // partial list the user cannot see. With nothing to show at all, the picker's own body state says
  // so and offers the retry, and a notice here would be a second voice on the same emptiness.
  it('leaves an entirely empty list to the body state rather than adding a notice', () => {
    expect(buildResourcePickerNotice(FAILED, FOUND_NOTHING, STRINGS)).toBeUndefined();
  });

  it('adds no notice when both fetches failed', () => {
    expect(buildResourcePickerNotice(FAILED, FAILED, STRINGS)).toBeUndefined();
  });

  // An installation with no DBL credentials is not having a bad day. "Right now" would promise a
  // recovery that is never coming.
  it('says downloads are unavailable, not that the library is unreachable, for a permanent answer', () => {
    const notConfigured = toDblFetchResult({ status: 'unavailable', reason: 'notConfigured' });

    expect(buildResourcePickerNotice(notConfigured, FOUND_ONE, STRINGS)).toBe(
      'Downloads unavailable here',
    );
  });

  it('explains the local resources are missing when only the local fetch failed', () => {
    expect(buildResourcePickerNotice(FOUND_ONE, FAILED, STRINGS)).toBe('Local scan failed');
  });

  it('passes a caller-supplied notice through on its own', () => {
    expect(buildResourcePickerNotice(FOUND_ONE, FOUND_ONE, STRINGS, 'No project is open.')).toBe(
      'No project is open.',
    );
  });

  it('shows the caller-supplied notice before the fetch-failure notice', () => {
    expect(buildResourcePickerNotice(FAILED, FOUND_ONE, STRINGS, 'No project is open.')).toBe(
      'No project is open. Library unreachable',
    );
  });

  it('shows nothing rather than a raw key when the localization service has no translation', () => {
    // The service echoes the key back when it has no translation, so both the missing-key and the
    // echoed-key cases must be recognized or the notice renders as literal `%key%` text.
    expect(buildResourcePickerNotice(FAILED, FOUND_ONE, {})).toBeUndefined();
    expect(
      buildResourcePickerNotice(FAILED, FOUND_ONE, {
        '%resourcePicker_notice_dblCatalogUnavailable%':
          '%resourcePicker_notice_dblCatalogUnavailable%',
      }),
    ).toBeUndefined();
  });

  it('still shows the caller notice when the fetch notice has no translation', () => {
    expect(buildResourcePickerNotice(FAILED, FOUND_ONE, {}, 'No project is open.')).toBe(
      'No project is open.',
    );
  });
});

describe('toDblFetchResult', () => {
  it('keeps the resources of an available catalog', () => {
    expect(toDblFetchResult({ status: 'available', resources: [RESOURCE] })).toEqual({
      didFetchSucceed: true,
      resources: [RESOURCE],
    });
  });

  // The provider registers in the background, so trying again genuinely works.
  it('treats a not-yet-registered provider as a recoverable failure', () => {
    expect(toDblFetchResult({ status: 'unavailable', reason: 'notReady' })).toEqual({
      didFetchSucceed: false,
      isPermanent: false,
    });
  });

  // No amount of retrying produces DBL credentials, so the caller must not offer one.
  it('marks an installation with no DBL credentials as a permanent answer', () => {
    expect(toDblFetchResult({ status: 'unavailable', reason: 'notConfigured' })).toEqual({
      didFetchSucceed: false,
      isPermanent: true,
    });
  });
});

describe('toLocalFetchResult', () => {
  it('treats a resolved undefined as a failed fetch', () => {
    // `platformGetResources.getCachedResources` reports an unreachable Digital Bible Library by
    // resolving undefined rather than by rejecting, so this is the ordinary outage path.
    expect(toLocalFetchResult(undefined)).toEqual({ didFetchSucceed: false });
  });

  it('treats an empty array as a successful fetch that found nothing', () => {
    expect(toLocalFetchResult([])).toEqual({ didFetchSucceed: true, resources: [] });
  });

  it('keeps the resources of a successful fetch', () => {
    expect(toLocalFetchResult([RESOURCE])).toEqual({
      didFetchSucceed: true,
      resources: [RESOURCE],
    });
  });

  it('treats a value that is not an array as a failed fetch', () => {
    // The command crosses a JSON-RPC boundary, so its declared return type is a claim, not a
    // guarantee. Only an actual array may become a successful fetch, or the list spread throws.
    const notAnArray: DblResourceData[] | undefined = JSON.parse('{"unexpected":true}');
    expect(toLocalFetchResult(notAnArray)).toEqual({ didFetchSucceed: false });
  });
});

describe('collectFetchedResources', () => {
  it('stays a usable empty array when the catalog fetch resolved undefined', () => {
    expect(collectFetchedResources(toLocalFetchResult(undefined), FOUND_NOTHING)).toEqual([]);
  });

  it('is empty while both fetches are still pending', () => {
    expect(collectFetchedResources(undefined, undefined)).toEqual([]);
  });

  it('keeps the resources of whichever fetch succeeded', () => {
    expect(collectFetchedResources(FAILED, FOUND_ONE)).toEqual([LOCAL_RESOURCE]);
  });

  it('lists catalog resources ahead of local ones when both fetches succeeded', () => {
    expect(collectFetchedResources(toLocalFetchResult([RESOURCE]), FOUND_ONE)).toEqual([
      RESOURCE,
      LOCAL_RESOURCE,
    ]);
  });
});

// The picker's whole reason for existing offline is that locally-installed resources stay
// reachable, so the message it shows has to match the list it actually renders.
describe('a Digital Bible Library outage', () => {
  // The provider has not registered yet; `getLocalNonDblResources` still answers with whatever is
  // on disk.
  const dblCatalogFetch = toDblFetchResult({ status: 'unavailable', reason: 'notReady' });

  it('lists the local resources and says the catalog is what is missing', () => {
    const localResourceFetch = toLocalFetchResult([LOCAL_RESOURCE]);

    expect(collectFetchedResources(dblCatalogFetch, localResourceFetch)).toEqual([LOCAL_RESOURCE]);
    expect(buildResourcePickerNotice(dblCatalogFetch, localResourceFetch, STRINGS)).toBe(
      'Library unreachable',
    );
  });

  it('does not claim local resources are shown when the computer has none', () => {
    const localResourceFetch = toLocalFetchResult([]);

    expect(collectFetchedResources(dblCatalogFetch, localResourceFetch)).toEqual([]);
    // Nothing to show at all, so the picker's body state carries the message and the retry.
    expect(buildResourcePickerNotice(dblCatalogFetch, localResourceFetch, STRINGS)).toBeUndefined();
  });
});
