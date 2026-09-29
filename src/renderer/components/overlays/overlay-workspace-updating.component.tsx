import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { useWindowBlockingOverlay } from '@renderer/hooks/use-window-blocking-overlay.hook';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { getToolbarHeight } from '@renderer/components/toolbar-height.util';
import { CANCEL_ENTER_ZOOM_STYLE } from '@renderer/components/overlays/full-screen-dialog.util';
import { getDockLayoutSync } from '@renderer/services/web-view.service-shard';
import { getNavigationTargetWebView } from '@renderer/services/window.service-shard';
import {
  getWorkspaceUpdating,
  subscribeToWorkspaceUpdating,
} from '@renderer/services/workspace-updating-store';
import { logger } from '@shared/services/logger.service';
import { Dialog, DialogContent, DialogTitle, Spinner, Z_INDEX_MODAL } from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { VisuallyHidden } from 'radix-ui';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const WORKSPACE_UPDATING_KEY: LocalizeKey = '%overlay_workspaceUpdating%';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [WORKSPACE_UPDATING_KEY];

/** Z-index below modals so modal dialogs remain accessible during a project switch */
const Z_INDEX_WORKSPACE_UPDATING = Z_INDEX_MODAL - 1;

/**
 * Overrides `DialogContent`'s centered rounded card into the cover itself: an opaque layer inset
 * from the window edges by the `style` the component supplies, with its contents centered.
 *
 * Width and height come from those insets, so `tw:w-auto` has to displace the card's `tw:w-full` —
 * `left` and `width` together would win over `right` and leave the cover overhanging the window.
 * `ConnectionLostOverlay` overrides the same card the same way, for a layer that covers everything
 * rather than one inset below the toolbar.
 */
const COVER_CONTENT =
  'tw:fixed tw:top-0 tw:start-0 tw:flex tw:h-auto tw:w-auto tw:max-w-none tw:sm:max-w-none tw:translate-x-0 tw:rtl:translate-x-0 tw:translate-y-0 tw:items-center tw:justify-center tw:gap-0 tw:rounded-none tw:bg-background tw:p-0 tw:text-foreground tw:ring-0';

/**
 * Neutralizes the backdrop `DialogContent` always renders. The cover is opaque over the area it
 * covers and shows the toolbar untouched above it, so the built-in `tw:bg-black/10` + backdrop blur
 * would dim and blur the toolbar — a wash this state never had.
 */
const NEUTRALIZED_BACKDROP = 'tw:bg-transparent tw:supports-backdrop-filter:backdrop-blur-none';

type Props = { label: string; isPowerMode: boolean };

/**
 * Whether an element sits inside the dock's tab-content area — a pane's own DOM, including a web
 * view's iframe — rather than window chrome (the toolbar, a dialog's trigger button, a menu). Every
 * tab's rendered content is wrapped in a `data-tab-id` element (`PlatformPanel`); tab headers and
 * anything outside the dock carry no such ancestor.
 */
function isInsideDockPane(element: Element): boolean {
  return !!element.closest('[data-tab-id]');
}

/**
 * The cover shown while the active project is switching: a spinner and a line of text over the dock
 * client area.
 *
 * A Radix modal dialog rather than a plain positioned `div`, for the focus trap. The cover paints
 * over the panes but takes nothing away from a web view's iframe, so without the trap the keyboard
 * stays inside a pane nobody can see: a content-zoom chord typed there still reaches that view's
 * bootstrap and persists a zoom level for a hidden pane, and every other in-view shortcut is
 * likewise still live. The trap moves focus onto the cover, keeps Tab inside it, and hands focus
 * back to whatever held it when the switch ends. Escape and interact-outside are prevented: this
 * state is not dismissable, it ends when the switch does.
 *
 * Being a modal dialog also makes the app behind the cover `aria-hidden` and stops pointers
 * reaching it — the toolbar included, though the cover leaves it visible. That is the same
 * containment the connection-lost and first-run covers have, and the window is already registered
 * as blocked while this is up. A modal dialog raised _during_ the switch is unaffected: it mounts
 * later, so it takes the focus trap and the top layer, which is what
 * {@link Z_INDEX_WORKSPACE_UPDATING} is for.
 */
export function WorkspaceUpdatingOverlayPresentational({ label, isPowerMode }: Props) {
  // Captured during the first render, which is before the focus trap has moved focus anywhere, so
  // this is whatever the keyboard was in when the switch started. A ref set from an effect would be
  // too late: the trap's own effect is a child's, and children's effects run first.
  const [elementFocusedBeforeCover] = useState(() =>
    document.activeElement instanceof HTMLElement ? document.activeElement : undefined,
  );

  return (
    <Dialog open onOpenChange={() => {}}>
      <DialogContent
        data-testid="workspace-updating-cover"
        showCloseButton={false}
        className={COVER_CONTENT}
        overlayClassName={NEUTRALIZED_BACKDROP}
        // There is nothing to describe beyond the label, and Radix asks for this explicitly rather
        // than leaving `aria-describedby` pointing at an element that does not exist.
        aria-describedby={undefined}
        // Inline insets rather than the `tw:top-12 tw:right-2 tw:bottom-2 tw:left-2` class form,
        // which for some reason did not work. The top value clears the toolbar; the other three
        // allow for the window borders. 8px insets would match the border size, but some content
        // can drift into the border area and make the border look dirty at that inset, so these are
        // 2px — worth revisiting once that drift is cleaned up.
        style={{
          ...CANCEL_ENTER_ZOOM_STYLE,
          zIndex: Z_INDEX_WORKSPACE_UPDATING,
          top: getToolbarHeight(isPowerMode),
          right: 2,
          bottom: 2,
          left: 2,
        }}
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        // `DialogContent`'s modal path answers close-autofocus by focusing the dialog's trigger, and
        // this cover has none: it opens on a project switch, not on a click. Handing focus back is
        // therefore this component's job.
        //
        // The captured element is only worth restoring when the switch left the user inside a pane:
        // window chrome (the toolbar, a dialog's own trigger button) is often still connected after
        // the switch — the toolbar survives it, unlike the pane the switch was for — but it is never
        // where the keyboard belongs once a project switch ends. So a chrome element, and an element
        // the switch's own tab replacement disconnected, both hand focus to the active editor's web
        // view instead (see `isInsideDockPane`). For a web view that is its iframe, so the view
        // decides where inside itself the keyboard lands, and its own focus() call still wins
        // whenever it runs after this one.
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (
            elementFocusedBeforeCover?.isConnected &&
            isInsideDockPane(elementFocusedBeforeCover)
          ) {
            elementFocusedBeforeCover.focus();
            return;
          }
          const activeWebView = getNavigationTargetWebView();
          if (!activeWebView) return;
          try {
            getDockLayoutSync().focusTab(activeWebView.id);
          } catch (e) {
            logger.warn(
              `WorkspaceUpdatingOverlay could not focus the active web view ${activeWebView.id} after the cover closed: ${getErrorMessage(e)}`,
            );
          }
        }}
      >
        {/* The dialog needs an accessible name, and the message is the only text there is. Hidden
            rather than wrapping the visible copy, so the live region below stays the one thing a
            screen reader announces as the cover appears. */}
        <VisuallyHidden.Root asChild>
          <DialogTitle>{label}</DialogTitle>
        </VisuallyHidden.Root>
        <div role="status" className="tw:flex tw:flex-col tw:items-center tw:gap-3">
          <Spinner />
          <p className="tw:text-sm tw:font-medium">{label}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// TODO(gating-surface-latch-audit): the other full-area gating surfaces in the same `Main` block
// (`FirstRunOverlay`, `OverlayHost`, `OnboardingTour`) stand down once the connection-lost state
// latches; this one does not, and has never been examined against that rule. It is a bounded
// (30 s local leash) `role="status"` spinner rather than a focus-trapping dialog, so it is not an
// obvious instance of the same problem — but it is not an established exception either. See
// `adr-connection-lost-is-renderer-local` in `.context/standards/Architecture-Decisions.md`.
export function WorkspaceUpdatingOverlay() {
  const [isUpdating, setIsUpdating] = useState(getWorkspaceUpdating);

  const syncState = useCallback(() => {
    setIsUpdating(getWorkspaceUpdating());
  }, []);

  useEffect(() => {
    syncState();
    return subscribeToWorkspaceUpdating(syncState);
  }, [syncState]);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const isPowerMode = useIsPowerMode();

  useWindowBlockingOverlay(isUpdating);

  if (!isUpdating) return undefined;

  // Bypasses OverlayHost intentionally: this overlay must cover the editor content area.
  // Rendered below modals (Z_INDEX_MODAL - 1) so any modal that appears during the transition
  // remains accessible. A future cleanup could extend the OverlayHost type system to include
  // a loadingSpinner type.
  return createPortal(
    <WorkspaceUpdatingOverlayPresentational
      label={localizedStrings[WORKSPACE_UPDATING_KEY]}
      isPowerMode={isPowerMode}
    />,
    document.body,
  );
}

export default WorkspaceUpdatingOverlay;
