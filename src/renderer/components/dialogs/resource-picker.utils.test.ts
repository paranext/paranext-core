import { describe, expect, it } from 'vitest';
import { DblResourceData } from 'platform-bible-utils';
import {
  buildResourcePickerNotice,
  collectFetchedResources,
  ResourceFetchResult,
  toResourceFetchResult,
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
  '%resourcePicker_notice_allResourcesUnavailable%': 'Nothing loaded',
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
  // partial list the user cannot see. With nothing to show, the honest message is that nothing
  // loaded.
  it('does not promise local resources when the catalog failed and none were found', () => {
    expect(buildResourcePickerNotice(FAILED, FOUND_NOTHING, STRINGS)).toBe('Nothing loaded');
  });

  it('reports nothing loaded when both fetches failed', () => {
    expect(buildResourcePickerNotice(FAILED, FAILED, STRINGS)).toBe('Nothing loaded');
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

describe('toResourceFetchResult', () => {
  it('treats a resolved undefined as a failed fetch', () => {
    // `platformGetResources.getCachedResources` reports an unreachable Digital Bible Library by
    // resolving undefined rather than by rejecting, so this is the ordinary outage path.
    expect(toResourceFetchResult(undefined)).toEqual({ didFetchSucceed: false });
  });

  it('treats an empty array as a successful fetch that found nothing', () => {
    expect(toResourceFetchResult([])).toEqual({ didFetchSucceed: true, resources: [] });
  });

  it('keeps the resources of a successful fetch', () => {
    expect(toResourceFetchResult([RESOURCE])).toEqual({
      didFetchSucceed: true,
      resources: [RESOURCE],
    });
  });

  it('treats a value that is not an array as a failed fetch', () => {
    // The command crosses a JSON-RPC boundary, so its declared return type is a claim, not a
    // guarantee. Only an actual array may become a successful fetch, or the list spread throws.
    const notAnArray: DblResourceData[] | undefined = JSON.parse('{"unexpected":true}');
    expect(toResourceFetchResult(notAnArray)).toEqual({ didFetchSucceed: false });
  });
});

describe('collectFetchedResources', () => {
  it('stays a usable empty array when the catalog fetch resolved undefined', () => {
    expect(collectFetchedResources(toResourceFetchResult(undefined), FOUND_NOTHING)).toEqual([]);
  });

  it('is empty while both fetches are still pending', () => {
    expect(collectFetchedResources(undefined, undefined)).toEqual([]);
  });

  it('keeps the resources of whichever fetch succeeded', () => {
    expect(collectFetchedResources(FAILED, FOUND_ONE)).toEqual([LOCAL_RESOURCE]);
  });

  it('lists catalog resources ahead of local ones when both fetches succeeded', () => {
    expect(collectFetchedResources(toResourceFetchResult([RESOURCE]), FOUND_ONE)).toEqual([
      RESOURCE,
      LOCAL_RESOURCE,
    ]);
  });
});

// The picker's whole reason for existing offline is that locally-installed resources stay
// reachable, so the message it shows has to match the list it actually renders.
describe('a Digital Bible Library outage', () => {
  // The catalog fetch gives up with `undefined`; `getLocalNonDblResources` still answers with
  // whatever is on disk.
  const dblCatalogFetch = toResourceFetchResult(undefined);

  it('lists the local resources and says the catalog is what is missing', () => {
    const localResourceFetch = toResourceFetchResult([LOCAL_RESOURCE]);

    expect(collectFetchedResources(dblCatalogFetch, localResourceFetch)).toEqual([LOCAL_RESOURCE]);
    expect(buildResourcePickerNotice(dblCatalogFetch, localResourceFetch, STRINGS)).toBe(
      'Library unreachable',
    );
  });

  it('does not claim local resources are shown when the computer has none', () => {
    const localResourceFetch = toResourceFetchResult([]);

    expect(collectFetchedResources(dblCatalogFetch, localResourceFetch)).toEqual([]);
    expect(buildResourcePickerNotice(dblCatalogFetch, localResourceFetch, STRINGS)).toBe(
      'Nothing loaded',
    );
  });
});
