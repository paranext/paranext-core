# Legacy HSL Color Variable Backwards Compatibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform legacy `hsl(var(--TOKEN))` patterns in extension WebView styles and JS
bundle strings at load time so old extensions' colors continue to work after the shadcn upgrade
changed CSS color token format from raw HSL channels to full oklch values.

**Architecture:** A pure helper `transformLegacyColorVars` lives in its own file for
testability. It runs three targeted regex passes on a string, scoped to known theme token names
from `theme.cssVariables`, and returns the transformed text plus replacement metadata with
per-pass timings. The helper is called in `openOrReloadWebView` in
`web-view.service-host.ts` on both `reactWebView.styles` and `reactWebView.content` before they
are embedded in the iframe HTML.

**Tech Stack:** TypeScript, Vitest, `performance.now()` for timing.

---

## File Structure

| Action | Path                                                                 | Responsibility                     |
| ------ | -------------------------------------------------------------------- | ---------------------------------- |
| Create | `src/renderer/services/web-view-legacy-color-vars.ts`                | Pure transform helper + types      |
| Create | `src/renderer/services/__tests__/web-view-legacy-color-vars.test.ts` | Unit tests                         |
| Modify | `src/renderer/services/web-view.service-host.ts`                     | Import + call helper in REACT case |

---

## Task 1: Write failing tests for `transformLegacyColorVars`

**Files:**

- Create: `src/renderer/services/__tests__/web-view-legacy-color-vars.test.ts`

- [ ] Create `src/renderer/services/__tests__/web-view-legacy-color-vars.test.ts` with this
      content:

```typescript
import { describe, expect, it } from 'vitest';
import { transformLegacyColorVars } from '../web-view-legacy-color-vars';

const TOKENS = new Set(['background', 'foreground', 'ring', 'card-foreground', 'border']);

describe('transformLegacyColorVars', () => {
  describe('pass 3 — plain hsl(var(--TOKEN))', () => {
    it('transforms a single occurrence', () => {
      const { text, replacements } = transformLegacyColorVars(
        'color: hsl(var(--background));',
        TOKENS,
      );
      expect(text).toBe('color: var(--background);');
      expect(replacements).toHaveLength(1);
      expect(replacements[0]).toMatchObject({
        original: 'hsl(var(--background))',
        replacement: 'var(--background)',
        count: 1,
      });
    });

    it('counts multiple identical occurrences as one entry with count > 1', () => {
      const { text, replacements } = transformLegacyColorVars(
        'color: hsl(var(--background)); background: hsl(var(--background));',
        TOKENS,
      );
      expect(text).toBe('color: var(--background); background: var(--background);');
      expect(replacements).toHaveLength(1);
      expect(replacements[0].count).toBe(2);
    });

    it('transforms hyphenated token names', () => {
      const { text } = transformLegacyColorVars('color: hsl(var(--card-foreground));', TOKENS);
      expect(text).toBe('color: var(--card-foreground);');
    });

    it('does not transform unknown custom variables', () => {
      const { text, replacements } = transformLegacyColorVars(
        'color: hsl(var(--my-custom-color));',
        TOKENS,
      );
      expect(text).toBe('color: hsl(var(--my-custom-color));');
      expect(replacements).toHaveLength(0);
    });
  });

  describe('pass 1 — hsla(var(--TOKEN), alpha)', () => {
    it('transforms decimal alpha to percentage', () => {
      const { text, replacements } = transformLegacyColorVars(
        'outline: hsla(var(--ring), 0.5);',
        TOKENS,
      );
      expect(text).toBe('outline: color-mix(in oklab, var(--ring) 50%, transparent);');
      expect(replacements[0]).toMatchObject({
        original: 'hsla(var(--ring), 0.5)',
        replacement: 'color-mix(in oklab, var(--ring) 50%, transparent)',
        count: 1,
      });
    });

    it('accepts whitespace after the comma', () => {
      const { text } = transformLegacyColorVars('color: hsla(var(--border),  0.3);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--border) 30%, transparent);');
    });

    it('handles alpha of 1 (fully opaque)', () => {
      const { text } = transformLegacyColorVars('color: hsla(var(--foreground), 1);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--foreground) 100%, transparent);');
    });

    it('handles alpha of 0 (fully transparent)', () => {
      const { text } = transformLegacyColorVars('color: hsla(var(--foreground), 0);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--foreground) 0%, transparent);');
    });
  });

  describe('pass 2 — hsl(var(--TOKEN) / alpha)', () => {
    it('transforms decimal alpha to percentage', () => {
      const { text, replacements } = transformLegacyColorVars(
        'outline-color: hsl(var(--ring) / 0.5);',
        TOKENS,
      );
      expect(text).toBe('outline-color: color-mix(in oklab, var(--ring) 50%, transparent);');
      expect(replacements[0]).toMatchObject({
        original: 'hsl(var(--ring) / 0.5)',
        replacement: 'color-mix(in oklab, var(--ring) 50%, transparent)',
        count: 1,
      });
    });

    it('accepts a percentage alpha directly', () => {
      const { text } = transformLegacyColorVars('color: hsl(var(--ring) / 50%);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--ring) 50%, transparent);');
    });

    it('accepts no whitespace around the slash', () => {
      const { text } = transformLegacyColorVars('color: hsl(var(--ring)/0.2);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--ring) 20%, transparent);');
    });
  });

  describe('pass ordering — alpha passes run before plain pass', () => {
    it('does not strip alpha from hsl(var(--X) / alpha) — must become color-mix not var()', () => {
      const { text } = transformLegacyColorVars('color: hsl(var(--ring) / 0.5);', TOKENS);
      expect(text).toBe('color: color-mix(in oklab, var(--ring) 50%, transparent);');
      expect(text).not.toContain('hsl(');
    });
  });

  describe('return shape', () => {
    it('returns passTimesMs as a 3-tuple of non-negative numbers', () => {
      const { passTimesMs } = transformLegacyColorVars('color: hsl(var(--background));', TOKENS);
      expect(passTimesMs).toHaveLength(3);
      passTimesMs.forEach((t) => expect(t).toBeGreaterThanOrEqual(0));
    });

    it('returns empty replacements and original text when nothing matches', () => {
      const original = 'color: red;';
      const { text, replacements } = transformLegacyColorVars(original, TOKENS);
      expect(text).toBe(original);
      expect(replacements).toHaveLength(0);
    });

    it('returns original text unchanged when tokenNames is empty', () => {
      const original = 'color: hsl(var(--background));';
      const { text, replacements } = transformLegacyColorVars(original, new Set());
      expect(text).toBe(original);
      expect(replacements).toHaveLength(0);
    });
  });

  describe('mixed content (JS bundle strings)', () => {
    it('transforms hsl patterns inside a JavaScript string literal', () => {
      const { text } = transformLegacyColorVars(
        "const style = { background: 'hsl(var(--background))' };",
        TOKENS,
      );
      expect(text).toBe("const style = { background: 'var(--background)' };");
    });
  });
});
```

- [ ] Run the tests to confirm they fail with "module not found":

```bash
npm test -- src/renderer/services/__tests__/web-view-legacy-color-vars.test.ts
```

Expected: all tests fail — `Cannot find module '../web-view-legacy-color-vars'`.

---

## Task 2: Implement `transformLegacyColorVars`

**Files:**

- Create: `src/renderer/services/web-view-legacy-color-vars.ts`

- [ ] Create `src/renderer/services/web-view-legacy-color-vars.ts`:

```typescript
/** A single unique replacement made by {@link transformLegacyColorVars} */
export interface ColorVarReplacement {
  /** The original matched string, e.g. `hsl(var(--background))` */
  original: string;
  /** The replacement string, e.g. `var(--background)` */
  replacement: string;
  /** Number of times this exact original appeared in the input */
  count: number;
}

/** Result returned by {@link transformLegacyColorVars} */
export interface TransformLegacyColorVarsResult {
  /** The transformed text */
  text: string;
  /** Unique replacements made, with occurrence counts */
  replacements: ColorVarReplacement[];
  /**
   * Time taken by each of the three passes in milliseconds.
   *
   * Index 0 = pass 1 (`hsla` comma-alpha), 1 = pass 2 (`hsl` slash-alpha), 2 = pass 3 (plain `hsl`)
   */
  passTimesMs: [number, number, number];
}

/**
 * Converts a CSS alpha value string to an integer percentage suitable for `color-mix`.
 *
 * - `'0.5'` → `50`
 * - `'50%'` → `50`
 * - `'1'` → `100`
 */
function alphaToPercent(alpha: string): number {
  if (alpha.endsWith('%')) return parseFloat(alpha);
  return Math.round(parseFloat(alpha) * 100);
}

/**
 * Transforms legacy `hsl(var(--TOKEN))` color variable patterns in a string to their modern
 * equivalents, scoped to the provided set of known theme token names.
 *
 * Runs three passes in order (most-specific first):
 *
 * 1. `hsla(var(--TOKEN), alpha)` → `color-mix(in oklab, var(--TOKEN) P%, transparent)`
 * 2. `hsl(var(--TOKEN) / alpha)` → `color-mix(in oklab, var(--TOKEN) P%, transparent)`
 * 3. `hsl(var(--TOKEN))` → `var(--TOKEN)`
 *
 * Only replaces occurrences where TOKEN is in `tokenNames`. Custom extension variables that are not
 * in the set are never touched.
 *
 * Safe on empty `tokenNames` — returns the original text unchanged with no replacements.
 */
export function transformLegacyColorVars(
  text: string,
  tokenNames: ReadonlySet<string>,
): TransformLegacyColorVarsResult {
  if (tokenNames.size === 0) {
    return { text, replacements: [], passTimesMs: [0, 0, 0] };
  }

  const tokenAlt = [...tokenNames].join('|');
  const replacementMap = new Map<string, { replacement: string; count: number }>();
  const passTimesMs: [number, number, number] = [0, 0, 0];

  function track(original: string, replacement: string): string {
    const entry = replacementMap.get(original);
    if (entry) entry.count += 1;
    else replacementMap.set(original, { replacement, count: 1 });
    return replacement;
  }

  let result = text;

  // Pass 1: hsla(var(--TOKEN), ALPHA)  — must run before pass 3
  let t0 = performance.now();
  result = result.replace(
    new RegExp(`hsla\\(var\\(--(${tokenAlt})\\),\\s*([\\d.]+%?)\\)`, 'g'),
    (match, token: string, alpha: string) =>
      track(match, `color-mix(in oklab, var(--${token}) ${alphaToPercent(alpha)}%, transparent)`),
  );
  passTimesMs[0] = performance.now() - t0;

  // Pass 2: hsl(var(--TOKEN) / ALPHA)  — must run before pass 3
  t0 = performance.now();
  result = result.replace(
    new RegExp(`hsl\\(var\\(--(${tokenAlt})\\)\\s*\\/\\s*([\\d.]+%?)\\)`, 'g'),
    (match, token: string, alpha: string) =>
      track(match, `color-mix(in oklab, var(--${token}) ${alphaToPercent(alpha)}%, transparent)`),
  );
  passTimesMs[1] = performance.now() - t0;

  // Pass 3: hsl(var(--TOKEN))
  t0 = performance.now();
  result = result.replace(
    new RegExp(`hsl\\(var\\(--(${tokenAlt})\\)\\)`, 'g'),
    (match, token: string) => track(match, `var(--${token})`),
  );
  passTimesMs[2] = performance.now() - t0;

  return {
    text: result,
    replacements: [...replacementMap.entries()].map(([original, { replacement, count }]) => ({
      original,
      replacement,
      count,
    })),
    passTimesMs,
  };
}
```

- [ ] Run the tests to confirm they all pass:

```bash
npm test -- src/renderer/services/__tests__/web-view-legacy-color-vars.test.ts
```

Expected: all tests pass.

---

## Task 3: Commit the helper and its tests

- [ ] Commit:

```bash
git add src/renderer/services/web-view-legacy-color-vars.ts \
        src/renderer/services/__tests__/web-view-legacy-color-vars.test.ts
git commit -m "feat: add transformLegacyColorVars helper for backwards-compat hsl→var transform"
```

---

## Task 4: Integrate the helper into `openOrReloadWebView`

**Files:**

- Modify: `src/renderer/services/web-view.service-host.ts`

### Step 1 — Add the import

- [ ] Near the top of `src/renderer/services/web-view.service-host.ts`, alongside the other
      local imports, add:

```typescript
import {
  transformLegacyColorVars,
  type TransformLegacyColorVarsResult,
} from './web-view-legacy-color-vars';
```

### Step 2 — Insert the transformation block

- [ ] In the `default:` React case (around line 1315), immediately after the existing line:

```typescript
const reactWebView = webView as WebViewDefinitionReact;
```

…insert the following block before the `webViewContent = \`` template string:

```typescript
// Transform legacy hsl(var(--TOKEN)) patterns for extensions that haven't yet updated
// to the new oklch color variable format introduced with the shadcn upgrade.
const legacyTokenNames = new Set(Object.keys(theme.cssVariables));
const legacyTransformStart = performance.now();
const legacyStylesTransform: TransformLegacyColorVarsResult | undefined = reactWebView.styles
  ? transformLegacyColorVars(reactWebView.styles, legacyTokenNames)
  : undefined;
const legacyContentTransform = transformLegacyColorVars(reactWebView.content, legacyTokenNames);
const legacyTransformTotalMs = performance.now() - legacyTransformStart;

const legacyStyleReplacements = legacyStylesTransform?.replacements ?? [];
const legacyContentReplacements = legacyContentTransform.replacements;
if (legacyStyleReplacements.length > 0 || legacyContentReplacements.length > 0) {
  const lines: string[] = [
    `Legacy color var replacements in WebView ${webView.id} (total: ${legacyTransformTotalMs.toFixed(1)}ms):`,
  ];
  if (legacyStylesTransform && legacyStyleReplacements.length > 0) {
    const total = legacyStyleReplacements.reduce((sum, r) => sum + r.count, 0);
    lines.push(`  styles (${total} replacements):`);
    for (const { original, replacement, count } of legacyStyleReplacements)
      lines.push(`    ${original} → ${replacement}  ×${count}`);
    const [p1, p2, p3] = legacyStylesTransform.passTimesMs;
    lines.push(
      `    pass 1: ${p1.toFixed(1)}ms, pass 2: ${p2.toFixed(1)}ms, pass 3: ${p3.toFixed(1)}ms`,
    );
  }
  if (legacyContentReplacements.length > 0) {
    const total = legacyContentReplacements.reduce((sum, r) => sum + r.count, 0);
    lines.push(`  content (${total} replacements):`);
    for (const { original, replacement, count } of legacyContentReplacements)
      lines.push(`    ${original} → ${replacement}  ×${count}`);
    const [p1, p2, p3] = legacyContentTransform.passTimesMs;
    lines.push(
      `    pass 1: ${p1.toFixed(1)}ms, pass 2: ${p2.toFixed(1)}ms, pass 3: ${p3.toFixed(1)}ms`,
    );
  }
  logger.debug(lines.join('\n'));
}

const legacyTransformedStyles = legacyStylesTransform?.text;
const legacyTransformedContent = legacyContentTransform.text;
```

### Step 3 — Use the transformed values in the template

- [ ] In the `webViewContent` template string (the backtick string starting around line 1323),
      make two substitutions:

**Replace** `reactWebView.styles` (the conditional check at line 1327) with
`legacyTransformedStyles`:

```typescript
// Before:
reactWebView.styles
  ? `<style nonce="${srcNonce}">
              /* extension styles */
              ${reactWebView.styles}
            </style>`
  : '';

// After:
legacyTransformedStyles
  ? `<style nonce="${srcNonce}">
              /* extension styles */
              ${legacyTransformedStyles}
            </style>`
  : '';
```

**Replace** `reactWebView.content` (line 1338) with `legacyTransformedContent`:

```typescript
// Before:
<script nonce="${srcNonce}">${reactWebView.content}

// After:
<script nonce="${srcNonce}">${legacyTransformedContent}
```

### Step 4 — Verify

- [ ] Run typecheck:

```bash
npm run typecheck
```

Expected: no errors.

- [ ] Run the full test suite:

```bash
npm test
```

Expected: all tests pass.

---

## Task 5: Commit the integration

- [ ] Commit:

```bash
git add src/renderer/services/web-view.service-host.ts
git commit -m "feat: apply legacy hsl color var transform to WebView styles and content on load"
```

---

## Self-Review Checklist

- [x] **Spec: Transform `reactWebView.styles`** → Task 4 step 2–3
- [x] **Spec: Transform `reactWebView.content`** → Task 4 step 2–3
- [x] **Spec: Scoped to `theme.cssVariables` keys** → Task 4 step 2 (`Object.keys(theme.cssVariables)`)
- [x] **Spec: REACT WebViews only** → Integration is in the `default:` React case
- [x] **Spec: Pass 1 `hsla(var, alpha)`** → Task 2
- [x] **Spec: Pass 2 `hsl(var / alpha)`** → Task 2
- [x] **Spec: Pass 3 plain `hsl(var)`** → Task 2
- [x] **Spec: Alpha as decimal → multiply × 100** → Task 2 (`alphaToPercent`)
- [x] **Spec: Alpha as percentage → use directly** → Task 2 (`alphaToPercent`)
- [x] **Spec: Per-pass timing** → Task 2 (`passTimesMs`)
- [x] **Spec: Total timing** → Task 4 (`legacyTransformTotalMs`)
- [x] **Spec: Log WebView ID, replacements, counts, per-pass times, total time** → Task 4
- [x] **Spec: No log when zero replacements** → Task 4 (guarded by length check)
- [x] **Spec: `performance.now()` for timing** → Tasks 2 and 4
- [x] **Type consistency**: `TransformLegacyColorVarsResult` used in Tasks 2 and 4; `passTimesMs` shape `[number, number, number]` matches across all references
