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

/** The helper's own home — the one place allowed to spell these rules out in real code. */
const SELF_REFERENTIAL_FILES = new Set([
  path.join('lib', 'platform-bible-utils', 'src', 'project-util.ts'),
]);

/**
 * Sites that match a pattern without being a project-name label. Per-site, not per-file, so a new
 * inline format added to one of these files is still caught. Comment lines quoting or discussing a
 * rule are handled structurally (see `isCommentLine`), not listed here — a line-keyed exemption for
 * prose goes stale silently the moment an unrelated edit shifts the line number.
 */
const EXEMPT = new Map<string, string>([
  [
    'lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx:677',
    'cmdk search haystack — five fields concatenated for matching, never rendered',
  ],
  [
    'src/stories/design-ideas/home-unified.component.tsx:2870',
    'design-ideas prototype, not shipped UI',
  ],
]);

/** Whether a line is a comment (line comment, block-comment body, or JSDoc/TSDoc line). */
function isCommentLine(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*');
}

/** The de-dup rule, matched in both operand orders. */
const DEDUP = [
  /\bshortName\b[^\n]{0,60}(!==|===)[^\n]{0,60}\bfullName\b/,
  /\bfullName\b[^\n]{0,60}(!==|===)[^\n]{0,60}\bshortName\b/,
];

/** A joined short+full label in a template literal, matched with either field leading. */
const JOINED = [
  /\$\{[^}]*\bshortName\b[^}]*\}[^\n]*\$\{[^}]*\bfullName\b/,
  /\$\{[^}]*\bfullName\b[^}]*\}[^\n]*\$\{[^}]*\bshortName\b/,
];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    if (SKIP_DIRS.has(entry)) return [];
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.tsx?$/.test(full) ? [full] : [];
  });
}

function findViolations(patterns: RegExp[]): string[] {
  return ROOTS.flatMap((root) => sourceFiles(path.join(REPO_ROOT, root))).flatMap((file) => {
    const relative = path.relative(REPO_ROOT, file);
    if (SELF_REFERENTIAL_FILES.has(relative)) return [];
    return readFileSync(file, 'utf8')
      .split('\n')
      .flatMap((line, index) => {
        if (isCommentLine(line)) return [];
        if (!patterns.some((pattern) => pattern.test(line))) return [];
        const site = `${relative.split(path.sep).join('/')}:${index + 1}`;
        return EXEMPT.has(site) ? [] : [site];
      });
  });
}

describe('project-name formatting is adopted, not re-inlined', () => {
  it('has no de-dup rule outside the shared helper', () => {
    // `hasDistinctFullName` owns `fullName && fullName !== shortName`. A copy here means a surface
    // can drift from the others the next time the rule changes.
    expect(findViolations(DEDUP)).toEqual([]);
  });

  it('has no hand-joined short+full label outside the shared helper', () => {
    // `formatProjectName` owns the joined string, in both field orders — the pattern catches a
    // long-name-first label as readily as a short-name-first one.
    expect(findViolations(JOINED)).toEqual([]);
  });
});
