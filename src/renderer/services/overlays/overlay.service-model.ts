/**
 * Type definitions for the overlay service, a renderer-only service that manages overlays (context
 * menus, popovers, command palettes) rendered in the renderer's top-level document outside iframe
 * boundaries. Extensions running in sandboxed WebView iframes cannot render UI above other content,
 * so this service provides a way for them to request overlays that the renderer hosts on their
 * behalf.
 */

import { LocalizeKey, PaletteItem, PlatformError } from 'platform-bible-utils';
import type { PaletteKeyForwarding } from 'platform-bible-utils/experimental';
// Type-only, deliberately: this module is the overlay service's cross-process CONTRACT, and a
// runtime value import from `platform-bible-react` here pulled the whole component library into
// every consumer of these types. The implementation half lives in
// `overlay-palette-filter.util.ts`.
import type { PaletteFilterMode } from 'platform-bible-react/experimental';
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
  /**
   * Maximum height of the popover in pixels. Content taller than this scrolls inside the popover.
   * If omitted, uses a default max height.
   */
  maxHeight?: number;
  /** Whether to display an arrow pointing from the popover toward the anchor. Defaults to `true`. */
  showArrow?: boolean;
}

// ── Command Palette Types ──

/**
 * A single item in a command palette. Items are displayed in a searchable, filterable list. The
 * user types to filter and selects one item.
 *
 * Extends the shared {@link PaletteItem} contract (id/label/description/badge/disabled/muted) with
 * the presentation extras only this overlay renders.
 */
export type CommandPaletteItem = PaletteItem & {
  /** Optional icon displayed to the left of the label */
  icon?: string;
  /** Optional group key for visual sectioning with group headers */
  group?: string;
};

/**
 * A {@link CommandPaletteItem} text field that palette filtering may match against. See
 * {@link CommandPaletteRequest.searchFields}.
 */
export type PaletteSearchField = 'label' | 'description' | 'badge';

/** Request payload for {@link IOverlayService.showCommandPalette}. */
export interface CommandPaletteRequest {
  /** The selectable items to display */
  items: CommandPaletteItem[];
  /**
   * Which item text fields the filter text matches against. Defaults to `['label', 'description',
   * 'badge']` — every text field the palette displays — which suits general command palettes (a
   * command is often found by a word from its description). Palettes whose label is the whole
   * identity opt into `['label']`: for marker palettes the label IS the marker code, and
   * description matching buried exact typed markers under description hits.
   *
   * Matching and ranking: label matches come first, ranked exact-first (see
   * {@link PaletteFilterMode}); items matching only on the OTHER searched fields follow in their
   * original order. Passive palettes prefix-match the label only regardless of this option (PT9
   * marker-dropdown semantics — the passive flavor exists for in-document marker typing).
   */
  searchFields?: readonly PaletteSearchField[];
  /**
   * Anchor position in pixels relative to the requesting WebView's iframe origin. The palette is
   * positioned adjacent to this point. If omitted, centers in the viewport.
   */
  anchor?: { x: number; y: number; width?: number; height?: number };
  /** Preferred side of the anchor to place the palette. Defaults to 'bottom'. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Placeholder text for the search input */
  placeholder?: string | LocalizeKey;
  /** Maximum width in pixels. Defaults to 500. */
  maxWidth?: number;
  /** Maximum height in pixels. Defaults to 400. */
  maxHeight?: number;
  /** Whether clicking outside dismisses the palette. Defaults to true. */
  dismissOnClickOutside?: boolean;
  /**
   * When true, renders without a search input and without stealing focus from the requesting
   * WebView. Filter text and the highlighted selection are driven externally via
   * {@link IOverlayService.updateCommandPalette} and committed via
   * {@link IOverlayService.commitCommandPaletteSelection} instead of the palette's own search box
   * and keyboard handling. Defaults to false (the palette owns its own search input and focus, as
   * today).
   *
   * @remarks
   * Passive-palette filtering and commit resolution match the externally supplied filter text
   * case-insensitively against the PREFIX of each item's `label`: a leading `+` in the filter is
   * stripped first (so `"+w"` matches the same items as `"w"`), and an empty or omitted filter
   * shows every item. `LocalizeKey` labels are resolved to localized text when the palette is
   * shown, so matching always runs against the same label text the palette displays.
   */
  passive?: boolean;
  /**
   * Keys the REQUESTING session claims while this palette is open, and where to send them.
   *
   * The palette and the session that opened it live in different documents, so whichever holds
   * focus is the only one that sees a keystroke. A palette that takes focus therefore silently
   * takes the session's keys with it: its commit semantics stop running, and a local default (e.g.
   * cmdk's own navigation) answers instead. Declaring the claimed keys closes that — the palette
   * forwards exactly those to {@link PaletteKeyForwarding.onKey} and acts on none of them itself.
   *
   * A focus-stealing (non-passive) palette is what makes this necessary; a passive one never takes
   * focus, so its requester already receives every key and forwarding is inert there. Requesters
   * still declare it for both, so one code path covers a palette that unexpectedly receives a key.
   * Omit it entirely and the palette behaves exactly as it did before forwarding existed.
   *
   * @remarks
   * The handler is called synchronously, in the palette's own document. This is a direct function
   * reference rather than serialized data: the overlay service is renderer-only and a requesting
   * WebView is a same-origin iframe sharing the renderer's `papi`, so no boundary is crossed. The
   * forwarded value is a plain `ForwardedPaletteKeyEvent` rather than a live DOM event, which keeps
   * it free of the requester's realm.
   */
  keyForwarding?: PaletteKeyForwarding;
}

/**
 * How `filterPaletteItems` (overlay-palette-filter.util.ts) matches filter text against items — one
 * mode per palette flavor:
 *
 * - `'passive'` — case-insensitive PREFIX match on `label` only, whatever
 *   {@link CommandPaletteRequest.searchFields} says. Passive palettes show bare marker codes (`f`,
 *   `fe`, `fig`) filtered by the marker prefix the user has typed into the document, mirroring
 *   PT9's marker dropdown (`MarkerDropdownControl.UpdateMarkerList`): a leading `+` in the filter
 *   text is stripped before matching, so `"+w"` matches the same items as `"w"`.
 * - `'active'` — case-insensitive CONTAINMENT match over the request's
 *   {@link CommandPaletteRequest.searchFields} (default: label, description, and badge). Label
 *   matches rank first, exact-first, so an exact marker match cannot be buried under items whose
 *   descriptions happen to contain the typed letter; marker palettes additionally opt into
 *   label-only matching.
 *
 * Label matches rank exact-first in both modes — see `filterPaletteItems`.
 *
 * Re-exported from `platform-bible-react`, the home of the `filterAndRankPaletteItems` that
 * `filterPaletteItems` delegates label matching to, so the mode this service accepts and the mode
 * that function implements cannot drift apart.
 */
export type { PaletteFilterMode };

// ── Service Interface ──

/**
 * JSDOC SOURCE overlayService
 *
 * Service for showing overlays (context menus, popovers, command palettes) that render outside
 * iframe boundaries in the renderer's top-level document. Renderer-only service.
 *
 * Extensions in sandboxed WebView iframes cannot render UI above other content or outside their
 * iframe bounds. This service accepts overlay requests from WebViews, translates their
 * iframe-relative coordinates to document-level coordinates, and renders the overlay in the
 * renderer's React tree. Each method returns a promise that resolves when the user interacts with
 * the overlay or it is dismissed.
 *
 * Only one overlay of each type (context menu, popover, command palette) can be active per WebView
 * at a time. Requesting a new overlay of the same type from the same WebView replaces the previous
 * one and rejects its promise with a PlatformError with code ABORTED.
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
   * Shows a command palette with searchable/filterable items. Returns a promise that resolves with
   * the selected item's `id`, or `undefined` if dismissed.
   *
   * `LocalizeKey` item text (`label`/`description`/`badge`) is resolved to localized strings when
   * the palette is shown, so all filtering — the palette's own search box and text forwarded via
   * {@link updateCommandPalette} — matches against the text the user actually sees.
   *
   * @param request The items, optional anchor position, and display options
   * @param webViewId The ID of the WebView requesting the command palette
   * @returns The selected item's ID, or `undefined` if dismissed
   * @throws PlatformError with code INVALID_ARGUMENT if the request is invalid
   * @throws PlatformError with code ABORTED if replaced by another command palette from the same
   *   WebView
   */
  showCommandPalette(
    request: CommandPaletteRequest,
    webViewId: string,
  ): Promise<string | undefined>;
  /**
   * Updates the filter text and/or moves the highlighted selection of the active command palette
   * for the given WebView. No-op if no command palette is active for that WebView.
   *
   * Unlike the popover family above (keyed by the overlay ID returned from `showPopover`), the
   * command palette mutators are keyed by `webViewId` instead. The service enforces one command
   * palette per WebView at a time (see this interface's class docs), so the requesting WebView's
   * own ID is a sufficient handle — passive-mode callers drive the palette without ever seeing an
   * overlay ID.
   *
   * @param webViewId The ID of the WebView whose command palette should be updated
   * @param update `filterText` and/or `moveSelection` (clamped to the filtered list's bounds).
   *   `filterText` drives passive palettes' list directly and, for ACTIVE palettes, the
   *   (controlled) search input — callers forward keystrokes this way when the cross-frame focus
   *   handoff loses and the user's typing lands in their WebView instead of the palette.
   */
  updateCommandPalette(
    webViewId: string,
    update: { filterText?: string; moveSelection?: number },
  ): Promise<void>;
  /**
   * Commits the currently highlighted item of the active command palette for the given WebView,
   * resolving its `showCommandPalette` promise with that item's `id` (mirrors how a click on a
   * command palette item resolves the promise). If the highlighted item is `disabled`, moves
   * forward to the next enabled item in the filtered list; if none are enabled, no-ops. No-op if no
   * command palette is active for that WebView.
   *
   * Keyed by `webViewId` for the same reason as {@link updateCommandPalette}.
   *
   * @param webViewId The ID of the WebView whose command palette selection should be committed
   */
  commitCommandPaletteSelection(webViewId: string): Promise<void>;
  /**
   * Dismisses the active command palette for the given WebView, resolving its `showCommandPalette`
   * promise with `undefined`. Works for both active and passive palettes. No-op if no command
   * palette is active for that WebView.
   *
   * Keyed by `webViewId` for the same reason as {@link updateCommandPalette}.
   *
   * @param webViewId The ID of the WebView whose command palette should be dismissed
   */
  dismissCommandPalette(webViewId: string): Promise<void>;
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
 * - `'commandPalette'` — An active command palette with searchable/filterable items.
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
      type: 'commandPalette';
      /** Unique overlay identifier generated by the service */
      id: string;
      /** The WebView that requested this overlay */
      webViewId: string;
      /** The original request */
      request: CommandPaletteRequest;
      /**
       * Items to render, with any `LocalizeKey` `label`/`description`/`badge` text already resolved
       * to localized strings at show time — filtering, commit resolution, and rendering all read
       * from here so they always agree on each item's text.
       */
      items: CommandPaletteItem[];
      /**
       * Current filter text. Mutable — updated in place by `updateCommandPalette` for BOTH passive
       * and active palettes: a passive palette's list is driven by this filter text directly, while
       * an active palette uses it to drive its controlled cmdk input from forwarded keystrokes.
       * Undefined when unset or cleared — never the empty string (the store normalizes `''` to
       * undefined).
       */
      filterText?: string;
      /**
       * Index of the highlighted item within `filterPaletteItems(items, filterText)`. Mutable —
       * updated in place by `updateCommandPalette`'s `moveSelection`, clamped to the filtered
       * list's bounds. Defaults to 0 at creation.
       */
      selectedIndex: number;
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
  commandPalette: string | undefined;
};
