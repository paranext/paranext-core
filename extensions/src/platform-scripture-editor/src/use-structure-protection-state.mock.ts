import { useCallback, useState } from 'react';

/**
 * TEMPORARY MOCK of the PT-4012 `useStructureProtectionState` hook.
 *
 * PT-4012 (the real hook), PT-4011 (user-level setting storage), and the admin-permission check are
 * not built yet. This mock holds all state in memory so the structure-protection button can be
 * built and tested against the agreed interface. When the real hook lands, delete this file and
 * import `useStructureProtectionState` from `./use-structure-protection-state.hook` instead — the
 * button does not change.
 */

// ─── MOCK KNOBS — edit by hand to exercise each state; remove when the real hook lands ───
/** `false` → simulate a non-admin (Saroj) who cannot write the project setting. */
const MOCK_CAN_ADMIN_TOGGLE = true;
/** `true` → simulate a project already locked team-wide by the admin. */
const MOCK_INITIAL_ADMIN_PROTECTED = false;
/** PRD row 7: a user is protected by default. */
const MOCK_INITIAL_USER_PROTECTED = true;
// ──────────────────────────────────────────────────────────────────────────────────────

/** Effective structure-protection state consumed by the toggle UI and (later) editor enforcement. */
export type StructureProtectionState = {
  /** `true` → structure is protected (editor enforces protection). */
  isProtected: boolean;
  /** `true` → the admin has locked the project team-wide; the user toggle is disabled. */
  isAdminProtected: boolean;
  /** `true` → the current user may write the project (team-wide) setting. */
  canAdminToggle: boolean;
  /** Set the team-wide project setting (admin only). */
  setAdminProtection: (value: boolean) => void;
  /** Set the personal user setting (used only when the project is not admin-locked). */
  setUserProtection: (value: boolean) => void;
};

/**
 * MOCK. Returns the effective structure-protection state from in-memory values seeded by the knobs
 * above. The project id is accepted for parity with the real hook but unused in the mock (the real
 * hook scopes settings by project id), so it is underscore-prefixed per the unused-arg convention.
 */
export function useStructureProtectionState(
  // Accepted for parity with the real hook signature; the mock does not scope by project
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  projectId: string | undefined,
): StructureProtectionState {
  const [adminProtected, setAdminProtected] = useState(MOCK_INITIAL_ADMIN_PROTECTED);
  const [userProtected, setUserProtected] = useState(MOCK_INITIAL_USER_PROTECTED);

  const setAdminProtection = useCallback((value: boolean) => setAdminProtected(value), []);
  const setUserProtection = useCallback((value: boolean) => setUserProtected(value), []);

  const isAdminProtected = adminProtected;
  const isProtected = isAdminProtected ? true : userProtected;
  const canAdminToggle = MOCK_CAN_ADMIN_TOGGLE;

  return {
    isProtected,
    isAdminProtected,
    canAdminToggle,
    setAdminProtection,
    setUserProtection,
  };
}
