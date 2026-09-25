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
 * The shared helpers that decide a name's SHAPE. A line that calls one is adopting the rule rather
 * than re-inlining it, so it is skipped structurally — that is the behavior this sweep exists to
 * encourage, and listing every adoption site as an exemption would make the list grow with the good
 * outcome.
 *
 * `normalizeFullName` is deliberately NOT here. It narrows a raw setting value and decides nothing
 * about order or de-dup, so `normalizeFullName(p.fullName) ?? p.shortName` — the long-name-first
 * fallback this sweep exists to catch — would otherwise buy a free pass just by mentioning it.
 */
const HELPERS =
  /\b(formatProjectName|hasDistinctFullName|compareProjectsByName|PROJECT_NAME_SEPARATOR)\b/;

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
const COMPOSING_OPERATOR = /(===?|!==?|\?\?|\|\||&&|\$\{|\.join\(|\.concat\(| \+ | \? )/;

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
  // ---- Fields named `*fullName` that are not a project's name ----
  {
    file: 'lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.utils.ts',
    contains: 'matchingBookIdForFullName && availableBooks.includes',
    reason: "a BOOK's full English name resolved to a book id — no project name is involved",
  },
  // ---- Search haystacks: fields concatenated or scanned for matching, never rendered ----
  {
    file: 'src/renderer/components/projects/project-picker.component.tsx',
    contains: 'project.fullName?.toLowerCase().includes(lower)',
    reason: 'search predicate — matches on either name, renders neither',
  },
  {
    file: 'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
    contains: 'row.rowKey',
    reason: 'cmdk search haystack — three fields concatenated for matching, never rendered',
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
    contains: "(project.fullName ?? '').toLowerCase().includes(filter)",
    reason: 'search predicate — matches on either name, renders neither',
  },
  {
    file: 'extensions/src/platform-get-resources/src/home.component.tsx',
    contains: "const aFullName = a.fullName ?? ''",
    reason:
      'sort key — substitutes the empty string for an absent full name so the column orders; renders nothing',
  },
  {
    file: 'extensions/src/platform-get-resources/src/home.component.tsx',
    contains: "const bFullName = b.fullName ?? ''",
    reason:
      'sort key — substitutes the empty string for an absent full name so the column orders; renders nothing',
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

  // ---- The helper's decision hoisted to a local, so its name is off the line it governs ----
  {
    file: 'src/renderer/components/platform-bible-toolbar.tsx',
    contains: 'secondary={hasFullName ? fullName : undefined}',
    reason:
      '`hasFullName` is `hasDistinctFullName` hoisted two lines above — the helper makes the decision, the ternary only fills the slot',
  },
  {
    file: 'src/renderer/components/platform-bible-toolbar.tsx',
    contains: 'hasFullName ? formatReplacementString(template',
    reason:
      'joins through the localized format string (the documented toolbar exception) under the hoisted `hasDistinctFullName` decision',
  },

  // ---- Data shaping: choosing which field populates a slot, not composing a label ----
  {
    file: 'src/shared/models/project-lookup.service-model.ts',
    contains: 'enrichedMd.fullName ??= md.fullName',
    reason: 'metadata merge between two sources — no display involved',
  },
  {
    file: 'extensions/src/platform-get-resources/src/get-local-non-dbl-resources.utils.ts',
    contains: "fullName: normalizeFullName(m.fullName) ?? ''",
    reason:
      'narrows an absent full name to the empty string because `DblResourceData.fullName` is a required wire field — mirrors nothing and composes no label',
  },
  {
    file: 'extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.component.tsx',
    contains: 'const sourceName = copySourceProject?.shortName',
    reason:
      'transient loading message already leads with the short name; the full name is a defensive fallback for a project with an empty short name, not a composed label',
  },
  {
    file: 'src/renderer/components/dialogs/team-layout.dialog.tsx',
    contains:
      "const fullName = isPlatformError(projectFullNameSetting) ? '' : projectFullNameSetting",
    reason:
      'narrows a setting that failed to load to an empty name before `formatProjectName` joins it — composes no label',
  },
  {
    file: 'src/renderer/components/dialogs/team-layout.dialog.tsx',
    contains: 'if (!shortName) return fullName || undefined',
    reason:
      'the label is `formatProjectName` on the next line; the full name is a defensive fallback for a project with an empty short name, not a composed label',
  },

  // ---- DBL resource names: a `name`/`displayName`/`fullName` triple, not a project short name ----
  // These carry resource metadata rather than the `platform.name`/`platform.fullName` project
  // settings the helper is typed for, but a resource label a user reads leads with the short name
  // like every other label. A site that COMPOSES such a label calls `formatProjectName` with
  // `displayName` in the `shortName` slot rather than earning an exemption here; only a site that
  // fills a long-name SLOT the UI joins downstream belongs in this section.
  {
    file: 'extensions/src/platform-scripture-editor/src/scripture-text-grid/view-options-long-name.utils.ts',
    contains: 'fullName === reference.name',
    reason:
      "fills View Options' long-name slot, composing no label. The row itself is joined downstream in `resource-collection-options.component.tsx`, short name first, with an em dash rather than `PROJECT_NAME_SEPARATOR` — a deliberate difference for that panel, and the order this rule is about is already correct there",
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
    file: 'src/renderer/components/dialogs/team-layout.stories.tsx',
    contains: 'fullName: `Scroll Test Version',
    reason: 'story fixture — generates sample data, composes no label',
  },
  {
    file: 'lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.data.ts',
    contains: 'Generated Resource',
    reason: 'sample-data generator — composes no label',
  },
  {
    file: 'lib/platform-bible-react/src/components/advanced/resource-picker-dialog/resource-picker-dialog.data.ts',
    contains: 'language} Resource',
    reason: 'many-language sample-data generator — composes no label',
  },
  {
    file: 'extensions/src/platform-get-resources/src/get-resources.stories.tsx',
    contains: 'language} Scripture',
    reason: 'story fixture — generates sample data, composes no label',
  },

  // ---- Not a name composition ----
  {
    file: 'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx',
    contains: "triggerLabelFormat === 'shortNameAndFullName'",
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
