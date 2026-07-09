import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

// Guards for core's app Tailwind entry (PT-3920). The failure mode this protects against is
// SILENT: if the entry stops emitting core's utilities, or starts leaking preflight / concrete
// theme color values, or drifts out of sync with platform-bible-react (PBR), nothing errors —
// classes just render wrong. These tests turn those silent failures into a red build.

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = resolve(here, 'tailwind.css');
const pbrIndexPath = resolve(here, '../../../lib/platform-bible-react/src/index.css');

/** Extract the `@theme inline { ... }` block's `--token: value` pairs from a CSS file's text. */
function readThemeInlineTokens(cssPath: string): Map<string, string> {
  const css = readFileSync(cssPath, 'utf8');
  const start = css.indexOf('@theme inline {');
  if (start < 0) throw new Error(`No '@theme inline' block found in ${cssPath}`);
  const body = css.slice(start + '@theme inline {'.length, css.indexOf('}', start));
  const tokens = new Map<string, string>();
  body.split('\n').forEach((line) => {
    const match = /^\s*(--[\w-]+):\s*(.+);\s*$/.exec(line);
    if (match) tokens.set(match[1], match[2].trim());
  });
  return tokens;
}

describe('core Tailwind entry (src/renderer/styles/tailwind.css)', () => {
  it("'s @theme inline stays in sync with platform-bible-react", () => {
    const coreTokens = readThemeInlineTokens(entryPath);
    const pbrTokens = readThemeInlineTokens(pbrIndexPath);
    expect(coreTokens.size).toBeGreaterThan(0);
    // Every token core maps must be defined identically by PBR. Catches renames and value drift in
    // PBR that would otherwise make core emit utilities referencing variables PBR no longer defines.
    const drifted = [...coreTokens].filter(([key, value]) => pbrTokens.get(key) !== value);
    expect(drifted).toEqual([]);
  });

  // Compiling scans all of core's renderer source, so allow generous headroom on slow CI workers
  // via the 30s timeout below.
  it('emits core utilities without leaking preflight or concrete theme values', async () => {
    const css = readFileSync(entryPath, 'utf8');
    const { css: output } = await postcss([tailwindcss()]).process(css, { from: entryPath });
    // Utilities are actually generated from core's own source.
    expect(output).toMatch(/\.tw\\:/);
    // No concrete theme color values (.light / .dark / .paratext-* blocks) leak from core's
    // build — those come only from PBR's runtime-injected CSS.
    expect(output).not.toContain('oklch(');
    expect(output).not.toMatch(/\.paratext-(light|dark)\b/);
  }, 30_000);
});
