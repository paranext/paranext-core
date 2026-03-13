/* eslint-disable max-classes-per-file -- Related overlay error types kept together */
/**
 * Type definitions for the overlay service, a renderer-only service that manages overlays (context
 * menus, modal dialogs, popovers) rendered in the renderer's top-level document outside iframe
 * boundaries. Extensions running in sandboxed WebView iframes cannot render UI above other content,
 * so this service provides a way for them to request overlays that the renderer hosts on their
 * behalf.
 */

import { LocalizeKey } from 'platform-bible-utils';

// ── Error Types ──

/**
 * Thrown when an overlay is requested from a WebView that is not currently visible (e.g., it is on
 * a background tab). The caller should handle this gracefully since the user cannot interact with
 * an overlay they cannot see.
 */
export class OverlayNotVisibleError extends Error {
  constructor(message?: string) {
    super(message ?? 'Requesting WebView is not visible');
    this.name = 'OverlayNotVisibleError';
  }
}

/**
 * Thrown when an overlay request fails validation (e.g., a context menu with zero items, a modal
 * dialog missing required options, or a popover with invalid anchor coordinates). Callers should
 * fix the request rather than retrying.
 */
export class OverlayValidationError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid overlay request');
    this.name = 'OverlayValidationError';
  }
}

/**
 * Thrown when an overlay's promise is rejected because a new overlay of the same type was requested
 * from the same WebView, replacing the previous one. Only one overlay of each type (context menu,
 * modal dialog, popover) can be active per WebView at a time.
 */
export class OverlayReplacedError extends Error {
  constructor(message?: string) {
    super(message ?? 'Overlay was replaced by a new request');
    this.name = 'OverlayReplacedError';
  }
}

// ── Context Menu Types ──

/** Alias for platform icon names. Currently any string; may become a branded type in the future. */
type PlatformIconName = string;

/**
 * A single item in a context menu. Discriminated union on `type`:
 *
 * - `'item'` — A clickable menu item that returns its `id` when selected.
 * - `'separator'` — A visual divider between groups of items. Has no `id`.
 * - `'submenu'` — A nested menu that expands on hover to show child `items`.
 * - `'checkbox'` — A toggleable item that reports its new `checked` state when selected.
 * - `'radio'` — A radio button within a named `group`. Only one radio in a group can be checked.
 */
export type ContextMenuItem =
  | {
      type: 'item';
      /** Unique identifier returned in {@link ContextMenuResult} when this item is selected */
      id: string;
      /** Display text for the menu item. Can be a plain string or a {@link LocalizeKey} for i18n. */
      label: string | LocalizeKey;
      /** Optional icon displayed to the left of the label */
      icon?: PlatformIconName;
      /** Optional keyboard shortcut hint displayed to the right of the label (display only) */
      shortcut?: string;
      /** Whether the item is grayed out and non-interactive. Defaults to `false`. */
      disabled?: boolean;
      /** Whether to style the item as a destructive/dangerous action (e.g., red text) */
      destructive?: boolean;
    }
  | {
      type: 'separator';
    }
  | {
      type: 'submenu';
      /** Display text for the submenu trigger */
      label: string | LocalizeKey;
      /** Optional icon displayed to the left of the label */
      icon?: PlatformIconName;
      /** Child items displayed when this submenu expands */
      items: ContextMenuItem[];
    }
  | {
      type: 'checkbox';
      /** Unique identifier returned in {@link ContextMenuResult} when this item is toggled */
      id: string;
      /** Display text for the checkbox item */
      label: string | LocalizeKey;
      /** Current checked state. The result will contain the toggled value. */
      checked: boolean;
    }
  | {
      type: 'radio';
      /** Unique identifier returned in {@link ContextMenuResult} when this item is selected */
      id: string;
      /** Display text for the radio item */
      label: string | LocalizeKey;
      /** The value associated with this radio option */
      value: string;
      /** Group name that links related radio items. Only one item per group can be checked. */
      group: string;
      /** Whether this radio item is currently selected */
      checked: boolean;
    };

/**
 * Request payload for {@link IOverlayService.showContextMenu}.
 *
 * If `position` is omitted, the menu renders at the top-left of the requesting WebView's iframe.
 * Coordinates are relative to the requesting WebView's iframe and are translated to document-level
 * coordinates by the overlay service.
 */
export interface ContextMenuRequest {
  /** The menu items to display */
  items: ContextMenuItem[];
  /**
   * Position to display the menu, in pixels relative to the requesting WebView's iframe origin.
   * Automatically translated to document-relative coordinates and clamped to the viewport.
   */
  position?: { x: number; y: number };
}

/**
 * Result returned when the user selects an item from a context menu.
 *
 * For checkbox items, `checked` contains the new toggled state. For all other item types, only
 * `itemId` is populated.
 */
export type ContextMenuResult = {
  /** The `id` of the selected {@link ContextMenuItem} */
  itemId: string;
  /** For checkbox items, the new checked state after toggling. Undefined for non-checkbox items. */
  checked?: boolean;
};

// ── Modal Dialog Types ──

/**
 * The supported modal dialog types. Each type has corresponding options in
 * {@link ModalDialogOptions} and a result type in {@link ModalDialogResponse}:
 *
 * - `'alert'` — Informational dialog with a single OK button. Always resolves `true`.
 * - `'confirm'` — Yes/no dialog. Resolves `true` (OK) or `false` (Cancel).
 */
export type ModalDialogType = 'alert' | 'confirm';

/**
 * Options for each modal dialog type, keyed by {@link ModalDialogType}. Use as
 * `ModalDialogOptions[T]` where `T extends ModalDialogType` to get the options for a specific
 * dialog type.
 */
export interface ModalDialogOptions {
  /** Options for an alert dialog (informational, single OK button) */
  alert: {
    /** Optional title displayed at the top of the dialog */
    title?: string | LocalizeKey;
    /** The message body displayed in the dialog */
    message: string | LocalizeKey;
    /** Custom label for the OK button. Defaults to a localized "OK". */
    okLabel?: string | LocalizeKey;
  };
  /** Options for a confirm dialog (OK/Cancel) */
  confirm: {
    /** Optional title displayed at the top of the dialog */
    title?: string | LocalizeKey;
    /** The message body displayed in the dialog */
    message: string | LocalizeKey;
    /** Custom label for the OK button. Defaults to a localized "OK". */
    okLabel?: string | LocalizeKey;
    /** Custom label for the Cancel button. Defaults to a localized "Cancel". */
    cancelLabel?: string | LocalizeKey;
    /** Whether to style the OK button as a destructive action (e.g., red) */
    destructive?: boolean;
  };
}

/**
 * Response types for each modal dialog type, keyed by {@link ModalDialogType}. Use as
 * `ModalDialogResponse[T]` where `T extends ModalDialogType` to get the result type. The service
 * method returns `ModalDialogResponse[T] | undefined`, where `undefined` means the dialog was
 * dismissed without a response.
 */
export interface ModalDialogResponse {
  /** Alert dialogs always resolve `true` (the user acknowledged the message) */
  alert: true;
  /** Confirm dialogs resolve `true` for OK, `false` for Cancel */
  confirm: boolean;
}

// ── Popover Types ──

/**
 * An action button displayed at the bottom of a `'card'`-type popover. When clicked, the popover
 * resolves with this action's `id` via {@link IOverlayService.onPopoverDismissed}.
 */
export type PopoverAction = {
  /** Unique identifier returned when this action is clicked */
  id: string;
  /** Button label text */
  label: string | LocalizeKey;
  /** Visual style variant. Defaults to `'default'`. */
  variant?: 'default' | 'destructive' | 'secondary';
};

/**
 * A segment of styled text within a `'richText'`-type {@link PopoverContent}. Runs are concatenated
 * to form the popover body, allowing inline formatting.
 */
export type RichTextRun = {
  /** The text content of this run */
  text: string | LocalizeKey;
  /** Whether to render this run in bold */
  bold?: boolean;
  /** Whether to render this run in italic */
  italic?: boolean;
  /** Whether to style this run as a Scripture reference (e.g., monospace or linked) */
  scriptureRef?: boolean;
};

/**
 * The content to display inside a popover. Discriminated union on `type`:
 *
 * - `'text'` — Simple text with an optional title and a plain-text body.
 * - `'list'` — A bulleted list of items with an optional title.
 * - `'description'` — A term/detail list (like a `<dl>`), useful for metadata or properties.
 * - `'richText'` — Styled text composed of {@link RichTextRun} segments with inline formatting.
 * - `'card'` — A card with title, body text, and one or more {@link PopoverAction} buttons.
 */
export type PopoverContent =
  | {
      type: 'text';
      /** Optional heading displayed above the body */
      title?: string | LocalizeKey;
      /** Plain-text body content */
      body: string | LocalizeKey;
    }
  | {
      type: 'list';
      /** Optional heading displayed above the list */
      title?: string | LocalizeKey;
      /** List items to display */
      items: (string | LocalizeKey)[];
    }
  | {
      type: 'description';
      /** Optional heading displayed above the description list */
      title?: string | LocalizeKey;
      /** Term/detail pairs rendered as a description list */
      entries: { term: string | LocalizeKey; detail: string | LocalizeKey }[];
    }
  | {
      type: 'richText';
      /** Optional heading displayed above the rich text */
      title?: string | LocalizeKey;
      /** Rich text segments concatenated to form the body */
      body: RichTextRun[];
    }
  | {
      type: 'card';
      /** Optional heading displayed at the top of the card */
      title?: string | LocalizeKey;
      /** Card body text */
      body: string | LocalizeKey;
      /** Action buttons displayed at the bottom of the card */
      actions: PopoverAction[];
    };

/**
 * Request payload for {@link IOverlayService.showPopover}. Describes where to anchor the popover,
 * what content to display, and behavioral options.
 */
export interface PopoverRequest {
  /**
   * Anchor rectangle in pixels relative to the requesting WebView's iframe origin. The popover is
   * positioned adjacent to this rectangle on the specified `side`. If `width`/`height` are
   * provided, the popover aligns to the full rectangle; otherwise it anchors to the point `(x,
   * y)`.
   */
  anchor: { x: number; y: number; width?: number; height?: number };
  /** Preferred side of the anchor to place the popover. Defaults to `'bottom'`. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** The content to display inside the popover. Can be updated later via `updatePopover`. */
  content: PopoverContent;
  /** Whether clicking outside the popover dismisses it. Defaults to `true`. */
  dismissOnClickOutside?: boolean;
  /**
   * Automatically dismiss the popover after this many milliseconds. Useful for transient
   * notifications. If omitted or `0`, the popover stays open until explicitly dismissed.
   */
  dismissAfterMs?: number;
  /** Maximum width of the popover in pixels. If omitted, uses a default max width. */
  maxWidth?: number;
  /** Whether to display an arrow pointing from the popover toward the anchor. Defaults to `true`. */
  showArrow?: boolean;
}

// ── Service Interface ──

/**
 * JSDOC SOURCE overlayService
 *
 * Service for showing overlays (context menus, modal dialogs, popovers) that render outside iframe
 * boundaries in the renderer's top-level document. Renderer-only service.
 *
 * Extensions in sandboxed WebView iframes cannot render UI above other content or outside their
 * iframe bounds. This service accepts overlay requests from WebViews, translates their
 * iframe-relative coordinates to document-level coordinates, and renders the overlay in the
 * renderer's React tree. Each method returns a promise that resolves when the user interacts with
 * the overlay or it is dismissed.
 *
 * Only one overlay of each type (context menu, modal dialog, popover) can be active per WebView at
 * a time. Requesting a new overlay of the same type from the same WebView replaces the previous one
 * and rejects its promise with {@link OverlayReplacedError}.
 */
export interface IOverlayService {
  /**
   * Shows a context menu with the given items. The returned promise resolves with the user's
   * selection or `undefined` if the menu was dismissed without a selection.
   *
   * @param request The menu items and optional position
   * @param webViewId The ID of the WebView requesting the context menu. Pass `globalThis.webViewId`
   *   from within a WebView iframe.
   * @returns The selected item result, or `undefined` if dismissed
   * @throws {OverlayValidationError} If the request has no items
   * @throws {OverlayReplacedError} If replaced by another context menu from the same WebView
   */
  showContextMenu(
    request: ContextMenuRequest,
    webViewId: string,
  ): Promise<ContextMenuResult | undefined>;
  /**
   * Shows a context menu built from a registered menu contribution. Fetches the menu definition
   * from the menu data service using `menuId` (typically a `webViewType`), converts it to
   * {@link ContextMenuItem} entries, and delegates to {@link showContextMenu}. Returns `undefined` if
   * no context menu is defined for the given `menuId` or if the menu has no items.
   *
   * @param menuId The webViewType identifier to look up in the menu data service
   * @param webViewId The ID of the WebView requesting the context menu. Pass `globalThis.webViewId`
   *   from within a WebView iframe.
   * @param context Optional context including the position for the menu
   * @returns The selected item result, or `undefined` if dismissed or no menu found
   */
  showContextMenuFromContribution(
    menuId: string,
    webViewId: string,
    context?: { position?: { x: number; y: number } },
  ): Promise<ContextMenuResult | undefined>;
  /**
   * Shows a modal dialog of the specified type. The returned promise resolves with the user's
   * response or `undefined` if the dialog was dismissed.
   *
   * @param dialogType The type of dialog to show (`'alert'` or `'confirm'`)
   * @param options Configuration for the dialog, typed according to `dialogType`
   * @param webViewId Optional ID of the WebView requesting the dialog. Used for one-per-WebView
   *   enforcement. Pass `globalThis.webViewId` from within a WebView iframe.
   * @returns The dialog result typed according to `dialogType`, or `undefined` if dismissed
   * @throws {OverlayValidationError} If required options are missing
   * @throws {OverlayReplacedError} If replaced by another modal from the same WebView
   */
  showModalDialog<T extends ModalDialogType>(
    dialogType: T,
    options: ModalDialogOptions[T],
    webViewId?: string,
  ): Promise<ModalDialogResponse[T] | undefined>;
  /**
   * Shows a popover anchored to the specified position. Unlike context menus and modals, popovers
   * return immediately with an overlay ID rather than waiting for dismissal. Use
   * {@link onPopoverDismissed} to await the result, {@link updatePopover} to change content, and
   * {@link dismissPopover} to close it programmatically.
   *
   * @param request The popover anchor, content, and behavioral options
   * @param webViewId The ID of the WebView requesting the popover. Pass `globalThis.webViewId` from
   *   within a WebView iframe.
   * @returns The overlay ID string, usable with other popover methods
   * @throws {OverlayValidationError} If the request is invalid
   * @throws {OverlayReplacedError} If replaced by another popover from the same WebView
   */
  showPopover(request: PopoverRequest, webViewId: string): Promise<string>;
  /**
   * Replaces the content of an existing popover without closing and reopening it. Useful for
   * updating status messages or showing loading progress.
   *
   * @param overlayId The overlay ID returned by {@link showPopover}
   * @param content The new content to display
   * @throws {Error} If no popover with the given ID exists
   */
  updatePopover(overlayId: string, content: PopoverContent): Promise<void>;
  /**
   * Programmatically dismisses a popover, resolving its {@link onPopoverDismissed} promise with
   * `undefined`. No-op if the popover has already been dismissed or does not exist.
   *
   * @param overlayId The overlay ID returned by {@link showPopover}
   */
  dismissPopover(overlayId: string): Promise<void>;
  /**
   * Returns a promise that resolves when the specified popover is dismissed. Resolves with the
   * {@link PopoverAction} `id` if the user clicked an action button, or `undefined` if the popover
   * was dismissed by clicking outside, calling {@link dismissPopover}, or via auto-dismiss timer.
   * Resolves immediately with `undefined` if the overlay ID is not found (already dismissed).
   *
   * @param overlayId The overlay ID returned by {@link showPopover}
   * @returns The action ID that triggered dismissal, or `undefined`
   * @throws {OverlayReplacedError} If the popover was replaced by a new one from the same WebView
   */
  onPopoverDismissed(overlayId: string): Promise<string | undefined>;
}

// ── Internal Overlay Store Types ──

/**
 * Internal representation of an active overlay stored in the overlay store. Each entry holds the
 * data needed to render the overlay plus `resolve`/`reject` callbacks that settle the promise
 * returned to the caller of the service method.
 *
 * Discriminated union on `type`:
 *
 * - `'contextMenu'` — An active context menu with translated position and menu items.
 * - `'modalDialog'` — An active modal dialog with its type-specific options.
 * - `'popover'` — An active popover with mutable `content` (updatable via `updatePopover`).
 *
 * UI components read entries from the overlay store to render overlays, then call `resolve` or
 * `reject` when the user interacts with or dismisses them.
 */
export type OverlayEntry =
  | {
      type: 'contextMenu';
      /** Unique overlay identifier generated by the service */
      id: string;
      /** The WebView that requested this overlay. Used to enforce one-per-type-per-WebView. */
      webViewId: string;
      /** Menu items to render */
      items: ContextMenuItem[];
      /** Document-relative position (already translated from iframe coordinates and clamped) */
      position: { x: number; y: number };
      /** Settles the caller's promise with the selected item, or `undefined` if dismissed */
      resolve: (result: ContextMenuResult | undefined) => void;
      /** Rejects the caller's promise (e.g., with {@link OverlayReplacedError}) */
      reject: (error: Error) => void;
    }
  | {
      type: 'modalDialog';
      /** Unique overlay identifier generated by the service */
      id: string;
      /** The WebView that requested this overlay. Used to enforce one-per-type-per-WebView. */
      webViewId: string;
      /** Which dialog variant to render */
      dialogType: ModalDialogType;
      /** Type-specific dialog configuration */
      options: ModalDialogOptions[ModalDialogType];
      /**
       * Settles the caller's promise with the dialog result. Typed as `unknown` because the generic
       * `T` from `showModalDialog<T>` is not preserved in the store entry; the service widens it.
       */
      resolve: (result: unknown) => void;
      /** Rejects the caller's promise (e.g., with {@link OverlayReplacedError}) */
      reject: (error: Error) => void;
    }
  | {
      type: 'popover';
      /** Unique overlay identifier generated by the service */
      id: string;
      /** The WebView that requested this overlay. Used to enforce one-per-type-per-WebView. */
      webViewId: string;
      /** The original request, retained for reference (e.g., `dismissAfterMs`, `side`) */
      request: PopoverRequest;
      /** Current popover content. Mutable — updated in place by `updateOverlayContent`. */
      content: PopoverContent;
      /** Document-relative position (already translated from iframe coordinates and clamped) */
      position: { x: number; y: number };
      /**
       * Settles the popover's internal promise and the `onPopoverDismissed` promise. Called with
       * the {@link PopoverAction} `id` if the user clicked an action, or `undefined` if dismissed.
       */
      resolve: (actionId: string | undefined) => void;
      /** Rejects the caller's promise (e.g., with {@link OverlayReplacedError}) */
      reject: (error: Error) => void;
    };
