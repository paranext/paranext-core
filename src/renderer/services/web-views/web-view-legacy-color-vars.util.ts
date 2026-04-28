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
  const value = alpha.endsWith('%') ? parseFloat(alpha) : Math.round(parseFloat(alpha) * 100);
  if (Number.isNaN(value)) throw new Error(`Invalid CSS alpha value: "${alpha}"`);
  return value;
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

  const tokenAlt = [...tokenNames].sort((a, b) => b.length - a.length).join('|');
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

function formatSection(
  label: string,
  result: TransformLegacyColorVarsResult,
  lines: string[],
): void {
  const total = result.replacements.reduce((sum, r) => sum + r.count, 0);
  lines.push(`  ${label} (${total} replacements):`);
  result.replacements.forEach(({ original, replacement, count }) =>
    lines.push(`    ${original} → ${replacement}  ×${count}`),
  );
  const [p1, p2, p3] = result.passTimesMs;
  lines.push(
    `    pass 1: ${p1.toFixed(1)}ms, pass 2: ${p2.toFixed(1)}ms, pass 3: ${p3.toFixed(1)}ms`,
  );
}

/**
 * Builds a debug log message summarising the legacy color variable replacements made in a WebView.
 *
 * Returns `undefined` when no replacements were made in either section, so callers can skip logging
 * entirely in the common case (up-to-date extensions).
 */
export function buildLegacyColorVarsLogMessage(
  webViewId: string,
  webViewType: string,
  stylesResult: TransformLegacyColorVarsResult | undefined,
  contentResult: TransformLegacyColorVarsResult,
  totalMs: number,
): string | undefined {
  const hasStyleReplacements = (stylesResult?.replacements.length ?? 0) > 0;
  const hasContentReplacements = contentResult.replacements.length > 0;
  if (!hasStyleReplacements && !hasContentReplacements) return undefined;

  const lines: string[] = [
    `Legacy color var replacements in WebView ${webViewId} (type ${webViewType}) (total: ${totalMs.toFixed(1)}ms):`,
  ];
  if (stylesResult && hasStyleReplacements) formatSection('styles', stylesResult, lines);
  if (hasContentReplacements) formatSection('content', contentResult, lines);
  lines.push(
    `  Note: this message means ${webViewType} WebViews are using outdated color variable patterns that may cause incorrect colors or other issues. Please update the extension to use the new color variable format.`,
  );
  if (hasContentReplacements)
    lines.push(
      `  Warning: content replacements detected. This will likely cause debugging problems due to the sourcemap being built for the original source, not the transformed content that is running. Please update the extension to avoid these issues.`,
    );
  return lines.join('\n');
}
