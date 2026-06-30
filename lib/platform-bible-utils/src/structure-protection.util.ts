/** Inputs to {@link computeEffectiveStructureProtection}. */
export type EffectiveStructureProtectionInputs = {
  /** Global `platform.interfaceMode` value; the feature applies only in `'simple'`. */
  interfaceMode: string | undefined;
  /** Project-level `platformScripture.structureProtected` admin setting. */
  isAdminProtected: boolean;
  /** Whether the current user can toggle the admin/project lock. */
  canAdminToggle: boolean;
  /** The user's personal preference; `undefined` when never set. */
  userSetting: boolean | undefined;
};

/**
 * Computes whether structure protection (a.k.a. structure locking) is effectively active.
 *
 * This is the single source of truth for the effective-protection algebra, shared across extensions
 * that cannot import each other directly: the `platform-scripture-editor` structure-protection hook
 * and the `platform-scripture` Scripture Finder PDP both call it.
 *
 * The feature applies in simple interface mode only; in power mode it is always inactive. Within
 * simple mode, an admin project lock that the user cannot toggle forces protection on; otherwise
 * the user's own preference governs (defaulting to on when never set).
 */
export function computeEffectiveStructureProtection({
  interfaceMode,
  isAdminProtected,
  canAdminToggle,
  userSetting,
}: EffectiveStructureProtectionInputs): boolean {
  const isProtectionActive = interfaceMode === 'simple';
  if (!isProtectionActive) return false;
  const effectiveUserSetting = userSetting ?? isProtectionActive;
  return (isAdminProtected && !canAdminToggle) || effectiveUserSetting;
}
