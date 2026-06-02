import { Button } from 'platform-bible-react';
import { AlertTriangle, Check, Loader2 } from 'lucide-react';

// Provenance (do NOT move into TSDoc): UI-PKG / CAP-UI-003 / SCR-003.
// Source spec: ui-spec-capitalization-setup-link.md (Mixed Cap row only) + ui-state-contracts.md.
// Behaviors: BHV-326 (link opens inventory), BHV-327 (icon + enablement driven by setupComplete),
// BHV-328 (re-render on prop change), BHV-651 (window dedup — performed by the parent on activation).
// Scope: ONLY the Mixed Cap row. The parent CapitalizationSetupForm dialog is owned by feature 7.1.

/**
 * Props for the Mixed Capitalization "setup required" link row.
 *
 * The component is purely presentational: it receives the pre-computed `setupComplete` boolean
 * through props (feature 7.1 produces it) and reports activation through
 * {@link MixedCapitalizationSetupLinkProps.onOpenInventory}. It performs no data fetching — the
 * parent dialog routes the activation through the open-inventory window-dedup factory (BHV-651).
 *
 * @example
 *
 * ```tsx
 * <MixedCapitalizationSetupLink
 *   setupComplete={false}
 *   onOpenInventory={() => openInventory({ projectId, isSBA })}
 *   t={(key, fallback) => localized[key] ?? fallback}
 * />;
 * ```
 */
export type MixedCapitalizationSetupLinkProps = {
  /**
   * Whether Mixed Capitalization setup is complete. Drives both the status icon (check vs warning)
   * and the link's enablement: PT9 gates the link via `link.Enabled = !setupComplete`.
   */
  setupComplete: boolean;
  /**
   * Whether feature 7.1 is currently recomputing `setupComplete`. While true the row shows a
   * loading icon and the link is disabled.
   */
  isComputing?: boolean;
  /**
   * Unique-within-dialog suffix used to wire the status icon's accessible name to the link via
   * `aria-describedby`, so a screen reader announces "Mixed capitalization, Setup required" as one
   * unit (WCAG 1.3.1). Defaults to a stable literal when omitted (single-row usage).
   */
  idSuffix?: string;
  /**
   * Called when the user activates the link. Only invoked when the link is active (`!setupComplete
   * && !isComputing`). The parent routes this through `paratext.openMixedCapitalizationInventory({
   * projectId, isSBA })` (BHV-326 / BHV-651).
   */
  onOpenInventory: () => void;
  /** Localized-strings lookup helper supplied by the caller. */
  t: (key: string, fallback: string) => string;
};

/**
 * The Mixed Capitalization row of the Capitalization Setup-required dialog: a status icon plus a
 * "Mixed capitalization" link that opens the inventory. The icon reflects `setupComplete` (warning
 * when incomplete, check when complete, spinner while computing); the link is active only when
 * setup is incomplete and not currently computing.
 */
export function MixedCapitalizationSetupLink({
  setupComplete,
  isComputing = false,
  idSuffix = 'mixed-capitalization',
  onOpenInventory,
  t,
}: MixedCapitalizationSetupLinkProps) {
  const disabled = setupComplete || isComputing;
  const statusId = `mixed-inventory-status-${idSuffix}`;

  let StatusIcon = AlertTriangle;
  let statusName = t('%mixedCapitalizationInventory_setupLink_setupRequired%', 'Setup required');
  let statusClassName = 'tw:text-amber-500';
  if (isComputing) {
    StatusIcon = Loader2;
    statusName = t('%mixedCapitalizationInventory_setupLink_computing%', 'Computing setup status');
    statusClassName = 'tw:animate-spin tw:text-muted-foreground';
  } else if (setupComplete) {
    StatusIcon = Check;
    statusName = t('%mixedCapitalizationInventory_setupLink_setupComplete%', 'Setup complete');
    statusClassName = 'tw:text-green-600';
  }

  return (
    <div
      data-testid="mixed-capitalization-setup-link"
      className="tw:flex tw:flex-row tw:items-center tw:gap-2"
    >
      <StatusIcon
        id={statusId}
        role="img"
        aria-label={statusName}
        data-testid="mixed-capitalization-setup-link-status-icon"
        className={`tw:h-4 tw:w-4 tw:shrink-0 ${statusClassName}`}
      />
      <Button
        variant="link"
        disabled={disabled}
        aria-disabled={disabled}
        aria-describedby={statusId}
        data-testid="mixed-capitalization-setup-link-link"
        className="tw:h-auto tw:p-0"
        onClick={() => {
          if (!disabled) onOpenInventory();
        }}
      >
        {t('%mixedCapitalizationInventory_setupLink_label%', 'Mixed capitalization')}
      </Button>
    </div>
  );
}

export default MixedCapitalizationSetupLink;
