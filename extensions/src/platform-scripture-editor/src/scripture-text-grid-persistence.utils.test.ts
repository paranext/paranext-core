import { describe, expect, it, vi } from 'vitest';
import type { DblResourceReference, ResourceReferenceList } from 'platform-scripture';
import { CURRENT_DATA_VERSION } from './resource-reference-list.const';
import { isDblResourceReference, isProjectReference } from './resource-reference.utils';
import type { TextCollectionSources } from './scripture-text-grid-contents.utils';
import {
  persistCellOrder,
  persistUserAddition,
  persistUserDisplay,
  persistUserRemoval,
  removeFromUserTextConnections,
  type UserResourceWriter,
} from './scripture-text-grid-persistence.utils';

const dbl = (id: string, overrides?: Partial<DblResourceReference>): DblResourceReference => ({
  type: 'dblResource',
  name: `DBL ${id}`,
  id,
  ...overrides,
});

const list = (items: DblResourceReference[] = []): ResourceReferenceList => ({
  dataVersion: CURRENT_DATA_VERSION,
  items,
});

const makeSources = (overrides?: Partial<TextCollectionSources>): TextCollectionSources => ({
  adminReferenced: list(),
  userReferenced: list(),
  overlay: {},
  order: [],
  ...overrides,
});

/** A stub writer whose setters resolve; each test asserts which one was called and with what. */
const makeWriter = (): UserResourceWriter => ({
  setUserReferencedProjectsAndResources: vi.fn().mockResolvedValue(true),
  setTextCollectionOverlay: vi.fn().mockResolvedValue(true),
  setCellOrder: vi.fn().mockResolvedValue(true),
});

/** Reads `isInTextCollectionForUser` off a reference without a type assertion. */
const userFlagOf = (refList: ResourceReferenceList, id: string): boolean | undefined => {
  const ref = refList.items.find(
    (item) => (isProjectReference(item) || isDblResourceReference(item)) && item.id === id,
  );
  return ref && (isProjectReference(ref) || isDblResourceReference(ref))
    ? ref.isInTextCollectionForUser
    : undefined;
};

/** Reads the ids off a reference list, narrowing to Bible-text references (the only ones with `id`). */
const idsOf = (refList: ResourceReferenceList): (string | undefined)[] =>
  refList.items.map((item) =>
    isProjectReference(item) || isDblResourceReference(item) ? item.id : undefined,
  );

describe('persistUserDisplay', () => {
  it('routes an admin-owned entry to the overlay only (not the user list)', () => {
    const writer = makeWriter();
    const sources = makeSources({
      adminReferenced: list([dbl('esv', { isInTextCollection: true })]),
    });

    persistUserDisplay(writer, 'esv', false, sources);

    expect(writer.setTextCollectionOverlay).toHaveBeenCalledWith({ esv: false });
    expect(writer.setUserReferencedProjectsAndResources).not.toHaveBeenCalled();
  });

  it('routes a user entry to the user list only (not the overlay)', () => {
    const writer = makeWriter();
    const sources = makeSources({
      userReferenced: list([dbl('web', { isInTextCollectionForUser: true })]),
    });

    persistUserDisplay(writer, 'web', false, sources);

    expect(writer.setTextCollectionOverlay).not.toHaveBeenCalled();
    expect(writer.setUserReferencedProjectsAndResources).toHaveBeenCalledTimes(1);
    const persisted = vi.mocked(writer.setUserReferencedProjectsAndResources).mock.calls[0][0];
    expect(userFlagOf(persisted, 'web')).toBe(false);
  });

  it('fires nothing for an unknown id', () => {
    const writer = makeWriter();
    const writes = persistUserDisplay(writer, 'nope', true, makeSources());

    expect(writes).toHaveLength(0);
    expect(writer.setUserReferencedProjectsAndResources).not.toHaveBeenCalled();
    expect(writer.setTextCollectionOverlay).not.toHaveBeenCalled();
  });
});

describe('persistUserRemoval', () => {
  it('persists the user list without the removed entry', () => {
    const writer = makeWriter();
    const userReferenced = list([dbl('web', { isInTextCollectionForUser: true }), dbl('kjv')]);

    const result = persistUserRemoval(writer, 'web', userReferenced);

    expect(result).toBeDefined();
    const persisted = vi.mocked(writer.setUserReferencedProjectsAndResources).mock.calls[0][0];
    expect(idsOf(persisted)).toEqual(['kjv']);
  });

  it('is a no-op (no write) when the id is not in the user list', () => {
    const writer = makeWriter();
    const result = persistUserRemoval(writer, 'absent', list([dbl('web')]));

    expect(result).toBeUndefined();
    expect(writer.setUserReferencedProjectsAndResources).not.toHaveBeenCalled();
  });
});

describe('persistUserAddition', () => {
  it('appends the reference with isInTextCollectionForUser and persists', () => {
    const writer = makeWriter();
    const result = persistUserAddition(writer, dbl('niv'), list());

    expect(result).toBeDefined();
    const persisted = vi.mocked(writer.setUserReferencedProjectsAndResources).mock.calls[0][0];
    expect(idsOf(persisted)).toEqual(['niv']);
    expect(userFlagOf(persisted, 'niv')).toBe(true);
  });

  it('is a no-op (no write) when the id is already present', () => {
    const writer = makeWriter();
    const result = persistUserAddition(writer, dbl('web'), list([dbl('web')]));

    expect(result).toBeUndefined();
    expect(writer.setUserReferencedProjectsAndResources).not.toHaveBeenCalled();
  });
});

describe('persistCellOrder', () => {
  it('writes the order through setCellOrder', async () => {
    const writer = makeWriter();
    await persistCellOrder(writer, ['a', 'b']);
    expect(writer.setCellOrder).toHaveBeenCalledWith(['a', 'b']);
  });
});

/** A user list of DBL references with the given ids. */
function makeDblUserList(ids: string[]): ResourceReferenceList {
  return {
    dataVersion: '1.0.0',
    items: ids.map((id) => ({ type: 'dblResource' as const, name: `name-${id}`, id })),
  };
}

describe('removeFromUserTextConnections', () => {
  it("writes the user's list without the given ids", async () => {
    const setUserList = vi.fn().mockResolvedValue(undefined);
    const result = await removeFromUserTextConnections(
      ['uid-a'],
      async () => makeDblUserList(['uid-a', 'uid-b']),
      setUserList,
    );
    expect(result).toBe('removed');
    expect(setUserList).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [{ type: 'dblResource', name: 'name-uid-b', id: 'uid-b' }],
      }),
    );
  });

  it('removes every copy the list stores the resource under', async () => {
    const setUserList = vi.fn().mockResolvedValue(undefined);
    await removeFromUserTextConnections(
      ['uid-a', 'proj-a'],
      async () => ({
        dataVersion: '1.0.0',
        items: [
          { type: 'dblResource', name: 'A', id: 'uid-a' },
          { type: 'project', name: 'A', id: 'proj-a' },
          { type: 'dblResource', name: 'B', id: 'uid-b' },
        ],
      }),
      setUserList,
    );
    expect(setUserList).toHaveBeenCalledWith(
      expect.objectContaining({ items: [{ type: 'dblResource', name: 'B', id: 'uid-b' }] }),
    );
  });

  it('reports a resource already off the list, and writes nothing', async () => {
    const setUserList = vi.fn();
    const result = await removeFromUserTextConnections(
      ['uid-a'],
      async () => makeDblUserList(['uid-b']),
      setUserList,
    );
    expect(result).toBe('alreadyGone');
    expect(setUserList).not.toHaveBeenCalled();
  });

  it('reports a list it could not read, and writes nothing', async () => {
    const setUserList = vi.fn();
    expect(await removeFromUserTextConnections(['uid-a'], async () => undefined, setUserList)).toBe(
      'listUnavailable',
    );
    expect(setUserList).not.toHaveBeenCalled();
  });

  it('rejects when the write fails', async () => {
    const setUserList = vi.fn().mockRejectedValue(new Error('could not write'));
    await expect(
      removeFromUserTextConnections(['uid-a'], async () => makeDblUserList(['uid-a']), setUserList),
    ).rejects.toThrow('could not write');
  });
});
