/**
 * Declarations for the SPDX packages this pipeline depends on that ship no types of their own.
 * `spdx-license-list` is not among them - it bundles `full.d.ts`, so declaring it here would only
 * shadow the package's own shape with a copy free to drift from it.
 *
 * Without these, `checkJs` reports each `require` as an implicit `any` - and an `any` at the
 * boundary spreads: every parsed expression and every corrected identifier downstream inherits it,
 * which is exactly the checking this gate exists to add. Each shape is only as wide as this
 * pipeline actually uses, so a wrong assumption surfaces here rather than being hidden behind a
 * permissive declaration.
 */

declare module 'spdx-expression-parse' {
  /** Throws for anything that is not a valid SPDX expression. */
  function parse(expression: string): parse.SpdxAstNode;

  // The types hang off the function's own namespace: a module using `export =` cannot also carry
  // named exports (TS2309), and this package's single export IS the function.
  namespace parse {
    /** One operand of an expression: a license identifier, with any `+` or `WITH` it carries. */
    export type SpdxLicenseNode = {
      license: string;
      /** The `+` operator - "this version or later". */
      plus?: boolean;
      /** The right-hand side of a `WITH`, naming a license exception. */
      exception?: string;
    };

    /** An `AND`/`OR` node joining two subtrees. */
    export type SpdxOperatorNode = {
      conjunction: 'and' | 'or';
      left: SpdxAstNode;
      right: SpdxAstNode;
    };

    export type SpdxAstNode = SpdxLicenseNode | SpdxOperatorNode;
  }

  export = parse;
}

declare module 'spdx-correct' {
  /** Returns the corrected identifier, or `null` for anything it cannot recognize. */
  function correct(id: string): string | null;
  export = correct;
}

declare module 'spdx-license-ids' {
  /** Every current SPDX identifier. */
  const ids: string[];
  export = ids;
}

declare module 'spdx-license-ids/deprecated.json' {
  /** Every deprecated SPDX identifier - still in wide circulation, see `declared.ts`. */
  const ids: string[];
  export = ids;
}
