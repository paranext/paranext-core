// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { newPlatformError } from 'platform-bible-utils';
import type { ResourceReferenceList } from 'platform-scripture';
import { CURRENT_DATA_VERSION } from './resource-reference-list.const';
import type { EffectiveResourceReferenceListState } from './use-effective-resource-reference-list.hook';

// Hoisted bare `vi.fn()`s rather than `vi.mocked(...)` of the real exports: these stubs supply only
// the handful of PDP methods and setting shapes the hook actually calls, and typing them against
// the real signatures would force a type assertion at every stub — the exact thing
// `no-type-assertion` exists to prevent. Same pattern as `navigation-target.util.test.ts`.
const { useProjectDataProviderMock, useSettingMock, useEffectiveListMock } = vi.hoisted(() => ({
  useProjectDataProviderMock: vi.fn(),
  useSettingMock: vi.fn(),
  useEffectiveListMock: vi.fn(),
}));

vi.mock('@papi/frontend/react', () => ({
  useProjectDataProvider: useProjectDataProviderMock,
  useSetting: useSettingMock,
}));
// Only the hook is stubbed. `mergeResourceReferenceLists` is kept real on purpose: the no-project
// branch delegates its dedup, unknown-type filtering, and `source` tagging to it, so stubbing it
// would test the delegation instead of the behavior these cases are about.
vi.mock('./use-effective-resource-reference-list.hook', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./use-effective-resource-reference-list.hook')>()),
  useEffectiveResourceReferenceList: useEffectiveListMock,
}));
// A fixed stand-in allowlist, so these tests don't move whenever the curated set is edited.
vi.mock('./free-resources.const', () => ({
  FREE_RESOURCE_DBL_ENTRY_UIDS: Object.freeze(['FREE0001', 'FREE0002']),
}));

const { useResourceReferenceSource } = await import('./use-resource-reference-source.hook');

const MODEL_TEXTS_SETTING = 'platformScriptureEditor.noProjectModelTexts';
const REFERENCED_SETTING = 'platformScriptureEditor.noProjectReferencedResources';

function list(...ids: string[]): ResourceReferenceList {
  return {
    dataVersion: CURRENT_DATA_VERSION,
    items: ids.map((id) => ({ type: 'dblResource' as const, name: `Name ${id}`, id })),
  };
}

/** The ids in a `ready` state, or `undefined` for any other state. */
function idsOf(state: EffectiveResourceReferenceListState): (string | undefined)[] | undefined {
  if (state.status !== 'ready') return undefined;
  // Narrowed off the real union — only some reference types carry an `id`, and `in` alone leaves
  // the value `unknown`, so the string check is what makes the element type honest.
  return state.list.items.map((item) =>
    'id' in item && typeof item.id === 'string' ? item.id : undefined,
  );
}

/** What one `useSetting` key should report. */
type SettingStub = { value: unknown; isLoading?: boolean };

/**
 * Points each no-project setting key at its own stub, so a test can tell which key the hook read.
 *
 * @returns The setter each key hands back, for asserting what was written.
 */
function setSettings(stubs: Record<string, SettingStub> = {}) {
  const setters: Record<string, ReturnType<typeof vi.fn>> = {
    [MODEL_TEXTS_SETTING]: vi.fn(async () => true),
    [REFERENCED_SETTING]: vi.fn(async () => true),
  };
  useSettingMock.mockImplementation((key: string, defaultValue: unknown) => {
    const stub = stubs[key];
    return [stub ? stub.value : defaultValue, setters[key], vi.fn(), stub?.isLoading ?? false];
  });
  return setters;
}

beforeEach(() => {
  vi.clearAllMocks();
  useProjectDataProviderMock.mockReturnValue(undefined);
  useEffectiveListMock.mockReturnValue({ status: 'loading' });
  setSettings();
});

describe('source selection', () => {
  it('uses the project source when a project is open', () => {
    const projectList = { dataVersion: CURRENT_DATA_VERSION, items: [] };
    useEffectiveListMock.mockReturnValue({ status: 'ready', list: projectList });

    const { result } = renderHook(() =>
      useResourceReferenceSource('project-1', 'platformScripture.modelTexts'),
    );

    expect(result.current.isNoProject).toBe(false);
    expect(result.current.state).toEqual({ status: 'ready', list: projectList });
  });

  it('uses the app-scoped source when no project is open', () => {
    // `useEffectiveResourceReferenceList(undefined, …)` reports `loading` forever, so trusting it
    // in the no-project branch would leave the panel spinning with no way out.
    useEffectiveListMock.mockReturnValue({ status: 'loading' });
    setSettings({ [MODEL_TEXTS_SETTING]: { value: list('FREE0001') } });

    const { result } = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );

    expect(result.current.isNoProject).toBe(true);
    expect(result.current.state.status).toBe('ready');
  });

  it('reads each setting name from its own key', () => {
    setSettings({
      [MODEL_TEXTS_SETTING]: { value: list('FREE0001') },
      [REFERENCED_SETTING]: { value: list('FREE0002') },
    });

    const model = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );
    const referenced = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.referencedProjectsAndResources'),
    );

    expect(idsOf(model.result.current.state)).toEqual(['FREE0001']);
    expect(idsOf(referenced.result.current.state)).toEqual(['FREE0002']);
  });
});

describe('no-project readiness', () => {
  it('reports loading while the setting is still resolving', () => {
    setSettings({ [MODEL_TEXTS_SETTING]: { value: list(), isLoading: true } });

    const { result } = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );

    expect(result.current.state).toEqual({ status: 'loading' });
  });

  it('reports error when the setting cannot be read', () => {
    setSettings({ [MODEL_TEXTS_SETTING]: { value: newPlatformError('nope') } });

    const { result } = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );

    expect(result.current.state).toEqual({ status: 'error' });
  });

  it('reports ready with zero items for an empty stored list', () => {
    // `ready` with no items is the genuine "nothing chosen yet" state — the only one in which a
    // panel may show its pick prompt.
    setSettings({ [MODEL_TEXTS_SETTING]: { value: list() } });

    const { result } = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );

    expect(result.current.state).toEqual({
      status: 'ready',
      list: { dataVersion: CURRENT_DATA_VERSION, items: [] },
    });
  });

  it('treats a malformed items field as empty rather than throwing', () => {
    // The stored value never passes through the project setting validator on read, so a malformed
    // `items` would otherwise throw inside the memo and unmount the panel with no error boundary.
    setSettings({
      [MODEL_TEXTS_SETTING]: { value: { dataVersion: CURRENT_DATA_VERSION, items: undefined } },
    });

    const { result } = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );

    expect(result.current.state).toEqual({
      status: 'ready',
      list: { dataVersion: CURRENT_DATA_VERSION, items: [] },
    });
  });

  it('tags items as user-sourced, since no admin layer exists without a project', () => {
    setSettings({ [MODEL_TEXTS_SETTING]: { value: list('FREE0001') } });

    const { result } = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );

    expect(result.current.state).toEqual({
      status: 'ready',
      list: {
        dataVersion: CURRENT_DATA_VERSION,
        items: [{ type: 'dblResource', name: 'Name FREE0001', id: 'FREE0001', source: 'user' }],
      },
    });
  });
});

describe('free-resource filtering', () => {
  it('drops a stored resource that is no longer allowlisted', () => {
    // The case a write-side guard alone cannot cover: a uid stored while the allowlist was wider,
    // or hand-edited into the setting, must not keep rendering.
    setSettings({ [MODEL_TEXTS_SETTING]: { value: list('FREE0001', 'NOTFREE9') } });

    const { result } = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );

    expect(idsOf(result.current.state)).toEqual(['FREE0001']);
  });

  it('writes stored items through unfiltered, so a narrowed allowlist does not destroy them', async () => {
    // The read path hides a no-longer-allowlisted entry; the write path must not delete it, because
    // the curated list is expected to widen and `selectTextConnection` round-trips the whole list,
    // so one unrelated pick would otherwise drop it for good. Refusing newly ADDED non-free
    // references is the validator's job.
    const setters = setSettings({ [MODEL_TEXTS_SETTING]: { value: list() } });

    const { result } = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );
    await result.current.setUserList(list('FREE0001', 'NOTFREE9'));

    expect(setters[MODEL_TEXTS_SETTING]).toHaveBeenCalledWith({
      dataVersion: CURRENT_DATA_VERSION,
      items: [
        { type: 'dblResource', name: 'Name FREE0001', id: 'FREE0001' },
        { type: 'dblResource', name: 'Name NOTFREE9', id: 'NOTFREE9' },
      ],
    });
  });

  it('does not filter the project source, which legitimately holds other reference types', async () => {
    const setUserReferenced = vi.fn(async () => true);
    useProjectDataProviderMock.mockReturnValue({
      setUserReferencedProjectsAndResources: setUserReferenced,
    });

    const { result } = renderHook(() =>
      useResourceReferenceSource('project-1', 'platformScripture.referencedProjectsAndResources'),
    );
    const projectList: ResourceReferenceList = {
      dataVersion: CURRENT_DATA_VERSION,
      items: [{ type: 'project', name: 'A project', id: 'proj-9' }],
    };
    await result.current.setUserList(projectList);

    expect(setUserReferenced).toHaveBeenCalledWith(projectList);
  });
});

describe('read-modify-write freshness', () => {
  it('hands back the latest stored list, not the one captured at first render', async () => {
    // `selectTextConnection` reads then writes. Reading the render closure would let a second pick
    // compute its next state from a pre-write snapshot and silently drop the first.
    setSettings({ [MODEL_TEXTS_SETTING]: { value: list('FREE0001') } });

    const { result, rerender } = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );
    const { getUserList } = result.current;

    setSettings({ [MODEL_TEXTS_SETTING]: { value: list('FREE0001', 'FREE0002') } });
    rerender();

    await waitFor(async () => {
      // `ResourceReference` is a union; only some members carry `id`.
      expect(
        (await getUserList())?.items.map((item) => ('id' in item ? item.id : undefined)),
      ).toEqual(['FREE0001', 'FREE0002']);
    });
  });

  it('reports an unreadable setting as no list rather than handing back the error object', async () => {
    setSettings({ [MODEL_TEXTS_SETTING]: { value: newPlatformError('nope') } });

    const { result } = renderHook(() =>
      useResourceReferenceSource(undefined, 'platformScripture.modelTexts'),
    );

    expect(await result.current.getUserList()).toBeUndefined();
  });
});

describe('project source callbacks', () => {
  it('resolves to no list while the project data provider has not arrived', async () => {
    useProjectDataProviderMock.mockReturnValue(undefined);

    const { result } = renderHook(() =>
      useResourceReferenceSource('project-1', 'platformScripture.modelTexts'),
    );

    expect(await result.current.getUserList()).toBeUndefined();
  });

  it('reads and writes the model-text methods for the model-text setting', async () => {
    const getUserModelTexts = vi.fn(async () => list('anything'));
    const setUserModelTexts = vi.fn(async () => true);
    useProjectDataProviderMock.mockReturnValue({ getUserModelTexts, setUserModelTexts });

    const { result } = renderHook(() =>
      useResourceReferenceSource('project-1', 'platformScripture.modelTexts'),
    );
    await result.current.getUserList();
    await result.current.setUserList(list('anything'));

    expect(getUserModelTexts).toHaveBeenCalled();
    expect(setUserModelTexts).toHaveBeenCalledWith(list('anything'));
  });
});
