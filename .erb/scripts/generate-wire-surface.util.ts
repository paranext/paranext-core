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
import {
  CSHARP_EXCLUDED_PATTERNS,
  CSHARP_RECOGNIZED_PATTERNS,
  scanCSharpFiles,
  VirtualFile as CSharpVirtualFile,
} from './generate-wire-surface.csharp.util';

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
 * is defined in `generate-wire-surface.csharp.util.ts`. `language` is the field to filter or group
 * on.
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
  'registerCommand(name, handler, docs?, options?) -> category "command"',
  'registerRequestHandler(requestType, handler, docs?, options?) -> category "directRequestHandler"; ' +
    `when requestType is serializeRequestType(CATEGORY_COMMAND, directive) the registration is ` +
    're-filed under category "command" with the resolved directive as its name, so a command ' +
    'registered by bypassing registerCommand is not missed',
  'networkObjectService.set(id, obj, objectType?, attributes?, objectDocumentation?) -> category "networkObject"',
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
  'createNetworkEventEmitter(eventType) — the deprecated synchronous event emitter. It does not ' +
    'participate in central registration and deliberately does not appear in the generated OpenRPC ' +
    'document, so it is excluded here for the same reason.',
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
      'the data provider backend under c-sharp/** (excluding bin, obj, and the ' +
      'Paranext.Analyzers/Paranext.Analyzers.Tests projects), matched with a pattern-based text ' +
      'scan — there is no C# parser (e.g. Roslyn) in this toolchain, so the C# half recognises a ' +
      'fixed set of call-site and declaration idioms (see recognizedPatterns) rather than a real ' +
      'syntax tree. That is a real difference in rigour from the TypeScript half: an unusual ' +
      'formatting choice, or a new C#-side registration idiom this generator has never seen, can ' +
      'evade the C# scan more easily than it could evade the TypeScript AST scan. Every entry ' +
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

/** Repo-relative-path aliases from the root tsconfig.json, used to resolve `@alias/*` imports. */
const PATH_ALIASES: ReadonlyArray<readonly [string, string]> = [
  ['@shared/', 'src/shared/'],
  ['@main/', 'src/main/'],
  ['@node/', 'src/node/'],
  ['@extension-host/', 'src/extension-host/'],
  ['@renderer/', 'src/renderer/'],
  ['@client/', 'src/client/'],
];

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

interface FileDeclarations {
  /** Every top-level `const NAME = expr`, exported or not. */
  consts: Map<string, ts.Expression>;
  /** Named imports: local name -> { specifier, exported name }. */
  imports: Map<string, { specifier: string; exportedName: string }>;
  /**
   * `export { A } from './mod'` / `export { A as B } from './mod'`: local (exported) name ->
   * source.
   */
  reExports: Map<string, { specifier: string; exportedName: string }>;
}

const declarationsCache = new Map<string, FileDeclarations>();

function getFileDeclarations(entry: FileEntry): FileDeclarations {
  const cached = declarationsCache.get(entry.path);
  if (cached) return cached;

  const consts: FileDeclarations['consts'] = new Map();
  const imports: FileDeclarations['imports'] = new Map();
  const reExports: FileDeclarations['reExports'] = new Map();

  entry.sourceFile.statements.forEach((statement) => {
    if (ts.isVariableStatement(statement)) {
      statement.declarationList.declarations.forEach((declaration) => {
        if (ts.isIdentifier(declaration.name) && declaration.initializer) {
          consts.set(declaration.name.text, declaration.initializer);
        }
      });
      return;
    }

    if (
      ts.isImportDeclaration(statement) &&
      statement.importClause?.namedBindings &&
      ts.isNamedImports(statement.importClause.namedBindings) &&
      ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      const specifier = statement.moduleSpecifier.text;
      statement.importClause.namedBindings.elements.forEach((element) => {
        const exportedName = (element.propertyName ?? element.name).text;
        imports.set(element.name.text, { specifier, exportedName });
      });
      return;
    }

    if (
      ts.isExportDeclaration(statement) &&
      statement.moduleSpecifier &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause)
    ) {
      const specifier = statement.moduleSpecifier.text;
      statement.exportClause.elements.forEach((element) => {
        const exportedName = (element.propertyName ?? element.name).text;
        reExports.set(element.name.text, { specifier, exportedName });
      });
    }
  });

  const result: FileDeclarations = { consts, imports, reExports };
  declarationsCache.set(entry.path, result);
  return result;
}

/** Depth cap guarding against a pathological import cycle chasing a re-exported name forever. */
const MAX_DECLARATION_HOPS = 25;

function findDeclaration(
  entry: FileEntry,
  name: string,
  files: Map<string, FileEntry>,
  hopsRemaining: number = MAX_DECLARATION_HOPS,
): { entry: FileEntry; expr: ts.Expression } | undefined {
  if (hopsRemaining <= 0) return undefined;

  const declarations = getFileDeclarations(entry);

  const localExpr = declarations.consts.get(name);
  if (localExpr) return { entry, expr: localExpr };

  const importInfo = declarations.imports.get(name) ?? declarations.reExports.get(name);
  if (!importInfo) return undefined;

  const targetPath = resolveModuleSpecifier(entry.path, importInfo.specifier, files);
  if (!targetPath) return undefined;
  const targetEntry = files.get(targetPath);
  if (!targetEntry) return undefined;

  return findDeclaration(targetEntry, importInfo.exportedName, files, hopsRemaining - 1);
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
  files: Map<string, FileEntry>,
  visited: ReadonlySet<string>,
): StringEvalResult {
  const expr = unwrapExpression(rawExpr);

  if (ts.isStringLiteralLike(expr)) return { resolved: true, value: expr.text };

  if (ts.isTemplateExpression(expr)) {
    const spanResults = expr.templateSpans.map((span) =>
      evaluateStringExpression(span.expression, entry, files, visited),
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
    const found = findDeclaration(entry, expr.text, files);
    if (!found) return { resolved: false };
    const nextVisited = new Set(visited);
    nextVisited.add(key);
    return evaluateStringExpression(found.expr, found.entry, files, nextVisited);
  }

  if (ts.isCallExpression(expr)) {
    const { name: calleeName } = getCalleeInfo(expr.expression);
    if (calleeName === 'serializeRequestType' && expr.arguments.length === 2) {
      const categoryResult = evaluateStringExpression(expr.arguments[0], entry, files, visited);
      const directiveResult = evaluateStringExpression(expr.arguments[1], entry, files, visited);
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
    const objectRef = resolveObjectLiteral(expr.expression, entry, files, visited);
    if (!objectRef) return { resolved: false };
    const prop = findPropertyAssignment(objectRef.node, expr.name.text);
    if (!prop) return { resolved: false };
    return evaluateStringExpression(prop.initializer, objectRef.entry, files, visited);
  }

  if (ts.isElementAccessExpression(expr)) {
    const objectRef = resolveObjectLiteral(expr.expression, entry, files, visited);
    if (!objectRef) return { resolved: false };
    const keyResult = evaluateStringExpression(expr.argumentExpression, entry, files, visited);
    if (!keyResult.resolved || keyResult.value === undefined) return { resolved: false };
    const prop = findPropertyAssignment(objectRef.node, keyResult.value);
    if (!prop) return { resolved: false };
    return evaluateStringExpression(prop.initializer, objectRef.entry, files, visited);
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
}

function resolveObjectLiteral(
  rawExpr: ts.Expression,
  entry: FileEntry,
  files: Map<string, FileEntry>,
  visited: ReadonlySet<string>,
): ObjectLiteralRef | undefined {
  const expr = unwrapExpression(rawExpr);

  if (ts.isObjectLiteralExpression(expr)) return { node: expr, entry };

  if (ts.isIdentifier(expr)) {
    const key = `${entry.path}#${expr.text}`;
    if (visited.has(key)) return undefined;
    const found = findDeclaration(entry, expr.text, files);
    if (!found) return undefined;
    const nextVisited = new Set(visited);
    nextVisited.add(key);
    return resolveObjectLiteral(found.expr, found.entry, files, nextVisited);
  }

  if (ts.isPropertyAccessExpression(expr)) {
    const objectRef = resolveObjectLiteral(expr.expression, entry, files, visited);
    if (!objectRef) return undefined;
    const prop = findPropertyAssignment(objectRef.node, expr.name.text);
    if (!prop) return undefined;
    return resolveObjectLiteral(prop.initializer, objectRef.entry, files, visited);
  }

  if (ts.isElementAccessExpression(expr)) {
    const objectRef = resolveObjectLiteral(expr.expression, entry, files, visited);
    if (!objectRef) return undefined;
    const keyResult = evaluateStringExpression(expr.argumentExpression, entry, files, visited);
    if (!keyResult.resolved || keyResult.value === undefined) return undefined;
    const prop = findPropertyAssignment(objectRef.node, keyResult.value);
    if (!prop) return undefined;
    return resolveObjectLiteral(prop.initializer, objectRef.entry, files, visited);
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
  files: Map<string, FileEntry>,
): { resolved: boolean; value: boolean } {
  if (segments.length === 1) {
    const outcome = lookupBooleanProperty(docsRef.node, segments[0]);
    if (outcome === 'uncertain') return { resolved: false, value: false };
    return { resolved: true, value: outcome === 'true' };
  }

  const [head, ...rest] = segments;
  const prop = findPropertyAssignment(docsRef.node, head);
  if (!prop) return { resolved: false, value: false };

  const nestedRef = resolveObjectLiteral(prop.initializer, docsRef.entry, files, new Set());
  if (!nestedRef) return { resolved: false, value: false };

  return resolveExperimentalFlag(nestedRef, rest, files);
}

function resolveDocsInfo(
  argExpr: ts.Expression | undefined,
  category: RegistrationCategory,
  entry: FileEntry,
  files: Map<string, FileEntry>,
): { documented: boolean; docsStaticallyResolved: boolean; experimental: boolean } {
  if (!argExpr) return { documented: false, docsStaticallyResolved: true, experimental: false };

  const objectRef = resolveObjectLiteral(argExpr, entry, files, new Set());
  if (!objectRef) return { documented: true, docsStaticallyResolved: false, experimental: false };

  const flag = resolveExperimentalFlag(objectRef, DOCS_EXPERIMENTAL_PATH[category], files);
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

function matchCall(call: ts.CallExpression): CallMatch | undefined {
  const { name, objectName } = getCalleeInfo(call.expression);
  if (!name) return undefined;

  switch (name) {
    case 'registerCommand':
      return {
        category: 'command',
        nameArgIndex: 0,
        docsArgIndex: 2,
        registeredVia: 'registerCommand',
      };
    case 'registerRequestHandler':
      return {
        category: 'directRequestHandler',
        nameArgIndex: 0,
        docsArgIndex: 2,
        registeredVia: 'registerRequestHandler',
      };
    case 'registerEngine':
      return {
        category: 'dataProviderEngine',
        nameArgIndex: 0,
        docsArgIndex: 4,
        registeredVia: 'registerEngine',
      };
    case 'registerEngineByType':
      return {
        category: 'dataProviderEngine',
        nameArgIndex: 0,
        docsArgIndex: 4,
        registeredVia: 'registerEngineByType',
      };
    case 'registerWebViewProvider':
      return {
        category: 'webViewProvider',
        nameArgIndex: 0,
        docsArgIndex: 3,
        registeredVia: 'registerWebViewProvider',
      };
    case 'registerProjectDataProviderEngineFactory':
      return {
        category: 'pdpFactory',
        nameArgIndex: 0,
        docsArgIndex: 4,
        registeredVia: 'registerProjectDataProviderEngineFactory',
      };
    case 'createNetworkEventEmitterAsync':
      return {
        category: 'networkEvent',
        nameArgIndex: 0,
        docsArgIndex: 1,
        registeredVia: 'createNetworkEventEmitterAsync',
      };
    case 'createBufferedNetworkEventEmitter':
      return {
        category: 'networkEvent',
        nameArgIndex: 0,
        docsArgIndex: 1,
        registeredVia: 'createBufferedNetworkEventEmitter',
      };
    case 'createCoreMultiSourceEventEmitter':
      return {
        category: 'networkEvent',
        nameArgIndex: 0,
        docsArgIndex: 1,
        registeredVia: 'createCoreMultiSourceEventEmitter',
      };
    case 'set':
      if (objectName === 'networkObjectService') {
        return {
          category: 'networkObject',
          nameArgIndex: 0,
          docsArgIndex: 4,
          registeredVia: 'networkObjectService.set',
        };
      }
      return undefined;
    case 'register':
      if (objectName && WEB_VIEW_PROVIDER_REGISTER_ALIAS_OBJECTS.has(objectName)) {
        return {
          category: 'webViewProvider',
          nameArgIndex: 0,
          docsArgIndex: 3,
          registeredVia: 'webViewProviders.register (deprecated alias)',
        };
      }
      return undefined;
    default:
      return undefined;
  }
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
  files: Map<string, FileEntry>,
  staticRegistrations: StaticRegistration[],
  dynamicRegistrations: DynamicRegistration[],
): void {
  const match = matchCall(call);
  if (!match) return;

  const nameArg = call.arguments[match.nameArgIndex];
  if (!nameArg) return;

  const nameEval = evaluateStringExpression(nameArg, entry, files, new Set());

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
  const docsInfo = resolveDocsInfo(docsArg, category, entry, files);

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
  { liveness: RegistrationLiveness; reason: string }
> = new Map([
  [
    'testMain',
    {
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
    if (!annotation) return registration;
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
  const names = new Set(registrations.map((registration) => registration.name));
  return [...LIVENESS_ANNOTATIONS.keys()].filter((name) => !names.has(name));
}

function compareStaticRegistrations(a: StaticRegistration, b: StaticRegistration): number {
  return (
    a.language.localeCompare(b.language) ||
    a.category.localeCompare(b.category) ||
    a.name.localeCompare(b.name) ||
    a.file.localeCompare(b.file)
  );
}

function compareDynamicRegistrations(a: DynamicRegistration, b: DynamicRegistration): number {
  return (
    a.language.localeCompare(b.language) ||
    a.category.localeCompare(b.category) ||
    a.file.localeCompare(b.file) ||
    a.expression.localeCompare(b.expression)
  );
}

/**
 * Scans the given TypeScript files (via the TypeScript compiler API's AST) and C# files (via a
 * pattern-based text scan — see `generate-wire-surface.csharp.util.ts`), and returns the full wire
 * surface document, deterministically ordered. `csharpFiles` defaults to empty so existing callers
 * that only pass TypeScript files (including this module's own unit tests) are unaffected.
 */
export function generateWireSurfaceDocument(
  inputFiles: VirtualFile[],
  csharpFiles: CSharpVirtualFile[] = [],
): WireSurfaceDocument {
  const files = buildFileMap(inputFiles);
  const staticRegistrations: StaticRegistration[] = [];
  const dynamicRegistrations: DynamicRegistration[] = [];

  files.forEach((entry) => {
    const calls = collectCallExpressions(entry.sourceFile);
    calls.forEach((call) =>
      processCall(call, entry, files, staticRegistrations, dynamicRegistrations),
    );
  });

  const csharpResult = scanCSharpFiles(csharpFiles);

  const allStaticRegistrations = applyLivenessAnnotations(
    [...staticRegistrations, ...csharpResult.registrations].sort(compareStaticRegistrations),
  );
  const allDynamicRegistrations = [
    ...dynamicRegistrations,
    ...csharpResult.dynamicRegistrations,
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
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
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
