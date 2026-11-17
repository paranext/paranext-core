/**
 * Matches a branch's changed files to the isolated e2e tests that cover them.
 *
 * The mapping lives in `tests/isolated/subset-sources.json`. {@link recommendE2eTests} is pure: it
 * takes the changed files, the mapping and the CI spec lists, and returns a report. The
 * command-line entry point at the bottom of the file reads git and the spec lists and prints the
 * report as JSON.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
  /**
   * Whether an e2e spec or its support code changed: a `*.spec.ts`, a `*.page.ts` or a fixture
   * `.ts` file under `e2e-tests/` (not a unit test, README or mapping file).
   */
  specsChanged: boolean;
}

/** Everything {@link recommendE2eTests} needs. */
export interface RecommendInput {
  /** Repository-relative changed paths, deleted ones included. */
  changedFiles: string[];
  /**
   * Changed files whose diff adds or removes a command or web view provider registration
   * ({@link REGISTRATION_PATTERN}). Files outside the source roots or that are not runtime code are
   * ignored.
   */
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

/**
 * Matches added or removed lines that register a command (`registerCommand(`, or a C# request
 * handler named `"command:…`) or a web view provider (`registerWebViewProvider(`). Passed to `git
 * diff -G` and tested against the content of untracked files.
 */
export const REGISTRATION_PATTERN = 'registerCommand\\(|registerWebViewProvider\\(|"command:';

/** Paths that are not runtime code: tests, stories, docs, type declarations, build metadata. */
const NON_RUNTIME =
  /\.test\.|\.test-util\.|\.stories\.|\.md$|\.mdx$|\.d\.ts$|(^|\/)(__tests__|__mocks__|assets|\.config)\/|(^|\/)[^/]*Tests\/|(^|\/)package\.json$|(^|\/)manifest\.json$|\.csproj$|\.props$/;
const isNonRuntime = (file: string) => NON_RUNTIME.test(file);
const isInSourceRoot = (file: string) => SOURCE_ROOTS.some((root) => file.startsWith(root));
const isE2eSpecSupport = (file: string) =>
  file.startsWith('e2e-tests/') &&
  !file.endsWith('.test.ts') &&
  (file.endsWith('.spec.ts') ||
    file.endsWith('.page.ts') ||
    (file.startsWith('e2e-tests/fixtures/') && file.endsWith('.ts')));

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

  // Localized strings stay matchable (e2e locators use visible text) but are never "uncovered".
  const runtimeFiles = input.changedFiles.filter((file) => !isNonRuntime(file));

  runtimeFiles.forEach((file) => {
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
  const uncoveredFiles = runtimeFiles
    .filter(isInSourceRoot)
    .filter((file) => !file.endsWith('localizedStrings.json'))
    .filter((file) => !matchesAny(file, allPrefixes))
    .sort();

  const entryPointFiles = [
    ...new Set([
      ...runtimeFiles.filter(
        (file) =>
          file.endsWith('contributions/menus.json') || file.endsWith('.web-view-provider.ts'),
      ),
      ...input.filesAddingCommandRegistrations
        .filter(isInSourceRoot)
        .filter((file) => !isNonRuntime(file)),
    ]),
  ].sort();

  return {
    recommendations,
    alsoExercised,
    uncoveredFiles,
    entryPointFiles,
    specsChanged: input.changedFiles.some(isE2eSpecSupport),
  };
}

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function git(...args: string[]): string[] {
  return execFileSync('git', args, {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  })
    .split('\n')
    .filter((line) => line !== '');
}

function listSpecFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listSpecFiles(fullPath);
    return entry.name.endsWith('.spec.ts')
      ? [path.relative(REPO_ROOT, fullPath).split(path.sep).join('/')]
      : [];
  });
}

/**
 * Prints the {@link E2eRecommendationReport} for the working tree against `mergeBase` as JSON on
 * stdout.
 */
function runCli(mergeBase: string): void {
  const sources: SubsetSources = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, 'e2e-tests/tests/isolated/subset-sources.json'), 'utf8'),
  );
  const specFilesBySubset: Record<string, string[]> = {};
  Object.keys(sources)
    .filter((key) => !isSpecKey(key))
    .forEach((key) => {
      specFilesBySubset[key] = listSpecFiles(path.join(REPO_ROOT, ISOLATED_PREFIX, key));
    });

  // `--no-renames` lists a rename's old and new path; untracked files never appear in `git diff`.
  const untrackedFiles = git('ls-files', '--others', '--exclude-standard');
  const untrackedRegistering = untrackedFiles.filter((file) => {
    try {
      return new RegExp(REGISTRATION_PATTERN).test(
        fs.readFileSync(path.join(REPO_ROOT, file), 'utf8'),
      );
    } catch {
      return false;
    }
  });

  const report = recommendE2eTests({
    changedFiles: [
      ...new Set([
        ...git('diff', '--no-renames', '--name-only', '--end-of-options', mergeBase),
        ...untrackedFiles,
      ]),
    ],
    filesAddingCommandRegistrations: [
      ...git(
        'diff',
        '--no-renames',
        '--name-only',
        '-G',
        REGISTRATION_PATTERN,
        '--end-of-options',
        mergeBase,
      ),
      ...untrackedRegistering,
    ],
    sources,
    coreSpecs: readSpecList(path.join(REPO_ROOT, 'e2e-tests/core-specs.txt')),
    editorCoreSpecs: readSpecList(path.join(REPO_ROOT, 'e2e-tests/core-specs-editor.txt')),
    specFilesBySubset,
  });
  process.stdout.write(`${JSON.stringify(report, undefined, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const mergeBase = process.argv[2];
  if (!mergeBase) {
    process.stderr.write('Usage: tsx e2e-tests/e2e-recommendations.ts <merge-base>\n');
    process.exit(1);
  }
  try {
    runCli(mergeBase);
  } catch (error) {
    process.stderr.write(
      `e2e-recommendations failed for "${mergeBase}": ${error instanceof Error ? error.message : String(error)}\n`,
    );
    process.exit(1);
  }
}
