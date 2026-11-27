import type { CommandNames } from 'papi-shared-types';

/** Per-operating-system rendering of a single keyboard shortcut combination. */
export type KeyboardShortcutKeys = {
  /** MacOS representation, e.g. `⌘Z` (symbols, no separator). */
  macOS: string;
  /** Windows representation, e.g. `Ctrl+Z`. */
  windows: string;
  /** Linux representation, e.g. `Ctrl+Z`. */
  linux: string;
};

/**
 * Another catalog entry whose chord overlaps this one's in a context where both can be active, so
 * one press can reach both handlers, or one handler shadows the other.
 */
export type KeyboardShortcutConflict = {
  /** `id` of the other entry. The other entry lists this one back. */
  id: string;
  /** What happens when the chord is pressed where both apply, and which handler wins if known. */
  note: string;
};

/** How a shortcut compares with the one Paratext 9 used for the same action. */
export type Paratext9Comparison = {
  /**
   * `same`: Paratext 9 used the same chord for the same action. `differs`: the chord or what it
   * does is different; `note` says how.
   */
  status: 'same' | 'differs';
  /**
   * The Paratext 9 chord, written the Windows way (Paratext 9 ran on Windows and Linux, never
   * macOS), or `— (none recorded)` when the research names the action but not a chord.
   */
  keys: string;
  /** What differs, or anything a Paratext 9 user should know although the chord is the same. */
  note: string;
  /**
   * Where the Paratext 9 fact comes from: a repo-relative path to a file in
   * `.context/research/paratext-9-features/`, then `§` and the section heading, e.g.
   * `.context/research/paratext-9-features/01_Translation_Workspace.md § 1.3 BCV Navigation`.
   * Record only what that research states.
   */
  source: string;
};

/** A Paratext 9 shortcut that has no counterpart in this catalog. */
export type Paratext9OnlyShortcut = {
  /** Stable identifier/slug, e.g. `pt9-quick-reference`. */
  id: string;
  /** What the shortcut did in Paratext 9, in sentence case. */
  purpose: string;
  /** The Paratext 9 chord, written the Windows way. */
  keys: string;
  /** Where Paratext 9 offered it, and anything Platform.Bible offers instead. */
  note: string;
  /** Where the fact comes from, written as in {@link Paratext9Comparison.source}. */
  source: string;
};

/** A single documented keyboard shortcut. */
export type KeyboardShortcutEntry = {
  /** Stable identifier/slug, e.g. `next-tab`. */
  id: string;
  /** What the shortcut does, in sentence case. */
  purpose: string;
  /** Grouping bucket, e.g. `Navigation`, `Editing`, `Zoom`. */
  category: string;
  /** Where the shortcut is active, e.g. `Main process (global)`. */
  context: string;
  /**
   * Per-OS key combinations. Alternatives are separated by a slash with a space on each side, e.g.
   * `Ctrl+Shift+N / Ctrl+Alt+M`. Menu hints show only the first, so an entry with a `command` lists
   * first the alternative a menu should teach.
   */
  keys: KeyboardShortcutKeys;
  /**
   * Repo-relative file paths that determine the shortcut's behavior — the handler itself, and any
   * file that supplies or withdraws it. A shortcut provided by a shared primitive
   * (`shadcn-ui/dialog.tsx`'s focus containment) or gated by a component that mounts the handler
   * lists those too, so an edit to any of them is reachable by grepping this catalog for the file.
   */
  locations: string[];
  /**
   * The PAPI command the chord runs. Menu items that run it show the shortcut as a hint. Set it
   * only if the chord works everywhere those items appear: not for a chord the main process handles
   * regardless of focus (unless that handler runs this same command), nor one that works only in
   * some editor views.
   */
  command?: CommandNames;
  /**
   * Other entries whose chord overlaps this one's where both can be active. List the conflict on
   * both entries. Leave it unset when the same chord does different things in contexts that cannot
   * both be active (two different web views, say).
   */
  conflicts?: KeyboardShortcutConflict[];
  /** How the shortcut compares with Paratext 9, when the Paratext 9 research covers the action. */
  paratext9?: Paratext9Comparison;
};
