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
const mockSetUserStructureProtected = vi.fn().mockResolvedValue(true);

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
    // Immediately invoke the subscriber callback with the current value (as the real subscribe does),
    // then return an unsubscriber.
    subscribeUserStructureProtected: vi.fn(async (_selector, callback) => {
      callback(userSetting);
      return async () => true;
    }),
    setUserStructureProtected: mockSetUserStructureProtected,
  } as unknown as IUserEditorSettingsProjectDataProvider;
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
  // adminSetting may be a PlatformError object to test error handling; cast needed to satisfy mock return type
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const adminSettingAsBool = adminSetting as boolean;
  mockUseProjectSetting.mockReturnValue([
    adminSettingAsBool,
    mockSetAdminSetting,
    undefined,
    false,
  ]);
  // useSetting's return type has string in the first position; cast needed for the narrower literal union type
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const interfaceModeAsString = interfaceMode as string;
  mockUseSetting.mockReturnValue([interfaceModeAsString, vi.fn(), vi.fn(), false]);
  // The hook resolves two project data providers by name; return the matching mock for each.
  mockUseProjectDataProvider.mockImplementation((projectInterface: string) =>
    projectInterface === 'platformScripture.userEditorSettings'
      ? makeUserEditorSettingsPdp(userSetting)
      : (textConnectionsPdp ?? makeTextConnectionsPdp(canWrite)),
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
    expect(result.current.isAdminProtected).toBe(false);
  });

  it('row 2: project unset, user locked → isStructureProtected=true (user setting wins)', async () => {
    setup({ adminSetting: false, userSetting: true, interfaceMode: 'simple', canWrite: false });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(true);
    expect(result.current.isAdminProtected).toBe(false);
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
    expect(result.current.isAdminProtected).toBe(true);
    expect(result.current.canAdminToggle).toBe(false);
  });

  it('row 6: project LOCKED, admin role, user unlocked → isStructureProtected=false (admin override)', async () => {
    setup({ adminSetting: true, userSetting: false, interfaceMode: 'simple', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(false);
    expect(result.current.isAdminProtected).toBe(true);
    expect(result.current.canAdminToggle).toBe(true);
  });

  it("row 7: project LOCKED, admin role, user locked → isStructureProtected=true (admin's choice)", async () => {
    setup({ adminSetting: true, userSetting: true, interfaceMode: 'simple', canWrite: true });
    const { result } = renderHook(() => useStructureProtectionState('proj-1'));
    await act(async () => {});
    expect(result.current.isStructureProtected).toBe(true);
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
    expect(mockSetUserStructureProtected).toHaveBeenCalledWith(false);
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
    expect(result.current.isStructureProtected).toBe(false);
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
