import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = process.cwd();
const ROOTS = [
  'src',
  'extensions/src',
  'lib/platform-bible-react/src',
  'lib/platform-bible-utils/src',
];
const SKIP_DIRS = new Set(['node_modules', 'dist', 'temp-build', 'storybook-static', '.vite']);

/**
 * The helper's own home, plus this sweep's own file — the `EXEMPT` entries below necessarily quote
 * the matched line's own text, which would otherwise trip the sweep over its own source.
 */
const SELF_REFERENTIAL_FILES = new Set([
  path.join('lib', 'platform-bible-utils', 'src', 'project-util.ts'),
  path.join('src', 'renderer', 'components', 'projects', 'project-name-adoption.test.ts'),
]);

/**
 * The shared helpers. A line that calls one is adopting the rule rather than re-inlining it, so it
 * is skipped structurally — that is the behaviour this sweep exists to encourage, and listing every
 * adoption site as an exemption would make the list grow with the good outcome.
 */
const HELPERS =
  /\b(formatProjectName|hasDistinctFullName|normalizeFullName|compareProjectsByName|PROJECT_NAME_SEPARATOR)\b/;

/**
 * A field whose name ends in `fullName`, in any casing or prefix — `fullName`, `projectFullName`,
 * `displayFullName`. The full name is the field whose presence signals a two-name display decision;
 * the short name is spelled too many ways across the repo (`shortName`, `name`, `displayName`) to
 * anchor on.
 */
const FULL_NAME_FIELD = /\b\w*[Ff]ullName\b/;

/**
 * An operator that compares a name, falls back from it, or joins it into a label — the shapes a
 * re-inlined de-dup or a hand-joined label can take, in both strict and loose spellings.
 * Deliberately broader than the shapes we expect (`.claude/rules/grep-safety-net.md`):
 * over-matching costs one triage entry in `EXEMPT`, whereas a shape the pattern cannot express is
 * silent.
 */
const COMPOSING_OPERATOR = /(===?|!==?|\?\?|\|\||\$\{|\.join\(| \+ )/;

/**
 * Sites that match the pattern without being a re-inlined project-name label. Per-site, not
 * per-file, so a new inline format added to one of these files is still caught.
 *
 * Keyed on file + a distinctive substring of the matched line, not a line number — a line-number
 * key goes stale silently as the file changes, and a stale entry can end up exempting a genuine
 * future violation that happens to land on that same line number. Each entry must match exactly one
 * line (asserted below), so an over-broad key that starts swallowing a second site fails rather
 * than hiding it.
 */
const EXEMPT: { file: string; contains: string; reason: string }[] = [
  // ---- Search haystacks: fields concatenated or scanned for matching, never rendered ----
  {
    file: 'src/renderer/components/projects/project-picker.component.tsx',
    contains: 'project.fullName.toLowerCase().includes(lower)',
    reason: 'search predicate — matches on either name, renders neither',
  },
  {
    file: 'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
    contains: 'row.rowKey',
    reason: 'cmdk search haystack — five fields concatenated for matching, never rendered',
  },
  {
    file: 'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
    contains: "(r.fullName ?? '').toLowerCase().includes(needle)",
    reason: 'search predicate — matches on either name, renders neither',
  },
  {
    file: 'lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.component.tsx',
    contains: 'resource.fullName.toLowerCase().includes(lower)',
    reason: 'search predicate — matches on either name, renders neither',
  },
  {
    file: 'extensions/src/platform-get-resources/src/home.component.tsx',
    contains: 'project.fullName.toLowerCase().includes(filter)',
    reason: 'search predicate — matches on either name, renders neither',
  },
  {
    file: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
    contains: 'resource.fullName.toLowerCase().includes(filter)',
    reason: 'search predicate — matches on either name, renders neither',
  },
  {
    file: 'extensions/src/platform-get-resources/src/get-resources.component.tsx',
    contains: 'key={resource.displayName + resource.fullName}',
    reason: 'React list key — never rendered as text',
  },

  // ---- Data shaping: choosing which field populates a slot, not composing a label ----
  {
    file: 'src/renderer/components/platform-bible-toolbar.tsx',
    contains: 'beginOpenProject(item ??',
    reason:
      'placeholder project for an id with no list row — no full name to compose, and the `??` selects the placeholder rather than a name',
  },
  {
    file: 'src/renderer/hooks/use-project-picker-data.hook.ts',
    contains: 'fullName: m.fullName ?? m.name ?? m.id',
    reason: 'metadata adapter — fills the full-name slot; the label itself is composed downstream',
  },
  {
    file: 'src/shared/models/project-lookup.service-model.ts',
    contains: 'enrichedMd.fullName ??= md.fullName',
    reason: 'metadata merge between two sources — no display involved',
  },
  {
    file: 'extensions/src/platform-get-resources/src/home.component.tsx',
    contains: 'fullName: data.fullName ?? data.name ?? data.id',
    reason: 'resource adapter — fills the full-name slot; the label itself is composed downstream',
  },
  {
    file: 'extensions/src/platform-get-resources/src/get-local-non-dbl-resources.utils.ts',
    contains: 'fullName: m.fullName ?? m.name ?? m.id',
    reason: 'resource adapter — fills the full-name slot; the label itself is composed downstream',
  },
  {
    file: 'extensions/src/platform-scripture-editor/src/downloaded-resources.utils.ts',
    contains: 'fullName: data.fullName ?? data.name ?? data.id',
    reason: 'resource adapter — fills the full-name slot; the label itself is composed downstream',
  },
  {
    file: 'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
    contains: 'const sourceName = copySourceProject?.shortName',
    reason:
      'transient loading message already leads with the short name; the full name is a defensive fallback for a project with an empty short name, not a composed label',
  },

  // ---- DBL resource names: a `name`/`displayName`/`fullName` triple, not a project short name ----
  // These carry resource metadata rather than the `platform.name`/`platform.fullName` project
  // settings the helper is typed for, so short-name-first does not apply to them. The
  // short-name-first work asks only that Share Layout be left unaffected, and it is.
  // Whether resource labels should adopt a short-name-first format of their own is an open
  // question with no ticket yet; if they should, these four entries are the complete site list.
  {
    file: 'src/renderer/components/dialogs/share-layout.component.tsx',
    contains: 'match.fullName',
    reason: 'DBL resource label — resource metadata, not project names',
  },
  {
    file: 'extensions/src/platform-scripture-editor/src/resource-reference.utils.ts',
    contains: 'dblData.fullName',
    reason: 'DBL resource label — resource metadata, not project names',
  },
  {
    file: 'extensions/src/platform-scripture-editor/src/scripture-text-grid-contents.utils.ts',
    contains: 'downloadedResource.fullName !== downloadedResource.name',
    reason: 'DBL resource long-name slot — resource metadata, not project names',
  },
  {
    file: 'extensions/src/platform-scripture-editor/src/scripture-text-grid/view-options-long-name.utils.ts',
    contains: 'fullName === reference.name',
    reason: 'DBL resource long-name slot — resource metadata, not project names',
  },

  // ---- Fixtures and prototypes: not shipped UI ----
  {
    file: 'src/stories/design-ideas/home-unified.component.tsx',
    contains: 'pendingRemove.shortName',
    reason: 'design-ideas prototype, not shipped UI',
  },
  {
    file: 'src/stories/design-ideas/home-unified.stories.tsx',
    contains: 'RESOURCE_KIND_LABEL[type]',
    reason: 'design-ideas prototype fixture, not shipped UI',
  },
  {
    file: 'src/renderer/components/dialogs/share-layout.stories.tsx',
    contains: 'fullName: `Scroll Test Version',
    reason: 'story fixture — generates sample data, composes no label',
  },
  {
    file: 'lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.data.ts',
    contains: 'Generated Resource',
    reason: 'sample-data generator — composes no label',
  },
  {
    file: 'extensions/src/platform-get-resources/src/get-resources.stories.tsx',
    contains: 'language} Scripture',
    reason: 'story fixture — generates sample data, composes no label',
  },

  // ---- Not a name composition ----
  {
    file: 'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
    contains: "props.triggerLabelFormat === 'shortNameAndFullName'",
    reason: 'compares a prop value whose name happens to end in `FullName`',
  },
];

/** Whether a line is a comment (line comment, block-comment body, or JSDoc/TSDoc line). */
function isCommentLine(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*');
}

/**
 * Whether a file is swept. Tests are excluded: their fixtures deliberately construct the mirrored
 * and equal-name shapes the helper exists to handle, so sweeping them would flag the very coverage
 * that pins the rule. Stories are NOT excluded — they are the surface developers copy from.
 */
function isSweptFile(relativePosix: string): boolean {
  return !/\.test\.tsx?$/.test(relativePosix);
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    if (SKIP_DIRS.has(entry)) return [];
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.tsx?$/.test(full) ? [full] : [];
  });
}

type Site = { site: string; line: string; relativePosix: string };

/**
 * Every line that looks like it composes or compares a project name, exemptions not yet applied.
 *
 * What this sweep does NOT cover, so a green run is not over-trusted: it is line-based and
 * identifier-based, so it cannot see a composition split across lines, two fields rendered in
 * adjacent JSX elements with no operator between them, a pair of names that spells the full name
 * something other than `*fullName` (the `name`/`displayName` pairs the DBL resource surfaces use),
 * or a hand-joined suffix bolted onto a legitimate helper call, since a line calling a helper is
 * skipped wholesale. Widening past any of those needs a parser rather than a regex.
 *
 * What it does guarantee is narrower and still worth having: a new single-line composition naming a
 * `*fullName` field fails this test until someone either adopts the helper or writes down in
 * `EXEMPT` why the site is not a project-name label.
 */
function candidateSites(): Site[] {
  return ROOTS.flatMap((root) => sourceFiles(path.join(REPO_ROOT, root))).flatMap((file) => {
    const relative = path.relative(REPO_ROOT, file);
    if (SELF_REFERENTIAL_FILES.has(relative)) return [];
    const relativePosix = relative.split(path.sep).join('/');
    if (!isSweptFile(relativePosix)) return [];
    return readFileSync(file, 'utf8')
      .split('\n')
      .flatMap((line, index) => {
        if (isCommentLine(line)) return [];
        if (HELPERS.test(line)) return [];
        if (!FULL_NAME_FIELD.test(line) || !COMPOSING_OPERATOR.test(line)) return [];
        return [{ site: `${relativePosix}:${index + 1}`, line, relativePosix }];
      });
  });
}

describe('project-name formatting is adopted, not re-inlined', () => {
  it('composes and de-dups project names only through the shared helper', () => {
    // `formatProjectName` owns the joined label and `hasDistinctFullName` owns
    // `fullName && fullName !== shortName`. A copy elsewhere means a surface can drift from the
    // others the next time the rule changes. A new site here is not necessarily a bug — but it has
    // to be triaged into EXEMPT with a reason rather than landing silently.
    const violations = candidateSites()
      .filter(
        (candidate) =>
          !EXEMPT.some(
            (entry) =>
              entry.file === candidate.relativePosix && candidate.line.includes(entry.contains),
          ),
      )
      .map((candidate) => candidate.site);
    expect(violations).toEqual([]);
  });

  it('has no stale or over-broad exemption', () => {
    // An exemption keyed on too common a substring silently swallows a genuine future violation
    // that lands on another line of the same file, and one whose site is gone is dead weight that
    // reads as coverage. Requiring exactly one match makes both fail loudly.
    const candidates = candidateSites();
    const misMatched = EXEMPT.map((entry) => {
      const matches = candidates.filter(
        (candidate) =>
          entry.file === candidate.relativePosix && candidate.line.includes(entry.contains),
      );
      return { entry: `${entry.file} :: ${entry.contains}`, matched: matches.length };
    }).filter((result) => result.matched !== 1);
    expect(misMatched).toEqual([]);
  });
});
