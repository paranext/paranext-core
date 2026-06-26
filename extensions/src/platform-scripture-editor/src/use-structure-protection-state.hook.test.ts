// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type {
  ITextConnectionSettingsProjectDataProvider,
  IUserEditorSettingsProjectDataProvider,
} from 'platform-scripture';
import { useProjectSetting, useProjectDataProvider, useSetting } from '@papi/frontend/react';
import { useStructureProtectionState } from './use-structure-protection-state.hook';

const { mockLoggerError } = vi.hoisted(() => ({ mockLoggerError: vi.fn() }));

vi.mock('@papi/frontend', () => ({
  logger: { error: mockLoggerError },
}));

vi.mock('@papi/frontend/react', () => ({
  useProjectSetting: vi.fn(),
  useProjectDataProvider: vi.fn(),
  useSetting: vi.fn(),
}));

const mockUseProjectSetting = vi.mocked(useProjectSetting);
const mockUseProjectDataProvider = vi.mocked(useProjectDataProvider);
const mockUseSetting = vi.mocked(useSetting);

/** Minimal PlatformError shape — matches the isPlatformError runtime check */
function makePlatformError(): object {
  return { platformErrorVersion: 1, message: 'test error' };
}

const mockSetAdminSetting = vi.fn();
const mockSetUserSetting = vi.fn().mockResolvedValue(undefined);

function makeTextConnectionsPdp(canWrite: boolean): ITextConnectionSettingsProjectDataProvider {
  // Mock object literal cannot satisfy the full interface — cast needed for test isolation
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    canUserWriteProjectTextConnectionSettings: vi.fn().mockResolvedValue(canWrite),
  } as unknown as ITextConnectionSettingsProjectDataProvider;
}

function makeUserEditorSettingsPdp(
  userSetting: boolean | undefined | object,
): IUserEditorSettingsProjectDataProvider {
  // Mock object literal cannot satisfy the full interface — cast needed for test isolation
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    subscribeUserStructureProtected: vi.fn().mockImplementation((_selector, callback) => {
      // Call the callback immediately so the hook state is set before test assertions.
      // Skip undefined — represents "no stored preference"; the mode-aware default applies instead.
      if (userSetting !== undefined) callback(userSetting);
      return Promise.resolve(vi.fn().mockResolvedValue(true));
    }),
    setUserStructureProtected: mockSetUserSetting,
  } as unknown as IUserEditorSettingsProjectDataProvider;
}

/** Cast a partial PDP mock to the full `useProjectDataProvider` return type for test isolation. */
function asProvider(pdp: object): ReturnType<typeof useProjectDataProvider> {
  // Partial PDP mocks can't satisfy the full return type; cast through unknown.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return pdp as unknown as ReturnType<typeof useProjectDataProvider>;
}

/**
 * Builds a user-editor-settings PDP mock that exposes its `subscribe`/`unsubscribe` spies so
 * lifecycle tests can assert on the subscription being established and torn down.
 */
function makeTrackedUserPdp(userSetting: boolean | undefined) {
  const unsubscribe = vi.fn().mockResolvedValue(true);
  const subscribe = vi.fn().mockImplementation((_selector, callback) => {
    if (userSetting !== undefined) callback(userSetting);
    return Promise.resolve(unsubscribe);
  });
  return {
    subscribe,
    unsubscribe,
    pdp: asProvider({
      subscribeUserStructureProtected: subscribe,
      setUserStructureProtected: mockSetUserSetting,
    }),
  };
}

function setup({
  adminSetting = false,
  userSetting = undefined,
  interfaceMode = 'simple',
  canWrite = false,
  textConnectionsPdp = undefined,
}: {
  adminSetting?: boolean | object;
  userSetting?: boolean | undefined | object;
  interfaceMode?: 'simple' | 'power';
  canWrite?: boolean;
  textConnectionsPdp?: ITextConnectionSettingsProjectDataProvider | undefined;
} = {}) {
  mockUseProjectSetting.mockReturnValue([
    // adminSetting may be a PlatformError object in error-path tests, but the mocked tuple's first
    // slot is typed as the boolean setting value, so assert to satisfy the mock signature.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    adminSetting as boolean,
    mockSetAdminSetting,
    undefined,
    false,
  ]);
  // The platform.interfaceMode setting value type is broader than our test literals; widen it.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockUseSetting.mockReturnValue([interfaceMode as string, vi.fn(), vi.fn(), false]);

  // The partial PDP mocks can't satisfy the full useProjectDataProvider return type, so assert
  // each through unknown.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const userPdp = makeUserEditorSettingsPdp(userSetting) as unknown as ReturnType<
    typeof useProjectDataProvider
  >;
  // Same partial-mock assertion as above, for the text-connections PDP.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const textPdp = (textConnectionsPdp ?? makeTextConnectionsPdp(canWrite)) as unknown as ReturnType<
    typeof useProjectDataProvider
  >;
  // The hook calls useProjectDataProvider twice — once per PDP — so return the matching mock by name.
  mockUseProjectDataProvider.mockImplementation((providerName) =>
    providerName === 'platformScripture.userEditorSettings' ? userPdp : textPdp,
  );
}

describe('useStructureProtectionState — truth table', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('row 1: project unset, user unlocked → isStructureProtected=false (user setting wins)', async () => {
    setup({ adminSetting: false, userSetting: false, interfaceMode: 'simple', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(false);
    expect(result.current.isProtectedByAdmin).toBe(false);
  });

  it('row 2: project unset, user locked → isStructureProtected=true (user setting wins)', async () => {
    setup({ adminSetting: false, userSetting: true, interfaceMode: 'simple', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(true);
    expect(result.current.isProtectedByAdmin).toBe(false);
  });

  it('row 3: project unset, admin role, user unlocked → isStructureProtected=false (user setting wins)', async () => {
    setup({ adminSetting: false, userSetting: false, interfaceMode: 'simple', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(false);
    expect(result.current.canAdminToggle).toBe(true);
  });

  it('row 4: project unset, admin role, user locked → isStructureProtected=true (user setting wins)', async () => {
    setup({ adminSetting: false, userSetting: true, interfaceMode: 'simple', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(true);
    expect(result.current.canAdminToggle).toBe(true);
  });

  it('row 5: project LOCKED, user role, any user setting → isStructureProtected=true (project locks)', async () => {
    setup({ adminSetting: true, userSetting: false, interfaceMode: 'simple', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(true);
    expect(result.current.isProtectedByAdmin).toBe(true);
    expect(result.current.canAdminToggle).toBe(false);
  });

  it('row 6: project LOCKED, admin role, user unlocked → isStructureProtected=false (admin override)', async () => {
    setup({ adminSetting: true, userSetting: false, interfaceMode: 'simple', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(false);
    expect(result.current.isProtectedByAdmin).toBe(true);
    expect(result.current.canAdminToggle).toBe(true);
  });

  it("row 7: project LOCKED, admin role, user locked → isStructureProtected=true (admin's choice)", async () => {
    setup({ adminSetting: true, userSetting: true, interfaceMode: 'simple', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(true);
    expect(result.current.isProtectedByAdmin).toBe(true);
    expect(result.current.canAdminToggle).toBe(true);
  });
});

describe('useStructureProtectionState — setters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('setAdminProtection is a no-op when canAdminToggle is false', async () => {
    setup({ adminSetting: false, userSetting: false, canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    act(() => {
      result.current.setAdminProtection(true);
    });
    expect(mockSetAdminSetting).not.toHaveBeenCalled();
  });

  it('setAdminProtection calls setSetting when canAdminToggle is true', async () => {
    setup({ adminSetting: false, userSetting: false, canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    act(() => {
      result.current.setAdminProtection(true);
    });
    expect(mockSetAdminSetting).toHaveBeenCalledWith(true);
  });

  it('setUserProtection calls the PDP setter regardless of role', async () => {
    // non-admin user with a locked project — still can call setUserProtection
    setup({ adminSetting: true, userSetting: true, canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    act(() => {
      result.current.setUserProtection(false);
    });
    expect(mockSetUserSetting).toHaveBeenCalledWith(false);
  });

  it('setUserProtection swallows a rejected PDP setter (logs, does not throw)', async () => {
    mockSetUserSetting.mockRejectedValueOnce(new Error('rpc failed'));
    setup({ adminSetting: false, userSetting: false, canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    await act(async () => {
      result.current.setUserProtection(true);
      // flush the rejected setter's microtask so the hook's .catch runs
      await Promise.resolve();
    });
    expect(mockSetUserSetting).toHaveBeenCalledWith(true);
    expect(mockLoggerError).toHaveBeenCalled();
  });
});

describe('useStructureProtectionState — subscription lifecycle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('unsubscribes from the user setting on unmount', async () => {
    setup({ adminSetting: false, userSetting: true, canWrite: false });
    const { pdp, unsubscribe } = makeTrackedUserPdp(true);
    mockUseProjectDataProvider.mockImplementation((providerName) =>
      providerName === 'platformScripture.userEditorSettings'
        ? pdp
        : asProvider(makeTextConnectionsPdp(false)),
    );
    const { unmount } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(unsubscribe).not.toHaveBeenCalled();
    unmount();
    await act(async () => {});
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('drops the old subscription and re-subscribes (with the new value) when projectId changes', async () => {
    setup({ adminSetting: false, userSetting: true, canWrite: false });
    const first = makeTrackedUserPdp(true); // proj-1: user locked
    const second = makeTrackedUserPdp(false); // proj-2: user unlocked
    const textPdp = asProvider(makeTextConnectionsPdp(false));
    mockUseProjectDataProvider.mockImplementation((providerName, projectId) => {
      if (providerName !== 'platformScripture.userEditorSettings') return textPdp;
      return projectId === 'proj-1' ? first.pdp : second.pdp;
    });
    const { result, rerender } = renderHook(({ id }) => useStructureProtectionState(id), {
      initialProps: { id: 'proj-1' },
    });
    await act(async () => {});
    expect(first.subscribe).toHaveBeenCalledTimes(1);
    expect(result.current.isStructureProtected).toBe(true);

    rerender({ id: 'proj-2' });
    await act(async () => {});
    // old subscription torn down, new one established, and the value reflects proj-2 (not stale proj-1)
    expect(first.unsubscribe).toHaveBeenCalledTimes(1);
    expect(second.subscribe).toHaveBeenCalledTimes(1);
    expect(result.current.isStructureProtected).toBe(false);
  });
});

describe('useStructureProtectionState — edge cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('PlatformError delivered to the subscribe callback is mapped to undefined (mode default applies)', async () => {
    // power-mode default is unlocked; if the error object were stored instead of mapped to undefined
    // it would be truthy and wrongly force isStructureProtected=true
    setup({
      adminSetting: false,
      userSetting: makePlatformError(),
      interfaceMode: 'power',
      canWrite: false,
    });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(false);
  });

  it('PlatformError on admin setting is treated as false and surfaced via adminSettingError', async () => {
    const adminError = makePlatformError();
    setup({ adminSetting: adminError, userSetting: false, canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtectedByAdmin).toBe(false);
    expect(result.current.isStructureProtected).toBe(false);
    expect(result.current.adminSettingError).toBe(adminError);
  });

  it('adminSettingError is undefined when the admin setting loads without error', async () => {
    setup({ adminSetting: true, userSetting: false, canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.adminSettingError).toBeUndefined();
  });

  it('user setting undefined in simple mode defaults to locked (isStructureProtected=true)', async () => {
    setup({
      adminSetting: false,
      userSetting: undefined,
      interfaceMode: 'simple',
      canWrite: false,
    });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(true);
  });

  it('user setting undefined in power mode defaults to unlocked (isStructureProtected=false)', async () => {
    setup({ adminSetting: false, userSetting: undefined, interfaceMode: 'power', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(false);
  });

  it('projectId undefined → canAdminToggle=false and mode-aware default applies', async () => {
    setup({
      adminSetting: false,
      userSetting: undefined,
      interfaceMode: 'simple',
      canWrite: false,
    });
    mockUseProjectDataProvider.mockImplementation(() => undefined);
    const { result } = renderHook(() => useStructureProtectionState(undefined));
    await act(async () => {});
    expect(result.current.canAdminToggle).toBe(false);
    expect(result.current.isStructureProtected).toBe(true); // simple mode default
  });
});

describe('useStructureProtectionState — power mode (feature inactive)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('forces the feature off even when admin-locked and the user setting is true', async () => {
    setup({ adminSetting: true, userSetting: true, interfaceMode: 'power', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtectionActive).toBe(false);
    expect(result.current.isStructureProtected).toBe(false);
    expect(result.current.isProtectedByAdmin).toBe(false);
    expect(result.current.canAdminToggle).toBe(false);
    expect(result.current.adminSettingError).toBeUndefined();
  });

  it('setAdminProtection is a no-op in power mode even for an admin', async () => {
    setup({ adminSetting: false, userSetting: false, interfaceMode: 'power', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    act(() => {
      result.current.setAdminProtection(true);
    });
    expect(mockSetAdminSetting).not.toHaveBeenCalled();
  });

  it('setUserProtection is a no-op in power mode', async () => {
    setup({ adminSetting: false, userSetting: false, interfaceMode: 'power', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    act(() => {
      result.current.setUserProtection(true);
    });
    expect(mockSetUserSetting).not.toHaveBeenCalled();
  });

  it('isProtectionActive is true in simple mode', async () => {
    setup({ adminSetting: false, userSetting: false, interfaceMode: 'simple', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtectionActive).toBe(true);
  });
});
