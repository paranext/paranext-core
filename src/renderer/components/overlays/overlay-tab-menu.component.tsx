/**
 * Overlay tab menu component. Renders a WebView's tab menu in the renderer's top-level document,
 * below the rectangle of the trigger the WebView reported (see `IOverlayService.showTabMenu`), with
 * `AnchoredTabMenu` from `platform-bible-react`.
 *
 * Contains both the presentational component (OverlayTabMenuPresentational, exported for tests) and
 * the store-connected component (OverlayTabMenu) that connects to the overlay store.
 */

import { markOverlayFocusReturnIfFocusInside } from '@renderer/services/overlays/overlay-focus-return.util';
import { resolveAndRemoveOverlay } from '@renderer/services/overlays/overlay-store';
import {
  OverlayEntry,
  TabMenuTriggerRect,
} from '@renderer/services/overlays/overlay.service-model';
import { isWindowBlurPress } from '@renderer/services/overlays/window-blur-press.util';
import { logger } from '@shared/services/logger.service';
import { AnchoredTabMenu } from 'platform-bible-react/experimental';
import {
  getErrorMessage,
  type Localized,
  type MenuItemContainingCommand,
  type MultiColumnMenu,
} from 'platform-bible-utils';
import { Component, PropsWithChildren, ReactNode, useCallback, useRef } from 'react';

/** Props for the presentational OverlayTabMenuPresentational component */
export type OverlayTabMenuPresentationalProps = {
  /** The localized menu to show */
  menu: Localized<MultiColumnMenu>;
  /** The trigger's rectangle in this document; the menu opens below it, aligned with its start */
  anchor: TabMenuTriggerRect;
  /** Whether the menu opens with its first item focused, because the keyboard opened it */
  focusFirstItem?: boolean;
  /** Called when the user picks an item */
  onSelect: (item: Localized<MenuItemContainingCommand>) => void;
  /**
   * Called whenever the menu closes, including right after a pick (after `onSelect`). Ignore it if
   * the pick was already handled.
   */
  onDismiss: () => void;
  /**
   * Called when the user presses Escape in the menu or one of its submenus, just before
   * {@link onDismiss}. Lets the owner tell an Escape close apart from a click away.
   */
  onEscape?: () => void;
  /**
   * Id of the overlay this renders, written to the menu's content and its submenus' content as
   * `data-overlay-id` so the overlay service can tell whether focus is inside this overlay's own
   * content rather than another's.
   */
  overlayId?: string;
};

/**
 * Pure presentational tab menu. Has no dependency on the overlay store; use it directly in tests.
 * For production rendering via the overlay service, use {@link OverlayTabMenu}.
 */
export function OverlayTabMenuPresentational({
  menu,
  anchor,
  focusFirstItem,
  onSelect,
  onDismiss,
  onEscape,
  overlayId,
}: OverlayTabMenuPresentationalProps) {
  return (
    <AnchoredTabMenu
      menuData={menu}
      anchor={anchor}
      focusFirstItem={focusFirstItem}
      // Only command items reach this handler; submenu items open their submenu
      onSelectMenuItem={onSelect}
      onClose={onDismiss}
      showSectionHeadings
      contentProps={{
        'data-overlay-id': overlayId,
        'data-overlay-tab-menu': '',
        onEscapeKeyDown: () => onEscape?.(),
        // The shared wrappers turn a window blur into an outside press. The overlay service owns
        // blur dismissal for this surface, so that press is ignored here.
        onPointerDownOutside: (event) => {
          if (isWindowBlurPress(event.detail.originalEvent)) event.preventDefault();
        },
      }}
      submenuContentProps={{
        'data-overlay-id': overlayId,
        'data-overlay-tab-menu': '',
        // Escape in a submenu closes the whole menu through the root's open state
        onEscapeKeyDown: () => onEscape?.(),
      }}
    />
  );
}

type OverlayTabMenuErrorBoundaryProps = PropsWithChildren<{
  /** Id of the tab menu overlay being guarded */
  overlayId: string;
}>;

/**
 * Keeps a tab menu that fails to render from taking the window down with it. The menu data comes
 * from a WebView and `validateTabMenu` refuses the shapes known to throw, so this is the net for
 * anything it misses: it logs the failure and settles the overlay as closed without a pick.
 *
 * Deliberately hook-free, like `WebViewErrorBoundary`: a hook here would run above the catch.
 */
class OverlayTabMenuErrorBoundary extends Component<
  OverlayTabMenuErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: OverlayTabMenuErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    const { overlayId } = this.props;
    logger.error(`Tab menu overlay ${overlayId} failed to render: ${getErrorMessage(error)}`);
    resolveAndRemoveOverlay(overlayId, 'tabMenu', undefined);
  }

  render(): ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;
    return hasError ? undefined : children;
  }
}

type OverlayTabMenuProps = {
  overlay: Extract<OverlayEntry, { type: 'tabMenu' }>;
};

/**
 * Production tab menu component, rendered by `OverlayHost`. Settles the overlay with the picked
 * item or with `undefined` when the menu closes, and delegates rendering to
 * {@link OverlayTabMenuPresentational} inside an error boundary of its own.
 */
export function OverlayTabMenu({ overlay }: OverlayTabMenuProps) {
  const hasResolved = useRef(false);

  const handleSelect = useCallback(
    (item: Localized<MenuItemContainingCommand>) => {
      if (hasResolved.current) return;
      hasResolved.current = true;
      resolveAndRemoveOverlay(overlay.id, overlay.type, item);
    },
    [overlay],
  );

  const handleDismiss = useCallback(() => {
    if (hasResolved.current) return;
    hasResolved.current = true;
    resolveAndRemoveOverlay(overlay.id, overlay.type, undefined);
  }, [overlay]);

  const handleEscape = useCallback(() => {
    // Radix reports Escape first and the dismissal settles the overlay; a later report must not
    // leave a mark behind
    if (hasResolved.current) return;
    markOverlayFocusReturnIfFocusInside(overlay.id);
  }, [overlay]);

  return (
    <OverlayTabMenuErrorBoundary overlayId={overlay.id}>
      <OverlayTabMenuPresentational
        menu={overlay.menu}
        anchor={overlay.anchor}
        focusFirstItem={overlay.focusFirstItem}
        onSelect={handleSelect}
        onDismiss={handleDismiss}
        onEscape={handleEscape}
        overlayId={overlay.id}
      />
    </OverlayTabMenuErrorBoundary>
  );
}
