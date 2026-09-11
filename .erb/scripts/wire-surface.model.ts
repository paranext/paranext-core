/**
 * Shared shapes for the C# half of the wire surface, produced by the Roslyn-based
 * `Paranext.WireSurface` scanner (`c-sharp/Paranext.WireSurface`) and consumed by
 * `generate-wire-surface.util.ts`. Kept in their own module — rather than alongside the scanner
 * invocation in `run-wire-surface-scanner.ts`, or inline in `generate-wire-surface.util.ts` — so
 * both of those can import the types and the runtime guard without a circular dependency between
 * "how the C# scan result is obtained" and "what the C# scan result looks like once merged".
 */

// #region Types

/** One of the wire-visible C# registration shapes the Roslyn scanner recognises. */
export type CSharpRegistrationCategory =
  | 'networkObject'
  | 'dataProvider'
  | 'pdpFactory'
  | 'standaloneMethod'
  | 'networkEvent';

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
   * Whether the documentation (when `documented`) resolved to a shape the scanner could inspect for
   * `Experimental`. `false` means the experimental status below is not authoritative.
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
  /** Source text of the name expression as written at the declaration site, whitespace-collapsed. */
  expression: string;
  language: 'csharp';
}

/** The `{ registrations, dynamicRegistrations }` JSON the Roslyn scanner CLI writes. */
export interface CSharpScanResult {
  registrations: CSharpStaticRegistration[];
  dynamicRegistrations: CSharpDynamicRegistration[];
}

// #endregion

// #region Ordering

/**
 * Order two strings by UTF-16 code unit.
 *
 * Deliberately not `localeCompare`: without an explicit locale that consults the host's locale and
 * ICU build, so the same input sorts differently on different platforms. This artifact is
 * regenerated on Linux, macOS and Windows and compared byte for byte, so the ordering has to come
 * from the strings alone. The Roslyn scanner sorts its own output with the equivalent
 * `string.CompareOrdinal`, so a JSON document merged from both halves needs no re-sort of either
 * half's internal order — only the merge itself is re-sorted.
 */
export function compareCodeUnits(a: string, b: string): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

// #endregion

// #region Runtime validation

const CSHARP_REGISTRATION_CATEGORIES: ReadonlySet<string> = new Set<CSharpRegistrationCategory>([
  'networkObject',
  'dataProvider',
  'pdpFactory',
  'standaloneMethod',
  'networkEvent',
]);

function isCSharpRegistrationCategory(value: unknown): value is CSharpRegistrationCategory {
  return typeof value === 'string' && CSHARP_REGISTRATION_CATEGORIES.has(value);
}

function isCSharpStaticRegistration(value: unknown): value is CSharpStaticRegistration {
  return (
    typeof value === 'object' &&
    // Testing null explicitly, since typeof null === 'object'.
    // eslint-disable-next-line no-null/no-null
    value !== null &&
    'category' in value &&
    'name' in value &&
    'file' in value &&
    'registeredVia' in value &&
    'documented' in value &&
    'docsStaticallyResolved' in value &&
    'experimental' in value &&
    'language' in value &&
    isCSharpRegistrationCategory(value.category) &&
    typeof value.name === 'string' &&
    typeof value.file === 'string' &&
    typeof value.registeredVia === 'string' &&
    typeof value.documented === 'boolean' &&
    typeof value.docsStaticallyResolved === 'boolean' &&
    typeof value.experimental === 'boolean' &&
    value.language === 'csharp'
  );
}

function isCSharpDynamicRegistration(value: unknown): value is CSharpDynamicRegistration {
  return (
    typeof value === 'object' &&
    // Testing null explicitly, since typeof null === 'object'.
    // eslint-disable-next-line no-null/no-null
    value !== null &&
    'category' in value &&
    'file' in value &&
    'registeredVia' in value &&
    'expression' in value &&
    'language' in value &&
    isCSharpRegistrationCategory(value.category) &&
    typeof value.file === 'string' &&
    typeof value.registeredVia === 'string' &&
    typeof value.expression === 'string' &&
    value.language === 'csharp'
  );
}

/**
 * Structurally validates that `value` is a well-formed `CSharpScanResult` — every field present
 * with the right type, `language` the literal `'csharp'` on every entry — without ever asserting
 * the shape with `as`. The scan result crosses a process boundary (the Roslyn scanner's
 * stdout-adjacent JSON file, read by `run-wire-surface-scanner.ts`), so a shape mismatch there (a
 * renamed field, a tool built against a stale contract) must fail loudly here rather than propagate
 * a `TypeError`-in-waiting deep into `generateWireSurfaceDocument`.
 */
export function isCSharpScanResult(value: unknown): value is CSharpScanResult {
  return (
    typeof value === 'object' &&
    // Testing null explicitly, since typeof null === 'object'.
    // eslint-disable-next-line no-null/no-null
    value !== null &&
    'registrations' in value &&
    'dynamicRegistrations' in value &&
    Array.isArray(value.registrations) &&
    value.registrations.every(isCSharpStaticRegistration) &&
    Array.isArray(value.dynamicRegistrations) &&
    value.dynamicRegistrations.every(isCSharpDynamicRegistration)
  );
}

// #endregion
