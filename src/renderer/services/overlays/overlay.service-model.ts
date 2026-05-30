/**
 * Type definitions for the overlay service, a renderer-only service that manages overlays (context
 * menus, popovers, combo boxes) rendered in the renderer's top-level document outside iframe
 * boundaries. Extensions running in sandboxed WebView iframes cannot render UI above other content,
 * so this service provides a way for them to request overlays that the renderer hosts on their
 * behalf.
 */

import { LocalizeKey, PlatformError } from 'platform-bible-utils';
import type { ReactElement } from 'react';
import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';

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
 * The content to display inside a popover. Discriminated union on `type`:
 *
 * - `'text'` — Simple text with an optional title and a plain-text body.
 * - `'markdown'` — Markdown content rendered via `markdown-to-jsx`. Handles its own title via `#`
 *   headings. Replaces the former `list`, `description`, and `richText` types.
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
      type: 'markdown';
      /** Markdown content. Rendered via markdown-to-jsx. Use `#` headings for titles. */
      markdown: string | LocalizeKey;
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
   * notifications. If omitted, the popover stays open until explicitly dismissed. Must be
   * positive.
   */
  dismissAfterMs?: number;
  /** Maximum width of the popover in pixels. If omitted, uses a default max width. */
  maxWidth?: number;
  /** Whether to display an arrow pointing from the popover toward the anchor. Defaults to `true`. */
  showArrow?: boolean;
}

// ── Quick Pick Types ──

/**
 * A single item in a combo box. Items are displayed in a searchable, filterable list. The user
 * types to filter and selects one item.
 */
export type ComboBoxItem = {
  /** Unique identifier returned when this item is selected */
  id: string;
  /** Primary display text (e.g., marker code like "ft") */
  label: string | LocalizeKey;
  /** Secondary description text displayed below the label */
  description?: string | LocalizeKey;
  /** Optional icon displayed to the left of the label */
  icon?: string;
  /** Optional badge text (e.g., "Deprecated", "Disallowed") */
  badge?: string | LocalizeKey;
  /** Optional group key for visual sectioning with group headers */
  group?: string;
  /** Whether the item is grayed out and non-selectable. Defaults to false. */
  disabled?: boolean;
};

/** Request payload for {@link IOverlayService.showComboBox}. */
export interface ComboBoxRequest {
  /** The selectable items to display */
  items: ComboBoxItem[];
  /**
   * Anchor position in pixels relative to the requesting WebView's iframe origin. The combo box is
   * positioned adjacent to this point. If omitted, centers in the viewport.
   */
  anchor?: { x: number; y: number; width?: number; height?: number };
  /** Preferred side of the anchor to place the combo box. Defaults to 'bottom'. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Placeholder text for the search input */
  placeholder?: string | LocalizeKey;
  /** Maximum width in pixels. Defaults to 500. */
  maxWidth?: number;
  /** Maximum height in pixels. Defaults to 400. */
  maxHeight?: number;
  /** Whether clicking outside dismisses the combo box. Defaults to true. */
  dismissOnClickOutside?: boolean;
}

/**
 * @deprecated Use {@link ComboBoxItem}. The "command palette" terminology was misleading — this
 *   overlay is a generic per-WebView searchable picker (used today for USFM marker selection), not
 *   the global Action Palette concept. See `docs/plans/2026-05-15-action-palette-proposal.md`.
 */
export type CommandPaletteItem = ComboBoxItem;

/** @deprecated Use {@link ComboBoxRequest}. See {@link CommandPaletteItem} for context. */
export type CommandPaletteRequest = ComboBoxRequest;

// ── Service Interface ──

/**
 * JSDOC SOURCE overlayService
 *
 * Service for showing overlays (context menus, popovers, combo boxes) that render outside iframe
 * boundaries in the renderer's top-level document. Renderer-only service.
 *
 * Extensions in sandboxed WebView iframes cannot render UI above other content or outside their
 * iframe bounds. This service accepts overlay requests from WebViews, translates their
 * iframe-relative coordinates to document-level coordinates, and renders the overlay in the
 * renderer's React tree. Each method returns a promise that resolves when the user interacts with
 * the overlay or it is dismissed.
 *
 * Only one overlay of each type (context menu, popover, combo box) can be active per WebView at a
 * time. Requesting a new overlay of the same type from the same WebView replaces the previous one
 * and rejects its promise with a PlatformError with code ABORTED.
 */
export interface IOverlayService {
  /**
   * Shows a context menu from menu.json contributions registered for the given webViewType. Fetches
   * menu data, renders the menu, and auto-executes the selected command. Returns the command string
   * that was executed, or undefined if dismissed.
   *
   * @param webViewType The webViewType to look up in the menu data service
   * @param webViewId The ID of the WebView requesting the context menu. Pass `globalThis.webViewId`
   *   from within a WebView iframe.
   * @param options Optional context including the position for the menu
   * @returns The command string that was executed, or `undefined` if dismissed
   * @throws PlatformError with code ABORTED if replaced by another context menu from the same
   *   WebView
   */
  showContextMenu(
    webViewType: string,
    webViewId: string,
    options?: { position?: { x: number; y: number } },
  ): Promise<string | undefined>;
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
   * @throws PlatformError with code RESOURCE_EXHAUSTED if a duplicate request arrives within the
   *   debounce cooldown
   * @throws PlatformError with code INVALID_ARGUMENT if the request is invalid
   * @throws PlatformError with code ABORTED if replaced by another popover from the same WebView
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
   * @throws PlatformError with code ABORTED if the popover was replaced by a new one from the same
   *   WebView
   */
  onPopoverDismissed(overlayId: string): Promise<string | undefined>;
  /**
   * Shows a combo box with searchable/filterable items. Returns a promise that resolves with the
   * selected item's `id`, or `undefined` if dismissed.
   *
   * @param request The items, optional anchor position, and display options
   * @param webViewId The ID of the WebView requesting the combo box
   * @returns The selected item's ID, or `undefined` if dismissed
   * @throws PlatformError with code INVALID_ARGUMENT if the request is invalid
   * @throws PlatformError with code ABORTED if replaced by another combo box from the same WebView
   */
  showComboBox(request: ComboBoxRequest, webViewId: string): Promise<string | undefined>;
  /**
   * @deprecated Use {@link showComboBox}. The "command palette" terminology was misleading; see
   *   `docs/plans/2026-05-15-action-palette-proposal.md`.
   */
  showCommandPalette(request: ComboBoxRequest, webViewId: string): Promise<string | undefined>;
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
 * - `'comboBox'` — An active combo box with searchable/filterable items.
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
      items: OverlayContextMenuItem[];
      /** Document-relative position (already translated from iframe coordinates and clamped) */
      position: { x: number; y: number };
      /** Settles the caller's promise with the selected command string, or `undefined` if dismissed */
      resolve: (result: string | undefined) => void;
      /** Rejects the caller's promise (e.g., with a PlatformError with code ABORTED) */
      reject: (error: PlatformError) => void;
    }
  | {
      type: 'modalDialog';
      /** Unique overlay identifier generated by the service */
      id: string;
      /** The WebView that requested this overlay. Used to enforce one-per-type-per-WebView. */
      webViewId: string;
      /** The dialog React component to render inside the modal shell */
      Component: (props: Record<string, unknown>) => ReactElement;
      /** Pre-built props for the component (DialogProps + dialog options, already localized) */
      props: Record<string, unknown>;
      /**
       * Settles the caller's promise with the dialog result. Typed as `unknown` because the generic
       * return type is not preserved in the store entry.
       */
      resolve: (result: unknown) => void;
      /** Rejects the caller's promise (e.g., with a PlatformError with code ABORTED) */
      reject: (error: PlatformError) => void;
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
      /** Rejects the caller's promise (e.g., with a PlatformError with code ABORTED) */
      reject: (error: PlatformError) => void;
    }
  | {
      type: 'comboBox';
      /** Unique overlay identifier generated by the service */
      id: string;
      /** The WebView that requested this overlay */
      webViewId: string;
      /** The original request */
      request: ComboBoxRequest;
      /** Items to render */
      items: ComboBoxItem[];
      /** Document-relative position (translated + clamped), or undefined for centered */
      position?: { x: number; y: number };
      /** Settles the caller's promise with the selected item ID, or undefined if dismissed */
      resolve: (selectedId: string | undefined) => void;
      /** Rejects the caller's promise (e.g., with a PlatformError with code ABORTED) */
      reject: (error: PlatformError) => void;
    };

/**
 * Maps each overlay type to the type its resolve callback accepts. Used by
 * {@link resolveAndRemoveOverlay} to provide compile-time type safety on the result parameter.
 */
export type OverlayResolveType = {
  contextMenu: string | undefined;
  modalDialog: unknown;
  popover: string | undefined;
  comboBox: string | undefined;
};
