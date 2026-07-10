import type { ResourceReferenceList } from 'platform-scripture';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { DEFAULT_RESOURCE_REFERENCE_LIST } from './resource-reference-list.const';
import { selectTextConnection } from './select-dbl-resource';

const RESOURCE_A = {
  dblEntryUid: 'uid-a',
  displayName: 'Resource A',
  fullName: 'Resource A Full',
  bestLanguageName: 'English',
  type: 'ScriptureResource' as const,
  size: 100,
  installed: true,
  updateAvailable: false,
  projectId: 'proj-a',
};

const RESOURCE_B = {
  dblEntryUid: 'uid-b',
  displayName: 'Resource B',
  fullName: 'Resource B Full',
  bestLanguageName: 'Spanish',
  type: 'CommentaryResource' as const,
  size: 200,
  installed: false,
  updateAvailable: false,
  projectId: 'proj-b',
};

function makeAdminList(ids: string[]): ResourceReferenceList {
  return {
    dataVersion: '1.0.0',
    items: ids.map((id) => ({ type: 'dblResource' as const, name: `name-${id}`, id })),
  };
}

function makeUserList(ids: string[]): ResourceReferenceList {
  return {
    dataVersion: '1.0.0',
    items: ids.map((id) => ({ type: 'dblResource' as const, name: `name-${id}`, id })),
  };
}

describe('selectDblResource', () => {
  describe('admin path (canWrite=true, setAdminSetting defined)', () => {
    let setAdminSetting: ReturnType<typeof vi.fn>;
    let setUserList: ReturnType<typeof vi.fn>;
    let getUserList: ReturnType<typeof vi.fn>;
    let onSelect: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      setAdminSetting = vi.fn();
      setUserList = vi.fn().mockResolvedValue(undefined);
      getUserList = vi.fn().mockResolvedValue(makeUserList([]));
      onSelect = vi.fn();
    });

    it('prepends the new resource to the admin list', async () => {
      await selectTextConnection(
        RESOURCE_A,
        makeAdminList(['uid-existing']),
        setAdminSetting,
        vi.fn().mockResolvedValue(true),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(setAdminSetting).toHaveBeenCalledWith({
        dataVersion: '1.0.0',
        items: [
          { type: 'dblResource', name: 'Resource A', id: 'uid-a' },
          { type: 'dblResource', name: 'name-uid-existing', id: 'uid-existing' },
        ],
      });
    });

    it('deduplicates: removes existing entry with the same id before prepending', async () => {
      await selectTextConnection(
        RESOURCE_A,
        makeAdminList(['uid-a', 'uid-other']),
        setAdminSetting,
        vi.fn().mockResolvedValue(true),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(setAdminSetting).toHaveBeenCalledWith({
        dataVersion: '1.0.0',
        items: [
          { type: 'dblResource', name: 'Resource A', id: 'uid-a' },
          { type: 'dblResource', name: 'name-uid-other', id: 'uid-other' },
        ],
      });
    });

    it('preserves non-dblResource items during deduplication', async () => {
      const adminSetting: ResourceReferenceList = {
        dataVersion: '1.0.0',
        items: [
          { type: 'dblResource' as const, name: 'name-uid-a', id: 'uid-a' },
          // 'project' is a valid ResourceReference type but requires a cast here because the
          // ResourceReferenceList item union doesn't include it directly in this context
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          { type: 'project' as never, name: 'some-project' },
        ],
      };
      await selectTextConnection(
        RESOURCE_A,
        adminSetting,
        setAdminSetting,
        vi.fn().mockResolvedValue(true),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(setAdminSetting).toHaveBeenCalledWith(
        expect.objectContaining({
          items: expect.arrayContaining([expect.objectContaining({ type: 'project' })]),
        }),
      );
    });

    it('calls onSelect with the dblEntryUid after writing', async () => {
      await selectTextConnection(
        RESOURCE_A,
        makeAdminList([]),
        setAdminSetting,
        vi.fn().mockResolvedValue(true),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(onSelect).toHaveBeenCalledWith('uid-a');
    });

    it('does not call getUserList or setUserList', async () => {
      await selectTextConnection(
        RESOURCE_A,
        makeAdminList([]),
        setAdminSetting,
        vi.fn().mockResolvedValue(true),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(getUserList).not.toHaveBeenCalled();
      expect(setUserList).not.toHaveBeenCalled();
    });

    it('returns early without writing when adminSetting is undefined', async () => {
      await selectTextConnection(
        RESOURCE_A,
        undefined,
        setAdminSetting,
        vi.fn().mockResolvedValue(true),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(setAdminSetting).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('user path (canWrite=false or admin not available)', () => {
    let setAdminSetting: ReturnType<typeof vi.fn>;
    let setUserList: ReturnType<typeof vi.fn>;
    let onSelect: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      setAdminSetting = vi.fn();
      setUserList = vi.fn().mockResolvedValue(undefined);
      onSelect = vi.fn();
    });

    it('prepends the new resource to the user list', async () => {
      const getUserList = vi.fn().mockResolvedValue(makeUserList(['uid-existing']));
      await selectTextConnection(
        RESOURCE_B,
        makeAdminList([]),
        setAdminSetting,
        vi.fn().mockResolvedValue(false),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(setUserList).toHaveBeenCalledWith({
        dataVersion: '1.0.0',
        items: [
          { type: 'dblResource', name: 'Resource B', id: 'uid-b' },
          { type: 'dblResource', name: 'name-uid-existing', id: 'uid-existing' },
        ],
      });
    });

    it('deduplicates: removes existing user entry with the same id before prepending', async () => {
      const getUserList = vi.fn().mockResolvedValue(makeUserList(['uid-b', 'uid-other']));
      await selectTextConnection(
        RESOURCE_B,
        makeAdminList([]),
        setAdminSetting,
        vi.fn().mockResolvedValue(false),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(setUserList).toHaveBeenCalledWith({
        dataVersion: '1.0.0',
        items: [
          { type: 'dblResource', name: 'Resource B', id: 'uid-b' },
          { type: 'dblResource', name: 'name-uid-other', id: 'uid-other' },
        ],
      });
    });

    it('uses DEFAULT_RESOURCE_REFERENCE_LIST.dataVersion when getUserList returns undefined', async () => {
      const getUserList = vi.fn().mockResolvedValue(undefined);
      await selectTextConnection(
        RESOURCE_A,
        makeAdminList([]),
        setAdminSetting,
        vi.fn().mockResolvedValue(false),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(setUserList).toHaveBeenCalledWith({
        dataVersion: DEFAULT_RESOURCE_REFERENCE_LIST.dataVersion,
        items: [{ type: 'dblResource', name: 'Resource A', id: 'uid-a' }],
      });
    });

    it('calls onSelect with the dblEntryUid after writing', async () => {
      const getUserList = vi.fn().mockResolvedValue(makeUserList([]));
      await selectTextConnection(
        RESOURCE_A,
        makeAdminList([]),
        setAdminSetting,
        vi.fn().mockResolvedValue(false),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(onSelect).toHaveBeenCalledWith('uid-a');
    });

    it('does not call setAdminSetting', async () => {
      const getUserList = vi.fn().mockResolvedValue(makeUserList([]));
      await selectTextConnection(
        RESOURCE_A,
        makeAdminList([]),
        setAdminSetting,
        vi.fn().mockResolvedValue(false),
        getUserList,
        setUserList,
        undefined,
        onSelect,
      );

      expect(setAdminSetting).not.toHaveBeenCalled();
    });
  });

  describe('onSelect is optional', () => {
    it('does not throw when onSelect is not provided', async () => {
      const setUserList = vi.fn().mockResolvedValue(undefined);
      await expect(
        selectTextConnection(
          RESOURCE_A,
          makeAdminList([]),
          async () => undefined,
          vi.fn().mockResolvedValue(false),
          vi.fn().mockResolvedValue(makeUserList([])),
          setUserList,
        ),
      ).resolves.toBeUndefined();
    });
  });

  describe('installResource parameter', () => {
    let setAdminSetting: ReturnType<typeof vi.fn>;
    let setUserList: ReturnType<typeof vi.fn>;
    let getUserList: ReturnType<typeof vi.fn>;
    let onSelect: ReturnType<typeof vi.fn>;
    let installResource: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      setAdminSetting = vi.fn();
      setUserList = vi.fn().mockResolvedValue(undefined);
      getUserList = vi.fn().mockResolvedValue(makeUserList([]));
      onSelect = vi.fn();
      installResource = vi.fn().mockResolvedValue(undefined);
    });

    it('skips installResource when the resource is already installed', async () => {
      await selectTextConnection(
        RESOURCE_A, // installed: true
        makeAdminList([]),
        setAdminSetting,
        vi.fn().mockResolvedValue(true),
        getUserList,
        setUserList,
        installResource,
        onSelect,
      );

      expect(installResource).not.toHaveBeenCalled();
      expect(setAdminSetting).toHaveBeenCalled();
      expect(onSelect).toHaveBeenCalledWith('uid-a');
    });

    it('calls installResource with the dblEntryUid before writing settings when not installed', async () => {
      const callOrder: string[] = [];
      installResource = vi.fn().mockImplementation(async () => {
        callOrder.push('install');
      });
      setUserList = vi.fn().mockImplementation(async () => {
        callOrder.push('write');
      });

      await selectTextConnection(
        RESOURCE_B, // installed: false
        makeAdminList([]),
        setAdminSetting,
        vi.fn().mockResolvedValue(false),
        getUserList,
        setUserList,
        installResource,
        onSelect,
      );

      expect(installResource).toHaveBeenCalledWith('uid-b');
      expect(callOrder).toEqual(['install', 'write']);
    });

    it('cancels the settings write and does not call onSelect when installResource throws', async () => {
      installResource = vi.fn().mockRejectedValue(new Error('install failed'));

      await selectTextConnection(
        RESOURCE_B, // installed: false
        makeAdminList([]),
        setAdminSetting,
        vi.fn().mockResolvedValue(false),
        getUserList,
        setUserList,
        installResource,
        onSelect,
      );

      expect(setUserList).not.toHaveBeenCalled();
      expect(setAdminSetting).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('proceeds without installing when installResource is not provided and resource is not installed', async () => {
      await selectTextConnection(
        RESOURCE_B, // installed: false
        makeAdminList([]),
        async () => undefined,
        vi.fn().mockResolvedValue(false),
        getUserList,
        setUserList,
        undefined, // no installResource
        onSelect,
      );

      expect(setUserList).toHaveBeenCalled();
      expect(onSelect).toHaveBeenCalledWith('uid-b');
    });
  });
});
