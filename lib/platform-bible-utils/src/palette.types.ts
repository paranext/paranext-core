import { LocalizeKey } from './extension-contributions/menus.model';

/**
 * One selectable item in a command/marker palette. The dependency-free shared shape consumed by
 * every layer that handles palette items — the renderer overlay service's `CommandPaletteItem`
 * extends it, `platform-bible-react`'s `FootnoteEditor` marker palette uses it directly, and
 * extensions build items in this shape — so the item contract exists exactly once.
 *
 * Note for passive palettes (driven by forwarded keystrokes rather than their own input): filter
 * matching runs on the RAW `label`, so passive-palette items must use plain-string labels — a
 * `LocalizeKey` label would make the on-screen (localized) filtering diverge from the host's
 * commit resolution.
 */
export interface PaletteItem {
  /** Unique identifier returned when this item is selected */
  id: string;
  /** Primary display text (e.g. a marker code like "ft" or a command name) */
  label: string | LocalizeKey;
  /** Secondary description text displayed below the label */
  description?: string | LocalizeKey;
  /** Optional badge text (e.g. "Deprecated", "end") */
  badge?: string | LocalizeKey;
  /** Whether the item is grayed out and non-selectable. Defaults to false. */
  disabled?: boolean;
  /**
   * Whether the item's text is rendered de-emphasized (reduced opacity) while remaining fully
   * selectable — e.g. PT9's grey cue for non-basic markers. Unlike {@link PaletteItem.disabled},
   * a muted item can still be highlighted and selected. Defaults to false.
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
 * Return types are `void`: implementations may return promises (a `Promise<void>`-returning
 * method satisfies a `void` signature), and callers treat all three as fire-and-forget.
 */
export interface PaletteDriver {
  /** Updates the filter text and/or moves the highlighted selection of the active palette. */
  update(update: { filterText?: string; moveSelection?: number }): void;
  /** Commits the currently highlighted palette item. */
  commit(): void;
  /** Dismisses the active palette without committing. */
  dismiss(): void;
}
