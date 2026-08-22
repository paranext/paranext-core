const parse = require('spdx-expression-parse');
const correct = require('spdx-correct');
const spdxLicenseIds = require('spdx-license-ids');
const deprecatedSpdxLicenseIds = require('spdx-license-ids/deprecated.json');

/**
 * Every identifier SPDX publishes, DEPRECATED ONES INCLUDED.
 *
 * `spdx-license-ids`' main export is the current list only, so the deprecated spellings of the
 * copyleft licenses - `GPL-3.0`, `AGPL-3.0`, `GPL-2.0`, `LGPL-2.1`, `LGPL-3.0`, which `policy.js`'s
 * own `normalizeDetectedId` documents as still in wide circulation - were absent from it. A package
 * declaring plain `AGPL-3.0` therefore came back `hasNonGrantDisjunct: true` and blocked as "a
 * disjunct that is not a grant we can verify", which says nothing about copyleft and is the wrong
 * diagnosis on the single most important input this gate has; worse, the remedy `report.js` prints
 * for it ("add that identifier to `allowed`") could never clear it, because `hasNonGrantDisjunct`
 * is checked BEFORE the allow list. Deprecated ids are real grants whose terms are known - what
 * they are not is current spelling, which `canonicalId` below fixes.
 */
const KNOWN_IDS = new Set([...spdxLicenseIds, ...deprecatedSpdxLicenseIds]);

/**
 * A declared identifier in its current SPDX spelling.
 *
 * The same normalization `policy.js` applies to every DETECTED id, applied to the declared one for
 * the same reasons: the policy's `allowed`/`copyleft` lists use current ids, and comparing a
 * declared `GPL-3.0` against a detected (already normalized) `GPL-3.0-or-later` reads as a
 * disagreement between the two signals when they in fact agree. `spdx-correct` returns a
 * library-internal sentinel it cannot correct rather than an empty string, so a falsy check keeps
 * the operand as declared - `hasNonGrantDisjunct` has already flagged that case.
 */
function canonicalId(id) {
  return correct(id) || id;
}

/** Walks a parsed SPDX AST, collecting every license operand. */
function collect(node, out) {
  if (node.license) {
    out.push(node);
    return;
  }
  if (node.left) collect(node.left, out);
  if (node.right) collect(node.right, out);
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
function hasConjunction(node) {
  if (node.license) return false;
  if (node.conjunction === 'and') return true;
  return hasConjunction(node.left) || hasConjunction(node.right);
}

/**
 * Parses and validates a package's declared `license` field.
 *
 * Replaces a hand-rolled recursive-descent parser that overflowed the stack on deeply nested input
 * and let two classes of malformed expression through as permissive verdicts.
 * `spdx-expression-parse` is the parser npm itself uses and was already installed in this tree.
 *
 * @param {string | undefined} field
 * @returns {{
 *       ok: true;
 *       expression: string;
 *       ids: string[];
 *       exceptions: string[];
 *       hasNonGrantDisjunct: boolean;
 *       hasConjunction: boolean;
 *     }
 *   | { ok: false; reason: string }}
 */
function parseDeclared(field) {
  if (!field || !field.trim()) return { ok: false, reason: 'no license declared' };

  let ast;
  try {
    ast = parse(field);
  } catch {
    // Covers UNLICENSED, "SEE LICENSE IN ...", truncated expressions and unbalanced parens alike.
    // All of them mean the same thing here: we cannot establish terms from the declaration.
    return { ok: false, reason: 'not an SPDX expression' };
  }

  const operands = [];
  collect(ast, operands);

  return {
    ok: true,
    expression: field,
    ids: operands.map((node) => canonicalId(node.license)),
    // An SPDX `WITH` operand names a license EXCEPTION - `Apache-2.0 WITH LLVM-exception`,
    // `GPL-2.0-only WITH Classpath-exception-2.0`. Flattening to `ids` discarded it silently, so
    // such a package resolved on its base identifier alone: the verdict, the lock and the
    // reproduced canonical text all described the UNMODIFIED license, and the exception - the part
    // that changes what the grant actually says - appeared nowhere in the artifact. Kept here so
    // `policy.js` can refuse to resolve one automatically; the SPDX corpus this pipeline reproduces
    // from holds license texts only, so there is no text for an exception to reproduce.
    exceptions: operands.map((node) => node.exception).filter(Boolean),
    // A LicenseRef-* operand names terms that live outside the SPDX list - typically a commercial
    // offer. It is a grant we cannot verify we hold, so it can never be auto-elected.
    hasNonGrantDisjunct: operands.some(
      (node) => node.license.startsWith('LicenseRef-') || !KNOWN_IDS.has(node.license),
    ),
    hasConjunction: hasConjunction(ast),
  };
}

module.exports = { parseDeclared };
