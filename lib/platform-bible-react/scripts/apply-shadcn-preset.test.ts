import { describe, expect, it } from 'vitest';
import {
  addLightSelector,
  applyClassesAreEquivalent,
  fixImportQuotes,
  normalizeScopedSelector,
  processLayerBase,
  removeLightSelector,
  restoreImportQuotes,
} from './apply-shadcn-preset';

describe('fixImportQuotes / restoreImportQuotes', () => {
  it('converts single quotes to double quotes only on @import lines', () => {
    const input = `@import 'foo.css';\n.bar { content: 'baz'; }\n@import 'qux.css';\n`;
    const expected = `@import "foo.css";\n.bar { content: 'baz'; }\n@import "qux.css";\n`;
    expect(fixImportQuotes(input)).toBe(expected);
  });

  it('handles indented @import lines', () => {
    const input = `  @import 'foo.css';`;
    expect(fixImportQuotes(input)).toBe(`  @import "foo.css";`);
  });

  it('leaves CSS without @import lines unchanged', () => {
    const input = `.bar { content: 'baz'; }\n.qux { color: red; }\n`;
    expect(fixImportQuotes(input)).toBe(input);
  });

  it('round-trips through fix → restore', () => {
    const input = `@import 'foo.css';\n.bar { content: 'baz'; }\n@import 'qux.css';\n`;
    expect(restoreImportQuotes(fixImportQuotes(input))).toBe(input);
  });

  it('restoreImportQuotes only touches @import lines', () => {
    const input = `@import "foo.css";\n.bar { content: "baz"; }\n`;
    const expected = `@import 'foo.css';\n.bar { content: "baz"; }\n`;
    expect(restoreImportQuotes(input)).toBe(expected);
  });
});

describe('removeLightSelector / addLightSelector', () => {
  it('removes `.light,` line directly above `:root {`', () => {
    const input = `@import "foo";\n.light,\n:root {\n  --foo: 1;\n}\n`;
    const expected = `@import "foo";\n:root {\n  --foo: 1;\n}\n`;
    expect(removeLightSelector(input)).toBe(expected);
  });

  it('removes `.light,` even when blank lines separate it from `:root {`', () => {
    const input = `.light,\n\n\n:root {\n  --foo: 1;\n}\n`;
    const expected = `\n\n:root {\n  --foo: 1;\n}\n`;
    expect(removeLightSelector(input)).toBe(expected);
  });

  it('does NOT remove `.light,` when it is not above `:root`', () => {
    const input = `.light,\n.dark {\n  --foo: 1;\n}\n`;
    expect(removeLightSelector(input)).toBe(input);
  });

  it('addLightSelector inserts `.light,` directly above the first `:root {`', () => {
    const input = `:root {\n  --foo: 1;\n}\n`;
    const expected = `.light,\n:root {\n  --foo: 1;\n}\n`;
    expect(addLightSelector(input)).toBe(expected);
  });

  it('addLightSelector skips multi-selector `:root,` rules', () => {
    const input = `:root,\nhtml {\n  --foo: 1;\n}\n:root {\n  --bar: 2;\n}\n`;
    // Should add .light, above the second `:root {` (single-selector with brace), not the first
    const expected = `:root,\nhtml {\n  --foo: 1;\n}\n.light,\n:root {\n  --bar: 2;\n}\n`;
    expect(addLightSelector(input)).toBe(expected);
  });

  it('addLightSelector only adds `.light,` once even when multiple `:root {` blocks exist', () => {
    const input = `:root {\n  --a: 1;\n}\n:root {\n  --b: 2;\n}\n`;
    const expected = `.light,\n:root {\n  --a: 1;\n}\n:root {\n  --b: 2;\n}\n`;
    expect(addLightSelector(input)).toBe(expected);
  });

  it('round-trips through remove → add for the canonical shape', () => {
    const input = `@import "foo";\n.light,\n:root {\n  --x: 1;\n}\n`;
    expect(addLightSelector(removeLightSelector(input))).toBe(input);
  });
});

describe('normalizeScopedSelector', () => {
  it('normalizes the [".pr-twp", ".pr-twp *"] pair to "*"', () => {
    expect(normalizeScopedSelector('.pr-twp, .pr-twp *')).toBe('*');
  });

  it('strips trailing `.pr-twp` from a single selector', () => {
    expect(normalizeScopedSelector('body.pr-twp')).toBe('body');
    expect(normalizeScopedSelector('html.pr-twp')).toBe('html');
  });

  it('strips leading `.pr-twp ` from a single selector', () => {
    expect(normalizeScopedSelector('.pr-twp body')).toBe('body');
  });

  it('returns "*" for a bare ".pr-twp"', () => {
    expect(normalizeScopedSelector('.pr-twp')).toBe('*');
  });

  it('preserves multi-selector lists by stripping each part', () => {
    expect(normalizeScopedSelector('body.pr-twp, html.pr-twp')).toBe('body, html');
  });
});

describe('applyClassesAreEquivalent', () => {
  it('returns true when scoped classes are tw:-prefixed equivalents in the same order', () => {
    expect(applyClassesAreEquivalent(['tw:p-4', 'tw:m-2'], ['p-4', 'm-2'])).toBe(true);
  });

  it('returns false when class counts differ', () => {
    expect(applyClassesAreEquivalent(['tw:p-4'], ['p-4', 'm-2'])).toBe(false);
  });

  it('returns false when order differs', () => {
    expect(applyClassesAreEquivalent(['tw:m-2', 'tw:p-4'], ['p-4', 'm-2'])).toBe(false);
  });

  it('returns false when prefix is missing on a scoped class', () => {
    expect(applyClassesAreEquivalent(['p-4'], ['p-4'])).toBe(false);
  });

  it('returns true for empty class lists', () => {
    expect(applyClassesAreEquivalent([], [])).toBe(true);
  });
});

describe('processLayerBase', () => {
  it('returns the input unchanged when there is no @layer base block', () => {
    const input = `:root { --a: 1; }\n@theme { --b: 2; }\n`;
    expect(processLayerBase(input)).toBe(input);
  });

  it('returns the input unchanged when @layer base has only scoped rules', () => {
    const input = `@layer base {\n  body.pr-twp {\n    @apply tw:p-4;\n  }\n}\n`;
    expect(processLayerBase(input)).toBe(input);
  });

  it('removes the unscoped twin rules added by shadcn when each pair matches', () => {
    const input = `@layer base {
  body.pr-twp {
    @apply tw:p-4;
  }
  html.pr-twp {
    @apply tw:m-2;
  }
  body {
    @apply p-4;
  }
  html {
    @apply m-2;
  }
}
`;
    const result = processLayerBase(input);
    expect(result).toContain('body.pr-twp');
    expect(result).toContain('html.pr-twp');
    expect(result).not.toMatch(/^\s*body\s*\{/m);
    expect(result).not.toMatch(/^\s*html\s*\{/m);
    expect(result).not.toMatch(/@apply\s+p-4\s*;\s*\n\s*\}/);
    expect(result).not.toMatch(/@apply\s+m-2\s*;\s*\n\s*\}/);
  });

  it('throws when the unscoped rule count does not match the scoped rule count', () => {
    const input = `@layer base {
  body.pr-twp {
    @apply tw:p-4;
  }
  body {
    @apply p-4;
  }
  html {
    @apply m-2;
  }
}
`;
    expect(() => processLayerBase(input)).toThrow(/expected counts to match/i);
  });

  it('throws when scoped/unscoped @apply classes do not correspond', () => {
    const input = `@layer base {
  body.pr-twp {
    @apply tw:p-4;
  }
  body {
    @apply m-2;
  }
}
`;
    expect(() => processLayerBase(input)).toThrow(
      /expected scoped classes to be the tw:-prefixed/i,
    );
  });

  it('throws when scoped/unscoped selectors do not correspond after normalization', () => {
    const input = `@layer base {
  body.pr-twp {
    @apply tw:p-4;
  }
  html {
    @apply p-4;
  }
}
`;
    expect(() => processLayerBase(input)).toThrow(/does not correspond to unscoped rule/i);
  });
});

/**
 * End-to-end fixture tests that exercise the full pipeline:
 *
 * 1. Preprocess `index.css` (the real `main()` first writes `fixImportQuotes(removeLightSelector(css))`
 *    to disk so shadcn sees `:root { ... }` with double-quoted `@import`s).
 * 2. Simulate what `npx shadcn apply --preset` does: shadcn does not modify single-quoted-vs-double
 *    imports we already fixed, but it appends unscoped `@layer base` rules that mirror our scoped
 *    `.pr-twp`-scoped rules. We hand-craft a "post-shadcn" version of the CSS to model that.
 * 3. Postprocess (`processLayerBase` → `restoreImportQuotes` → `addLightSelector`) and assert the
 *    final CSS matches the original input. This is the round-trip-safety guarantee that the helper
 *    pipeline must provide regardless of whether shadcn ran successfully or not.
 *
 * These tests do NOT shell out to `npx shadcn apply` — that would require network, a published
 * preset, and writeable disk. They model shadcn's deterministic effects on `index.css` directly.
 */
describe('apply-shadcn-preset CSS pipeline (end-to-end)', () => {
  /**
   * Realistic minimal `index.css` shape: single-quoted `@import` lines, the `.light, :root {`
   * compound selector, an `@theme inline { }` block, and a `@layer base { }` block with two
   * `.pr-twp`-scoped rules.
   */
  const ORIGINAL_CSS = `@import 'tailwindcss' prefix(tw);
@import 'tw-animate-css';

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

.light,
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.1 0 0);
}

.dark {
  --background: oklch(0.1 0 0);
  --foreground: oklch(1 0 0);
}

@layer base {
  .pr-twp,
  .pr-twp * {
    @apply tw:border-border tw:outline-ring/50;
  }
  body.pr-twp {
    @apply tw:bg-background tw:text-foreground;
  }
}
`;

  /** Pipeline that mirrors `main()`'s CSS handling without disk I/O, git, or network. */
  function preprocess(css: string): string {
    return removeLightSelector(fixImportQuotes(css));
  }
  function postprocess(css: string): string {
    return addLightSelector(restoreImportQuotes(processLayerBase(css)));
  }

  it('round-trips the canonical pipeline when shadcn appends matching unscoped rules', () => {
    const preprocessed = preprocess(ORIGINAL_CSS);

    // The preprocessed CSS must have:
    // - double-quoted imports
    // - no `.light,` line
    // - everything else unchanged
    expect(preprocessed).toContain(`@import "tailwindcss"`);
    expect(preprocessed).toContain(`@import "tw-animate-css"`);
    expect(preprocessed).not.toContain('.light,');
    expect(preprocessed).toContain(':root {');

    // Simulate shadcn's modification: it appends unscoped `*` and `body` rules to `@layer base`
    // that mirror our scoped `.pr-twp` rules with the `tw:` prefix stripped from the @apply
    // classes. (`.pr-twp, .pr-twp *` normalizes to `*`; `body.pr-twp` normalizes to `body`.)
    const postShadcn = preprocessed.replace(
      `@layer base {
  .pr-twp,
  .pr-twp * {
    @apply tw:border-border tw:outline-ring/50;
  }
  body.pr-twp {
    @apply tw:bg-background tw:text-foreground;
  }
}`,
      `@layer base {
  .pr-twp,
  .pr-twp * {
    @apply tw:border-border tw:outline-ring/50;
  }
  body.pr-twp {
    @apply tw:bg-background tw:text-foreground;
  }
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}`,
    );

    // Sanity: the substitution actually happened
    expect(postShadcn).not.toBe(preprocessed);

    const final = postprocess(postShadcn);

    // Round-trip: final CSS should equal the original input
    expect(final).toBe(ORIGINAL_CSS);
  });

  it('round-trips when shadcn made no modifications (e.g. apply failed before changing index.css)', () => {
    const preprocessed = preprocess(ORIGINAL_CSS);

    // No shadcn modification: postprocess should be a clean inverse of preprocess
    const final = postprocess(preprocessed);

    expect(final).toBe(ORIGINAL_CSS);
  });

  it('preserves the @theme inline block and theme tokens through the round-trip', () => {
    const preprocessed = preprocess(ORIGINAL_CSS);

    // Even after preprocessing, @theme inline tokens are untouched
    expect(preprocessed).toContain('--color-background: var(--background);');
    expect(preprocessed).toContain('--color-foreground: var(--foreground);');

    const final = postprocess(preprocessed);

    expect(final).toContain('--color-background: var(--background);');
    expect(final).toContain('--color-foreground: var(--foreground);');
  });

  it('throws during postprocessing when shadcn appends unscoped rules with mismatched @apply classes', () => {
    const preprocessed = preprocess(ORIGINAL_CSS);

    // Simulate a corrupt shadcn output: an unscoped rule whose @apply classes are NOT the
    // tw:-prefixed equivalents of the scoped rule's classes. This indicates the upstream baseline
    // shifted under us and we should NOT silently strip the unscoped rule.
    const corrupted = preprocessed.replace(
      `body.pr-twp {
    @apply tw:bg-background tw:text-foreground;
  }
}`,
      `body.pr-twp {
    @apply tw:bg-background tw:text-foreground;
  }
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-something-else text-something-else;
  }
}`,
    );

    expect(() => postprocess(corrupted)).toThrow(/expected scoped classes to be the tw:-prefixed/i);
  });

  it('throws during postprocessing when shadcn appends a different number of unscoped rules than scoped', () => {
    const preprocessed = preprocess(ORIGINAL_CSS);

    // Simulate shadcn appending only one unscoped rule when the scope has two — a counts mismatch
    // means the upstream shape changed and `processLayerBase` must refuse to make a destructive edit.
    const corrupted = preprocessed.replace(
      `body.pr-twp {
    @apply tw:bg-background tw:text-foreground;
  }
}`,
      `body.pr-twp {
    @apply tw:bg-background tw:text-foreground;
  }
  body {
    @apply bg-background text-foreground;
  }
}`,
    );

    expect(() => postprocess(corrupted)).toThrow(/expected counts to match/i);
  });

  it('preserves CSS variable references during the round-trip', () => {
    const preprocessed = preprocess(ORIGINAL_CSS);
    const final = postprocess(preprocessed);

    // The CSS-var declarations inside `:root` and `.dark` are protected — the round-trip must
    // not rewrite them as `--tw-...`, even though `rewriteCssVarReferences` is exported and
    // tested separately. The pipeline `preprocess`/`postprocess` does NOT invoke that helper
    // (it's used in main() only on .ts/.tsx component files, not on index.css).
    expect(final).toContain('--background: oklch(1 0 0);');
    expect(final).toContain('--foreground: oklch(0.1 0 0);');
    expect(final).not.toContain('--tw-background:');
    expect(final).not.toContain('--tw-foreground:');
  });
});
