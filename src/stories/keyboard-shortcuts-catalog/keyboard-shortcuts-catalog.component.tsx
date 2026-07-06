import { Fragment, useMemo } from 'react';
import {
  Kbd,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'platform-bible-react';

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
  /** Per-OS key combinations. */
  keys: KeyboardShortcutKeys;
  /** Repo-relative file paths where the shortcut is handled. */
  locations: string[];
};

/** Localizable string keys for {@link KeyboardShortcutsCatalog} column headers. */
export const KEYBOARD_SHORTCUTS_CATALOG_STRING_KEYS = Object.freeze([
  '%keyboardShortcutsCatalog_header_shortcut%',
  '%keyboardShortcutsCatalog_header_purpose%',
  '%keyboardShortcutsCatalog_header_context%',
  '%keyboardShortcutsCatalog_header_locations%',
  '%keyboardShortcutsCatalog_header_count%',
] as const);

/**
 * Localized column-header strings for {@link KeyboardShortcutsCatalog}. This component lives in the
 * core Platform.Bible Storybook (`src/stories/`) and is not exported from `platform-bible-react`;
 * it renders the **Reference → Keyboard shortcuts** catalog page. The keys are kept localizable so
 * the catalog can be translated in Storybook, but no caller needs to pass `localizedStrings` today
 * — the built-in English {@link KEYBOARD_SHORTCUTS_CATALOG_STRING_KEYS} defaults are used by
 * default.
 */
export type KeyboardShortcutsCatalogLocalizedStrings = {
  [key in (typeof KEYBOARD_SHORTCUTS_CATALOG_STRING_KEYS)[number]]?: string;
};

const DEFAULT_STRINGS: Required<KeyboardShortcutsCatalogLocalizedStrings> = {
  '%keyboardShortcutsCatalog_header_shortcut%': 'Shortcut',
  '%keyboardShortcutsCatalog_header_purpose%': 'Purpose',
  '%keyboardShortcutsCatalog_header_context%': 'Context',
  '%keyboardShortcutsCatalog_header_locations%': 'Where in code',
  '%keyboardShortcutsCatalog_header_count%': 'Count',
};

const DEFAULT_REPO_BASE_URL = 'https://github.com/paranext/paranext-core/blob/main';

/** Props for {@link KeyboardShortcutsCatalog}. */
export type KeyboardShortcutsCatalogProps = {
  /** Shortcut entries to display. Grouped by `category` in the rendered table. */
  entries: KeyboardShortcutEntry[];
  /** Base URL each `location` path is appended to for its source link. Defaults to the repo `main`. */
  repoBaseUrl?: string;
  /** Localized column headers. Falls back to English. */
  localizedStrings?: KeyboardShortcutsCatalogLocalizedStrings;
};

type OsKeyRow = { os: string; combo: string };

/**
 * Groups the three OS combos into rows, joining the labels of platforms that share an identical
 * combo (e.g. `Windows / Linux`) so every platform stays visible without repeating identical
 * combos.
 */
function buildOsRows(keys: KeyboardShortcutKeys): OsKeyRow[] {
  const ordered: { os: string; combo: string }[] = [
    { os: 'macOS', combo: keys.macOS },
    { os: 'Windows', combo: keys.windows },
    { os: 'Linux', combo: keys.linux },
  ];
  const byCombo = new Map<string, string[]>();
  ordered.forEach(({ os, combo }) => {
    const list = byCombo.get(combo) ?? [];
    list.push(os);
    byCombo.set(combo, list);
  });
  return [...byCombo.entries()].map(([combo, osList]) => ({
    // Collapse the all-three-platforms case to a short label so it doesn't overrun its column.
    // Join shared-combo platforms with ` | ` (not ` / `) so the inter-OS divider stays distinct
    // from the ` / ` used inside a combo to separate alternative key presses.
    os: osList.length === 3 ? 'All OS' : osList.join(' | '),
    combo,
  }));
}

/**
 * Renders a documentation table of keyboard shortcuts, grouped by category. Each row shows the
 * per-OS key combination, what the shortcut does, where it is active, links to the code locations
 * that handle it, and how many such locations exist.
 *
 * Categories appear as full-width separator rows (a heading cell spanning all columns) inside the
 * single table body, immediately before each category's entries.
 */
export function KeyboardShortcutsCatalog({
  entries,
  repoBaseUrl = DEFAULT_REPO_BASE_URL,
  localizedStrings,
}: KeyboardShortcutsCatalogProps) {
  const strings = { ...DEFAULT_STRINGS, ...localizedStrings };

  const groups = useMemo(() => {
    const byCategory = new Map<string, KeyboardShortcutEntry[]>();
    entries.forEach((entry) => {
      const list = byCategory.get(entry.category) ?? [];
      list.push(entry);
      byCategory.set(entry.category, list);
    });
    return [...byCategory.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [entries]);

  const shortcutHeader = strings['%keyboardShortcutsCatalog_header_shortcut%'];
  const purposeHeader = strings['%keyboardShortcutsCatalog_header_purpose%'];
  const contextHeader = strings['%keyboardShortcutsCatalog_header_context%'];
  const locationsHeader = strings['%keyboardShortcutsCatalog_header_locations%'];
  const countHeader = strings['%keyboardShortcutsCatalog_header_count%'];

  return (
    <div className="pr-twp tw:flex tw:flex-col tw:gap-6">
      {/* table-fixed + explicit column widths keep the table within its container (no horizontal
          scroll); long content wraps within each cell instead of widening the table. */}
      <Table className="tw:table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="tw:w-[20%]">{shortcutHeader}</TableHead>
            <TableHead className="tw:w-[28%]">{purposeHeader}</TableHead>
            <TableHead className="tw:w-[16%]">{contextHeader}</TableHead>
            <TableHead className="tw:w-[28%]">{locationsHeader}</TableHead>
            <TableHead className="tw:w-[8%]">{countHeader}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map(([category, categoryEntries]) => (
            <Fragment key={category}>
              <TableRow>
                <TableCell colSpan={5}>
                  <h3 className="tw:text-lg tw:font-semibold">{category}</h3>
                </TableCell>
              </TableRow>
              {categoryEntries.map((entry) => {
                const osRows = buildOsRows(entry.keys);
                return (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div className="tw:flex tw:flex-col tw:gap-1">
                        {osRows.map((row) => (
                          <div
                            key={row.os}
                            className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-2 tw:gap-y-1"
                          >
                            <span className="tw:text-xs tw:text-muted-foreground">{row.os}</span>
                            <Kbd>{row.combo}</Kbd>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    {/* Override the shadcn cell default `whitespace-nowrap` so prose and long file
                        paths wrap within their fixed-width columns instead of overflowing. */}
                    <TableCell className="tw:whitespace-normal">{entry.purpose}</TableCell>
                    <TableCell className="tw:whitespace-normal">{entry.context}</TableCell>
                    <TableCell className="tw:whitespace-normal">
                      <ul className="tw:flex tw:flex-col tw:gap-1">
                        {entry.locations.map((location) => (
                          <li key={location}>
                            <a
                              href={`${repoBaseUrl}/${location}`}
                              target="_blank"
                              rel="noreferrer"
                              className="tw:break-all tw:underline"
                            >
                              {location}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>{entry.locations.length}</TableCell>
                  </TableRow>
                );
              })}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
