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
  /** Repo-relative file paths where the shortcut is handled. */
  locations: string[];
  /**
   * The PAPI command the chord runs. Menu items that run it show the shortcut as a hint. Set it
   * only if the chord works everywhere those items appear — not for a chord the main process
   * handles regardless of focus, or one that works only in some editor views.
   */
  command?: CommandNames;
};
