/**
 * Static analysis over the TypeScript compiler API that finds every declared wire-visible
 * registration in a set of source files: commands, direct request handlers, network objects, data
 * provider engines, web view providers, project data provider factories, and network events.
 *
 * A registration's name (and, for most shapes, its documentation) is only meaningful once resolved
 * to a literal value. This module distinguishes a name built entirely from string/template literals
 * and `const` references — which is recorded as a registration — from one that depends on a runtime
 * value (a function parameter, a nonce, a loop variable) — which cannot be attributed a stable name
 * and is recorded separately instead of being guessed at or silently dropped.
 *
 * Pure and filesystem-free: callers pass in the file paths and contents to scan (see
 * `generate-wire-surface.ts` for the real filesystem walk), which keeps this module directly
 * testable against small fixtures and independent of scan order.
 */

import * as path from 'path';
import * as ts from 'typescript';
import { compareCodeUnits, CSharpScanResult } from './wire-surface.model';

// #region Public types

/** Which half of the codebase a registration was found in. */
export type WireSurfaceLanguage = 'typescript' | 'csharp';

/** One of the wire-visible registration shapes this scanner recognises. */
export type RegistrationCategory =
  | 'command'
  | 'directRequestHandler'
  | 'networkObject'
  | 'dataProviderEngine'
  | 'webViewProvider'
  | 'pdpFactory'
  | 'networkEvent';

/** Which recognised call pattern produced a registration entry. */
export type RegisteredVia =
  | 'registerCommand'
  | 'registerRequestHandler'
  | 'registerRequestHandler+serializeRequestType(command)'
  | 'networkObjectService.set'
  | 'registerEngine'
  | 'registerEngineByType'
  | 'registerWebViewProvider'
  | 'webViewProviders.register (deprecated alias)'
  | 'registerProjectDataProviderEngineFactory'
  | 'createNetworkEventEmitterAsync'
  | 'createBufferedNetworkEventEmitter'
  | 'createCoreMultiSourceEventEmitter';

/**
 * Marks a registration that is declared surface but cannot be durably observed by a live poll (see
 * `LIVENESS_ANNOTATIONS`'s doc comment for the two known reasons). Absent (`undefined`) is the
 * ordinary case: a registration that stays live for the app's ordinary running lifetime.
 */
export type RegistrationLiveness = 'transient' | 'lazy';

/**
 * A registration whose name resolved to a literal string value.
 *
 * `category` and `registeredVia` are typed as plain `string` here (rather than the narrower
 * `RegistrationCategory`/`RegisteredVia` unions used internally by the TypeScript scan below) so
 * that this single shape can also carry C#-origin entries, whose category/registeredVia vocabulary
 * is defined in `wire-surface.model.ts`. `language` is the field to filter or group on.
 */
export interface StaticRegistration {
  category: string;
  /** The resolved registration name (e.g. a command name, or a serialized request type). */
  name: string;
  /** Repo-relative path of the file containing the registration call. */
  file: string;
  registeredVia: string;
  /** Whether a documentation argument was passed at all. */
  documented: boolean;
  /**
   * Whether the documentation argument (when `documented`) resolved to a concrete object literal
   * this scanner could inspect for `'x-experimental'`. `false` means the experimental status below
   * is not authoritative — the shape was built in a way the scanner does not statically evaluate.
   */
  docsStaticallyResolved: boolean;
  /** Whether `'x-experimental': true` was statically proven on the documentation. */
  experimental: boolean;
  /** Which half of the codebase this entry came from — see `StaticRegistration`'s doc comment. */
  language: WireSurfaceLanguage;
  /**
   * Present only for the small, hand-annotated set of registrations `LIVENESS_ANNOTATIONS` names —
   * see its doc comment. A consumer comparing this snapshot against a live document (e.g.
   * `wire-surface-snapshot.spec.ts`) should treat a registration carrying this field as declared
   * surface that is not expected to answer a live poll, rather than as a discrepancy to chase.
   */
  liveness?: RegistrationLiveness;
  /** Present iff `liveness` is present: why this registration cannot be durably observed live. */
  livenessReason?: string;
}

/** A recognised registration call whose name could not be resolved to a literal string. */
export interface DynamicRegistration {
  category: string;
  file: string;
  registeredVia: string;
  /** Source text of the name argument as written at the call site. */
  expression: string;
  language: WireSurfaceLanguage;
}

export interface WireSurfaceHeader {
  purpose: string;
  scope: string;
  granularity: string;
  recognizedPatterns: string[];
  excludedPatterns: string[];
}

export interface WireSurfaceDocument {
  header: WireSurfaceHeader;
  registrations: StaticRegistration[];
  dynamicRegistrations: DynamicRegistration[];
}

/** A source file to scan: a repo-relative POSIX path and its full text. */
export interface VirtualFile {
  path: string;
  text: string;
}

// #endregion

// #region Header content

/**
 * `serializeRequestType`'s category/directive separator (`src/shared/utils/util.ts`). Hardcoded
 * here as a stable wire-protocol detail, the same way the category value below is.
 */
const REQUEST_TYPE_SEPARATOR = ':';

/** `CATEGORY_COMMAND`'s value (`src/shared/data/rpc.model.ts`) — a stable wire-protocol constant. */
const COMMAND_CATEGORY_VALUE = 'command';

const RECOGNIZED_PATTERNS: string[] = [
  'Every pattern below is matched primarily by the symbol its callee is bound to (following renamed ' +
    'imports, re-exports, and destructured local receivers through the TypeScript checker), not by ' +
    "the callee's literal spelling -- so import { registerCommand as rc } ... ; rc(...) and const { " +
    'set } = networkObjectService; set(...) are recognised exactly like the direct spelling. The ' +
    'literal name is only a fallback for a callee the checker cannot bind to any declaration (see ' +
    'excludedPatterns).',
  'registerCommand(name, handler, docs?, options?) -> category "command"',
  'registerRequestHandler(requestType, handler, docs?, options?) -> category "directRequestHandler"; ' +
    `when requestType is serializeRequestType(CATEGORY_COMMAND, directive) the registration is ` +
    're-filed under category "command" with the resolved directive as its name, so a command ' +
    'registered by bypassing registerCommand is not missed',
  'networkObjectService.set(id, obj, objectType?, attributes?, objectDocumentation?) -> category ' +
    '"networkObject"; also recognised through its public papi.networkObjects.set spelling and the ' +
    'bare networkObjects.set form, both filed under the same registeredVia',
  'registerEngine(name, engine, type?, attributes?, documentation?) and its ' +
    'registerEngineByType(name, engine, type?, attributes?, documentation?) sibling -> category "dataProviderEngine"',
  'registerWebViewProvider(webViewType, provider, attributes?, documentation?), including its ' +
    'deprecated `register` alias -> category "webViewProvider"',
  'registerProjectDataProviderEngineFactory(pdpFactoryId, projectInterfaces, factory, attributes?, documentation?) ' +
    '-> category "pdpFactory"',
  'createNetworkEventEmitterAsync(eventType, documentation?) and ' +
    'createBufferedNetworkEventEmitter(eventType, documentation?, options?) -> category "networkEvent"',
  'createCoreMultiSourceEventEmitter(eventType, documentation?) -> category "networkEvent"; a core-' +
    'internal pre-approved multi-source emitter (src/shared/services/network.service.ts) that is not ' +
    'exposed on papiNetworkService, so it is matched by its own call name rather than folded into the ' +
    'createNetworkEventEmitterAsync family above',
];

const EXCLUDED_PATTERNS: string[] = [
  'A call whose callee the TypeScript checker cannot bind to any declaration -- an unresolved ' +
    "module specifier (e.g. an extension's `@papi/backend` import, which resolves outside this " +
    "scan's own TypeScript program), a computed member access (`obj[key](...)`), or an alias/" +
    'binding chain that never bottoms out in a real declaration -- falls back to matching the ' +
    "callee's literal identifier, exactly as this scanner always has; failing that too, it is not " +
    'recognised and not filed as dynamic either, since nothing matched to begin with. A callee the ' +
    'checker DOES fully resolve, conversely, is authoritative even when it is not one of the ' +
    'registration functions below -- a local, non-platform `function registerCommand(...)` that ' +
    'merely shares a name is definitively excluded rather than falling back to the literal-name ' +
    'match that would otherwise mistake it for the real one. The live rpc.discover comparison is ' +
    'what would surface a genuinely new registration idiom neither path recognises.',
  'createNetworkEventEmitter(eventType) — the deprecated synchronous event emitter. It does not ' +
    'participate in central registration and deliberately does not appear in the generated OpenRPC ' +
    'document, so it is excluded here for the same reason.',
];

/**
 * The five rules the Roslyn-based `Paranext.WireSurface` tool (`c-sharp/Paranext.WireSurface`)
 * applies to the data provider project, described here (rather than in the tool itself) so this
 * generator's own header stays the single place that documents both halves of the wire surface side
 * by side. Every rule matches by symbol identity, never by identifier text, so a rename, an added
 * type parameter, or reformatting cannot make a real registration invisible to it.
 */
const CSHARP_RECOGNIZED_PATTERNS: string[] = [
  'A. An invocation of NetworkObject.RegisterNetworkObjectAsync, matched by symbol identity -> ' +
    'category "pdpFactory" when the containing type is ProjectDataProviderFactory, "dataProvider" ' +
    '(registeredVia DataProvider.RegisterDataProviderAsync) when the containing type is ' +
    'DataProvider, otherwise "networkObject"; the name is argument 0, resolved by binding through ' +
    'the Roslyn semantic model, including one level of constructor/call-argument propagation (see ' +
    'the Name resolution section of the design record).',
  'B. A class whose base chain reaches DataProvider (excluding DataProvider itself) -> category ' +
    '"dataProvider", registeredVia "DataProvider(name, papiClient) constructor"; the name is the ' +
    "name argument of the class's own base call -- a primary-constructor base argument, or a " +
    ": base(...) initializer whose target constructor's chain reaches DataProvider(string, ...) -- " +
    'resolved by the same binding and one-level propagation as rule A.',
  'C. A method whose OverriddenMethod chain reaches DataProvider.GetNetworkObjectDocumentation -> ' +
    'category "dataProvider", registeredVia "DataProvider.GetNetworkObjectDocumentation override"; ' +
    "the name is the overriding method's own containing class, since no wire name is available at " +
    "the override's declaration site -- the provider it documents is only named where it is " +
    'registered.',
  'D. An invocation of PapiClient.RegisterRequestHandlerAsync -> category "standaloneMethod"; the ' +
    'name is argument 0, resolved the same way as rule A. Skipped when the invocation is reached ' +
    "through NetworkObject's own containing type -- see excludedPatterns.",
  'E. An invocation of either PapiClient.SendRequestAsync overload whose argument 0 resolves to ' +
    'the constant "network:registerEvent" -> category "networkEvent", registeredVia ' +
    'PapiClient.SendRequestAsync("network:registerEvent"); the name is element 0 of argument 1 ' +
    'when it is a collection/array-creation initializer, otherwise the whole argument-1 text, ' +
    'whitespace-collapsed, as a dynamic expression.',
];

/**
 * The three real exclusions the Roslyn scanner applies -- replacing the old text scanner's
 * always-empty list, which meant this array was never actually exercised. Each has a fixture test
 * in `c-sharp/Paranext.WireSurface.Tests` proving it is excluded, so the list can never go vacuous
 * again without a test failing first.
 */
const CSHARP_EXCLUDED_PATTERNS: string[] = [
  "NetworkObject.RegisterNetworkObjectAsync's own per-function RegisterRequestHandlerAsync fan-out " +
    '-- one call to register the object itself and one per registered function -- is not filed as ' +
    'a separate standaloneMethod entry under rule D: each is already represented by the owning ' +
    'networkObject/dataProvider/pdpFactory entry that rule A recorded, and re-filing it separately ' +
    'would double-count the same registration.',
  'PapiClient.RegisterRequestHandlerAsync\'s own internal SendRequestAsync("network:registerMethod", ' +
    '...) call, which is how a registered handler actually reaches the wire, is not itself filed as ' +
    'a networkEvent entry: rule E recognises only a SendRequestAsync call whose first argument ' +
    'resolves to the constant "network:registerEvent".',
  'Every other PapiClient.SendRequestAsync/SendRequestAsync<T> call -- a client-side request into ' +
    'an already-registered network object, whose first argument is any request type other than ' +
    '"network:registerEvent" -- is ignored. Only the network:registerEvent request is itself central ' +
    'registration surface; everything else is a call against surface recorded elsewhere.',
];

function buildHeader(): WireSurfaceHeader {
  return {
    purpose:
      "A snapshot of paranext-core's declared wire-visible registration surface — TypeScript " +
      'commands, request handlers, network objects, data provider engines, web view providers, ' +
      'PDP factories, and network events, plus their C# counterparts (network objects, data ' +
      'providers, PDP factories, and standalone request-handler registrations) — meant to be ' +
      'diffed across PRs the way papi.d.ts already is. Every C# registration reaches the same ' +
      'wire registry as its TypeScript counterparts: PapiClient.RegisterRequestHandlerAsync ' +
      "(c-sharp/PapiClient.cs) sends the literal 'network:registerMethod' request, the very " +
      'request REGISTER_METHOD names in src/shared/data/rpc.model.ts. So a wire-only ' +
      "'x-experimental': true marker on a C# registration is exactly as invisible to every other " +
      'check as one on a TypeScript registration: omitting one regenerates a byte-identical ' +
      'papi.d.ts, so nothing else catches it. This file asserts nothing about which entries ' +
      '*ought* to be experimental, or ought to exist at all — plenty of wire registrations ' +
      'legitimately live off papi.d.ts without being experimental. It only records what is ' +
      'declared; a human reviewing the PR diff decides whether a change here is intended, and ' +
      'this generator never fails a build over a missing marker.',
    scope:
      'TypeScript: core src/** and the bundled extensions/src/** (excluding __tests__ ' +
      'directories, *.test.ts(x) files, node_modules, dist, and temp-build), walked with the ' +
      'TypeScript compiler API and matched against a real AST. Third-party extensions live ' +
      'outside this repository and are excluded by construction, not by an explicit rule. C#: ' +
      'the data provider project (c-sharp/ParanextDataProvider.csproj) as MSBuild compiles it, ' +
      "read through Roslyn's semantic model by the Paranext.WireSurface tool " +
      '(c-sharp/Paranext.WireSurface, spawned by run-wire-surface-scanner.ts) rather than by a ' +
      'text scan of c-sharp/** -- excluding bin, obj, and the ' +
      'Paranext.Analyzers[.Tests]/Paranext.WireSurface[.Tests] projects, which analyse or produce ' +
      'the wire surface rather than declaring it. The C# half recognises a registration by the ' +
      'symbol it invokes (five rules, matched by symbol identity rather than identifier text -- ' +
      'see recognizedPatterns), resolves its name by binding rather than by pattern-matching ' +
      'source text, and propagates a name through one level of constructor/call-argument passing. ' +
      'An unusual formatting choice can no longer evade it the way it could a text scan, but a ' +
      'genuinely new registration idiom this generator has never seen still can. Every entry ' +
      "carries a language field ('typescript' or 'csharp') so a reader can tell at a glance which " +
      "half's guarantees apply to it.",
    granularity:
      'Each entry records one declared registration call (TypeScript) or declaration (C#) — the ' +
      'same granularity as the source code — rather than the OpenRPC document derived from it, ' +
      "because reproducing that document's per-method fan-out (e.g. a network object's " +
      "individual methods, or a data provider's per-instance onDidUpdate event) statically is " +
      'fragile, and several of the names involved are unsnapshottable: they exist only at ' +
      'runtime (a nonce-minted PDP id, a per-window service shard name, a per-provider ' +
      'onDidUpdate event name, a per-project C# data provider id). The C# half applies the same ' +
      'policy: one entry per RegisterNetworkObjectAsync call or GetNetworkObjectDocumentation() ' +
      'override, never one per method inside a NetworkObjectDocumentation.Methods dictionary. A ' +
      "separate end-to-end assertion verifies this file's registrations against the live " +
      'rpc.discover OpenRPC document served by a running app, which is where that fully-resolved, ' +
      'per-method view is checked instead. That live comparison is a POLL, though, not an instant ' +
      'snapshot, and a declared registration is not always durably pollable: a handful carry a ' +
      "liveness field ('transient' or 'lazy', with a livenessReason explaining which) marking them " +
      'as real declared surface that the live comparison should not expect to find — a transient one ' +
      'self-disposes on a startup timer well before any poll budget would catch it consistently, and ' +
      'a lazy one is only created inside a runtime path (e.g. a project switch) that a smoke run ' +
      "never exercises. See generate-wire-surface.util.ts's LIVENESS_ANNOTATIONS for the full list " +
      'and reasoning; absence of the field is the ordinary case.',
    recognizedPatterns: [...RECOGNIZED_PATTERNS, ...CSHARP_RECOGNIZED_PATTERNS],
    excludedPatterns: [...EXCLUDED_PATTERNS, ...CSHARP_EXCLUDED_PATTERNS],
  };
}

/** Doc-object path to the `'x-experimental'` flag for each category's documentation shape. */
const DOCS_EXPERIMENTAL_PATH: Record<RegistrationCategory, string[]> = {
  command: ['method', 'x-experimental'],
  directRequestHandler: ['method', 'x-experimental'],
  networkEvent: ['notification', 'x-experimental'],
  networkObject: ['x-experimental'],
  dataProviderEngine: ['x-experimental'],
  webViewProvider: ['x-experimental'],
  pdpFactory: ['x-experimental'],
};

// #endregion

// #region File model and cross-file constant resolution

interface FileEntry {
  path: string;
  sourceFile: ts.SourceFile;
}

/**
 * Extracts `[aliasPrefix, targetPrefix]` pairs from a tsconfig-style `compilerOptions.paths` map,
 * for use by `resolveModuleSpecifier`. Only single-target, `/*`-suffixed entries participate --
 * that is every alias this codebase actually resolves through a directory prefix; other shapes (a
 * bare specifier mapped to one fixed file, like tsconfig's own `vite` shim, or a specifier mapped
 * to more than one candidate directory) fall outside what this scanner needs to follow and are
 * silently skipped rather than guessed at.
 */
export function derivePathAliases(
  paths: Record<string, readonly string[]>,
): ReadonlyArray<readonly [string, string]> {
  return Object.entries(paths)
    .flatMap((entry): Array<readonly [string, string]> => {
      const [alias, targets] = entry;
      if (!alias.endsWith('/*') || targets.length !== 1) return [];
      const [target] = targets;
      if (!target.endsWith('/*')) return [];
      return [[alias.slice(0, -1), target.replace(/^\.\//, '').slice(0, -1)]];
    })
    .sort(([a], [b]) => compareCodeUnits(a, b));
}

function isPathsRecord(value: unknown): value is Record<string, readonly string[]> {
  return (
    typeof value === 'object' &&
    // Testing null explicitly, since typeof null === 'object'.
    // eslint-disable-next-line no-null/no-null
    value !== null &&
    Object.values(value).every(
      (targets) => Array.isArray(targets) && targets.every((target) => typeof target === 'string'),
    )
  );
}

function readTsconfigPaths(tsconfigPath: string): Record<string, readonly string[]> {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(
      `Could not read ${tsconfigPath}: ${ts.flattenDiagnosticMessageText(
        configFile.error.messageText,
        '\n',
      )}`,
    );
  }
  const paths: unknown = configFile.config?.compilerOptions?.paths;
  if (!isPathsRecord(paths)) {
    throw new Error(`${tsconfigPath} has no compilerOptions.paths to derive path aliases from.`);
  }
  return paths;
}

/**
 * Repo-relative-path aliases, derived at load time from the root tsconfig.json's own
 * `compilerOptions.paths` (rather than hand-copied here) so this list can never drift from the
 * aliases the rest of the codebase actually resolves through.
 */
const PATH_ALIASES: ReadonlyArray<readonly [string, string]> = derivePathAliases(
  readTsconfigPaths(path.resolve(__dirname, '../../tsconfig.json')),
);

function buildFileMap(files: VirtualFile[]): Map<string, FileEntry> {
  const map = new Map<string, FileEntry>();
  files.forEach((file) => {
    const scriptKind = file.path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
    const sourceFile = ts.createSourceFile(
      file.path,
      file.text,
      ts.ScriptTarget.Latest,
      true,
      scriptKind,
    );
    map.set(file.path, { path: file.path, sourceFile });
  });
  return map;
}

function resolveModuleSpecifier(
  fromPath: string,
  specifier: string,
  files: Map<string, FileEntry>,
): string | undefined {
  let candidateBase: string | undefined;

  if (specifier.startsWith('.')) {
    candidateBase = path.posix.normalize(path.posix.join(path.posix.dirname(fromPath), specifier));
  } else {
    const alias = PATH_ALIASES.find(([prefix]) => specifier.startsWith(prefix));
    if (alias) candidateBase = specifier.replace(alias[0], alias[1]);
  }

  if (!candidateBase) return undefined;

  const candidates = [
    candidateBase,
    `${candidateBase}.ts`,
    `${candidateBase}.tsx`,
    `${candidateBase}/index.ts`,
    `${candidateBase}/index.tsx`,
  ];
  return candidates.find((candidate) => files.has(candidate));
}

/**
 * Compiler options for `buildProgram`'s checker-binding program: no lib files or ambient types
 * (this scan only cares about the shape of the source itself, never real type-checking), and no
 * automatic root-file expansion (`noResolve`) since every file the checker could need is already
 * passed as an explicit root -- a module specifier this scan can't otherwise account for (a real
 * npm package, a lib.d.ts global) simply stays unresolved rather than pulling in files outside the
 * scanned set.
 */
const PROGRAM_COMPILER_OPTIONS: ts.CompilerOptions = {
  noResolve: true,
  noLib: true,
  types: [],
  allowJs: false,
  skipLibCheck: true,
};

/**
 * Builds a `ts.Program` (and its `TypeChecker`) over exactly the given files, reusing their
 * already-parsed `sourceFile` objects rather than reparsing -- required so the identifier nodes
 * this module's own AST walk already found are the very same nodes the checker's binder visited,
 * which is what lets `checker.getSymbolAtLocation` resolve them at all. Cross-file imports resolve
 * through `resolveModuleSpecifier`, the same tsconfig-derived `PATH_ALIASES` logic the rest of this
 * module uses, so a module reference this scanner already knew how to follow keeps resolving the
 * same way.
 *
 * Built fresh on every `generateWireSurfaceDocument` call rather than cached: the CLI entry point
 * scans the whole codebase once per process, and this module's own tests each pass a different file
 * set, so there is no reuse a cache would capture -- and a cache keyed only by file path is exactly
 * what let the resolver this replaces return a stale declaration when a later call reused the same
 * path with different content.
 */
function buildProgram(files: Map<string, FileEntry>): ts.Program {
  const host: ts.CompilerHost = {
    getSourceFile: (fileName) => files.get(fileName)?.sourceFile,
    getDefaultLibFileName: () => 'lib.d.ts',
    writeFile: () => {},
    getCurrentDirectory: () => '',
    getCanonicalFileName: (fileName) => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
    fileExists: (fileName) => files.has(fileName),
    readFile: (fileName) => files.get(fileName)?.sourceFile.text,
    resolveModuleNames: (moduleNames, containingFile) =>
      moduleNames.map((moduleName): ts.ResolvedModuleFull | undefined => {
        const resolvedFileName = resolveModuleSpecifier(containingFile, moduleName, files);
        if (!resolvedFileName) return undefined;
        return {
          resolvedFileName,
          extension: resolvedFileName.endsWith('.tsx') ? ts.Extension.Tsx : ts.Extension.Ts,
          isExternalLibraryImport: false,
        };
      }),
  };
  return ts.createProgram([...files.keys()], PROGRAM_COMPILER_OPTIONS, host);
}

/** Depth cap guarding against a pathological alias cycle chasing a re-exported name forever. */
const MAX_ALIAS_HOPS = 25;

/**
 * Resolves an identifier to the file and initializer expression it's declared with, binding through
 * the TypeScript checker rather than a hand-rolled, top-level-only name lookup -- so a function- or
 * block-scoped `const` correctly shadows a same-named declaration elsewhere, and an import (direct,
 * renamed, path-aliased, or re-exported through another file) resolves to its real origin
 * regardless of how many hops away that origin is. Returns undefined for anything that isn't a
 * plain `const`/`let`/`var` binding with an initializer -- a function parameter, a destructured
 * binding, a class member -- exactly like the resolver it replaces, since those aren't statically
 * evaluable names either.
 */
function findDeclaration(
  identifier: ts.Identifier,
  checker: ts.TypeChecker,
): { entry: FileEntry; expr: ts.Expression } | undefined {
  const initialSymbol = checker.getSymbolAtLocation(identifier);
  if (!initialSymbol) return undefined;

  let symbol = initialSymbol;
  let hopsRemaining = MAX_ALIAS_HOPS;
  // SymbolFlags is a bitmask; this is the TypeScript compiler API's own idiom for testing whether
  // a symbol is an alias.
  // eslint-disable-next-line no-bitwise
  while ((symbol.flags & ts.SymbolFlags.Alias) !== 0 && hopsRemaining > 0) {
    symbol = checker.getAliasedSymbol(symbol);
    hopsRemaining -= 1;
  }

  const declaration = symbol.valueDeclaration;
  if (!declaration || !ts.isVariableDeclaration(declaration) || !declaration.initializer) {
    return undefined;
  }

  const sourceFile = declaration.getSourceFile();
  return { entry: { path: sourceFile.fileName, sourceFile }, expr: declaration.initializer };
}

// #endregion

// #region Expression evaluation

function unwrapExpression(expr: ts.Expression): ts.Expression {
  if (ts.isParenthesizedExpression(expr)) return unwrapExpression(expr.expression);
  if (ts.isAsExpression(expr)) return unwrapExpression(expr.expression);
  if (ts.isNonNullExpression(expr)) return unwrapExpression(expr.expression);
  if (ts.isTypeAssertionExpression(expr)) return unwrapExpression(expr.expression);
  return expr;
}

interface CalleeInfo {
  /** The callee's own (rightmost) name, e.g. "set" in `networkObjectService.set(...)`. */
  name: string | undefined;
  /**
   * The rightmost identifier of the callee's object expression, when the callee is a property
   * access.
   */
  objectName: string | undefined;
}

function rightmostIdentifierName(expr: ts.Expression): string | undefined {
  if (ts.isIdentifier(expr)) return expr.text;
  if (ts.isPropertyAccessExpression(expr)) return expr.name.text;
  return undefined;
}

function getCalleeInfo(callee: ts.Expression): CalleeInfo {
  if (ts.isIdentifier(callee)) return { name: callee.text, objectName: undefined };
  if (ts.isPropertyAccessExpression(callee)) {
    return { name: callee.name.text, objectName: rightmostIdentifierName(callee.expression) };
  }
  return { name: undefined, objectName: undefined };
}

interface StringEvalResult {
  resolved: boolean;
  value?: string;
  /**
   * Populated whenever the expression is (or resolves through a const to) a
   * `serializeRequestType(category, directive)` call whose category argument alone resolved —
   * regardless of whether the directive did. Lets a caller re-file a registration whose directive
   * is dynamic under the right category (e.g. "command") instead of losing that context.
   */
  serializeCategory?: string;
  /** Populated alongside `serializeCategory` only when the directive also resolved. */
  serializeDirective?: string;
}

function evaluateStringExpression(
  rawExpr: ts.Expression,
  entry: FileEntry,
  checker: ts.TypeChecker,
  visited: ReadonlySet<string>,
): StringEvalResult {
  const expr = unwrapExpression(rawExpr);

  if (ts.isStringLiteralLike(expr)) return { resolved: true, value: expr.text };

  if (ts.isTemplateExpression(expr)) {
    const spanResults = expr.templateSpans.map((span) =>
      evaluateStringExpression(span.expression, entry, checker, visited),
    );
    if (!spanResults.every((result) => result.resolved)) return { resolved: false };
    const value = spanResults.reduce(
      (acc, result, index) => acc + (result.value ?? '') + expr.templateSpans[index].literal.text,
      expr.head.text,
    );
    return { resolved: true, value };
  }

  if (ts.isIdentifier(expr)) {
    const key = `${entry.path}#${expr.text}`;
    if (visited.has(key)) return { resolved: false };
    const found = findDeclaration(expr, checker);
    if (!found) return { resolved: false };
    const nextVisited = new Set(visited);
    nextVisited.add(key);
    return evaluateStringExpression(found.expr, found.entry, checker, nextVisited);
  }

  if (ts.isCallExpression(expr)) {
    const { name: calleeName } = getCalleeInfo(expr.expression);
    if (calleeName === 'serializeRequestType' && expr.arguments.length === 2) {
      const categoryResult = evaluateStringExpression(expr.arguments[0], entry, checker, visited);
      const directiveResult = evaluateStringExpression(expr.arguments[1], entry, checker, visited);
      if (categoryResult.resolved && directiveResult.resolved) {
        return {
          resolved: true,
          value: `${categoryResult.value}${REQUEST_TYPE_SEPARATOR}${directiveResult.value}`,
          serializeCategory: categoryResult.value,
          serializeDirective: directiveResult.value,
        };
      }
      return {
        resolved: false,
        serializeCategory: categoryResult.resolved ? categoryResult.value : undefined,
      };
    }
    return { resolved: false };
  }

  // A field read off a plain object literal (e.g. `someProvider.webViewType`, or
  // `SOME_DOCS_MAP['literal.key']`) is as static as a const reference once the object itself
  // resolves to a literal — a common way this codebase avoids repeating a registration name as a
  // string twice. A field read off anything else (a class instance, a function call result) is not
  // attempted: finding a class's field initializer is a different, unimplemented problem.
  if (ts.isPropertyAccessExpression(expr)) {
    const objectRef = resolveObjectLiteral(expr.expression, entry, checker, visited);
    if (!objectRef) return { resolved: false };
    const prop = findPropertyAssignment(objectRef.node, expr.name.text);
    if (!prop) return { resolved: false };
    return evaluateStringExpression(prop.initializer, objectRef.entry, checker, objectRef.visited);
  }

  if (ts.isElementAccessExpression(expr)) {
    const objectRef = resolveObjectLiteral(expr.expression, entry, checker, visited);
    if (!objectRef) return { resolved: false };
    const keyResult = evaluateStringExpression(
      expr.argumentExpression,
      entry,
      checker,
      objectRef.visited,
    );
    if (!keyResult.resolved || keyResult.value === undefined) return { resolved: false };
    const prop = findPropertyAssignment(objectRef.node, keyResult.value);
    if (!prop) return { resolved: false };
    return evaluateStringExpression(prop.initializer, objectRef.entry, checker, objectRef.visited);
  }

  return { resolved: false };
}

function getStaticPropertyKeyText(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name)) return name.text;
  if (ts.isStringLiteral(name)) return name.text;
  if (ts.isNumericLiteral(name)) return name.text;
  return undefined;
}

function findPropertyAssignment(
  obj: ts.ObjectLiteralExpression,
  keyText: string,
): ts.PropertyAssignment | undefined {
  return obj.properties.find(
    (prop): prop is ts.PropertyAssignment =>
      ts.isPropertyAssignment(prop) && getStaticPropertyKeyText(prop.name) === keyText,
  );
}

interface ObjectLiteralRef {
  node: ts.ObjectLiteralExpression;
  entry: FileEntry;
  /**
   * The `visited` set enriched with every identifier hopped through to reach this literal. A caller
   * that keeps resolving through `node` (e.g. a further property read) must continue with this set,
   * not the one it started with, or a cycle of object literals referencing each other's fields
   * recurses without bound instead of terminating.
   */
  visited: ReadonlySet<string>;
}

function resolveObjectLiteral(
  rawExpr: ts.Expression,
  entry: FileEntry,
  checker: ts.TypeChecker,
  visited: ReadonlySet<string>,
): ObjectLiteralRef | undefined {
  const expr = unwrapExpression(rawExpr);

  if (ts.isObjectLiteralExpression(expr)) return { node: expr, entry, visited };

  if (ts.isIdentifier(expr)) {
    const key = `${entry.path}#${expr.text}`;
    if (visited.has(key)) return undefined;
    const found = findDeclaration(expr, checker);
    if (!found) return undefined;
    const nextVisited = new Set(visited);
    nextVisited.add(key);
    return resolveObjectLiteral(found.expr, found.entry, checker, nextVisited);
  }

  if (ts.isPropertyAccessExpression(expr)) {
    const objectRef = resolveObjectLiteral(expr.expression, entry, checker, visited);
    if (!objectRef) return undefined;
    const prop = findPropertyAssignment(objectRef.node, expr.name.text);
    if (!prop) return undefined;
    return resolveObjectLiteral(prop.initializer, objectRef.entry, checker, objectRef.visited);
  }

  if (ts.isElementAccessExpression(expr)) {
    const objectRef = resolveObjectLiteral(expr.expression, entry, checker, visited);
    if (!objectRef) return undefined;
    const keyResult = evaluateStringExpression(
      expr.argumentExpression,
      entry,
      checker,
      objectRef.visited,
    );
    if (!keyResult.resolved || keyResult.value === undefined) return undefined;
    const prop = findPropertyAssignment(objectRef.node, keyResult.value);
    if (!prop) return undefined;
    return resolveObjectLiteral(prop.initializer, objectRef.entry, checker, objectRef.visited);
  }

  return undefined;
}

type BooleanLookup = 'true' | 'false' | 'uncertain';

/**
 * Reads a boolean-valued property directly on an object literal. A spread present alongside a
 * missing property is reported "uncertain" rather than "false" — the spread might supply it, and
 * this scanner does not evaluate spreads. An explicit literal property always wins over that
 * uncertainty (last property assignment wins, matching JS object-literal semantics).
 */
function lookupBooleanProperty(obj: ts.ObjectLiteralExpression, keyText: string): BooleanLookup {
  let hasSpread = false;
  let outcome: BooleanLookup | undefined;

  obj.properties.forEach((prop) => {
    if (ts.isSpreadAssignment(prop)) {
      hasSpread = true;
      return;
    }
    if (!ts.isPropertyAssignment(prop) || getStaticPropertyKeyText(prop.name) !== keyText) return;

    const init = unwrapExpression(prop.initializer);
    if (init.kind === ts.SyntaxKind.TrueKeyword) outcome = 'true';
    else if (init.kind === ts.SyntaxKind.FalseKeyword) outcome = 'false';
    else outcome = 'uncertain';
  });

  if (outcome) return outcome;
  return hasSpread ? 'uncertain' : 'false';
}

function resolveExperimentalFlag(
  docsRef: ObjectLiteralRef,
  segments: string[],
  checker: ts.TypeChecker,
): { resolved: boolean; value: boolean } {
  if (segments.length === 1) {
    const outcome = lookupBooleanProperty(docsRef.node, segments[0]);
    if (outcome === 'uncertain') return { resolved: false, value: false };
    return { resolved: true, value: outcome === 'true' };
  }

  const [head, ...rest] = segments;
  const prop = findPropertyAssignment(docsRef.node, head);
  if (!prop) return { resolved: false, value: false };

  const nestedRef = resolveObjectLiteral(prop.initializer, docsRef.entry, checker, new Set());
  if (!nestedRef) return { resolved: false, value: false };

  return resolveExperimentalFlag(nestedRef, rest, checker);
}

function resolveDocsInfo(
  argExpr: ts.Expression | undefined,
  category: RegistrationCategory,
  entry: FileEntry,
  checker: ts.TypeChecker,
): { documented: boolean; docsStaticallyResolved: boolean; experimental: boolean } {
  if (!argExpr) return { documented: false, docsStaticallyResolved: true, experimental: false };

  const objectRef = resolveObjectLiteral(argExpr, entry, checker, new Set());
  if (!objectRef) return { documented: true, docsStaticallyResolved: false, experimental: false };

  const flag = resolveExperimentalFlag(objectRef, DOCS_EXPERIMENTAL_PATH[category], checker);
  return { documented: true, docsStaticallyResolved: flag.resolved, experimental: flag.value };
}

// #endregion

// #region Call-site matching

interface CallMatch {
  category: RegistrationCategory;
  nameArgIndex: number;
  docsArgIndex: number;
  registeredVia: RegisteredVia;
}

const WEB_VIEW_PROVIDER_REGISTER_ALIAS_OBJECTS = new Set([
  'webViewProviders',
  'papiWebViewProviderService',
  'webViewProviderService',
]);

/**
 * Receiver spellings recognised for the network object registration alias: the service itself
 * (`networkObjectService.set`), its shorthand on the `papi` facade (`papi.networkObjects.set`,
 * matched by the receiver's own rightmost identifier -- see `getCalleeInfo`), and the bare
 * `networkObjects.set` form reached when that facade property is destructured into a local.
 */
const NETWORK_OBJECT_SERVICE_SET_ALIAS_OBJECTS = new Set([
  'networkObjectService',
  'networkObjects',
]);

/**
 * Where each recognised registration function is DECLARED in this repo, keyed by the exact
 * (repo-relative POSIX file, declared name) pair `resolveCalleeOrigin` produces. This is what lets
 * a call be matched by the symbol its callee is bound to rather than by the callee's literal
 * spelling: a renamed import, a re-export under another name, or a destructured local all bind to
 * the same declaration site, so they all resolve to the same table row. `name` is the declared
 * symbol's own name at that site -- for the `networkObjectService.set` and deprecated
 * `webViewProviders.register` aliases, that is the exported object's property name (`set`,
 * `register`), not the underlying function they happen to be assigned from.
 */
const REGISTRATION_ORIGINS: ReadonlyArray<{ file: string; name: string; match: CallMatch }> = [
  {
    file: 'src/shared/services/command.service.ts',
    name: 'registerCommand',
    match: {
      category: 'command',
      nameArgIndex: 0,
      docsArgIndex: 2,
      registeredVia: 'registerCommand',
    },
  },
  {
    file: 'src/shared/services/network.service.ts',
    name: 'registerRequestHandler',
    match: {
      category: 'directRequestHandler',
      nameArgIndex: 0,
      docsArgIndex: 2,
      registeredVia: 'registerRequestHandler',
    },
  },
  {
    file: 'src/shared/services/network.service.ts',
    name: 'createNetworkEventEmitterAsync',
    match: {
      category: 'networkEvent',
      nameArgIndex: 0,
      docsArgIndex: 1,
      registeredVia: 'createNetworkEventEmitterAsync',
    },
  },
  {
    file: 'src/shared/services/network.service.ts',
    name: 'createBufferedNetworkEventEmitter',
    match: {
      category: 'networkEvent',
      nameArgIndex: 0,
      docsArgIndex: 1,
      registeredVia: 'createBufferedNetworkEventEmitter',
    },
  },
  {
    file: 'src/shared/services/network.service.ts',
    name: 'createCoreMultiSourceEventEmitter',
    match: {
      category: 'networkEvent',
      nameArgIndex: 0,
      docsArgIndex: 1,
      registeredVia: 'createCoreMultiSourceEventEmitter',
    },
  },
  {
    file: 'src/shared/services/network-object.service.ts',
    name: 'set',
    match: {
      category: 'networkObject',
      nameArgIndex: 0,
      docsArgIndex: 4,
      registeredVia: 'networkObjectService.set',
    },
  },
  {
    file: 'src/shared/services/data-provider.service.ts',
    name: 'registerEngine',
    match: {
      category: 'dataProviderEngine',
      nameArgIndex: 0,
      docsArgIndex: 4,
      registeredVia: 'registerEngine',
    },
  },
  {
    file: 'src/shared/services/data-provider.service.ts',
    name: 'registerEngineByType',
    match: {
      category: 'dataProviderEngine',
      nameArgIndex: 0,
      docsArgIndex: 4,
      registeredVia: 'registerEngineByType',
    },
  },
  {
    file: 'src/shared/services/web-view-provider.service.ts',
    name: 'registerWebViewProvider',
    match: {
      category: 'webViewProvider',
      nameArgIndex: 0,
      docsArgIndex: 3,
      registeredVia: 'registerWebViewProvider',
    },
  },
  {
    file: 'src/shared/services/web-view-provider.service.ts',
    name: 'register',
    match: {
      category: 'webViewProvider',
      nameArgIndex: 0,
      docsArgIndex: 3,
      registeredVia: 'webViewProviders.register (deprecated alias)',
    },
  },
  {
    file: 'src/shared/services/project-data-provider.service.ts',
    name: 'registerProjectDataProviderEngineFactory',
    match: {
      category: 'pdpFactory',
      nameArgIndex: 0,
      docsArgIndex: 4,
      registeredVia: 'registerProjectDataProviderEngineFactory',
    },
  },
];

/** `REGISTRATION_ORIGINS`, indexed by declared name, for `matchByLiteralName`'s fallback lookups. */
const CALL_MATCH_BY_NAME: ReadonlyMap<string, CallMatch> = new Map(
  REGISTRATION_ORIGINS.map((origin) => [origin.name, origin.match]),
);

/**
 * The callee's own name node: the identifier itself for `f(...)`, or the rightmost property name
 * for `a.b(...)`. Returns undefined for anything else -- a computed member access (`obj[key](...)`)
 * has no single name the checker can bind, so `resolveCalleeOrigin` treats it the same as an
 * unresolved module: fall back to the literal-name match, which cannot recognise it either.
 */
function getCalleeNameNode(callee: ts.Expression): ts.Identifier | undefined {
  if (ts.isIdentifier(callee)) return callee;
  if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.name)) return callee.name;
  return undefined;
}

/**
 * Dereferences a destructured local (`const { set } = networkObjectService`) to the property symbol
 * it was destructured from, so the alias-hop loop in `resolveCalleeOrigin` can keep following it
 * back to a real declaration. A destructuring `BindingElement` is not itself an alias symbol
 * (`getSymbolAtLocation` on `set` in the call returns the binding element's own local symbol,
 * declared right there in the destructuring pattern), so this has to be a distinct step from
 * `SymbolFlags.Alias` following. Returns undefined for anything this scanner does not attempt to
 * see through: a destructured function parameter (no initializer to resolve a type from), an
 * array-destructuring element, or a property name this scanner cannot read as plain text (a
 * computed property name).
 */
function resolveBindingElementOrigin(
  bindingElement: ts.BindingElement,
  checker: ts.TypeChecker,
): ts.Symbol | undefined {
  const pattern = bindingElement.parent;
  if (!ts.isObjectBindingPattern(pattern)) return undefined;
  const declaration = pattern.parent;
  if (!ts.isVariableDeclaration(declaration) || !declaration.initializer) return undefined;

  const propertyNameNode = bindingElement.propertyName ?? bindingElement.name;
  if (!ts.isIdentifier(propertyNameNode)) return undefined;

  const initializerType = checker.getTypeAtLocation(declaration.initializer);
  return initializerType.getProperty(propertyNameNode.text);
}

/**
 * Resolves a call's callee to the file and name it is actually DECLARED under, by binding through
 * the TypeScript checker rather than reading the callee's own literal spelling -- so a renamed
 * import (`import { registerCommand as rc } from ...; rc(...)`), a re-export under another name,
 * and a destructured local receiver (`const { set } = networkObjectService; set(...)`) all resolve
 * to the same origin as the direct spelling would. Returns undefined when the checker cannot bind
 * the callee to any declaration at all -- no symbol (an unresolved module specifier, e.g. an
 * extension's `@papi/backend` import, which lives outside this scan's own TypeScript program), a
 * computed member access, or an alias/binding chain that never bottoms out in a real declaration --
 * which is the caller's cue to fall back to the literal-name match instead.
 */
function resolveCalleeOrigin(
  callee: ts.Expression,
  checker: ts.TypeChecker,
): { file: string; name: string } | undefined {
  const nameNode = getCalleeNameNode(callee);
  if (!nameNode) return undefined;

  let symbol = checker.getSymbolAtLocation(nameNode);
  if (!symbol) return undefined;

  let hopsRemaining = MAX_ALIAS_HOPS;
  let advanced = true;
  while (hopsRemaining > 0 && advanced) {
    advanced = false;
    // SymbolFlags is a bitmask; this is the TypeScript compiler API's own idiom for testing whether a
    // symbol is an alias.
    // eslint-disable-next-line no-bitwise
    if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) {
      symbol = checker.getAliasedSymbol(symbol);
      hopsRemaining -= 1;
      advanced = true;
    } else if (symbol.valueDeclaration && ts.isBindingElement(symbol.valueDeclaration)) {
      const dereferenced = resolveBindingElementOrigin(symbol.valueDeclaration, checker);
      if (!dereferenced) return undefined;
      symbol = dereferenced;
      hopsRemaining -= 1;
      advanced = true;
    }
  }

  const declaration = symbol.declarations?.[0];
  if (!declaration) return undefined;
  return { file: declaration.getSourceFile().fileName, name: symbol.name };
}

/**
 * Matches a call by the callee's own literal spelling -- the receiver's rightmost identifier for
 * `a.b(...)`, ignoring what it is actually bound to. This is `matchCall`'s fallback for a callee
 * the checker cannot bind to any declaration (see `resolveCalleeOrigin`); on its own it cannot tell
 * a platform registration function from an unrelated same-named one, which is why `set` and
 * `register` additionally require the receiver's literal name to be one of the recognised aliases
 * below.
 */
function matchByLiteralName(callee: ts.Expression): CallMatch | undefined {
  const { name, objectName } = getCalleeInfo(callee);
  if (!name) return undefined;

  if (name === 'set') {
    if (!objectName || !NETWORK_OBJECT_SERVICE_SET_ALIAS_OBJECTS.has(objectName)) return undefined;
    return CALL_MATCH_BY_NAME.get('set');
  }
  if (name === 'register') {
    if (!objectName || !WEB_VIEW_PROVIDER_REGISTER_ALIAS_OBJECTS.has(objectName)) return undefined;
    return CALL_MATCH_BY_NAME.get('register');
  }
  return CALL_MATCH_BY_NAME.get(name);
}

/**
 * Matches a call expression against the registration shapes this scanner recognises. Tries symbol
 * identity first (`resolveCalleeOrigin`): when the checker fully resolves the callee to a concrete
 * declaration, that declaration is authoritative, whether or not it is one of ours -- a callee the
 * checker proves is something else entirely (e.g. a local, non-platform `function registerCommand`
 * that merely shares a name) is definitively not a match, and this does NOT fall through to the
 * literal-name check below. Only a callee the checker cannot bind to any declaration at all falls
 * back to `matchByLiteralName`, exactly as this scanner has always matched calls.
 */
function matchCall(call: ts.CallExpression, checker: ts.TypeChecker): CallMatch | undefined {
  const origin = resolveCalleeOrigin(call.expression, checker);
  if (origin) {
    return REGISTRATION_ORIGINS.find(
      (candidate) => candidate.file === origin.file && candidate.name === origin.name,
    )?.match;
  }
  return matchByLiteralName(call.expression);
}

// #endregion

// #region Orchestration

function collectCallExpressions(sourceFile: ts.SourceFile): ts.CallExpression[] {
  const calls: ts.CallExpression[] = [];
  function visit(node: ts.Node): void {
    if (ts.isCallExpression(node)) calls.push(node);
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return calls;
}

function processCall(
  call: ts.CallExpression,
  entry: FileEntry,
  checker: ts.TypeChecker,
  staticRegistrations: StaticRegistration[],
  dynamicRegistrations: DynamicRegistration[],
): void {
  const match = matchCall(call, checker);
  if (!match) return;

  const nameArg = call.arguments[match.nameArgIndex];
  if (!nameArg) return;

  const nameEval = evaluateStringExpression(nameArg, entry, checker, new Set());

  const isCommandBypass =
    match.category === 'directRequestHandler' &&
    nameEval.serializeCategory === COMMAND_CATEGORY_VALUE;
  const category: RegistrationCategory = isCommandBypass ? 'command' : match.category;
  const registeredVia: RegisteredVia = isCommandBypass
    ? 'registerRequestHandler+serializeRequestType(command)'
    : match.registeredVia;

  if (!nameEval.resolved) {
    dynamicRegistrations.push({
      category,
      file: entry.path,
      registeredVia,
      expression: nameArg.getText(entry.sourceFile),
      language: 'typescript',
    });
    return;
  }

  const resolvedName = isCommandBypass
    ? (nameEval.serializeDirective ?? nameEval.value ?? '')
    : (nameEval.value ?? '');

  const docsArg = call.arguments[match.docsArgIndex];
  const docsInfo = resolveDocsInfo(docsArg, category, entry, checker);

  staticRegistrations.push({
    category,
    name: resolvedName,
    file: entry.path,
    registeredVia,
    documented: docsInfo.documented,
    docsStaticallyResolved: docsInfo.docsStaticallyResolved,
    experimental: docsInfo.experimental,
    language: 'typescript',
  });
}

/**
 * Registrations that are declared surface but cannot be durably observed by
 * `wire-surface-snapshot.spec.ts`'s live poll, keyed by wire name, with why. Two distinct reasons
 * show up today:
 *
 * - **Transient**: the registration is torn down again a fixed delay after startup (a `setTimeout`
 *   disposing it), so waiting LONGER only makes it LESS likely a poll catches it live, not more.
 * - **Lazy**: the registration is created on first use, inside a conditional runtime path a smoke run
 *   never exercises (e.g. a project switch), so it is simply never created during that run.
 *
 * Kept here as an explicit, hand-maintained table rather than detected by static analysis: a
 * `setTimeout` near a registration is fragile to pattern-match reliably, and "created lazily inside
 * a conditional handler" has no reliable structural signal at all — a scanner that guessed wrong
 * here would silently drop real surface from the live comparison, which is worse than this table
 * going briefly stale. `findStaleLivenessAnnotations` catches an entry that ever stops matching a
 * real registration — the CLI entry point (`generate-wire-surface.ts`, which scans the real, whole
 * codebase) fails the build loudly on a non-empty result, so a rename or removal can never let an
 * annotation here rot unnoticed.
 *
 * A NEW registration that is itself transient or lazily-created hits the same wall this table
 * documents — recognise the category (self-disposed on a timer, or created only inside a runtime
 * path a smoke run doesn't exercise) and add an entry here, rather than assuming the live
 * comparison has gone stale.
 */
const LIVENESS_ANNOTATIONS: ReadonlyMap<
  string,
  { liveness: RegistrationLiveness; file: string; reason: string }
> = new Map([
  [
    'testMain',
    {
      file: 'src/main/main.ts',
      liveness: 'transient',
      reason:
        'Self-disposed 20 seconds after registration ' +
        '(setTimeout(testMainDisposer.dispose, 20000) in src/main/main.ts) -- waiting longer only ' +
        'makes it less likely to still be live.',
    },
  ],
  [
    'testExtensionHost',
    {
      file: 'src/extension-host/extension-host.ts',
      liveness: 'transient',
      reason:
        'Self-disposed 10 seconds after registration (setTimeout(testEH.dispose, 10000) in ' +
        'src/extension-host/extension-host.ts) -- waiting longer only makes it less likely to still ' +
        'be live.',
    },
  ],
  [
    'platform.placeholder',
    {
      file: 'src/extension-host/extension-host.ts',
      liveness: 'transient',
      reason:
        'Self-disposed 3 seconds after registration (setTimeout(realDP.dispose, 3000) in ' +
        'src/extension-host/extension-host.ts) -- waiting longer only makes it less likely to still ' +
        'be live.',
    },
  ],
  [
    'platformScriptureEditor.onWillSwitchProject',
    {
      file: 'extensions/src/platform-scripture-editor/src/main.ts',
      liveness: 'lazy',
      reason:
        'Created lazily on first use, inside the project-switch overlay path in ' +
        'extensions/src/platform-scripture-editor/src/main.ts, after full activation -- a smoke run ' +
        'never triggers a project switch, so this event is never created.',
    },
  ],
  [
    'platformScriptureEditor.onDidSwitchProject',
    {
      file: 'extensions/src/platform-scripture-editor/src/main.ts',
      liveness: 'lazy',
      reason:
        'Created lazily on first use, inside the project-switch overlay path in ' +
        'extensions/src/platform-scripture-editor/src/main.ts, after full activation -- a smoke run ' +
        'never triggers a project switch, so this event is never created.',
    },
  ],
]);

/**
 * Stamps `LIVENESS_ANNOTATIONS` onto the matching registrations by name. Never throws or drops an
 * annotation that doesn't match — see `findStaleLivenessAnnotations` for that check — so this stays
 * safe to run against the partial, synthetic file sets this module's own unit tests scan (none of
 * which include the real src/main/main.ts and friends the annotated names live in).
 */
function applyLivenessAnnotations(registrations: StaticRegistration[]): StaticRegistration[] {
  return registrations.map((registration) => {
    const annotation = LIVENESS_ANNOTATIONS.get(registration.name);
    // Matched on file as well as name. An annotation excludes its registration from the live
    // comparison, so a different registration that later took an annotated name would inherit that
    // exclusion silently -- and the staleness check below would stay quiet about it, because the
    // name still matched something.
    if (!annotation || annotation.file !== registration.file) return registration;
    return { ...registration, liveness: annotation.liveness, livenessReason: annotation.reason };
  });
}

/**
 * Names in `LIVENESS_ANNOTATIONS` that match no registration in `registrations` — the registration
 * was renamed or removed and the annotation was not updated to follow. Deliberately separate from
 * `applyLivenessAnnotations` (which only stamps and never throws): this check is only meaningful
 * against a full, real scan, so only the CLI entry point (`generate-wire-surface.ts`) calls it and
 * fails the build loudly on a non-empty result — a unit test scanning a small fixture file set
 * would otherwise trip it on every one of the five annotated names it never included.
 */
export function findStaleLivenessAnnotations(
  registrations: readonly StaticRegistration[],
): string[] {
  const sites = new Set(
    registrations.map((registration) => `${registration.name}\u0000${registration.file}`),
  );
  return [...LIVENESS_ANNOTATIONS.entries()]
    .filter(([name, annotation]) => !sites.has(`${name}\u0000${annotation.file}`))
    .map(([name]) => name);
}

function compareStaticRegistrations(a: StaticRegistration, b: StaticRegistration): number {
  return (
    compareCodeUnits(a.language, b.language) ||
    compareCodeUnits(a.category, b.category) ||
    compareCodeUnits(a.name, b.name) ||
    compareCodeUnits(a.file, b.file)
  );
}

function compareDynamicRegistrations(a: DynamicRegistration, b: DynamicRegistration): number {
  return (
    compareCodeUnits(a.language, b.language) ||
    compareCodeUnits(a.category, b.category) ||
    compareCodeUnits(a.file, b.file) ||
    compareCodeUnits(a.expression, b.expression)
  );
}

/**
 * Scans the given TypeScript files (via the TypeScript compiler API's AST) and merges in
 * `csharpScan` — the already-scanned, already-validated result of running the Roslyn-based
 * `Paranext.WireSurface` tool over the C# data provider project (see `run-wire-surface-scanner.ts`)
 * — returning the full wire surface document, deterministically ordered. `csharpScan` defaults to
 * an empty result so existing callers that only care about the TypeScript half (including most of
 * this module's own unit tests) are unaffected.
 */
export function generateWireSurfaceDocument(
  inputFiles: VirtualFile[],
  csharpScan: CSharpScanResult = { registrations: [], dynamicRegistrations: [] },
): WireSurfaceDocument {
  const files = buildFileMap(inputFiles);
  const checker = buildProgram(files).getTypeChecker();
  const staticRegistrations: StaticRegistration[] = [];
  const dynamicRegistrations: DynamicRegistration[] = [];

  files.forEach((entry) => {
    const calls = collectCallExpressions(entry.sourceFile);
    calls.forEach((call) =>
      processCall(call, entry, checker, staticRegistrations, dynamicRegistrations),
    );
  });

  const allStaticRegistrations = applyLivenessAnnotations(
    [...staticRegistrations, ...csharpScan.registrations].sort(compareStaticRegistrations),
  );
  const allDynamicRegistrations = [
    ...dynamicRegistrations,
    ...csharpScan.dynamicRegistrations,
  ].sort(compareDynamicRegistrations);

  return {
    header: buildHeader(),
    registrations: allStaticRegistrations,
    dynamicRegistrations: allDynamicRegistrations,
  };
}

// #endregion

// #region Serialization

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (
    typeof value === 'object' &&
    // Testing null to make sure we don't try to treat it as a plain object (typeof null === 'object').
    // eslint-disable-next-line no-null/no-null
    value !== null
  ) {
    const sorted: Record<string, unknown> = {};
    Object.entries(value)
      .sort(([keyA], [keyB]) => compareCodeUnits(keyA, keyB))
      .forEach(([key, propertyValue]) => {
        sorted[key] = sortKeysDeep(propertyValue);
      });
    return sorted;
  }
  return value;
}

/**
 * Serializes a wire surface document deterministically: object keys sorted recursively, 2-space
 * indentation, one LF-terminated line per field. Array element order is untouched — callers must
 * pre-sort arrays that need a stable order (`generateWireSurfaceDocument` already does).
 */
export function serializeWireSurfaceDocument(document: WireSurfaceDocument): string {
  return `${JSON.stringify(sortKeysDeep(document), undefined, 2)}\n`;
}

// #endregion
