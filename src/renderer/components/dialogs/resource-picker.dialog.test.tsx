import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import { RESOURCE_PICKER_DIALOG } from '@renderer/components/dialogs/resource-picker.dialog';

// Records what the wrapper hands the picker. `allowedResourceIds` is the mechanism that makes a
// non-free resource UNREACHABLE rather than merely refused after the fact, so what reaches
// `allResources` is the behavior worth pinning — not how the picker then renders it.
const { resourcePickerSpy, usePromiseMock } = vi.hoisted(() => ({
  resourcePickerSpy: vi.fn(),
  usePromiseMock: vi.fn(),
}));

vi.mock('platform-bible-react/experimental', () => ({
  RESOURCE_PICKER_DIALOG_STRING_KEYS: Object.freeze([]),
  ResourcePickerDialog: (props: { allResources: DblResourceData[] }) => {
    const { allResources } = props;
    resourcePickerSpy(props);
    return <div data-testid="resource-picker">{allResources.length}</div>;
  },
}));
vi.mock('platform-bible-react', () => ({ usePromise: usePromiseMock }));
vi.mock('@renderer/hooks/papi-hooks', () => ({ useLocalizedStrings: () => [{}] }));
vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));

function resource(dblEntryUid: string): DblResourceData {
  return {
    dblEntryUid,
    displayName: dblEntryUid,
    fullName: `${dblEntryUid} full name`,
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1,
    installed: false,
    updateAvailable: false,
    projectId: '',
  };
}

const CATALOG = [resource('AAAA1111BBBB2222'), resource('cccc3333dddd4444'), resource('NOTFREE9')];

/** The dialog-framework callbacks every dialog receives; none of them matter to these tests. */
const DIALOG_CALLBACKS = {
  isDialog: true as const,
  submitDialog: vi.fn(),
  cancelDialog: vi.fn(),
  rejectDialog: vi.fn(),
};

/** Renders the dialog and returns the props the picker was handed. */
function renderPicker(allowedResourceIds?: string[]) {
  const { Component } = RESOURCE_PICKER_DIALOG;
  render(<Component {...DIALOG_CALLBACKS} allowedResourceIds={allowedResourceIds} />);
  const [props] = resourcePickerSpy.mock.calls.at(-1) ?? [];
  return props;
}

/**
 * Stubs both of the dialog's fetches as succeeded.
 *
 * `usePromise` is called once per fetch (DBL catalog, then locally-installed non-DBL), and the
 * dialog combines them through `collectFetchedResources`, so the mock has to return the
 * `ResourceFetchResult` shape rather than a raw array.
 */
function stubFetches(dbl: DblResourceData[], local: DblResourceData[] = []) {
  usePromiseMock
    .mockReturnValueOnce([{ didFetchSucceed: true, resources: dbl }, false])
    .mockReturnValueOnce([{ didFetchSucceed: true, resources: local }, false]);
}

/** The `dblEntryUid`s the picker may offer, given a restriction. */
function offeredIds(allowedResourceIds?: string[], catalog: DblResourceData[] = CATALOG) {
  stubFetches(catalog);
  return renderPicker(allowedResourceIds).allResources.map((r: DblResourceData) => r.dblEntryUid);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ResourcePickerDialog wrapper resource restriction', () => {
  it('offers the whole catalog when no restriction is given', () => {
    expect(offeredIds(undefined)).toEqual(['AAAA1111BBBB2222', 'cccc3333dddd4444', 'NOTFREE9']);
  });

  it('offers only the allowed resources when a restriction is given', () => {
    expect(offeredIds(['AAAA1111BBBB2222'])).toEqual(['AAAA1111BBBB2222']);
  });

  it('matches allowed ids case-insensitively', () => {
    // The allowlist is hand-curated while `dblEntryUid` arrives in whatever case the DBL catalog
    // supplies, so a case-sensitive match would silently drop a resource the team meant to offer.
    expect(offeredIds(['aaaa1111bbbb2222', 'CCCC3333DDDD4444'])).toEqual([
      'AAAA1111BBBB2222',
      'cccc3333dddd4444',
    ]);
  });

  it('offers nothing for an empty allowed list rather than treating it as "no restriction"', () => {
    // The distinction the option's contract turns on: a MISSING list means unrestricted, an EMPTY
    // one means this caller may offer nothing. Collapsing them would hand a restricted entry point
    // the entire catalog.
    expect(offeredIds([])).toEqual([]);
  });

  it('offers nothing while the catalog is still loading', () => {
    usePromiseMock.mockReturnValue([undefined, true]);

    const props = renderPicker();
    expect(props.allResources).toEqual([]);
    expect(props.isResourcesLoading).toBe(true);
  });

  it('narrows the locally-installed rows too, which no allowlist entry can match', () => {
    // Local non-DBL rows carry `dblEntryUid === projectId`, so a restricted caller must get none of
    // them — the restriction has to apply to the COMBINED list, not just the DBL catalog.
    const local: DblResourceData = { ...resource('proj-local'), projectId: 'proj-local' };
    stubFetches(CATALOG, [local]);

    const offered = renderPicker(['AAAA1111BBBB2222']).allResources.map(
      (r: DblResourceData) => r.dblEntryUid,
    );
    expect(offered).toEqual(['AAAA1111BBBB2222']);
  });

  it('offers the combined list when unrestricted', () => {
    const local: DblResourceData = { ...resource('proj-local'), projectId: 'proj-local' };
    stubFetches(CATALOG, [local]);

    const offered = renderPicker().allResources.map((r: DblResourceData) => r.dblEntryUid);
    expect(offered).toEqual(['AAAA1111BBBB2222', 'cccc3333dddd4444', 'NOTFREE9', 'proj-local']);
  });
});
