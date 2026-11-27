import { Fragment, useMemo } from 'react';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'platform-bible-react';
import { findIconConflicts, type IconConflict } from './icon-conflicts.util';
import {
  ICON_CONCEPTS,
  type IconCatalogEntry,
  type IconConflictNote,
  type IconConflictSeverity,
} from './icon-usage.model';

const DEFAULT_REPO_BASE_URL = 'https://github.com/paranext/paranext-core/blob/main';

const SEVERITY_ORDER: IconConflictSeverity[] = ['fix', 'review', 'acceptable'];

const SEVERITY_LABELS: Record<IconConflictSeverity, string> = {
  fix: 'Fix',
  review: 'Review',
  acceptable: 'Acceptable',
};

const SEVERITY_BADGE_VARIANTS: Record<
  IconConflictSeverity,
  'destructive' | 'secondary' | 'outline'
> = {
  fix: 'destructive',
  review: 'secondary',
  acceptable: 'outline',
};

/** Props for {@link IconCatalog} */
export type IconCatalogProps = {
  /** Every icon glyph and its usages */
  entries: IconCatalogEntry[];
  /** Assessment of each detected conflict, keyed by conflict id */
  conflictNotes: Record<string, IconConflictNote>;
  /** Base URL each location path is appended to for its source link. Defaults to the repo `main`. */
  repoBaseUrl?: string;
};

function IconGlyph({ entry }: { entry: IconCatalogEntry }) {
  const { component: Glyph } = entry;
  return <Glyph className="tw:h-5 tw:w-5 tw:shrink-0" aria-hidden />;
}

function SourceLink({ location, repoBaseUrl }: { location: string; repoBaseUrl: string }) {
  return (
    <a
      href={`${repoBaseUrl}/${location}`}
      target="_blank"
      rel="noreferrer"
      className="tw:text-xs tw:break-all tw:underline"
    >
      {location}
    </a>
  );
}

function getConflictTitle(conflict: IconConflict): string {
  return conflict.kind === 'same-concept'
    ? `"${ICON_CONCEPTS[conflict.concept]}" drawn with ${conflict.icons.length} icons`
    : `${conflict.icon} used for ${conflict.concepts.length} meanings`;
}

/** One conflict's row: the icons involved, what each means there, and the recommendation */
function ConflictRow({
  conflict,
  note,
  entriesByName,
}: {
  conflict: IconConflict;
  note: IconConflictNote | undefined;
  entriesByName: Map<string, IconCatalogEntry>;
}) {
  const rows =
    conflict.kind === 'same-concept'
      ? conflict.icons.map((icon) => ({ key: icon, icon, label: icon }))
      : conflict.concepts.map((concept) => ({
          key: concept,
          icon: conflict.icon,
          label: ICON_CONCEPTS[concept],
        }));
  return (
    <TableRow>
      <TableCell className="tw:align-top tw:whitespace-normal">
        <div className="tw:flex tw:flex-col tw:gap-1">
          {note && (
            <Badge variant={SEVERITY_BADGE_VARIANTS[note.severity]} className="tw:self-start">
              {SEVERITY_LABELS[note.severity]}
            </Badge>
          )}
          <span className="tw:font-medium">{getConflictTitle(conflict)}</span>
        </div>
      </TableCell>
      <TableCell className="tw:align-top tw:whitespace-normal">
        <ul className="tw:flex tw:flex-col tw:gap-1">
          {rows.map((row) => {
            const entry = entriesByName.get(row.icon);
            return (
              <li key={row.key} className="tw:flex tw:items-center tw:gap-2">
                {entry && <IconGlyph entry={entry} />}
                <span>{row.label}</span>
              </li>
            );
          })}
        </ul>
      </TableCell>
      <TableCell className="tw:align-top tw:whitespace-normal">
        {note?.recommendation ?? 'No assessment recorded yet.'}
      </TableCell>
    </TableRow>
  );
}

/**
 * Renders the icon catalog page: a summary of conflicting icon usage, then every icon glyph with
 * each place it is used, what it means there, and a link to the source.
 */
export function IconCatalog({
  entries,
  conflictNotes,
  repoBaseUrl = DEFAULT_REPO_BASE_URL,
}: IconCatalogProps) {
  const entriesByName = useMemo(
    () => new Map(entries.map((entry) => [entry.name, entry])),
    [entries],
  );
  const conflictsBySeverity = useMemo(() => {
    const conflicts = findIconConflicts(entries);
    return SEVERITY_ORDER.map((severity) => ({
      severity,
      conflicts: conflicts.filter((conflict) => conflictNotes[conflict.id]?.severity === severity),
    })).concat({
      // Conflicts without a note still show, so a missing assessment is visible on the page
      severity: 'review',
      conflicts: conflicts.filter((conflict) => !conflictNotes[conflict.id]),
    });
  }, [entries, conflictNotes]);
  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => a.name.localeCompare(b.name)),
    [entries],
  );
  const usageCount = entries.reduce((count, entry) => count + entry.usages.length, 0);

  return (
    <div className="pr-twp tw:flex tw:flex-col tw:gap-8">
      <section className="tw:flex tw:flex-col tw:gap-2">
        <h2 className="tw:text-xl tw:font-semibold">Conflicts</h2>
        <p className="tw:text-sm tw:text-muted-foreground">
          Detected from the catalog below: an icon drawn for more than one meaning, or a meaning
          drawn with more than one icon. Fix first, then review; acceptable ones are deliberate.
        </p>
        <Table className="tw:table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="tw:w-[26%]">Conflict</TableHead>
              <TableHead className="tw:w-[30%]">Icons / meanings</TableHead>
              <TableHead className="tw:w-[44%]">Recommendation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conflictsBySeverity.map(({ severity, conflicts }) =>
              conflicts.map((conflict) => (
                <ConflictRow
                  key={`${severity}-${conflict.id}`}
                  conflict={conflict}
                  note={conflictNotes[conflict.id]}
                  entriesByName={entriesByName}
                />
              )),
            )}
          </TableBody>
        </Table>
      </section>

      <section className="tw:flex tw:flex-col tw:gap-2">
        <h2 className="tw:text-xl tw:font-semibold">All icons</h2>
        <p className="tw:text-sm tw:text-muted-foreground">
          {entries.length} icons, {usageCount} usage sites.
        </p>
        <Table className="tw:table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="tw:w-[24%]">Icon</TableHead>
              <TableHead className="tw:w-[30%]">Meaning</TableHead>
              <TableHead className="tw:w-[46%]">Where in code</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEntries.map((entry) => (
              <Fragment key={entry.name}>
                {(entry.usages.length > 0 ? entry.usages : [undefined]).map((usage, index) => (
                  <TableRow key={usage ? `${usage.location}-${usage.concept}` : 'unused'}>
                    {index === 0 && (
                      <TableCell
                        rowSpan={Math.max(entry.usages.length, 1)}
                        className="tw:align-top tw:whitespace-normal"
                      >
                        <div className="tw:flex tw:items-start tw:gap-2">
                          <IconGlyph entry={entry} />
                          <div className="tw:flex tw:flex-col">
                            <span className="tw:font-medium">{entry.name}</span>
                            <span className="tw:text-xs tw:text-muted-foreground">
                              {entry.library}
                            </span>
                            {entry.importedAs && (
                              <span className="tw:text-xs tw:text-muted-foreground">
                                also imported as {entry.importedAs.join(', ')}
                              </span>
                            )}
                            {entry.lucideName && (
                              <span className="tw:text-xs tw:text-muted-foreground">
                                by name: <code>{entry.lucideName}</code>
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    )}
                    <TableCell className="tw:whitespace-normal">
                      {usage ? (
                        <div className="tw:flex tw:flex-col">
                          <span>{usage.meaning}</span>
                          <span className="tw:text-xs tw:text-muted-foreground">
                            {ICON_CONCEPTS[usage.concept]}
                            {usage.isMirrored && ' · mirrored'}
                          </span>
                        </div>
                      ) : (
                        <span className="tw:text-muted-foreground">
                          Registered for use by name; not used yet
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="tw:whitespace-normal">
                      {usage && <SourceLink location={usage.location} repoBaseUrl={repoBaseUrl} />}
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
