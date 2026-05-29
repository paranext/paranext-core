import { newPlatformError } from 'platform-bible-utils';
import type { ResourceReferenceList } from 'platform-scripture';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { DEFAULT_RESOURCE_REFERENCE_LIST, selectTextConnection } from './select-dbl-resource';

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
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: makeAdminList(['uid-existing']),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(true),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

      expect(setAdminSetting).toHaveBeenCalledWith({
        dataVersion: '1.0.0',
        items: [
          { type: 'dblResource', name: 'Resource A', id: 'uid-a' },
          { type: 'dblResource', name: 'name-uid-existing', id: 'uid-existing' },
        ],
      });
    });

    it('deduplicates: removes existing entry with the same id before prepending', async () => {
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: makeAdminList(['uid-a', 'uid-other']),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(true),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

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
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: adminSetting,
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(true),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

      expect(setAdminSetting).toHaveBeenCalledWith(
        expect.objectContaining({
          items: expect.arrayContaining([expect.objectContaining({ type: 'project' })]),
        }),
      );
    });

    it('calls onSelect with the dblEntryUid after writing', async () => {
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: makeAdminList([]),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(true),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

      expect(onSelect).toHaveBeenCalledWith('uid-a');
    });

    it('does not call getUserList or setUserList', async () => {
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: makeAdminList([]),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(true),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

      expect(getUserList).not.toHaveBeenCalled();
      expect(setUserList).not.toHaveBeenCalled();
    });

    it('returns early without writing when adminSetting is a PlatformError', async () => {
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: newPlatformError(new Error('setting error')),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(true),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

      expect(setAdminSetting).not.toHaveBeenCalled();
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('returns early without writing when adminSetting is undefined', async () => {
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: undefined,
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(true),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

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
      await selectTextConnection(RESOURCE_B, {
        adminResourceList: makeAdminList([]),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(false),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

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
      await selectTextConnection(RESOURCE_B, {
        adminResourceList: makeAdminList([]),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(false),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

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
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: makeAdminList([]),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(false),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

      expect(setUserList).toHaveBeenCalledWith({
        dataVersion: DEFAULT_RESOURCE_REFERENCE_LIST.dataVersion,
        items: [{ type: 'dblResource', name: 'Resource A', id: 'uid-a' }],
      });
    });

    it('calls onSelect with the dblEntryUid after writing', async () => {
      const getUserList = vi.fn().mockResolvedValue(makeUserList([]));
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: makeAdminList([]),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(false),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

      expect(onSelect).toHaveBeenCalledWith('uid-a');
    });

    it('does not call setAdminSetting', async () => {
      const getUserList = vi.fn().mockResolvedValue(makeUserList([]));
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: makeAdminList([]),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(false),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

      expect(setAdminSetting).not.toHaveBeenCalled();
    });

    it('falls through to user path when setAdminSetting is undefined even if canWrite is true', async () => {
      const getUserList = vi.fn().mockResolvedValue(makeUserList([]));
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: makeAdminList([]),
        setAdminResourceList: undefined,
        canUserWriteProjectSettings: vi.fn().mockResolvedValue(true),
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

      expect(setUserList).toHaveBeenCalled();
      expect(onSelect).toHaveBeenCalledWith('uid-a');
    });

    it('takes the user path when canUserWriteProjectSettings is undefined', async () => {
      const getUserList = vi.fn().mockResolvedValue(makeUserList([]));
      await selectTextConnection(RESOURCE_A, {
        adminResourceList: makeAdminList([]),
        setAdminResourceList: setAdminSetting,
        canUserWriteProjectSettings: undefined,
        getUserResourceList: getUserList,
        setUserResourceList: setUserList,
        onSelect,
      });

      expect(setUserList).toHaveBeenCalled();
      expect(setAdminSetting).not.toHaveBeenCalled();
    });
  });

  describe('onSelect is optional', () => {
    it('does not throw when onSelect is not provided', async () => {
      const setUserList = vi.fn().mockResolvedValue(undefined);
      await expect(
        selectTextConnection(RESOURCE_A, {
          adminResourceList: makeAdminList([]),
          setAdminResourceList: undefined,
          canUserWriteProjectSettings: vi.fn().mockResolvedValue(false),
          getUserResourceList: vi.fn().mockResolvedValue(makeUserList([])),
          setUserResourceList: setUserList,
        }),
      ).resolves.toBeUndefined();
    });
  });
});
