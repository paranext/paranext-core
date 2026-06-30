import { computeEffectiveStructureProtection } from './structure-protection.util';

describe('computeEffectiveStructureProtection', () => {
  // Parity with use-structure-protection-state.hook.ts truth table (which now calls this function).
  it('is inactive (false) in power mode regardless of other inputs', () => {
    expect(
      computeEffectiveStructureProtection({
        interfaceMode: 'power',
        isAdminProtected: true,
        canAdminToggle: false,
        userSetting: true,
      }),
    ).toBe(false);
  });
  it('is inactive (false) when interfaceMode is undefined', () => {
    expect(
      computeEffectiveStructureProtection({
        interfaceMode: undefined,
        isAdminProtected: true,
        canAdminToggle: false,
        userSetting: undefined,
      }),
    ).toBe(false);
  });
  it('defaults to protected in simple mode when user setting is absent', () => {
    expect(
      computeEffectiveStructureProtection({
        interfaceMode: 'simple',
        isAdminProtected: false,
        canAdminToggle: false,
        userSetting: undefined,
      }),
    ).toBe(true);
  });
  it('admin lock forces protection for a non-admin user', () => {
    expect(
      computeEffectiveStructureProtection({
        interfaceMode: 'simple',
        isAdminProtected: true,
        canAdminToggle: false,
        userSetting: false,
      }),
    ).toBe(true);
  });
  it('admin who can toggle is governed by their own user setting, not the project lock', () => {
    expect(
      computeEffectiveStructureProtection({
        interfaceMode: 'simple',
        isAdminProtected: true,
        canAdminToggle: true,
        userSetting: false,
      }),
    ).toBe(false);
  });
  it('follows the user setting when the project allows changes', () => {
    expect(
      computeEffectiveStructureProtection({
        interfaceMode: 'simple',
        isAdminProtected: false,
        canAdminToggle: false,
        userSetting: false,
      }),
    ).toBe(false);
  });
});
