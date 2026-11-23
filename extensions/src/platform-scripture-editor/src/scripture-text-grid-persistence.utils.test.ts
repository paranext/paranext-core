import { beforeEach, describe, expect, it, vi } from 'vitest';
import papi from '@papi/frontend';
import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceReference, ResourceReferenceList } from 'platform-scripture';
import { CURRENT_DATA_VERSION } from './resource-reference-list.const';
import { isDblResourceReference, isProjectReference } from './resource-reference.utils';
import type { TextCollectionSources } from './scripture-text-grid-contents.utils';
import {
  persistCellOrder,
  persistUserAddition,
  persistUserDisplay,
  removeFromUserListAndNotify,
  removeFromUserTextConnections,
  type UserResourceWriter,
} from './scripture-text-grid-persistence.utils';

vi.mock('@papi/frontend', () => ({
  default: { notifications: { send: vi.fn(async () => undefined) } },
  logger: { warn: vi.fn() },
}));

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

describe('removeFromUserListAndNotify', () => {
  const RESOURCE: DblResourceData = {
    dblEntryUid: 'uid-a',
    displayName: 'ABC',
    fullName: 'ABC',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1,
    installed: true,
    updateAvailable: false,
    projectId: 'project-a',
  };
  const TEMPLATE = '{resourceName} was removed.';
  const FAILED = { message: '%webView_resourcePanel_removeFailed%', severity: 'error' };

  beforeEach(() => vi.mocked(papi.notifications.send).mockClear());

  it('removes the resource and says so by name', async () => {
    const setUserList = vi.fn().mockResolvedValue(undefined);
    await removeFromUserListAndNotify(
      RESOURCE,
      ['uid-a'],
      async () => makeDblUserList(['uid-a', 'uid-b']),
      setUserList,
      TEMPLATE,
    );
    expect(setUserList).toHaveBeenCalledWith(
      expect.objectContaining({ items: [expect.anything()] }),
    );
    expect(papi.notifications.send).toHaveBeenCalledWith({
      message: 'ABC was removed.',
      severity: 'info',
    });
  });

  // Another tab removed it while the picker was open: what the user asked for already holds.
  it('says a resource already off the list was removed', async () => {
    const setUserList = vi.fn();
    await removeFromUserListAndNotify(
      RESOURCE,
      ['uid-a'],
      async () => makeDblUserList(['uid-b']),
      setUserList,
      TEMPLATE,
    );
    expect(setUserList).not.toHaveBeenCalled();
    expect(papi.notifications.send).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'info' }),
    );
  });

  // Reporting success here would tell the user a resource left their list while it stays on it.
  it('reports a failure when it has no list entries to remove', async () => {
    const getUserList = vi.fn(async () => makeDblUserList(['uid-a']));
    await removeFromUserListAndNotify(RESOURCE, [], getUserList, vi.fn(), TEMPLATE);
    expect(getUserList).not.toHaveBeenCalled();
    expect(papi.notifications.send).toHaveBeenCalledWith(FAILED);
    expect(papi.notifications.send).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['the list could not be read', async () => undefined, vi.fn()],
    [
      'the write failed',
      async () => makeDblUserList(['uid-a']),
      vi.fn().mockRejectedValue(new Error('could not write')),
    ],
  ])('reports a failure when %s', async (_, getUserList, setUserList) => {
    await removeFromUserListAndNotify(RESOURCE, ['uid-a'], getUserList, setUserList, TEMPLATE);
    expect(papi.notifications.send).toHaveBeenCalledWith(FAILED);
    expect(papi.notifications.send).toHaveBeenCalledTimes(1);
  });

  it('rejects when the notification cannot be sent, for the caller to log', async () => {
    vi.mocked(papi.notifications.send).mockRejectedValueOnce(new Error('no notifications'));
    await expect(
      removeFromUserListAndNotify(
        RESOURCE,
        ['uid-a'],
        async () => makeDblUserList(['uid-a']),
        vi.fn().mockResolvedValue(undefined),
        TEMPLATE,
      ),
    ).rejects.toThrow('no notifications');
  });
});
