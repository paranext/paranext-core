import { Fragment, useMemo, useState } from 'react';
import {
  Badge,
  isMacOs,
  isWindows,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToggleGroup,
  ToggleGroupItem,
} from 'platform-bible-react';
import { ShortcutKeys } from 'platform-bible-react/experimental';
import type {
  KeyboardShortcutEntry,
  KeyboardShortcutKeys,
  Paratext9OnlyShortcut,
} from '@shared/data/keyboard-shortcuts.model';
import { parseShortcutKeycaps } from './keyboard-shortcut-keycaps.util';

/** Localizable string keys for {@link KeyboardShortcutsCatalog}. */
export const KEYBOARD_SHORTCUTS_CATALOG_STRING_KEYS = Object.freeze([
  '%keyboardShortcutsCatalog_header_shortcut%',
  '%keyboardShortcutsCatalog_header_purpose%',
  '%keyboardShortcutsCatalog_header_context%',
  '%keyboardShortcutsCatalog_header_paratext9%',
  '%keyboardShortcutsCatalog_header_locations%',
  '%keyboardShortcutsCatalog_header_count%',
  '%keyboardShortcutsCatalog_header_entries%',
  '%keyboardShortcutsCatalog_header_note%',
  '%keyboardShortcutsCatalog_header_source%',
  '%keyboardShortcutsCatalog_os_label%',
  '%keyboardShortcutsCatalog_os_all%',
  '%keyboardShortcutsCatalog_os_macOS%',
  '%keyboardShortcutsCatalog_os_windows%',
  '%keyboardShortcutsCatalog_os_linux%',
  '%keyboardShortcutsCatalog_conflict_badge%',
  '%keyboardShortcutsCatalog_menuHint_badge%',
  '%keyboardShortcutsCatalog_conflicts_heading%',
  '%keyboardShortcutsCatalog_conflicts_none%',
  '%keyboardShortcutsCatalog_paratext9_same%',
  '%keyboardShortcutsCatalog_paratext9_differs%',
  '%keyboardShortcutsCatalog_paratext9_unknown%',
  '%keyboardShortcutsCatalog_paratext9Only_heading%',
] as const);

/**
 * Localized strings for {@link KeyboardShortcutsCatalog}. This component lives in the core
 * Platform.Bible Storybook (`src/stories/`) and is not exported from `platform-bible-react`; it
 * renders the **Reference → Keyboard shortcuts** catalog page. The keys are kept localizable so the
 * catalog can be translated in Storybook, but no caller needs to pass `localizedStrings` today —
 * the built-in English {@link KEYBOARD_SHORTCUTS_CATALOG_STRING_KEYS} defaults are used by default.
 */
export type KeyboardShortcutsCatalogLocalizedStrings = {
  [key in (typeof KEYBOARD_SHORTCUTS_CATALOG_STRING_KEYS)[number]]?: string;
};

const DEFAULT_STRINGS: Required<KeyboardShortcutsCatalogLocalizedStrings> = {
  '%keyboardShortcutsCatalog_header_shortcut%': 'Shortcut',
  '%keyboardShortcutsCatalog_header_purpose%': 'Purpose',
  '%keyboardShortcutsCatalog_header_context%': 'Context',
  '%keyboardShortcutsCatalog_header_paratext9%': 'Paratext 9',
  '%keyboardShortcutsCatalog_header_locations%': 'Where in code',
  '%keyboardShortcutsCatalog_header_count%': 'Count',
  '%keyboardShortcutsCatalog_header_entries%': 'Shortcuts',
  '%keyboardShortcutsCatalog_header_note%': 'What happens',
  '%keyboardShortcutsCatalog_header_source%': 'Source',
  '%keyboardShortcutsCatalog_os_label%': 'Show keys for',
  '%keyboardShortcutsCatalog_os_all%': 'All',
  '%keyboardShortcutsCatalog_os_macOS%': 'macOS',
  '%keyboardShortcutsCatalog_os_windows%': 'Windows',
  '%keyboardShortcutsCatalog_os_linux%': 'Linux',
  '%keyboardShortcutsCatalog_conflict_badge%': 'Conflicts with',
  '%keyboardShortcutsCatalog_menuHint_badge%': 'Shown in menus',
  '%keyboardShortcutsCatalog_conflicts_heading%': 'Conflicts',
  '%keyboardShortcutsCatalog_conflicts_none%': 'No conflicts are recorded.',
  '%keyboardShortcutsCatalog_paratext9_same%': 'Same as Paratext 9',
  '%keyboardShortcutsCatalog_paratext9_differs%': 'Differs from Paratext 9',
  '%keyboardShortcutsCatalog_paratext9_unknown%': 'Not recorded',
  '%keyboardShortcutsCatalog_paratext9Only_heading%': 'Paratext 9 shortcuts with no equivalent',
};

const DEFAULT_REPO_BASE_URL = 'https://github.com/paranext/paranext-core/blob/main';

/** Which operating system's keys the catalog shows, or `all` to show every one. */
export type KeyboardShortcutsCatalogOs = 'all' | keyof KeyboardShortcutKeys;

const OS_CHOICES: KeyboardShortcutsCatalogOs[] = ['all', 'macOS', 'windows', 'linux'];

/**
 * The viewer's operating system, read from the user agent, or `all` when it cannot be told.
 *
 * @returns The OS whose keys the catalog shows first
 */
export function detectViewerOs(): KeyboardShortcutsCatalogOs {
  if (isMacOs()) return 'macOS';
  if (isWindows()) return 'windows';
  if (/Linux|X11|CrOS/i.test(navigator.userAgent)) return 'linux';
  return 'all';
}

/** Props for {@link KeyboardShortcutsCatalog}. */
export type KeyboardShortcutsCatalogProps = {
  /** Shortcut entries to display. Grouped by `category` in the rendered table. */
  entries: KeyboardShortcutEntry[];
  /** Paratext 9 shortcuts with no counterpart, listed in their own section. */
  paratext9Only?: Paratext9OnlyShortcut[];
  /**
   * The OS whose keys show first. Defaults to every OS; pass {@link detectViewerOs}`()` to start on
   * the viewer's OS.
   */
  defaultOs?: KeyboardShortcutsCatalogOs;
  /** Base URL each `location` path is appended to for its source link. Defaults to the repo `main`. */
  repoBaseUrl?: string;
  /** Localized strings. Falls back to English. */
  localizedStrings?: KeyboardShortcutsCatalogLocalizedStrings;
};

type OsKeyRow = { os: string; combo: string };

const OS_LABELS: Record<keyof KeyboardShortcutKeys, string> = {
  macOS: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
};

/**
 * Groups the three OS combos into rows, joining the labels of platforms that share an identical
 * combo (e.g. `Windows / Linux`) so every platform stays visible without repeating identical
 * combos. With one OS selected, returns only that OS's combo, unlabeled.
 */
function buildOsRows(keys: KeyboardShortcutKeys, os: KeyboardShortcutsCatalogOs): OsKeyRow[] {
  if (os !== 'all') return [{ os: '', combo: keys[os] }];
  const ordered: { os: string; combo: string }[] = [
    { os: OS_LABELS.macOS, combo: keys.macOS },
    { os: OS_LABELS.windows, combo: keys.windows },
    { os: OS_LABELS.linux, combo: keys.linux },
  ];
  const byCombo = new Map<string, string[]>();
  ordered.forEach(({ os: label, combo }) => {
    const list = byCombo.get(combo) ?? [];
    list.push(label);
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
 * Renders one key combination through the shared {@link ShortcutKeys} renderer.
 *
 * The wrapping span's muted, small text only reaches `ShortcutKeys`' unstyled `+` separator: each
 * `Kbd` sets its own color and size explicitly, so this is the catalog page's own styling choice
 * rather than something `ShortcutKeys` should hard-code for every consumer.
 */
function KeycapCombination({ hint }: { hint: string }) {
  return (
    <span className="tw:text-xs tw:text-muted-foreground">
      <ShortcutKeys hint={hint} />
    </span>
  );
}

/** Renders one OS's key string: its alternatives as keycaps, or its no-equivalent marker as text. */
function OsKeys({ keys }: { keys: string }) {
  const parsed = parseShortcutKeycaps(keys);
  if (parsed.kind === 'no-equivalent')
    return <span className="tw:text-xs tw:text-muted-foreground">{parsed.text}</span>;
  return (
    <span className="tw:flex tw:flex-wrap tw:items-center tw:gap-1">
      {parsed.alternatives.map((alternative, index) => (
        <Fragment key={alternative}>
          {index > 0 && <span className="tw:text-xs tw:text-muted-foreground">/</span>}
          <KeycapCombination hint={alternative} />
        </Fragment>
      ))}
    </span>
  );
}

/** Renders the keys of one entry for the selected OS, or each distinct combo labeled by OS. */
function EntryKeys({ keys, os }: { keys: KeyboardShortcutKeys; os: KeyboardShortcutsCatalogOs }) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      {buildOsRows(keys, os).map((row) => (
        <div
          key={row.os || row.combo}
          className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-2 tw:gap-y-1"
        >
          {row.os && <span className="tw:text-xs tw:text-muted-foreground">{row.os}</span>}
          <OsKeys keys={row.combo} />
        </div>
      ))}
    </div>
  );
}

/** A Paratext 9 `source`, linked to its research file, with the section shown after the link. */
function ResearchSource({ source, repoBaseUrl }: { source: string; repoBaseUrl: string }) {
  const [file, section] = source.split(' § ');
  const fileName = file.split('/').pop() ?? file;
  return (
    <span className="tw:text-xs tw:text-muted-foreground">
      <a
        href={`${repoBaseUrl}/${file}`}
        target="_blank"
        rel="noreferrer"
        className="tw:break-all tw:underline"
      >
        {fileName}
      </a>
      {section ? ` § ${section}` : ''}
    </span>
  );
}

type ConflictRow = { ids: [string, string]; notes: string[] };

/** Collects each recorded conflict once per pair of entries, with the note from each side. */
function collectConflicts(entries: KeyboardShortcutEntry[]): ConflictRow[] {
  const byPair = new Map<string, ConflictRow>();
  entries.forEach((entry) => {
    entry.conflicts?.forEach((conflict) => {
      const ids: [string, string] =
        entry.id < conflict.id ? [entry.id, conflict.id] : [conflict.id, entry.id];
      const key = ids.join('\n');
      const row = byPair.get(key) ?? { ids, notes: [] };
      row.notes.push(conflict.note);
      byPair.set(key, row);
    });
  });
  return [...byPair.values()].sort((a, b) => a.ids.join().localeCompare(b.ids.join()));
}

/**
 * Renders a documentation page body for the keyboard shortcuts catalog: an OS toggle, a table of
 * shortcuts grouped by category, the conflicts between them, and the Paratext 9 shortcuts with no
 * counterpart. Each row shows the key combination for the selected OS (or every OS), what the
 * shortcut does with any conflicts and whether menus show it as a hint, where it is active, how it
 * compares with Paratext 9, and links to the code locations that handle it with their count.
 *
 * Categories appear as full-width separator rows (a heading cell spanning all columns) inside the
 * single table body, immediately before each category's entries.
 */
export function KeyboardShortcutsCatalog({
  entries,
  paratext9Only = [],
  defaultOs = 'all',
  repoBaseUrl = DEFAULT_REPO_BASE_URL,
  localizedStrings,
}: KeyboardShortcutsCatalogProps) {
  const strings = { ...DEFAULT_STRINGS, ...localizedStrings };
  const [os, setOs] = useState<KeyboardShortcutsCatalogOs>(defaultOs);

  const groups = useMemo(() => {
    const byCategory = new Map<string, KeyboardShortcutEntry[]>();
    entries.forEach((entry) => {
      const list = byCategory.get(entry.category) ?? [];
      list.push(entry);
      byCategory.set(entry.category, list);
    });
    return [...byCategory.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [entries]);

  const entriesById = useMemo(() => new Map(entries.map((entry) => [entry.id, entry])), [entries]);
  const conflicts = useMemo(() => collectConflicts(entries), [entries]);

  const osLabels: Record<KeyboardShortcutsCatalogOs, string> = {
    all: strings['%keyboardShortcutsCatalog_os_all%'],
    macOS: strings['%keyboardShortcutsCatalog_os_macOS%'],
    windows: strings['%keyboardShortcutsCatalog_os_windows%'],
    linux: strings['%keyboardShortcutsCatalog_os_linux%'],
  };

  return (
    <div className="pr-twp tw:flex tw:flex-col tw:gap-6">
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
        <span className="tw:text-sm tw:font-medium">
          {strings['%keyboardShortcutsCatalog_os_label%']}
        </span>
        <ToggleGroup
          type="single"
          variant="outline"
          value={os}
          onValueChange={(value: string) => {
            // Radix reports '' when the pressed item is pressed again; keep the current choice.
            const choice = OS_CHOICES.find((candidate) => candidate === value);
            if (choice) setOs(choice);
          }}
          aria-label={strings['%keyboardShortcutsCatalog_os_label%']}
        >
          {OS_CHOICES.map((choice) => (
            <ToggleGroupItem key={choice} value={choice}>
              {osLabels[choice]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* table-fixed + explicit column widths keep the table within its container (no horizontal
          scroll); long content wraps within each cell instead of widening the table. */}
      <Table className="tw:table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="tw:w-[17%]">
              {strings['%keyboardShortcutsCatalog_header_shortcut%']}
            </TableHead>
            <TableHead className="tw:w-[25%]">
              {strings['%keyboardShortcutsCatalog_header_purpose%']}
            </TableHead>
            <TableHead className="tw:w-[14%]">
              {strings['%keyboardShortcutsCatalog_header_context%']}
            </TableHead>
            <TableHead className="tw:w-[16%]">
              {strings['%keyboardShortcutsCatalog_header_paratext9%']}
            </TableHead>
            <TableHead className="tw:w-[22%]">
              {strings['%keyboardShortcutsCatalog_header_locations%']}
            </TableHead>
            <TableHead className="tw:w-[6%]">
              {strings['%keyboardShortcutsCatalog_header_count%']}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map(([category, categoryEntries]) => (
            <Fragment key={category}>
              <TableRow>
                <TableCell colSpan={6}>
                  <h3 className="tw:text-lg tw:font-semibold">{category}</h3>
                </TableCell>
              </TableRow>
              {categoryEntries.map((entry) => (
                <TableRow key={entry.id} id={entry.id}>
                  <TableCell>
                    <EntryKeys keys={entry.keys} os={os} />
                  </TableCell>
                  {/* Override the shadcn cell default `whitespace-nowrap` so prose and long file
                      paths wrap within their fixed-width columns instead of overflowing. */}
                  <TableCell className="tw:whitespace-normal">
                    <div className="tw:flex tw:flex-col tw:gap-1">
                      <span>{entry.purpose}</span>
                      {entry.command && (
                        <Badge variant="secondary">
                          {strings['%keyboardShortcutsCatalog_menuHint_badge%']}
                        </Badge>
                      )}
                      {entry.conflicts?.map((conflict) => (
                        <span key={conflict.id} className="tw:flex tw:flex-col tw:gap-0.5">
                          <a href={`#${conflict.id}`}>
                            <Badge variant="destructive">
                              {strings['%keyboardShortcutsCatalog_conflict_badge%']} {conflict.id}
                            </Badge>
                          </a>
                          <span className="tw:text-xs tw:text-muted-foreground">
                            {conflict.note}
                          </span>
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="tw:whitespace-normal">{entry.context}</TableCell>
                  <TableCell className="tw:whitespace-normal">
                    {entry.paratext9 ? (
                      <div className="tw:flex tw:flex-col tw:gap-1">
                        <Badge
                          variant={entry.paratext9.status === 'same' ? 'secondary' : 'outline'}
                        >
                          {entry.paratext9.status === 'same'
                            ? strings['%keyboardShortcutsCatalog_paratext9_same%']
                            : strings['%keyboardShortcutsCatalog_paratext9_differs%']}
                        </Badge>
                        <OsKeys keys={entry.paratext9.keys} />
                        <span className="tw:text-xs">{entry.paratext9.note}</span>
                        <ResearchSource source={entry.paratext9.source} repoBaseUrl={repoBaseUrl} />
                      </div>
                    ) : (
                      <span className="tw:text-xs tw:text-muted-foreground">
                        {strings['%keyboardShortcutsCatalog_paratext9_unknown%']}
                      </span>
                    )}
                  </TableCell>
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
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>

      <section id="conflicts" className="tw:flex tw:flex-col tw:gap-2">
        <h2 className="tw:text-xl tw:font-semibold">
          {strings['%keyboardShortcutsCatalog_conflicts_heading%']}
        </h2>
        {conflicts.length === 0 ? (
          <p>{strings['%keyboardShortcutsCatalog_conflicts_none%']}</p>
        ) : (
          <Table className="tw:table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="tw:w-[40%]">
                  {strings['%keyboardShortcutsCatalog_header_entries%']}
                </TableHead>
                <TableHead className="tw:w-[60%]">
                  {strings['%keyboardShortcutsCatalog_header_note%']}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conflicts.map((conflict) => (
                <TableRow key={conflict.ids.join('\n')}>
                  <TableCell className="tw:whitespace-normal">
                    <ul className="tw:flex tw:flex-col tw:gap-2">
                      {conflict.ids.map((id) => {
                        const entry = entriesById.get(id);
                        return (
                          <li key={id} className="tw:flex tw:flex-col tw:gap-1">
                            <a href={`#${id}`} className="tw:underline">
                              {entry?.purpose ?? id}
                            </a>
                            {entry && <EntryKeys keys={entry.keys} os={os} />}
                          </li>
                        );
                      })}
                    </ul>
                  </TableCell>
                  <TableCell className="tw:whitespace-normal">
                    <ul className="tw:flex tw:flex-col tw:gap-1">
                      {conflict.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>

      {paratext9Only.length > 0 && (
        <section className="tw:flex tw:flex-col tw:gap-2">
          <h2 className="tw:text-xl tw:font-semibold">
            {strings['%keyboardShortcutsCatalog_paratext9Only_heading%']}
          </h2>
          <Table className="tw:table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="tw:w-[17%]">
                  {strings['%keyboardShortcutsCatalog_header_shortcut%']}
                </TableHead>
                <TableHead className="tw:w-[28%]">
                  {strings['%keyboardShortcutsCatalog_header_purpose%']}
                </TableHead>
                <TableHead className="tw:w-[30%]">
                  {strings['%keyboardShortcutsCatalog_header_note%']}
                </TableHead>
                <TableHead className="tw:w-[25%]">
                  {strings['%keyboardShortcutsCatalog_header_source%']}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paratext9Only.map((shortcut) => (
                <TableRow key={shortcut.id} id={shortcut.id}>
                  <TableCell>
                    <OsKeys keys={shortcut.keys} />
                  </TableCell>
                  <TableCell className="tw:whitespace-normal">{shortcut.purpose}</TableCell>
                  <TableCell className="tw:whitespace-normal">{shortcut.note}</TableCell>
                  <TableCell className="tw:whitespace-normal">
                    <ResearchSource source={shortcut.source} repoBaseUrl={repoBaseUrl} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </div>
  );
}
