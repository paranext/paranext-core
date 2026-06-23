// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useStructureProtectionState } from './use-structure-protection-state.mock';

describe('useStructureProtectionState (mock)', () => {
  it('returns the default seeded state (admin can toggle, not admin-locked, user-protected)', () => {
    const { result } = renderHook(() => useStructureProtectionState('project1'));
    expect(result.current.canAdminToggle).toBe(true);
    expect(result.current.isAdminProtected).toBe(false);
    expect(result.current.isProtected).toBe(true);
  });

  it('setUserProtection updates isProtected when not admin-locked', () => {
    const { result } = renderHook(() => useStructureProtectionState('project1'));
    act(() => result.current.setUserProtection(false));
    expect(result.current.isProtected).toBe(false);
    expect(result.current.isAdminProtected).toBe(false);
  });

  it('admin protection overrides the user setting in the derived isProtected', () => {
    const { result } = renderHook(() => useStructureProtectionState('project1'));
    act(() => result.current.setUserProtection(false));
    expect(result.current.isProtected).toBe(false);
    act(() => result.current.setAdminProtection(true));
    expect(result.current.isAdminProtected).toBe(true);
    expect(result.current.isProtected).toBe(true);
  });
});
