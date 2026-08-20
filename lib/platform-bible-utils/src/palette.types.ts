import { LocalizeKey } from './extension-contributions/menus.model';

/**
 * One selectable item in a command/marker palette. The dependency-free shared shape consumed by
 * every layer that handles palette items — the renderer overlay service's `CommandPaletteItem`
 * extends it, `platform-bible-react`'s `FootnoteEditor` marker palette uses it directly, and
 * extensions build items in this shape — so the item contract exists exactly once.
 *
 * Note for passive palettes (driven by forwarded keystrokes rather than their own input): filter
 * matching runs on the RAW `label`, so passive-palette items must use plain-string labels — a
 * `LocalizeKey` label would make the on-screen (localized) filtering diverge from the host's commit
 * resolution.
 */
export interface PaletteItem {
  /** Unique identifier returned when this item is selected */
  id: string;
  /** Primary display text (e.g. a marker code like "ft" or a command name) */
  label: string | LocalizeKey;
  /** Secondary description text displayed below the label */
  description?: string | LocalizeKey;
  /** Optional badge text (e.g. "Deprecated", "End"). Localized when given as a `LocalizeKey`. */
  badge?: string | LocalizeKey;
  /** Whether the item is grayed out and non-selectable. Defaults to false. */
  disabled?: boolean;
  /**
   * Whether the item's text is rendered de-emphasized (reduced opacity) while remaining fully
   * selectable — e.g. PT9's grey cue for non-basic markers. Unlike {@link PaletteItem.disabled}, a
   * muted item can still be highlighted and selected. Defaults to false.
   */
  muted?: boolean;
}

/**
 * The operations that drive an already-open palette from outside it — the shared driver contract
 * between every palette host and consumer: the renderer overlay service implements it (keyed by
 * webViewId), `platform-bible-react`'s marker-palette keydown forwarding table calls it, and the
 * `FootnoteEditor`'s host-supplied palette prop extends it with `show`. One contract instead of a
 * structural re-declaration per layer.
 *
 * Return types are `void`: implementations may return promises (a `Promise<void>`-returning method
 * satisfies a `void` signature), and callers treat all three as fire-and-forget.
 */
export interface PaletteDriver {
  /** Updates the filter text and/or moves the highlighted selection of the active palette. */
  update(update: { filterText?: string; moveSelection?: number }): void;
  /** Commits the currently highlighted palette item. */
  commit(): void;
  /** Dismisses the active palette without committing. */
  dismiss(): void;
}

/**
 * One keydown a palette FORWARDED to the session that requested it, instead of handling it itself.
 *
 * A palette rendered by the host (the renderer's overlay) and the session that opened it (a
 * WebView) live in different documents, so whichever one holds focus is the only one that sees a
 * keystroke. When the palette's own input wins that race, the keys the session claims never reach
 * it — the session's commit semantics simply stop running. Forwarding closes that: the requester
 * declares which keys it claims, and the palette hands those straight over rather than consuming
 * them.
 *
 * Deliberately a plain-data shape with the two claim methods, not a DOM `KeyboardEvent`: the
 * forwarded key crosses a document boundary, and this is exactly the surface a keydown handler
 * needs. A real `KeyboardEvent` is structurally assignable to it, so one handler serves both the
 * session's own listener and forwarded keys.
 *
 * Note this carries the key IDENTITY, unlike the app-window input announcement
 * (`platform.onDidAppWindowInput`), which deliberately does not. That restriction is about
 * broadcasting global input to arbitrary listeners; here a palette returns keystrokes only to the
 * one session that opened it and explicitly asked for exactly these keys.
 */
export interface ForwardedPaletteKeyEvent {
  /** `KeyboardEvent.key` — the value matched against the requester's declared key list. */
  key: string;
  /**
   * `KeyboardEvent.keyCode`. Needed only for the legacy `229` "handled by IME" signal, which some
   * engines fire before `isComposing` flips true.
   */
  keyCode: number;
  /** Whether an IME composition is underway; such a key is never palette input. */
  isComposing: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
  /** Stops the palette (and the browser) from acting on this key. */
  preventDefault(): void;
  /** Stops the key from propagating further in the palette's own document. */
  stopPropagation(): void;
}

/**
 * A requester's declaration that it owns some keys while its palette is open. Passed when showing
 * the palette; the palette forwards every keydown whose `key` is in {@link keys} to {@link onKey} and
 * does not act on it itself.
 */
export interface PaletteKeyForwarding {
  /**
   * `KeyboardEvent.key` values the requesting session claims. Anything not listed stays the
   * palette's own (arrow navigation, ordinary typing into its input, and so on).
   */
  keys: readonly string[];
  /**
   * Receives each forwarded key. The handler decides what to do with it, including whether to claim
   * it via `preventDefault`/`stopPropagation` — the palette does not claim on its behalf, so an
   * unclaimed key still behaves normally.
   */
  onKey(event: ForwardedPaletteKeyEvent): void;
}
