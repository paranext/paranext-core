import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';

/** Object containing all keys used for localization in this component. */
export const COPYRIGHT_OVERLAY_STRING_KEYS = Object.freeze([
  '%enhancedResources_copyrightOverlay_title%',
  '%enhancedResources_copyrightOverlay_dismiss%',
  '%enhancedResources_copyrightOverlay_emptyMessage%',
] as const);

type CopyrightOverlayLocalizedStringKey = (typeof COPYRIGHT_OVERLAY_STRING_KEYS)[number];
type CopyrightOverlayLocalizedStrings = {
  [key in CopyrightOverlayLocalizedStringKey]?: LocalizedStringValue;
};

export type CopyrightOverlayProps = {
  /** Copyright text supplied by the resource. May contain newlines for paragraph separation. */
  copyrightInfo?: string;
  /**
   * Whether the dialog is currently open. Controlled by the parent (shadcn-style controlled
   * Dialog).
   */
  open?: boolean;
  /**
   * Open-state change handler — fired by the Dialog when the user clicks the close button, presses
   * Escape, or clicks outside the dialog. The parent should map `open === false` to whatever clears
   * its `copyrightOverlayVisible`-equivalent flag.
   */
  onOpenChange?: (open: boolean) => void;
  localizedStringsWithLoadingState?: [CopyrightOverlayLocalizedStrings, boolean];
};

/**
 * Pure presentational copyright overlay shown when the user clicks "More info..." on the copyright
 * ribbon (BHV-310, theme 9 in feature spec). Renders the resource's copyright text in a structured
 * shadcn `Dialog` with title, scrollable body, and dismiss button.
 *
 * [Revised: 2026-04-29] Theme 12 — replaced the in-banner `Alert` with a controlled `Dialog`. The
 * `dismissed` prop was removed in favor of the standard shadcn `open` / `onOpenChange` pair so the
 * parent always mounts the component (no conditional mounting required) and the Dialog handles
 * Esc-to-close and overlay-click-to-close automatically.
 *
 * [Revised: 2026-04-30] SB#3 — `modal={false}` prevents Radix Dialog from locking body
 * `pointer-events` while open. Without this, after closing the dialog (X / Escape / outside-click /
 * Close button), Radix's body-lock cleanup occasionally leaves the underlying ER UI unresponsive
 * because the cleanup races against React state updates from the always-mounted sibling
 * `MediaViewer`/`MarbleGuide` Dialogs in the web-view shell. With `modal={false}`, the visual
 * overlay still renders and Esc/outside-click still close the dialog (Radix preserves those when
 * non-modal), but the body never gets `pointer-events: none`, so there is nothing to leak.
 */
export function CopyrightOverlay({
  copyrightInfo,
  open = false,
  onOpenChange = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: CopyrightOverlayProps) {
  const getLocalizedString = (key: CopyrightOverlayLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const titleText = String(getLocalizedString('%enhancedResources_copyrightOverlay_title%'));
  const dismissText = String(getLocalizedString('%enhancedResources_copyrightOverlay_dismiss%'));
  const emptyMessage = String(
    getLocalizedString('%enhancedResources_copyrightOverlay_emptyMessage%'),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="tw:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
        </DialogHeader>
        <div className="tw:flex tw:max-h-[60vh] tw:flex-col tw:gap-3 tw:overflow-y-auto tw:pr-1">
          {copyrightInfo ? (
            copyrightInfo.split(/\n+/).map((paragraph) => (
              <p key={paragraph} className="tw:text-sm tw:leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="tw:text-sm tw:italic tw:text-muted-foreground">{emptyMessage}</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {dismissText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CopyrightOverlay;
