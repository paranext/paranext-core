// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type {
  ITextConnectionSettingsProjectDataProvider,
  IUserEditorSettingsProjectDataProvider,
} from 'platform-scripture';
import { useProjectSetting, useProjectDataProvider, useSetting } from '@papi/frontend/react';
import { useStructureProtectionState } from './use-structure-protection-state.hook';

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

function setup({
  adminSetting = false as boolean | object,
  userSetting = undefined as boolean | undefined | object,
  interfaceMode = 'simple' as 'simple' | 'power',
  canWrite = false,
  textConnectionsPdp = undefined as ITextConnectionSettingsProjectDataProvider | undefined,
}: {
  adminSetting?: boolean | object;
  userSetting?: boolean | undefined | object;
  interfaceMode?: 'simple' | 'power';
  canWrite?: boolean;
  textConnectionsPdp?: ITextConnectionSettingsProjectDataProvider | undefined;
} = {}) {
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockUseProjectSetting.mockReturnValue([
    adminSetting as boolean,
    mockSetAdminSetting,
    undefined,
    false,
  ]);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockUseSetting.mockReturnValue([interfaceMode as string, vi.fn(), vi.fn(), false]);

  const userPdp = makeUserEditorSettingsPdp(userSetting);
  const textPdp = textConnectionsPdp ?? makeTextConnectionsPdp(canWrite);
  // The hook calls useProjectDataProvider twice — once per PDP — so we switch on the provider name.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockUseProjectDataProvider.mockImplementation((providerName) => {
    if (providerName === 'platformScripture.userEditorSettings')
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return userPdp as unknown as ReturnType<typeof useProjectDataProvider>;
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return textPdp as unknown as ReturnType<typeof useProjectDataProvider>;
  });
}

describe('useStructureProtectionState — truth table', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('row 1: project unset, user unlocked → isProtected=false (user setting wins)', async () => {
    setup({ adminSetting: false, userSetting: false, interfaceMode: 'simple', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtected).toBe(false);
    expect(result.current.isAdminProtected).toBe(false);
  });

  it('row 2: project unset, user locked → isProtected=true (user setting wins)', async () => {
    setup({ adminSetting: false, userSetting: true, interfaceMode: 'simple', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtected).toBe(true);
    expect(result.current.isAdminProtected).toBe(false);
  });

  it('row 3: project unset, admin role, user unlocked → isProtected=false (user setting wins)', async () => {
    setup({ adminSetting: false, userSetting: false, interfaceMode: 'simple', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtected).toBe(false);
    expect(result.current.canAdminToggle).toBe(true);
  });

  it('row 4: project unset, admin role, user locked → isProtected=true (user setting wins)', async () => {
    setup({ adminSetting: false, userSetting: true, interfaceMode: 'simple', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtected).toBe(true);
    expect(result.current.canAdminToggle).toBe(true);
  });

  it('row 5: project LOCKED, user role, any user setting → isProtected=true (project locks)', async () => {
    setup({ adminSetting: true, userSetting: false, interfaceMode: 'simple', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtected).toBe(true);
    expect(result.current.isAdminProtected).toBe(true);
    expect(result.current.canAdminToggle).toBe(false);
  });

  it('row 6: project LOCKED, admin role, user unlocked → isProtected=false (admin override)', async () => {
    setup({ adminSetting: true, userSetting: false, interfaceMode: 'simple', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtected).toBe(false);
    expect(result.current.isAdminProtected).toBe(true);
    expect(result.current.canAdminToggle).toBe(true);
  });

  it("row 7: project LOCKED, admin role, user locked → isProtected=true (admin's choice)", async () => {
    setup({ adminSetting: true, userSetting: true, interfaceMode: 'simple', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtected).toBe(true);
    expect(result.current.isAdminProtected).toBe(true);
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
});

describe('useStructureProtectionState — edge cases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('PlatformError on admin setting is treated as false (not locked)', async () => {
    setup({ adminSetting: makePlatformError(), userSetting: false, canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isAdminProtected).toBe(false);
    expect(result.current.isProtected).toBe(false);
  });

  it('user setting undefined in simple mode defaults to locked (isProtected=true)', async () => {
    setup({
      adminSetting: false,
      userSetting: undefined,
      interfaceMode: 'simple',
      canWrite: false,
    });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtected).toBe(true);
  });

  it('user setting undefined in power mode defaults to unlocked (isProtected=false)', async () => {
    setup({ adminSetting: false, userSetting: undefined, interfaceMode: 'power', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isProtected).toBe(false);
  });

  it('projectId undefined → canAdminToggle=false and mode-aware default applies', async () => {
    setup({
      adminSetting: false,
      userSetting: undefined,
      interfaceMode: 'simple',
      canWrite: false,
    });
    mockUseProjectDataProvider.mockReturnValue(undefined);
    const { result } = renderHook(() => useStructureProtectionState(undefined));
    await act(async () => {});
    expect(result.current.canAdminToggle).toBe(false);
    expect(result.current.isProtected).toBe(true); // simple mode default
  });
});
