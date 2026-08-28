/**
 * Pattern-based text scan over the C# data-provider backend (`c-sharp/**`) for the wire-visible
 * registration shapes it declares: network objects, data providers, PDP factories, and standalone
 * request-handler registrations. Every one of these reaches the same wire registry as the
 * TypeScript half: `PapiClient.RegisterRequestHandlerAsync` (`c-sharp/PapiClient.cs`) sends the
 * literal `network:registerMethod` request — the same request `generate-wire-surface.util.ts`'s
 * TypeScript scan is built around (`REGISTER_METHOD` in `src/shared/data/rpc.model.ts`). A C#-only
 * `x-experimental: true` marker is therefore exactly as invisible to every other check as a
 * TypeScript one, which is why this half exists.
 *
 * There is no C# parser (e.g. Roslyn) in this toolchain, so — unlike the TypeScript half, which
 * walks a real AST — this module recognises a fixed set of call-site and declaration idioms via a
 * hand-written, comment/string-aware text scanner (`matchBracket`, `skipTrivia`, and friends
 * below). That is a real difference in rigour: an unusual formatting choice, or a new C#-side
 * registration idiom this module has never seen, can evade it more easily than it could evade the
 * TypeScript AST scan. A name or documentation shape this module cannot resolve is always filed
 * under `dynamicRegistrations` with its raw source expression — never guessed, never silently
 * dropped.
 *
 * Pure and filesystem-free, mirroring `generate-wire-surface.util.ts`: callers pass in the C# file
 * paths and contents to scan (see `generate-wire-surface.ts` for the real filesystem walk), which
 * keeps this module directly testable against small fixtures and independent of scan order.
 */

// #region Public types

/** One of the wire-visible C# registration shapes this scanner recognises. */
/**
 * Order two strings by UTF-16 code unit.
 *
 * Deliberately not `localeCompare`: without an explicit locale that consults the host's locale and
 * ICU build, so the same input sorts differently on different platforms. This artifact is
 * regenerated on Linux, macOS and Windows and compared byte for byte, so the ordering has to come
 * from the strings alone.
 */
export function compareCodeUnits(a: string, b: string): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

export type CSharpRegistrationCategory =
  | 'networkObject'
  | 'dataProvider'
  | 'pdpFactory'
  | 'standaloneMethod'
  | 'networkEvent';

/** A C# source file to scan: a repo-relative POSIX path and its full text. */
export interface VirtualFile {
  path: string;
  text: string;
}

/** A C# registration whose name resolved to a literal string value. */
export interface CSharpStaticRegistration {
  category: CSharpRegistrationCategory;
  /**
   * The resolved registration name — except for a `GetNetworkObjectDocumentation()` override entry,
   * where no wire name is available at the override's declaration site (the provider it documents
   * is only named at its, possibly per-project, registration call) and this is instead the
   * overriding class's own name (see `registeredVia`, which spells that out for a reader of the
   * JSON).
   */
  name: string;
  /** Repo-relative path of the file containing the declaration. */
  file: string;
  registeredVia: string;
  documented: boolean;
  /**
   * Whether the documentation (when `documented`) resolved to a shape this scanner could inspect
   * for `Experimental`. `false` means the experimental status below is not authoritative.
   */
  docsStaticallyResolved: boolean;
  /** Whether the object-level `Experimental` flag was statically proven true. */
  experimental: boolean;
  language: 'csharp';
}

/** A recognised C# registration whose name could not be resolved to a literal string. */
export interface CSharpDynamicRegistration {
  category: CSharpRegistrationCategory;
  file: string;
  registeredVia: string;
  /** Source text of the name expression as written at the declaration site. */
  expression: string;
  language: 'csharp';
}

export interface CSharpScanResult {
  registrations: CSharpStaticRegistration[];
  dynamicRegistrations: CSharpDynamicRegistration[];
}

// #endregion

// #region Header content (imported by generate-wire-surface.util.ts's buildHeader)

export const CSHARP_RECOGNIZED_PATTERNS: string[] = [
  'C# — a direct NetworkObject subclass calling the inherited RegisterNetworkObjectAsync(name, ' +
    'functions, details, documentation?) -> category "networkObject" (e.g. ChecklistNetworkObject, ' +
    'ManageBooksService, EnhancedResourceFactory)',
  "C# — ProjectDataProviderFactory.InitializeAsync's own RegisterNetworkObjectAsync call, whose name " +
    'is always $"platform.{pdpfName}-pdpf" built from a constructor parameter rather than a literal at ' +
    'the call site -> category "pdpFactory", always recorded under dynamicRegistrations',
  'C# — a class extending DataProvider directly (either the primary-constructor form ' +
    'class X(...) : DataProvider(name, ...) or the traditional class X : DataProvider { X(...) : ' +
    "base(name, ...) {} } form); DataProvider.RegisterDataProviderAsync's own " +
    'RegisterNetworkObjectAsync(DataProviderName, ...) call site (DataProviderName is a computed ' +
    'property, never a literal, so this is always dynamic); and a ' +
    "DataProvider.GetNetworkObjectDocumentation() override, recorded under the overriding class's " +
    'name since the override supplies documentation independently of whatever name the provider is ' +
    "ultimately registered under (e.g. a per-project PDP's runtime-generated id) -> category " +
    '"dataProvider"',
  'C# — PapiClient.RegisterRequestHandlerAsync(requestType, handler, timeout?, documentation?) called ' +
    "from anywhere other than NetworkObject's own per-function/per-existence-check fan-out -> " +
    'category "standaloneMethod"',
  'C# — ExperimentalMethodDocumentation.Create/.Marker/.ExistenceMarker (bare or qualified with a ' +
    '`using static` import) are recognised as an always-x-experimental idiom by call shape alone, ' +
    'without inspecting their arguments, since every documentation object that helper builds ' +
    'hardcodes Experimental = true',
  'C# — PapiClient.SendRequestAsync(requestType, requestContents), generic-typed or not, where ' +
    'requestType resolves to the literal "network:registerEvent": a network event registered ' +
    'directly via the generic request method rather than through a dedicated wrapper like ' +
    'RegisterRequestHandlerAsync (PapiClient has none for this method). The event name and its ' +
    "documentation are packed inside the second argument's array literal ([eventType, documentation]) " +
    'rather than passed as separate positional parameters, so this scanner parses that array ' +
    'literal\'s own top-level segments to recover them -> category "networkEvent"',
];

export const CSHARP_EXCLUDED_PATTERNS: string[] = [];

// #endregion

// #region Well-known framework files (drive categorisation and exclusion)

const PDP_FACTORY_FILE = 'c-sharp/Projects/ProjectDataProviderFactory.cs';
const DATA_PROVIDER_FRAMEWORK_FILE = 'c-sharp/NetworkObjects/DataProvider.cs';
const NETWORK_OBJECT_FRAMEWORK_FILE = 'c-sharp/NetworkObjects/NetworkObject.cs';

// #endregion

// #region C#-aware text scanning primitives
//
// There is no Roslyn in this toolchain, so the functions below implement just enough of a C#
// tokenizer to do two things safely: (1) match a bracket to its close without being fooled by a
// bracket-like character inside a string, char literal, or comment, and (2) mask out comment/string
// content before running a structural regex (a class header, a `const` declaration, a call-site name)
// so that text INSIDE a comment or string — e.g. an XML doc comment's
// `<see cref="RegisterNetworkObjectAsync()"/>`, which is plain text, not a call — can never be
// mistaken for a real declaration or call.

/** Returns the index just past a `'...'` char literal starting at `i`. */
function skipCharLiteral(text: string, i: number): number {
  let j = i + 1;
  while (j < text.length) {
    if (text[j] === '\\') {
      j += 2;
    } else if (text[j] === "'") {
      return j + 1;
    } else {
      j += 1;
    }
  }
  return j;
}

/**
 * Returns the length of a `$`/`@` string prefix immediately before a quote at `text[i + prefixLen]`
 * (0, 1, or 2), or -1 if `text[i]` is not the start of a string literal at all.
 */
function stringLiteralPrefixLength(text: string, i: number): number {
  let j = i;
  while ((text[j] === '$' || text[j] === '@') && j - i < 2) j += 1;
  if (text[j] !== '"') return -1;
  return j - i;
}

/**
 * Returns the index just past a string literal starting at `text[i]` (after any `$`/`@` prefix),
 * handling plain, verbatim (`@"..."`, `""` = escaped quote), interpolated (`$"...{expr}..."`, holes
 * balanced recursively via `matchBracket` since a hole can itself contain nested strings/brackets),
 * and raw (`"""..."""`, three or more quotes) string literals.
 */
function skipStringLiteral(text: string, i: number, prefixLen: number): number {
  const prefix = text.slice(i, i + prefixLen);
  const interpolated = prefix.includes('$');
  const verbatim = prefix.includes('@');

  const quoteStart = i + prefixLen;
  let quoteCount = 0;
  while (text[quoteStart + quoteCount] === '"') quoteCount += 1;

  if (quoteCount >= 3) {
    // Raw string literal: content runs until a closing run of at least `quoteCount` quote chars.
    // Rare outside test fixtures (which this scanner excludes by directory); interpolation holes
    // inside a raw string are not parsed, matching the "defense in depth, not a target shape" role
    // this branch plays.
    let j = quoteStart + quoteCount;
    while (j < text.length) {
      if (text[j] === '"') {
        let k = j;
        let n = 0;
        while (text[k] === '"') {
          n += 1;
          k += 1;
        }
        if (n >= quoteCount) return k;
        j = k;
      } else {
        j += 1;
      }
    }
    return j;
  }

  let j = quoteStart + 1;
  while (j < text.length) {
    const ch = text[j];
    if (verbatim && ch === '"' && text[j + 1] === '"') {
      j += 2;
    } else if (verbatim && ch === '"') {
      return j + 1;
    } else if (!verbatim && ch === '\\') {
      j += 2;
    } else if (!verbatim && ch === '"') {
      return j + 1;
    } else if (interpolated && ch === '{' && text[j + 1] === '{') {
      j += 2;
    } else if (interpolated && ch === '{') {
      const hole = matchBracket(text, j);
      j = hole ? hole.endIndex : text.length;
    } else if (interpolated && ch === '}' && text[j + 1] === '}') {
      j += 2;
    } else {
      j += 1;
    }
  }
  return j; // unterminated (malformed/truncated input); degrade to end of text
}

/**
 * If `text[i]` starts a comment or string/char literal, returns the index just past it; otherwise
 * returns `i` unchanged. The single primitive both `matchBracket` (which must not miscount a
 * bracket character inside a literal) and `maskCommentsAndStrings` (which blanks literals out
 * entirely) are built on.
 */
function skipTrivia(text: string, i: number): number {
  if (text[i] === '/' && text[i + 1] === '/') {
    let j = i;
    while (j < text.length && text[j] !== '\n') j += 1;
    return j;
  }
  if (text[i] === '/' && text[i + 1] === '*') {
    let j = i + 2;
    while (j < text.length && !(text[j] === '*' && text[j + 1] === '/')) j += 1;
    return Math.min(j + 2, text.length);
  }
  if (text[i] === "'") return skipCharLiteral(text, i);
  if (text[i] === '"' || text[i] === '$' || text[i] === '@') {
    const prefixLen = stringLiteralPrefixLength(text, i);
    if (prefixLen >= 0) return skipStringLiteral(text, i, prefixLen);
  }
  return i;
}

/**
 * Replaces every comment and string/char literal in `text` with spaces (preserving newlines and the
 * overall length, so every other index into the original text still lines up), leaving only real
 * code. Structural regexes (a class header, a `const` declaration, a call-site name) run against
 * this masked text so they can never be fooled by look-alike text inside a comment or string — e.g.
 * an XML doc comment's `<see cref="RegisterNetworkObjectAsync()"/>`. Content extraction (an
 * argument's actual text, a string literal's actual value) always reads from the original text at
 * the same indices.
 */
function maskCommentsAndStrings(text: string): string {
  let result = '';
  let i = 0;
  while (i < text.length) {
    const next = skipTrivia(text, i);
    if (next !== i) {
      for (let k = i; k < next; k += 1) result += text[k] === '\n' ? '\n' : ' ';
      i = next;
    } else {
      result += text[i];
      i += 1;
    }
  }
  return result;
}

/** A bracket pair located by `matchBracket`. */
interface BracketMatch {
  /** Index one past the matching close bracket. */
  endIndex: number;
  /** Raw text strictly between the open and close brackets (exclusive of both). */
  inner: string;
  /** `inner` split at top-level (depth-0) commas, each segment trimmed. Empty inner => []. */
  segments: string[];
}

/**
 * Given `text` and the index of an opening bracket char (`(`, `{`, or `[`), scans forward to find
 * its match, skipping nested brackets, string/char literals, and comments, and collecting top-level
 * comma-separated segments along the way (so a caller extracting a call's arguments or an object
 * initializer's properties gets both the match and the split in one pass). Returns undefined if the
 * input ends before a match is found (malformed/truncated input) or the close bracket found doesn't
 * match the open one (also malformed).
 */
/** Maps an opening bracket char to its close, avoiding a nested-ternary lookup. */
const CLOSE_BRACKET_FOR: Readonly<Record<string, string>> = { '(': ')', '{': '}', '[': ']' };

function matchBracket(text: string, openIndex: number): BracketMatch | undefined {
  const closeChar = CLOSE_BRACKET_FOR[text[openIndex]];
  let i = openIndex + 1;
  let depth = 0;
  const segments: string[] = [];
  let segmentStart = i;

  while (i < text.length) {
    const next = skipTrivia(text, i);
    const ch = text[i];
    if (next !== i) {
      i = next;
    } else if (ch === '(' || ch === '{' || ch === '[') {
      depth += 1;
      i += 1;
    } else if (ch === ')' || ch === '}' || ch === ']') {
      if (depth === 0) {
        if (ch !== closeChar) return undefined;
        const finalSegment = text.slice(segmentStart, i).trim();
        if (finalSegment !== '') segments.push(finalSegment);
        return { endIndex: i + 1, inner: text.slice(openIndex + 1, i), segments };
      }
      depth -= 1;
      i += 1;
    } else if (ch === ',' && depth === 0) {
      segments.push(text.slice(segmentStart, i).trim());
      segmentStart = i + 1;
      i += 1;
    } else {
      i += 1;
    }
  }
  return undefined;
}

function isWordChar(ch: string | undefined): boolean {
  return ch !== undefined && /\w/.test(ch);
}

interface CallSiteMatch {
  /** Index of the matched call's opening `(`. */
  openIndex: number;
  /** Index to resume the outer scan from. */
  nextIndex: number;
  /**
   * True when the parameter list is immediately followed by `{` or `=>` (a declaration, not a
   * call).
   */
  isDeclaration: boolean;
}

/**
 * If `masked[i]` starts a balanced `<...>` generic type-argument list (as in
 * `SendRequestAsync<bool>(`), returns the index just past its closing `>`; otherwise undefined.
 * Bails out (undefined) on hitting `;`, `{`, or `}` before the angle brackets balance, since that
 * means the opening `<` was a less-than comparison rather than a generic argument list — this
 * codebase's generic call sites never span a statement boundary.
 */
function skipGenericArgumentList(masked: string, i: number): number | undefined {
  if (masked[i] !== '<') return undefined;
  let depth = 0;
  let j = i;
  while (j < masked.length) {
    const ch = masked[j];
    if (ch === '<') depth += 1;
    else if (ch === '>') {
      depth -= 1;
      if (depth === 0) return j + 1;
    } else if (ch === ';' || ch === '{' || ch === '}') {
      return undefined;
    }
    j += 1;
  }
  return undefined;
}

/**
 * If `masked[i]` starts a whole-word occurrence of `calleeName(` (not part of a longer identifier),
 * returns its match; otherwise undefined. A declaration (`Task Foo(...) { ... }`) is distinguished
 * from a call (`Foo(...);`, `= Foo(...)`, ...) by whether `{`/`=>` immediately follows the
 * parameter list — the one signal available without a real parser. When `allowGenericArgs` is set,
 * a `<...>` generic type-argument list (e.g. `SendRequestAsync<bool>(`) is skipped between the name
 * and the opening `(`, exactly like C# itself resolves it — never both with and without, so a
 * caller that doesn't expect generics is never surprised by one.
 */
function tryMatchCallSite(
  masked: string,
  i: number,
  calleeName: string,
  { allowGenericArgs = false }: { allowGenericArgs?: boolean } = {},
): CallSiteMatch | undefined {
  if (
    !masked.startsWith(calleeName, i) ||
    isWordChar(masked[i - 1]) ||
    isWordChar(masked[i + calleeName.length])
  ) {
    return undefined;
  }

  let j = i + calleeName.length;
  while (j < masked.length && /\s/.test(masked[j])) j += 1;

  if (allowGenericArgs && masked[j] === '<') {
    const afterGeneric = skipGenericArgumentList(masked, j);
    if (afterGeneric === undefined) return undefined;
    j = afterGeneric;
    while (j < masked.length && /\s/.test(masked[j])) j += 1;
  }

  if (masked[j] !== '(') return undefined;

  const match = matchBracket(masked, j);
  if (!match) return undefined;

  let peek = match.endIndex;
  while (peek < masked.length && /\s/.test(masked[peek])) peek += 1;
  const isDeclaration = masked[peek] === '{' || masked.slice(peek, peek + 2) === '=>';
  return { openIndex: j, nextIndex: match.endIndex, isDeclaration };
}

/**
 * Finds every call-like occurrence of `calleeName(` in `masked` text (see `tryMatchCallSite`).
 * Returns the index of each match's opening `(`.
 */
function findCallSites(
  masked: string,
  calleeName: string,
  options: { allowGenericArgs?: boolean } = {},
): number[] {
  const results: number[] = [];
  let i = 0;
  while (i < masked.length) {
    const callSite = tryMatchCallSite(masked, i, calleeName, options);
    if (callSite) {
      if (!callSite.isDeclaration) results.push(callSite.openIndex);
      i = callSite.nextIndex;
    } else {
      i += 1;
    }
  }
  return results;
}

/**
 * Scans forward from `startIndex` to the next top-level (depth-0) `;`, skipping nested
 * brackets/strings/comments, and returns the statement's expression text. Used to capture a `var x
 * = <expr>;` local's initializer and an expression-bodied `=> <expr>;` member's body.
 */
function scanToTopLevelSemicolon(
  text: string,
  startIndex: number,
): { endIndex: number; expr: string } | undefined {
  let i = startIndex;
  let depth = 0;
  while (i < text.length) {
    const next = skipTrivia(text, i);
    const ch = text[i];
    if (next !== i) {
      i = next;
    } else if (ch === ';' && depth === 0) {
      return { endIndex: i + 1, expr: text.slice(startIndex, i).trim() };
    } else if (ch === '(' || ch === '{' || ch === '[') {
      depth += 1;
      i += 1;
    } else if (ch === ')' || ch === '}' || ch === ']') {
      depth -= 1;
      i += 1;
    } else {
      i += 1;
    }
  }
  return undefined;
}

/** Escape sequences this scanner unescapes in a resolved `const string` literal. */
const CSHARP_ESCAPE_SEQUENCES: Readonly<Record<string, string>> = { n: '\n', t: '\t' };

function unescapeCSharpString(raw: string): string {
  return raw.replace(/\\(.)/g, (_match, c: string) => CSHARP_ESCAPE_SEQUENCES[c] ?? c);
}

/**
 * Strips leading whitespace and `//`/`/* *\/` comments from `text`. A `matchBracket` segment is a
 * raw slice of the original source, so an argument preceded by an explanatory comment on its own
 * line — e.g. `// EXPERIMENTAL: ...\nnew NetworkObjectDocumentation { ... }`, the idiom every real
 * network-object registration in this codebase uses — carries that comment as part of its text. The
 * shape-recognising regexes below match against the start of an argument's actual code, so this
 * must run first or every one of them silently falls through to "unresolved" on exactly the real
 * idiom they exist to recognise. (Deliberately leading-only: an argument's own content, including a
 * string that happens to start with `/`, must never be touched.)
 */
function stripLeadingTrivia(text: string): string {
  let i = 0;
  let sawTrivia = true;
  while (i < text.length && sawTrivia) {
    if (/\s/.test(text[i])) {
      i += 1;
    } else if (text[i] === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') i += 1;
    } else if (text[i] === '/' && text[i + 1] === '*') {
      i += 2;
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) i += 1;
      i = Math.min(i + 2, text.length);
    } else {
      sawTrivia = false;
    }
  }
  return text.slice(i);
}

// #endregion

// #region Name and documentation resolution

type NameResolution = { resolved: true; value: string } | { resolved: false; expression: string };

/**
 * Resolves a name argument/expression to a literal string when possible: a plain string literal; a
 * bare identifier matching a same-file `const string` declaration; or a bare identifier matching a
 * same-file `var` local, itself resolved one hop further only if that local's initializer is itself
 * a plain string literal. Anything else (an interpolated string, string concatenation, a method
 * call, an unresolved identifier, ...) is reported unresolved, carrying the most informative source
 * text available — the `var` initializer's text when one hop of `var` resolution found one,
 * otherwise the original expression as written — so a reader can see WHY it didn't resolve rather
 * than just an opaque identifier.
 */
function resolveNameExpression(
  argText: string,
  consts: ReadonlyMap<string, string>,
  vars: ReadonlyMap<string, string>,
): NameResolution {
  const trimmed = stripLeadingTrivia(argText).trim();

  const plainStringMatch = trimmed.match(/^"((?:[^"\\]|\\.)*)"$/);
  if (plainStringMatch) return { resolved: true, value: unescapeCSharpString(plainStringMatch[1]) };

  if (/^[A-Za-z_]\w*$/.test(trimmed)) {
    const constValue = consts.get(trimmed);
    if (constValue !== undefined) return { resolved: true, value: constValue };

    const varExpr = vars.get(trimmed);
    if (varExpr !== undefined) {
      const varTrimmed = varExpr.trim();
      const varStringMatch = varTrimmed.match(/^"((?:[^"\\]|\\.)*)"$/);
      if (varStringMatch) return { resolved: true, value: unescapeCSharpString(varStringMatch[1]) };
      return { resolved: false, expression: varTrimmed };
    }
  }

  return { resolved: false, expression: trimmed };
}

interface DocsResolution {
  documented: boolean;
  docsStaticallyResolved: boolean;
  experimental: boolean;
}

/**
 * Every documentation object `ExperimentalMethodDocumentation.Create`/`.Marker`/`.ExistenceMarker`
 * builds hardcodes `Experimental = true` (see that class's own doc comment), so recognising a call
 * to one of them by shape alone — without inspecting its arguments — is exact, not a heuristic
 * guess.
 */
const ALWAYS_EXPERIMENTAL_HELPER_RE =
  /^(ExperimentalMethodDocumentation\.)?(Create|Marker|ExistenceMarker)\s*\(/;

/**
 * Which object shape {@link resolveDocumentationArgument} should expect its argument to unpack to.
 * `'networkObjectStyle'` (the default) is `NetworkObjectDocumentation`'s shape, whose object-level
 * `Experimental` flag sits at the argument's own top level. `'notificationStyle'` is
 * `OpenRpcSingleNotificationDocumentation`'s shape (the `network:registerEvent` idiom's
 * documentation argument), whose object-level flag instead sits nested one level down, under
 * `Notification.Experimental` — mirroring the TypeScript scan's
 * `DOCS_EXPERIMENTAL_PATH.networkEvent = ['notification', 'x-experimental']`. Both shapes can be
 * written as a target-typed `new() { ... }` at the call site, so the caller must say which one it
 * is expecting rather than this function guessing from the text alone.
 */
type DocumentationShape = 'networkObjectStyle' | 'notificationStyle';

/**
 * Resolves a documentation argument/return-expression to its `documented`/experimental status.
 * Recognises the `ExperimentalMethodDocumentation` helper idiom (always experimental, by call
 * shape); a bare identifier referencing a same-file field's own object initializer (one hop, the
 * idiom of keeping a bulky documentation object, e.g. a network event's
 * `OpenRpcSingleNotificationDocumentation`, out of the call site); and an inline object initializer
 * matching `shape` — reading its top-level `Experimental` property for `'networkObjectStyle'`
 * (deliberately not descending into a nested `Methods = { ... }` property, which can itself carry
 * per-method `Experimental` flags that must not be confused with the object-level one; matches this
 * generator's established policy of recording one entry per declared registration, not expanding
 * the per-method fan-out), or the nested `Notification.Experimental` property for
 * `'notificationStyle'`. Anything else (an arbitrary expression, a referenced-but-unrecognised
 * identifier) is reported present-but-uncertain rather than guessed.
 */
function resolveDocumentationArgument(
  argText: string | undefined,
  fields: ReadonlyMap<string, string> = new Map(),
  shape: DocumentationShape = 'networkObjectStyle',
): DocsResolution {
  if (argText === undefined)
    return { documented: false, docsStaticallyResolved: true, experimental: false };

  const trimmed = stripLeadingTrivia(argText).trim();
  if (trimmed === 'null')
    return { documented: false, docsStaticallyResolved: true, experimental: false };

  if (ALWAYS_EXPERIMENTAL_HELPER_RE.test(trimmed)) {
    return { documented: true, docsStaticallyResolved: true, experimental: true };
  }

  if (/^[A-Za-z_]\w*$/.test(trimmed)) {
    const fieldInit = fields.get(trimmed);
    if (fieldInit !== undefined) return resolveDocumentationArgument(fieldInit, fields, shape);
  }

  if (
    shape === 'networkObjectStyle' &&
    (/^new\s+NetworkObjectDocumentation\s*\{/.test(trimmed) || /^new\s*\(\s*\)\s*\{/.test(trimmed))
  ) {
    const braceIndex = trimmed.indexOf('{');
    const match = matchBracket(trimmed, braceIndex);
    if (!match) return { documented: true, docsStaticallyResolved: false, experimental: false };

    const experimentalSegment = match.segments
      .map((segment) => stripLeadingTrivia(segment))
      .find((segment) => /^Experimental\s*=/.test(segment));
    if (!experimentalSegment)
      return { documented: true, docsStaticallyResolved: true, experimental: false };

    const valueMatch = experimentalSegment.match(/^Experimental\s*=\s*(true|false)\s*$/);
    if (!valueMatch)
      return { documented: true, docsStaticallyResolved: false, experimental: false };
    return {
      documented: true,
      docsStaticallyResolved: true,
      experimental: valueMatch[1] === 'true',
    };
  }

  if (
    shape === 'notificationStyle' &&
    (/^new\s+OpenRpcSingleNotificationDocumentation\s*\{/.test(trimmed) ||
      /^new\s*\(\s*\)\s*\{/.test(trimmed))
  ) {
    const braceIndex = trimmed.indexOf('{');
    const match = matchBracket(trimmed, braceIndex);
    if (!match) return { documented: true, docsStaticallyResolved: false, experimental: false };

    const notificationSegment = match.segments
      .map((segment) => stripLeadingTrivia(segment))
      .find((segment) => /^Notification\s*=/.test(segment));
    if (!notificationSegment)
      return { documented: true, docsStaticallyResolved: true, experimental: false };

    const notificationValue = notificationSegment.replace(/^Notification\s*=\s*/, '').trim();
    if (
      !/^new\s+OpenRpcNotificationDocumentation\s*\{/.test(notificationValue) &&
      !/^new\s*\(\s*\)\s*\{/.test(notificationValue)
    ) {
      return { documented: true, docsStaticallyResolved: false, experimental: false };
    }

    const innerBraceIndex = notificationValue.indexOf('{');
    const innerMatch = matchBracket(notificationValue, innerBraceIndex);
    if (!innerMatch)
      return { documented: true, docsStaticallyResolved: false, experimental: false };

    const experimentalSegment = innerMatch.segments
      .map((segment) => stripLeadingTrivia(segment))
      .find((segment) => /^Experimental\s*=/.test(segment));
    if (!experimentalSegment)
      return { documented: true, docsStaticallyResolved: true, experimental: false };

    const valueMatch = experimentalSegment.match(/^Experimental\s*=\s*(true|false)\s*$/);
    if (!valueMatch)
      return { documented: true, docsStaticallyResolved: false, experimental: false };
    return {
      documented: true,
      docsStaticallyResolved: true,
      experimental: valueMatch[1] === 'true',
    };
  }

  return { documented: true, docsStaticallyResolved: false, experimental: false };
}

/**
 * Reads a `documentation` argument out of a call's already-split segments: a named `documentation:
 * ...` argument if present (the breakSyncLock idiom — a trailing named argument after positional
 * ones), otherwise the 4th positional segment (requestType, handler, requestTimeout,
 * documentation).
 */
function getDocsArgText(segments: string[]): string | undefined {
  const named = segments.find((segment) => /^documentation\s*:/.test(segment));
  if (named) return named.replace(/^documentation\s*:\s*/, '').trim();
  return segments[3];
}

// #endregion

// #region Per-file const/var declaration collection

/**
 * Same-file `const string NAME = "literal";` declarations. Structural detection runs against masked
 * text (so a doc comment mentioning a const-looking phrase can't match); the value is then read
 * from the original text at the same position, since `const` values are always plain literals in
 * valid C# (interpolated/concatenated expressions aren't compile-time constants).
 */
function findConstStringDeclarations(text: string, masked: string): Map<string, string> {
  const result = new Map<string, string>();
  // Deliberately no trailing `\s*` after `=`: matched against MASKED text, a trailing `\s*` would
  // also swallow a blanked-out string's now-space-filled span, landing past the real opening quote.
  // Any real whitespace between `=` and the quote is instead matched against the ORIGINAL text below,
  // where it is unambiguous.
  const re = /\bconst\s+string\s+(\w+)\s*=/g;
  let m = re.exec(masked);
  while (m) {
    const valueMatch = text.slice(m.index + m[0].length).match(/^\s*"((?:[^"\\]|\\.)*)"\s*;/);
    if (valueMatch && !result.has(m[1])) result.set(m[1], unescapeCSharpString(valueMatch[1]));
    m = re.exec(masked);
  }
  return result;
}

/**
 * Same-file `var NAME = <expr>;` local declarations, keyed by name with the initializer's raw text
 * as the value (resolved no further here — `resolveNameExpression` decides what to do with it).
 * Only used to make a dynamic registration's recorded expression more informative (e.g. showing
 * `$"platform.{pdpfName}-pdpf"` instead of just the bare local name `name`); never a substitute for
 * genuine literal resolution.
 */
function findVarLocalAssignments(text: string, masked: string): Map<string, string> {
  const result = new Map<string, string>();
  // Deliberately no trailing `\s*` after `=` (see findConstStringDeclarations's comment for why):
  // scanToTopLevelSemicolon below independently walks ORIGINAL text and already skips any real
  // whitespace itself, so nothing further needs to be consumed by this regex.
  const re = /\bvar\s+(\w+)\s*=/g;
  let m = re.exec(masked);
  while (m) {
    const statement = scanToTopLevelSemicolon(text, m.index + m[0].length);
    if (statement && !result.has(m[1])) result.set(m[1], statement.expr);
    m = re.exec(masked);
  }
  return result;
}

/**
 * Same-file field declarations of the form `<modifiers> Type Name = new...;`, keyed by field name
 * with the initializer's raw text (starting at `new`) as the value. This is the idiom a bulky
 * documentation object is kept in — e.g. SendReceiveBlockNotifierService's
 * `s_blockStateChangedEventDocumentation` field — rather than written inline at the call site;
 * `resolveDocumentationArgument` takes one hop through this map when a documentation argument is a
 * bare identifier. Deliberately narrow (only fields whose initializer starts with `new`, found via
 * a lookahead so the match position lands exactly on it): this is not a general field-declaration
 * scanner, and a field initialized to anything else is of no interest here.
 */
function findObjectFieldInitializers(text: string, masked: string): Map<string, string> {
  const result = new Map<string, string>();
  const re =
    /\b(?:private|public|internal|protected)\s+(?:static\s+)?(?:readonly\s+)?\w+\??\s+(\w+)\s*=\s*(?=new\b)/g;
  let m = re.exec(masked);
  while (m) {
    const statement = scanToTopLevelSemicolon(text, m.index + m[0].length);
    if (statement && !result.has(m[1])) result.set(m[1], statement.expr);
    m = re.exec(masked);
  }
  return result;
}

// #endregion

// #region Shape scanners

/**
 * A direct `NetworkObject` subclass's own `RegisterNetworkObjectAsync(name, functions, details,
 * documentation?)` call. Categorised by which file the call lives in: the two framework call sites
 * (`ProjectDataProviderFactory.InitializeAsync`, `DataProvider.RegisterDataProviderAsync`) get
 * their own categories; every other direct subclass's call is a plain "networkObject"
 * registration.
 */
function scanRegisterNetworkObjectAsyncCalls(
  file: VirtualFile,
  masked: string,
  consts: ReadonlyMap<string, string>,
  vars: ReadonlyMap<string, string>,
  registrations: CSharpStaticRegistration[],
  dynamicRegistrations: CSharpDynamicRegistration[],
): void {
  findCallSites(masked, 'RegisterNetworkObjectAsync').forEach((openIndex) => {
    const match = matchBracket(file.text, openIndex);
    if (!match) return;

    let category: CSharpRegistrationCategory;
    let registeredVia: string;
    if (file.path === PDP_FACTORY_FILE) {
      category = 'pdpFactory';
      registeredVia = 'ProjectDataProviderFactory.InitializeAsync';
    } else if (file.path === DATA_PROVIDER_FRAMEWORK_FILE) {
      category = 'dataProvider';
      registeredVia = 'DataProvider.RegisterDataProviderAsync';
    } else {
      category = 'networkObject';
      registeredVia = 'NetworkObject.RegisterNetworkObjectAsync';
    }

    const nameArg = match.segments[0];
    if (nameArg === undefined) return;

    const nameResolution = resolveNameExpression(nameArg, consts, vars);
    if (!nameResolution.resolved) {
      dynamicRegistrations.push({
        category,
        file: file.path,
        registeredVia,
        expression: nameResolution.expression,
        language: 'csharp',
      });
      return;
    }

    const docsInfo = resolveDocumentationArgument(match.segments[3]);
    registrations.push({
      category,
      name: nameResolution.value,
      file: file.path,
      registeredVia,
      documented: docsInfo.documented,
      docsStaticallyResolved: docsInfo.docsStaticallyResolved,
      experimental: docsInfo.experimental,
      language: 'csharp',
    });
  });
}

const PRIMARY_CTOR_DATA_PROVIDER_RE =
  /class\s+\w+\s*\([^()]*\)\s*:\s*(?:NetworkObjects\.)?DataProvider\s*\(/;
const TRADITIONAL_DATA_PROVIDER_RE =
  /class\s+\w+\s*:\s*(?:NetworkObjects\.)?DataProvider\b(?!\s*\()/;
const BASE_CALL_RE = /:\s*base\s*\(/;

/**
 * Fail loudly when a file holds more than one match of a pattern this scanner reads once.
 *
 * Silently taking the first match would drop the second registration from the snapshot with no diff
 * and no error — the exact invisibility this artifact exists to remove.
 */
function assertAtMostOneMatch(
  pattern: RegExp,
  masked: string,
  filePath: string,
  what: string,
): void {
  const all = masked.match(new RegExp(pattern.source, `${pattern.flags.replace('g', '')}g`));
  if (all && all.length > 1)
    throw new Error(
      `${filePath} holds ${all.length} ${what} declarations; this scanner reads one per file. ` +
        `Split the file, or teach the scanner to enumerate them — taking the first would drop the rest silently.`,
    );
}

/**
 * A class extending `DataProvider` directly, whose constructor passes its name to the base
 * constructor — either the primary-constructor form (`class X(...) : DataProvider(name, ...)`) or
 * the traditional form (`class X : DataProvider { X(...) : base(name, ...) {} }`).
 *
 * Scans at most one such class per file. That matches the repo's one-type-per-file convention
 * (`PNX004` in `Paranext.Analyzers`), but the convention is NOT enforced by the build here:
 * `c-sharp/Directory.Build.props` only references the analyzer when `PARANEXT_AI_BRANCH` is set,
 * which happens on `ai/*` branches — the props file describes itself as "effectively a no-op" on
 * every other branch, main included. So a second such class in one file would be a silent
 * misattribution rather than a compile error, and this throws instead of taking the first match.
 */
function scanDataProviderSubclassConstructors(
  file: VirtualFile,
  masked: string,
  consts: ReadonlyMap<string, string>,
  vars: ReadonlyMap<string, string>,
  registrations: CSharpStaticRegistration[],
  dynamicRegistrations: CSharpDynamicRegistration[],
): void {
  assertAtMostOneMatch(PRIMARY_CTOR_DATA_PROVIDER_RE, masked, file.path, 'DataProvider subclass');
  const primaryMatch = PRIMARY_CTOR_DATA_PROVIDER_RE.exec(masked);
  let openIndex: number | undefined;
  if (primaryMatch) {
    openIndex = primaryMatch.index + primaryMatch[0].length - 1;
  } else if (TRADITIONAL_DATA_PROVIDER_RE.test(masked)) {
    const baseMatch = BASE_CALL_RE.exec(masked);
    if (baseMatch) openIndex = baseMatch.index + baseMatch[0].length - 1;
  }
  if (openIndex === undefined) return;

  const match = matchBracket(file.text, openIndex);
  if (!match) return;
  const nameArg = match.segments[0];
  if (nameArg === undefined) return;

  const registeredVia = 'DataProvider(name, papiClient) constructor';
  const nameResolution = resolveNameExpression(nameArg, consts, vars);
  if (!nameResolution.resolved) {
    dynamicRegistrations.push({
      category: 'dataProvider',
      file: file.path,
      registeredVia,
      expression: nameResolution.expression,
      language: 'csharp',
    });
    return;
  }

  // No documentation ever reaches this call site — a DataProvider's documentation, if any, comes
  // from a separate GetNetworkObjectDocumentation() override (see the scanner below), not from its
  // constructor.
  registrations.push({
    category: 'dataProvider',
    name: nameResolution.value,
    file: file.path,
    registeredVia,
    documented: false,
    docsStaticallyResolved: true,
    experimental: false,
    language: 'csharp',
  });
}

const CLASS_NAME_RE = /\bclass\s+(\w+)/;
const GET_NETWORK_OBJECT_DOCUMENTATION_RE =
  /protected\s+override\s+NetworkObjectDocumentation\??\s+GetNetworkObjectDocumentation\s*\(\s*\)\s*(=>|\{)/g;

/**
 * A `protected override NetworkObjectDocumentation GetNetworkObjectDocumentation()` override (the
 * idiom `ParatextProjectDataProvider` uses to mark only some of its projectInterfaces' methods
 * experimental). Recorded under the overriding class's own name (via the one-type-per-file rule),
 * since the provider this documents may itself be dynamically named (e.g. a per-project PDP's
 * runtime-generated id) — the point of this entry is to track the documentation, not the wire
 * name.
 */
function scanGetNetworkObjectDocumentationOverrides(
  file: VirtualFile,
  masked: string,
  registrations: CSharpStaticRegistration[],
): void {
  const classMatch = CLASS_NAME_RE.exec(masked);
  if (!classMatch) return;
  const className = classMatch[1];

  GET_NETWORK_OBJECT_DOCUMENTATION_RE.lastIndex = 0;
  let m = GET_NETWORK_OBJECT_DOCUMENTATION_RE.exec(masked);
  while (m) {
    const isExpressionBodied = m[1] === '=>';
    const bodyStart = m.index + m[0].length;
    let returnExprText: string | undefined;

    if (isExpressionBodied) {
      returnExprText = scanToTopLevelSemicolon(file.text, bodyStart)?.expr;
    } else {
      const block = matchBracket(file.text, bodyStart - 1); // m[0] ends with '{'
      if (block) {
        const returnMatch = /\breturn\s+/.exec(maskCommentsAndStrings(block.inner));
        if (returnMatch) {
          returnExprText = scanToTopLevelSemicolon(
            block.inner,
            returnMatch.index + returnMatch[0].length,
          )?.expr;
        }
      }
    }

    if (returnExprText !== undefined) {
      const docsInfo = resolveDocumentationArgument(returnExprText);
      registrations.push({
        category: 'dataProvider',
        name: className,
        file: file.path,
        registeredVia: 'DataProvider.GetNetworkObjectDocumentation override',
        documented: docsInfo.documented,
        docsStaticallyResolved: docsInfo.docsStaticallyResolved,
        experimental: docsInfo.experimental,
        language: 'csharp',
      });
    }

    m = GET_NETWORK_OBJECT_DOCUMENTATION_RE.exec(masked);
  }
}

/**
 * A `PapiClient.RegisterRequestHandlerAsync(requestType, handler, timeout?, documentation?)` call
 * anywhere other than `NetworkObject`'s own per-function/per-existence-check fan-out (excluded by
 * file so those calls aren't double-counted on top of their owning
 * networkObject/dataProvider/pdpFactory entry — see the module doc comment's "record as declared,
 * do not expand the fan-out" policy).
 */
function scanStandaloneRequestHandlerCalls(
  file: VirtualFile,
  masked: string,
  consts: ReadonlyMap<string, string>,
  vars: ReadonlyMap<string, string>,
  registrations: CSharpStaticRegistration[],
  dynamicRegistrations: CSharpDynamicRegistration[],
): void {
  if (file.path === NETWORK_OBJECT_FRAMEWORK_FILE) return;

  findCallSites(masked, 'RegisterRequestHandlerAsync').forEach((openIndex) => {
    const match = matchBracket(file.text, openIndex);
    if (!match) return;

    const nameArg = match.segments[0];
    if (nameArg === undefined) return;

    const registeredVia = 'PapiClient.RegisterRequestHandlerAsync';
    const nameResolution = resolveNameExpression(nameArg, consts, vars);
    if (!nameResolution.resolved) {
      dynamicRegistrations.push({
        category: 'standaloneMethod',
        file: file.path,
        registeredVia,
        expression: nameResolution.expression,
        language: 'csharp',
      });
      return;
    }

    const docsInfo = resolveDocumentationArgument(getDocsArgText(match.segments));
    registrations.push({
      category: 'standaloneMethod',
      name: nameResolution.value,
      file: file.path,
      registeredVia,
      documented: docsInfo.documented,
      docsStaticallyResolved: docsInfo.docsStaticallyResolved,
      experimental: docsInfo.experimental,
      language: 'csharp',
    });
  });
}

/**
 * Wire name of the main-process method that registers a network event (see `rpc.model.ts`'s
 * `REGISTER_EVENT`).
 */
const NETWORK_REGISTER_EVENT_METHOD = 'network:registerEvent';

/**
 * `PapiClient.SendRequestAsync(requestType, requestContents)` — generic-typed
 * (`SendRequestAsync<T>`) or not — where `requestType` resolves to the literal
 * `network:registerEvent`: the generic request method used to register a network event directly,
 * since `PapiClient` has no dedicated wrapper for it the way it does for
 * `RegisterRequestHandlerAsync`/`RegisterNetworkObjectAsync`. `SendRequestAsync` itself serves many
 * unrelated requests (settings, notifications, ...), so every call site is inspected and only the
 * ones addressed to this exact method are recorded. The event name and its documentation are packed
 * inside the second argument's array literal (`[eventType, documentation]`) rather than passed as
 * separate positional parameters, so this scanner parses that array literal's own top-level
 * segments (via `matchBracket`, same as any other bracketed argument list) to recover them.
 */
function scanNetworkEventRegistrationCalls(
  file: VirtualFile,
  masked: string,
  consts: ReadonlyMap<string, string>,
  vars: ReadonlyMap<string, string>,
  fields: ReadonlyMap<string, string>,
  registrations: CSharpStaticRegistration[],
  dynamicRegistrations: CSharpDynamicRegistration[],
): void {
  const registeredVia = 'PapiClient.SendRequestAsync("network:registerEvent")';

  findCallSites(masked, 'SendRequestAsync', { allowGenericArgs: true }).forEach((openIndex) => {
    const match = matchBracket(file.text, openIndex);
    if (!match) return;

    const methodArg = match.segments[0];
    if (methodArg === undefined) return;
    const methodResolution = resolveNameExpression(methodArg, consts, vars);
    if (!methodResolution.resolved || methodResolution.value !== NETWORK_REGISTER_EVENT_METHOD) {
      return; // SendRequestAsync serves many other requests -- only network:registerEvent applies here
    }

    const contentsArg = match.segments[1];
    const contentsText =
      contentsArg === undefined ? undefined : stripLeadingTrivia(contentsArg).trim();
    if (contentsText === undefined || !contentsText.startsWith('[')) {
      dynamicRegistrations.push({
        category: 'networkEvent',
        file: file.path,
        registeredVia,
        expression: contentsText ?? '(missing request-contents argument)',
        language: 'csharp',
      });
      return;
    }

    const arrayMatch = matchBracket(contentsText, 0);
    if (!arrayMatch) return;

    const eventNameArg = arrayMatch.segments[0];
    if (eventNameArg === undefined) return;
    const nameResolution = resolveNameExpression(eventNameArg, consts, vars);
    if (!nameResolution.resolved) {
      dynamicRegistrations.push({
        category: 'networkEvent',
        file: file.path,
        registeredVia,
        expression: nameResolution.expression,
        language: 'csharp',
      });
      return;
    }

    const docsInfo = resolveDocumentationArgument(
      arrayMatch.segments[1],
      fields,
      'notificationStyle',
    );
    registrations.push({
      category: 'networkEvent',
      name: nameResolution.value,
      file: file.path,
      registeredVia,
      documented: docsInfo.documented,
      docsStaticallyResolved: docsInfo.docsStaticallyResolved,
      experimental: docsInfo.experimental,
      language: 'csharp',
    });
  });
}

// #endregion

// #region Orchestration

function compareCSharpStatic(a: CSharpStaticRegistration, b: CSharpStaticRegistration): number {
  return (
    compareCodeUnits(a.category, b.category) ||
    compareCodeUnits(a.name, b.name) ||
    compareCodeUnits(a.file, b.file)
  );
}

function compareCSharpDynamic(a: CSharpDynamicRegistration, b: CSharpDynamicRegistration): number {
  return (
    compareCodeUnits(a.category, b.category) ||
    compareCodeUnits(a.file, b.file) ||
    compareCodeUnits(a.expression, b.expression)
  );
}

/** Scans the given C# files and returns every recognised registration, deterministically ordered. */
export function scanCSharpFiles(files: VirtualFile[]): CSharpScanResult {
  const registrations: CSharpStaticRegistration[] = [];
  const dynamicRegistrations: CSharpDynamicRegistration[] = [];

  files.forEach((file) => {
    const masked = maskCommentsAndStrings(file.text);
    const consts = findConstStringDeclarations(file.text, masked);
    const vars = findVarLocalAssignments(file.text, masked);
    const fields = findObjectFieldInitializers(file.text, masked);

    scanRegisterNetworkObjectAsyncCalls(
      file,
      masked,
      consts,
      vars,
      registrations,
      dynamicRegistrations,
    );
    scanDataProviderSubclassConstructors(
      file,
      masked,
      consts,
      vars,
      registrations,
      dynamicRegistrations,
    );
    scanGetNetworkObjectDocumentationOverrides(file, masked, registrations);
    scanStandaloneRequestHandlerCalls(
      file,
      masked,
      consts,
      vars,
      registrations,
      dynamicRegistrations,
    );
    scanNetworkEventRegistrationCalls(
      file,
      masked,
      consts,
      vars,
      fields,
      registrations,
      dynamicRegistrations,
    );
  });

  registrations.sort(compareCSharpStatic);
  dynamicRegistrations.sort(compareCSharpDynamic);
  return { registrations, dynamicRegistrations };
}

// #endregion
