/**
 * Build script that reads src/index.css and generates src/shared/data/themes.data.json.
 *
 * Parses all CSS rule blocks in index.css that match known theme selectors (`:root`, `.dark`,
 * `.light`, `.{family}-{type}`) and contain CSS custom properties, converting them into the
 * ThemeContribution JSON format consumed by Platform.Bible.
 *
 * Run via: npm run build:themes
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Local types mirroring platform-bible-utils ThemeContribution (theme.model.ts)
interface ThemeCssVariables {
  [variableName: string]: string;
}

interface ThemeDefinition {
  label: string;
  cssVariables: ThemeCssVariables;
}

interface ThemeFamily {
  [themeType: string]: ThemeDefinition;
}

interface ThemeContribution {
  [themeFamilyId: string]: ThemeFamily;
}

/** Theme types recognized by the parser */
const THEME_TYPES = ['light', 'dark'] as const;

/** Number of user-customizable theme placeholder families to generate */
export const NUM_USER_THEME_FAMILIES = 3;

/**
 * Parses a CSS selector into a theme family ID and type.
 *
 * Rules:
 *
 * - `:root` → family `""`, type `"light"`
 * - `.dark` (bare type name) → family `""`, type `"dark"`
 * - `.{family}-{type}` → family `{family}`, type `{type}`
 *
 * @returns Parsed family/type, or `undefined` if the selector is not a recognized theme selector
 */
export function selectorToFamilyAndType(
  selector: string,
): { familyId: string; themeType: string } | undefined {
  if (selector === ':root') return { familyId: '', themeType: 'light' };

  if (!selector.startsWith('.')) return undefined;
  const className = selector.slice(1); // remove leading dot

  // ".dark" or ".light" — class name IS the type, family is the default ""
  const bareType = THEME_TYPES.find((t) => className === t);
  if (bareType) return { familyId: '', themeType: bareType };

  // ".paratext-light", ".my-theme-dark", etc.
  const suffixedType = THEME_TYPES.find((t) => className.endsWith(`-${t}`));
  if (suffixedType) {
    const familyId = className.slice(0, -(suffixedType.length + 1));
    if (familyId) return { familyId, themeType: suffixedType };
  }

  return undefined;
}

/**
 * Generates the localisation key label for a theme definition.
 *
 * Examples:
 *
 * - `("", "light")` → `"%theme_label_light%"`
 * - `("paratext", "dark")` → `"%theme_label_paratext_dark%"`
 */
export function generateThemeLabel(familyId: string, themeType: string): string {
  if (!familyId) return `%theme_label_${themeType}%`;
  return `%theme_label_${familyId}_${themeType}%`;
}

/**
 * Extracts CSS custom properties (`--name: value`) from a CSS rule body string.
 *
 * Strips inline CSS comments from values and trims whitespace.
 */
export function extractCssVariables(body: string): ThemeCssVariables {
  const vars: ThemeCssVariables = {};
  // Match --property-name: value; (value may contain spaces, parens, etc.)
  Array.from(body.matchAll(/--([a-z][a-z0-9-]*):\s*([^;]+);/g)).forEach((match) => {
    const name = match[1];
    // Strip inline CSS comments and trim surrounding whitespace
    const value = match[2].replace(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g, '').trim();
    if (value) vars[name] = value;
  });

  return vars;
}

/**
 * Parses CSS rule blocks from a CSS file and returns a {@link ThemeContribution}-shaped object.
 *
 * Any `:root`, `.{type}`, or `.{family}-{type}` rule block containing CSS custom properties is
 * treated as a theme definition and mapped using {@link selectorToFamilyAndType}. `@`-rule blocks
 * (like `@theme`, `@layer`) are naturally excluded because their selectors never match `:root` or
 * `.class-name`. User placeholder families (user-0, user-1, ...) with empty `cssVariables` are
 * appended automatically.
 */
export function parseCssThemes(cssContent: string): ThemeContribution {
  const result: ThemeContribution = {};

  // Match :root { ... } or .class-name { ... } blocks (no nested braces).
  // @-rule blocks are implicitly skipped: their outer selectors (e.g. "@theme inline",
  // "@layer base") don't match :root or .class-name, and nested blocks inside @-rules that
  // don't contain CSS custom properties are filtered out by the cssVariables length check below.
  Array.from(cssContent.matchAll(/(:root|\.[\w-]+)\s*\{([^{}]*)\}/g)).forEach((match) => {
    const selector = match[1].trim();
    const body = match[2];

    const parsed = selectorToFamilyAndType(selector);
    if (!parsed) return;

    const cssVariables = extractCssVariables(body);
    if (Object.keys(cssVariables).length === 0) return;

    const { familyId, themeType } = parsed;
    const label = generateThemeLabel(familyId, themeType);

    if (!result[familyId]) result[familyId] = {};
    result[familyId][themeType] = { label, cssVariables };
  });

  // Append user-customisable theme placeholder families (not defined in CSS)
  Array.from({ length: NUM_USER_THEME_FAMILIES }, (_, i) => i).forEach((i) => {
    result[`user-${i}`] = {
      light: { label: '%theme_label_user_light%', cssVariables: {} },
      dark: { label: '%theme_label_user_dark%', cssVariables: {} },
    };
  });

  return result;
}

// ─── Entry point (only when run directly, not when imported by tests) ────────

const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] === scriptPath) {
  const scriptDir = dirname(scriptPath);
  const cssPath = join(scriptDir, '..', 'src', 'index.css');
  // Output is at paranext-core/src/shared/data/themes.data.json
  const outputPath = join(scriptDir, '..', '..', '..', 'src', 'shared', 'data', 'themes.data.json');

  const cssContent = readFileSync(cssPath, 'utf-8');
  const themes = parseCssThemes(cssContent);
  const json = `${JSON.stringify(themes, undefined, 2)}\n`;
  writeFileSync(outputPath, json);
  console.log(`Generated ${outputPath}`);
}
