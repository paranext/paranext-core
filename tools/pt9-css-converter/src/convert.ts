/**
 * Core conversion: turns flat PT9 per-marker CSS into the view-mode-bucketed SCSS the platform
 * scripture editor consumes.
 *
 * Pipeline ({@link convert}):
 *
 * 1. Parse the input CSS with PostCSS and strip `@font-face` at-rules (the editor handles fonts).
 * 2. Walk every rule. Selectors matching `.usfm_<marker>` are kept, except the table-row marker `tr`
 *    (skipped — its indent/margin would collapse real-table columns); non-marker selectors are
 *    skipped too. All skips are recorded as warnings.
 * 3. For each kept marker, route its declarations into typography / non-directional / directional
 *    buckets via {@link classify}.
 * 4. Optionally diff against a base SCSS file to flag markers also styled there.
 * 5. Render SCSS: a header comment (source, timestamp, marker count, warnings) followed by one block
 *    per bucket per marker. Directional declarations are emitted twice — an LTR block and an RTL
 *    block whose left/right properties are mirrored via {@link mirrorRtl}.
 *
 * Emitted values are normalized to match Prettier's SCSS output (lowercase hex, trimmed trailing
 * zero decimals, single-quoted strings) so the generated file passes `prettier --check` as-is.
 */
import postcss from 'postcss';
import { classify, mirrorRtl, type Declaration } from './classifier';

// Only the table-row marker `\tr` is skipped: its PT9 rule is text-indent/-margin
// (the indented-paragraph model), which would inherit into cells and collapse the
// columns of the real <table> the editor now renders. Cell markers (tc*/th*/thc*/
// tcc*/thr*/tcr*) ARE emitted — their font/alignment is correct on real <td>/<th>.
const TABLE_MARKER_RE = /^tr$/;
const MARKER_SELECTOR_RE = /^\s*\.usfm_([a-zA-Z][a-zA-Z0-9_-]*)\s*$/;
const BASE_MARKER_RE = /\.usfm_([a-zA-Z][a-zA-Z0-9_-]*)/g;

interface MarkerBuckets {
  typography: Declaration[];
  nonDirectional: Declaration[];
  directional: Declaration[];
}

interface RenderInput {
  markerOrder: string[];
  markers: Map<string, MarkerBuckets>;
  warnings: ConvertWarnings;
  source?: string;
  generatedAt: Date;
  baseProvided: boolean;
}

/** Optional inputs to {@link convert}. */
export interface ConvertOptions {
  /** Source path recorded verbatim in the generated header comment (for provenance). */
  source?: string;
  /** Timestamp recorded in the header; defaults to now. Injectable for deterministic tests. */
  generatedAt?: Date;
  /** Contents of the editor's base SCSS; when provided, markers also styled there are flagged. */
  baseScss?: string;
}

/**
 * Non-fatal observations collected during conversion. Each list holds de-duplicated marker or
 * property names and is rendered into the output header so a reviewer can spot issues.
 */
export interface ConvertWarnings {
  /** Properties outside the closed list, defaulted to typography. */
  unknownProperties: string[];
  /** Table-row marker `tr` skipped: its indent/margin would collapse real-table columns. */
  skippedTableMarkers: string[];
  /** Selectors that didn't match `.usfm_<marker>` and were skipped. */
  skippedSelectors: string[];
  /** Markers that appeared in more than one rule; their declarations were merged. */
  duplicateMarkers: string[];
  /** Markers also styled in the base SCSS (only populated when `baseScss` is provided). */
  baseOverlapMarkers: string[];
}

/** Result of a conversion: the rendered SCSS plus diagnostics. */
export interface ConvertResult {
  scss: string;
  /** Number of distinct markers emitted. */
  markerCount: number;
  warnings: ConvertWarnings;
}

/**
 * Converts flat PT9 per-marker CSS into view-mode-bucketed editor SCSS. See the file header for the
 * full pipeline.
 *
 * @param css Raw PT9 CSS to convert.
 * @param options Optional source/timestamp metadata and a base SCSS to diff against.
 * @returns The rendered SCSS, the marker count, and any non-fatal warnings.
 */
export function convert(css: string, options: ConvertOptions = {}): ConvertResult {
  const root = postcss.parse(css);
  const markers = new Map<string, MarkerBuckets>();
  const markerOrder: string[] = [];
  const warnings: ConvertWarnings = {
    unknownProperties: [],
    skippedTableMarkers: [],
    skippedSelectors: [],
    duplicateMarkers: [],
    baseOverlapMarkers: [],
  };
  const unknownSeen = new Set<string>();
  const tableSeen = new Set<string>();
  const skippedSeen = new Set<string>();
  const duplicateSeen = new Set<string>();

  root.walkAtRules('font-face', (at) => {
    at.remove();
  });

  root.walkRules((rule) => {
    rule.selectors.forEach((selector) => {
      const match = selector.match(MARKER_SELECTOR_RE);
      if (!match) {
        const trimmed = selector.trim();
        if (!skippedSeen.has(trimmed)) {
          skippedSeen.add(trimmed);
          warnings.skippedSelectors.push(trimmed);
        }
        return;
      }

      const marker = match[1];
      if (TABLE_MARKER_RE.test(marker)) {
        if (!tableSeen.has(marker)) {
          tableSeen.add(marker);
          warnings.skippedTableMarkers.push(marker);
        }
        return;
      }

      const existing = markers.get(marker);
      const buckets: MarkerBuckets = existing ?? {
        typography: [],
        nonDirectional: [],
        directional: [],
      };
      if (!existing) {
        markers.set(marker, buckets);
        markerOrder.push(marker);
      } else if (!duplicateSeen.has(marker)) {
        duplicateSeen.add(marker);
        warnings.duplicateMarkers.push(marker);
      }

      rule.walkDecls((decl) => {
        const declaration: Declaration = { property: decl.prop, value: decl.value };
        const result = classify(declaration);
        if (result.unknown) {
          const key = decl.prop.toLowerCase();
          if (!unknownSeen.has(key)) {
            unknownSeen.add(key);
            warnings.unknownProperties.push(key);
          }
        }
        bucketFor(buckets, result.bucket).push(declaration);
      });
    });
  });

  if (options.baseScss) {
    const baseMarkers = extractBaseMarkers(options.baseScss);
    markerOrder.forEach((marker) => {
      if (baseMarkers.has(marker)) warnings.baseOverlapMarkers.push(marker);
    });
  }

  const scss = render({
    markerOrder,
    markers,
    warnings,
    source: options.source,
    generatedAt: options.generatedAt ?? new Date(),
    baseProvided: Boolean(options.baseScss),
  });

  return { scss, markerCount: markerOrder.length, warnings };
}

/** Returns the bucket array within `buckets` that a {@link classify} result should be pushed into. */
function bucketFor(
  buckets: MarkerBuckets,
  bucket: ReturnType<typeof classify>['bucket'],
): Declaration[] {
  switch (bucket) {
    case 'typography':
      return buckets.typography;
    case 'non-directional':
      return buckets.nonDirectional;
    case 'directional':
      return buckets.directional;
    default: {
      // Exhaustiveness guard: `bucket` is narrowed to `never` here, so a new
      // Bucket member is a compile error. If somehow reached at runtime, throw
      // loudly rather than returning undefined and crashing at the call site.
      const unhandled: never = bucket;
      throw new Error(`Unhandled bucket: ${String(unhandled)}`);
    }
  }
}

/** Collects every `.usfm_<marker>` name referenced anywhere in the base SCSS. */
function extractBaseMarkers(baseScss: string): Set<string> {
  return new Set(Array.from(baseScss.matchAll(BASE_MARKER_RE), (match) => match[1]));
}

/** Renders the final SCSS string: the header comment followed by one block per bucket per marker. */
function render({
  markerOrder,
  markers,
  warnings,
  source,
  generatedAt,
  baseProvided,
}: RenderInput): string {
  const lines: string[] = [];
  lines.push('/* Generated by tools/pt9-css-converter — do not edit by hand.');
  if (source) lines.push(` * Source: ${source}`);
  lines.push(` * Generated at: ${generatedAt.toISOString()}`);
  lines.push(` * Markers: ${markerOrder.length}`);
  if (hasAnyWarning(warnings, baseProvided)) {
    lines.push(' *');
    lines.push(' * Warnings:');
    if (warnings.unknownProperties.length)
      lines.push(
        ` *   Unknown properties (defaulted to typography): ${warnings.unknownProperties.join(', ')}`,
      );
    if (warnings.skippedTableMarkers.length)
      lines.push(` *   Skipped table markers: ${warnings.skippedTableMarkers.join(', ')}`);
    if (warnings.skippedSelectors.length)
      lines.push(` *   Skipped non-marker selectors: ${warnings.skippedSelectors.join(', ')}`);
    if (warnings.duplicateMarkers.length)
      lines.push(
        ` *   Markers seen more than once (declarations merged): ${warnings.duplicateMarkers.join(', ')}`,
      );
    if (warnings.baseOverlapMarkers.length)
      lines.push(
        ` *   Markers also styled in base _usj-nodes.scss (resolved at runtime by CSS cascade order — review for conflicts): ${warnings.baseOverlapMarkers.join(', ')}`,
      );
  }
  lines.push(' */');
  lines.push('');

  markerOrder.forEach((marker) => {
    const buckets = markers.get(marker);
    if (!buckets) return;
    emitBlock(lines, `.formatted-font .usfm_${marker}`, buckets.typography);
    emitBlock(lines, `.text-spacing .usfm_${marker}`, buckets.nonDirectional);
    if (buckets.directional.length) {
      emitBlock(lines, `.text-spacing[dir='ltr'] .usfm_${marker}`, buckets.directional);
      emitBlock(
        lines,
        `.text-spacing[dir='rtl'] .usfm_${marker}`,
        buckets.directional.map(mirrorRtl),
      );
    }
  });

  return `${lines.join('\n')}\n`;
}

/** Appends a `selector { … }` block to `lines`, or nothing when there are no declarations. */
function emitBlock(lines: string[], selector: string, declarations: Declaration[]): void {
  if (!declarations.length) return;
  lines.push(`${selector} {`);
  declarations.forEach((decl) => lines.push(`  ${decl.property}: ${normalizeValue(decl.value)};`));
  lines.push('}');
}

// Match prettier's SCSS normalization under the project's singleQuote: true config,
// so the converter emits files that pass `prettier --check` without a post-pass.
function normalizeValue(value: string): string {
  return singleQuoteStrings(trimTrailingZeroDecimals(lowercaseHexInValue(value)));
}

function lowercaseHexInValue(value: string): string {
  return value.replace(/#[0-9A-Fa-f]{3,8}\b/g, (hex) => hex.toLowerCase());
}

// The lookbehind/lookahead keep us from chewing up dotted non-numbers like
// url(./fonts/charis.woff2?v=1.0.0), which prettier leaves alone.
function trimTrailingZeroDecimals(value: string): string {
  return value.replace(/(?<![\d.])(-?\d+)\.(\d+)(?![\d.])/g, (_, intPart, fracPart) => {
    const trimmed = fracPart.replace(/0+$/, '');
    return trimmed.length ? `${intPart}.${trimmed}` : intPart;
  });
}

function singleQuoteStrings(value: string): string {
  return value.replace(/"([^"'\\]*)"/g, (_, inner) => `'${inner}'`);
}

function hasAnyWarning(w: ConvertWarnings, baseProvided: boolean): boolean {
  return (
    w.unknownProperties.length > 0 ||
    w.skippedTableMarkers.length > 0 ||
    w.skippedSelectors.length > 0 ||
    w.duplicateMarkers.length > 0 ||
    (baseProvided && w.baseOverlapMarkers.length > 0)
  );
}
