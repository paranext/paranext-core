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
  | {
      kind: 'subset';
      /** Specs CI runs on every pull request. */
      alwaysCoreSpecCount: number;
      /** Further specs CI runs only when the pull request touches the Scripture editor. */
      editorCoreSpecCount: number;
      specCount: number;
    };

/** One isolated key recommended for the changed files. */
export interface E2eRecommendation {
  /** The key as written in `subset-sources.json`. */
  key: string;
  /** The command that runs it. */
  command: string;
  /** The changed files that matched, sorted. */
  matchedFiles: string[];
  /** For a collapsed item, `kind: 'subset'` counts the member specs only, not the whole subset. */
  ci: CiStatus;
  /**
   * Present on a collapsed item: the spec keys it stands for. Spec keys of one subset that matched
   * the same changed files collapse into one item whose `key` is their longest common prefix, run
   * as a path filter, when that prefix is longer than `<subset>/`.
   */
  memberKeys?: string[];
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
  /**
   * Changed source files under `src/`, `extensions/src/` and `c-sharp/` that no key lists, so no
   * recommendation can cover them. `lib/` is never reported here: library code is reached through
   * the extensions and renderer components that consume it, so a library-only change with no `lib/`
   * prefix in any entry can produce no recommendation and no uncovered file.
   */
  uncoveredFiles: string[];
  /** Changed files that add or change a menu, web view or command registration, sorted. */
  entryPointFiles: string[];
  /**
   * Whether an e2e spec or its support code changed: any `.ts` file under `e2e-tests/tests/`
   * (specs, page objects, spec helpers), `e2e-tests/fixtures/` or `e2e-tests/reporters/`, plus
   * `e2e-tests/global-setup.ts`, `e2e-tests/global-teardown.ts` and
   * `e2e-tests/playwright*.config.ts` (the harness files the Playwright configuration loads),
   * except a unit test (`*.test.ts`). READMEs and mapping files do not count.
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
 * Matches added or removed lines that register a command (`registerCommand(`, or the C#
 * `RegisterRequestHandlerAsync(` call that registers a request handler) or a web view provider
 * (`registerWebViewProvider(`). Passed to `git diff -G` (POSIX extended regular expression) and
 * tested against the content of untracked files. It over-reports: the C# call also registers
 * network object and validator handlers, and its declaration matches too, so the result is a prompt
 * to look at the diff, not proof that a command was added.
 */
export const REGISTRATION_PATTERN =
  'registerCommand\\(|registerWebViewProvider\\(|RegisterRequestHandlerAsync\\(';

/**
 * Paths that are not runtime code: tests, stories, docs, type declarations, build metadata and
 * image or font assets (other files under `assets/`, such as style sheets and data, are runtime).
 * One alternative group per line, each with its reason.
 */
const NON_RUNTIME = new RegExp(
  [
    // Unit tests, their helpers and fixtures, and Storybook stories.
    String.raw`\.test\.|\.test-utils?\.|\.fixtures\.|\.stories\.`,
    // Documentation.
    String.raw`\.md$|\.mdx$`,
    // Type declarations only exist at compile time.
    String.raw`\.d\.ts$`,
    // Test, mock and tool-configuration directories.
    String.raw`(^|\/)(__tests__|__mocks__|\.config)\/`,
    // Images and fonts; style sheets and data under assets/ stay runtime.
    String.raw`(^|\/)assets\/.*\.(png|jpe?g|gif|svg|ico|woff2?|ttf)$`,
    // C# test projects (`Foo.Tests/`).
    String.raw`(^|\/)[^/]*Tests\/`,
    // Package and extension metadata: a design decision, not an oversight (a version or
    // dependency bump changes no behaviour an e2e spec can see).
    String.raw`(^|\/)package\.json$|(^|\/)manifest\.json$`,
    // .NET build metadata: projects, shared build properties, the solution and IDE settings.
    String.raw`\.csproj$|\.props$|\.sln$|\.DotSettings$`,
    // Formatter, linter and editor configuration, which no running app reads.
    String.raw`(^|\/)(\.globalconfig|\.csharpierrc\.yml|\.lintstagedrc\.yml|\.editorconfig)$`,
  ].join('|'),
);
const isNonRuntime = (file: string) => NON_RUNTIME.test(file);
const isInSourceRoot = (file: string) => SOURCE_ROOTS.some((root) => file.startsWith(root));
const isE2eSpecSupport = (file: string) =>
  file.endsWith('.ts') &&
  !file.endsWith('.test.ts') &&
  (file.startsWith('e2e-tests/tests/') ||
    file.startsWith('e2e-tests/fixtures/') ||
    file.startsWith('e2e-tests/reporters/') ||
    file === 'e2e-tests/global-setup.ts' ||
    file === 'e2e-tests/global-teardown.ts' ||
    /^e2e-tests\/playwright[^/]*\.config\.ts$/.test(file));

/** Menu contributions of the extensions and the core menu data. */
const isMenuFile = (file: string) =>
  file.endsWith('contributions/menus.json') || file === 'src/extension-host/data/menu.data.json';

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

/** How many of `specPaths` each CI core list runs. */
function countCoreSpecs(
  specPaths: string[],
  input: RecommendInput,
): { alwaysCoreSpecCount: number; editorCoreSpecCount: number } {
  return {
    alwaysCoreSpecCount: specPaths.filter((spec) => input.coreSpecs.includes(spec)).length,
    editorCoreSpecCount: specPaths.filter((spec) => input.editorCoreSpecs.includes(spec)).length,
  };
}

function ciStatus(key: string, input: RecommendInput): CiStatus {
  if (isSpecKey(key)) {
    const specPath = `${ISOLATED_PREFIX}${key}`;
    if (input.coreSpecs.includes(specPath)) return { kind: 'spec', coreList: 'always' };
    if (input.editorCoreSpecs.includes(specPath)) return { kind: 'spec', coreList: 'editor' };
    return { kind: 'spec', coreList: 'none' };
  }
  const specs = input.specFilesBySubset[key] ?? [];
  return { kind: 'subset', ...countCoreSpecs(specs, input), specCount: specs.length };
}

function commonPrefix(strings: string[]): string {
  return strings.reduce((prefix, value) => {
    let length = 0;
    while (length < prefix.length && prefix[length] === value[length]) length += 1;
    return prefix.slice(0, length);
  });
}

/**
 * Collapses spec-level recommendations of one subset that matched the same changed files into one
 * recommendation keyed by the common prefix of their keys, which Playwright accepts as a path
 * filter. The prefix is cut back to the last `-`, `.` or `/` when that still runs exactly the
 * members, so a key does not stop mid-word. Only when the prefix is longer than `<subset>/` and, if
 * the subset's spec files are known, matches no spec other than the members; otherwise they stay
 * separate. One member with an unrelated name keeps the whole group separate.
 */
function collapseSpecGroups(
  recommendations: E2eRecommendation[],
  input: RecommendInput,
): E2eRecommendation[] {
  const groups = new Map<string, E2eRecommendation[]>();
  recommendations
    .filter((recommendation) => isSpecKey(recommendation.key) && recommendation.key.includes('/'))
    .forEach((recommendation) => {
      const groupId = `${recommendation.key.slice(0, recommendation.key.lastIndexOf('/'))}\n${recommendation.matchedFiles.join('\n')}`;
      groups.set(groupId, [...(groups.get(groupId) ?? []), recommendation]);
    });

  const collapsed = new Map<E2eRecommendation, E2eRecommendation>();
  groups.forEach((members) => {
    if (members.length < 2) return;
    const longest = commonPrefix(members.map((member) => member.key));
    const subset = members[0].key.slice(0, members[0].key.lastIndexOf('/') + 1);
    if (longest.length <= subset.length) return;
    // The path filter also runs every other spec of the subset that starts with the prefix, so it
    // must run exactly the members (checked whenever the subset's spec files are known).
    // `specFilesBySubset` is keyed by the top-level group, also for a key nested deeper.
    const subsetSpecs = input.specFilesBySubset[members[0].key.split('/')[0]];
    const runsExactlyMembers = (prefix: string) =>
      !subsetSpecs ||
      subsetSpecs.filter((spec) => spec.startsWith(`${ISOLATED_PREFIX}${prefix}`)).length ===
        members.length;
    if (!runsExactlyMembers(longest)) return;
    // Prefer a key that ends at a word boundary over one that stops mid-word, but only when the
    // subset's spec files are known, so the shorter prefix can be checked.
    const boundary = Math.max(
      longest.lastIndexOf('-'),
      longest.lastIndexOf('.'),
      longest.lastIndexOf('/'),
    );
    const atBoundary = longest.slice(0, boundary + 1);
    const key =
      subsetSpecs && atBoundary.length > subset.length && runsExactlyMembers(atBoundary)
        ? atBoundary
        : longest;
    const merged: E2eRecommendation = {
      key,
      command: `npm run test:e2e:isolated ${ISOLATED_PREFIX}${key}`,
      matchedFiles: members[0].matchedFiles,
      ci: {
        kind: 'subset',
        ...countCoreSpecs(
          members.map((member) => `${ISOLATED_PREFIX}${member.key}`),
          input,
        ),
        specCount: members.length,
      },
      memberKeys: members.map((member) => member.key),
    };
    members.forEach((member) => collapsed.set(member, merged));
  });

  const emitted = new Set<E2eRecommendation>();
  return recommendations
    .flatMap((recommendation) => {
      const merged = collapsed.get(recommendation);
      if (!merged) return [recommendation];
      if (emitted.has(merged)) return [];
      emitted.add(merged);
      return [merged];
    })
    .sort((a, b) => (a.key < b.key ? -1 : Number(a.key > b.key)));
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

  const singles: E2eRecommendation[] = [...mainMatches.keys()].sort().map((key) => ({
    key,
    command: isSpecKey(key)
      ? `npm run test:e2e:isolated ${ISOLATED_PREFIX}${key}`
      : `npm run test:e2e:isolated ${key}`,
    matchedFiles: sorted(mainMatches.get(key)),
    ci: ciStatus(key, input),
  }));
  const recommendations = collapseSpecGroups(singles, input);

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
      ...runtimeFiles.filter((file) => isMenuFile(file) || file.endsWith('.web-view-provider.ts')),
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

function git(repoRoot: string, ...args: string[]): string[] {
  // `core.quotePath=false` keeps a non-ASCII file name as written instead of a quoted escape.
  return execFileSync('git', ['-c', 'core.quotePath=false', ...args], {
    cwd: repoRoot,
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
 * The working tree's changes against `mergeBase`, read from the git repository at `repoRoot`.
 * `--no-renames` lists a rename's old and new path; untracked files never appear in `git diff`, so
 * they come from `git ls-files` and their content is tested for a registration directly.
 * `--end-of-options` makes a ref that starts with `-` a ref, not an option.
 */
export function readGitChanges(
  repoRoot: string,
  mergeBase: string,
): Pick<RecommendInput, 'changedFiles' | 'filesAddingCommandRegistrations'> {
  const untrackedFiles = git(repoRoot, 'ls-files', '--others', '--exclude-standard');
  const registrationRegExp = new RegExp(REGISTRATION_PATTERN);
  const untrackedRegistering = untrackedFiles
    .filter((file) => isInSourceRoot(file) && !isNonRuntime(file))
    .filter((file) => {
      try {
        return registrationRegExp.test(fs.readFileSync(path.join(repoRoot, file), 'utf8'));
      } catch (error) {
        process.stderr.write(
          `e2e-recommendations: could not read untracked file ${file}: ${error instanceof Error ? error.message : String(error)}\n`,
        );
        return false;
      }
    });
  return {
    changedFiles: [
      ...new Set([
        ...git(repoRoot, 'diff', '--no-renames', '--name-only', '--end-of-options', mergeBase),
        ...untrackedFiles,
      ]),
    ],
    filesAddingCommandRegistrations: [
      ...git(
        repoRoot,
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
  };
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

  const report = recommendE2eTests({
    ...readGitChanges(REPO_ROOT, mergeBase),
    sources,
    coreSpecs: readSpecList(path.join(REPO_ROOT, 'e2e-tests/core-specs.txt')),
    editorCoreSpecs: readSpecList(path.join(REPO_ROOT, 'e2e-tests/core-specs-editor.txt')),
    specFilesBySubset,
  });
  process.stdout.write(`${JSON.stringify(report, undefined, 2)}\n`);
}

/** Whether this module is the program's entry point, also when started through a symbolic link. */
function isEntryPoint(): boolean {
  const entry = process.argv[1];
  if (!entry) return false;
  try {
    return fs.realpathSync(entry) === fs.realpathSync(fileURLToPath(import.meta.url));
  } catch {
    return false;
  }
}

if (isEntryPoint()) {
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
