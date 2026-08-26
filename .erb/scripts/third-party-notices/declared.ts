// The SPDX packages ship no type declarations; `spdx-modules.d.ts` supplies them, deliberately no
// wider than this pipeline uses.
import parse from 'spdx-expression-parse';
import type { SpdxAstNode, SpdxLicenseNode } from 'spdx-expression-parse';
import correct from 'spdx-correct';
import spdxLicenseIds from 'spdx-license-ids';
import deprecatedSpdxLicenseIds from 'spdx-license-ids/deprecated.json';

/**
 * Every identifier SPDX publishes, DEPRECATED ONES INCLUDED.
 *
 * `spdx-license-ids`' main export is the current list only, so the deprecated spellings of the
 * copyleft licenses - `GPL-3.0`, `AGPL-3.0`, `GPL-2.0`, `LGPL-2.1`, `LGPL-3.0`, which `policy.ts`'s
 * own `normalizeDetectedId` documents as still in wide circulation - were absent from it. A package
 * declaring plain `AGPL-3.0` therefore came back `hasNonGrantDisjunct: true` and blocked as "a
 * disjunct that is not a grant we can verify", which says nothing about copyleft and is the wrong
 * diagnosis on the single most important input this gate has; worse, the remedy `report.ts` prints
 * for it ("add that identifier to `allowed`") could never clear it, because `hasNonGrantDisjunct`
 * is checked BEFORE the allow list. Deprecated ids are real grants whose terms are known - what
 * they are not is current spelling, which `canonicalId` below fixes.
 */
const KNOWN_IDS = new Set([...spdxLicenseIds, ...deprecatedSpdxLicenseIds]);

/** A package's declared `license` field, parsed - or the reason it could not be. */
export type ParsedDeclaration =
  | {
      ok: true;
      ids: string[];
      exceptions: string[];
      unrepresentablePlus: string[];
      hasNonGrantDisjunct: boolean;
      hasConjunction: boolean;
    }
  | { ok: false; reason: string };

/**
 * A declared identifier in its current SPDX spelling.
 *
 * The same normalization `policy.ts` applies to every DETECTED id, applied to the declared one for
 * the same reasons: the policy's `allowed`/`copyleft` lists use current ids, and comparing a
 * declared `GPL-3.0` against a detected (already normalized) `GPL-3.0-or-later` reads as a
 * disagreement between the two signals when they in fact agree. `spdx-correct` returns a
 * library-internal sentinel it cannot correct rather than an empty string, so a falsy check keeps
 * the operand as declared - `hasNonGrantDisjunct` has already flagged that case.
 */
function canonicalId(id: string): string {
  return correct(id) || id;
}

/**
 * The identifier an operand's `+` actually names, or `undefined` when SPDX has no way to say it.
 *
 * `+` means "this version of the licence, or any later one". `spdx-expression-parse` reports it as
 * a separate `plus` flag, and reading only `node.license` discarded it - after which `spdx-correct`
 * mapped the bare id to the `-only` spelling, which is the OPPOSITE grant. A package declaring
 * `GPL-2.0+` was recorded, rendered and locked as `GPL-2.0-only`: strictly narrower terms than the
 * package offers, asserted in a legal document.
 *
 * Where an `-or-later` identifier exists, that is exactly what `+` means and the operand resolves
 * to it. Where none exists - `Apache-2.0+` is the shape, since SPDX publishes no
 * `Apache-2.0-or-later` - there is no identifier that says what the package said, so this answers
 * `undefined` and `parseDeclared` records the operand as unrepresentable rather than quietly
 * resolving on the base id. That is the same treatment `exceptions` gets, for the same reason: the
 * part that changes what the grant says must not vanish.
 *
 * @param id A canonical identifier, as `canonicalId` returns.
 */
function orLaterId(id: string): string | undefined {
  // Already an "or later" grant - `spdx-correct` maps some bare ids straight to it - so the `+` is
  // expressed and adds nothing. Without this, `GPL-3.0+` reads as unrepresentable while resolving
  // perfectly well, which would block a package over a `+` the identifier already carries.
  if (id.endsWith('-or-later')) return id;
  const orLater = id.endsWith('-only') ? id.replace(/-only$/, '-or-later') : `${id}-or-later`;
  return KNOWN_IDS.has(orLater) ? orLater : undefined;
}

/** One operand's identifier, with its `+` applied. */
function operandId(node: SpdxLicenseNode): string {
  const base = canonicalId(node.license);
  return node.plus ? (orLaterId(base) ?? base) : base;
}

/** Walks a parsed SPDX AST, collecting every license operand. */
function collect(node: SpdxAstNode, out: SpdxLicenseNode[]): void {
  if ('license' in node) {
    out.push(node);
    return;
  }
  collect(node.left, out);
  collect(node.right, out);
}

/**
 * Walks a parsed SPDX AST looking for an `AND` conjunction anywhere in the tree, including nested
 * under an `OR` (e.g. `(MIT AND MPL-2.0) OR Apache-2.0`). An `AND` means every operand's terms
 * apply simultaneously - there is no branch to elect, unlike an `OR` disjunction - so a caller must
 * not route a conjunction into logic meant for resolving a choice. `ids` alone cannot distinguish
 * the two: flattening the tree (see `collect`) discards the operator, so `ids.length > 1` is true
 * for both `MIT OR GPL-3.0-or-later` (a real choice) and `MIT AND GPL-3.0-or-later` (no choice at
 * all - both obligations apply).
 */
function hasConjunction(node: SpdxAstNode): boolean {
  if ('license' in node) return false;
  if (node.conjunction === 'and') return true;
  return hasConjunction(node.left) || hasConjunction(node.right);
}

/**
 * Parses and validates a package's declared `license` field.
 *
 * Replaces a hand-rolled recursive-descent parser that overflowed the stack on deeply nested input
 * and let two classes of malformed expression through as permissive verdicts.
 * `spdx-expression-parse` is the parser npm itself uses and was already installed in this tree.
 */
export function parseDeclared(field: string | undefined): ParsedDeclaration {
  if (!field || !field.trim()) return { ok: false, reason: 'no license declared' };

  let ast: SpdxAstNode;
  try {
    ast = parse(field);
  } catch {
    // Covers UNLICENSED, "SEE LICENSE IN ...", truncated expressions and unbalanced parens alike.
    // All of them mean the same thing here: we cannot establish terms from the declaration.
    return { ok: false, reason: 'not an SPDX expression' };
  }

  const operands: SpdxLicenseNode[] = [];
  collect(ast, operands);

  return {
    ok: true,
    ids: operands.map(operandId),
    // An SPDX `WITH` operand names a license EXCEPTION - `Apache-2.0 WITH LLVM-exception`,
    // `GPL-2.0-only WITH Classpath-exception-2.0`. Flattening to `ids` discarded it silently, so
    // such a package resolved on its base identifier alone: the verdict, the lock and the
    // reproduced canonical text all described the UNMODIFIED license, and the exception - the part
    // that changes what the grant actually says - appeared nowhere in the artifact. Kept here so
    // `policy.ts` can refuse to resolve one automatically; the SPDX corpus this pipeline reproduces
    // from holds license texts only, so there is no text for an exception to reproduce.
    // `flatMap` rather than `.map().filter(Boolean)`: the latter leaves the element type
    // `string | undefined`, since `Boolean` is not a type predicate - and this repo bans the type
    // assertion that would otherwise paper over it.
    exceptions: operands.flatMap((node) => (node.exception ? [node.exception] : [])),
    // Operands whose `+` SPDX cannot express - see `orLaterId`. Kept so `policy.ts` can refuse to
    // resolve one rather than record terms narrower than the package offers.
    unrepresentablePlus: operands
      .filter((node) => node.plus && !orLaterId(canonicalId(node.license)))
      .map((node) => `${node.license}+`),
    // A LicenseRef-* operand names terms that live outside the SPDX list - typically a commercial
    // offer. It is a grant we cannot verify we hold, so it can never be auto-elected.
    hasNonGrantDisjunct: operands.some(
      (node) => node.license.startsWith('LicenseRef-') || !KNOWN_IDS.has(node.license),
    ),
    hasConjunction: hasConjunction(ast),
  };
}
