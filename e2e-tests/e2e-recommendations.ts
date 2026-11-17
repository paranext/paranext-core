/**
 * Matches a branch's changed files to the isolated e2e tests that cover them.
 *
 * The mapping lives in `tests/isolated/subset-sources.json`. This module is pure: it takes the
 * changed files, the mapping and the CI spec lists, and returns a report. Reading git and printing
 * are the caller's job.
 */
import fs from 'fs';

/**
 * Per isolated key, the repository path prefixes its specs exist to test (`main`) and the ones they
 * only drive along the way (`incidental`). A trailing `/` makes a prefix a directory.
 */
export type SubsetSources = Record<string, { main: string[]; incidental: string[] }>;

/** How CI treats a recommended key. */
export type CiStatus =
  | { kind: 'spec'; coreList: 'always' | 'editor' | 'none' }
  | { kind: 'subset'; coreSpecCount: number; specCount: number };

/** One isolated key recommended for the changed files. */
export interface E2eRecommendation {
  /** The key as written in `subset-sources.json`. */
  key: string;
  /** The command that runs it. */
  command: string;
  /** The changed files that matched, sorted. */
  matchedFiles: string[];
  ci: CiStatus;
}

/** The result of matching changed files against the isolated e2e tests. */
export interface E2eRecommendationReport {
  /**
   * Keys matched through `main`, sorted by key. A file reaching both a subset key and a file-level
   * key inside it counts for the file-level key only, so the subset is recommended only for files
   * that reach none of its file-level keys.
   */
  recommendations: E2eRecommendation[];
  /** Keys matched only through `incidental`, sorted by key. */
  alsoExercised: { key: string; matchedFiles: string[] }[];
  /** Changed source files that no key lists, so no recommendation can cover them. */
  uncoveredFiles: string[];
  /** Changed files that add or change a menu, web view or command registration, sorted. */
  entryPointFiles: string[];
  /** Whether any changed file is under `e2e-tests/tests/`. */
  specsChanged: boolean;
}

/** Everything {@link recommendE2eTests} needs. */
export interface RecommendInput {
  /** Repository-relative changed paths, deleted ones included. */
  changedFiles: string[];
  /** Changed files whose diff adds a command registration. */
  filesAddingCommandRegistrations: string[];
  sources: SubsetSources;
  /** Entries of `e2e-tests/core-specs.txt`. */
  coreSpecs: string[];
  /** Entries of `e2e-tests/core-specs-editor.txt`. */
  editorCoreSpecs: string[];
  /** Each subset key's `*.spec.ts` paths, repository-relative. */
  specFilesBySubset: Record<string, string[]>;
}

const ISOLATED_PREFIX = 'e2e-tests/tests/isolated/';
const SOURCE_ROOTS = ['src/', 'extensions/src/', 'c-sharp/'];
const UNCOVERED_EXCLUSIONS =
  /\.test\.|\.stories\.|\.md$|localizedStrings\.json$|(^|\/)(__tests__|__mocks__)\//;

/**
 * The entries of a spec list: one repository path per line; `#` starts a comment line. Lines are
 * returned untrimmed, as the CI workflow reads them; `core-specs.test.ts` rejects a list whose
 * lines carry stray whitespace.
 */
export function readSpecList(filePath: string): string[] {
  return fs
    .readFileSync(filePath, 'utf8')
    .split('\n')
    .filter((line) => line.trim() !== '' && !line.startsWith('#'));
}

function matchesPrefix(file: string, prefix: string): boolean {
  return file === prefix || (prefix.endsWith('/') && file.startsWith(prefix));
}

const matchesAny = (file: string, prefixes: string[]) =>
  prefixes.some((prefix) => matchesPrefix(file, prefix));

const isSpecKey = (key: string) => key.endsWith('.spec.ts');

function addFile(map: Map<string, Set<string>>, key: string, file: string) {
  const files = map.get(key) ?? new Set<string>();
  files.add(file);
  map.set(key, files);
}

function ciStatus(key: string, input: RecommendInput): CiStatus {
  if (isSpecKey(key)) {
    const specPath = `${ISOLATED_PREFIX}${key}`;
    if (input.coreSpecs.includes(specPath)) return { kind: 'spec', coreList: 'always' };
    if (input.editorCoreSpecs.includes(specPath)) return { kind: 'spec', coreList: 'editor' };
    return { kind: 'spec', coreList: 'none' };
  }
  const specs = input.specFilesBySubset[key] ?? [];
  return {
    kind: 'subset',
    coreSpecCount: specs.filter(
      (spec) => input.coreSpecs.includes(spec) || input.editorCoreSpecs.includes(spec),
    ).length,
    specCount: specs.length,
  };
}

/** Matches the changed files to the isolated e2e keys that cover them. */
export function recommendE2eTests(input: RecommendInput): E2eRecommendationReport {
  const keys = Object.keys(input.sources);
  const mainMatches = new Map<string, Set<string>>();
  const incidentalMatches = new Map<string, Set<string>>();

  input.changedFiles.forEach((file) => {
    const mainKeys = keys.filter((key) => matchesAny(file, input.sources[key].main));
    mainKeys
      // A subset yields to a file-level key inside it that this same file reaches.
      .filter((key) => !mainKeys.some((other) => other.startsWith(`${key}/`)))
      .forEach((key) => addFile(mainMatches, key, file));
    keys
      .filter((key) => !mainKeys.includes(key) && matchesAny(file, input.sources[key].incidental))
      .forEach((key) => addFile(incidentalMatches, key, file));
  });

  const sorted = (files: Set<string> | undefined) => [...(files ?? [])].sort();

  const recommendations = [...mainMatches.keys()].sort().map((key) => ({
    key,
    command: isSpecKey(key)
      ? `npm run test:e2e:isolated ${ISOLATED_PREFIX}${key}`
      : `npm run test:e2e:isolated ${key}`,
    matchedFiles: sorted(mainMatches.get(key)),
    ci: ciStatus(key, input),
  }));

  const alsoExercised = [...incidentalMatches.keys()]
    .filter((key) => !mainMatches.has(key))
    .sort()
    .map((key) => ({ key, matchedFiles: sorted(incidentalMatches.get(key)) }));

  const allPrefixes = keys.flatMap((key) => [
    ...input.sources[key].main,
    ...input.sources[key].incidental,
  ]);
  const uncoveredFiles = input.changedFiles
    .filter((file) => SOURCE_ROOTS.some((root) => file.startsWith(root)))
    .filter((file) => !UNCOVERED_EXCLUSIONS.test(file))
    .filter((file) => !matchesAny(file, allPrefixes))
    .sort();

  const entryPointFiles = [
    ...new Set([
      ...input.changedFiles.filter(
        (file) =>
          file.endsWith('contributions/menus.json') || file.endsWith('.web-view-provider.ts'),
      ),
      ...input.filesAddingCommandRegistrations,
    ]),
  ].sort();

  return {
    recommendations,
    alsoExercised,
    uncoveredFiles,
    entryPointFiles,
    specsChanged: input.changedFiles.some((file) => file.startsWith('e2e-tests/tests/')),
  };
}
