/**
 * Shared file transformation utilities for shadcn/ui scripts. Used by apply-shadcn-preset.ts and
 * add-shadcn-component.ts to apply standard fixes to changed .ts/.tsx files after shadcn
 * operations.
 */

import { readFileSync, writeFileSync } from 'node:fs';

export interface FileTransformation {
  description: string;
  apply: (content: string) => string;
}

/**
 * Blanks out all `@theme { ... }` blocks in a CSS string (replaces their characters with spaces to
 * preserve string length and offsets). This prevents Tailwind theme variable declarations — like
 * `--radius-md` inside `@theme inline { }` — from being treated as protected raw CSS vars.
 */
export function removeAtThemeBlocks(css: string): string {
  const regions: Array<[number, number]> = [];
  let i = 0;
  while (i < css.length) {
    const atIdx = css.indexOf('@theme', i);
    if (atIdx === -1) break;
    const openBrace = css.indexOf('{', atIdx);
    if (openBrace === -1) break;
    let depth = 0;
    let end = -1;
    for (let j = openBrace; j < css.length; j++) {
      if (css[j] === '{') depth += 1;
      else if (css[j] === '}') {
        depth -= 1;
        if (depth === 0) {
          end = j;
          break;
        }
      }
    }
    if (end === -1) break;
    regions.push([atIdx, end + 1]);
    i = end + 1;
  }
  let result = css;
  for (let r = regions.length - 1; r >= 0; r--) {
    const [start, end] = regions[r];
    result = result.slice(0, start) + ' '.repeat(end - start) + result.slice(end);
  }
  return result;
}

/**
 * Returns the set of CSS custom property names declared in raw CSS selector blocks of index.css
 * (e.g. `:root`, `.dark`, `.paratext-light`), excluding `@theme` blocks.
 *
 * These variables exist at runtime without any Tailwind prefix, so `var(--foo)` is correct for them
 * and must not be rewritten to `var(--tw-foo)`.
 */
export function parseProtectedVarsFromIndexCss(css: string): Set<string> {
  const vars = new Set<string>();
  const withoutTheme = removeAtThemeBlocks(css);
  const varPattern = /--([\w-]+)\s*:/g;
  let match = varPattern.exec(withoutTheme);
  while (match) {
    vars.add(`--${match[1]}`);
    match = varPattern.exec(withoutTheme);
  }
  return vars;
}

/**
 * Returns the set of CSS custom property names declared within a TSX component file via inline
 * style object keys (`'--varname': ...`) or `setProperty('--varname', ...)` calls. These
 * component-level vars must not be rewritten.
 */
export function parseComponentDeclaredVars(content: string): Set<string> {
  const vars = new Set<string>();
  const objKeyPattern = /['"](--[\w-]+)['"]\s*:/g;
  let match = objKeyPattern.exec(content);
  while (match) {
    vars.add(match[1]);
    match = objKeyPattern.exec(content);
  }
  const setPropPattern = /\.setProperty\(\s*['"](--[\w-]+)['"]/g;
  let setPropMatch = setPropPattern.exec(content);
  while (setPropMatch) {
    vars.add(setPropMatch[1]);
    setPropMatch = setPropPattern.exec(content);
  }
  return vars;
}

/**
 * Replaces `var(--xxx)` with `var(--tw-xxx)` in content for any variable not in protectedVars and
 * not already prefixed with `tw-`.
 */
export function rewriteCssVarReferences(content: string, protectedVars: Set<string>): string {
  return content.replace(/var\(--([\w-]+)\)/g, (match, varName: string) => {
    if (varName.startsWith('tw-') || protectedVars.has(`--${varName}`)) return match;
    return `var(--tw-${varName})`;
  });
}

function buildFileTransformations(rootVars: Set<string>): FileTransformation[] {
  return [
    {
      description: 'React namespace import → default import',
      apply: (content) =>
        content.replace(/^import \* as React from ['"]react['"]/gm, "import React from 'react'"),
    },
    {
      description: 'rtl:tw: → tw:rtl:',
      apply: (content) => content.replaceAll('rtl:tw:', 'tw:rtl:'),
    },
    {
      description: 'var(--xxx) → var(--tw-xxx) for Tailwind theme vars',
      apply: (content) => {
        const protectedVars = new Set([...rootVars, ...parseComponentDeclaredVars(content)]);
        return rewriteCssVarReferences(content, protectedVars);
      },
    },
  ];
}

/**
 * Applies the three standard shadcn file transformations to each given absolute file path:
 *
 * 1. `import * as React from 'react'` → `import React from 'react'`
 * 2. `rtl:tw:` → `tw:rtl:`
 * 3. `var(--xxx)` → `var(--tw-xxx)` for Tailwind theme variables (skips vars in `rootVars` and vars
 *    declared inline in the component itself)
 *
 * Files are modified in place. Per-file errors are collected and returned rather than thrown, so
 * all files are processed regardless of individual failures.
 */
export function applyTransformationsToFiles(
  filePaths: string[],
  rootVars: Set<string>,
): { modifiedCount: number; errors: string[] } {
  const transformations = buildFileTransformations(rootVars);
  const errors: string[] = [];
  let modifiedCount = 0;

  for (const filePath of filePaths) {
    try {
      const original = readFileSync(filePath, 'utf8');
      const updated = transformations.reduce((content, t) => t.apply(content), original);
      if (updated !== original) {
        writeFileSync(filePath, updated, 'utf8');
        modifiedCount += 1;
      }
    } catch (e) {
      errors.push(
        `Failed to transform ${filePath}: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }

  return { modifiedCount, errors };
}
